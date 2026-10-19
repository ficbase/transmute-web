import { t, getLanguage } from './i18n.js';
import { epubBook } from './reader.js';
import { compact, parseText, inspect, joinBreaks, moveChapter, mergePrevious, splitChapter, formatText } from './book-model.mjs';

const blockTags = new Set('p div section article h1 h2 h3 h4 h5 h6 li tr pre blockquote'.split(' '));
const omitted = new Set('script style nav link iframe object embed rt rp'.split(' '));
function plainText(node) {
  if (node.nodeType === 3) return node.textContent;
  if (node.nodeType !== 1 || omitted.has(node.localName) || node.hasAttribute('hidden') || node.getAttribute('aria-hidden') === 'true') return '';
  if (node.localName === 'br') return '\n';
  const text = [...node.childNodes].map(plainText).join('');
  return text + (blockTags.has(node.localName) ? '\n\n' : node.localName === 'td' || node.localName === 'th' ? '\t' : '');
}
const elements = (node, tag) => [...node.getElementsByTagNameNS('*', tag)];
const pause = () => new Promise(resolve => requestAnimationFrame(resolve));
const chars = text => { let count = 0; for (const char of compact(text)) count++; return count; };

export async function extractBook(source, isCurrent = () => true) {
  if (source.text !== undefined) return { title: source.title, author: source.author, language: source.language, chapters: parseText(source.text, source.language || getLanguage()) };
  const book = epubBook(source), chapters = [];
  for (const [index, chapter] of book.chapters.entries()) {
    if (index % 12 === 0) { await pause(); if (!isCurrent()) throw new Error('STALE_BOOK'); }
    const document = book.readXML(chapter.path), body = elements(document, 'body')[0];
    if (!body) throw new Error('READER_EPUB');
    const heading = ['h1', 'h2', 'h3'].flatMap(tag => elements(body, tag))[0];
    const title = chapter.title || heading?.textContent.trim() || elements(document, 'title')[0]?.textContent.trim() || t('reader.chapterTitle', { number: index + 1 });
    if (heading && compact(heading.textContent) === compact(title)) heading.remove();
    chapters.push({ id: 'epub-' + index, title, body: plainText(body).replace(/\n[ \t]+\n/g, '\n\n').replace(/\n{3,}/g, '\n\n').replace(/^\n+|\n+$/g, ''), volume: chapter.volume || '', path: chapter.path });
  }
  return { title: book.title, author: book.author, language: book.language, chapters };
}

// Validate the actual generated archive, not the pre-export JavaScript object.
export function verifyEPUB(bytes, expected) {
  const actual = epubBook({ bytes, file: { name: 'export.epub' } });
  const nav = actual.readXML('OEBPS/nav.xhtml');
  const anchors = elements(nav, 'a');
  const checks = { chapters: actual.chapters.length === expected.chapters.length, links: anchors.length === expected.chapters.length, order: true, body: true, paragraphs: true };
  anchors.forEach((anchor, index) => {
    const href = anchor.getAttribute('href');
    const chapter = actual.chapters[index], reference = expected.chapters[index];
    if (!chapter || !reference || 'OEBPS/' + href !== chapter.path || anchor.textContent !== reference.title) checks.links = false;
  });
  actual.chapters.forEach((chapter, index) => {
    const reference = expected.chapters[index];
    if (!reference) { checks.order = false; checks.body = false; return; }
    const document = actual.readXML(chapter.path), body = elements(document, 'body')[0];
    const heading = body && elements(body, 'h1')[0];
    if (!heading || heading.textContent !== reference.title) checks.order = false;
    heading?.remove();
    if (!body || compact(plainText(body)) !== compact(reference.body)) checks.body = false;
    const paragraphs = reference.body.split('\n\n').map(text => text.replace(/[\n\r]+$/g, '')).filter(Boolean);
    if (!body || elements(body, 'p').length !== paragraphs.length || elements(body, 'br').length !== paragraphs.reduce((sum, text) => sum + text.split('\n').length - 1, 0)) checks.paragraphs = false;
  });
  const groups = elements(nav, 'span').map(node => node.textContent);
  const expectedGroups = expected.chapters.filter((chapter, index, all) => chapter.volume && chapter.volume !== all[index - 1]?.volume).map(chapter => chapter.volume);
  checks.volumes = JSON.stringify(groups) === JSON.stringify(expectedGroups);
  return checks;
}

export function verifyTXT(bytes, expected) {
  const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  let cursor = 0, valid = true;
  for (const chapter of expected.chapters) {
    const block = chapter.title + '\n' + chapter.body.replace(/\s+$/u, '');
    const position = text.indexOf(block, cursor);
    if (position < cursor) { valid = false; break; }
    cursor = position + block.length;
  }
  return { utf8: true, order: valid, body: valid };
}

export function createWorkbench({ getSource, onChange, onState }) {
  const dialog = document.querySelector('#bookWorkbench');
  const $ = selector => dialog.querySelector(selector);
  const launcher = document.querySelector('#inspectBtn');
  const summary = document.querySelector('#bookHealth');
  let book = null, selected = 0, loading = false, failed = false, token = 0, pending = Promise.resolve();
  let history = [], editKey = '', operations = 0, sourceChars = 0, issues = [], search = '', cursor = 0;
  let inspectionTimer, lastReport = null;
  const snapshot = () => ({ ...book, chapters: book.chapters.map(chapter => ({ ...chapter })) });
  function recount() { issues = book ? inspect(book.chapters) : []; }
  function renderSummary() {
    summary.hidden = !loading && !book && !failed;
    summary.textContent = loading ? t('work.loading') : failed ? t('work.failed') : book ? t('work.summary', { chapters: book.chapters.length, issues: issues.length }) : '';
    summary.classList.toggle('error', failed);
    summary.setAttribute('aria-busy', String(loading));
    launcher.disabled = loading || !book;
    onState?.();
  }
  function mutate(action, update, key = '') {
    if (!book || loading) return;
    if (!key || key !== editKey) {
      history.push({ book: snapshot(), selected, operations });
      if (history.length > 12) history.shift();
      operations++;
    }
    editKey = key;
    update(); onChange(); clearTimeout(inspectionTimer);
    if (key) inspectionTimer = setTimeout(() => { recount(); renderSummary(); if (dialog.open) { renderList(); renderIssues(); } }, 180);
    else recount();
    renderSummary();
  }
  function renderList() {
    const list = $('#workChapterList'); list.replaceChildren();
    const matches = book.chapters.map((chapter, index) => ({ chapter, index })).filter(({ chapter, index }) => (chapter.title + ' ' + chapter.volume + ' ' + (index + 1)).toLocaleLowerCase().includes(search));
    let shown = matches.slice(0, 300);
    if (!shown.some(item => item.index === selected) && matches.some(item => item.index === selected)) shown = [...shown.slice(0, 299), matches.find(item => item.index === selected)];
    for (const { chapter, index } of shown) {
      const button = document.createElement('button'); button.type = 'button'; button.dataset.workChapter = index;
      button.setAttribute('aria-current', String(index === selected));
      const label = document.createElement('span'); label.textContent = `${index + 1}. ${chapter.title || t('work.untitled')}`;
      const detail = document.createElement('small'); detail.textContent = [chapter.volume, chapter.excluded ? t('work.excluded') : '', issues.filter(issue => issue.index === index).length ? t('work.issueCount', { count: issues.filter(issue => issue.index === index).length }) : ''].filter(Boolean).join(' · ');
      button.append(label, detail); button.addEventListener('click', () => { selected = index; editKey = ''; render(); }); list.append(button);
    }
    $('#workListHint').textContent = t('work.listHint', { shown: shown.length, total: book.chapters.length });
  }
  function renderIssues() {
    const list = $('#workIssues'); list.replaceChildren();
    for (const issue of issues.slice(0, 120)) {
      const button = document.createElement('button'); button.type = 'button'; button.dataset.workIssue = issue.kind;
      button.textContent = `${issue.index + 1}. ` + t('work.issue.' + issue.kind, issue);
      button.addEventListener('click', () => { selected = issue.index; search = ''; $('#workSearch').value = ''; render(); $('#workTitle').focus(); }); list.append(button);
    }
    $('#workNoIssues').hidden = issues.length > 0;
  }
  function preview() {
    const chapter = book?.chapters[selected]; if (!chapter) return;
    $('#workPreviewTitle').textContent = chapter.title;
    $('#workPreview').textContent = chapter.body.slice(0, 30000);
    $('#workPreviewLimit').hidden = chapter.body.length <= 30000;
  }
  function render() {
    if (!book || !dialog.open) return;
    const chapter = book.chapters[selected];
    $('#workBookTitle').textContent = book.title || t('reader.title');
    $('#workTitle').value = chapter.title; $('#workVolume').value = chapter.volume; $('#workBody').value = chapter.body;
    $('#workUndo').disabled = !history.length;
    $('#workUp').disabled = selected === 0; $('#workDown').disabled = selected === book.chapters.length - 1;
    $('#workMerge').textContent = t(selected === 0 ? 'work.makeIntro' : 'work.merge');
    $('#workMerge').disabled = !!chapter.excluded || selected > 0 && !!book.chapters[selected - 1].excluded;
    $('#workSplit').disabled = !!chapter.excluded;
    $('#workIncludedState').textContent = t(chapter.excluded ? 'work.excluded' : 'work.included');
    $('#workExclude').textContent = t(chapter.excluded ? 'work.include' : 'work.exclude');
    $('#workExclude').disabled = !chapter.excluded && book.chapters.filter(chapter => !chapter.excluded).length === 1;
    $('#workJoin').disabled = !!chapter.excluded || !issues.some(issue => issue.index === selected && issue.kind === 'breaks');
    $('#workChanges').textContent = t('work.changes', { count: operations, source: sourceChars, current: book.chapters.filter(chapter => !chapter.excluded).reduce((sum, chapter) => sum + chars(chapter.body), 0) });
    renderList(); renderIssues(); preview();
  }
  function reset() {
    clearTimeout(inspectionTimer); lastReport = null;
    token++; book = null; loading = false; failed = false; issues = []; history = []; operations = 0; selected = 0; editKey = ''; search = ''; $('#workSearch').value = '';
    if (dialog.open) dialog.close(); renderSummary();
  }
  function load() {
    reset(); const request = ++token; loading = true; renderSummary();
    pending = (async () => {
      try {
        const source = await getSource();
        if (request !== token) return;
        const next = await extractBook(source, () => request === token);
        if (request !== token) return;
        if (!next.chapters.length) throw new Error('READER_EMPTY');
        book = next; sourceChars = book.chapters.reduce((sum, chapter) => sum + chars(chapter.body), 0); recount();
      } catch (error) { if (request === token) { failed = true; book = null; } }
      finally { if (request === token) { loading = false; renderSummary(); } }
    })();
    return pending;
  }
  launcher.addEventListener('click', () => { if (book) { dialog.showModal(); render(); } });
  const close = () => { dialog.close(); launcher.focus(); };
  $('#workDone').addEventListener('click', close); $('#workClose').addEventListener('click', close);
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  $('#workSearch').addEventListener('input', event => { search = event.target.value.toLocaleLowerCase(); renderList(); });
  for (const [selector, field] of [['#workTitle', 'title'], ['#workVolume', 'volume'], ['#workBody', 'body']]) {
    $(selector).addEventListener('input', event => {
      mutate('edit', () => { book.chapters[selected][field] = event.target.value.replace(/\r\n?/g, '\n'); }, book.chapters[selected].id + ':' + field);
      $('#workUndo').disabled = false; preview();
    });
    $(selector).addEventListener('change', () => { editKey = ''; render(); });
  }
  $('#workBody').addEventListener('select', event => { cursor = event.target.selectionStart; });
  $('#workBody').addEventListener('click', event => { cursor = event.target.selectionStart; });
  $('#workBody').addEventListener('keyup', event => { cursor = event.target.selectionStart; });
  $('#workUndo').addEventListener('click', () => {
    const old = history.pop(); if (!old) return;
    ({ book, selected, operations } = old); editKey = ''; recount(); onChange(); renderSummary(); render();
  });
  for (const [selector, delta] of [['#workUp', -1], ['#workDown', 1]]) $(selector).addEventListener('click', () => { mutate('move', () => { selected = moveChapter(book.chapters, selected, delta); }); render(); });
  $('#workMerge').addEventListener('click', () => { mutate('merge', () => { selected = mergePrevious(book.chapters, selected, t('work.frontmatter')); }); render(); });
  $('#workExclude').addEventListener('click', () => { mutate('exclude', () => { book.chapters[selected].excluded = !book.chapters[selected].excluded; }); render(); });
  $('#workSplit').addEventListener('click', () => {
    if (cursor <= 0 || cursor >= book.chapters[selected].body.length) { $('#workEditStatus').textContent = t('work.splitHint'); return; }
    mutate('split', () => { selected = splitChapter(book.chapters, selected, cursor, t('work.newChapter')); }); cursor = 0; render();
  });
  $('#workJoin').addEventListener('click', () => { mutate('join', () => { book.chapters[selected].body = joinBreaks(book.chapters[selected].body); }); render(); });
  window.addEventListener('epubloom:languagechange', () => {
    renderSummary(); render();
    if (lastReport && !document.querySelector('#exportReport').hidden) api.showReport(...lastReport);
  });
  const api = {
    load, reset,
    get ready() { return !!book && !loading; },
    async exportBook(metadata) {
      await pending;
      if (!book) throw new Error(t('work.failed'));
      const included = book.chapters.filter(chapter => !chapter.excluded);
      if (!included.length) throw new Error(t('work.needChapter'));
      if (included.some(chapter => !chapter.title.trim())) throw new Error(t('work.needTitles'));
      return { ...snapshot(), ...metadata, chapters: included.map(chapter => ({ title: chapter.title, body: chapter.body, volume: chapter.volume })), operations, excluded: book.chapters.length - included.length };
    },
    setBusy(busy) { launcher.disabled = busy || !book || loading; if (dialog.open && busy) dialog.close(); },
    showReport(checks, expected) {
      lastReport = [checks, expected];
      const report = document.querySelector('#exportReport'); report.replaceChildren(); report.hidden = false;
      report.classList.toggle('failed', !Object.values(checks).every(Boolean));
      const heading = document.createElement('h3'); heading.textContent = t(Object.values(checks).every(Boolean) ? 'work.reportPassed' : 'work.reportFailed'); report.append(heading);
      for (const [name, passed] of Object.entries(checks)) {
        const row = document.createElement('p'); row.textContent = (passed ? '✓ ' : '✕ ') + t('work.check.' + name); report.append(row);
      }
      const note = document.createElement('p'); note.className = 'work-report-note'; note.textContent = t('work.reportScope', { count: expected.operations, excluded: expected.excluded }); report.append(note);
      return Object.values(checks).every(Boolean);
    },
  };
  return api;
}

export { formatText };

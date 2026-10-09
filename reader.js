import { t, getLanguage } from './i18n.js';
import { reader_entries, reader_entry, reader_text } from './pkg/transmute_web.js';

const FILE_LIMIT = 50 * 1024 * 1024;
const ASSET_LIMIT = 32 * 1024 * 1024;
const XML = 'application/xhtml+xml';
const ALLOWED = new Set('p div section article span h1 h2 h3 h4 h5 h6 br hr blockquote pre code em strong b i u s sup sub ruby rt rp ul ol li dl dt dd table thead tbody tfoot tr th td caption figure figcaption a img'.split(' '));
const OMIT = new Set('script style link iframe object embed form input button textarea select audio video source noscript'.split(' '));
const IMAGE_TYPES = new Map([['png','image/png'],['jpg','image/jpeg'],['jpeg','image/jpeg'],['gif','image/gif'],['webp','image/webp'],['avif','image/avif'],['svg','image/svg+xml']]);
const safeRead = key => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
const safeWrite = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Reading works without storage. */ } };
const clamp = (number, min, max) => Math.max(min, Math.min(max, Number(number) || 0));
const nextFrame = () => new Promise(resolve => requestAnimationFrame(resolve));

function xmlDocument(text) {
  const document = new DOMParser().parseFromString(text, XML);
  if (document.getElementsByTagName('parsererror').length) throw new Error('READER_EPUB');
  return document;
}
const elements = (node, name) => [...node.getElementsByTagNameNS('*', name)];
const textOf = (node, name) => elements(node, name)[0]?.textContent.trim() || '';

// Resolve inside the ZIP, never through the site's origin or a remote URL.
function bookPath(reference, base = '') {
  if (!reference || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(reference.trim())) return null;
  try {
    const url = new URL(reference, 'https://book.invalid/' + base);
    if (url.origin !== 'https://book.invalid') return null;
    return { path: decodeURIComponent(url.pathname.slice(1)), hash: decodeURIComponent(url.hash.slice(1)) };
  } catch { return null; }
}

function epubBook(source) {
  const entries = new Set(JSON.parse(reader_entries(source.bytes)));
  const read = path => {
    if (!entries.has(path)) throw new Error('READER_EPUB');
    return reader_entry(source.bytes, path);
  };
  const readXML = path => {
    const bytes = read(path);
    const encoding = bytes[0] === 0xff && bytes[1] === 0xfe ? 'utf-16le' : bytes[0] === 0xfe && bytes[1] === 0xff ? 'utf-16be' : 'utf-8';
    return xmlDocument(new TextDecoder(encoding, { fatal: true }).decode(bytes));
  };
  const container = readXML('META-INF/container.xml');
  const rootfiles = elements(container, 'rootfile');
  const packagePath = (rootfiles.find(node => node.getAttribute('media-type') === 'application/oebps-package+xml') || rootfiles[0])?.getAttribute('full-path');
  if (!packagePath) throw new Error('READER_EPUB');
  const opf = readXML(packagePath);
  const manifest = new Map(elements(opf, 'item').map(node => [node.getAttribute('id'), node]));
  const chapters = elements(opf, 'itemref').filter(node => node.getAttribute('linear') !== 'no').map(node => {
    const item = manifest.get(node.getAttribute('idref'));
    if (!item || (item.getAttribute('properties') || '').split(/\s+/).includes('nav')) return null;
    const resource = bookPath(item.getAttribute('href'), packagePath);
    if (!resource || !entries.has(resource.path)) throw new Error('READER_EPUB');
    return { path: resource.path, title: '' };
  }).filter(Boolean);
  if (!chapters.length) throw new Error('READER_EMPTY');
  const titles = new Map();
  try {
    const nav = [...manifest.values()].find(node => (node.getAttribute('properties') || '').split(/\s+/).includes('nav'));
    const ncx = manifest.get(elements(opf, 'spine')[0]?.getAttribute('toc'));
    const item = nav || ncx;
    if (item) {
      const path = bookPath(item.getAttribute('href'), packagePath).path;
      const document = readXML(path);
      const toc = elements(document, 'nav').find(node => (node.getAttribute('epub:type') || node.getAttribute('role') || '').split(/\s+/).some(value => value === 'toc' || value === 'doc-toc')) || document;
      for (const node of elements(toc, nav ? 'a' : 'navPoint')) {
        const reference = nav ? node.getAttribute('href') : elements(node, 'content')[0]?.getAttribute('src');
        const label = nav ? node.textContent.trim() : textOf(node, 'navLabel');
        const resolved = bookPath(reference, path);
        if (resolved && label && !titles.has(resolved.path)) titles.set(resolved.path, label);
      }
    }
  } catch { /* Chapter headings remain usable when an optional navigation file is damaged. */ }
  chapters.forEach(chapter => { chapter.title = titles.get(chapter.path) || ''; });
  return { title: textOf(opf, 'title') || source.file.name.replace(/\.epub$/i, ''), author: textOf(opf, 'creator'), language: textOf(opf, 'language'), chapters, readXML, read };
}

export function createReader({ getSource }) {
  const dialog = document.querySelector('#onlineReader');
  const find = selector => dialog.querySelector(selector);
  const shell = find('#readerShell');
  const viewport = find('#readerViewport');
  const article = find('#readerArticle');
  const message = find('#readerMessage');
  const toc = find('#readerToc');
  const tocList = find('#readerTocList');
  const search = find('#readerSearch');
  const previous = find('#readerPrevious');
  const next = find('#readerNext');
  const launcher = document.querySelector('#readBtn');
  let book = null, file = null, fingerprint = '', chapterIndex = 0, ratio = 0;
  let generation = 0, rendering = false, saveTimer;
  let wheelTime = 0, wheelDirection = 0, wheelDistance = 0, wheelNeedsPause = false;
  let boundaryCooldown = 0, touch = null, noticeTimer;
  let assetUrls = [];
  const saved = safeRead('epubloom.reader.preferences') || {};
  const preferences = { font: clamp(saved.font || 20, 14, 32), theme: ['paper','light','dark'].includes(saved.theme) ? saved.theme : 'paper' };
  const titleFor = index => book.chapters[index].title || t('reader.chapterTitle', { number: index + 1 });

  function applyPreferences() {
    dialog.dataset.theme = preferences.theme;
    dialog.style.setProperty('--reader-font-size', preferences.font + 'px');
    find('#readerFontValue').textContent = preferences.font + 'px';
    find('#readerFontDown').disabled = preferences.font <= 14;
    find('#readerFontUp').disabled = preferences.font >= 32;
    dialog.querySelectorAll('[data-reader-theme]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.readerTheme === preferences.theme)));
    safeWrite('epubloom.reader.preferences', preferences);
  }
  function setToc(open) {
    toc.hidden = !open;
    dialog.classList.toggle('toc-open', open);
    find('#readerTocToggle').setAttribute('aria-expanded', String(open));
  }
  function syncToolbarLabels() {
    const collapsed = dialog.classList.contains('toolbar-collapsed');
    const toggle = find('#readerToolbarToggle');
    const key = collapsed ? 'reader.expandToolbar' : 'reader.collapseToolbar';
    toggle.dataset.i18nLabel = key;
    toggle.setAttribute('aria-label', t(key));
    toggle.title = t(key);
  }
  function setToolbarCollapsed(collapsed) {
    dialog.classList.toggle('toolbar-collapsed', collapsed);
    find('#readerToolbarPanel').inert = collapsed;
    find('#readerToolbarPanel').setAttribute('aria-hidden', String(collapsed));
    find('#readerToolbarToggle').setAttribute('aria-expanded', String(!collapsed));
    syncToolbarLabels();
  }
  function resetBoundaryGesture() {
    wheelDirection = 0; wheelDistance = 0;
    wheelNeedsPause = true;
    boundaryCooldown = performance.now() + 500;
    if (touch) touch.used = true;
  }
  function boundaryChapter(direction) {
    if (!book || rendering || !message.hidden || performance.now() < boundaryCooldown) return null;
    const atEdge = direction > 0
      ? viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight - 2
      : viewport.scrollTop <= 2;
    const destination = chapterIndex + direction;
    return atEdge && destination >= 0 && destination < book.chapters.length ? destination : null;
  }
  function crossBoundary(direction) {
    const destination = boundaryChapter(direction);
    if (destination === null) return false;
    void navigate(destination, direction < 0 ? 1 : 0);
    return true;
  }
  function renderToc() {
    tocList.replaceChildren();
    if (!book) return;
    const query = search.value.trim().toLocaleLowerCase();
    book.chapters.forEach((chapter, index) => {
      const title = titleFor(index);
      if (query && !title.toLocaleLowerCase().includes(query)) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'reader-toc-item';
      button.dataset.chapter = index;
      button.title = title;
      button.textContent = title;
      button.setAttribute('aria-current', String(index === chapterIndex));
      button.addEventListener('click', () => {
        if (matchMedia('(max-width: 760px)').matches) setToc(false);
        void navigate(index);
      });
      tocList.appendChild(button);
    });
    find('#readerNoMatches').hidden = tocList.childElementCount > 0;
  }
  function updateProgress() {
    if (!book || rendering) return;
    const distance = viewport.scrollHeight - viewport.clientHeight;
    ratio = distance > 1 ? clamp(viewport.scrollTop / distance, 0, 1) : 1;
    const percent = Math.round((chapterIndex + ratio) / book.chapters.length * 100);
    find('#readerChapterLabel').textContent = t('reader.chapter', { current: chapterIndex + 1, total: book.chapters.length });
    find('#readerProgress').value = percent;
    find('#readerPercent').textContent = percent + '%';
  }
  function savePosition() {
    clearTimeout(saveTimer);
    if (!book || !fingerprint || rendering) return;
    const savedPositions = safeRead('epubloom.reader.positions');
    const positions = savedPositions && typeof savedPositions === 'object' && !Array.isArray(savedPositions) ? savedPositions : {};
    positions[fingerprint] = { chapter: chapterIndex, ratio, updated: Date.now() };
    const recent = Object.entries(positions).sort((a,b) => (b[1]?.updated || 0) - (a[1]?.updated || 0)).slice(0,20);
    safeWrite('epubloom.reader.positions', Object.fromEntries(recent));
  }
  function releaseAssets() { assetUrls.forEach(url => URL.revokeObjectURL(url)); assetUrls = []; }
  function showMessage(key, error = false) {
    message.textContent = t(key);
    message.classList.toggle('error', error);
    message.hidden = false;
  }

  async function chapterContent(index, token, pendingUrls) {
    const chapter = book.chapters[index];
    const content = document.createDocumentFragment();
    if (chapter.body !== undefined) {
      const heading = document.createElement('h2');
      heading.textContent = titleFor(index); content.appendChild(heading);
      for (const paragraph of chapter.body.replace(/\r\n?/g, '\n').split(/\n[\t ]*\n/)) {
        if (!paragraph.trim()) continue;
        const p = document.createElement('p'); p.className = 'reader-txt-paragraph'; p.textContent = paragraph; content.appendChild(p);
      }
      return content;
    }
    const chapterDocument = book.readXML(chapter.path);
    const body = elements(chapterDocument, 'body')[0];
    if (!body) throw new Error('READER_EPUB');
    const heading = ['h1','h2','h3'].map(name => elements(body, name)[0]).find(Boolean);
    if (!chapter.title) chapter.title = heading?.textContent.trim() || textOf(chapterDocument, 'title');
    if (!heading) {
      const h2 = window.document.createElement('h2'); h2.textContent = titleFor(index); content.appendChild(h2);
    }
    let resourceBytes = 0;
    const images = [], imageCache = new Map();
    const image = (reference, alt) => {
      const img = window.document.createElement('img'); img.alt = alt || t('reader.image');
      try {
        const resolved = bookPath(reference, chapter.path);
        const type = resolved && IMAGE_TYPES.get(resolved.path.split('.').pop().toLowerCase());
        if (!type) throw new Error('IMAGE');
        let url = imageCache.get(resolved.path);
        if (!url) {
          if (resourceBytes >= ASSET_LIMIT) throw new Error('IMAGE');
          const bytes = book.read(resolved.path);
          resourceBytes += bytes.length;
          if (resourceBytes > ASSET_LIMIT) throw new Error('IMAGE');
          url = URL.createObjectURL(new Blob([bytes], { type }));
          imageCache.set(resolved.path, url); pendingUrls.push(url);
        }
        img.src = url;
        images.push(img.decode().catch(() => { img.removeAttribute('src'); img.alt = t('reader.imageUnavailable'); }));
      } catch { img.alt = alt || t('reader.imageUnavailable'); }
      return img;
    };
    function clone(node) {
      if (node.nodeType === Node.TEXT_NODE) return window.document.createTextNode(node.textContent);
      if (node.nodeType !== Node.ELEMENT_NODE) return null;
      const tag = node.localName.toLowerCase();
      if (OMIT.has(tag)) return null;
      if (tag === 'svg') {
        const embedded = elements(node, 'image')[0];
        return embedded ? image(embedded.getAttribute('href') || embedded.getAttributeNS('http://www.w3.org/1999/xlink', 'href'), '') : null;
      }
      if (tag === 'img') return image(node.getAttribute('src'), node.getAttribute('alt'));
      const target = ALLOWED.has(tag) ? window.document.createElement(tag) : window.document.createDocumentFragment();
      if (target.nodeType === Node.ELEMENT_NODE) {
        if (node.hasAttribute('id')) target.id = 'book-' + node.getAttribute('id');
        if (node.hasAttribute('lang')) target.lang = node.getAttribute('lang');
        if (['ltr','rtl','auto'].includes(node.getAttribute('dir'))) target.dir = node.getAttribute('dir');
        if (['td','th'].includes(tag)) for (const attr of ['colspan','rowspan']) {
          if (node.hasAttribute(attr)) target.setAttribute(attr, clamp(node.getAttribute(attr), 1, 100));
        }
        if (tag === 'a') {
          const resolved = bookPath(node.getAttribute('href'), chapter.path);
          const destination = resolved && book.chapters.findIndex(item => item.path === resolved.path);
          if (destination >= 0 && destination !== null) {
            target.href = '#book-' + resolved.hash;
            target.addEventListener('click', event => { event.preventDefault(); void navigate(destination, 0, resolved.hash); });
          }
        }
      }
      for (const child of node.childNodes) { const safe = clone(child); if (safe) target.appendChild(safe); }
      return target;
    }
    for (const child of body.childNodes) { const safe = clone(child); if (safe) content.appendChild(safe); }
    await Promise.all(images);
    if (token !== generation) return null;
    return content;
  }

  async function navigate(index, restoreRatio = 0, hash = '') {
    if (!book || index < 0 || index >= book.chapters.length) return;
    savePosition();
    resetBoundaryGesture();
    const token = ++generation;
    rendering = true;
    chapterIndex = index;
    previous.disabled = true; next.disabled = true;
    viewport.setAttribute('aria-busy', 'true');
    article.replaceChildren(); releaseAssets();
    showMessage('reader.loading');
    const pendingUrls = [];
    try {
      await nextFrame();
      if (token !== generation) return;
      const content = await chapterContent(index, token, pendingUrls);
      if (token !== generation || !content) { pendingUrls.forEach(url => URL.revokeObjectURL(url)); return; }
      assetUrls = pendingUrls;
      article.replaceChildren(content);
      article.lang = book.language || '';
      message.hidden = true;
      renderToc();
      await nextFrame();
      if (token !== generation) return;
      viewport.scrollTop = restoreRatio * Math.max(0, viewport.scrollHeight - viewport.clientHeight);
      if (hash) article.querySelector('#' + CSS.escape('book-' + hash))?.scrollIntoView({ block: 'start' });
      viewport.focus({ preventScroll: true });
    } catch (error) {
      pendingUrls.forEach(url => URL.revokeObjectURL(url));
      if (token !== generation) return;
      showMessage(String(error).includes('READER_SIZE') ? 'reader.size' : 'reader.error', true);
      renderToc();
    } finally {
      if (token === generation) {
        rendering = false;
        viewport.setAttribute('aria-busy', 'false');
        previous.disabled = index === 0; next.disabled = index === book.chapters.length - 1;
        updateProgress(); savePosition();
      }
    }
  }

  function close() {
    savePosition();
    ++generation;
    rendering = false;
    if (fullscreenElement() === shell) void exitFullscreen().catch(() => {});
    touch = null;
    clearTimeout(noticeTimer); find('#readerNotice').hidden = true;
    dialog.close();
    document.body.classList.remove('reader-open');
    launcher.focus({ preventScroll: true });
  }
  async function open() {
    if (dialog.open) return;
    dialog.showModal(); document.body.classList.add('reader-open');
    setToolbarCollapsed(false);
    setToc(!matchMedia('(max-width:760px)').matches);
    applyPreferences();
    const token = ++generation;
    rendering = true;
    article.replaceChildren(); showMessage('reader.loading');
    previous.disabled = true; next.disabled = true;
    try {
      const source = await getSource();
      if (token !== generation) return;
      if (source.file.size > FILE_LIMIT) throw new Error('READER_SIZE');
      if (file !== source.file || !book) {
        fingerprint = '';
        book = source.text === undefined ? epubBook(source) : JSON.parse(reader_text(source.text, source.language || getLanguage()));
        if (!book.chapters.length) throw new Error('READER_EMPTY');
        book.title ||= source.title || source.file.name.replace(/\.(txt|epub)$/i, '');
        book.author ||= source.author || '';
        file = source.file;
        try {
          const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', source.bytes));
          if (token !== generation) return;
          fingerprint = Array.from(digest, byte => byte.toString(16).padStart(2, '0')).join('');
        } catch { /* A secure context is optional for reading, required only for position fingerprints. */ }
        const position = fingerprint && safeRead('epubloom.reader.positions')?.[fingerprint];
        chapterIndex = clamp(position?.chapter, 0, book.chapters.length - 1);
        ratio = clamp(position?.ratio, 0, 1);
      }
      if (token !== generation) return;
      find('#readerBookTitle').textContent = book.title;
      find('#readerBookAuthor').textContent = book.author;
      search.value = '';
      rendering = false;
      await navigate(chapterIndex, ratio);
    } catch (error) {
      if (token !== generation) return;
      rendering = false;
      book = null; file = null; fingerprint = '';
      find('#readerBookTitle').textContent = t('reader.title'); find('#readerBookAuthor').textContent = '';
      tocList.replaceChildren();
      showMessage(String(error).includes('READER_SIZE') ? 'reader.size' : String(error).includes('READER_EMPTY') ? 'reader.empty' : 'reader.error', true);
    }
  }
  function reset() {
    if (dialog.open) close();
    ++generation; book = null; file = null; fingerprint = ''; chapterIndex = 0; ratio = 0;
    article.replaceChildren(); tocList.replaceChildren(); releaseAssets();
    find('#readerBookTitle').textContent = t('reader.title');
    find('#readerBookAuthor').textContent = '';
    find('#readerChapterLabel').textContent = '';
    find('#readerProgress').value = 0; find('#readerPercent').textContent = '0%';
    find('#readerNoMatches').hidden = true;
  }
  launcher.addEventListener('click', () => void open());
  find('#readerClose').addEventListener('click', close);
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  previous.addEventListener('click', () => void navigate(chapterIndex - 1));
  next.addEventListener('click', () => void navigate(chapterIndex + 1));
  find('#readerTocToggle').addEventListener('click', () => setToc(toc.hidden));
  find('#readerToolbarToggle').addEventListener('click', () => setToolbarCollapsed(!dialog.classList.contains('toolbar-collapsed')));
  search.addEventListener('input', renderToc);
  viewport.addEventListener('scroll', () => { updateProgress(); clearTimeout(saveTimer); saveTimer = setTimeout(savePosition, 300); }, { passive: true });
  viewport.addEventListener('wheel', event => {
    if (event.ctrlKey || event.metaKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    const now = performance.now(), pause = now - wheelTime;
    wheelTime = now;
    if (pause > 180) { wheelNeedsPause = false; wheelDistance = 0; }
    if (wheelNeedsPause || rendering) return;
    const direction = Math.sign(event.deltaY);
    if (boundaryChapter(direction) === null) { wheelDistance = 0; return; }
    if (event.cancelable) event.preventDefault();
    if (direction !== wheelDirection) wheelDistance = 0;
    wheelDirection = direction;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientHeight : 1;
    wheelDistance += Math.abs(event.deltaY) * unit;
    if (wheelDistance >= 60) crossBoundary(direction);
  }, { passive: false });
  viewport.addEventListener('touchstart', event => {
    const point = event.touches.length === 1 && event.touches[0];
    touch = point ? { x: point.clientX, y: point.clientY, direction: 0, distance: 0, used: false } : null;
  }, { passive: true });
  viewport.addEventListener('touchmove', event => {
    if (!touch || touch.used || event.touches.length !== 1) return;
    const point = event.touches[0], dy = touch.y - point.clientY, dx = touch.x - point.clientX;
    touch.x = point.clientX; touch.y = point.clientY;
    if (Math.abs(dy) <= Math.abs(dx)) { touch.distance = 0; return; }
    const direction = Math.sign(dy);
    if (boundaryChapter(direction) === null) { touch.distance = 0; return; }
    if (event.cancelable) event.preventDefault();
    if (direction !== touch.direction) touch.distance = 0;
    touch.direction = direction; touch.distance += Math.abs(dy);
    if (touch.distance >= 60) crossBoundary(direction);
  }, { passive: false });
  for (const name of ['touchend', 'touchcancel']) viewport.addEventListener(name, () => { touch = null; }, { passive: true });
  window.addEventListener('beforeunload', savePosition);
  // Keep the same relative reading position while the toolbar animates or fullscreen resizes.
  new ResizeObserver(() => {
    if (!dialog.open || rendering || !book) return;
    viewport.scrollTop = ratio * Math.max(0, viewport.scrollHeight - viewport.clientHeight);
    updateProgress();
  }).observe(viewport);
  dialog.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.target.matches('input, textarea, [contenteditable]')) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); void navigate(chapterIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  for (const [selector, difference] of [['#readerFontDown', -2], ['#readerFontUp', 2]]) find(selector).addEventListener('click', async () => {
    const progress = ratio; preferences.font = clamp(preferences.font + difference,14,32); applyPreferences();
    await nextFrame(); viewport.scrollTop = progress * Math.max(0,viewport.scrollHeight-viewport.clientHeight); updateProgress();
  });
  dialog.querySelectorAll('[data-reader-theme]').forEach(button => button.addEventListener('click', () => { preferences.theme = button.dataset.readerTheme; applyPreferences(); }));
  const fullscreen = find('#readerFullscreen');
  const fullscreenElement = () => document.fullscreenElement || document.webkitFullscreenElement;
  const requestFullscreen = shell.requestFullscreen || shell.webkitRequestFullscreen;
  const exitFullscreen = async () => {
    const exit = document.exitFullscreen || document.webkitExitFullscreen;
    if (exit) await exit.call(document);
  };
  function syncFullscreen() {
    const active = fullscreenElement() === shell;
    const key = active ? 'reader.exitFullscreen' : 'reader.enterFullscreen';
    fullscreen.dataset.i18nLabel = key;
    fullscreen.setAttribute('aria-label', t(key));
    fullscreen.setAttribute('aria-pressed', String(active));
    fullscreen.title = t(key);
  }
  fullscreen.hidden = !requestFullscreen || !(document.fullscreenEnabled || document.webkitFullscreenEnabled);
  fullscreen.addEventListener('click', async () => {
    fullscreen.disabled = true;
    try {
      if (fullscreenElement() === shell) await exitFullscreen();
      else await requestFullscreen.call(shell);
    } catch {
      const notice = find('#readerNotice');
      notice.textContent = t('reader.fullscreenUnavailable'); notice.hidden = false;
      clearTimeout(noticeTimer); noticeTimer = setTimeout(() => { notice.hidden = true; }, 5000);
    } finally { fullscreen.disabled = false; syncFullscreen(); }
  });
  for (const name of ['fullscreenchange', 'webkitfullscreenchange']) document.addEventListener(name, syncFullscreen);
  syncFullscreen(); syncToolbarLabels();
  window.addEventListener('epubloom:languagechange', () => {
    syncFullscreen(); syncToolbarLabels();
    if (book) { find('#readerBookTitle').textContent = book.title; renderToc(); updateProgress(); }
  });
  return { reset };
}

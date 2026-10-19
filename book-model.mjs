// Plain-text book structure and conservative, advisory diagnostics. No DOM or storage.
export const compact = text => text.replace(/\s/gu, '');
export const heading = line => /^(?:#{1,6}\s+\S|chapter\s+\S|第[\d零〇一二三四五六七八九十百千万两]+[章回节卷部篇集](?!分))/iu.test(line.trim());
const volumeHeading = line => /^(?:第[\d零〇一二三四五六七八九十百千万两]+[卷部篇](?!分)|(?:volume|part|book)\s+[\divxlcdm]+\b)/iu.test(line.trim());

export function parseText(text, language = 'en') {
  const chapters = [];
  let title = '', volume = '', body = [], start = 1;
  const flush = () => {
    chapters.push({ id: 'source-' + chapters.length, title: title || (language.startsWith('zh') ? '第1章' : 'Chapter 1'), body: body.join('\n'), volume, line: start });
    body = []; title = '';
  };
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  lines.forEach((line, index) => {
    if (volumeHeading(line)) {
      if (title) flush();
      volume = line.trim();
      body.push(line); // The volume label remains in the text as well as the TOC.
    } else if (heading(line)) {
      if (title) flush();
      title = line.trim(); start = index + 1;
    } else body.push(line);
  });
  if (title || body.some(line => line.trim())) flush();
  return chapters;
}

export function suspiciousBreaks(body) {
  const lines = body.split('\n'), result = [];
  for (let index = 0; index < lines.length - 1; index++) {
    const left = lines[index].trim(), right = lines[index + 1].trim();
    if (left.length < 14 || !right || heading(left) || heading(right) || volumeHeading(left) || volumeHeading(right)) continue;
    if ([left, right].some(line => /^(?:(?:title|author|作者|书名)\s*[:：]|《.*》$)/iu.test(line))) continue;
    if (/[.!?。！？：:；;”’"'）)\]】…—-]$/u.test(left) || /^[\s　]+/u.test(lines[index + 1])) continue;
    if (/^(?:[-*•]|\d+[.)、])\s*/u.test(right)) continue;
    result.push(index);
  }
  return result;
}

export function joinBreaks(body) {
  const lines = body.split('\n'), positions = new Set(suspiciousBreaks(body));
  return lines.map((line, index) => {
    if (!positions.has(index)) return line + (index < lines.length - 1 ? '\n' : '');
    const next = lines[index + 1];
    const space = /[\u3400-\u9fff]$/u.test(line.trim()) && /^[\u3400-\u9fff]/u.test(next.trim()) ? '' : ' ';
    return line.replace(/\s+$/u, '') + space;
  }).join('');
}

function numberOf(title) {
  const digits = '零一二三四五六七八九';
  const match = title.match(/^(?:第([\d零〇一二三四五六七八九十百千万两]+)[章回节]|chapter\s+(\d+)\b)/iu);
  if (!match) return null;
  const value = match[1] || match[2];
  if (/^\d+$/.test(value)) return Number(value);
  let total = 0, section = 0, current = 0;
  for (const char of value) {
    const unit = { 十: 10, 百: 100, 千: 1000, 万: 10000 }[char];
    if (unit === 10000) { total += (section + current || 1) * unit; section = 0; current = 0; }
    else if (unit) { section += (current || 1) * unit; current = 0; }
    else current = char === '两' ? 2 : char === '〇' ? 0 : digits.indexOf(char);
  }
  return total + section + current;
}

function hash(text) {
  let result = 2166136261;
  for (let i = 0; i < text.length; i++) result = Math.imul(result ^ text.charCodeAt(i), 16777619);
  return result >>> 0;
}

export function inspect(chapters) {
  const issues = [], titles = new Map(), bodies = new Map();
  let previous = null;
  chapters.forEach((chapter, index) => {
    if (chapter.excluded) return;
    const add = (kind, extra = {}) => issues.push({ kind, index, ...extra });
    const title = chapter.volume + '\u0000' + compact(chapter.title).toLocaleLowerCase();
    if (!chapter.title.trim()) add('untitled');
    if (titles.has(title)) add('duplicateTitle', { other: titles.get(title) + 1 });
    else titles.set(title, index);
    const text = compact(chapter.body);
    if (!text) add('empty');
    if (text.length >= 30) {
      const key = hash(text) + ':' + text.length;
      const other = bodies.get(key);
      if (other !== undefined && compact(chapters[other].body) === text) add('duplicateBody', { other: other + 1 });
      else bodies.set(key, index);
    }
    if (chapter.title.length > 70 || /[。！？]$/u.test(chapter.title) || /[.·…]{3,}\s*\d*$/u.test(chapter.title)) add('suspectHeading');
    const count = suspiciousBreaks(chapter.body).length;
    if (count) add('breaks', { count });
    const number = numberOf(chapter.title);
    if (number !== null && previous?.volume === chapter.volume && number !== previous.number + 1) add('sequence', { expected: previous.number + 1, actual: number });
    previous = number === null ? null : { number, volume: chapter.volume };
  });
  return issues;
}

export function moveChapter(chapters, index, delta) {
  const target = index + delta;
  if (target < 0 || target >= chapters.length) return index;
  [chapters[index], chapters[target]] = [chapters[target], chapters[index]];
  return target;
}

export function mergePrevious(chapters, index, introduction = 'Introduction') {
  if (index === 0) {
    chapters[0].body = chapters[0].title + '\n' + chapters[0].body;
    chapters[0].title = introduction;
    return 0;
  }
  const current = chapters[index], previous = chapters[index - 1];
  previous.body += '\n\n' + current.title + '\n' + current.body;
  chapters.splice(index, 1);
  return index - 1;
}

export function splitChapter(chapters, index, cursor, title) {
  const current = chapters[index];
  if (cursor > 0 && /[\uD800-\uDBFF]/.test(current.body[cursor - 1]) && /[\uDC00-\uDFFF]/.test(current.body[cursor])) cursor--;
  if (cursor <= 0 || cursor >= current.body.length) return index;
  const next = { ...current, id: 'split-' + Date.now() + '-' + chapters.length, title, body: current.body.slice(cursor), line: null };
  current.body = current.body.slice(0, cursor);
  chapters.splice(index + 1, 0, next);
  return index + 1;
}

export function formatText(book) {
  const chinese = book.language?.startsWith('zh');
  let text = book.title ? (chinese ? `《${book.title}》` : `Title: ${book.title}`) + '\n' : '';
  if (book.author) text += (chinese ? '作者：' : 'Author: ') + book.author + '\n';
  let volume = '';
  for (const chapter of book.chapters) {
    if (chapter.volume && chapter.volume !== volume) text += '\n' + chapter.volume + '\n';
    volume = chapter.volume;
    text += '\n' + chapter.title + '\n' + chapter.body.replace(/\s+$/u, '') + '\n';
  }
  return text;
}

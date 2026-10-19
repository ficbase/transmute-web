import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compact, parseText, inspect, joinBreaks, moveChapter, mergePrevious, splitChapter, formatText } from '../book-model.mjs';

test('TXT detection retains metadata, volume labels and every body line', () => {
  const source = 'Title: A book\r\nAuthor: Example\r\n\r\n第一卷 出发\r\n第一章 起点\r\n甲与乙。\r\n\r\n第二章 河岸\r\n新的故事。';
  const chapters = parseText(source, 'zh');
  assert.equal(chapters.length, 2);
  assert.equal(chapters[0].volume, '第一卷 出发');
  assert.ok(chapters[0].body.includes('Title: A book'));
  assert.ok(chapters[0].body.includes('第一卷 出发'));
  assert.equal(compact(chapters.map(chapter => chapter.title + chapter.body).join('')).length, compact(source).length);
});

test('diagnostics distinguish duplicate titles, duplicate bodies, sequence gaps and broken lines', () => {
  const body = 'This is a sufficiently long sentence that\ncontinues here with more words.';
  const chapters = parseText('Chapter 1\n' + body + '\n\nChapter 1\n' + body + '\n\nChapter 4\nEnd.');
  const kinds = inspect(chapters).map(issue => issue.kind);
  for (const kind of ['duplicateTitle', 'duplicateBody', 'sequence', 'breaks']) assert.ok(kinds.includes(kind), kind);
  chapters[1].excluded = true;
  assert.ok(!inspect(chapters).some(issue => issue.kind === 'duplicateBody'));
});

test('line joining preserves paragraph boundaries and does not join indented paragraphs', () => {
  const text = 'A long sentence that has been\nbroken in the middle.\n\nAnother paragraph.\n　　A separate paragraph.';
  assert.equal(joinBreaks(text), 'A long sentence that has been broken in the middle.\n\nAnother paragraph.\n　　A separate paragraph.');
  assert.equal(joinBreaks('这是一个超过十四个字符且没有结束标点的长句\n接下来继续同一个句子。'), '这是一个超过十四个字符且没有结束标点的长句接下来继续同一个句子。');
});

test('reorder, split and merge preserve body text and literal former headings', () => {
  const chapters = parseText('Chapter 1\nAlpha and beta.\n\nChapter 2\nGamma.');
  assert.equal(moveChapter(chapters, 1, -1), 0);
  assert.equal(chapters[0].title, 'Chapter 2');
  const original = chapters[1].body;
  splitChapter(chapters, 1, 6, 'Edited heading');
  assert.equal(chapters[1].body + chapters[2].body, original);
  mergePrevious(chapters, 2);
  assert.ok(chapters[1].body.includes('Edited heading'));
  assert.ok(chapters[1].body.includes('Alpha'));
  assert.ok(chapters[1].body.includes('and beta.'));
});

test('splitting cannot cut a Unicode surrogate pair', () => {
  const chapters = [{ title: 'One', body: 'A😀B', volume: '' }];
  splitChapter(chapters, 0, 2, 'Two');
  assert.equal(chapters[0].body, 'A');
  assert.equal(chapters[1].body, '😀B');
});

test('plain text export follows edited chapter and volume order', () => {
  const output = formatText({ title: 'Book', author: 'Author', language: 'en', chapters: [
    { title: 'Second first', body: 'Two.', volume: 'Part II' },
    { title: 'First second', body: 'One.', volume: 'Part I' },
  ] });
  assert.ok(output.indexOf('\nPart II\n') < output.indexOf('\nPart I\n'));
  assert.ok(output.indexOf('Two.') < output.indexOf('One.'));
});

test('numbering checks handle compound Chinese chapter numbers', () => {
  const chapters = [
    { title: '第九万九千九百九十九章', body: 'One.', volume: '' },
    { title: '第十万章', body: 'Two.', volume: '' },
    { title: '第十万零一章', body: 'Three.', volume: '' },
  ];
  assert.ok(!inspect(chapters).some(issue => issue.kind === 'sequence'));
});

// Rebuild the downloadable examples with the same WASM engine as the website.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { initSync, set_timestamp, txt_to_epub, epub_to_txt, reader_entry } from '../pkg/transmute_web.js';

const root = new URL('../', import.meta.url);
initSync({ module: fs.readFileSync(new URL('pkg/transmute_web_bg.wasm', root)) });
set_timestamp(BigInt(Date.parse('2026-10-19T00:00:00Z') / 1000));
for (const [language, name] of [['en', 'sample-en'], ['zh', 'sample']]) {
  const text = fs.readFileSync(new URL(`examples/${name}.txt`, root), 'utf8');
  const epub = txt_to_epub(text, undefined, undefined, undefined, JSON.stringify({ language }));
  const restored = epub_to_txt(epub);
  const nav = new TextDecoder().decode(reader_entry(epub, 'OEBPS/nav.xhtml'));
  assert.equal((nav.match(/chapter\d+\.xhtml/g) || []).length, 2);
  for (const line of text.trim().split('\n').filter(Boolean)) assert.ok(restored.includes(line), `Missing example line: ${line}`);
  fs.writeFileSync(new URL(`examples/${name}.epub`, root), epub);
  fs.writeFileSync(new URL(`examples/${name}-cover.svg`, root), reader_entry(epub, 'OEBPS/images/cover.svg'));
  console.log(`Verified ${fileURLToPath(new URL(`examples/${name}.epub`, root))}: 2 chapters, all source lines retained`);
}

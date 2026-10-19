const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { spawnSync } = require('node:child_process');
const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:8767/';
const sample = `Title: Chapter workshop\nAuthor: EpuBloom\n\nChapter 1\nAn original beginning.\n\nChapter 2\nA repeated chapter body with enough characters to identify a genuine duplicate.\n\nChapter 2\nA repeated chapter body with enough characters to identify a genuine duplicate.\n\nChapter 4\nThis is a long sentence that was accidentally\nbroken while copying.\n\nKeep this paragraph separate.\n`;
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
  try {
    for (const language of ['en', 'zh']) {
      const page = await browser.newPage({ viewport: { width: language === 'zh' ? 390 : 1366, height: 800 } });
      const errors = []; page.on('pageerror', error => errors.push(error.message));
      await page.route('https://pagead2.googlesyndication.com/**', route => route.abort());
      await page.goto(base + (language === 'zh' ? 'zh/' : ''));
      await page.locator('#fileInput').setInputFiles({ name: 'workshop.txt', mimeType: 'text/plain', buffer: Buffer.from(sample) });
      await page.locator('#inspectBtn').click();
      assert.equal(await page.locator('[data-work-chapter]').count(), 4);
      for (const kind of ['duplicateTitle', 'duplicateBody', 'breaks', 'sequence']) assert.ok(await page.locator(`[data-work-issue=${kind}]`).count(), kind);
      await page.locator('[data-work-chapter="2"]').click();
      await page.locator('#workExclude').click();
      await page.locator('[data-work-chapter="3"]').click();
      await page.locator('#workJoin').click();
      assert.ok((await page.locator('#workBody').inputValue()).includes('accidentally broken'));
      await page.locator('#workTitle').fill('A revised ending');
      await page.locator('#workVolume').fill('Part B');
      await page.locator('#workUp').click();
      await page.locator('[data-work-chapter="0"]').click();
      await page.locator('#workVolume').fill('Part A');
      await page.locator('[data-work-chapter="1"]').click();
      await page.locator('#workVolume').fill('Part A');
      // Splitting at a real selection and undoing restores every original body character.
      const original = await page.locator('#workBody').inputValue();
      await page.locator('#workBody').evaluate(element => { element.focus(); element.setSelectionRange(20, 20); element.dispatchEvent(new Event('select')); });
      await page.locator('#workSplit').click();
      assert.equal(await page.locator('[data-work-chapter]').count(), 5);
      await page.locator('#workUndo').click();
      assert.equal(await page.locator('#workBody').inputValue(), original);
      assert.equal(await page.locator('[data-work-chapter]').count(), 4);
      assert.equal(await page.locator('#bookWorkbench').evaluate(element => element.scrollWidth > element.clientWidth), false);
      await page.screenshot({ path: '/tmp/epubloom-workbench-' + language + '.png' });
      await page.locator('#workDone').click();
      await page.locator('#convertBtn').click(); await page.locator('#downloadBtn.show').waitFor();
      const report = await page.locator('#exportReport').textContent();
      assert.ok(report.includes(language === 'zh' ? '核对通过' : 'checks passed'));
      assert.ok(report.includes(language === 'zh' ? '主动排除 1 章' : '1 chapters intentionally excluded'));
      const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#downloadBtn').click()]);
      const archive = await download.path();
      const result = spawnSync('python3', ['-c', `import zipfile,sys,xml.etree.ElementTree as E,json
with zipfile.ZipFile(sys.argv[1]) as z:
 n=E.fromstring(z.read('OEBPS/nav.xhtml'));ns={'h':'http://www.w3.org/1999/xhtml'}
 print(json.dumps({'titles':[x.text for x in n.findall('.//h:a',ns)],'volumes':[x.text for x in n.findall('.//h:span',ns)],'body':z.read('OEBPS/chapter3.xhtml').decode()}))`, archive], { encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
      const content = JSON.parse(result.stdout);
      assert.deepEqual(content.titles, ['Chapter 1', 'Chapter 2', 'A revised ending']);
      assert.deepEqual(content.volumes, ['Part A', 'Part B']);
      assert.ok(content.body.includes('accidentally broken'));
      // Deliberately compare against wrong text and wrong order: checks must fail.
      const negative = await page.evaluate(async bytes => {
        const converter = document.querySelector('script[src*="converter.js"]').src;
        const source = await (await fetch(converter)).text();
        const relative = source.match(/from ['"]([^'"]*book-workbench\.js[^'"]*)['"]/)[1];
        const module = await import(new URL(relative, converter).href);
        const data = new Uint8Array(bytes);
        const book = await module.extractBook({ bytes: data, file: { name: 'test.epub' } });
        const wrongBody = { ...book, chapters: book.chapters.map(chapter => ({ ...chapter })) };
        wrongBody.chapters[0].body += 'Missing content';
        return { body: module.verifyEPUB(data, wrongBody).body, order: module.verifyEPUB(data, { ...book, chapters: [...book.chapters].reverse() }).order };
      }, [...fs.readFileSync(archive)]);
      assert.deepEqual(negative, { body: false, order: false });
      // The same exported EPUB can be reviewed, reordered, and exported to TXT.
      await page.locator('#fileInput').setInputFiles({ name: 'edited.epub', mimeType: 'application/epub+zip', buffer: fs.readFileSync(archive) });
      await page.locator('#inspectBtn').click();
      assert.equal(await page.locator('[data-work-chapter]').count(), 3);
      assert.equal(await page.locator('#workVolume').inputValue(), 'Part A');
      await page.locator('[data-work-chapter="2"]').click();
      assert.equal(await page.locator('#workVolume').inputValue(), 'Part B');
      await page.locator('#workUp').click(); await page.locator('#workUp').click();
      await page.locator('#workDone').click();
      await page.locator('#convertBtn').click(); await page.locator('#downloadBtn.show').waitFor();
      const [txt] = await Promise.all([page.waitForEvent('download'), page.locator('#downloadBtn').click()]);
      const plain = fs.readFileSync(await txt.path(), 'utf8');
      assert.ok(plain.indexOf('A revised ending') < plain.indexOf('Chapter 1'));
      assert.ok(plain.includes('Keep this paragraph separate.'));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.deepEqual(errors, []);
      await page.close();
    }
    console.log('PASS: diagnostics; chapter/volume editing; exclusion, move, split and undo; actual EPUB text/TOC/order/volume checks; negative verification; reordered EPUB-to-TXT; bilingual mobile layout.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

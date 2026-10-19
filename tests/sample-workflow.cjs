// Exercise the public demo as a visitor: reading, conversion, failures and races.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:8767/';
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
  try {
    for (const language of ['en', 'zh']) {
      const page = await browser.newPage({ viewport: { width: language === 'zh' ? 390 : 1366, height: language === 'zh' ? 844 : 700 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('https://pagead2.googlesyndication.com/**', route => route.abort());
      await page.goto(base + (language === 'zh' ? 'zh/' : ''));
      const sample = language === 'zh' ? 'sample' : 'sample-en';
      await page.locator('[data-demo-file=txt]').click();
      await page.waitForFunction(() => !!document.querySelector('#metaTitle').value && !document.querySelector('#convertBtn').disabled);
      assert.equal(await page.locator('#fileName').textContent(), sample + '.txt');
      await page.locator('#readBtn').click();
      await page.waitForFunction(() => document.querySelector('#readerViewport').getAttribute('aria-busy') === 'false');
      assert.equal(await page.locator('.reader-toc-item').count(), 2);
      await page.locator('#readerClose').click();
      await page.locator('#convertBtn').click();
      await page.locator('#downloadBtn.show').waitFor();
      const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#downloadBtn').click()]);
      const generated = await download.path();
      assert.ok(fs.readFileSync(generated).subarray(0, 2).equals(Buffer.from('PK')));
      assert.match(download.suggestedFilename(), /\.epub$/);
      await page.locator('#fileRemove').click();
      await page.locator('[data-demo-file=epub]').click();
      await page.waitForFunction(() => document.querySelector('#fileName').textContent.endsWith('.epub'));
      await page.locator('#readBtn').click();
      await page.waitForFunction(() => document.querySelector('#readerViewport').getAttribute('aria-busy') === 'false');
      assert.equal(await page.locator('.reader-toc-item').count(), 2);
      await page.locator('#readerClose').click();
      await page.locator('#convertBtn').click();
      await page.locator('#downloadBtn.show').waitFor();
      const [textDownload] = await Promise.all([page.waitForEvent('download'), page.locator('#downloadBtn').click()]);
      const restored = fs.readFileSync(await textDownload.path(), 'utf8');
      const original = fs.readFileSync(path.join(__dirname, '../examples/' + sample + '.txt'), 'utf8');
      for (const line of original.trim().split('\n').filter(Boolean)) assert.ok(restored.includes(line));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.deepEqual(errors, []);
      await page.locator('#fileRemove').click();
      await page.screenshot({ path: '/tmp/epubloom-demo-' + language + '.png', fullPage: true });
      await page.close();
    }
    const page = await browser.newPage();
    await page.route('https://pagead2.googlesyndication.com/**', route => route.abort());
    await page.goto(base);
    await page.route('**/examples/sample-en.txt', route => route.fulfill({ status: 503, body: 'Unavailable' }));
    await page.locator('[data-demo-file=txt]').click();
    await page.waitForFunction(() => document.querySelector('#status').classList.contains('error'));
    assert.equal(await page.locator('#converterActions').isVisible(), false);
    assert.equal(await page.locator('[data-demo-file=txt]').isEnabled(), true);
    await page.unroute('**/examples/sample-en.txt');
    let release;
    const pending = new Promise(resolve => { release = resolve; });
    await page.route('**/examples/sample-en.txt', async route => { await pending; await route.continue(); });
    await page.locator('[data-demo-file=txt]').click();
    await page.locator('#fileInput').setInputFiles({ name: 'my-draft.txt', mimeType: 'text/plain', buffer: Buffer.from('Title: My draft\n\nChapter 1\nPrivate words.') });
    release();
    await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('#fileName').textContent(), 'my-draft.txt');
    await page.close();
    console.log('PASS: English/Chinese TXT and EPUB samples read and convert; source lines retained; mobile reflows; failures recover; late requests preserve a selected draft.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

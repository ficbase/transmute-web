// Optional browser regression checks. Install Playwright and serve a production build first.
// SITE_TEST_URL defaults to http://127.0.0.1:8767/; PLAYWRIGHT_CHROMIUM_EXECUTABLE is optional.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:8767/';
const text = ['Title: Reading controls', 'Author: EpuBloom', '', ...[1, 2, 3].flatMap(index => [
  `Chapter ${index}`, '', ...Array.from({ length: index === 2 ? 1 : 40 }, (_, paragraph) => `Paragraph ${paragraph + 1}. A quiet walk along the river.\n`),
])].join('\n');
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1366, height: 650 } });
    page.setDefaultTimeout(10000);
    page.on('pageerror', error => errors.push(error.message));
    await page.route('https://pagead2.googlesyndication.com/**', route => route.abort());
    async function ready(index) {
      await page.waitForFunction(index => {
        const active = document.querySelector('.reader-toc-item[aria-current=true]');
        return document.querySelector('#readerViewport').getAttribute('aria-busy') === 'false' && active?.dataset.chapter === String(index);
      }, index);
    }
    async function open() {
      await page.locator('#fileInput').setInputFiles({ name: 'controls.txt', mimeType: 'text/plain', buffer: Buffer.from(text) });
      await page.locator('#readBtn').click(); await ready(0);
    }
    async function edge(bottom) {
      await page.locator('#readerViewport').evaluate((element, bottom) => { element.scrollTop = bottom ? element.scrollHeight : 0; }, bottom);
      await page.waitForTimeout(550);
      const bounds = await page.locator('#readerViewport').boundingBox();
      await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
    }
    async function top() {
      const bounds = await page.locator('#readerShell').boundingBox();
      await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + 1);
      await page.waitForFunction(() => !document.querySelector('#readerToolbar').inert);
      await page.waitForTimeout(260);
    }
    async function away() {
      const bounds = await page.locator('#readerViewport').boundingBox();
      await page.mouse.move(bounds.x + bounds.width / 2 + 12, bounds.y + bounds.height / 2);
      await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
      await page.waitForTimeout(480);
    }
    async function contents() {
      const bounds = await page.locator('#readerShell').boundingBox();
      await page.mouse.move(bounds.x + bounds.width - 1, bounds.y + bounds.height / 2);
      await page.waitForFunction(() => !document.querySelector('#readerToc').inert);
      await page.waitForTimeout(260);
    }
    async function wheel(delta) { await page.mouse.wheel(0, delta); }
    async function touchGesture(startY, endY, finish = true) {
      await page.locator('#readerViewport').evaluate((element, { startY, endY, finish }) => {
        const point = y => new Touch({ identifier: 1, target: element, clientX: 100, clientY: y });
        element.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [point(startY)] }));
        element.dispatchEvent(new TouchEvent('touchmove', { bubbles: true, cancelable: true, touches: [point(endY)] }));
        if (finish) element.dispatchEvent(new TouchEvent('touchend', { bubbles: true, touches: [] }));
      }, { startY, endY, finish });
    }
    await page.goto(base); await open(); console.log('Opened source');
    // The actual native fullscreen target must be a container, not the modal dialog.
    await page.locator('#readerFullscreen').click();
    await page.waitForFunction(() => document.fullscreenElement?.id === 'readerShell');
    assert.equal(await page.locator('#readerFullscreen').getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('#onlineReader').evaluate(element => element.open), true);
    await page.locator('#readerToolbarToggle').click(); await page.waitForTimeout(300);
    assert.equal(await page.locator('#readerToolbar').evaluate(element => element.inert), true);
    assert.equal(await page.locator('#readerClose').isVisible(), false);
    assert.equal(await page.evaluate(() => document.fullscreenElement.id), 'readerShell');
    await top();
    await page.locator('#readerToolbarToggle').click(); await page.waitForTimeout(300);
    await page.locator('#readerFullscreen').click();
    await page.waitForFunction(() => !document.fullscreenElement);
    assert.equal(await page.locator('#readerFullscreen').getAttribute('aria-pressed'), 'false');
    console.log('Native fullscreen passed');
    // Auto-hide removes the entire toolbar; edge reveals are overlays and preserve the text geometry.
    await page.locator('#readerViewport').evaluate(element => { element.scrollTop = (element.scrollHeight - element.clientHeight) * .4; });
    await page.waitForTimeout(100);
    const height = await page.locator('#readerViewport').evaluate(element => element.clientHeight);
    await page.locator('#readerToolbarToggle').click(); await page.waitForTimeout(300);
    assert.equal(await page.locator('#readerToolbarToggle').getAttribute('aria-expanded'), 'false');
    assert.equal(await page.locator('#readerToolbar').evaluate(element => element.inert), true);
    assert.equal(await page.locator('#readerClose').isVisible(), false);
    assert.ok(await page.locator('#readerViewport').evaluate(element => element.clientHeight) > height);
    assert.ok(Math.abs(await page.locator('#readerViewport').evaluate(element => element.scrollTop / (element.scrollHeight - element.clientHeight)) - .4) < .02);
    assert.equal(await page.locator('#readerToolbar').isVisible(), false);
    const readingBounds = await page.locator('#readerViewport').boundingBox();
    await page.screenshot({ path: '/tmp/reader-edge-hidden-desktop.png' });
    await top(); assert.equal(await page.locator('#readerClose').isVisible(), true);
    assert.deepEqual(await page.locator('#readerViewport').boundingBox(), readingBounds);
    await away(); assert.equal(await page.locator('#readerToolbar').isVisible(), false);
    assert.equal(await page.locator('#readerToc').isVisible(), false);
    await contents(); assert.equal(await page.locator('#readerToc').isVisible(), true);
    await page.screenshot({ path: '/tmp/reader-edge-contents-desktop.png' });
    assert.deepEqual(await page.locator('#readerViewport').boundingBox(), readingBounds);
    await page.locator('#readerSearch').fill('Chapter 2');
    assert.equal(await page.locator('.reader-toc-item').count(), 1);
    await page.locator('#readerSearch').fill('');
    await away(); assert.equal(await page.locator('#readerToc').isVisible(), false);
    await page.locator('#readerToolbarReveal').focus();
    await page.waitForFunction(() => document.activeElement?.id === 'readerTocToggle');
    await page.waitForTimeout(250); assert.equal(await page.locator('#readerToolbar').isVisible(), true);
    await away(); assert.equal(await page.locator('#readerToolbar').isVisible(), false);
    await page.locator('#readerTocReveal').focus();
    await page.waitForFunction(() => document.activeElement?.id === 'readerSearch');
    await away(); assert.equal(await page.locator('#readerToc').isVisible(), false);
    await top();
    await page.locator('#readerToolbarToggle').click(); await page.waitForTimeout(300);
    console.log('Toolbar passed');
    // At an interior position the wheel scrolls normally, never changes chapters.
    await wheel(80); await page.waitForTimeout(100); await ready(0);
    await edge(true); await wheel(120); await ready(1);
    assert.equal(await page.locator('#readerViewport').evaluate(element => element.scrollTop), 0);
    // Momentum after a transition cannot chain through the short second chapter.
    for (let index = 0; index < 8; index++) await wheel(120);
    await page.waitForTimeout(100); await ready(1);
    await edge(true); await wheel(120); await ready(2);
    await edge(false); await wheel(-120); await ready(1);
    assert.ok(await page.locator('#readerViewport').evaluate(element => element.scrollTop + element.clientHeight >= element.scrollHeight - 2));
    await edge(false); await wheel(-120); await ready(0);
    assert.ok(await page.locator('#readerViewport').evaluate(element => element.scrollTop + element.clientHeight >= element.scrollHeight - 2));
    console.log('Wheel transitions passed');
    // Book boundaries and horizontal/zoom gestures stay in the same chapter.
    await edge(false); await wheel(-200); await ready(0);
    await edge(true); await page.mouse.wheel(200, 0); await ready(0);
    await page.locator('#readerViewport').dispatchEvent('wheel', { deltaY: 200, ctrlKey: true }); await ready(0);
    await page.locator('#readerNext').click(); await ready(1);
    await page.locator('#readerNext').click(); await ready(2);
    await edge(true); await wheel(200); await ready(2);
    // Touch gestures have the same directions and allow only one transition per swipe.
    await page.locator('#readerPrevious').click(); await ready(1);
    await edge(true); await touchGesture(400, 300, false); await ready(2);
    await page.locator('#readerViewport').evaluate(element => element.dispatchEvent(new TouchEvent('touchmove', { bubbles: true, cancelable: true, touches: [new Touch({ identifier: 1, target: element, clientX: 100, clientY: 100 })] })));
    await ready(2);
    await edge(false); await touchGesture(200, 300); await ready(1);
    assert.ok(await page.locator('#readerViewport').evaluate(element => element.scrollTop + element.clientHeight >= element.scrollHeight - 2));
    console.log('Touch transitions passed');
    // Close while fullscreen restores the original page and leaves no fullscreen behind.
    await page.locator('#readerFullscreen').click(); await page.waitForFunction(() => document.fullscreenElement);
    await page.locator('#readerClose').click(); await page.waitForFunction(() => !document.fullscreenElement && !document.querySelector('#onlineReader').open);
    await page.locator('#readBtn').click(); await ready(1);
    assert.equal(await page.locator('#readerToolbarToggle').getAttribute('aria-expanded'), 'true');
    // Both languages, small screens, and compact toolbar geometry.
    for (const locale of ['', 'zh/']) for (const width of [320, 390, 1280]) {
      await page.locator('#readerClose').click(); await page.goto(base + locale);
      await page.setViewportSize({ width, height: 700 }); await page.evaluate(() => localStorage.removeItem('epubloom.reader.positions')); await open();
      for (const collapsed of [false, true]) {
        if (collapsed) { await page.locator('#readerToolbarToggle').click(); await away(); assert.equal(await page.locator('#readerToolbar').isVisible(), false); await top(); }
        assert.equal(await page.locator('#readerShell').evaluate(element => element.scrollWidth <= element.clientWidth), true);
        for (const selector of ['#readerClose', '#readerToolbarToggle', '#readerNext']) {
          const bounds = await page.locator(selector).boundingBox();
          assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width && bounds.y + bounds.height <= 700, selector + ' fits ' + width);
        }
      }
      await away(); await top(); await page.locator('#readerToolbarToggle').click(); await away();
      if (width === 390) await page.screenshot({ path: '/tmp/reader-controls-' + (locale ? 'zh' : 'en') + '.png' });
    }
    assert.deepEqual(errors, []);
    // An API denial gives visible feedback without clearing the chapter.
    const denied = await browser.newPage();
    denied.setDefaultTimeout(10000);
    await denied.addInitScript(() => { Element.prototype.requestFullscreen = async function () { throw new Error('Fullscreen denied'); }; });
    await denied.route('https://pagead2.googlesyndication.com/**', route => route.abort());
    await denied.goto(base);
    await denied.locator('#fileInput').setInputFiles({ name: 'controls.txt', mimeType: 'text/plain', buffer: Buffer.from(text) });
    await denied.locator('#readBtn').click(); await denied.waitForFunction(() => document.querySelector('#readerArticle').childElementCount);
    await denied.locator('#readerFullscreen').click(); assert.equal(await denied.locator('#readerNotice').isVisible(), true);
    assert.match(await denied.locator('#readerArticle').innerText(), /Chapter 1/);
    // Actual touchscreen taps can reveal both invisible edge controls and dismiss on the text.
    const mobile = await browser.newPage({ viewport: { width: 390, height: 700 }, hasTouch: true, isMobile: true });
    mobile.setDefaultTimeout(10000);
    await mobile.route('https://pagead2.googlesyndication.com/**', route => route.abort());
    await mobile.goto(base + 'zh/');
    await mobile.locator('#fileInput').setInputFiles({ name: 'touch.txt', mimeType: 'text/plain', buffer: Buffer.from(text) });
    await mobile.locator('#readBtn').tap(); await mobile.waitForFunction(() => document.querySelector('#readerArticle').childElementCount);
    await mobile.locator('#readerToolbarToggle').tap(); await mobile.waitForTimeout(300);
    assert.equal(await mobile.locator('#readerToolbar').isVisible(), false);
    await mobile.touchscreen.tap(150, 3); await mobile.waitForTimeout(300);
    assert.equal(await mobile.locator('#readerToolbar').isVisible(), true);
    await mobile.touchscreen.tap(150, 300); await mobile.waitForTimeout(300);
    assert.equal(await mobile.locator('#readerToolbar').isVisible(), false);
    await mobile.touchscreen.tap(388, 300); await mobile.waitForTimeout(300);
    assert.equal(await mobile.locator('#readerToc').isVisible(), true);
    await mobile.locator('.reader-toc-item').last().tap();
    await mobile.waitForTimeout(300); assert.equal(await mobile.locator('#readerToc').isVisible(), false);
    await mobile.touchscreen.tap(388, 300); await mobile.waitForTimeout(300);
    await mobile.touchscreen.tap(20, 300); await mobile.waitForTimeout(300);
    assert.equal(await mobile.locator('#readerToc').isVisible(), false);
    await mobile.screenshot({ path: '/tmp/reader-edge-hidden-mobile.png' });
    console.log('PASS: native fullscreen, fully hidden toolbar, top/right mouse reveal and leave, unchanged reading geometry, keyboard and real touch edge controls, wheel/touch cross-chapter navigation, bilingual layouts.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

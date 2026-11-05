const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/passport-3d-stp', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/home/z/my-project/download/passport-top.png', fullPage: false });
  // Прокрутка к разделу "Что входит"
  await page.evaluate(() => {
    const el = document.getElementById('chto-vhodit');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/z/my-project/download/passport-chto-vhodit.png', fullPage: false });
  // Прокрутка к разделу инженерных систем
  await page.evaluate(() => {
    const el = document.getElementById('kak-delayut');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/z/my-project/download/passport-engineering.png', fullPage: false });
  await browser.close();
  console.log('OK');
})().catch(e => { console.error(e); process.exit(1); });

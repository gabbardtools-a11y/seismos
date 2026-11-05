const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 200 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2500);
  // Скриншот только верхней полосы (где глобус + текст SDG 11)
  await page.screenshot({ path: '/home/z/my-project/download/header-globe-spin.png', fullPage: false, clip: { x: 0, y: 0, width: 1440, height: 200 } });
  // Подождём пол-оборота и сделаем ещё скриншот
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/home/z/my-project/download/header-globe-spin-2.png', fullPage: false, clip: { x: 0, y: 0, width: 1440, height: 200 } });
  await browser.close();
  console.log('OK');
})().catch(e => { console.error(e); process.exit(1); });

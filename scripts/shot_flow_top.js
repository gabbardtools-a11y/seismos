const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(7000);
  // Кроп верхней части hero, где h1 + глобус
  await page.screenshot({
    path: '/home/z/my-project/download/hero-flow-top.png',
    clip: { x: 0, y: 350, width: 1440, height: 480 }
  });
  await browser.close();
  console.log('OK');
})();

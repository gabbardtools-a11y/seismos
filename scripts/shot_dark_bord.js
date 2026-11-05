const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 300 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: '/home/z/my-project/download/header-dark-bord.png', fullPage: false, clip: { x: 0, y: 0, width: 1440, height: 220 } });
  await browser.close();
  console.log('OK');
})();

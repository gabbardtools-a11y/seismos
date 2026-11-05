// Скриншот news-страницы (верх) и hero главной — для визуальной проверки
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();

  // 1) Hero — главный экран
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: '/home/z/my-project/download/hero-expertise-line.png', fullPage: false });

  // 2) Страница /news — верх + середина
  await page.goto('http://localhost:3000/news', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/z/my-project/download/news-refreshed-top.png', fullPage: false });
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/home/z/my-project/download/news-refreshed-mid.png', fullPage: false });

  await browser.close();
  console.log('OK screenshots saved');
})().catch(e => { console.error(e); process.exit(1); });

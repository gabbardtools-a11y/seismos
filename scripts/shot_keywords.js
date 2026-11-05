const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(4000);
  // Прокрутка к блоку ключевых слов
  await page.evaluate(() => {
    const el = document.querySelector('[class*="Ключевые"]') || document.querySelector('p');
    const blocks = document.querySelectorAll('div');
    for (const b of blocks) {
      if (b.textContent && b.textContent.includes('Ключевые направления')) {
        b.scrollIntoView({ behavior: 'instant', block: 'center' });
        break;
      }
    }
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/home/z/my-project/download/keyword-links.png', fullPage: false });
  await browser.close();
  console.log('OK');
})().catch(e => { console.error(e); process.exit(1); });

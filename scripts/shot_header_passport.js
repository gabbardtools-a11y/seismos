const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/home/z/my-project/download/header-globe-user.png', fullPage: false });

  // Клик на глобус — проверить dropdown языков
  const globe = await page.locator('button[aria-label="Выбрать язык"]').first();
  if (globe) {
    await globe.click().catch(() => {});
    await page.waitForTimeout(800);
    await page.screenshot({ path: '/home/z/my-project/download/header-lang-dropdown.png', fullPage: false });
  }
  await page.keyboard.press('Escape').catch(() => {});

  // Страница passport-3d-stp
  await page.goto('http://localhost:3000/passport-3d-stp', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: '/home/z/my-project/download/passport-3d-stp.png', fullPage: false });

  // Прокрутка вниз — проверить блок Смотрите также
  await page.evaluate(() => window.scrollTo(0, 4500));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/z/my-project/download/passport-related.png', fullPage: false });

  await browser.close();
  console.log('OK');
})().catch(e => { console.error(e); process.exit(1); });

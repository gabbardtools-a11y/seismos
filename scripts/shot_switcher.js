const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(4000);
  // Скриншот — вид "Глобус" (по умолчанию)
  await page.screenshot({ path: '/home/z/my-project/download/hero-switch-globe.png', fullPage: false });
  // Клик на "Карта"
  const mapBtn = await page.getByRole('button', { name: 'Показать карту' }).first();
  if (mapBtn) {
    await mapBtn.click().catch(() => {});
    await page.waitForTimeout(2500);
    await page.screenshot({ path: '/home/z/my-project/download/hero-switch-map.png', fullPage: false });
  }
  await browser.close();
  console.log('OK');
})().catch(e => { console.error(e); process.exit(1); });

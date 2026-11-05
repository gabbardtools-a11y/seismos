// Скриншот страницы /seismo-globus
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();

  await page.goto('http://localhost:3000/seismo-globus', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: '/home/z/my-project/download/seismo-globus-page.png', fullPage: false });

  // Прокрутка вниз — показать инфокарточки и SEO-блок
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/home/z/my-project/download/seismo-globus-bottom.png', fullPage: false });

  // Десктоп: открыть дропдаун «Инфо» и проверить, что ссылка «Сейсмо Глобус» появилась в меню
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  // Находим и кликаем по пункту «Инфо»
  const infoBtn = await page.getByRole('button', { name: /Инфо|Info/i }).first();
  if (infoBtn) {
    await infoBtn.click().catch(() => {});
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/home/z/my-project/download/seismo-globus-menu.png', fullPage: false });
  }

  await browser.close();
  console.log('OK');
})().catch(e => { console.error(e); process.exit(1); });

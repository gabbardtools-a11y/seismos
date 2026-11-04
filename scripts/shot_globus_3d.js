// Скриншот страницы /seismo-globus с интерактивным глобусом
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();

  // Слушаем ошибки консоли и запросы
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push('PAGE: ' + err.message));

  await page.goto('http://localhost:3000/seismo-globus', { waitUntil: 'networkidle', timeout: 90000 });
  // Ждём, пока three.js Canvas отрисуется и данные загрузятся
  await page.waitForTimeout(8000);

  await page.screenshot({ path: '/home/z/my-project/download/seismo-globus-3d.png', fullPage: false });

  // Прокрутка вниз — показать инфокарточки и SEO-блок
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/home/z/my-project/download/seismo-globus-3d-bottom.png', fullPage: false });

  console.log('Errors captured:', errors.length);
  if (errors.length) console.log(errors.slice(0, 5).join('\n'));

  await browser.close();
  console.log('OK');
})().catch(e => { console.error(e); process.exit(1); });

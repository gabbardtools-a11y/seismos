// Скриншот глобуса в режиме «Точки» — проверяем, что океан стал голубым
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();

  await page.goto('http://localhost:3000/seismo-globus', { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(7000);

  // Кликаем «Точки» в правом верхнем углу глобуса
  const dotsBtn = await page.getByRole('button', { name: 'Точки' }).first();
  if (dotsBtn) {
    await dotsBtn.click().catch(() => {});
    await page.waitForTimeout(3500); // ждём перестроение сферы
  } else {
    console.log('Кнопка «Точки» не найдена');
  }

  await page.screenshot({ path: '/home/z/my-project/download/seismo-globus-dots-ocean.png', fullPage: false });

  await browser.close();
  console.log('OK');
})().catch(e => { console.error(e); process.exit(1); });

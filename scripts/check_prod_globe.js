const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const errors = [];
  const failedRequests = [];

  page.on('pageerror', err => errors.push('PAGE: ' + err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push('CONSOLE: ' + msg.text());
  });
  page.on('requestfailed', req => {
    failedRequests.push(req.url() + ' — ' + req.failure().errorText);
  });

  // Проверяем /seismo-globus (полный глобус)
  console.log('=== /seismo-globus ===');
  await page.goto('https://seismos.ru/seismo-globus', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(8000);

  // Проверяем есть ли canvas
  const canvasCount = await page.locator('canvas').count();
  console.log('Canvas elements:', canvasCount);

  // Проверяем есть ли ошибки
  console.log('Errors:', errors.length);
  errors.slice(0, 10).forEach(e => console.log(' -', e.substring(0, 200)));
  console.log('Failed requests:', failedRequests.length);
  failedRequests.slice(0, 10).forEach(e => console.log(' -', e.substring(0, 200)));

  // Скриншот
  await page.screenshot({ path: '/home/z/my-project/download/prod-globus-check.png', fullPage: false });

  // Проверяем главную — глобус в hero
  console.log('\n=== / (главная) ===');
  errors.length = 0;
  failedRequests.length = 0;
  await page.goto('https://seismos.ru/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(6000);
  const canvasCount2 = await page.locator('canvas').count();
  console.log('Canvas elements:', canvasCount2);
  console.log('Errors:', errors.length);
  errors.slice(0, 10).forEach(e => console.log(' -', e.substring(0, 200)));
  console.log('Failed requests:', failedRequests.length);
  failedRequests.slice(0, 10).forEach(e => console.log(' -', e.substring(0, 200)));

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

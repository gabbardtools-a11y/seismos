const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push('PAGE: ' + err.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push('CONSOLE: ' + msg.text()); });

  await page.goto('http://localhost:3000/passport-3d-stp', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.goto('http://localhost:3000/raschet-seysmostoykosti', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.goto('http://localhost:3000/seismo_sertifikat', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  console.log('Errors captured:', errors.length);
  errors.slice(0, 10).forEach(e => console.log(' -', e.substring(0, 200)));

  // Скриншот login
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/z/my-project/download/login-page.png', fullPage: false });

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

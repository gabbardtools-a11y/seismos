// Скриншот hero с глобусом — десктоп и мобильный
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  // === ДЕСКТОП 1440x900 ===
  const deskCtx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const deskPage = await deskCtx.newPage();
  await deskPage.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 });
  await deskPage.waitForTimeout(9000); // ждём загрузки глобуса + текстур
  await deskPage.screenshot({ path: '/home/z/my-project/download/hero-globe-desktop.png', fullPage: false });

  // Прокрутка чуть вниз, чтобы увидеть как глобус и текст вписаны
  await deskPage.evaluate(() => window.scrollTo(0, 100));
  await deskPage.waitForTimeout(800);
  await deskPage.screenshot({ path: '/home/z/my-project/download/hero-globe-desktop-2.png', fullPage: false });
  await deskCtx.close();

  // === МОБИЛЬНЫЙ 390x844 (iPhone 14) ===
  const mobCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const mobPage = await mobCtx.newPage();
  await mobPage.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 });
  await mobPage.waitForTimeout(8000);
  await mobPage.screenshot({ path: '/home/z/my-project/download/hero-globe-mobile.png', fullPage: false });
  // Прокрутка к глобусу на мобильном
  await mobPage.evaluate(() => window.scrollTo(0, 900));
  await mobPage.waitForTimeout(800);
  await mobPage.screenshot({ path: '/home/z/my-project/download/hero-globe-mobile-2.png', fullPage: false });
  await mobCtx.close();

  await browser.close();
  console.log('OK');
})().catch(e => { console.error(e); process.exit(1); });

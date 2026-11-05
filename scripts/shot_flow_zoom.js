// Скриншот с зумом на область текст+глобус, чтобы увидеть обтекание
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(7000);

  // Скриншот верхней части hero (где глобус + текст сбоку)
  await page.screenshot({
    path: '/home/z/my-project/download/hero-flow-zoom.png',
    clip: { x: 0, y: 80, width: 1440, height: 600 }
  });

  // Получим bounding box глобуса и текста, чтобы понять геометрию
  const boxes = await page.evaluate(() => {
    const floated = document.querySelector('[shape-outside], [class*="shape-outside"]') ||
      Array.from(document.querySelectorAll('div')).find(d => getComputedStyle(d).shapeOutside && getComputedStyle(d).shapeOutside !== 'none');
    const h1 = document.querySelector('h1');
    const floatedBox = floated ? floated.getBoundingClientRect() : null;
    const h1Box = h1 ? h1.getBoundingClientRect() : null;
    return { floatedBox, h1Box };
  });
  console.log('Boxes:', JSON.stringify(boxes, null, 2));

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

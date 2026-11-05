// Проверяем применён ли shape-outside через getComputedStyle
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(6000);

  // Найти floated-обёртку глобуса (по shape-outside в inline style или классе)
  const info = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'));
    const results = [];
    for (const el of all) {
      const cs = getComputedStyle(el);
      if (cs.shapeOutside && cs.shapeOutside !== 'none') {
        results.push({
          tag: el.tagName,
          className: el.className,
          shapeOutside: cs.shapeOutside,
          float: cs.float,
          width: cs.width,
          height: cs.height,
          shapeMargin: cs.shapeMargin,
        });
      }
    }
    return {
      found: results.length,
      items: results,
      // Проверим поддерживается ли shape-outside
      supported: CSS.supports('shape-outside', 'circle(50%)'),
    };
  });

  console.log(JSON.stringify(info, null, 2));

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

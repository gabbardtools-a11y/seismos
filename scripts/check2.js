const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(5000);
  const info = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const cs = getComputedStyle(h1);
    const rect = h1.getBoundingClientRect();
    const floated = document.querySelector('[class*="shape-outside"]');
    const frect = floated.getBoundingClientRect();
    return {
      h1: {
        width: cs.width,
        maxWidth: cs.maxWidth,
        display: cs.display,
        rect: { x: rect.x, right: rect.right, width: rect.width, top: rect.top, bottom: rect.bottom }
      },
      floated: {
        rect: { x: frect.x, right: frect.right, width: frect.width, top: frect.top, bottom: frect.bottom }
      },
      verticalOverlap: Math.max(0, Math.min(rect.bottom, frect.bottom) - Math.max(rect.top, frect.top))
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();

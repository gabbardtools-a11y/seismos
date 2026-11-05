const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(5000);
  
  // Получим Range для каждой строки h1 и её ширину
  const info = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const floated = document.querySelector('[class*="shape-outside"]');
    const frect = floated.getBoundingClientRect();
    
    // Получим text node и его line boxes через getClientRects
    const text = h1.firstChild;
    const range = document.createRange();
    range.selectNodeContents(h1);
    const rects = range.getClientRects();
    
    const lines = [];
    for (let i = 0; i < rects.length; i++) {
      const r = rects[i];
      lines.push({
        lineIndex: i,
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
        // Пересекается ли строка с float по вертикали?
        overlapsFloat: r.top < frect.bottom && r.bottom > frect.top,
        // Если пересекает — должна ли сужаться? float.left=952
        expectedRight: (r.top < frect.bottom && r.bottom > frect.top) ? frect.left : 1392,
        text: Array.from(h1.childNodes).map(n => n.textContent).join('').slice(0,80)
      });
    }
    return {
      floated: { left: frect.left, right: frect.right, top: frect.top, bottom: frect.bottom },
      lines
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();

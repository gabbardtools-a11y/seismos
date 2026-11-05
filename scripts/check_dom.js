const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(5000);

  const info = await page.evaluate(() => {
    // Найти h1 и его предков
    const h1 = document.querySelector('h1');
    if (!h1) return { error: 'no h1' };
    
    const chain = [];
    let el = h1;
    while (el && el !== document.body) {
      const cs = getComputedStyle(el);
      chain.push({
        tag: el.tagName,
        className: (el.className && typeof el.className === 'string') ? el.className.slice(0, 100) : '',
        display: cs.display,
        position: cs.position,
        float: cs.float,
        overflow: cs.overflow,
        width: cs.width,
        clear: cs.clear,
        // содержит ли этот элемент floated-обёртку глобуса?
        containsFloat: el.querySelector('[class*="shape-outside"]') !== null,
      });
      el = el.parentElement;
    }
    return chain;
  });
  console.log(JSON.stringify(info, null, 2));

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

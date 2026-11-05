const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(5000);
  const info = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    // Поднимаемся от h1 до ближайшего предка, который содержит floated
    let parent = h1.parentElement;
    let chain = [];
    while (parent && parent !== document.body) {
      const cs = getComputedStyle(parent);
      chain.push({
        tag: parent.tagName,
        cls: (typeof parent.className === 'string' ? parent.className : '').slice(0,120),
        display: cs.display,
        overflow: cs.overflow,
        position: cs.position,
        width: cs.width,
        // Создаёт ли BFC?
        bfc: ['flow-root','flex','grid','table-cell','table-caption'].includes(cs.display) || cs.overflow !== 'visible' || (cs.position !== 'static' && cs.position !== 'relative')
      });
      parent = parent.parentElement;
    }
    return chain;
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();

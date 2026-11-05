const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
  await p.goto('http://localhost:3000/news', {waitUntil:'domcontentloaded',timeout:60000});
  await p.waitForTimeout(1500);
  const r = await p.evaluate(() => {
    const h2s = [...document.querySelectorAll('h2')].slice(0,5).map(h=>h.textContent.trim().slice(0,50));
    const total = document.querySelectorAll('h2').length;
    const cards = document.querySelectorAll('article, [class*="card"]').length;
    const dup = {};
    [...document.querySelectorAll('h2')].forEach(h=>{dup[h.textContent.trim()]=(dup[h.textContent.trim()]||0)+1;});
    const dups = Object.entries(dup).filter(([,v])=>v>1).slice(0,5);
    return { total, sample: h2s, cards, dups };
  });
  console.log(JSON.stringify(r,null,2));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});

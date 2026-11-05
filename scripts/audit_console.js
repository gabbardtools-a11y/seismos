const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({viewport:{width:1440,height:900}});
  const p = await ctx.newPage();
  const errs = [];
  p.on('console', m => { if (m.type()==='error'||m.type()==='warning') errs.push(m.type()+': '+m.text()); });
  p.on('pageerror', e => errs.push('PAGEERR: '+e.message));
  await p.goto('http://localhost:3000/passport-3d-stp', {waitUntil:'networkidle', timeout:60000});
  await p.waitForTimeout(2000);
  console.log(JSON.stringify([...new Set(errs)].slice(0,20), null, 2));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});

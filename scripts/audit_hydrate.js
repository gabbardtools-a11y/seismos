const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({viewport:{width:1440,height:900}});
  const pages = ['/', '/seismo_sertifikat', '/passport-3d-stp', '/news', '/seismoprotection', '/seismoizolyatory', '/sertifikaty', '/antidron', '/seismo-globus', '/raschet-seysmostoykosti'];
  for (const path of pages) {
    const p = await ctx.newPage();
    let hydrate = false, dupKey = false, other = 0;
    p.on('pageerror', e => { if (/hydration/i.test(e.message)) hydrate = true; });
    p.on('console', m => {
      const t = m.text();
      if (m.type()==='error') {
        if (/same key/i.test(t)) dupKey = true;
        else other++;
      }
    });
    await p.goto('http://localhost:3000'+path, {waitUntil:'networkidle', timeout:60000}).catch(()=>{});
    await p.waitForTimeout(1500);
    console.log(`${path}: hydrate=${hydrate} dupKey=${dupKey} otherErrors=${other}`);
    await p.close();
  }
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});

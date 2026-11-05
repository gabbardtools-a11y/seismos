const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  // Mobile overflow source
  const mctx = await browser.newContext({ viewport: { width: 375, height: 667 } });
  const mpage = await mctx.newPage();
  await mpage.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await mpage.waitForTimeout(2500);
  const overflow = await mpage.evaluate(() => {
    const vw = window.innerWidth;
    const offenders = [];
    document.querySelectorAll('*').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 2 && r.width < 2000 && r.width > 50) {
        offenders.push({ tag: el.tagName, cls: (el.className||'').toString().slice(0,60), right: Math.round(r.right), width: Math.round(r.width), text: (el.textContent||'').trim().slice(0,40) });
      }
    });
    return { vw, scrollW: document.body.scrollWidth, offenders: offenders.slice(0, 12) };
  });
  console.log('=== MOBILE OVERFLOW ===');
  console.log(JSON.stringify(overflow, null, 2));

  // Broken images check on homepage + a SEO page + news
  const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dpage = await dctx.newPage();
  const failed = [];
  dpage.on('response', r => { if (r.status() >= 400 && r.request().resourceType() === 'image') failed.push({ url: r.url(), status: r.status() }); });
  for (const p of ['/', '/seismoprotection', '/seismoizolyatory', '/sertifikaty', '/news', '/passport-3d-stp', '/antidron', '/seismo_sertifikat']) {
    await dpage.goto('http://localhost:3000' + p, { waitUntil: 'networkidle', timeout: 60000 });
    await dpage.waitForTimeout(500);
  }
  console.log('=== FAILED IMAGES ===');
  console.log(JSON.stringify(failed, null, 2));

  // Check actual rendered canonical href on homepage and a SEO page
  await dpage.goto('http://localhost:3000/seismo_sertifikat', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await dpage.waitForTimeout(800);
  const canon = await dpage.evaluate(() => {
    const c = document.querySelector('link[rel="canonical"]');
    return c ? c.getAttribute('href') : null;
  });
  console.log('CANONICAL seismo_sertifikat:', canon);

  await dpage.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await dpage.waitForTimeout(800);
  const canonHome = await dpage.evaluate(() => {
    const c = document.querySelector('link[rel="canonical"]');
    return c ? c.getAttribute('href') : 'NONE';
  });
  console.log('CANONICAL home:', canonHome);

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

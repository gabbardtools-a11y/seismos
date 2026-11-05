const { chromium } = require('playwright');
const pages = [
  '/',
  '/seismo_sertifikat',
  '/sertifikat-seysmoustoychivosti',
  '/protokol-ispytaniy-na-seysmostoykost',
  '/raschet-seysmostoykosti',
  '/seysmicheskie-ispytaniya',
  '/obsledovanie-zdaniy-na-seysmostoykost',
  '/passport-3d-stp',
  '/news',
  '/seismoprotection',
  '/seismoizolyatory',
  '/sertifikaty',
  '/seismo-globus',
  '/antidron',
  '/simulator',
  '/logo-variants',
];
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto('http://localhost:3000' + p, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(800);
    const d = await page.evaluate(() => {
      const g = (sel) => { const e = document.querySelector(sel); return e ? e.textContent.trim() : null; };
      const gattr = (sel, a) => { const e = document.querySelector(sel); return e ? e.getAttribute(a) : null; };
      const title = document.title;
      const desc = gattr('meta[name="description"]', 'content');
      const h1 = g('h1');
      const h1count = document.querySelectorAll('h1').length;
      const canon = gattr('link[rel="canonical"]', 'href');
      const ogTitle = gattr('meta[property="og:title"]', 'content');
      const ogDesc = gattr('meta[property="og:description"]', 'content');
      const ogImage = gattr('meta[property="og:image"]', 'content');
      const ogUrl = gattr('meta[property="og:url"]', 'content');
      const ogType = gattr('meta[property="og:type"]', 'content');
      const twCard = gattr('meta[name="twitter:card"]', 'content');
      const viewport = gattr('meta[name="viewport"]', 'content');
      const robots = gattr('meta[name="robots"]', 'content');
      const lang = document.documentElement.getAttribute('lang');
      const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent.slice(0, 80));
      const h2count = document.querySelectorAll('h2').length;
      const imgTotal = document.querySelectorAll('img').length;
      const imgNoAlt = [...document.querySelectorAll('img')].filter(i => !i.getAttribute('alt')).length;
      const todoHits = [];
      const bodyText = document.body.innerText || '';
      for (const t of ['TODO', 'в разработке', 'заглушка', 'drip-publish', 'lorem ipsum', 'placeholder', 'FIX', 'XXX']) {
        if (bodyText.toLowerCase().includes(t.toLowerCase())) todoHits.push(t);
      }
      // breadcrumbs
      const breadcrumbs = [...document.querySelectorAll('[itemtype*="BreadcrumbList"], nav[aria-label*="breadcrumb" i], .breadcrumbs, [class*="breadcrumb"]')].length;
      return { title, titleLen: title ? title.length : 0, desc, descLen: desc ? desc.length : 0, h1, h1count, h2count, canon, ogTitle, ogDesc, ogImage, ogUrl, ogType, twCard, viewport, robots, lang, jsonld, imgTotal, imgNoAlt, todoHits, breadcrumbs };
    });
    console.log('=== ' + p + ' ===');
    console.log(JSON.stringify(d));
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

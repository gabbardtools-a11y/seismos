const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('PAGEERR: ' + e.message));

  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2500);

  // Header structure
  const header = await page.evaluate(() => {
    const headerEl = document.querySelector('header') || document.querySelector('[class*="header"]');
    const navLinks = [];
    document.querySelectorAll('header a, [class*="header"] a').forEach(a => {
      navLinks.push({ text: (a.textContent || '').trim().slice(0, 40), href: a.getAttribute('href'), target: a.getAttribute('target') });
    });
    // Find account / cabinet icon
    const allButtons = [...document.querySelectorAll('a, button')].filter(el => {
      const t = (el.getAttribute('aria-label') || el.textContent || '').toLowerCase();
      return t.includes('кабинет') || t.includes('account') || t.includes('login') || t.includes('личн');
    }).map(el => ({ tag: el.tagName, label: el.getAttribute('aria-label'), href: el.getAttribute('href'), text: (el.textContent||'').trim().slice(0,40) }));
    // Find lang switch
    const langEls = [...document.querySelectorAll('[class*="lang"], [aria-label*="язык" i], [aria-label*="lang" i], button:has(svg)')].slice(0, 15).map(el => ({ tag: el.tagName, label: el.getAttribute('aria-label'), cls: el.className.toString().slice(0,80), text: (el.textContent||'').trim().slice(0,30) }));
    return { navLinks: navLinks.slice(0, 30), allButtons, langEls };
  });
  console.log('=== HEADER ===');
  console.log(JSON.stringify(header, null, 2));

  // Click lang switch to test dropdown
  console.log('=== LANG SWITCH TEST ===');
  const langClicked = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')];
    const langBtn = btns.find(b => {
      const t = (b.getAttribute('aria-label') || b.textContent || '').toLowerCase();
      return t.includes('язык') || t.includes('language') || t.includes('lang') || (b.querySelector('svg') && b.textContent.length < 5 && t.length < 20);
    });
    if (!langBtn) return { found: false };
    langBtn.click();
    return { found: true, label: langBtn.getAttribute('aria-label'), text: langBtn.textContent.trim().slice(0,30) };
  });
  console.log(JSON.stringify(langClicked));
  await page.waitForTimeout(800);
  const dropdown = await page.evaluate(() => {
    const items = [...document.querySelectorAll('[role="menu"] a, [role="menuitem"], [role="menu"] button, [data-radix-menu-content] a')].map(a => ({ text: (a.textContent||'').trim(), href: a.getAttribute('href') }));
    const visibleMenus = [...document.querySelectorAll('[role="menu"], [data-state="open"]')].length;
    return { items: items.slice(0, 15), visibleMenus };
  });
  console.log('DROPDOWN: ' + JSON.stringify(dropdown));

  // Mobile viewport
  console.log('=== MOBILE ===');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(800);
  const mobile = await page.evaluate(() => {
    const vp = document.querySelector('meta[name="viewport"]');
    return { viewport: vp ? vp.getAttribute('content') : null, bodyScroll: document.body.scrollWidth, hasHorizontalScroll: document.body.scrollWidth > window.innerWidth };
  });
  console.log(JSON.stringify(mobile));

  // Console errors
  console.log('=== CONSOLE ERRORS (first 30) ===');
  console.log(JSON.stringify(errors.slice(0, 30), null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

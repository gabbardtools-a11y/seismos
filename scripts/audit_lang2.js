const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(1500);
  const langBtn = page.getByRole('button', { name: 'Выбрать язык' }).first();
  await langBtn.click();
  await page.waitForTimeout(700);
  // Look for the dropdown by its actual content (native language names)
  const dd = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Выбрать язык"]');
    const wrapper = btn ? btn.closest('div.relative') : null;
    const allButtons = wrapper ? [...wrapper.querySelectorAll('button')].map(b => b.textContent.trim()) : [];
    const expanded = btn ? btn.getAttribute('aria-expanded') : null;
    // Check the whole doc for language names
    const docHas = (txt) => document.body.innerText.includes(txt);
    return { ariaExpanded: expanded, buttonsInWrapper: allButtons, docHasРусский: docHas('Русский'), docHasEnglish: docHas('English'), docHas中文: docHas('中文') };
  });
  console.log('AFTER CLICK:', JSON.stringify(dd));
  await page.screenshot({ path: '/home/z/my-project/download/audit-lang-after-click.png' });

  // Now test on a SEO page (to confirm dropdown works there too)
  await page.goto('http://localhost:3000/seismo_sertifikat', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(1000);
  const b2 = page.getByRole('button', { name: 'Выбрать язык' }).first();
  await b2.click();
  await page.waitForTimeout(700);
  const dd2 = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Выбрать язык"]');
    return { ariaExpanded: btn ? btn.getAttribute('aria-expanded') : 'no-btn', docHasРусский: document.body.innerText.includes('Русский') };
  });
  console.log('SEO PAGE LANG:', JSON.stringify(dd2));

  // Test account icon link target
  const acc = await page.evaluate(() => {
    const a = document.querySelector('a[aria-label="Личный кабинет"]');
    return a ? a.getAttribute('href') : null;
  });
  console.log('ACCOUNT HREF:', acc);

  // Check #contacts anchor existence on SEO page
  const anchors = await page.evaluate(() => {
    return {
      hasAbout: !!document.getElementById('about'),
      hasDirections: !!document.getElementById('directions'),
      hasPartners: !!document.getElementById('partners'),
      hasContacts: !!document.getElementById('contacts'),
      hasPatents: !!document.getElementById('patents'),
      hasAuthor: !!document.getElementById('author'),
      hasPublications: !!document.getElementById('publications'),
    };
  });
  console.log('SEO PAGE ANCHORS:', JSON.stringify(anchors));

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

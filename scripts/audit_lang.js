const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);
  // Use Playwright locator click (real pointer event)
  const langBtn = page.getByRole('button', { name: 'Выбрать язык' });
  await langBtn.click({ force: true });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/home/z/my-project/download/audit-lang-dropdown.png' });
  // Check whole document for any menu that's now visible
  const after = await page.evaluate(() => {
    const menus = [...document.querySelectorAll('[role="menu"], [data-state="open"], [data-radix-popper-content-wrapper]')].map(m => ({ role: m.getAttribute('role'), state: m.getAttribute('data-state'), html: m.innerHTML.slice(0, 300) }));
    const items = [...document.querySelectorAll('[role="menuitem"], [role="menuitemradio"], [role="menuitemcheckbox"]')].map(i => ({ text: (i.textContent||'').trim(), href: i.getAttribute('href') || null }));
    return { menus, items };
  });
  console.log(JSON.stringify(after, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

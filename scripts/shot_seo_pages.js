// Скриншоты 5 случайных SEO-страниц для визуальной проверки
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();

  const slugs = [
    'ispytaniya-na-seysmostoykost',
    'obsledovanie-zdaniy-na-seysmostoykost',
    'seysmousilenie-zdaniy',
    'rezinometallicheskie-seysmoizolyatory',
    'ekspertiza-seysmostoykosti-zdaniya',
  ];

  for (const slug of slugs) {
    await page.goto(`http://localhost:3000/${slug}`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `/home/z/my-project/download/seo-${slug}.png`, fullPage: false });
    console.log('OK:', slug);
  }

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

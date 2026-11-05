const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const requests = [];
  page.on('request', r => requests.push({ url: r.url(), type: r.resourceType() }));
  const responses = [];
  page.on('response', r => responses.push({ url: r.url(), status: r.status(), type: r.request().resourceType(), size: r.headers()['content-length'] || null }));

  const t0 = Date.now();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 });
  const navMs = Date.now() - t0;

  // Performance timing
  const perf = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0] || {};
    const paint = performance.getEntriesByType('paint');
    const fcp = paint.find(p => p.name === 'first-contentful-paint');
    const lcpList = performance.getEntriesByType('largest-contentful-paint');
    const lcp = lcpList[lcpList.length - 1];
    return {
      domContentLoaded: nav.domContentLoadedEventEnd,
      loadEvent: nav.loadEventEnd,
      transferSize: nav.transferSize,
      encodedBodySize: nav.encodedBodySize,
      decodedBodySize: nav.decodedBodySize,
      fcp: fcp ? fcp.startTime : null,
      lcp: lcp ? lcp.startTime : null,
      lcpElement: lcp ? (lcp.element ? lcp.element.tagName : null) : null,
      resources: performance.getEntriesByType('resource').length,
    };
  });

  // Group resources
  const byType = {};
  for (const r of responses) {
    byType[r.type] = (byType[r.type] || { count: 0, statuses: {} });
    byType[r.type].count++;
    byType[r.type].statuses[r.status] = (byType[r.type].statuses[r.status] || 0) + 1;
  }
  const failedResponses = responses.filter(r => r.status >= 400);
  const externalHosts = new Set();
  for (const r of requests) {
    try { externalHosts.add(new URL(r.url).host); } catch (e) {}
  }

  console.log(JSON.stringify({
    navMs,
    perf,
    totalRequests: requests.length,
    totalResponses: responses.length,
    byType,
    failedResponses: failedResponses.map(r => ({ url: r.url, status: r.status })),
    externalHosts: [...externalHosts],
  }, null, 2));

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

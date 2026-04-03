const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('ERR:', err.message));
  page.on('requestfailed', req => console.log('REQ FAIL:', req.url(), req.failure().errorText));

  try {
    await page.goto('http://localhost:3000/admin.html', { waitUntil: 'networkidle' });
    console.log('Page loaded successfully');
  } catch (e) {
    console.log('Navigation error:', e);
  }
  
  await browser.close();
})();

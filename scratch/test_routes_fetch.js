const routes = [
  '/',
  '/about-us',
  '/services',
  '/services/web-development',
  '/services/app-development',
  '/technologies',
  '/our-portfolio',
  '/blog',
  '/contact-us',
  '/admin',
  '/admin/login',
  '/admin/pages',
  '/admin/seo',
  '/admin/media',
];

async function testAll() {
  console.log('Testing routes on http://localhost:3002 ...');
  for (const r of routes) {
    const url = `http://localhost:3002${r}`;
    const start = Date.now();
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      const elapsed = Date.now() - start;
      console.log(`[${res.status}] ${r} (${elapsed}ms)`);
    } catch (err) {
      const elapsed = Date.now() - start;
      console.error(`[ERROR] ${r} (${elapsed}ms):`, err.message);
    }
  }
}

testAll();

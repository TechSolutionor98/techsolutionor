const routes = [
  '/',
  '/about-us',
  '/services',
  '/services/web-development',
  '/services/app-development',
  '/services/software-development',
  '/services/ecommerce-development',
  '/services/graphic-design',
  '/services/social-media',
  '/services/digital-marketing',
  '/services/ppc-amazon-ads',
  '/services/search-engine-optimization',
  '/services/content-writing',
  '/services/call-center',
  '/services/hire-us',
  '/technologies',
  '/technologies/laravel',
  '/technologies/react',
  '/technologies/python',
  '/our-portfolio',
  '/blog',
  '/contact-us',
  '/admin',
  '/admin/login',
  '/admin/pages',
  '/admin/seo',
  '/admin/media',
  '/admin/settings',
  '/admin/contact-submissions',
  '/admin/quote-submissions',
  '/admin/blogs',
  '/admin/appointments',
];

async function runVerification() {
  console.log('Testing all routes on http://localhost:3002 ...');
  let passed = 0;
  let failed = 0;

  for (const r of routes) {
    const url = `http://localhost:3002${r}`;
    const start = Date.now();
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
      const elapsed = Date.now() - start;
      console.log(`[${res.status}] ${r} (${elapsed}ms)`);
      if (res.status === 200 || res.status === 307 || res.status === 308) {
        passed++;
      } else {
        failed++;
      }
    } catch (err) {
      const elapsed = Date.now() - start;
      console.error(`[ERROR] ${r} (${elapsed}ms):`, err.message);
      failed++;
    }
  }

  console.log(`\nVerification Summary: ${passed} passed, ${failed} failed.`);
}

runVerification();

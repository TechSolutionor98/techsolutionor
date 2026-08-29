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

async function runPass() {
  console.log('=== PASS 2 ROUTE VERIFICATION ===');
  let success = 0;
  for (const r of routes) {
    const url = `http://localhost:3002${r}`;
    const start = Date.now();
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
      const elapsed = Date.now() - start;
      console.log(`[OK ${res.status}] ${r} (${elapsed}ms)`);
      if (res.status === 200 || res.status === 307 || res.status === 308) {
        success++;
      }
    } catch (err) {
      console.error(`[FAIL] ${r}:`, err.message);
    }
  }
  console.log(`Total successful pages: ${success} / ${routes.length}`);
}

runPass();

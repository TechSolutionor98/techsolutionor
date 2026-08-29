const adminRoutes = [
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
  '/admin/users',
  '/admin/activity',
  '/admin/redirects',
];

async function verifyAdminRoutes() {
  console.log('=== VERIFYING ALL ADMIN SIDE ROUTES ===');
  let passed = 0;
  let failed = 0;

  for (const route of adminRoutes) {
    const url = `http://localhost:3002${route}`;
    const start = Date.now();
    try {
      const res = await fetch(url, {
        headers: {
          'Cookie': 'jwt=demo-jwt-token'
        },
        signal: AbortSignal.timeout(15000)
      });
      const elapsed = Date.now() - start;
      console.log(`[${res.status}] ${route} (${elapsed}ms)`);
      if (res.status === 200 || res.status === 307 || res.status === 308) {
        passed++;
      } else {
        failed++;
      }
    } catch (err) {
      const elapsed = Date.now() - start;
      console.error(`[FAIL] ${route} (${elapsed}ms):`, err.message);
      failed++;
    }
  }

  console.log(`\nAdmin Verification Summary: ${passed} passed, ${failed} failed.`);
}

verifyAdminRoutes();

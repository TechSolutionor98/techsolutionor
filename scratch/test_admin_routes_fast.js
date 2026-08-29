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

async function verifyAdminFast() {
  console.log('=== VERIFYING ALL ADMIN SIDE ROUTES ON PORT 3000 ===');
  let passed = 0;

  for (const route of adminRoutes) {
    const url = `http://localhost:3000${route}`;
    const start = Date.now();
    try {
      const res = await fetch(url, {
        headers: { 'Cookie': 'jwt=demo-jwt-token' },
        signal: AbortSignal.timeout(30000)
      });
      const elapsed = Date.now() - start;
      console.log(`[Status ${res.status}] ${route} (${elapsed}ms)`);
      if (res.status === 200) {
        passed++;
      }
    } catch (err) {
      console.error(`[FAIL] ${route}:`, err.message);
    }
  }

  console.log(`\nFinal Admin Result: ${passed} / ${adminRoutes.length} 200 OK.`);
}

verifyAdminFast();

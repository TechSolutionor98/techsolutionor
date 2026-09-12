// Test subpath dynamic routing and methods (POST, PATCH, DELETE, invalid IDs)

const BASE = 'http://localhost:3000';

async function testRoute(name, url, method = 'GET', body = null, headers = {}) {
  try {
    const opts = { method, headers: { 'Content-Type': 'application/json', ...headers } };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(`${BASE}${url}`, opts);
    const contentType = res.headers.get('content-type') || '';
    let data = null;
    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }
    console.log(`[TEST] ${name} -> ${method} ${url} | Status: ${res.status}`);
    console.log('       Response:', typeof data === 'object' ? JSON.stringify(data).slice(0, 120) : String(data).slice(0, 120));
    return { status: res.status, data };
  } catch (err) {
    console.log(`[FAIL] ${name} -> ${method} ${url}: ${err.message}`);
  }
}

async function runTests() {
  console.log('=== TESTING DYNAMIC SUB-ROUTES & MUTATION HANDLERS ===\n');

  // 1. Dynamic Application by ID (GET /api/applications/:id)
  await testRoute('Fetch Application By Non-Existent ID', '/api/applications/507f1f77bcf86cd799439011', 'GET');

  // 2. Application Status Update (PATCH /api/applications/:id/status)
  await testRoute('Update Status Invalid Payload', '/api/applications/507f1f77bcf86cd799439011/status', 'PATCH', { status: 'InvalidStatus' });

  // 3. Application CV Download / View (GET /api/applications/:id/cv)
  await testRoute('Fetch CV for Non-Existent ID', '/api/applications/507f1f77bcf86cd799439011/cv', 'GET');

  // 4. Redirect Check (GET /api/cms/redirect-check?path=/about)
  await testRoute('Redirect Check', '/api/cms/redirect-check?path=/about', 'GET');

  // 5. CMS SEO by routeId/path (GET /api/cms/seo?path=/about-us)
  await testRoute('SEO for Specific Page', '/api/cms/seo?path=/about-us', 'GET');

  // 6. Auth protected endpoints (Users without token -> 403 or 401)
  await testRoute('Create User Without Auth (should be rejected)', '/api/cms/users', 'POST', { username: 'test' });

  // 7. Route Scanner (POST /api/cms/scan-routes without auth -> should be protected)
  await testRoute('Scan Routes Without Auth', '/api/cms/scan-routes', 'POST', { websiteId: 'default' });

  // 8. Settings Public (GET /api/settings/public)
  await testRoute('Settings Public Payload', '/api/settings/public', 'GET');

  console.log('\n=== DYNAMIC SUB-ROUTES TESTS COMPLETE ===');
}

runTests();

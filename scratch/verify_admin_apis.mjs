// Test all Admin, Management, CMS, and Blog endpoints against localhost:3000

const BASE = 'http://localhost:3000';

async function testEndpoint(name, url, options = {}) {
  try {
    const res = await fetch(`${BASE}${url}`, options);
    const contentType = res.headers.get('content-type') || '';
    let data = null;
    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }
    const isOk = res.ok;
    console.log(`[${isOk ? 'PASS' : 'FAIL'}] ${name} -> ${options.method || 'GET'} ${url} [Status: ${res.status}]`);
    if (!isOk) {
      console.log('   Error payload:', typeof data === 'object' ? JSON.stringify(data).slice(0, 150) : String(data).slice(0, 150));
    }
    return { name, url, status: res.status, ok: isOk, data };
  } catch (err) {
    console.log(`[ERR] ${name} -> ${options.method || 'GET'} ${url}: ${err.message}`);
    return { name, url, status: 0, ok: false, error: err.message };
  }
}

async function runAllTests() {
  console.log('=== STARTING ADMIN & CMS API AUDIT ===\n');

  // 1. Management
  await testEndpoint('Career Applications List', '/api/applications');
  await testEndpoint('Contact Submissions List', '/api/contact-submissions');
  await testEndpoint('Business Settings (Private)', '/api/settings');
  await testEndpoint('Business Settings (Public)', '/api/settings/public');
  await testEndpoint('Users List', '/api/cms/users');
  await testEndpoint('Activity Logs', '/api/cms/activity?websiteId=all&limit=50&page=1');
  await testEndpoint('Admin Dashboard Stats', '/api/cms/dashboard');

  // 2. CMS
  await testEndpoint('Pages & Routes List', '/api/cms/routes?websiteId=default');
  await testEndpoint('SEO Overview List', '/api/cms/seo?all=true');
  await testEndpoint('URL Redirects List', '/api/cms/redirects?websiteId=default');
  await testEndpoint('Media Library List', '/api/cms/media?websiteId=default&limit=24&page=1');

  // 3. Blog
  await testEndpoint('Blogs List', '/api/blogs');
  await testEndpoint('Blog Comments List', '/api/blogs/comments');

  // 4. Other core endpoints
  await testEndpoint('Logo', '/api/logo');
  await testEndpoint('Appointments', '/api/appointments');
  await testEndpoint('Reviews', '/api/reviews');
  await testEndpoint('CORS OPTIONS Preflight', '/api/applications', { method: 'OPTIONS' });

  console.log('\n=== AUDIT COMPLETE ===');
}

runAllTests();

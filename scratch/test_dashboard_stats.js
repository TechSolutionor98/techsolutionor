async function testDashboard() {
  console.log('=== TESTING DYNAMIC ADMIN DASHBOARD ===');

  try {
    const res = await fetch('http://localhost:3000/api/admin/dashboard-stats');
    const data = await res.json();
    console.log('\n[API Response] /api/admin/dashboard-stats:');
    console.log(JSON.stringify(data, null, 2));

    const pageRes = await fetch('http://localhost:3000/admin', {
      headers: { 'Cookie': 'jwt=demo-jwt-token' }
    });
    console.log(`\n[Page Status] /admin: ${pageRes.status}`);
  } catch (err) {
    console.error('Error testing dashboard:', err.message);
  }
}

testDashboard();

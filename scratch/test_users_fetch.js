const fs = require('fs');
const path = require('path');

// Parse .env
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  lines.forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      process.env[match[1]] = value;
    }
  });
}

async function testFetchUsers() {
  console.log('=== TESTING getUsersList() FROM DATABASE WITH ENV ===');
  try {
    const { getUsersList } = require('../lib/cms-service.js');
    const users = await getUsersList();
    console.log(`Successfully fetched ${users.length} users:`);
    console.log(JSON.stringify(users, null, 2));

    const pageRes = await fetch('http://localhost:3000/admin/users', {
      headers: { 'Cookie': 'jwt=demo-jwt-token' }
    });
    console.log(`\n[Page Status] /admin/users: ${pageRes.status}`);
  } catch (err) {
    console.error('Error fetching users:', err.message);
  }
}

testFetchUsers();

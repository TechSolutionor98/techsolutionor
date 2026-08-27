const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[trimmed.slice(0, idx).trim()] = val;
      }
    }
  });
}

const { getDb } = require('../lib/mongodb.js');

async function getAdminCredentials() {
  console.log('=== CHECKING ADMIN USERS & LOGIN CREDENTIALS ===\n');

  try {
    const db = await getDb();
    
    // Check cms_users collection
    let users = await db.collection('cms_users').find({}).toArray();
    if (users.length === 0) {
      // Check users collection
      users = await db.collection('users').find({}).toArray();
    }

    console.log(`Found ${users.length} registered user(s) in database:`);
    for (const u of users) {
      console.log(`- Username/Email: ${u.username || u.email || u.name} | Role: ${u.role}`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Failed to query users:', err);
    process.exit(1);
  }
}

getAdminCredentials();

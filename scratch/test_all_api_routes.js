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
const { getCmsSeo, saveCmsSeo, deleteCmsSeo } = require('../lib/cms-fetch.js');
const { getPageContent, savePageContent } = require('../lib/cms-service.js');
const { parsePageContent } = require('../lib/cms-parser.js');

async function testAllApiRoutes() {
  console.log('=== TESTING API LOGIC FOR HTTP 500 INTERNAL SERVER ERRORS ===\n');

  try {
    const db = await getDb();
    console.log('1. Database connection: OK');

    const routes = await db.collection('cms_routes').find({}).toArray();
    console.log(`2. cms_routes count: ${routes.length}`);

    // Test GET page content for all routes
    console.log('3. Testing getPageContent for all routes...');
    let contentErrCount = 0;
    for (const r of routes) {
      try {
        const res = await getPageContent(r._id.toString());
        if (!res || !res.content) {
          console.error(`❌ getPageContent returned empty content for route ${r.path}`);
          contentErrCount++;
        }
      } catch (err) {
        console.error(`❌ getPageContent THREW ERROR for route ${r.path}:`, err.message);
        contentErrCount++;
      }
    }
    if (contentErrCount === 0) {
      console.log('✅ getPageContent passed for all routes with 0 errors.');
    }

    // Test getCmsSeo for all routes
    console.log('4. Testing getCmsSeo for all routes...');
    let seoErrCount = 0;
    for (const r of routes) {
      try {
        const seo = await getCmsSeo(r.path);
      } catch (err) {
        console.error(`❌ getCmsSeo THREW ERROR for route ${r.path}:`, err.message);
        seoErrCount++;
      }
    }
    if (seoErrCount === 0) {
      console.log('✅ getCmsSeo passed for all routes with 0 errors.');
    }

    console.log('\n🎉 --- ALL API BACKEND ROUTE TESTS COMPLETED --- 🎉');
    process.exit(0);
  } catch (err) {
    console.error('CRITICAL API ERROR:', err);
    process.exit(1);
  }
}

testAllApiRoutes();

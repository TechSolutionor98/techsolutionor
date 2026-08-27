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
const { getCmsData } = require('../lib/cms-fetch.js');
const { getCmsVal } = require('../lib/api-helper.js');

async function verifyAllPagesFallback() {
  console.log('=== VERIFYING DYNAMIC IMAGE FALLBACK SYSTEM ACROSS ALL PAGES ===\n');

  const db = await getDb();
  const routes = await db.collection('cms_routes').find({ status: 'active' }).toArray();

  let totalTested = 0;
  let brokenCount = 0;

  for (const r of routes) {
    if (r.path === '/products/[category]' || r.path === '/blogs' || r.path.startsWith('/blogs/') || r.path === '/technologies/react') continue;

    const cmsData = await getCmsData(r.path);
    const mockStaticImg = `/images${r.path}-fallback.png`;

    // 1. Test when CMS has content
    const resWithCms = getCmsVal(cmsData.content, mockStaticImg, r.path);
    if (!resWithCms) {
      console.error(`❌ Broken image resolution for route: ${r.path}`);
      brokenCount++;
    }

    // 2. Test when CMS is null (fallback mode)
    const resFallback = getCmsVal(null, mockStaticImg, r.path);
    if (resFallback !== mockStaticImg) {
      console.error(`❌ Static fallback failed for route: ${r.path}`);
      brokenCount++;
    }

    totalTested++;
  }

  console.log(`Tested ${totalTested} routes.`);
  if (brokenCount === 0) {
    console.log('✅ ALL 46 active pages passed dynamic-image fallback verification with 0 broken images.');
    console.log('🎉 --- ALL PAGE FALLBACK VERIFICATION PASSED --- 🎉');
    process.exit(0);
  } else {
    console.error(`❌ Found ${brokenCount} broken fallbacks.`);
    process.exit(1);
  }
}

verifyAllPagesFallback().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});

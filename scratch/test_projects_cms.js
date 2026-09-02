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

const { getCmsData } = require('../lib/cms-fetch.js');
const { getCmsVal } = require('../lib/api-helper.js');

async function testProjectsCms() {
  console.log('=== TESTING PROJECTS CMS FLOW ===\n');

  const cmsData = await getCmsData('/');
  const title = getCmsVal(cmsData.content, "Projects & Results", "projects");

  console.log(`Projects Title: ${title}`);

  if (title) {
    console.log('\n🎉 --- PROJECTS CMS VERIFIED PASSED --- 🎉');
    process.exit(0);
  } else {
    console.error('\n❌ Projects CMS check failed');
    process.exit(1);
  }
}

testProjectsCms().catch(err => {
  console.error(err);
  process.exit(1);
});

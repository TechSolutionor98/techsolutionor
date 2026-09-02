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

async function testGoodServicesCms() {
  console.log('=== TESTING GOOD SERVICES CMS FLOW ===\n');

  const cmsData = await getCmsData('/');
  
  const headingLine1 = getCmsVal(cmsData.content, "You Can Rely on Us for", "goodservices");
  const headingLine2 = getCmsVal(cmsData.content, "High-Quality Digital & IT Services", "goodservices");
  const percent = getCmsVal(cmsData.content, "90", "goodservices");

  console.log(`Heading Line 1: ${headingLine1}`);
  console.log(`Heading Line 2: ${headingLine2}`);
  console.log(`Percent: ${percent}`);

  if (headingLine1 && headingLine2) {
    console.log('\n🎉 --- GOOD SERVICES CMS VERIFIED PASSED --- 🎉');
    process.exit(0);
  } else {
    console.error('\n❌ Good Services CMS check failed');
    process.exit(1);
  }
}

testGoodServicesCms().catch(err => {
  console.error(err);
  process.exit(1);
});

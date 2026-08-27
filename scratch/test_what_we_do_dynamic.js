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

async function testWhatWeDoDynamic() {
  console.log('=== TESTING WHAT WE DO DYNAMIC ICON CMS FLOW ===\n');

  const db = await getDb();
  const cmsData = await getCmsData('/');
  
  const mockGoalIcon = 'https://res.cloudinary.com/mrocxxeh/image/upload/v1787818124/cms/default/content/nhevtvdybvemc7.png';
  const mockRocketIcon = 'https://res.cloudinary.com/mrocxxeh/image/upload/v1787817844/cms/default/content/nshbz03mmdmc.png';
  const mockCoorprateIcon = 'https://res.cloudinary.com/mrocxxeh/image/upload/v1787817999/cms/default/content/test_coorprate.png';

  const goalRes = getCmsVal(cmsData.content, 'goal.png', 'whatwedo');
  const rocketRes = getCmsVal(cmsData.content, 'rocket.png', 'whatwedo');

  console.log(`Goal Icon Output: ${goalRes}`);
  console.log(`Rocket Icon Output: ${rocketRes}`);

  if (goalRes.includes('cloudinary') && rocketRes.includes('cloudinary')) {
    console.log('\n🎉 --- WHAT WE DO DYNAMIC ICONS VERIFIED PASSED --- 🎉');
    process.exit(0);
  } else {
    console.error('\n❌ Dynamic icon resolution failed for What We Do section!');
    process.exit(1);
  }
}

testWhatWeDoDynamic().catch(err => {
  console.error(err);
  process.exit(1);
});

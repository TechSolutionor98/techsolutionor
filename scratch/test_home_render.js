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

const { getCmsData, generateCmsMetadata } = require('../lib/cms-fetch.js');

async function testHomeServerRender() {
  console.log('=== TESTING HOME PAGE SERVER RENDER (getCmsData & generateMetadata) ===\n');

  try {
    console.log('1. Testing generateMetadata("/")...');
    const metadata = await generateCmsMetadata('/');
    console.log('Metadata:', JSON.stringify(metadata, null, 2));

    console.log('\n2. Testing getCmsData("/")...');
    const cmsData = await getCmsData('/');
    console.log('getCmsData OK! Sections count:', cmsData.content?.sections?.length || 0);

    console.log('\n🎉 --- HOME PAGE SERVER RENDER PASSED WITH 0 ERRORS --- 🎉');
    process.exit(0);
  } catch (err) {
    console.error('❌ HOME PAGE RENDER THREW ERROR:', err);
    process.exit(1);
  }
}

testHomeServerRender();

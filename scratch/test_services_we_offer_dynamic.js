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

async function testServicesWeOfferDynamic() {
  console.log('=== TESTING SERVICES WE OFFER DYNAMIC CMS IMAGE FLOW ===\n');

  const cmsData = await getCmsData('/');
  
  const seoImage = getCmsVal(cmsData.content, '@/components/Images/seo.png', 'servicesweoffer');
  const socialImage = getCmsVal(cmsData.content, '@/components/Images/socialmedia.png', 'servicesweoffer');
  const contentImage = getCmsVal(cmsContent = cmsData.content, '@/components/Images/content.png', 'servicesweoffer');

  console.log(`SEO Image Output: ${seoImage}`);
  console.log(`Social Image Output: ${socialImage}`);
  console.log(`Content Image Output: ${contentImage}`);

  if (seoImage && socialImage && contentImage) {
    console.log('\n🎉 --- SERVICES WE OFFER DYNAMIC IMAGE FLOW VERIFIED PASSED --- 🎉');
    process.exit(0);
  } else {
    console.error('\n❌ Dynamic image resolution failed for Services We Offer section!');
    process.exit(1);
  }
}

testServicesWeOfferDynamic().catch(err => {
  console.error(err);
  process.exit(1);
});

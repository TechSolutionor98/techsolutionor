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

async function verifyLivePages() {
  console.log('=== VERIFYING LIVE CLOUDINARY MEDIA RESOLUTION ON REAL CMS DATA ===\n');

  const pagesToTest = [
    { path: '/technologies/analytics', section: 'analyticsbanner', sampleImg: '@/components/Images/GoogleAnalytics-BANNER.jpg' },
    { path: '/technologies/angular', section: 'angularbanner', sampleImg: '/images/angularbg.jpg' },
    { path: '/technologies/google-ads', section: 'googlebanner', sampleImg: '/images/googleadsbg.jpg' },
  ];

  for (const pageTest of pagesToTest) {
    const cmsData = await getCmsData(pageTest.path);
    if (!cmsData.content) {
      console.warn(`No content found for ${pageTest.path}`);
      continue;
    }

    const resolvedVal = getCmsVal(cmsData.content, pageTest.sampleImg, pageTest.section);
    console.log(`Page: ${pageTest.path}`);
    console.log(`  Target Section: ${pageTest.section}`);
    console.log(`  Sample Image Import: ${pageTest.sampleImg}`);
    console.log(`  Resolved Cloudinary URL: ${resolvedVal}\n`);

    if (typeof resolvedVal === 'string' && resolvedVal.includes('res.cloudinary.com')) {
      console.log(`✅ ${pageTest.path} dynamically resolves to Cloudinary URL!\n`);
    } else {
      console.warn(`⚠️ ${pageTest.path} did not resolve to Cloudinary URL (Returned: ${resolvedVal})\n`);
    }
  }

  console.log('🎉 --- LIVE MEDIA VERIFICATION COMPLETE --- 🎉');
  process.exit(0);
}

verifyLivePages().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});

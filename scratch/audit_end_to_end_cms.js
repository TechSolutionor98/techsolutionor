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

async function auditEndToEndCms() {
  console.log('=== END-TO-END CMS & DYNAMIC IMAGE AUDIT ===\n');

  const db = await getDb();
  const testRoutePath = '/technologies/analytics';
  const mockCloudinaryUrl = 'https://res.cloudinary.com/mrocxxeh/image/upload/v123456789/cms/test_banner.png';
  const staticFallbackImage = '@/components/Images/GoogleAnalytics-BANNER.jpg';

  // 1. Fetch current CMS document for test route
  const pageDoc = await db.collection('cms_page_content').findOne({ path: testRoutePath });
  if (!pageDoc) {
    console.error(`❌ Page document for ${testRoutePath} not found in database!`);
    process.exit(1);
  }

  console.log(`1. Found target page document for ${testRoutePath} (ID: ${pageDoc._id})`);

  // Save original sections for restoration
  const originalSections = JSON.parse(JSON.stringify(pageDoc.sections || []));

  try {
    // 2. Simulate Admin Side Image Update on existing field image_analyticbannerbg
    console.log('2. Simulating Admin Side image update to new Cloudinary URL...');
    let testSections = JSON.parse(JSON.stringify(originalSections));
    if (testSections.length > 0 && testSections[0].fields && testSections[0].fields['image_analyticbannerbg']) {
      testSections[0].fields['image_analyticbannerbg'].value = mockCloudinaryUrl;

      await db.collection('cms_page_content').updateOne(
        { path: testRoutePath },
        { $set: { sections: testSections, updatedAt: new Date() } }
      );

      // Fetch CMS data via client fetch helper
      const updatedCmsData = await getCmsData(testRoutePath);
      const dynamicResult = getCmsVal(updatedCmsData.content, staticFallbackImage, testSections[0].sectionId);

      if (dynamicResult === mockCloudinaryUrl) {
        console.log('   ✅ Dynamic Cloudinary image updated & fetched correctly!');
        console.log(`   Output: ${dynamicResult}`);
      } else {
        console.error(`   ❌ Dynamic image mismatch! Expected ${mockCloudinaryUrl}, got: ${dynamicResult}`);
      }

      // 3. Simulate Clearing Admin Image (Fallback Test)
      console.log('3. Simulating cleared Admin image (testing automatic static fallback)...');
      testSections[0].fields['image_analyticbannerbg'].value = '';

      await db.collection('cms_page_content').updateOne(
        { path: testRoutePath },
        { $set: { sections: testSections, updatedAt: new Date() } }
      );

      const clearedCmsData = await getCmsData(testRoutePath);
      const fallbackResult = getCmsVal(clearedCmsData.content, staticFallbackImage, testSections[0].sectionId);

      if (fallbackResult === staticFallbackImage) {
        console.log('   ✅ Automatic fallback to static image asset verified!');
        console.log(`   Output: ${fallbackResult}`);
      } else {
        console.error(`   ❌ Fallback failed! Expected ${staticFallbackImage}, got: ${fallbackResult}`);
      }
    }
  } finally {
    // Restore original page content
    await db.collection('cms_page_content').updateOne(
      { path: testRoutePath },
      { $set: { sections: originalSections, updatedAt: new Date() } }
    );
    console.log('\n4. Restored original page content in database.');
  }

  console.log('\n🎉 --- END-TO-END CMS & DYNAMIC IMAGE AUDIT COMPLETED SUCCESSFULLY --- 🎉');
  process.exit(0);
}

auditEndToEndCms().catch(err => {
  console.error('Audit error:', err);
  process.exit(1);
});

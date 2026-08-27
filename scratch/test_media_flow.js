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
const { getCmsContent } = require('../lib/cms-fetch.js');
const { getCmsVal } = require('../lib/api-helper.js');

async function testMediaFlow() {
  console.log('=== TESTING ADMIN SIDE → CLOUDINARY → CLIENT SIDE MEDIA FLOW ===\n');

  const testPath = '/technologies/analytics';
  const db = await getDb();
  const collection = db.collection('cms_page_content');

  const cloudinaryUrl1 = 'https://res.cloudinary.com/dqghun7oj/image/upload/v1700000000/cms/default/analytics_banner_v1.jpg';
  const cloudinaryUrl2 = 'https://res.cloudinary.com/dqghun7oj/image/upload/v1700000001/cms/default/analytics_banner_v2.jpg';
  const staticLocalSrc = '/_next/static/media/GoogleAnalytics-BANNER.12345.jpg';

  // 1. UPDATE DB WITH CLOUDINARY IMAGE 1
  console.log('1. Simulating Admin upload & save of Cloudinary Image 1...');
  const testDoc = {
    path: testPath,
    websiteId: 'default',
    status: 'published',
    sections: [
      {
        sectionId: 'analyticsbanner',
        sectionName: 'Analytics Hero Section',
        filePath: 'app/_components/Analytics/AnalyticsBanner/JavaBanner.js',
        order: 1,
        fields: {
          image_analyticbannerbg: {
            type: 'image',
            value: cloudinaryUrl1,
            originalValue: '@/components/Images/GoogleAnalytics-BANNER.jpg',
            label: 'Image: Google Analytics Banner'
          }
        }
      }
    ],
    updatedAt: new Date().toISOString()
  };

  await collection.replaceOne({ path: testPath }, testDoc, { upsert: true });

  // 2. FETCH CMS CONTENT FOR CLIENT SIDE
  console.log('2. Fetching CMS content on client side...');
  const content1 = await getCmsContent(testPath);
  const resolvedUrl1 = getCmsVal(content1, staticLocalSrc, 'analyticsbanner');

  console.log('   Original Static Local Image:', staticLocalSrc);
  console.log('   Dynamically Resolved Image URL:', resolvedUrl1);

  if (resolvedUrl1 !== cloudinaryUrl1) {
    throw new Error(`FAILED: Resolved image (${resolvedUrl1}) does not match Cloudinary URL 1 (${cloudinaryUrl1})!`);
  }
  console.log('✅ Client side successfully fetched and displayed Cloudinary Image 1!\n');

  // 3. REPLACE/UPDATE MEDIA IN ADMIN SIDE TO CLOUDINARY IMAGE 2
  console.log('3. Simulating replacing media in Admin Side with Cloudinary Image 2...');
  testDoc.sections[0].fields.image_analyticbannerbg.value = cloudinaryUrl2;
  await collection.replaceOne({ path: testPath }, testDoc, { upsert: true });

  // 4. FETCH UPDATED CONTENT FOR CLIENT SIDE
  console.log('4. Fetching updated CMS content on client side...');
  const content2 = await getCmsContent(testPath);
  const resolvedUrl2 = getCmsVal(content2, staticLocalSrc, 'analyticsbanner');

  console.log('   New Cloudinary Image URL:', resolvedUrl2);

  if (resolvedUrl2 !== cloudinaryUrl2) {
    throw new Error(`FAILED: Replaced image (${resolvedUrl2}) does not match Cloudinary URL 2 (${cloudinaryUrl2})!`);
  }
  if (resolvedUrl2 === cloudinaryUrl1) {
    throw new Error('FAILED: Old image URL is still being displayed!');
  }
  console.log('✅ Client side automatically updated to Cloudinary Image 2 and old image is no longer displayed!\n');

  console.log('🎉 --- MEDIA FLOW AUDIT PASSED 100% PERFECTLY --- 🎉');
  process.exit(0);
}

testMediaFlow().catch(err => {
  console.error('❌ Media Flow Test Failed:', err);
  process.exit(1);
});

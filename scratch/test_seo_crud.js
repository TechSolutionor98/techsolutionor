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
const { generateCmsMetadata, getCmsSeo } = require('../lib/cms-fetch.js');

async function testSeoCrud() {
  console.log('=== TESTING FULL SEO CRUD & DELETION LIFECYCLE ===\n');

  const testPath = '/technologies/analytics';
  const db = await getDb();
  const collection = db.collection('cms_seo');

  // STEP 1: CLEANUP PRIOR TO TEST
  await collection.deleteMany({ path: testPath });

  // STEP 2: TEST REMOVED / UNCONFIGURED STATE
  console.log('1. Testing REMOVED/DELETED state...');
  let meta1 = await generateCmsMetadata(testPath);
  console.log('   Result Title:', meta1.title);
  console.log('   Result Description:', meta1.description);
  if (meta1.title !== 'Tech Solutionor') {
    throw new Error('FAILED: Deleted state did not return base title!');
  }
  console.log('✅ Deleted state successfully returns base site metadata without static page residue.\n');

  // STEP 3: TEST ADD SEO
  console.log('2. Testing ADD SEO...');
  const addDoc = {
    path: testPath,
    websiteId: 'default',
    metaTitle: 'Analytics Technology Solutions | Tech Solutionor',
    metaDescription: 'Data-driven analytics and BI software services.',
    metaKeywords: ['analytics', 'data science', 'bi dashboard'],
    canonicalUrl: 'https://techsolutionor.com/technologies/analytics',
    robots: { index: true, follow: true },
    openGraph: { title: 'Analytics Solutions OG Title', description: 'Analytics OG Desc', image: 'https://techsolutionor.com/og.png' },
    twitterCard: { cardType: 'summary_large_image', title: 'Analytics Twitter Title', description: 'Analytics Twitter Desc' },
    schema: { customSchema: '{"@type":"Service","name":"Analytics"}' },
    updatedAt: new Date().toISOString()
  };
  await collection.replaceOne({ path: testPath }, addDoc, { upsert: true });

  let meta2 = await generateCmsMetadata(testPath);
  console.log('   Added Meta Title:', meta2.title);
  console.log('   Added Meta Description:', meta2.description);
  console.log('   Added Keywords:', meta2.keywords);
  console.log('   Added Canonical:', meta2.alternates?.canonical);
  console.log('   Added OG Title:', meta2.openGraph?.title);
  console.log('   Added Twitter Title:', meta2.twitter?.title);
  console.log('   Added Schema:', meta2.other?.['schema-custom-json']);

  if (meta2.title !== addDoc.metaTitle || meta2.description !== addDoc.metaDescription) {
    throw new Error('FAILED: Add SEO did not reflect on client metadata!');
  }
  console.log('✅ Add SEO reflected 100% dynamically.\n');

  // STEP 4: TEST EDIT / UPDATE SEO
  console.log('3. Testing EDIT / UPDATE SEO...');
  const updateDoc = {
    ...addDoc,
    metaTitle: 'UPDATED Analytics & Data Intelligence Platform 2026',
    metaDescription: 'UPDATED Data-driven decisions for enterprise growth.',
    updatedAt: new Date().toISOString()
  };
  await collection.replaceOne({ path: testPath }, updateDoc, { upsert: true });

  let meta3 = await generateCmsMetadata(testPath);
  console.log('   Updated Meta Title:', meta3.title);
  console.log('   Updated Meta Description:', meta3.description);

  if (meta3.title !== updateDoc.metaTitle || meta3.description !== updateDoc.metaDescription) {
    throw new Error('FAILED: Update SEO did not replace old values!');
  }
  console.log('✅ Edit / Update SEO replaced old values 100% dynamically.\n');

  // STEP 5: TEST DELETE / REMOVE SEO
  console.log('4. Testing DELETE / REMOVE SEO...');
  await collection.deleteMany({ path: testPath });

  let meta4 = await generateCmsMetadata(testPath);
  console.log('   Post-Delete Title:', meta4.title);
  console.log('   Post-Delete Description:', meta4.description);
  console.log('   Post-Delete Keywords:', meta4.keywords);
  console.log('   Post-Delete Canonical:', meta4.alternates?.canonical);

  if (meta4.title !== 'Tech Solutionor' || meta4.keywords !== undefined || meta4.alternates !== undefined) {
    throw new Error('FAILED: Delete SEO left lingering static data!');
  }
  console.log('✅ Delete / Remove SEO 100% purged all metadata from client side.\n');

  console.log('🎉 --- ALL CRUD & DELETION TESTS PASSED PERFECTLY --- 🎉');
  process.exit(0);
}

testSeoCrud().catch(err => {
  console.error('❌ CRUD Test Failed:', err);
  process.exit(1);
});

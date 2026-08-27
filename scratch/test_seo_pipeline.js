const fs = require('fs');
const path = require('path');

// Manually parse .env
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    }
  });
}

const { getDb } = require('../lib/mongodb.js');
const { generateCmsMetadata, getCmsSeo } = require('../lib/cms-fetch.js');

async function testSeoPipeline() {
  console.log('--- TESTING DYNAMIC SEO MANAGER PIPELINE ---');

  const db = await getDb();
  const collection = db.collection('cms_seo');

  // Test 1: Insert mock SEO entry for Angular page
  const angularPath = '/technologies/angular';
  const mockAngularSeo = {
    websiteId: 'default',
    path: angularPath,
    metaTitle: 'Dynamic Angular SEO Title - TechSolutionor',
    metaDescription: 'Dynamic Angular SEO Description managed via Admin Panel.',
    metaKeywords: ['angular', 'angularjs', 'web framework', 'techsolutionor'],
    canonicalUrl: 'https://techsolutionor.com/technologies/angular',
    robots: { index: true, follow: true, noArchive: false, noSnippet: false },
    openGraph: {
      title: 'Angular OG Title',
      description: 'Angular OG Description',
      image: 'https://techsolutionor.com/images/angular-og.png',
      type: 'website',
      locale: 'en_US',
    },
    twitterCard: {
      cardType: 'summary_large_image',
      title: 'Angular Twitter Title',
      description: 'Angular Twitter Description',
      image: 'https://techsolutionor.com/images/angular-twitter.png',
    },
    schema: {
      type: 'WebPage',
      customSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Angular Technology Page',
      }),
    },
    updatedAt: new Date().toISOString(),
  };

  await collection.replaceOne({ path: angularPath }, mockAngularSeo, { upsert: true });
  console.log(`✅ Upserted test SEO entry for route: ${angularPath}`);

  // Test 2: Fetch metadata via generateCmsMetadata
  const angularMetadata = await generateCmsMetadata(angularPath, {
    title: 'Default Title',
    description: 'Default Description',
  });

  console.log('\nGenerated Metadata for Angular page:');
  console.log(JSON.stringify(angularMetadata, null, 2));

  // Assertions
  if (angularMetadata.title !== 'Dynamic Angular SEO Title - TechSolutionor') {
    throw new Error(`Title mismatch! Expected "Dynamic Angular SEO Title - TechSolutionor", got "${angularMetadata.title}"`);
  }
  if (angularMetadata.description !== 'Dynamic Angular SEO Description managed via Admin Panel.') {
    throw new Error(`Description mismatch!`);
  }
  if (angularMetadata.alternates?.canonical !== 'https://techsolutionor.com/technologies/angular') {
    throw new Error(`Canonical mismatch!`);
  }
  if (angularMetadata.openGraph?.title !== 'Angular OG Title') {
    throw new Error(`OpenGraph Title mismatch!`);
  }
  if (angularMetadata.twitter?.title !== 'Angular Twitter Title') {
    throw new Error(`Twitter Title mismatch!`);
  }
  console.log('\n✅ All Angular metadata assertions passed!');

  // Test 3: Check isolation (Verify that another page e.g. /technologies/google-ads does NOT receive Angular SEO)
  const googleAdsPath = '/technologies/google-ads';
  const googleAdsMetadata = await generateCmsMetadata(googleAdsPath, {
    title: 'Google Ads Default Title',
    description: 'Google Ads Default Description',
  });

  console.log('\nGenerated Metadata for Google Ads page (should NOT contain Angular data):');
  console.log(JSON.stringify(googleAdsMetadata, null, 2));

  if (googleAdsMetadata.title === angularMetadata.title) {
    throw new Error('LEAKAGE DETECTED! Google Ads received Angular SEO data.');
  }

  console.log('✅ Isolation test passed! No cross-page SEO leakage.');
  console.log('\n--- ALL SEO PIPELINE TESTS PASSED SUCCESSFULLY ---');
  process.exit(0);
}

testSeoPipeline().catch((err) => {
  console.error('❌ SEO Pipeline Test Failed:', err);
  process.exit(1);
});

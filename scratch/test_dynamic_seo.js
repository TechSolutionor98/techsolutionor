const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

// Parse .env
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  lines.forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      process.env[match[1]] = value;
    }
  });
}

async function testDynamicSeo() {
  const { getCmsSeo, generateCmsMetadata } = require('../lib/cms-fetch.js');
  const { saveSeoEntry } = require('../lib/cms-service.js');

  console.log('=== TESTING DYNAMIC SEO UPDATE & FRONTEND FETCH ===');

  try {
    const testPath = '/about-us';
    
    // Save new dynamic SEO metadata from Admin Side
    const testSeoData = {
      metaTitle: 'Dynamic About Us | Tech Solutionor',
      metaDescription: 'Dynamic Meta Description for About Us page configured from Admin Side.',
      metaKeywords: ['about', 'techsolutionor', 'engineering', 'dubai'],
      canonicalUrl: 'https://techsolutionor.com/about-us',
      robots: { index: true, follow: true, noArchive: false, noSnippet: false },
      openGraph: {
        title: 'Dynamic About Us OG Title',
        description: 'Dynamic About Us OG Description',
        image: 'https://res.cloudinary.com/mrocxxeh/image/upload/v1787813766/cms/default/assets/s5p4dx0yhrzdcpnbrjdj.png',
        type: 'website',
        locale: 'en_US'
      },
      twitterCard: {
        cardType: 'summary_large_image',
        title: 'Dynamic Twitter Title',
        description: 'Dynamic Twitter Description',
        image: 'https://res.cloudinary.com/mrocxxeh/image/upload/v1787813766/cms/default/assets/s5p4dx0yhrzdcpnbrjdj.png'
      }
    };

    console.log(`1. Saving dynamic SEO from Admin Side for "${testPath}"...`);
    await saveSeoEntry(testPath, testSeoData);

    console.log(`2. Fetching Frontend generated metadata for "${testPath}"...`);
    const fetched = await generateCmsMetadata(testPath);

    console.log('\nGenerated Metadata Result:');
    console.log(' - Title:', fetched.title);
    console.log(' - Description:', fetched.description);
    console.log(' - Keywords:', fetched.keywords);
    console.log(' - Canonical:', fetched.alternates?.canonical);
    console.log(' - OG Title:', fetched.openGraph?.title);
    console.log(' - OG Image:', fetched.openGraph?.images?.[0]?.url);
    console.log(' - Twitter Card:', fetched.twitter?.card);

    if (
      fetched.title === testSeoData.metaTitle &&
      fetched.description === testSeoData.metaDescription &&
      fetched.alternates?.canonical === testSeoData.canonicalUrl
    ) {
      console.log('\n✅ Dynamic SEO verification PASSED! Admin Side edits are immediately applied to Frontend.');
    } else {
      console.error('\n❌ Dynamic SEO verification FAILED!');
    }

  } catch (err) {
    console.error('Error testing dynamic SEO:', err);
  }
}

testDynamicSeo();

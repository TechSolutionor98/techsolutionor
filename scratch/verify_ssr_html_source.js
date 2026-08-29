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

async function testHtmlSourceVerification() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'techsolutionor';
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

  console.log('=== VERIFYING SERVER-SIDE HTML SOURCE INJECTION ===\n');

  try {
    await client.connect();
    const db = client.db(dbName);

    const testPayload = {
      phone: '+971 54 3502 460',
      email: 'info@techsolutionor.com',
      address: 'Al Jahra Building, 2nd floor, 18th St – Al Raffa – Dubai',
      googleAnalyticsId: 'G-VERIFYSSRGA4',
      googleTagManagerId: 'GTM-VERIFYSSRGTM',
      facebookPixelId: '987654321012345',
      customHeadScript: 'console.log("CLARITY_AND_CHAT_WIDGET_TEST_OK");',
    };

    console.log('1. Setting test analytics IDs in website_settings in MongoDB...');
    await db.collection('settings').updateOne(
      { _id: 'website_settings' },
      { $set: { ...testPayload, updatedAt: new Date().toISOString() } },
      { upsert: true }
    );

    console.log('2. Fetching raw HTML source from http://localhost:3000/ ...');
    const res = await fetch('http://localhost:3000/');
    const htmlText = await res.text();

    console.log('\n--- VERIFYING HTML SOURCE CONTENT ---');
    const hasGA4 = htmlText.includes('G-VERIFYSSRGA4');
    const hasGTM = htmlText.includes('GTM-VERIFYSSRGTM');
    const hasFBPixel = htmlText.includes('987654321012345');
    const hasClarityWidget = htmlText.includes('CLARITY_AND_CHAT_WIDGET_TEST_OK');

    console.log(' - GA4 ID present in HTML source (view-source):', hasGA4 ? 'YES ✅' : 'NO ❌');
    console.log(' - GTM ID present in HTML source (view-source):', hasGTM ? 'YES ✅' : 'NO ❌');
    console.log(' - FB Pixel ID present in HTML source (view-source):', hasFBPixel ? 'YES ✅' : 'NO ❌');
    console.log(' - Custom Head/Clarity script in HTML source:', hasClarityWidget ? 'YES ✅' : 'NO ❌');

    if (hasGA4 && hasGTM && hasFBPixel && hasClarityWidget) {
      console.log('\n✅ VIEW-SOURCE VERIFICATION PASSED! All Admin Side integrations are rendered directly into the initial HTML source.');
    } else {
      console.error('\n❌ VIEW-SOURCE VERIFICATION FAILED!');
    }

  } catch (err) {
    console.error('Error testing HTML source:', err);
  } finally {
    // Reset test IDs from DB
    const db = client.db(process.env.MONGODB_DB || 'techsolutionor');
    await db.collection('settings').updateOne(
      { _id: 'website_settings' },
      {
        $set: {
          googleAnalyticsId: '',
          googleTagManagerId: '',
          facebookPixelId: '',
          customHeadScript: '',
        }
      }
    );
    await client.close();
  }
}

testHtmlSourceVerification();

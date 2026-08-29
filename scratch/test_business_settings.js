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

async function testBusinessSettings() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'techsolutionor';
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

  console.log('=== BUSINESS SETTINGS & ANALYTICS INTEGRATION TEST ===\n');

  try {
    await client.connect();
    const db = client.db(dbName);

    const testPayload = {
      phone: '+971 54 3502 460',
      email: 'info@techsolutionor.com',
      address: 'Al Jahra Building, 2nd floor, 18th St – Al Raffa – Dubai',
      facebook: 'https://facebook.com/techsolutionor',
      twitter: 'https://twitter.com/techsolutionor',
      instagram: 'https://instagram.com/techsolutionor',
      linkedin: 'https://linkedin.com/company/techsolutionor',
      googleAnalyticsId: 'G-TESTGA4ID123',
      googleTagManagerId: 'GTM-TESTTAG123',
      facebookPixelId: '1234567890987654',
      customHeadScript: '<script type="text/javascript">(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "testclarityid");</script>',
      customBodyScript: '<script>console.log("Custom body script injected successfully");</script>',
      thirdPartyApps: [
        { name: 'Tawk.to Chat Widget', active: true, codeSnippet: '<script>var Tawk_API=Tawk_API||{};</script>', target: 'body' }
      ]
    };

    console.log('1. Saving test Business Settings into MongoDB (website_settings)...');
    await db.collection('settings').replaceOne(
      { _id: 'website_settings' },
      { _id: 'website_settings', ...testPayload, updatedAt: new Date().toISOString() },
      { upsert: true }
    );

    console.log('2. Fetching settings via MongoDB query...');
    const savedDoc = await db.collection('settings').findOne({ _id: 'website_settings' });
    
    console.log(' - Saved Phone:', savedDoc.phone);
    console.log(' - Saved Email:', savedDoc.email);
    console.log(' - Saved GA4 ID:', savedDoc.googleAnalyticsId);
    console.log(' - Saved GTM ID:', savedDoc.googleTagManagerId);
    console.log(' - Saved FB Pixel ID:', savedDoc.facebookPixelId);
    console.log(' - Saved Custom Head Script (Clarity/Widget):', savedDoc.customHeadScript.slice(0, 50) + '...');
    console.log(' - Saved Third-Party Apps count:', savedDoc.thirdPartyApps.length);

    if (
      savedDoc.googleAnalyticsId === testPayload.googleAnalyticsId &&
      savedDoc.googleTagManagerId === testPayload.googleTagManagerId &&
      savedDoc.facebookPixelId === testPayload.facebookPixelId &&
      savedDoc.customHeadScript === testPayload.customHeadScript
    ) {
      console.log('\n✅ Business Settings verification PASSED! Admin Side settings are perfectly saved, fetched, and ready for Frontend injection.');
    } else {
      console.error('\n❌ Business Settings verification FAILED!');
    }

  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    await client.close();
  }
}

testBusinessSettings();

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

async function checkHomeBannerDb() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'techsolutionor';
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    const db = client.db(dbName);
    
    const homeDoc = await db.collection('cms_page_content').findOne({ path: '/' });
    if (homeDoc && homeDoc.sections) {
      const bannerSection = homeDoc.sections.find(s => s.sectionId === 'homebanner' || s.sectionId === 'hero');
      console.log('=== HOME BANNER SECTION IN MONGODB (cms_page_content) ===');
      console.log(JSON.stringify(bannerSection, null, 2));
    } else {
      console.log('No homeDoc found');
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

checkHomeBannerDb();

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

async function inspectMedia() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'techsolutionor';
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    const db = client.db(dbName);
    
    console.log('\n--- SAMPLE cms_media DOCUMENTS ---');
    const mediaCount = await db.collection('cms_media').countDocuments({});
    console.log(`Total count in cms_media: ${mediaCount}`);

    const samples = await db.collection('cms_media').find({}).limit(5).toArray();
    console.log('\nSample items:');
    samples.forEach(m => console.log(JSON.stringify(m, null, 2)));

    console.log('\n--- DISTINCT websiteId VALUES IN cms_media ---');
    const websiteIds = await db.collection('cms_media').distinct('websiteId');
    console.log(websiteIds);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

inspectMedia();

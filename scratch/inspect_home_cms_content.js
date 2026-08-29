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

async function inspectCmsContent() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'techsolutionor';
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    const db = client.db(dbName);
    
    console.log('\n--- cms_page_content FOR path "/" ---');
    const homeDoc = await db.collection('cms_page_content').findOne({ path: '/' });
    console.log('Doc found:', !!homeDoc);
    if (homeDoc) {
      console.log('Sections array length:', homeDoc.sections?.length);
      console.log(JSON.stringify(homeDoc, null, 2));
    }

    console.log('\n--- ALL DOCUMENTS IN cms_page_content ---');
    const allDocs = await db.collection('cms_page_content').find({}).toArray();
    console.log(`Total docs in cms_page_content: ${allDocs.length}`);
    allDocs.forEach(d => console.log(` - Path: "${d.path}", Sections count: ${d.sections?.length}`));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

inspectCmsContent();

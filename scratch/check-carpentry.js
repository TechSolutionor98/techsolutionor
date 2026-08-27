const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb+srv://admin:admin@osumfix.nmt1vqm.mongodb.net/?appName=Osumfix';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('osumfix');
    const content = await db.collection('cms_page_content').findOne({ path: '/services/carpentry-work' });
    if (content) {
      for (const s of content.sections || []) {
        console.log(`Section: ${s.sectionId} (${s.sectionName})`);
        for (const [k, f] of Object.entries(s.fields || {})) {
          if (f.type === 'image' || (f.originalValue && f.originalValue.includes('/images/'))) {
            console.log(`  - Field: ${k}, Label: ${f.label}, Value: ${f.value}, Original: ${f.originalValue}`);
          }
        }
      }
    } else {
      console.log('No DB record for carpentry-work, meaning it is parsed dynamically from file unless saved');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();

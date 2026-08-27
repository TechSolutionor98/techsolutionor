const { MongoClient } = require('mongodb');

async function checkContent() {
  const uri = 'mongodb+srv://admin:admin@osumfix.nmt1vqm.mongodb.net/?appName=Osumfix';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('osumfix');
    const doc = await db.collection('cms_page_content').findOne({ path: '/services/interior-designing' });
    console.log('Doc _id:', doc?._id);
    console.log('Doc routeId:', doc?.routeId);
    console.log('Doc websiteId:', doc?.websiteId);
    console.log('Doc status:', doc?.status);
    console.log('Sections list:');
    doc?.sections?.forEach((s, idx) => {
      console.log(`  [${idx}] ${s.sectionId} - ${s.sectionName} (fields: ${Object.keys(s.fields || {}).length})`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

checkContent();

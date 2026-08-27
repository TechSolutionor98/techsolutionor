const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb+srv://admin:admin@osumfix.nmt1vqm.mongodb.net/?appName=Osumfix';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('osumfix');
    console.log('Connected to DB:', db.databaseName);
    
    const route = await db.collection('cms_routes').findOne({ path: '/services/interior-designing' });
    console.log('Route:', route);
    
    const content = await db.collection('cms_page_content').findOne({ path: '/services/interior-designing' });
    console.log('Content exists:', !!content);
    if (content) {
      console.log('Sections count:', content.sections?.length);
      console.log('Sections:', JSON.stringify(content.sections?.map(s => ({
        sectionId: s.sectionId,
        sectionName: s.sectionName,
        fields: Object.keys(s.fields || {}).map(k => ({ key: k, type: s.fields[k].type, label: s.fields[k].label, value: s.fields[k].value, originalValue: s.fields[k].originalValue }))
      })), null, 2));
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();

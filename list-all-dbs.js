const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://admin:admin@cluster0.ac1fznk.mongodb.net';

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const adminDb = client.db().admin();
    const dbsList = await adminDb.listDatabases();
    console.log("Databases on cluster:");
    console.log(dbsList.databases.map(d => d.name));

    for (const dbInfo of dbsList.databases) {
      const db = client.db(dbInfo.name);
      const collections = await db.listCollections().toArray();
      const colNames = collections.map(c => c.name);
      if (colNames.includes('cms_page_content')) {
        console.log(`\nDatabase "${dbInfo.name}" has cms_page_content. Documents:`);
        const docs = await db.collection('cms_page_content').find({}).project({ path: 1, routeId: 1, websiteId: 1 }).toArray();
        console.log(docs);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
main();

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://admin:admin@cluster0.ac1fznk.mongodb.net';
const dbName = 'voltariadb';

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const list = await db.collection('cms_page_content').find({}).project({ path: 1, routeId: 1, websiteId: 1 }).toArray();
    console.log(list);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
main();

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://admin:admin@cluster0.ac1fznk.mongodb.net';
const dbName = 'voltariadb';

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const content = await db.collection('cms_page_content').findOne({ path: '/products/inverters' });
    console.log(JSON.stringify(content, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
main();

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://admin:admin@cluster0.ac1fznk.mongodb.net';
const dbName = 'voltariadb';

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const routes = await db.collection('cms_routes').find({}).toArray();
    console.log(JSON.stringify(routes, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
main();

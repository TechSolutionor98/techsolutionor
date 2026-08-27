const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://admin:admin@cluster0.ac1fznk.mongodb.net';
const dbName = 'voltariadb';

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    console.log(collections.map(c => c.name));
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
main();

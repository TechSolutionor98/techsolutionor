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

async function inspectDb() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'techsolutionor';
  console.log('Connecting to MongoDB database:', dbName);
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    console.log('\n=== MONGODB COLLECTIONS & COUNTS ===');
    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      console.log(`Collection: "${col.name}" -> ${count} documents`);
    }
  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    await client.close();
  }
}

inspectDb();

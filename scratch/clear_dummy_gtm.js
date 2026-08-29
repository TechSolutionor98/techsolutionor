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

async function clearDummyGtm() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'techsolutionor';
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    const db = client.db(dbName);
    
    await db.collection('settings').updateOne(
      { _id: 'website_settings' },
      {
        $set: {
          phone: '+971 54 3502 460',
          email: 'info@techsolutionor.com',
          address: 'Al Jahra Building, 2nd floor, 18th St – Al Raffa – Dubai',
          googleTagManagerId: '',
          googleTagManagerHeadCode: '',
          googleTagManagerBodyCode: '',
          updatedAt: new Date().toISOString()
        }
      }
    );
    console.log('Cleared dummy GTM ID from website_settings in MongoDB.');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

clearDummyGtm();

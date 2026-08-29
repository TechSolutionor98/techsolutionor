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

async function inspectSamples() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'techsolutionor';
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    const db = client.db(dbName);
    
    console.log('\n--- SAMPLE CONTACT SUBMISSION ---');
    const contactSample = await db.collection('contact_submissions').findOne({});
    console.log(JSON.stringify(contactSample, null, 2));

    console.log('\n--- SAMPLE ACTIVITY LOG ---');
    const activitySample = await db.collection('cms_activity_logs').findOne({});
    console.log(JSON.stringify(activitySample, null, 2));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

inspectSamples();

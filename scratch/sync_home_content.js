const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const { parsePageContent } = require('../lib/cms-parser.js');

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

async function checkAndSyncHomeContent() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'techsolutionor';
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    const db = client.db(dbName);

    console.log('=== PARSING HOME PAGE COMPONENT CODE ===');
    const parsedSections = parsePageContent(path.join(process.cwd(), 'app/Home/HomeClientPage.js'));
    console.log(`Parsed ${parsedSections.length} sections from code.`);

    const homeDoc = await db.collection('cms_page_content').findOne({ path: '/' });
    const dbSections = homeDoc?.sections || [];

    console.log('\n=== COMPARING PARSED VS DB SECTIONS ===');
    for (const parsedSec of parsedSections) {
      const dbSec = dbSections.find(s => s.sectionId === parsedSec.sectionId || s.sectionName === parsedSec.sectionName);
      console.log(`\n--- Section: ${parsedSec.sectionName} (${parsedSec.sectionId}) ---`);
      
      for (const [key, parsedField] of Object.entries(parsedSec.fields || {})) {
        const dbField = dbSec?.fields?.[key];
        const dbVal = dbField?.value;
        const codeVal = parsedField.value;
        
        if (dbVal !== codeVal) {
          console.log(`  Field [${key}]: DB="${(dbVal||'').slice(0,40)}..." vs CODE="${(codeVal||'').slice(0,40)}..."`);
        }
      }
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

checkAndSyncHomeContent();

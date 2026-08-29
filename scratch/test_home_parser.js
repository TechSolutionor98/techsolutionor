const fs = require('fs');
const path = require('path');

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

async function testHomeParser() {
  const { getPageContent } = require('../lib/cms-service.js');
  console.log('=== TESTING getPageContent FOR ROUTE "/" (Home Page) ===');
  try {
    const res = await getPageContent('/');
    console.log('Route object:', res.route);
    console.log('Is New:', res.isNew);
    console.log('Sections count:', res.content?.sections?.length);
    if (res.content?.sections) {
      res.content.sections.forEach((sec, i) => {
        console.log(`\nSection [${i+1}] ${sec.sectionName} (ID: ${sec.sectionId}, File: ${sec.filePath}):`);
        console.log('  Fields count:', Object.keys(sec.fields || {}).length);
        console.log('  Field keys:', Object.keys(sec.fields || {}));
      });
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

testHomeParser();

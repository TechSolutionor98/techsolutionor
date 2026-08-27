const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[trimmed.slice(0, idx).trim()] = val;
      }
    }
  });
}

const { getDb } = require('../lib/mongodb.js');

async function inspectDoc() {
  const db = await getDb();
  const pageDoc = await db.collection('cms_page_content').findOne({ path: '/technologies/analytics' });
  console.log('Sections count:', pageDoc.sections.length);
  for (const s of pageDoc.sections) {
    console.log(`\nSection: ${s.sectionId} (${s.sectionName})`);
    for (const [k, v] of Object.entries(s.fields || {})) {
      if (v.type === 'image' || (typeof v.value === 'string' && v.value.includes('cloudinary'))) {
        console.log(`  [IMAGE] key: ${k} | orig: ${v.originalValue} | val: ${v.value}`);
      }
    }
  }
  process.exit(0);
}

inspectDoc();

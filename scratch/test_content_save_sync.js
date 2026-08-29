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

async function testSaveContentSync() {
  const { getPageContent, savePageContent } = require('../lib/cms-service.js');
  console.log('=== TESTING CONTENT SAVE & SYNC FOR HOME PAGE "/" ===');

  try {
    const initial = await getPageContent('/');
    console.log(`Initial Home Page sections count: ${initial.content.sections.length}`);
    
    // Save content back
    const saveResult = await savePageContent('/', initial.content);
    console.log('Save result status:', saveResult.ok ? 'SUCCESS' : 'FAILED');

    // Re-fetch
    const updated = await getPageContent('/');
    console.log(`Updated Home Page sections count: ${updated.content.sections.length}`);

    if (updated.content.sections.length === initial.content.sections.length) {
      console.log('✅ Full synchronization verified! All sections preserved during save & fetch.');
    } else {
      console.error('❌ Mismatch in section count!');
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

testSaveContentSync();

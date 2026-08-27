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

const { ObjectId } = require('mongodb');
const { getDb } = require('../lib/mongodb.js');
const { getPageContent } = require('../lib/cms-service.js');
const { getCmsSeo } = require('../lib/cms-fetch.js');

function safeObjId(id) {
  if (!id || typeof id !== 'string') return null;
  if (/^[0-9a-fA-F]{24}$/.test(id)) {
    try { return new ObjectId(id); } catch (e) { return null; }
  }
  return null;
}

async function testEdgeCases() {
  console.log('=== TESTING EDGE CASE ROUTE IDs AGAINST BSON CRASHES ===\n');

  const edgeCaseIds = [
    'invalid-hex-id',
    '12345',
    '65a123',
    '/technologies/analytics',
    '/',
    'undefined',
    'null',
    '68a51234567890abcdef1234' // valid 24 hex
  ];

  for (const id of edgeCaseIds) {
    try {
      console.log(`Testing id: "${id}"...`);
      const safeId = safeObjId(id);
      const res = await getPageContent(id);
      const seo = await getCmsSeo(id);
      console.log(`  -> safeObjId: ${safeId ? safeId.toString() : 'null'}, getPageContent OK, getCmsSeo OK`);
    } catch (err) {
      console.error(`❌ CRASHED for id: "${id}" -> ERROR:`, err.message);
      process.exit(1);
    }
  }

  console.log('\n🎉 --- ALL EDGE CASE TESTS PASSED WITH 0 CRASHES --- 🎉');
  process.exit(0);
}

testEdgeCases();

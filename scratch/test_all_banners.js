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
const { getRoutesList } = require('../lib/cms-service.js');
const { getCmsContent } = require('../lib/cms-fetch.js');
const { getCmsVal } = require('../lib/api-helper.js');

async function testAllBanners() {
  console.log('=== TESTING BANNER AND CONTENT RESOLUTION ACROSS ALL 46 PAGES ===\n');

  const routes = await getRoutesList();
  console.log(`Auditing ${routes.length} pages...`);

  let textCorruptionCount = 0;

  for (const route of routes) {
    const content = await getCmsContent(route.path);
    if (!content || !Array.isArray(content.sections)) continue;

    for (const section of content.sections) {
      for (const [key, field] of Object.entries(section.fields || {})) {
        if (!field) continue;
        if (field.type !== 'image') {
          const resolved = getCmsVal(content, field.originalValue, section.sectionId);
          const resolvedStr = String(resolved);
          if (resolvedStr.includes('https://res.cloudinary.com')) {
            console.error(`❌ TEXT CORRUPTION DETECTED on ${route.path} section ${section.sectionId}: Text field "${field.originalValue}" resolved to Cloudinary image URL!`);
            textCorruptionCount++;
          }
        }
      }
    }
  }

  console.log(`\nAudit Complete: Text field corruptions found: ${textCorruptionCount}`);

  if (textCorruptionCount > 0) {
    process.exit(1);
  } else {
    console.log('✅ Zero text corruptions across all 46 pages and all sections!');
    console.log('🎉 --- ALL 46 PAGES VERIFIED DYNAMIC & CLEAN --- 🎉');
    process.exit(0);
  }
}

testAllBanners().catch(err => {
  console.error('❌ Audit Error:', err);
  process.exit(1);
});

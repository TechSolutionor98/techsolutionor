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
const { parsePageContent } = require('../lib/cms-parser.js');
const { getPageContent, savePageContent } = require('../lib/cms-service.js');

async function cleanupHomeCms() {
  console.log('=== CLEANING UP CMS CONTENT FOR HOME PAGE ===\n');

  const db = await getDb();
  const route = await db.collection('cms_routes').findOne({ path: '/' });
  if (!route) {
    console.error('Home route not found in cms_routes');
    process.exit(1);
  }

  console.log(`Found Home route: ${route._id.toString()} (${route.path})`);

  // Parse fresh clean sections from HomeClientPage.js
  const targetPath = route.path === '/' ? 'app/Home/HomeClientPage.js' : route.filePath;
  const freshSections = parsePageContent(path.join(process.cwd(), targetPath));
  console.log(`Parsed ${freshSections.length} clean sections for Home page.`);

  for (const sec of freshSections) {
    console.log(`\nSection: ${sec.sectionName} (${sec.sectionId}) [${Object.keys(sec.fields || {}).length} fields]`);
  }

  // Fetch current DB content and merge
  const { content } = await getPageContent(route._id.toString());
  console.log(`\nMerged sections from getPageContent: ${content.sections.length}`);
  content.sections.forEach((s, i) => console.log(`  ${i + 1}. [${s.sectionId}] ${s.sectionName} (${Object.keys(s.fields || {}).length} fields)`));

  // Save to database
  await db.collection('cms_page_content').updateOne(
    { path: '/' },
    {
      $set: {
        routeId: route._id.toString(),
        path: '/',
        sections: content.sections,
        status: 'published',
        version: (content.version || 1) + 1,
        updatedAt: new Date().toISOString()
      }
    },
    { upsert: true }
  );

  console.log('\n✅ Successfully cleaned up and saved Home page CMS content in MongoDB!');
  console.log('🎉 --- HOME PAGE CMS CLEANUP PASSED --- 🎉');
  process.exit(0);
}

cleanupHomeCms().catch(err => {
  console.error('❌ Cleanup failed:', err);
  process.exit(1);
});

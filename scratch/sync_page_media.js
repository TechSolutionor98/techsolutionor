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
const { getRoutesList } = require('../lib/cms-service.js');

async function syncPageMedia() {
  console.log('=== SYNCING CLOUDINARY URLS INTO CMS PAGE CONTENT ===\n');

  const mapPath = path.join(__dirname, 'cloudinary_migration_map.json');
  if (!fs.existsSync(mapPath)) {
    console.error('Migration map file not found yet.');
    process.exit(1);
  }

  const urlMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  console.log(`Loaded ${Object.keys(urlMap).length} mapped Cloudinary URLs.`);

  const db = await getDb();
  const contentCol = db.collection('cms_page_content');
  const routes = await getRoutesList();

  let updatedPagesCount = 0;

  for (const route of routes) {
    let sections = [];
    if (route.filePath) {
      const fullPath = path.join(process.cwd(), route.filePath);
      try {
        sections = parsePageContent(fullPath);
      } catch (e) {}
    }

    const existingContent = await contentCol.findOne({ path: route.path });
    const pageSections = existingContent?.sections?.length > 0 ? existingContent.sections : sections;

    let modified = false;
    const updatedSections = pageSections.map(sec => {
      const updatedFields = { ...sec.fields };
      for (const [key, field] of Object.entries(sec.fields || {})) {
        if (!field) continue;
        if (field.type === 'image') {
          const origVal = field.originalValue || field.value || '';
          const fileName = path.basename(origVal);
          const cleanName = fileName.toLowerCase();

          const cloudinaryUrl = urlMap[origVal] || urlMap[fileName] || urlMap[cleanName] || urlMap[`public/images/${fileName}`] || urlMap[`components/Images/${fileName}`];
          if (cloudinaryUrl) {
            updatedFields[key] = {
              ...field,
              value: cloudinaryUrl,
            };
            modified = true;
          }
        }
      }
      return {
        ...sec,
        fields: updatedFields,
      };
    });

    const doc = {
      routeId: route._id.toString(),
      path: route.path,
      websiteId: 'default',
      sections: updatedSections,
      status: 'published',
      version: (existingContent?.version || 1) + 1,
      updatedAt: new Date().toISOString(),
    };

    await contentCol.replaceOne(
      { path: route.path },
      doc,
      { upsert: true }
    );
    updatedPagesCount++;
  }

  console.log(`\n✅ Synced Cloudinary URLs into ${updatedPagesCount} CMS page documents in MongoDB.`);
  console.log('🎉 --- CMS PAGE MEDIA SYNC PASSED --- 🎉');
  process.exit(0);
}

syncPageMedia().catch(err => {
  console.error('❌ Sync failed:', err);
  process.exit(1);
});

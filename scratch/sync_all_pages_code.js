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

async function syncAllPagesCode() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'techsolutionor';
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    const db = client.db(dbName);

    const routes = await db.collection('cms_routes').find({}).toArray();
    console.log(`Checking ${routes.length} routes for updated code content...`);

    for (const r of routes) {
      if (!r.filePath) continue;

      let targetFilePath = r.filePath;
      if (r.path === '/') {
        targetFilePath = 'app/Home/HomeClientPage.js';
      }

      const absolutePath = path.join(process.cwd(), targetFilePath);
      if (!fs.existsSync(absolutePath)) continue;

      let parsedSections = [];
      try {
        parsedSections = parsePageContent(absolutePath);
      } catch (err) {
        continue;
      }

      if (parsedSections.length === 0) continue;

      const homeDoc = await db.collection('cms_page_content').findOne({ path: r.path });
      if (!homeDoc || !Array.isArray(homeDoc.sections)) continue;

      let docChanged = false;
      const updatedSections = homeDoc.sections.map(existingSec => {
        const parsedSec = parsedSections.find(s => s.sectionId === existingSec.sectionId || s.sectionName === existingSec.sectionName);
        if (!parsedSec) return existingSec;

        const mergedFields = { ...existingSec.fields };
        for (const [key, parsedField] of Object.entries(parsedSec.fields || {})) {
          const dbField = mergedFields[key];
          
          if (!dbField) {
            // New field added in code
            mergedFields[key] = parsedField;
            docChanged = true;
          } else {
            // Check if originalValue changed in code AND dbField value was identical to old originalValue
            const isCodeUpdated = dbField.originalValue !== parsedField.originalValue;
            const isUserUnedited = !dbField.value || dbField.value === dbField.originalValue;

            if (isCodeUpdated && isUserUnedited && parsedField.type !== 'image') {
              console.log(`[${r.path}] Updating stale DB field "${key}": "${(dbField.value||'').slice(0,30)}" -> "${parsedField.value.slice(0,30)}"`);
              mergedFields[key] = {
                ...dbField,
                value: parsedField.value,
                originalValue: parsedField.originalValue,
                label: parsedField.label || dbField.label
              };
              docChanged = true;
            }
          }
        }

        return {
          ...existingSec,
          fields: mergedFields
        };
      });

      if (docChanged) {
        await db.collection('cms_page_content').updateOne(
          { path: r.path },
          { $set: { sections: updatedSections, updatedAt: new Date() } }
        );
        console.log(`✅ Updated DB content for path "${r.path}"`);
      }
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

syncAllPagesCode();

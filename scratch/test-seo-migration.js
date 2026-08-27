const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value.length > 0) {
      process.env[key.trim()] = value.join('=').trim().replace(/^["']|["']$/g, '');
    }
  });
}

const { parsePageContent } = require('../lib/cms-parser.js');
const { getPageContent, scanRoutes } = require('../lib/cms-service.js');
const { getDb } = require('../lib/mongodb.js');

async function main() {
  const oldSeoFile = path.join(process.cwd(), 'app/services/seo/page.js');
  const oldSeoDir = path.join(process.cwd(), 'app/services/seo');
  if (fs.existsSync(oldSeoFile)) {
    console.log('Removing old app/services/seo/page.js...');
    fs.unlinkSync(oldSeoFile);
  }
  if (fs.existsSync(oldSeoDir)) {
    try {
      fs.rmdirSync(oldSeoDir);
      console.log('Removed empty directory app/services/seo');
    } catch (e) {
      console.log('Directory app/services/seo not empty or already removed:', e.message);
    }
  }

  const newFilePath = path.join(process.cwd(), 'app/services/search-engine-optimization/page.js');
  console.log('--- Testing parsePageContent for app/services/search-engine-optimization/page.js ---');
  const sections = parsePageContent(newFilePath);
  console.log('Total sections parsed for new path:', sections.length);
  sections.forEach((s, idx) => {
    console.log(`\n[${idx + 1}] Section: ${s.sectionName} (${s.sectionId}), File: ${s.filePath}`);
    console.log(`Fields count: ${Object.keys(s.fields || {}).length}`);
    Object.entries(s.fields || {}).forEach(([k, v]) => {
      console.log(`  - ${k}: [${v.type}] ${v.label} => "${(v.value || '').substring(0, 45)}..."`);
    });
  });

  const db = await getDb();
  await scanRoutes();

  const oldDoc = await db.collection('cms_routes').findOne({ path: '/services/seo' });
  console.log('\nOld route doc in DB (/services/seo):', oldDoc);

  const newDoc = await db.collection('cms_routes').findOne({ path: '/services/search-engine-optimization' });
  console.log('\nNew route doc in DB (/services/search-engine-optimization):', newDoc);

  if (newDoc) {
    const pageData = await getPageContent(newDoc._id.toString());
    console.log('getPageContent sections count for new route:', pageData.content.sections.length);
  }

  process.exit(0);
}

main().catch(console.error);

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
  const filePath = path.join(process.cwd(), 'app/services/content-writing/page.js');
  console.log('--- Testing parsePageContent for app/services/content-writing/page.js ---');
  const sections = parsePageContent(filePath);
  console.log('Total sections parsed:', sections.length);
  sections.forEach((s, idx) => {
    console.log(`\n[${idx + 1}] Section: ${s.sectionName} (${s.sectionId}), File: ${s.filePath}`);
    console.log(`Fields count: ${Object.keys(s.fields || {}).length}`);
    console.log('Fields:');
    Object.entries(s.fields || {}).forEach(([k, v]) => {
      console.log(`  - ${k}: [${v.type}] ${v.label} => "${(v.value || '').substring(0, 50)}..."`);
    });
  });

  const db = await getDb();
  await scanRoutes();
  const routeDoc = await db.collection('cms_routes').findOne({ path: '/services/content-writing' });
  console.log('\n--- Route doc in DB for /services/content-writing ---', routeDoc);

  if (routeDoc) {
    const pageData = await getPageContent(routeDoc._id.toString());
    console.log('getPageContent sections count:', pageData.content.sections.length);
  }

  process.exit(0);
}

main().catch(console.error);

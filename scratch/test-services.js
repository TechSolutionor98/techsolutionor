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
const { getPageContent } = require('../lib/cms-service.js');
const { getDb } = require('../lib/mongodb.js');

async function main() {
  const filePath = path.join(process.cwd(), 'app/services/page.js');
  console.log('--- Testing parsePageContent for app/services/page.js ---');
  const sections = parsePageContent(filePath);
  console.log('Total sections parsed:', sections.length);
  sections.forEach(s => {
    console.log(`\nSection: ${s.sectionName} (${s.sectionId}), File: ${s.filePath}`);
    console.log(`Fields count: ${Object.keys(s.fields || {}).length}`);
    console.log('Fields keys:', Object.keys(s.fields || {}));
  });

  const db = await getDb();
  const routeServices = await db.collection('cms_routes').findOne({ path: '/services' });
  console.log('\n--- Route doc in DB for /services ---', routeServices);

  if (routeServices) {
    const pageData = await getPageContent(routeServices._id.toString());
    console.log('getPageContent sections count:', pageData.content.sections.length);
  }

  process.exit(0);
}

main().catch(console.error);

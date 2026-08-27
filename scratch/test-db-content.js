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

const { getDb } = require('../lib/mongodb.js');
const { getPageContent } = require('../lib/cms-service.js');

async function test() {
  const db = await getDb();
  const allContents = await db.collection('cms_page_content').find({}).toArray();
  console.log('Total documents in cms_page_content:', allContents.length);
  allContents.forEach(c => {
    console.log(`Path: ${c.path}, Status: ${c.status}, Sections Count: ${c.sections ? c.sections.length : 0}`);
  });

  const routeAboutUs = await db.collection('cms_routes').findOne({ path: '/about-us' });
  console.log('\n/about-us route doc:', routeAboutUs);

  if (routeAboutUs) {
    const pageData = await getPageContent(routeAboutUs._id.toString());
    console.log('\ngetPageContent for /about-us:');
    console.log('isNew:', pageData.isNew);
    console.log('Sections returned:', pageData.content.sections.length);
    pageData.content.sections.forEach(s => {
      console.log(`- ${s.sectionName} (${s.sectionId}) -> fields count: ${Object.keys(s.fields || {}).length}`);
    });
  }

  process.exit(0);
}

test().catch(console.error);

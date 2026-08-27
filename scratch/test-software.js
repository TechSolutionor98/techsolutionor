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

const { getPageContent, scanRoutes } = require('../lib/cms-service.js');

async function main() {
  await scanRoutes();
  const routeUrl = '/services/software-development';
  console.log(`\n=== Testing getPageContent for ${routeUrl} ===`);
  const res = await getPageContent(routeUrl);
  const content = res.content || {};
  console.log('Page content path:', content.path);
  console.log('Total sections in page content:', content.sections ? content.sections.length : 0);

  if (content.sections) {
    content.sections.forEach((s, idx) => {
      console.log(`\n[${idx + 1}] Section: ${s.sectionName} (${s.sectionId}), File: ${s.filePath}`);
      console.log(`Fields count: ${Object.keys(s.fields || {}).length}`);
      Object.entries(s.fields || {}).forEach(([k, v]) => {
        console.log(`  - ${k}: [${v.type}] ${v.label} => "${(v.value || '').substring(0, 45)}..."`);
      });
    });
  }

  process.exit(0);
}

main().catch(console.error);

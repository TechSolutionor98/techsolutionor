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
  const filePath = path.join(process.cwd(), 'app/services/Graphics/page.js');
  console.log('--- Testing parsePageContent for app/services/Graphics/page.js ---');
  const sections = parsePageContent(filePath);
  console.log('Total sections parsed:', sections.length);
  sections.forEach((s, idx) => {
    console.log(`\n[${idx + 1}] Section: ${s.sectionName} (${s.sectionId}), File: ${s.filePath}`);
    console.log(`Fields count: ${Object.keys(s.fields || {}).length}`);
    Object.entries(s.fields || {}).forEach(([k, v]) => {
      console.log(`  - ${k}: [${v.type}] ${v.label} => "${(v.value || '').substring(0, 45)}..."`);
    });
  });

  process.exit(0);
}

main().catch(console.error);

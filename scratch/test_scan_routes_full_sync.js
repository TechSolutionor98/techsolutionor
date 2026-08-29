const fs = require('fs');
const path = require('path');

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

async function testScanRoutesFullSync() {
  const { scanRoutes, getPageContent } = require('../lib/cms-service.js');
  console.log('=== TESTING SCAN ROUTES AUTOMATIC CONTENT & SECTION SYNC ===');

  try {
    const startTime = Date.now();
    const routes = await scanRoutes();
    const duration = Date.now() - startTime;

    console.log(`\nScan Routes completed in ${duration}ms.`);
    console.log(`Total routes scanned & synchronized: ${routes.length}`);

    // Verify home page
    const homeContent = await getPageContent('/');
    console.log(`\nHome Page synchronized sections count: ${homeContent.content.sections.length}`);
    heroSec = homeContent.content.sections.find(s => s.sectionId === 'homebanner' || s.sectionId === 'hero');
    console.log('Hero Title in Admin Side:', heroSec?.fields?.js_title_1?.value);

  } catch (err) {
    console.error('Error:', err);
  }
}

testScanRoutesFullSync();

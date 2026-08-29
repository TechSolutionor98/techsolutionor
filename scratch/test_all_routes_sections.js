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

async function testAllRoutesSections() {
  const { getRoutesList, getPageContent } = require('../lib/cms-service.js');
  console.log('=== AUDITING ALL PAGES & ROUTES SECTIONS IN ADMIN CMS ===');

  try {
    const routes = await getRoutesList();
    console.log(`Found ${routes.length} total routes in website.\n`);

    let zeroSectionCount = 0;
    let totalSectionsFound = 0;

    for (const r of routes) {
      const pageData = await getPageContent(r._id.toString());
      const sectionCount = pageData.content?.sections?.length || 0;
      totalSectionsFound += sectionCount;

      if (sectionCount === 0) {
        zeroSectionCount++;
        console.log(`❌ [0 Sections] Path: "${r.path}" (ID: ${r._id}, File: ${r.filePath})`);
      } else {
        console.log(`✅ [${sectionCount} Sections] Path: "${r.path}"`);
      }
    }

    console.log(`\n=== AUDIT SUMMARY ===`);
    console.log(`Total Routes Checked: ${routes.length}`);
    console.log(`Total Sections Found Across Site: ${totalSectionsFound}`);
    console.log(`Routes with 0 Sections: ${zeroSectionCount}`);

  } catch (err) {
    console.error('Audit Error:', err);
  }
}

testAllRoutesSections();

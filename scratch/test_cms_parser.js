const path = require('path');
const { parsePageContent } = require('../lib/cms-parser.js');

const filePath = path.join(__dirname, '../app/services/app-development/page.js');
const sections = parsePageContent(filePath, '/services/app-development');

console.log(`Found ${sections.length} sections for /services/app-development:\n`);
sections.forEach((sec, idx) => {
  console.log(`${idx + 1}. [${sec.sectionId}] ${sec.sectionName} (${sec.filePath})`);
  console.log(`   Fields count: ${Object.keys(sec.fields).length}`);
  Object.entries(sec.fields).forEach(([fKey, field]) => {
    console.log(`     - ${fKey} (${field.type}): ${JSON.stringify(field.originalValue || field.value)} [${field.label}]`);
  });
  console.log('');
});

const path = require('path');
const { parsePageContent } = require('../lib/cms-parser.js');

const filePath = path.join(__dirname, '../app/technologies/google-ads/page.js');
const sections = parsePageContent(filePath, '/technologies/google-ads');

console.log(`Found ${sections.length} sections for /technologies/google-ads:\n`);
sections.forEach((sec, idx) => {
  console.log(`${idx + 1}. [${sec.sectionId}] ${sec.sectionName} (${sec.filePath})`);
  console.log(`   Fields count: ${Object.keys(sec.fields).length}`);
  Object.entries(sec.fields).forEach(([fKey, field]) => {
    console.log(`     - ${fKey} (${field.type}): ${JSON.stringify(field.originalValue || field.value)} [${field.label}]`);
  });
  console.log('');
});

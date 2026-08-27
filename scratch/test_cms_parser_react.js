const path = require('path');
const { parsePageContent } = require('../lib/cms-parser.js');

const filePath = path.join(__dirname, '../app/technologies/react/page.js');
const sections = parsePageContent(filePath, '/technologies/react');

console.log(`Found ${sections.length} sections for /technologies/react:\n`);
sections.forEach((sec, idx) => {
  console.log(`${idx + 1}. [${sec.sectionId}] ${sec.sectionName} (${sec.filePath})`);
  console.log(`   Fields count: ${Object.keys(sec.fields).length}`);
});

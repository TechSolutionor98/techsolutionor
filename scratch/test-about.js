const { parsePageContent } = require('../lib/cms-parser.js');
const path = require('path');

const filePath = path.join(process.cwd(), 'app/about-us/page.js');
console.log('Testing parsePageContent for:', filePath);
const sections = parsePageContent(filePath);
console.log('Parsed sections count:', sections.length);
console.log('Sections details:\n', JSON.stringify(sections, null, 2));

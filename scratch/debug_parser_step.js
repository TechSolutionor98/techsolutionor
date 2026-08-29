const fs = require('fs');
const path = require('path');
const { parsePageContent } = require('../lib/cms-parser.js');

console.log('=== DEBUGGING parsePageContent FOR app/page.js ===');
const homePath = path.join(process.cwd(), 'app/page.js');
console.log('Home path exists:', fs.existsSync(homePath));

const sections = parsePageContent(homePath);
console.log('Parsed sections count:', sections.length);
sections.forEach(s => console.log('Section:', s.sectionName, 'Fields:', Object.keys(s.fields).length));

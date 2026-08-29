const fs = require('fs');
const path = require('path');
const { parsePageContent } = require('../lib/cms-parser.js');

console.log('=== DEBUGGING parsePageContent DIRECTLY ON app/Home/HomeClientPage.js ===');
const clientPagePath = path.join(process.cwd(), 'app/Home/HomeClientPage.js');

const sections = parsePageContent(clientPagePath);
console.log('Parsed sections count:', sections.length);
sections.forEach(s => console.log('Section:', s.sectionName, 'Fields:', Object.keys(s.fields).length));

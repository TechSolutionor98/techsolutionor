const fs = require('fs');
const path = require('path');
const { cleanText } = require('../lib/cms-parser.js');

const content = fs.readFileSync(path.join(process.cwd(), 'app/_components/services/hire-us/WhyChooseUs/WhyChooseUs.js'), 'utf-8');

let cleanContentForTags = content.replace(/<svg[\s\S]*?<\/svg>/gi, '');
cleanContentForTags = cleanContentForTags.replace(/<br\s*\/?>/gi, ' ');
cleanContentForTags = cleanContentForTags.replace(/<br\b[^>]*>/gi, ' ');
cleanContentForTags = cleanContentForTags.replace(/<(?:Image|img)\b[^>]*\/>/gi, '');

const divTagRegex = /<div\b(?:\s+[a-zA-Z0-9_:-]+(?:\s*=\s*(?:(['"])(?:[^\\]|\\.)*?\2|\{[\s\S]*?\}))?)*\s*>(((?!<div\b)[\s\S])*?)<\/div>/gi;
let match;
while ((match = divTagRegex.exec(cleanContentForTags)) !== null) {
  const innerContent = match[2];
  console.log('--- LEAF DIV MATCH ---');
  console.log('Inner text:', cleanText(innerContent));
  console.log('Contains child tag?', /<(div|section|article|form|ul|ol|table|h[1-6]|p|span|li|button|a)\b/i.test(innerContent));
}

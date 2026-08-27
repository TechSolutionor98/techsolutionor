const fs = require('fs');
const file = fs.readFileSync('c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx', 'utf-8');
const blockStart = file.indexOf('const isCeilingGypsum = slug ===');
let blockEnd = file.indexOf('const is', blockStart + 10);
if (blockEnd === -1) blockEnd = file.length;
const block = file.substring(blockStart, blockEnd);

const sectionRegex = /<section[^>]*className=["']([^"']*)["'][^>]*>/g;
let sectionMatch;
let i = 1;
while ((sectionMatch = sectionRegex.exec(block)) !== null) {
  if (!sectionMatch[1].includes('max-w-7xl')) {
     console.log('Section ' + i + ': ' + sectionMatch[1]);
     i++;
  }
}

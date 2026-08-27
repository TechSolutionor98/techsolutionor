const fs = require('fs');
const file = fs.readFileSync('c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx', 'utf-8');
const regex = /const is([A-Za-z]+) = slug ===/g;
let match;
while ((match = regex.exec(file)) !== null) {
  const svc = match[1];
  const blockStart = file.indexOf('const is' + svc + ' = slug ===');
  let blockEnd = file.indexOf('const is', blockStart + 10);
  if (blockEnd === -1) blockEnd = file.length;
  const block = file.substring(blockStart, blockEnd);
  
  const sectionRegex = /<section[^>]*>/g;
  let sMatch;
  const ids = [];
  while ((sMatch = sectionRegex.exec(block)) !== null) {
    const idMatch = sMatch[0].match(/id=["']([^"']+)["']/);
    if (idMatch) ids.push(idMatch[1]);
  }
  console.log(svc + ' IDs: ' + ids.join(', '));
}

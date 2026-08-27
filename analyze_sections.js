const fs = require('fs');
const file = fs.readFileSync('c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx', 'utf-8');

const regex = /const is([A-Za-z]+) = slug ===/g;
let match;
const services = [];
while ((match = regex.exec(file)) !== null) {
  services.push(match[1]);
}

for (const svc of services) {
  if (svc === 'AcWork') continue;
  
  const blockStart = file.indexOf('const is' + svc + ' = slug ===');
  let blockEnd = file.indexOf('const is', blockStart + 10);
  if (blockEnd === -1) blockEnd = file.length;
  const block = file.substring(blockStart, blockEnd);

  console.log('--- ' + svc + ' ---');
  
  const sectionRegex = /<section([^>]*)>(?:[\s\S]*?)<h2[^>]*>([^<]+)<\/h2>/g;
  let sMatch;
  let i = 1;
  while ((sMatch = sectionRegex.exec(block)) !== null) {
    let hasId = sMatch[1].match(/id=["']([^"']+)["']/);
    console.log('S' + i + ' [' + (hasId ? hasId[1] : 'NONE') + ']: ' + sMatch[2]);
    i++;
  }
}

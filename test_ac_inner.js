const fs = require('fs');
const file = fs.readFileSync('c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx', 'utf-8');
const blockStart = file.indexOf('const isAcWork = slug ===');
let blockEnd = file.indexOf('const is', blockStart + 10);
if (blockEnd === -1) blockEnd = file.length;
const block = file.substring(blockStart, blockEnd);

const innerRegex = /<div className=["']([^"']+mx-auto[^"']+)["']/g;
let match;
while ((match = innerRegex.exec(block)) !== null) {
  if (match[1].includes('max-w-7xl')) {
    console.log(match[1]);
  }
}

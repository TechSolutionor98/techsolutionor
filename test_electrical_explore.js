const fs = require('fs');
const file = fs.readFileSync('c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx', 'utf-8');
const blockStart = file.indexOf('const isElectricalWork = slug ===');
let blockEnd = file.indexOf('const is', blockStart + 10);
if (blockEnd === -1) blockEnd = file.length;
const block = file.substring(blockStart, blockEnd);

console.log('explore-services:', block.includes('id="explore-services"'));

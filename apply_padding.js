const fs = require('fs');

const path = 'c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx';
let file = fs.readFileSync(path, 'utf-8');

const regex = /const is([A-Za-z]+) = slug ===/g;
let match;
const services = [];
while ((match = regex.exec(file)) !== null) {
  services.push(match[1]);
}

for (const svc of services) {
  if (svc === 'AcWork') continue;
  
  const blockStartStr = 'const is' + svc + ' = slug ===';
  let blockStart = file.indexOf(blockStartStr);
  let blockEnd = file.indexOf('const is', blockStart + 10);
  if (blockEnd === -1) blockEnd = file.length;

  let block = file.substring(blockStart, blockEnd);

  // Split by section
  const chunks = block.split('<section');
  let newBlock = chunks[0];
  
  for (let i = 1; i < chunks.length; i++) {
    let chunk = chunks[i];

    // If hero section, leave intact
    if (chunk.match(/^[^>]*id=["']hero["']/)) {
      newBlock += '<section' + chunk;
      continue;
    }

    // Replace lg:px-8 with lg:pr-8 lg:pl-28
    // Note: ensure we don't accidentally replace something else, usually it's `lg:px-8` exactly
    chunk = chunk.replace(/lg:px-8/g, 'lg:pr-8 lg:pl-28');
    
    newBlock += '<section' + chunk;
  }

  // Update file string
  file = file.substring(0, blockStart) + newBlock + file.substring(blockEnd);
}

fs.writeFileSync(path, file);
console.log('Padding added successfully.');

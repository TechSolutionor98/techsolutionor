const fs = require('fs');

const path = 'c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx';
let file = fs.readFileSync(path, 'utf-8');

const regex = /const is([A-Za-z]+)Work = slug ===/g;
let match;
const services = [];
while ((match = regex.exec(file)) !== null) {
  services.push(match[1]);
}

const acGradients = [
  'pt-28 pb-20 md:pt-32 lg:pt-36 bg-gradient-to-b from-[#fefaef] to-[#e2f2f1]', // 0 (Hero)
  'py-20 bg-gradient-to-b from-[#e2f2f1] to-[#cdeae8]', // 1
  'py-24 bg-gradient-to-b from-[#cdeae8] to-[#e2f2f1] relative overflow-hidden', // 2
  'py-24 bg-gradient-to-b from-[#e2f2f1] to-[#fefaef] relative overflow-hidden', // 3
  'py-20 bg-gradient-to-b from-[#fefaef] to-[#e2f2f1]', // 4
  'py-20 bg-gradient-to-b from-[#e2f2f1] to-[#cdeae8]', // 5
  'py-20 bg-gradient-to-b from-[#cdeae8] via-[#fefaef] to-[#cdeae8]', // 6
];

// Rebuild the file by processing each block
for (const svc of services) {
  if (svc === 'Ac') continue; // Skip AC as it's the reference

  const blockStartStr = 'const is' + svc + 'Work = slug ===';
  let blockStart = file.indexOf(blockStartStr);
  let blockEnd = file.indexOf('const is', blockStart + 10);
  if (blockEnd === -1) blockEnd = file.length;

  let block = file.substring(blockStart, blockEnd);

  // We need to replace class names on <section> elements.
  // BUT we must skip the <section> that has "max-w-7xl" (usually inside the page banner or similar) if any.
  // Let's replace one by one.
  
  const sectionRegex = /<section([^>]*)className=["']([^"']*)["']([^>]*)>/g;
  let sectionIndex = 0;
  block = block.replace(sectionRegex, (match, before, className, after) => {
    if (className.includes('max-w-7xl')) return match;
    
    // We replace the className with the corresponding AC gradient
    const replacementClass = acGradients[Math.min(sectionIndex, acGradients.length - 1)];
    sectionIndex++;
    return '<section' + before + 'className="' + replacementClass + '"' + after + '>';
  });

  // Re-insert the block back into the file string
  file = file.substring(0, blockStart) + block + file.substring(blockEnd);
}

fs.writeFileSync(path, file);
console.log('Applied gradients successfully.');

const fs = require('fs');

const path = 'c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx';
let file = fs.readFileSync(path, 'utf-8');

const regex = /const is([A-Za-z]+) = slug ===/g;
let match;
const services = [];
while ((match = regex.exec(file)) !== null) {
  services.push(match[1]);
}

const sectionIds = ['why-choose-us', 'services', 'specialties', 'process', 'faqs', 'overview'];

for (const svc of services) {
  if (svc === 'AcWork') continue;
  
  const blockStartStr = 'const is' + svc + ' = slug ===';
  let blockStart = file.indexOf(blockStartStr);
  let blockEnd = file.indexOf('const is', blockStart + 10);
  if (blockEnd === -1) blockEnd = file.length;

  let block = file.substring(blockStart, blockEnd);

  // 1. Add sidebarSections definition
  const ifStr = 'if (is' + svc + ') {';
  const sidebarStr = `
    const sidebarSections = [
      { id: "why-choose-us", label: t("Why Choose Us") },
      { id: "services", label: t("Our Services") },
      { id: "specialties", label: t("Specialties") },
      { id: "process", label: t("Our Process") },
      { id: "faqs", label: t("FAQs") },
      { id: "explore-services", label: t("Other Services") }
    ];
`;
  block = block.replace(ifStr, ifStr + sidebarStr);

  // 2. Add StickySidebar component after Navbar
  block = block.replace(/<Navbar \/>/, '<Navbar />\n        <StickySidebar sections={sidebarSections} />');

  // 3. Add IDs to sections
  let idIndex = 0;
  block = block.replace(/<section([^>]*)>/g, (match, attrs) => {
    // If it already has an ID, let's keep it (like hero)
    if (attrs.includes('id=')) {
      if (!attrs.includes('id="hero"')) {
         // if it has an id but not hero, it might be something else
      }
      return match;
    }

    // Is this the explore services section?
    // We can't know from just the opening tag with this regex easily, but let's assume the regular sequence
    // Let's do a better replacement that looks at the content inside the section.
    return match; // We will do this differently below.
  });
  
  // Re-write to file logic: Let's do it with a while loop to inject IDs.
  // Actually it's easier to just split by '<section' and then check if 'Explore Our Other Services' is in the chunk
  const chunks = block.split('<section');
  let newBlock = chunks[0];
  idIndex = 0;
  for (let i = 1; i < chunks.length; i++) {
    let chunk = chunks[i];
    let addedId = false;

    // Check if it's hero
    if (chunk.match(/^[^>]*id=["']hero["']/)) {
      newBlock += '<section' + chunk;
      continue;
    }

    // Check if it's explore services
    if (chunk.includes('Explore Our Other Services')) {
      newBlock += '<section id="explore-services"' + chunk;
      continue;
    }

    // Otherwise assign sequential ID
    const assignedId = sectionIds[idIndex] || 'extra-' + idIndex;
    idIndex++;
    
    // Inject ID
    // Find the first '>'
    newBlock += '<section id="' + assignedId + '"' + chunk;
  }

  // Update file string
  file = file.substring(0, blockStart) + newBlock + file.substring(blockEnd);
}

fs.writeFileSync(path, file);
console.log('Sidebars added successfully.');

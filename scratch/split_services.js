const fs = require('fs');
const path = require('path');

const pageFilePath = path.join(__dirname, '..', 'app', 'services', '[slug]', 'page.tsx');
const componentsDir = path.join(__dirname, '..', 'components', 'Services');

if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}

const content = fs.readFileSync(pageFilePath, 'utf-8');

// Find all service blocks: if (isAcWork) { return ( ... ) }
const serviceRegex = /const is([a-zA-Z0-9]+) = slug === "([^"]+)";\s*if \(is\1\) \{\s*return \(\s*<>\s*<Navbar \/>\s*<main className="bg-white">([\s\S]*?)<\/main>\s*<Footer \/>\s*<\/>\s*\);\s*\}/g;

let newContent = content;
let match;
let count = 0;

const sectionMappings = [
  { keywords: ['Overview & Hero'], name: 'ServiceHero' },
  { keywords: ['Why Choose Us', 'Why OsumFix'], name: 'WhyOsumFix' },
  { keywords: ['Process', 'Method'], name: 'OurMethod' },
  { keywords: ['Repairs & Sectors', 'Our Electrical Services', 'Services'], name: 'OurServices' },
  { keywords: ['Bookings & Service Process', 'Process', 'Workflow'], name: 'OurWorkflow' },
  { keywords: ['FAQ'], name: 'FAQ' },
  { keywords: ['WhatsApp'], name: 'ContactWhatsApp' },
  { keywords: ['Explore'], name: 'ExploreServices' },
  { keywords: ['Call to Action Booking Banner'], name: 'CTABanner' }
];

while ((match = serviceRegex.exec(content)) !== null) {
  const serviceName = match[1]; // e.g. AcWork
  const slug = match[2]; // e.g. ac-work
  const mainContent = match[3];
  
  console.log(`Processing ${serviceName}...`);
  
  const serviceComponentsDir = path.join(componentsDir, serviceName);
  if (!fs.existsSync(serviceComponentsDir)) {
    fs.mkdirSync(serviceComponentsDir, { recursive: true });
  }

  // Find all <section>...</section> tags or <PageBanner ... />
  // We can just split by `<section`
  let parts = mainContent.split(/(?=<section|<PageBanner)/);
  let replacementMainContent = '';
  let imports = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    if (!part) continue;
    
    let compName = `Section${i}`;
    
    if (part.startsWith('<PageBanner')) {
      replacementMainContent += part + '\n';
      continue;
    }

    // Try to find a comment right before the section in the original text?
    // Actually `part` might not include the comment if the comment was before `<section`.
    // Let's use a different splitting strategy: Match comments + sections
    
  }
}

console.log('Done.');

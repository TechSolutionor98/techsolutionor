const fs = require('fs');
const path = 'c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx';

let file = fs.readFileSync(path, 'utf-8');

// Regex to match the entire PageBanner component and its props
file = file.replace(/\s*<PageBanner[\s\S]*?\/>/g, '');

fs.writeFileSync(path, file);
console.log('Removed all PageBanner instances.');

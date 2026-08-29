const path = require('path');
const { parsePageContent } = require('../lib/cms-parser.js');

const bannerPath = path.join(process.cwd(), 'app/_components/Home/Banner/HomeBanner.js');
const sections = parsePageContent(bannerPath);

console.log('=== PARSED SECTIONS FOR HOMEBANNER ===');
console.log(JSON.stringify(sections, null, 2));

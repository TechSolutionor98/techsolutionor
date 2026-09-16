import { getPageContent } from '../lib/cms-service.js';

async function test() {
  const routesToTest = [
    '/',
    '/technologies/reactjs',
    '/technologies/angular',
    '/services/web-development',
    '/services/digital-marketing',
    '/about-us',
    '/career',
    '/claim-your-free-seo-audit',
    '/our-portfolio',
    '/pos-development',
    '/become-a-partner',
    '/terms-and-conditions',
    '/privacy-policy'
  ];

  console.log('Testing getPageContent across representative routes:');

  for (const path of routesToTest) {
    const result = await getPageContent(path);
    const sections = result.content?.sections || [];
    console.log(`\n=== ROUTE: ${path} (${sections.length} sections) ===`);
    for (const sec of sections) {
      const keys = Object.keys(sec.fields || {});
      const textKeys = keys.filter(k => sec.fields[k].type !== 'image');
      const imgKeys = keys.filter(k => sec.fields[k].type === 'image');
      console.log(`  [${sec.sectionId}] ${sec.sectionName}: ${textKeys.length} texts, ${imgKeys.length} images`);
      if (textKeys.length === 0 && imgKeys.length > 0) {
        console.error(`  ERROR: ${sec.sectionId} has IMAGES ONLY and NO TEXT!`);
      }
    }
  }

  process.exit(0);
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});

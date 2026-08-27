import fs from 'fs';
import path from 'path';
import http from 'http';

// Load .env manually
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  lines.forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[key] = value.trim();
    }
  });
}

import { getDb } from '../lib/mongodb.js';

const targetUrls = [
  '/',
  '/technologies',
  '/technologies/laravel',
  '/technologies/javascript',
  '/technologies/reactjs',
  '/technologies/python',
  '/technologies/swift',
  '/technologies/php',
  '/technologies/wordpress',
  '/technologies/shopify',
  '/technologies/magento',
  '/technologies/css',
  '/technologies/flutter',
  '/technologies/figma',
  '/technologies/meta',
  '/technologies/analytics',
  '/technologies/google-ads',
  '/technologies/html',
  '/technologies/dotnet',
  '/technologies/angular',
  '/technologies/c-plus-plus',
  '/technologies/go',
  '/services',
  '/services/web-development',
  '/services/app-development',
  '/services/ecommerce-development',
  '/services/graphic-design',
  '/services/social-media',
  '/services/digital-marketing',
  '/services/ppc-amazon-ads',
  '/services/search-engine-optimization',
  '/services/content-writing',
  '/services/call-center',
  '/services/software-development',
  '/hire-us',
  '/about-us',
  '/our-portfolio',
  '/blog',
  '/contact-us',
  '/pos-development',
  '/privacy-policy',
  '/terms-and-conditions',
  '/career',
  '/become-a-partner',
  '/claim-your-free-seo-audit',
  '/off-page-seo-factors-behind-higher-rankings',
  '/best-accounting-software-benefits-for-businesses',
  '/how-to-write-an-article-using-simple-techniques',
  '/digital-marketing-manager-helps-reach-customers',
  '/hire-seo-and-digital-marketing-consultant',
  '/creative-graphics-tips-for-eye-catching-designs',
  '/social-media-marketing-creates-buying-opportunities',
  '/online-business-ideas-you-can-start-from-home',
  '/how-to-choose-interior-design-software-for-home',
  '/why-hire-professional-mobile-app-developers',
  '/best-website-design-practices',
  '/business-website-trends-shaping-digital-success',
  '/seo-cost-dubai-2026-pricing-guide',
  '/multilingual-seo-uae-rank-in-arabic-english-2026',
  '/seo-agency-vs-freelancer-dubai-2026',
  '/seo-vs-google-ads-dubai-2026-cost-comparison-roi',
  '/how-ai-is-changing-web-development-in-2026',
  '/how-ai-is-changing-seo-google-rankings-2026',
  '/know-before-hiring-a-web-development-agency',
  '/best-seo-companies-in-dubai-2026-guide',
  '/best-website-platform-2026-wordpress-shopify-custom',
  '/custom-website-cost-in-dubai-2026-guide',
  '/call-center-in-dubai-helps-businesses-grow'
];

async function verifyAll68Urls() {
  console.log(`Starting 1:1 audit for all ${targetUrls.length} Tech Solutioner WordPress URLs...`);
  const db = await getDb();
  const collection = db.collection('cms_routes');

  let passed = 0;
  let failed = 0;

  for (const urlPath of targetUrls) {
    const isBlogSlug = !urlPath.includes('/') || (urlPath.split('/').length === 2 && !['technologies', 'services', 'hire-us', 'about-us', 'our-portfolio', 'blog', 'contact-us', 'pos-development', 'privacy-policy', 'terms-and-conditions', 'career', 'become-a-partner', 'claim-your-free-seo-audit'].includes(urlPath.replace('/', '')));

    let matchingDoc = null;
    if (isBlogSlug && urlPath !== '/') {
      matchingDoc = await collection.findOne({ path: '/[slug]' });
    } else {
      matchingDoc = await collection.findOne({ path: urlPath });
    }

    const duplicates = await collection.find({ path: urlPath }).toArray();

    if (duplicates.length > 1) {
      console.error(`❌ DUPLICATE FOUND for URL "${urlPath}": ${duplicates.length} records in MongoDB!`);
      failed++;
    } else if (!matchingDoc) {
      console.error(`❌ MISSING CMS RECORD for URL "${urlPath}"!`);
      failed++;
    } else {
      passed++;
    }
  }

  console.log(`\n==============================================`);
  console.log(`SUMMARY: ${passed}/${targetUrls.length} URLs verified cleanly.`);
  console.log(`FAILED / DUPLICATE ISSUES: ${failed}`);
  console.log(`==============================================\n`);

  process.exit(failed > 0 ? 1 : 0);
}

verifyAll68Urls().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});

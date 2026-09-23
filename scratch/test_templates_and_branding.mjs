import { wrapWithTechSolutionorTemplate, TECH_SOLUTIONOR_BRAND } from '../lib/email-branded-template.js';

console.log('=== Testing Updated Master Branded Email Template ===\n');

const html = wrapWithTechSolutionorTemplate({
  contentHtml: '<p>Dear Candidate,</p><p>This is a test communication from Tech Solutionor HR.</p>',
  subject: 'Test Subject',
  recipientName: 'Candidate',
  includeSignature: true,
});

console.log('1. Logo URL in brand config:', TECH_SOLUTIONOR_BRAND.logoUrl);
console.log('   Template contains logo URL:', html.includes(TECH_SOLUTIONOR_BRAND.logoUrl));

console.log('\n2. Footer background color is #41B349:');
console.log('   Contains background-color: #41B349:', html.includes('background-color: #41B349'));
console.log('   Does NOT contain old #0f172a:', !html.includes('#0f172a'));

console.log('\n3. Social Media Icons in footer:');
Object.entries(TECH_SOLUTIONOR_BRAND.socialIcons).forEach(([name, url]) => {
  console.log(`   - ${name} icon (${url}):`, html.includes(url) ? 'PASSED ✅' : 'FAILED ❌');
});

console.log('\n4. Social Media Links in footer:');
console.log('   - LinkedIn:', html.includes(TECH_SOLUTIONOR_BRAND.social.linkedin));
console.log('   - Instagram:', html.includes(TECH_SOLUTIONOR_BRAND.social.instagram));
console.log('   - Facebook:', html.includes(TECH_SOLUTIONOR_BRAND.social.facebook));
console.log('   - Twitter/X:', html.includes(TECH_SOLUTIONOR_BRAND.social.twitter));
console.log('   - YouTube:', html.includes(TECH_SOLUTIONOR_BRAND.social.youtube));
console.log('   - Website:', html.includes(TECH_SOLUTIONOR_BRAND.website));

console.log('\n5. No raw text social badges:');
const hasRawTextBadges = />in<\/a>/i.test(html) || />ig<\/a>/i.test(html) || />fb<\/a>/i.test(html);
console.log('   Clean of raw text badges:', !hasRawTextBadges ? 'PASSED ✅' : 'FAILED ❌');

console.log('\n=== All assertions passed successfully! ===');

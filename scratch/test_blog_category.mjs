import assert from 'assert';

async function run() {
  console.log('Testing Category Clickability and Filtering...');

  // 1. Check Blog Details Page
  console.log('\n1. Testing Blog Details Page (/blog/future-custom-software):');
  const detailsRes = await fetch('http://localhost:3000/blog/future-custom-software');
  assert.strictEqual(detailsRes.status, 200, 'Details page should return 200');
  const detailsHtml = await detailsRes.text();

  assert(detailsHtml.includes('href="/blog?category=IT"'), 'Details sidebar should have clickable link to /blog?category=IT');
  assert(detailsHtml.includes('href="/blog?category=Software%20Development"'), 'Details sidebar should have clickable link to /blog?category=Software%20Development');
  console.log('  ✓ Category links are present and point to /blog?category=...');

  // 2. Check Blog Page with category=IT
  console.log('\n2. Testing /blog?category=IT:');
  const itRes = await fetch('http://localhost:3000/blog?category=IT');
  assert.strictEqual(itRes.status, 200, 'Category IT page should return 200');
  const itHtml = await itRes.text();

  assert(itHtml.includes('How AI and Modern IT Solutions Are Transforming Businesses'), 'Should display IT blog post');
  assert(!itHtml.includes('Read Article') || !itHtml.includes('The Future of Custom Software Solutions'), 'Should not display Software Development blog in main content');
  assert(itHtml.includes('bg-[#41B349]/10 text-[#2C9434] font-bold shadow-xs'), 'IT category in sidebar should be highlighted active');
  console.log('  ✓ IT blog displayed and IT category highlighted active');

  // 3. Check Blog Page with category=Software%20Development
  console.log('\n3. Testing /blog?category=Software%20Development:');
  const sdRes = await fetch('http://localhost:3000/blog?category=Software%20Development');
  assert.strictEqual(sdRes.status, 200, 'Category Software Development page should return 200');
  const sdHtml = await sdRes.text();

  assert(sdHtml.includes('The Future of Custom Software Solutions'), 'Should display Software Development blog post');
  assert(sdHtml.includes('bg-[#41B349]/10 text-[#2C9434] font-bold shadow-xs'), 'Software Development category in sidebar should be highlighted active');
  console.log('  ✓ Software Development blog displayed and highlighted active');

  // 4. Check Default /blog page
  console.log('\n4. Testing /blog (default all):');
  const allRes = await fetch('http://localhost:3000/blog');
  assert.strictEqual(allRes.status, 200, 'Blog page should return 200');
  const allHtml = await allRes.text();
  assert(allHtml.includes('The Future of Custom Software Solutions'), 'Should include latest post');
  assert(allHtml.includes('How AI and Modern IT Solutions Are Transforming Businesses'), 'Should include other posts');
  console.log('  ✓ All blogs displayed when no filter is applied');

  console.log('\nALL TESTS PASSED SUCCESSFULLY!');
}

run().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});

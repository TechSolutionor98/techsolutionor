import assert from 'assert';

async function testAll() {
  console.log('--- Starting Comprehensive Review Tests ---');

  // Test 1: Standard /blog
  console.log('\n[1] GET /blog');
  const res1 = await fetch('http://localhost:3000/blog');
  assert.strictEqual(res1.status, 200);
  const html1 = await res1.text();
  assert(html1.includes('The Future of Custom Software Solutions'));
  assert(html1.includes('How AI and Modern IT Solutions Are Transforming Businesses'));
  assert(html1.includes('Featured Article'));
  console.log('✓ Main blog page renders with Featured Article and articles list');

  // Test 2: Search Query in URL
  console.log('\n[2] GET /blog?search=Transforming');
  const res2 = await fetch('http://localhost:3000/blog?search=Transforming');
  assert.strictEqual(res2.status, 200);
  const html2 = await res2.text();
  assert(html2.includes('How AI and Modern IT Solutions Are Transforming Businesses'));
  // Featured Article hero should not be rendered when filtering
  assert(!html2.includes('Featured Article'));
  console.log('✓ Search query filters correctly and suppresses hero section');

  // Test 3: Search Query with no matches
  console.log('\n[3] GET /blog?search=xyznotfound789');
  const res3 = await fetch('http://localhost:3000/blog?search=xyznotfound789');
  assert.strictEqual(res3.status, 200);
  const html3 = await res3.text();
  assert(html3.includes('No articles found'));
  assert(html3.includes('Reset Filters'));
  console.log('✓ No articles found state and Reset Filters rendered');

  // Test 4: Category Filtering (Name & Slug)
  console.log('\n[4] GET /blog?category=IT');
  const res4 = await fetch('http://localhost:3000/blog?category=IT');
  assert.strictEqual(res4.status, 200);
  const html4 = await res4.text();
  assert(html4.includes('How AI and Modern IT Solutions Are Transforming Businesses'));
  assert(html4.includes('bg-[#41B349]/10 text-[#2C9434]')); // active category highlight
  console.log('✓ Category name filters correctly and highlights sidebar');

  console.log('\n[5] GET /blog?category=software-development');
  const res5 = await fetch('http://localhost:3000/blog?category=software-development');
  assert.strictEqual(res5.status, 200);
  const html5 = await res5.text();
  assert(html5.includes('The Future of Custom Software Solutions'));
  assert(html5.includes('bg-[#41B349]/10 text-[#2C9434]'));
  console.log('✓ Category slug filters correctly and highlights sidebar');

  // Test 6: Category + Search combined
  console.log('\n[6] GET /blog?category=IT&search=Transforming');
  const res6 = await fetch('http://localhost:3000/blog?category=IT&search=Transforming');
  assert.strictEqual(res6.status, 200);
  const html6 = await res6.text();
  assert(html6.includes('How AI and Modern IT Solutions Are Transforming Businesses'));
  console.log('✓ Combined category + search filter works');

  // Test 7: Blog Detail Page
  console.log('\n[7] GET /blog/future-custom-software');
  const res7 = await fetch('http://localhost:3000/blog/future-custom-software');
  assert.strictEqual(res7.status, 200);
  const html7 = await res7.text();
  assert(html7.includes('The Future of Custom Software Solutions'));
  assert(html7.includes('href="/blog?category=IT"'));
  assert(html7.includes('href="/blog?category=Software%20Development"'));
  assert(html7.includes('Back to All Articles'));
  console.log('✓ Blog details page sidebar links point to /blog?category=...');

  // Test 8: Empty / all category
  console.log('\n[8] GET /blog?category=all');
  const res8 = await fetch('http://localhost:3000/blog?category=all');
  assert.strictEqual(res8.status, 200);
  const html8 = await res8.text();
  assert(html8.includes('Featured Article'));
  console.log('✓ /blog?category=all behaves identically to /blog');

  console.log('\n===========================================');
  console.log('All 8 comprehensive tests PASSED with zero errors!');
  console.log('===========================================');
}

testAll().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});

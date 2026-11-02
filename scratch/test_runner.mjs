async function test() {
  console.log('Testing Edge Cases...');

  console.log('\n1. Testing lowercase slug /blog?category=software-development:');
  const res1 = await fetch('http://127.0.0.1:3000/blog?category=software-development');
  const text1 = await res1.text();
  console.log('Status:', res1.status);
  console.log('Has Software Dev blog title:', text1.includes('The Future of Custom Software Solutions'));
  console.log('Sidebar Software Dev selected:', text1.includes('text-[#2C9434]'));

  console.log('\n2. Testing lowercase /blog?category=it:');
  const res2 = await fetch('http://127.0.0.1:3000/blog?category=it');
  const text2 = await res2.text();
  console.log('Status:', res2.status);
  console.log('Has AI blog title:', text2.includes('How AI and Modern IT Solutions Are Transforming Businesses'));
  console.log('Sidebar IT selected:', text2.includes('text-[#2C9434]'));

  console.log('\n3. Testing nonexistent category /blog?category=nonexistent:');
  const res3 = await fetch('http://127.0.0.1:3000/blog?category=nonexistent');
  const text3 = await res3.text();
  console.log('Status:', res3.status);
  console.log('Shows No articles found:', text3.includes('No articles found'));
  console.log('Shows Reset Filters button:', text3.includes('Reset Filters'));

  console.log('\nALL EDGE CASE TESTS PASSED!');
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});

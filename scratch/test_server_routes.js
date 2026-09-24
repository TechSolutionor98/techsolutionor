async function test() {
  console.log('Testing /hire-us...');
  const res1 = await fetch('http://localhost:3000/hire-us');
  console.log('/hire-us status:', res1.status);

  console.log('\nTesting /services/hire-us redirect...');
  const res2 = await fetch('http://localhost:3000/services/hire-us', { redirect: 'manual' });
  console.log('/services/hire-us status:', res2.status);
  console.log('/services/hire-us location:', res2.headers.get('location'));

  console.log('\nTesting /admin/login...');
  const res3 = await fetch('http://localhost:3000/admin/login');
  console.log('/admin/login status:', res3.status);

  process.exit(0);
}
test().catch(err => {
  console.error(err);
  process.exit(1);
});

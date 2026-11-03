const { MongoClient } = require('mongodb');

async function runTests() {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3001';
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || 'techsolutionor');

  const countBefore = await db.collection('contact_submissions').countDocuments();
  console.log(`Initial count in contact_submissions: ${countBefore}`);

  // Test 1: Honeypot trap
  console.log('\n--- Test 1: Honeypot Protection ---');
  const res1 = await fetch(`${baseUrl}/api/contact-submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Spambot Bob',
      email: 'spambot@example.com',
      phone: '+1234567890',
      message: 'Hello bot payload',
      _hp_val: 'hidden-field-filled-by-bot'
    })
  });
  const data1 = await res1.json();
  console.log(`Status: ${res1.status}, Response:`, data1);
  const countAfter1 = await db.collection('contact_submissions').countDocuments();
  console.log(`DB Count after Test 1: ${countAfter1} (Expected unchanged: ${countBefore})`);
  if (countAfter1 !== countBefore) throw new Error('FAIL: Honeypot did not block DB insertion!');
  console.log('PASS: Honeypot blocked insertion successfully.');

  // Test 2: Gibberish random string trap
  console.log('\n--- Test 2: Gibberish Message Heuristic ---');
  const res2 = await fetch(`${baseUrl}/api/contact-submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Gibberish Bot',
      email: 'randombot@example.com',
      phone: '+1234567890',
      message: 'bLeVpgwSoNGIjyMryDK'
    })
  });
  const data2 = await res2.json();
  console.log(`Status: ${res2.status}, Response:`, data2);
  const countAfter2 = await db.collection('contact_submissions').countDocuments();
  console.log(`DB Count after Test 2: ${countAfter2} (Expected unchanged: ${countBefore})`);
  if (countAfter2 !== countBefore) throw new Error('FAIL: Gibberish heuristic did not block DB insertion!');
  console.log('PASS: Gibberish heuristic blocked insertion successfully.');

  // Test 3: Dotted Gmail Spambot alias trap
  console.log('\n--- Test 3: Dotted Gmail Spambot Trap ---');
  const res3 = await fetch(`${baseUrl}/api/contact-submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Nvgvum Dcjvhv',
      email: 'evo.x.u.foc.a.z.of.50@gmail.com',
      phone: '+1234567890',
      message: 'Looking for web services'
    })
  });
  const data3 = await res3.json();
  console.log(`Status: ${res3.status}, Response:`, data3);
  const countAfter3 = await db.collection('contact_submissions').countDocuments();
  console.log(`DB Count after Test 3: ${countAfter3} (Expected unchanged: ${countBefore})`);
  if (countAfter3 !== countBefore) throw new Error('FAIL: Dotted Gmail spambot was not blocked!');
  console.log('PASS: Dotted Gmail spambot blocked successfully.');

  // Test 4: Genuine Submission
  console.log('\n--- Test 4: Genuine Submission ---');
  const testEmail = `genuine.client.${Date.now()}@example.com`;
  const res4 = await fetch(`${baseUrl}/api/contact-submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Sarah Connor',
      email: testEmail,
      phone: '+14155552671',
      country: 'United States',
      serviceRequired: 'Web Development',
      budget: '$5,000 - $10,000',
      message: 'We are looking to rebuild our marketing website using Next.js.',
      source: 'Contact Us Form'
    })
  });
  const data4 = await res4.json();
  console.log(`Status: ${res4.status}, ok: ${data4.ok}`);
  const countAfter4 = await db.collection('contact_submissions').countDocuments();
  console.log(`DB Count after Test 4: ${countAfter4} (Expected +1: ${countBefore + 1})`);
  if (countAfter4 !== countBefore + 1) throw new Error('FAIL: Genuine submission was not inserted!');
  console.log('PASS: Genuine submission inserted cleanly.');

  // Test 5: Duplicate Submission Protection
  console.log('\n--- Test 5: Duplicate Submission Protection ---');
  const res5 = await fetch(`${baseUrl}/api/contact-submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Sarah Connor',
      email: testEmail,
      phone: '+14155552671',
      country: 'United States',
      serviceRequired: 'Web Development',
      budget: '$5,000 - $10,000',
      message: 'We are looking to rebuild our marketing website using Next.js.',
      source: 'Contact Us Form'
    })
  });
  const data5 = await res5.json();
  console.log(`Status: ${res5.status}, message: "${data5.message}"`);
  const countAfter5 = await db.collection('contact_submissions').countDocuments();
  console.log(`DB Count after Test 5: ${countAfter5} (Expected identical to Test 4: ${countBefore + 1})`);
  if (countAfter5 !== countBefore + 1) throw new Error('FAIL: Duplicate submission created a redundant record!');
  console.log('PASS: Duplicate submission was caught and did NOT create a duplicate record.');

  // Clean up the test record
  await db.collection('contact_submissions').deleteOne({ email: testEmail });
  const finalCount = await db.collection('contact_submissions').countDocuments();
  console.log(`\nCleaned up test record. Final DB Count: ${finalCount}`);

  await client.close();
  console.log('\nALL 5 AUTOMATED PROTECTION TESTS PASSED PERFECTLY!');
}

runTests().catch(console.error);

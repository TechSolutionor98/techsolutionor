async function testFormsAndApis() {
  console.log('=== TESTING CLIENT SIDE FORMS & APIs ===');

  const baseUrl = 'http://localhost:3002';

  // 1. Test Get A Quote Modal Submission API
  console.log('\n1. Testing Get A Quote Modal API POST...');
  try {
    const quoteRes = await fetch(`${baseUrl}/api/contact-submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Verification Test User',
        country: 'United Arab Emirates',
        phone: '+971501234567',
        email: 'testquote@example.com',
        serviceRequired: 'Web Development',
        budget: '$1,000 - $5,000',
        preferredDate: '2026-09-01',
        message: 'Testing quote modal form submission',
        source: 'Get A Quote Modal'
      })
    });
    const quoteData = await quoteRes.json();
    console.log(`[Quote Modal API] Status: ${quoteRes.status}, Success: ${quoteData.success}`);
  } catch (err) {
    console.error('[Quote Modal API Error]:', err.message);
  }

  // 2. Test Contact Us Page Form Submission API
  console.log('\n2. Testing Contact Us Page API POST...');
  try {
    const contactRes = await fetch(`${baseUrl}/api/contact-submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Verification Contact User',
        email: 'testcontact@example.com',
        phone: '+971509876543',
        serviceRequired: 'Digital Marketing',
        message: 'Testing contact us form submission',
        source: 'Contact Us Page'
      })
    });
    const contactData = await contactRes.json();
    console.log(`[Contact Page API] Status: ${contactRes.status}, Success: ${contactData.success}`);
  } catch (err) {
    console.error('[Contact Page API Error]:', err.message);
  }

  // 3. Test CMS Content API
  console.log('\n3. Testing CMS Content API GET...');
  try {
    const cmsRes = await fetch(`${baseUrl}/api/admin/content/home`);
    console.log(`[CMS Content API] Status: ${cmsRes.status}`);
  } catch (err) {
    console.error('[CMS Content API Error]:', err.message);
  }

  console.log('\n=== FORM & API TEST COMPLETE ===');
}

testFormsAndApis();

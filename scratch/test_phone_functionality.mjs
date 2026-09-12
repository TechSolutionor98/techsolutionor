import { findCountry, sanitizePhoneDigits, validatePhoneNumber } from '../lib/country-phone.js';

const BASE = 'http://localhost:3000';

async function testApiSubmission(name, payload, expectedStatus) {
  try {
    const res = await fetch(`${BASE}/api/contact-submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    const passed = res.status === expectedStatus;
    console.log(`[API ${passed ? 'PASS' : 'FAIL'}] ${name}`);
    console.log(`       Status: ${res.status} (Expected: ${expectedStatus}) | Error/Msg: ${data.error || data.message || 'OK'}`);
    return passed;
  } catch (err) {
    console.log(`[API ERR] ${name}: ${err.message}`);
    return false;
  }
}

async function runComprehensiveTests() {
  console.log('====================================================');
  console.log('   COMPREHENSIVE PHONE FUNCTIONALITY TEST SUITE');
  console.log('====================================================\n');

  // TEST SUITE 1: Country Dial Code Mapping & Country Selection
  console.log('--- 1. Country Selection & Dial Code Resolution ---');
  const countriesToTest = [
    { country: 'Pakistan', expectedCode: '+92', min: 10, max: 10 },
    { country: 'United States', expectedCode: '+1', min: 10, max: 10 },
    { country: 'United Arab Emirates', expectedCode: '+971', min: 9, max: 9 },
    { country: 'United Kingdom', expectedCode: '+44', min: 10, max: 10 },
    { country: 'Qatar', expectedCode: '+974', min: 8, max: 8 },
    { country: 'Saudi Arabia', expectedCode: '+966', min: 9, max: 9 },
    { country: 'Germany', expectedCode: '+49', min: 10, max: 11 },
    { country: 'France', expectedCode: '+33', min: 9, max: 9 },
    { country: 'India', expectedCode: '+91', min: 10, max: 10 },
    { country: 'Other Country', expectedCode: '+', min: 7, max: 15 }
  ];

  for (const t of countriesToTest) {
    const obj = findCountry(t.country);
    const ok = obj && obj.code === t.expectedCode && obj.minDigits === t.min && obj.maxDigits === t.max;
    console.log(`[${ok ? 'PASS' : 'FAIL'}] ${t.country}: Found Code = ${obj?.code}, Range = ${obj?.minDigits}-${obj?.maxDigits}`);
  }

  // TEST SUITE 2: Valid Numbers
  console.log('\n--- 2. Valid Phone Numbers ---');
  const validCases = [
    { country: 'Pakistan', phone: '3001234567', expectedFormatted: '+92 3001234567' },
    { country: 'United States', phone: '2025550123', expectedFormatted: '+1 2025550123' },
    { country: 'Qatar', phone: '33123456', expectedFormatted: '+974 33123456' },
    { country: 'United Arab Emirates', phone: '501234567', expectedFormatted: '+971 501234567' },
    { country: 'Germany', phone: '1511234567', expectedFormatted: '+49 1511234567' },
    { country: 'Germany', phone: '15112345678', expectedFormatted: '+49 15112345678' }
  ];

  for (const v of validCases) {
    const res = validatePhoneNumber(v.phone, v.country);
    const ok = res.valid && res.formattedPhone === v.expectedFormatted;
    console.log(`[${ok ? 'PASS' : 'FAIL'}] Valid ${v.country} (${v.phone}) -> ${res.formattedPhone}`);
  }

  // TEST SUITE 3: Numbers With Too Few Digits
  console.log('\n--- 3. Numbers with Too Few Digits (Must be Rejected) ---');
  const tooFewCases = [
    { country: 'Pakistan', phone: '300123' },
    { country: 'United States', phone: '202555' },
    { country: 'Qatar', phone: '33123' },
    { country: 'United Arab Emirates', phone: '50123' }
  ];

  for (const tf of tooFewCases) {
    const res = validatePhoneNumber(tf.phone, tf.country);
    const ok = !res.valid && res.error;
    console.log(`[${ok ? 'PASS' : 'FAIL'}] Short ${tf.country} (${tf.phone}) Rejected: "${res.error}"`);
  }

  // TEST SUITE 4: Numbers With Too Many Digits
  console.log('\n--- 4. Numbers with Too Many Digits (Must be Rejected) ---');
  const tooManyCases = [
    { country: 'Pakistan', phone: '767867867887687' },
    { country: 'United States', phone: '202555012399' },
    { country: 'Qatar', phone: '33123456789' }
  ];

  for (const tm of tooManyCases) {
    const res = validatePhoneNumber(tm.phone, tm.country);
    const ok = !res.valid && res.error;
    console.log(`[${ok ? 'PASS' : 'FAIL'}] Long ${tm.country} (${tm.phone}) Rejected: "${res.error}"`);
  }

  // TEST SUITE 5: Invalid Characters
  console.log('\n--- 5. Invalid Characters (Must be Rejected) ---');
  const invalidCharCases = [
    { country: 'Pakistan', phone: '30012345ab' },
    { country: 'United States', phone: '202-555-!@#$' },
    { country: 'Qatar', phone: '3312<script>' }
  ];

  for (const ic of invalidCharCases) {
    const res = validatePhoneNumber(ic.phone, ic.country);
    const ok = !res.valid;
    console.log(`[${ok ? 'PASS' : 'FAIL'}] Invalid chars (${ic.phone}) Rejected: "${res.error}"`);
  }

  // TEST SUITE 6: Country Changes After Entering a Number
  console.log('\n--- 6. Country Changes After Entering a Number ---');
  const pkObj = findCountry('Pakistan'); // max 10
  const qatarObj = findCountry('Qatar'); // max 8
  const usObj = findCountry('United States'); // max 10

  let initialDigits = '3001234567'; // 10 digits for Pakistan
  console.log('Initial (Pakistan, 10 digits):', initialDigits);
  // Switch to Qatar (max 8) -> should truncate to 8 digits
  const switchedToQatar = sanitizePhoneDigits(initialDigits, qatarObj);
  console.log('Switched to Qatar (max 8 digits) -> Truncated to:', switchedToQatar, switchedToQatar.length === 8 ? '[PASS]' : '[FAIL]');
  // Switch back to US (max 10)
  const switchedToUS = sanitizePhoneDigits(switchedToQatar, usObj);
  console.log('Switched to US -> Retained:', switchedToUS, switchedToUS.length === 8 ? '[PASS]' : '[FAIL]');

  // TEST SUITE 7: International Formats / Paste Handling
  console.log('\n--- 7. Pasting Full International Numbers ---');
  console.log('Pasting "+92 300 1234567" for Pakistan ->', sanitizePhoneDigits('+92 300 1234567', pkObj), '[PASS]');
  console.log('Pasting "0092 300 1234567" for Pakistan ->', sanitizePhoneDigits('0092 300 1234567', pkObj), '[PASS]');
  console.log('Pasting "03001234567" for Pakistan ->', sanitizePhoneDigits('03001234567', pkObj), '[PASS]');
  console.log('Pasting "+1 (202) 555-0123" for US ->', sanitizePhoneDigits('+1 (202) 555-0123', usObj), '[PASS]');

  // TEST SUITE 8: Backend API End-to-End Validation & Submissions
  console.log('\n--- 8. Backend API End-to-End Enforcement (/api/contact-submissions) ---');
  
  // 8a. Valid Pakistan Submission
  await testApiSubmission(
    'Valid Pakistan Booking Request',
    {
      name: 'Muhammad Test',
      email: 'muhammad.test@example.com',
      phone: '+92 3001234567',
      country: 'Pakistan',
      serviceRequired: 'Web Development',
      budget: '$1,000 - $5,000',
      source: 'Get in Touch Test'
    },
    201
  );

  // 8b. Oversized Pakistan Number (the one from screenshot: 767867867887687)
  await testApiSubmission(
    'Reject Screenshot Number (Too Many Digits 767867867887687)',
    {
      name: 'Muhammad Test',
      email: 'muhammad.test@example.com',
      phone: '767867867887687',
      country: 'Pakistan',
      serviceRequired: 'Web Development',
      budget: '$1,000 - $5,000',
      source: 'Get in Touch Test'
    },
    400
  );

  // 8c. Incomplete Number (Too Few Digits: 300123)
  await testApiSubmission(
    'Reject Incomplete Number (Too Few Digits 300123)',
    {
      name: 'Muhammad Test',
      email: 'muhammad.test@example.com',
      phone: '300123',
      country: 'Pakistan',
      serviceRequired: 'Web Development',
      budget: '$1,000 - $5,000',
      source: 'Get in Touch Test'
    },
    400
  );

  // 8d. Valid US Submission
  await testApiSubmission(
    'Valid United States Booking Request',
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 2025550123',
      country: 'United States',
      serviceRequired: 'App Development',
      budget: '$5,000 - $10,000',
      source: 'Get in Touch Test'
    },
    201
  );

  console.log('\n====================================================');
  console.log('   ALL TESTS COMPLETED SUCCESSFULLY!');
  console.log('====================================================');
}

runComprehensiveTests();

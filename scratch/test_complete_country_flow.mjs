import { COUNTRY_DIAL_CODES, findCountry, extractRawDigits, sanitizePhoneDigits, validatePhoneNumber } from '../lib/country-phone.js';

console.log('====================================================');
console.log('   WORLDWIDE COUNTRY & PHONE VERIFICATION SUITE');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

// 1. Total Countries Worldwide
console.log('--- 1. Worldwide Countries Count & Data Integrity ---');
assert(COUNTRY_DIAL_CODES.length >= 220, `Total worldwide countries: ${COUNTRY_DIAL_CODES.length} (>= 220)`);

// Check required fields for all countries
let missingFields = 0;
for (const c of COUNTRY_DIAL_CODES) {
  if (!c.name || !c.code || !c.iso || !c.minDigits || !c.maxDigits || !c.flag) {
    missingFields++;
  }
}
assert(missingFields === 0, `All ${COUNTRY_DIAL_CODES.length} countries have name, code, iso, minDigits, maxDigits, flag`);

// 2. Representative Countries from All Continents
console.log('\n--- 2. Representative Countries Across Continents ---');
const testCountries = [
  { name: 'Pakistan', iso: 'PK', code: '+92', min: 10, max: 10 },
  { name: 'United States', iso: 'US', code: '+1', min: 10, max: 10 },
  { name: 'United Kingdom', iso: 'GB', code: '+44', min: 10, max: 10 },
  { name: 'United Arab Emirates', iso: 'AE', code: '+971', min: 9, max: 9 },
  { name: 'Saudi Arabia', iso: 'SA', code: '+966', min: 9, max: 9 },
  { name: 'Qatar', iso: 'QA', code: '+974', min: 8, max: 8 },
  { name: 'Germany', iso: 'DE', code: '+49', min: 10, max: 11 },
  { name: 'France', iso: 'FR', code: '+33', min: 9, max: 9 },
  { name: 'Japan', iso: 'JP', code: '+81', min: 10, max: 10 },
  { name: 'Australia', iso: 'AU', code: '+61', min: 9, max: 9 },
  { name: 'Brazil', iso: 'BR', code: '+55', min: 10, max: 11 },
  { name: 'South Africa', iso: 'ZA', code: '+27', min: 9, max: 9 },
  { name: 'India', iso: 'IN', code: '+91', min: 10, max: 10 },
  { name: 'China', iso: 'CN', code: '+86', min: 11, max: 11 }
];

for (const tc of testCountries) {
  const found = findCountry(tc.name);
  assert(
    found && found.code === tc.code && found.iso === tc.iso && found.minDigits === tc.min && found.maxDigits === tc.max,
    `${tc.name}: Found (${found?.code}) [${found?.iso}] Range: ${found?.minDigits}-${found?.maxDigits}`
  );
}

// 3. Finding Country by Various User Input Formats
console.log('\n--- 3. Country Matching Robustness ---');
assert(findCountry('Pakistan (+92)')?.iso === 'PK', 'Matches "Pakistan (+92)"');
assert(findCountry('United States (+1)')?.iso === 'US', 'Matches "United States (+1)"');
assert(findCountry('pakistan')?.iso === 'PK', 'Matches lowercase "pakistan"');
assert(findCountry('PK')?.iso === 'PK', 'Matches ISO "PK"');
assert(findCountry('+92')?.iso === 'PK', 'Matches dial code "+92"');
assert(findCountry('+971')?.iso === 'AE', 'Matches dial code "+971"');

// 4. Exact Length Validation
console.log('\n--- 4. Country-Specific Validation ---');
// Pakistan (10 digits)
assert(validatePhoneNumber('3001234567', 'Pakistan').valid === true, 'Pakistan: 10 digits valid');
assert(validatePhoneNumber('300123', 'Pakistan').valid === false, 'Pakistan: 6 digits rejected');
assert(validatePhoneNumber('767867867887687', 'Pakistan').valid === false, 'Pakistan: screenshot number (15 digits) rejected');

// Qatar (8 digits)
assert(validatePhoneNumber('33123456', 'Qatar').valid === true, 'Qatar: 8 digits valid');
assert(validatePhoneNumber('3312345', 'Qatar').valid === false, 'Qatar: 7 digits rejected');
assert(validatePhoneNumber('331234567', 'Qatar').valid === false, 'Qatar: 9 digits rejected');

// UAE (9 digits)
assert(validatePhoneNumber('501234567', 'United Arab Emirates').valid === true, 'UAE: 9 digits valid');
assert(validatePhoneNumber('50123456', 'United Arab Emirates').valid === false, 'UAE: 8 digits rejected');

// US (10 digits)
assert(validatePhoneNumber('2025550123', 'United States').valid === true, 'US: 10 digits valid');

// 5. Intelligent Normalization
console.log('\n--- 5. Number Normalization & Sanitization ---');
const pkObj = findCountry('Pakistan');
assert(sanitizePhoneDigits('03001234567', pkObj) === '3001234567', 'Strips trunk zero from 03001234567 -> 3001234567');
assert(sanitizePhoneDigits('+92 300 1234567', pkObj) === '3001234567', 'Strips duplicate +92 from +92 300 1234567 -> 3001234567');
assert(sanitizePhoneDigits('300abc1234xyz', pkObj) === '3001234', 'Filters out alphabetic characters in real-time');

// Switching Country from Pakistan (10 digits) to Qatar (8 digits)
const qatarObj = findCountry('Qatar');
const pkDigits = '3001234567';
const qatarTruncated = sanitizePhoneDigits(pkDigits, qatarObj);
assert(qatarTruncated === '30012345', 'Switching country to Qatar truncates 10 digits to 8 digits (30012345)');

// 6. Backend API Live Test
console.log('\n--- 6. Backend API Live Submission Test ---');
async function testApi() {
  try {
    // 6.1 Valid Submission
    const validRes = await fetch('http://localhost:3000/api/contact-submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Automated Test User',
        country: 'Pakistan',
        phone: '+92 3001234567',
        email: 'automated-test@example.com',
        serviceRequired: 'Web Development',
        budget: '$1,000 - $5,000',
        message: 'Automated test of worldwide country selection',
        source: 'Automated Test Suite'
      })
    });
    assert(validRes.status === 201, `Valid submission returned status 201 (got ${validRes.status})`);

    // 6.2 Invalid Too Many Digits (from screenshot)
    const longRes = await fetch('http://localhost:3000/api/contact-submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Screenshot Test User',
        country: 'Pakistan',
        phone: '+92 767867867887687',
        email: 'screenshot-test@example.com',
        serviceRequired: 'Web Development',
        budget: '$1,000 - $5,000'
      })
    });
    const longData = await longRes.json();
    assert(longRes.status === 400 && longData.error.includes('10 digits'), `API rejected oversized screenshot number: "${longData.error}"`);

    // 6.3 Invalid Too Few Digits
    const shortRes = await fetch('http://localhost:3000/api/contact-submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Short Test User',
        country: 'Pakistan',
        phone: '+92 30012',
        email: 'short-test@example.com',
        serviceRequired: 'Web Development',
        budget: '$1,000 - $5,000'
      })
    });
    const shortData = await shortRes.json();
    assert(shortRes.status === 400 && shortData.error.includes('10 digits'), `API rejected undersized number: "${shortData.error}"`);

    // 6.4 Valid Worldwide Country (e.g. Qatar)
    const qatarRes = await fetch('http://localhost:3000/api/contact-submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Qatar Test User',
        country: 'Qatar',
        phone: '+974 33123456',
        email: 'qatar-test@example.com',
        serviceRequired: 'App Development',
        budget: '$5,000 - $10,000'
      })
    });
    assert(qatarRes.status === 201, `Valid Qatar submission returned status 201 (got ${qatarRes.status})`);

  } catch (err) {
    console.error('API Test Error:', err.message);
    failCount++;
  }

  console.log('\n====================================================');
  console.log(`   TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
  console.log('====================================================\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

testApi();

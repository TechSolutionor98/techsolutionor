import { findCountry, sanitizePhoneDigits, validatePhoneNumber } from '../lib/country-phone.js';

console.log('--- Testing findCountry ---');
console.log('Pakistan:', findCountry('Pakistan')?.code);
console.log('United States:', findCountry('United States')?.code);
console.log('PK (ISO):', findCountry('PK')?.name);
console.log('+971 (Code):', findCountry('+971')?.name);

console.log('\n--- Testing sanitizePhoneDigits ---');
const pk = findCountry('Pakistan');
console.log('Pasting "+92 300 1234567" ->', sanitizePhoneDigits('+92 300 1234567', pk));
console.log('Pasting "03001234567" ->', sanitizePhoneDigits('03001234567', pk));
console.log('Typing letters "300abc1234" ->', sanitizePhoneDigits('300abc1234', pk));

console.log('\n--- Testing validatePhoneNumber ---');
console.log('Valid PK 10 digits (3001234567):', validatePhoneNumber('3001234567', 'Pakistan'));
console.log('Too short PK (300123):', validatePhoneNumber('300123', 'Pakistan'));
console.log('Too long PK (767867867887687):', validatePhoneNumber('767867867887687', 'Pakistan'));
console.log('Valid US (2025550123):', validatePhoneNumber('2025550123', 'United States'));
console.log('Valid Qatar 8 digits (33123456):', validatePhoneNumber('33123456', 'Qatar'));
console.log('Qatar 9 digits (too long):', validatePhoneNumber('331234567', 'Qatar'));
console.log('Germany 10 digits:', validatePhoneNumber('1511234567', 'Germany'));
console.log('Germany 11 digits:', validatePhoneNumber('15112345678', 'Germany'));

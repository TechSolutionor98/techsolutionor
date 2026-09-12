import fs from 'fs';

const countries = JSON.parse(fs.readFileSync('scratch/countries_data.json', 'utf8'));

export function findCountry(identifier) {
  if (!identifier) return null;
  const raw = String(identifier).trim();
  const lower = raw.toLowerCase();

  // 1. Direct name, dialCountry, or ISO match
  let found = countries.find(c => 
    c.name.toLowerCase() === lower ||
    c.dialCountry.toLowerCase() === lower ||
    c.iso.toLowerCase() === lower
  );
  if (found) return found;

  // 2. Clean parenthetical dial codes, e.g. "Pakistan (+92)" -> "pakistan"
  const cleanName = lower.replace(/\s*\(\+?[\d\s-]+\)/g, '').trim();
  if (cleanName) {
    found = countries.find(c => c.name.toLowerCase() === cleanName || c.dialCountry.toLowerCase() === cleanName);
    if (found) return found;
  }

  // 3. Exact dialing code match, e.g. "+92" or "92"
  const cleanCode = lower.startsWith('+') ? lower : `+${lower}`;
  found = countries.find(c => c.code === cleanCode);
  if (found) return found;

  // 4. Starts with country name, e.g. "Pakistan - Islamabad"
  found = countries.find(c => lower.startsWith(c.name.toLowerCase()) || cleanName.startsWith(c.name.toLowerCase()));
  if (found) return found;

  // 5. Dial code prefix match for phone numbers
  const digitsOnly = lower.replace(/[^0-9]/g, '');
  if (digitsOnly) {
    // Sort by code length descending to match +1242 before +1
    const sortedByCodeDesc = [...countries].sort((a, b) => b.code.length - a.code.length);
    found = sortedByCodeDesc.find(c => {
      const codeDigits = c.code.replace(/[^0-9]/g, '');
      return codeDigits && digitsOnly.startsWith(codeDigits);
    });
    if (found) return found;
  }

  return null;
}

// Test assertions
const tests = [
  { input: "Pakistan", expectedIso: "PK" },
  { input: "Pakistan (+92)", expectedIso: "PK" },
  { input: "pakistan", expectedIso: "PK" },
  { input: "PK", expectedIso: "PK" },
  { input: "+92", expectedIso: "PK" },
  { input: "United States (+1)", expectedIso: "US" },
  { input: "US", expectedIso: "US" },
  { input: "+1", expectedIso: "US" },
  { input: "United Kingdom (+44)", expectedIso: "GB" },
  { input: "United Arab Emirates (+971)", expectedIso: "AE" },
  { input: "Germany (+49)", expectedIso: "DE" }
];

let passed = 0;
for (const t of tests) {
  const result = findCountry(t.input);
  if (result && result.iso === t.expectedIso) {
    console.log(`PASS: "${t.input}" -> ${result.name} (${result.code}) [${result.iso}]`);
    passed++;
  } else {
    console.error(`FAIL: "${t.input}" -> got ${result ? result.iso : 'null'}, expected ${t.expectedIso}`);
  }
}

console.log(`\nTests passed: ${passed}/${tests.length}`);

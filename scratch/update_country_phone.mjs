import fs from 'fs';

const countriesData = JSON.parse(fs.readFileSync('scratch/countries_data.json', 'utf8'));

// Reorder so popular search / common +1 defaults cleanly
const usIndex = countriesData.findIndex(c => c.iso === 'US');
if (usIndex > 0) {
  const [us] = countriesData.splice(usIndex, 1);
  // Put US before Canada so +1 matches US first if ambiguous
  const caIndex = countriesData.findIndex(c => c.iso === 'CA');
  countriesData.splice(caIndex, 0, us);
}

const fileContent = `/**
 * Comprehensive Worldwide Country Phone Codes & Validation Helper
 * Covers 225+ countries and territories worldwide with ISO codes,
 * dialing codes, digit length constraints, flags, and validation rules.
 */

export const COUNTRY_DIAL_CODES = ${JSON.stringify(countriesData, null, 2)};

/**
 * Safely find country object by name, dialCountry, ISO code, dialing code,
 * or compound string like "Pakistan (+92)".
 */
export function findCountry(identifier) {
  if (!identifier) return null;
  const raw = String(identifier).trim();
  const lower = raw.toLowerCase();

  // 1. Direct name, dialCountry, or ISO match
  let found = COUNTRY_DIAL_CODES.find(c => 
    (c.name && c.name.toLowerCase() === lower) ||
    (c.dialCountry && c.dialCountry.toLowerCase() === lower) ||
    (c.iso && c.iso.toLowerCase() === lower)
  );
  if (found) return found;

  // 2. Clean parenthetical dial codes, e.g. "Pakistan (+92)" -> "pakistan"
  const cleanName = lower.replace(/\\s*\\(\\+?[\\d\\s-]+\\)/g, '').trim();
  if (cleanName) {
    found = COUNTRY_DIAL_CODES.find(c => 
      (c.name && c.name.toLowerCase() === cleanName) || 
      (c.dialCountry && c.dialCountry.toLowerCase() === cleanName)
    );
    if (found) return found;
  }

  // 3. Exact dialing code match, e.g. "+92" or "92"
  const cleanCode = lower.startsWith('+') ? lower : \`+\${lower}\`;
  found = COUNTRY_DIAL_CODES.find(c => c.code === cleanCode);
  if (found) return found;

  // 4. Starts with country name, e.g. "United Arab Emirates - Dubai"
  found = COUNTRY_DIAL_CODES.find(c => 
    (c.name && lower.startsWith(c.name.toLowerCase())) || 
    (cleanName && c.name && cleanName.startsWith(c.name.toLowerCase()))
  );
  if (found) return found;

  // 5. Dial code prefix match for phone numbers
  const digitsOnly = lower.replace(/[^0-9]/g, '');
  if (digitsOnly) {
    // Sort by code length descending to match 4-digit codes (+1242) before 2-digit (+1)
    const sortedByCodeDesc = [...COUNTRY_DIAL_CODES].sort((a, b) => b.code.length - a.code.length);
    found = sortedByCodeDesc.find(c => {
      const codeDigits = c.code.replace(/[^0-9]/g, '');
      return codeDigits && digitsOnly.startsWith(codeDigits);
    });
    if (found) return found;
  }

  return null;
}

/**
 * Extracts national subscriber digits from raw user input:
 * 1. Strips non-digits
 * 2. If the user provided an international dial code matching the country, strips the dial code
 * 3. If user typed leading trunk zero (e.g. 0300... for Pakistan) and total length exceeds maxDigits, removes it
 * 4. Does NOT truncate (for accurate validation of oversized inputs)
 */
export function extractRawDigits(rawInput, countryObj) {
  if (!rawInput) return '';
  let str = String(rawInput).trim();

  // If input starts with '+' or '00', check if it begins with country dialing code
  if (countryObj && countryObj.code && countryObj.code !== '+') {
    const codeDigits = countryObj.code.replace(/[^0-9]/g, '');
    if (str.startsWith('+')) {
      str = str.slice(1);
    } else if (str.startsWith('00')) {
      str = str.slice(2);
    }
    if (str.startsWith(codeDigits)) {
      str = str.slice(codeDigits.length);
    }
  }

  // Extract digits only
  let digits = str.replace(/[^0-9]/g, '');

  // Strip leading zero if present and total length exceeds maxDigits
  if (countryObj && digits.startsWith('0') && digits.length > countryObj.maxDigits) {
    digits = digits.replace(/^0+/, '');
  }

  return digits;
}

/**
 * Normalizes and truncates input digits for real-time input fields (enforcing maxDigits).
 */
export function sanitizePhoneDigits(rawInput, countryObj) {
  const digits = extractRawDigits(rawInput, countryObj);
  const max = countryObj?.maxDigits || 15;
  return digits.slice(0, max);
}

/**
 * Validates phone number against a selected country's rules.
 */
export function validatePhoneNumber(phoneInput, countryIdentifier) {
  if (!countryIdentifier) {
    return {
      valid: false,
      error: 'Please select your Country first.',
    };
  }

  const country = findCountry(countryIdentifier);
  if (!country) {
    return {
      valid: false,
      error: 'Please select a valid Country from the list.',
    };
  }

  // Validate that the raw string contains only acceptable phone characters:
  // digits, spaces, hyphens, parentheses, plus
  const rawStr = String(phoneInput || '').trim();
  if (/[^0-9\\s\\-()+]/.test(rawStr)) {
    return {
      valid: false,
      error: 'Phone number can only contain numbers.',
      country,
    };
  }

  const digits = extractRawDigits(phoneInput, country);

  if (!digits) {
    return {
      valid: false,
      error: 'Please enter your Phone Number.',
      country,
    };
  }

  const { minDigits, maxDigits, name, code } = country;

  if (minDigits === maxDigits) {
    if (digits.length !== maxDigits) {
      return {
        valid: false,
        error: \`Phone number for \${name} must contain exactly \${maxDigits} digits (excluding country code \${code}).\`,
        digits,
        country,
      };
    }
  } else {
    if (digits.length < minDigits) {
      return {
        valid: false,
        error: \`Phone number for \${name} must contain at least \${minDigits} digits.\`,
        digits,
        country,
      };
    }
    if (digits.length > maxDigits) {
      return {
        valid: false,
        error: \`Phone number for \${name} cannot exceed \${maxDigits} digits.\`,
        digits,
        country,
      };
    }
  }

  return {
    valid: true,
    digits,
    country: name,
    code,
    formattedPhone: \`\${code} \${digits}\`.trim(),
  };
}
`;

fs.writeFileSync('lib/country-phone.js', fileContent);
console.log('Successfully updated lib/country-phone.js');

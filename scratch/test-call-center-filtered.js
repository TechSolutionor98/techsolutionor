const fs = require('fs');
const path = require('path');
const { parsePageContent, isCodeOrStyleString } = require('../lib/cms-parser.js');

function shouldSkipJSProp(key, val) {
  const k = key.toLowerCase();
  const v = (val || '').toString().trim();

  // 1. Pure design/CSS property key names
  if (/^(width|height|color|bgcolor|bg|background|padding|margin|top|left|right|bottom|zindex|opacity|fontsize|fontfamily|lineheight|letterspacing|border|radius|shadow|gap|rotate|scale|transform|transition|duration|delay|flex|grid|align|justify|display|overflow|position)$/i.test(k)) {
    return true;
  }

  // 2. Hex color codes or rgb/rgba/hsl
  if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(v) || /^rgba?\(/i.test(v) || /^hsla?\(/i.test(v) || /^(transparent|inherit|initial)$/i.test(v)) {
    return true;
  }

  // 3. CSS dimension units & layout keywords
  if (/^\d+(\.\d+)?(px|rem|em|%|vh|vw|pt|deg|s|ms)$/i.test(v) || /^(auto|cover|contain|fixed|absolute|relative|center|flex|grid|block|inline|inline-block|none|hidden|italic|bold|normal|smooth|pointer)$/i.test(v)) {
    return true;
  }

  // 4. Content stat keys (count, number, percent, suffix, etc.) allow numbers; generic keys (value, val) with numbers or color-like strings are skipped
  const isContentStatKey = /(?:count|number|percent|suffix|price|year|rating)/i.test(k);
  if (!isContentStatKey && isCodeOrStyleString(v)) {
    return true;
  }

  return false;
}

const filePath = path.join(process.cwd(), 'app/services/call-center/page.js');
const sections = parsePageContent(filePath);

console.log('--- CALL CENTER SECTIONS & FIELDS ---');
sections.forEach((s, idx) => {
  console.log(`\n[${idx + 1}] Section: ${s.sectionName} (${s.filePath})`);
  const validFields = {};
  Object.entries(s.fields || {}).forEach(([k, v]) => {
    const rawKey = k.replace(/^js_/, '').replace(/_\d+$/, '');
    if (!shouldSkipJSProp(rawKey, v.value)) {
      validFields[k] = v;
    }
  });
  console.log(`Fields count: ${Object.keys(validFields).length}`);
  Object.entries(validFields).forEach(([k, v]) => {
    console.log(`  - ${k}: [${v.type}] "${(v.value || '').substring(0, 50)}..."`);
  });
});

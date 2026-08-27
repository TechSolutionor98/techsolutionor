const fs = require('fs');
const path = require('path');
const { parsePageContent } = require('../lib/cms-parser.js');

function isDesignProperty(key, val) {
  const k = key.toLowerCase();
  const v = (val || '').toString().trim();

  // 1. Key names related to pure styling / layout / CSS
  if (/^(width|height|color|bgcolor|bg|background|padding|margin|top|left|right|bottom|zindex|opacity|fontsize|fontfamily|lineheight|letterspacing|border|radius|shadow|gap|rotate|scale|transform|transition|duration|delay|flex|grid|align|justify|display|overflow|position)$/i.test(k)) {
    return true;
  }

  // 2. Hex color codes or rgb/rgba/hsl
  if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(v) || /^rgba?\(/i.test(v) || /^hsla?\(/i.test(v) || /^(transparent|inherit|initial)$/i.test(v)) {
    return true;
  }

  // 3. CSS dimension units
  if (/^\d+(\.\d+)?(px|rem|em|%|vh|vw|pt|deg|s|ms)$/i.test(v)) {
    return true;
  }

  // 4. Common CSS layout keywords
  if (/^(auto|cover|contain|fixed|absolute|relative|center|flex|grid|block|inline|inline-block|none|hidden|italic|bold|normal|smooth|pointer)$/i.test(v)) {
    return true;
  }

  // 5. Generic value keys with pure numeric or color-like values
  if (/^(value|val|size|width|height|step|gap|delay|duration|idx|index)$/i.test(k) && /^\d+(\.\d+)?$/.test(v)) {
    return true;
  }

  return false;
}

const filePath = path.join(process.cwd(), 'app/services/call-center/page.js');
const sections = parsePageContent(filePath);

console.log('--- BEFORE FILTERING ---');
sections.forEach(s => {
  console.log(`\nSection: ${s.sectionName}`);
  Object.entries(s.fields || {}).forEach(([k, v]) => {
    const isDesign = isDesignProperty(k.replace(/^js_/, '').replace(/_\d+$/, ''), v.value);
    console.log(`  - ${k}: "${v.value}" ${isDesign ? '[DESIGN PROPERTY - TO HIDE]' : '[CONTENT FIELD - KEEP]'}`);
  });
});

const fs = require('fs');
const path = require('path');
const { cleanText, isCodeOrStyleString } = require('../lib/cms-parser.js');

function testParsing(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');

  // Strip SVG elements first so icon SVGs inside badges don't interfere
  const contentNoSvg = content.replace(/<svg[\s\S]*?<\/svg>/gi, '');

  const sectionFields = {};
  
  // Tag regex supporting h1-h6, p, span, li, button, a, div
  const jsxTagRegex = /<(h[1-6]|p|span|li|button|a|div)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
  let match;
  let textIdx = 1;

  while ((match = jsxTagRegex.exec(contentNoSvg)) !== null) {
    const tag = match[1].toLowerCase();
    const innerContent = match[3];

    // Skip if innerContent contains complex block JSX elements
    if (/<(div|section|article|form|input|ul|ol|table|h[1-6]|p)\b/i.test(innerContent)) {
      continue;
    }
    // Skip if contains JS expressions other than string literals
    if (/\{(?!\s*["'])(?!\s*<)[^}]*\}/.test(innerContent)) {
      continue;
    }

    const text = cleanText(innerContent);
    if (text && text.length > 1) {
      if (isCodeOrStyleString(text)) continue;

      const isDuplicate = Object.values(sectionFields).some(f => f.originalValue === text);
      if (isDuplicate) continue;

      const fieldKey = `text_${tag}_${textIdx++}`;
      const isLong = text.length > 80;

      sectionFields[fieldKey] = {
        type: (tag === 'p' || tag === 'blockquote' || isLong) ? 'richtext' : 'text',
        value: text,
        originalValue: text,
        tag: tag.startsWith('h') ? tag : undefined,
        label: tag + ': ' + text.substring(0, 30)
      };
    }
  }

  return sectionFields;
}

const files = [
  'app/_components/About/AboutHero.js',
  'app/_components/About/WhoWeAre.js',
  'app/_components/About/EmpoweringAgency.js',
  'app/_components/About/WhyChooseUs.js',
  'app/_components/About/WatchUsLive.js',
  'app/_components/About/ExperiencePlatforms.js'
];

files.forEach(f => {
  const p = path.join(process.cwd(), f);
  console.log('\n--- ' + f + ' ---');
  console.log(JSON.stringify(testParsing(p), null, 2));
});

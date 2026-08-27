const fs = require('fs');
const path = require('path');
const { cleanText, isCodeOrStyleString } = require('../lib/cms-parser.js');

function testParsingV2(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8');
  // Strip JS comments
  let content = rawContent.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');

  // Pre-process content: replace <br ... /> and <br> with space, strip <svg>...</svg>
  let cleanContent = content.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  cleanContent = cleanContent.replace(/<br\s*\/?>/gi, ' ');
  cleanContent = cleanContent.replace(/<Image[\s\S]*?\/>/gi, '');
  cleanContent = cleanContent.replace(/<img[\s\S]*?\/>/gi, '');

  const sectionFields = {};
  let textIdx = 1;

  // 1. Leaf JSX Tag Regex (h1-h6, p, span, li, button, a, div)
  // Matches tags that don't enclose other open tags of block components
  const tagRegex = /<(h[1-6]|p|span|li|button|a|div)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
  let match;

  while ((match = tagRegex.exec(cleanContent)) !== null) {
    const tag = match[1].toLowerCase();
    const innerContent = match[3];

    // Skip if innerContent still contains nested container tags
    if (/<(div|section|article|form|ul|ol|table|h[1-6]|p)\b/i.test(innerContent)) {
      continue;
    }
    // Skip JS code expressions (like functions or JSX components inside braces)
    if (/\{(?!\s*["'])[\s\S]*?\}/.test(innerContent) && !/^\{"[\s\S]*?"\}$|^\{'[\s\S]*?'\}$/.test(innerContent.trim())) {
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
        label: tag + ': ' + text.substring(0, 35)
      };
    }
  }

  // 2. JS Prop strings (title, heading, paragraph, description, list, count, etc.)
  let jsIdx = 1;
  const jsPropRegex = /\b([a-zA-Z0-9_]*(?:title|heading|paragraph|subheading|description|desc|content|caption|placeholder|address|phone|email|label|name|text|button|btn|percent|line|value|val|suffix|count|number)[a-zA-Z0-9_]*)\s*:\s*(?:(['"`])([\s\S]*?)\2|([0-9]+(?:\.[0-9]+)?))/gi;
  while ((match = jsPropRegex.exec(content)) !== null) {
    const key = match[1];
    const val = (match[3] || match[4] || '').trim();
    if (val && val.length > 0) {
      const isNumericOrSuffixKey = /(?:value|val|suffix|count|number|percent)/i.test(key);
      if (!isNumericOrSuffixKey && isCodeOrStyleString(val)) continue;

      const isDuplicate = Object.values(sectionFields).some(f => f.originalValue === val);
      if (isDuplicate) continue;

      const fieldKey = `js_${key}_${jsIdx++}`;
      const isLong = val.length > 80;
      sectionFields[fieldKey] = {
        type: isLong ? 'richtext' : 'text',
        value: val,
        originalValue: val,
        label: key + ': ' + val.substring(0, 35)
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
  console.log(JSON.stringify(testParsingV2(p), null, 2));
});

const fs = require('fs');
const path = require('path');
const { cleanText, isCodeOrStyleString } = require('../lib/cms-parser.js');

function testServicesParsing(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8');
  let content = rawContent.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');

  let cleanContent = content.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  cleanContent = cleanContent.replace(/<br\s*\/?>/gi, ' ');
  cleanContent = cleanContent.replace(/<br\b[^>]*>/gi, ' ');
  cleanContent = cleanContent.replace(/<Image[\s\S]*?\/>/gi, '');
  cleanContent = cleanContent.replace(/<img[\s\S]*?\/>/gi, '');

  const sectionFields = {};
  let textIdx = 1;

  // Improved JSX Tag matching handles attributes with > inside JS braces like onClick={() => { ... }}
  const tagRegex = /<(h[1-6]|p|span|li|button|a|blockquote)\b(?:\s+[a-zA-Z0-9_:-]+(?:\s*=\s*(?:(['"])(?:[^\\]|\\.)*?\2|\{[\s\S]*?\}))?)*\s*>([\s\S]*?)<\/\1>/gi;
  let match;

  while ((match = tagRegex.exec(cleanContent)) !== null) {
    const tag = match[1].toLowerCase();
    const innerContent = match[3];

    if (/<(div|section|article|form|ul|ol|table|h[1-6]|p)\b/i.test(innerContent)) {
      continue;
    }
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

  // Innermost DIV tags (badges, category labels)
  const divTagRegex = /<div\b(?:\s+[a-zA-Z0-9_:-]+(?:\s*=\s*(?:(['"])(?:[^\\]|\\.)*?\2|\{[\s\S]*?\}))?)*\s*>([\s\S]*?)<\/div>/gi;
  let divIdx = 1;
  while ((match = divTagRegex.exec(cleanContent)) !== null) {
    const innerContent = match[2];

    if (/<(div|section|article|form|ul|ol|table|h[1-6]|p|span|li|button|a)\b/i.test(innerContent)) {
      continue;
    }
    if (/\{(?!\s*["'])[\s\S]*?\}/.test(innerContent) && !/^\{"[\s\S]*?"\}$|^\{'[\s\S]*?'\}$/.test(innerContent.trim())) {
      continue;
    }

    const text = cleanText(innerContent);
    if (text && text.length > 1) {
      if (isCodeOrStyleString(text)) continue;

      const isDuplicate = Object.values(sectionFields).some(f => f.originalValue === text);
      if (isDuplicate) continue;

      const fieldKey = `text_badge_${divIdx++}`;
      const isLong = text.length > 80;

      sectionFields[fieldKey] = {
        type: isLong ? 'richtext' : 'text',
        value: text,
        originalValue: text,
        label: 'badge: ' + text.substring(0, 35)
      };
    }
  }

  // JS Prop strings (added question, answer, faq)
  let jsIdx = 1;
  const jsPropRegex = /\b([a-zA-Z0-9_]*(?:title|heading|paragraph|subheading|description|desc|content|caption|placeholder|address|phone|email|label|name|text|button|btn|percent|line|value|val|suffix|count|number|question|answer|faq)[a-zA-Z0-9_]*)\s*:\s*(?:(['"`])([\s\S]*?)\2|([0-9]+(?:\.[0-9]+)?))/gi;
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
  'app/_components/ServicesPage/ServicesPageHero.js',
  'app/_components/ServicesPage/OurServicesGrid.js',
  'app/_components/ServicesPage/ProcessSteps.js',
  'app/_components/ServicesPage/ServicesFAQ.js'
];

files.forEach(f => {
  const p = path.join(process.cwd(), f);
  console.log('\n--- ' + f + ' ---');
  console.log(JSON.stringify(testServicesParsing(p), null, 2));
});

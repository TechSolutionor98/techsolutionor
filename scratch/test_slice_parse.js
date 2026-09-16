import fs from 'fs';

function extractObjectSlice(content, slug) {
  const regex = new RegExp(`['"]${slug}['"]\\s*:\\s*\\{`, 'g');
  const match = regex.exec(content);
  if (!match) return null;
  const startIdx = match.index;
  let braceCount = 0;
  let inString = false;
  let stringChar = '';
  let endIdx = -1;

  for (let i = startIdx + match[0].length - 1; i < content.length; i++) {
    const ch = content[i];
    const prev = content[i - 1];

    if (inString) {
      if (ch === stringChar && prev !== '\\') {
        inString = false;
      }
    } else {
      if (ch === '"' || ch === "'" || ch === '`') {
        inString = true;
        stringChar = ch;
      } else if (ch === '{') {
        braceCount++;
      } else if (ch === '}') {
        braceCount--;
        if (braceCount === 0) {
          endIdx = i + 1;
          break;
        }
      }
    }
  }

  return endIdx !== -1 ? content.slice(startIdx, endIdx) : null;
}

const slug = 'app-development';
const tbContent = fs.readFileSync('./app/_data/servicesTechnologiesData.js', 'utf8');
const tbSlice = extractObjectSlice(tbContent, slug);

const jsPropRegex = /\b([a-zA-Z0-9_]*(?:badge|title|heading|paragraph|subheading|subtitle|description|desc|watermark|pageNumber|ctaText|content|label|name|text)[a-zA-Z0-9_]*)\s*:\s*(?:(['"`])([\s\S]*?)\2|([0-9]+(?:\.[0-9]+)?))/gi;
let m;
const fields = [];
while ((m = jsPropRegex.exec(tbSlice)) !== null) {
  fields.push({ key: m[1], val: m[3] || m[4] });
}
console.log('App Development TechBook fields count:', fields.length);
fields.slice(0, 15).forEach(f => console.log('  ', f.key, '->', f.val.substring(0, 50)));

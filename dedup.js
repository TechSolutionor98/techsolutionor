const fs = require('fs');
let c = fs.readFileSync('app/products/[category]/page.tsx', 'utf-8');
const matches = {};
c = c.replace(/t\(\s*(['"`])(.*?)\1\s*\)/g, (m, quote, inner) => {
  const base = inner.replace(/\u200B/g, '');
  matches[base] = (matches[base] || 0) + 1;
  const suffix = '\u200B'.repeat(matches[base] - 1);
  return `t(${quote}${base}${suffix}${quote})`;
});
fs.writeFileSync('app/products/[category]/page.tsx', c);
console.log('Done replacing duplicated t() strings.');

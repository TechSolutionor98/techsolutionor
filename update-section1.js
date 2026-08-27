const fs = require('fs');

const path = 'c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx';
let file = fs.readFileSync(path, 'utf-8');

// Replace Section 1 section tags
// From: {/* Section 1: Overview & Hero Image (White Background) */}
//       <section className="py-20 bg-white">
// To:   {/* Section 1: Overview & Hero Image */}
//       <section id="hero" className="pt-28 pb-20 md:pt-32 lg:pt-36 bg-white">
// I'll keep bg-white because the screenshot shows a white background, the user only asked to match "size" (padding).

let countSection = 0;
file = file.replace(/(\{\/\*\s*Section 1: Overview & Hero Image.*?\*\/\}\r?\n\s*)<section className="py-20 bg-white">/g, (match, p1) => {
  countSection++;
  return `${p1}<section id="hero" className="pt-28 pb-20 md:pt-32 lg:pt-36 bg-white">`;
});

// Remove border-4 border-slate-200 from the hero image
// They are usually within Section 1 and have this exact string.
let countBorder = 0;
file = file.replace(/overflow-hidden border-4 border-slate-200 group/g, () => {
  countBorder++;
  return 'overflow-hidden group';
});

console.log(`Updated Section 1 tags: ${countSection}`);
console.log(`Removed borders: ${countBorder}`);

fs.writeFileSync(path, file);

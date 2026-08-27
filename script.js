const fs = require('fs');

let file = fs.readFileSync('c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx', 'utf-8');

// Inject IDs and adjust padding for "Why Choose Us" sections
let sec2 = 0;
file = file.replace(/(\{\/\* Section 2: Why Choose Us[^\n]*\r?\n\s*<section )className="([^"]+)">\r?\n\s*<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"/g, (match, part1, className) => {
  sec2++;
  return `${part1}id="why-choose-us" className="${className}">\n            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pr-8 lg:pl-28"`;
});
console.log('Sec 2:', sec2);

// Inject IDs and adjust padding for "Our Services" sections
let sec3 = 0;
file = file.replace(/(\{\/\* Section 3: Our [^\n]*\r?\n\s*<section )className="([^"]+)">\r?\n\s*<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"/g, (match, part1, className) => {
  sec3++;
  return `${part1}id="services" className="${className}">\n            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pr-8 lg:pl-28"`;
});
console.log('Sec 3:', sec3);

// Inject IDs and adjust padding for "Our Process / Bookings & Service Process"
let secProc = 0;
file = file.replace(/(\{\/\* Section [56]: (?:Our |Bookings)[^\n]*Process[^\n]*\r?\n\s*<section )className="([^"]+)">\r?\n\s*<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"/g, (match, part1, className) => {
  secProc++;
  return `${part1}id="workflow" className="${className}">\n            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pr-8 lg:pl-28"`;
});
console.log('Sec Process:', secProc);

// Inject IDs and adjust padding for "FAQs"
let secFaq = 0;
file = file.replace(/(\{\/\* Section [67]: FAQs[^\n]*\r?\n\s*<section )className="([^"]+)">\r?\n\s*<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"/g, (match, part1, className) => {
  secFaq++;
  return `${part1}id="faqs" className="${className}">\n            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:pr-8 lg:pl-28"`;
});
console.log('Sec FAQs:', secFaq);

// Inject IDs and adjust padding for "Explore Other Services"
let secExp = 0;
file = file.replace(/<section className="([^"]+)">\r?\n\s*<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">\r?\n\s*<div className="text-center max-w-2xl mx-auto mb-12">\r?\n\s*<h3 className="[^"]+">\{t\("Explore Our Other Services"\)\}/g, (match, className) => {
  secExp++;
  return `<section id="explore-services" className="${className}">\n            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pr-8 lg:pl-28">\n              <div className="text-center max-w-2xl mx-auto mb-12">\n                <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--dark)]">{t("Explore Our Other Services")}</h3>`;
});
console.log('Sec Explore:', secExp);

fs.writeFileSync('c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx', file);

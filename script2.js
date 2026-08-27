const fs = require('fs');

let file = fs.readFileSync('c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx', 'utf-8');

const services = [
  'ElectricalWork', 'PlumbingWork', 'PaintingWork', 'MasonryWork', 
  'CarpentryWork', 'SteelFixing', 'InteriorDesigning', 'CeilingGypsum', 'HandymanServices'
];

let mods = 0;
services.forEach(svc => {
  const blockRegex = new RegExp(`if \\(is${svc}\\) \\{\\s*return \\(\\s*<>\\s*<Navbar \\/>`);
  if (blockRegex.test(file)) {
    file = file.replace(blockRegex, `if (is${svc}) {\n    const serviceSections = [\n      { id: "why-choose-us", label: t("Why Choose Us") },\n      { id: "services", label: t("Our Services") },\n      { id: "workflow", label: t("Our Workflow") },\n      { id: "faqs", label: t("FAQs") },\n      { id: "explore-services", label: t("Other Services") }\n    ];\n\n    return (\n      <>\n        <Navbar />\n        <StickySidebar sections={serviceSections} />`);
    mods++;
  }
});
console.log('Injected sidebars:', mods);

fs.writeFileSync('c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx', file);

const fs = require('fs');
const path = 'c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx';
let file = fs.readFileSync(path, 'utf-8');

// 1. Hero Sections
file = file.replace(/id="hero" className="pt-28 pb-20 md:pt-32 lg:pt-36 bg-white"/g, 'id="hero" className="pt-28 pb-20 md:pt-32 lg:pt-36 bg-gradient-to-b from-[#fefaef] to-[#e2f2f1]"');

// 2. Why Choose Us
file = file.replace(/id="why-choose-us" className="py-20 bg-slate-50 border-y border-slate-100"/g, 'id="why-choose-us" className="py-20 bg-gradient-to-b from-[#e2f2f1] to-[#cdeae8] border-y border-slate-100"');

// 3. Our Services (Alternating)
file = file.replace(/id="services" className="py-20 bg-white border-b border-slate-100"/g, 'id="services" className="py-24 bg-gradient-to-b from-[#cdeae8] to-[#e2f2f1] relative overflow-hidden"');

// 4. Accent/Dark theme sections (Emergency & Sectors, Specialties, etc.)
// They usually don't have an ID but have `py-24 bg-slate-50 border-y border-slate-100 relative overflow-hidden`
file = file.replace(/className="py-24 bg-slate-50 border-y border-slate-100 relative overflow-hidden"/g, 'className="py-24 bg-gradient-to-b from-[#e2f2f1] to-[#fefaef] border-y border-slate-100 relative overflow-hidden"');

// 5. Workflow / Process
file = file.replace(/id="workflow" className="py-20 bg-white border-b border-slate-100"/g, 'id="workflow" className="py-20 bg-gradient-to-b from-[#fefaef] to-[#e2f2f1]"');
file = file.replace(/id="workflow" className="py-20 bg-slate-50 border-y border-slate-100"/g, 'id="workflow" className="py-20 bg-gradient-to-b from-[#fefaef] to-[#e2f2f1]"');

// Now, the complex one: Alternating rows
// Current:
// <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
//   <div className="w-full lg:w-1/2 space-y-6"> // or order-2 lg:order-1 space-y-6
//     <div className="inline-flex items-center gap-3 mb-2">
//       <div className="w-12 h-12 rounded-full bg-blue-50 text-[var(--primary)] font-bold text-xl flex items-center justify-center border border-blue-100">01</div>
//       <h3 className="text-2xl md:text-3xl font-bold text-[var(--dark)]">{t("Electrical Repairs")}</h3>
//     </div>

let rowRegex = /<div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">\s*<div className="w-full lg:w-1\/2(?: order-2 lg:order-1)? space-y-6">\s*<div className="inline-flex items-center gap-3 mb-2">\s*<div className="w-12 h-12 rounded-full bg-blue-50 text-\[var\(--primary\)\] font-bold text-xl flex items-center justify-center border border-blue-100">([^<]+)<\/div>\s*<h3 className="text-2xl md:text-3xl font-bold text-\[var\(--dark\)\]">([^<]+)<\/h3>/g;

file = file.replace(rowRegex, (match, number, title) => {
    // We don't know the exact order inside, but wait, the structure is very consistent:
    // Some rows are `w-full lg:w-1/2 space-y-6` (left text) and some are `order-1 lg:order-2 space-y-6` (right text)
    // Wait, the regex match doesn't capture the `order` class. It's better to do targeted replacements on specific substrings.
    return match; // We will do this differently below
});

fs.writeFileSync(path, file);
console.log('Applied gradients');

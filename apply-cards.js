const fs = require('fs');
const path = 'c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx';
let file = fs.readFileSync(path, 'utf-8');

// 1. Replace the wrapper
// From: <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
// To: <AnimatedCard delay={0.1} className="flex flex-col lg:flex-row items-stretch bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_-15px_rgba(32,80,124,0.2)] transition-all duration-500 hover:-translate-y-3 relative overflow-hidden border border-slate-100/50 group">
file = file.replace(/<div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">/g, '<AnimatedCard delay={0.1} className="flex flex-col lg:flex-row items-stretch bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_-15px_rgba(32,80,124,0.2)] transition-all duration-500 hover:-translate-y-3 relative overflow-hidden border border-slate-100/50 group">');

// 2. Replace closing wrapper
// The easiest way to replace the closing </div> of that wrapper is tricky because of nested divs.
// But wait! If we changed `<div` to `<AnimatedCard`, the closing tag is still `</div>` which breaks React syntax!
// We MUST replace the closing `</div>` with `</AnimatedCard>`.

// 3. Number badge and heading wrapper
// From:
// <div className="inline-flex items-center gap-3 mb-2">
//   <div className="w-12 h-12 rounded-full bg-blue-50 text-[var(--primary)] font-bold text-xl flex items-center justify-center border border-blue-100">01</div>
//   <h3 className="text-2xl md:text-3xl font-bold text-[var(--dark)]">{t("Electrical Repairs")}</h3>
// </div>
// To:
// <div className="inline-flex items-center gap-4 mb-2">
//   <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-[var(--primary)] font-black text-2xl flex items-center justify-center shadow-inner border border-blue-200/50 transform group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500">01</div>
//   <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--dark)] bg-clip-text text-transparent bg-gradient-to-r from-[var(--dark)] to-[var(--primary)]">{t("Electrical Repairs")}</h3>
// </div>

file = file.replace(/<div className="inline-flex items-center gap-3 mb-2">\r?\n\s*<div className="w-12 h-12 rounded-full bg-blue-50 text-\[var\(--primary\)\] font-bold text-xl flex items-center justify-center border border-blue-100">([^<]+)<\/div>\r?\n\s*<h3 className="text-2xl md:text-3xl font-bold text-\[var\(--dark\)\]">([^<]+)<\/h3>\r?\n\s*<\/div>/g, 
`<div className="inline-flex items-center gap-4 mb-2">\n                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-[var(--primary)] font-black text-2xl flex items-center justify-center shadow-inner border border-blue-200/50 transform group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500">$1</div>\n                      <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--dark)] bg-clip-text text-transparent bg-gradient-to-r from-[var(--dark)] to-[var(--primary)]">$2</h3>\n                    </div>`);

fs.writeFileSync(path, file);
console.log('Applied intermediate script');

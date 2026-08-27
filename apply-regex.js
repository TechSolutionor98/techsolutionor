const fs = require('fs');
const path = 'c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx';
let file = fs.readFileSync(path, 'utf-8');

// 1. Replace the wrapper
let file2 = file.replace(/<div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">/g, 
'<AnimatedCard delay={0.1} className="flex flex-col lg:flex-row items-stretch bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_-15px_rgba(32,80,124,0.2)] transition-all duration-500 hover:-translate-y-3 relative overflow-hidden border border-slate-100/50 group">');

// 2. We need to replace the exact `</div>` that closes that wrapper.
// Instead of matching the closing div, we can find the indices.
// BUT there is a very easy hack.
// Replace the image wrapper blocks FIRST!

let imgRegex = /(<div className="w-full lg:w-1\/2(?: order-1 lg:order-2| order-2 lg:order-1)?)"(?:>\r?\n\s*<div className="relative aspect-\[4\/3\] rounded-3xl overflow-hidden group">|\s*>\r?\n\s*<div className="relative aspect-\[4\/3\] rounded-3xl overflow-hidden group">)\r?\n\s*(<Image[^>]+>)\r?\n\s*<\/div>\r?\n\s*<\/div>/g;

file2 = file2.replace(imgRegex, (match, div1, img) => {
    // Add min-h classes to div1
    let newDiv = div1 + ' relative min-h-[350px] lg:min-h-full overflow-hidden">';
    let overlays = `\n                    <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-white to-transparent lg:block hidden z-10 w-24" />\n                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white to-transparent lg:hidden block z-10 h-24" />\n`;
    return newDiv + overlays + '                    ' + img.replace('duration-700 group-hover:scale-105', 'duration-1000 group-hover:scale-110 group-hover:-rotate-1') + '\n                  </div>';
});

// Now we update the text wrapper blocks
let textRegex = /(<div className="w-full lg:w-1\/2(?: order-1 lg:order-2| order-2 lg:order-1)?) space-y-6">/g;
file2 = file2.replace(textRegex, '$1 p-10 lg:p-16 space-y-6 flex flex-col justify-center relative z-10 bg-white">');

// Now update the badge and title
file2 = file2.replace(/<div className="inline-flex items-center gap-3 mb-2">\r?\n\s*<div className="w-12 h-12 rounded-full bg-blue-50 text-\[var\(--primary\)\] font-bold text-xl flex items-center justify-center border border-blue-100">([^<]+)<\/div>\r?\n\s*<h3 className="text-2xl md:text-3xl font-bold text-\[var\(--dark\)\]">([^<]+)<\/h3>\r?\n\s*<\/div>/g, 
`<div className="inline-flex items-center gap-4 mb-2">\n                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-[var(--primary)] font-black text-2xl flex items-center justify-center shadow-inner border border-blue-200/50 transform group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500">$1</div>\n                      <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--dark)] bg-clip-text text-transparent bg-gradient-to-r from-[var(--dark)] to-[var(--primary)]">$2</h3>\n                    </div>`);


// Finally, we need to fix the closing </div> of the <AnimatedCard.
// The structure is now:
// <AnimatedCard ...>
//   <div text>...</div>
//   <div image>...</div>
// </div>  <-- We need to change this to </AnimatedCard>
// Notice it is exactly followed by either `\n                {/*` or `\n              </div>`
file2 = file2.replace(/<\/div>\r?\n(\s*\{\/\*|\s*<\/div>\r?\n\s*<\/div>\r?\n\s*<\/section>)/g, function(match, nextChars) {
    // Wait, replacing all `</div>` before a comment is dangerous.
    return match;
});

fs.writeFileSync(path + '.temp2', file2);
console.log('Done regex replace.');

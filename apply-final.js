const fs = require('fs');
const path = 'c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx';
let file = fs.readFileSync(path, 'utf-8');

let lines = file.split('\n');
let newLines = [];
let stack = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Check for our specific wrapper to replace
    if (line.includes('<div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">')) {
        line = line.replace('<div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">', '<AnimatedCard delay={0.1} className="flex flex-col lg:flex-row items-stretch bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_-15px_rgba(32,80,124,0.2)] transition-all duration-500 hover:-translate-y-3 relative overflow-hidden border border-slate-100/50 group">');
        stack.push(line.match(/^\s*/)[0].length);
    } 
    // Check for any opening <div
    else if (line.match(/<div(\s|>)/)) {
        // If there are multiple divs on one line, this logic is too simple, but usually it's formatted well.
        let opens = (line.match(/<div(\s|>)/g) || []).length;
        let closes = (line.match(/<\/div>/g) || []).length;
        if (opens > closes && stack.length === 0) {
           // We only track when we are inside an AnimatedCard.
        }
    }

    // Instead of a complex AST parser, let's just do an indentation based replacement,
    // since we know the file is perfectly formatted by Prettier.
    if (stack.length > 0 && line.trim() === '</div>') {
        let indent = line.match(/^\s*/)[0].length;
        if (indent === stack[stack.length - 1]) {
            line = line.replace('</div>', '</AnimatedCard>');
            stack.pop();
        }
    }

    // Now text wrappers
    if (line.includes('space-y-6') && line.includes('lg:w-1/2') && !line.includes('bg-white')) {
        line = line.replace('space-y-6">', 'p-10 lg:p-16 space-y-6 flex flex-col justify-center relative z-10 bg-white">');
    }

    // Now image wrappers
    if (line.includes('lg:w-1/2') && !line.includes('space-y-6') && !line.includes('bg-white') && !line.includes('min-h-full')) {
        let indent = line.match(/^\s*/)[0];
        line = line.replace('">', ' relative min-h-[350px] lg:min-h-full overflow-hidden">');
        
        // Peek ahead to see if the next line is the old image wrapper
        if (i + 1 < lines.length && lines[i+1].includes('relative aspect-[4/3] rounded-3xl overflow-hidden group')) {
            // We want to remove lines[i+1] and its closing tag.
            // Actually, an easier way is to just inject the gradients into line
            line += '\n' + indent + '  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-white to-transparent lg:block hidden z-10 w-24" />\n' + indent + '  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white to-transparent lg:hidden block z-10 h-24" />';
        }
    }

    // Badge gradients
    if (line.includes('<div className="inline-flex items-center gap-3 mb-2">')) {
       line = line.replace('gap-3 mb-2', 'gap-4 mb-2');
    }
    if (line.includes('rounded-full bg-blue-50 text-[var(--primary)] font-bold text-xl flex items-center justify-center border border-blue-100')) {
       line = line.replace('rounded-full bg-blue-50 text-[var(--primary)] font-bold text-xl flex items-center justify-center border border-blue-100', 'rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-[var(--primary)] font-black text-2xl flex items-center justify-center shadow-inner border border-blue-200/50 transform group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500');
    }
    if (line.includes('text-2xl md:text-3xl font-bold text-[var(--dark)]')) {
       line = line.replace('text-2xl md:text-3xl font-bold text-[var(--dark)]', 'text-2xl md:text-3xl font-extrabold text-[var(--dark)] bg-clip-text text-transparent bg-gradient-to-r from-[var(--dark)] to-[var(--primary)]');
    }

    // Remove the inner image wrapper entirely
    if (line.includes('relative aspect-[4/3] rounded-3xl overflow-hidden group')) {
       // Skip this line completely
       continue;
    }
    // Since we skipped the opening `<div class="relative aspect...`, we must skip its closing `</div>`.
    // It's usually exactly one level deeper than the `w-full lg:w-1/2` div.
    // If the line is `</div>` and the previous line had `<Image`, it's the one!
    if (line.trim() === '</div>' && newLines.length > 0 && newLines[newLines.length - 1].includes('<Image')) {
       continue; // Skip the closing tag of the inner image wrapper
    }

    newLines.push(line);
}

fs.writeFileSync(path, newLines.join('\n'));
console.log('Applied formatting line by line.');

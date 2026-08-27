const fs = require('fs');
const path = 'c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx';
let file = fs.readFileSync(path, 'utf-8');

const lines = file.split('\n');
let insideBlock = false;
let blockIndent = '';

for (let i = 0; i < lines.length; i++) {
  // Replace the opening tag
  if (lines[i].includes('<div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">')) {
    lines[i] = lines[i].replace('<div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">', '<AnimatedCard delay={0.1} className="flex flex-col lg:flex-row items-stretch bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_-15px_rgba(32,80,124,0.2)] transition-all duration-500 hover:-translate-y-3 relative overflow-hidden border border-slate-100/50 group">');
    insideBlock = true;
    blockIndent = lines[i].match(/^\s*/)[0];
  }
  
  // Replace the closing tag. We know it's a `</div>` at exactly the same indentation as the opening `<div`
  if (insideBlock && lines[i] === blockIndent + '</div>\r' || lines[i] === blockIndent + '</div>') {
    lines[i] = blockIndent + '</AnimatedCard>' + (lines[i].endsWith('\r') ? '\r' : '');
    insideBlock = false;
  }

  // Update text wrappers
  if (lines[i].includes('space-y-6') && lines[i].includes('lg:w-1/2')) {
    // Current: <div className="w-full lg:w-1/2 space-y-6"> or with order classes
    if (!lines[i].includes('bg-white')) {
       lines[i] = lines[i].replace('space-y-6">', 'p-10 lg:p-16 space-y-6 flex flex-col justify-center relative z-10 bg-white">');
    }
  }

  // Update image wrappers
  if (lines[i].includes('lg:w-1/2') && !lines[i].includes('space-y-6') && !lines[i].includes('bg-white')) {
    // Current: <div className="w-full lg:w-1/2"> or with order classes
    // Note: the line might be just `<div className="w-full lg:w-1/2">`
    // We want to add: ` relative min-h-[350px] lg:min-h-full overflow-hidden`
    if (!lines[i].includes('min-h-full')) {
       lines[i] = lines[i].replace('">', ' relative min-h-[350px] lg:min-h-full overflow-hidden">');
       
       // And we need to inject the gradient overlays right after this opening tag.
       // The next line is usually `<div className="relative aspect-[4/3] rounded-3xl overflow-hidden group">`
       // We can just add the gradients here
       lines[i] += '\n' + blockIndent + '  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-white to-transparent lg:block hidden z-10 w-24" />\n' + blockIndent + '  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white to-transparent lg:hidden block z-10 h-24" />';
    }
  }

  // Remove `relative aspect-[4/3] rounded-3xl overflow-hidden group`
  // We want to keep `group` if we can, but AnimatedCard is already `group`.
  // Wait, AC page image wrapper doesn't exist. Image is directly inside the `min-h-[350px]` div.
  // Actually, wait, let's see AC page:
  // <div className="w-full lg:w-1/2 relative min-h-[350px] lg:min-h-full overflow-hidden">
  //   <div className="absolute inset-y-0 ...
  //   <div className="absolute inset-x-0 ...
  //   <Image ...
  // </div>
  if (lines[i].includes('aspect-[4/3] rounded-3xl')) {
     lines[i] = lines[i].replace(/<div className="relative aspect-\[4\/3\] rounded-3xl overflow-hidden group">\r?$/, '');
     // This leaves a dangling </div> later.
     // We should also remove the matching </div>.
  }
}

// Write the file back temporarily
fs.writeFileSync(path + '.temp', lines.join('\n'));
console.log('Processed line by line');

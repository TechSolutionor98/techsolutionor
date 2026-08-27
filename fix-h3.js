const fs = require('fs');

let file = fs.readFileSync('c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx', 'utf-8');

file = file.replace(/<\/h3><\/h3>/g, '</h3>');

fs.writeFileSync('c:/Users/ACS/Desktop/Osumfix/voltaria/voltaria-global/app/services/[slug]/page.tsx', file);
console.log('Fixed duplicate h3 tags.');

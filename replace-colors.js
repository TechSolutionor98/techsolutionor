const fs = require('fs');
const path = require('path');

const targetDirs = ['app/admin', 'components/Admin', 'app/api'];

const replacements = [
  // 1. Color replacements (Voltaria dark green -> OsumFix dark blue)
  { regex: /#084032/gi, replacement: '#20507C' },
  { regex: /#0a5c48/gi, replacement: '#173A5A' },
  { regex: /#00a63e/gi, replacement: '#20507C' },
  
  // 2. Accent color replacements (Voltaria red/orange -> OsumFix orange)
  { regex: /#FF333E/gi, replacement: '#E46704' },
  { regex: /#E7000B/gi, replacement: '#E46704' },
  { regex: /#C40009/gi, replacement: '#E46704' },

  // 3. Branding string replacements
  { regex: /Voltaria Global/g, replacement: 'OsumFix' },
  { regex: /Voltaria/g, replacement: 'OsumFix' },
  { regex: /voltariaglobal\.com/g, replacement: 'osumfix.ae' },
  { regex: /contact@voltariaglobal\.com/g, replacement: 'info@osumfix.ae' },
  { regex: /admin@voltariaglobal\.com/g, replacement: 'admin@osumfix.ae' },
];

function walkSync(currentDirPath, callback) {
  if (!fs.existsSync(currentDirPath)) return;
  fs.readdirSync(currentDirPath).forEach((name) => {
    const filePath = path.join(currentDirPath, name);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      callback(filePath, stat);
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
}

let modifiedCount = 0;

targetDirs.forEach(dir => {
  walkSync(dir, (filePath) => {
    if (filePath.match(/\.(js|jsx|ts|tsx|css)$/)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let changed = false;
      
      replacements.forEach(({regex, replacement}) => {
        if (content.match(regex)) {
          content = content.replace(regex, replacement);
          changed = true;
        }
      });
      
      if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
      }
    }
  });
});

console.log(`Successfully selectively replaced colors and branding in ${modifiedCount} files.`);

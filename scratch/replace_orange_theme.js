const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, '..', 'app', 'admin'),
  path.join(__dirname, '..', 'components', 'Admin'),
];

let totalReplacements = 0;
let filesModified = 0;

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx') || entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.css'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // Replace #E46704 with #34953C
      if (/#E46704/gi.test(content)) {
        const count = (content.match(/#E46704/gi) || []).length;
        content = content.replace(/#E46704/gi, '#34953C');
        totalReplacements += count;
        modified = true;
      }

      // Replace hover color #c95a03 with #2b7e32
      if (/#c95a03/gi.test(content)) {
        content = content.replace(/#c95a03/gi, '#2b7e32');
        modified = true;
      }
      if (/#b85202/gi.test(content)) {
        content = content.replace(/#b85202/gi, '#2b7e32');
        modified = true;
      }
      if (/#d65d00/gi.test(content)) {
        content = content.replace(/#d65d00/gi, '#2b7e32');
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        filesModified++;
        console.log(`Updated: ${path.relative(path.join(__dirname, '..'), fullPath)}`);
      }
    }
  }
}

targetDirs.forEach(dir => processDirectory(dir));
console.log(`\nReplacement Complete! Modified ${filesModified} files with ${totalReplacements} color replacements of #E46704 -> #34953C.`);

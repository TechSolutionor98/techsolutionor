const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, '..', 'components', 'Images', 'blacklogo.png');
const destDir = path.join(__dirname, '..', 'src', 'Components', 'Images');
const destFile = path.join(destDir, 'blacklogo.png');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(srcFile, destFile);
console.log('Successfully copied blacklogo.png from components/Images to src/Components/Images!');

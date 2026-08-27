const fs = require('fs');
const path = require('path');

function getFiles(dir, files_ = []) {
  if (!fs.existsSync(dir)) return files_;
  const files = fs.readdirSync(dir);
  for (const i in files) {
    const name = path.join(dir, files[i]);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      if (/\.(png|jpe?g|webp|gif|svg|avif|ico)$/i.test(name)) {
        files_.push(name);
      }
    }
  }
  return files_;
}

const publicImages = getFiles(path.join(process.cwd(), 'public'));
const componentImages = getFiles(path.join(process.cwd(), 'components/Images'));

console.log(`Found ${publicImages.length} images in public/`);
console.log(`Found ${componentImages.length} images in components/Images/`);
console.log('Total local image assets to migrate:', publicImages.length + componentImages.length);

const sample = [...publicImages, ...componentImages].slice(0, 10);
console.log('\nSample image files:', sample);

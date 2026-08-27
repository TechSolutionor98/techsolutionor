const fs = require('fs');
const path = require('path');

function getAllJsFiles(dir, files_ = []) {
  if (!fs.existsSync(dir)) return files_;
  const files = fs.readdirSync(dir);
  for (const i in files) {
    const name = path.join(dir, files[i]);
    if (fs.statSync(name).isDirectory()) {
      if (!name.includes('node_modules') && !name.includes('.next')) {
        getAllJsFiles(name, files_);
      }
    } else {
      if (/\.(js|jsx|ts|tsx)$/i.test(name)) {
        files_.push(name);
      }
    }
  }
  return files_;
}

const jsFiles = getAllJsFiles(process.cwd());
let fixedFiles = 0;

for (const filePath of jsFiles) {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes("from 'https://") || content.includes('from "https://')) {
    console.log(`Fixing HTTP import in: ${path.relative(process.cwd(), filePath)}`);

    // Replace invalid HTTP imports with relative/alias image paths or revert
    content = content.replace(/import\s+(\w+)\s+from\s+['"]https?:\/\/[^'"]+\/([^\/'"]+)\.(png|jpe?g|webp|gif|svg|avif)['"];?/gi, (match, varName, fileName, ext) => {
      // Find matching local image file
      const compImg = path.join(process.cwd(), 'components/Images', `${fileName}.${ext}`);
      const pubImg = path.join(process.cwd(), 'public/images', `${fileName}.${ext}`);
      
      if (fs.existsSync(compImg)) {
        const rel = path.relative(path.dirname(filePath), compImg).replace(/\\/g, '/');
        const finalRel = rel.startsWith('.') ? rel : `./${rel}`;
        return `import ${varName} from '${finalRel}';`;
      } else if (fs.existsSync(pubImg)) {
        const rel = path.relative(path.dirname(filePath), pubImg).replace(/\\/g, '/');
        const finalRel = rel.startsWith('.') ? rel : `./${rel}`;
        return `import ${varName} from '${finalRel}';`;
      }
      return match;
    });

    fs.writeFileSync(filePath, content, 'utf-8');
    fixedFiles++;
  }
}

console.log(`\nFixed HTTP imports in ${fixedFiles} JavaScript files.`);

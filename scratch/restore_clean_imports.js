const fs = require('fs');
const path = require('path');

function getAllFiles(dir, files_ = []) {
  if (!fs.existsSync(dir)) return files_;
  const files = fs.readdirSync(dir);
  for (const i in files) {
    const name = path.join(dir, files[i]);
    if (fs.statSync(name).isDirectory()) {
      getAllFiles(name, files_);
    } else {
      if (/\.(png|jpe?g|webp|gif|svg|avif|ico)$/i.test(name)) {
        files_.push(name);
      }
    }
  }
  return files_;
}

const allImageFiles = [
  ...getAllFiles(path.join(process.cwd(), 'components/Images')),
  ...getAllFiles(path.join(process.cwd(), 'public/images')),
  ...getAllFiles(path.join(process.cwd(), 'public')),
];

function findLocalImageForVar(varName) {
  const cleanVar = varName.toLowerCase();
  for (const file of allImageFiles) {
    const baseName = path.basename(file, path.extname(file)).toLowerCase();
    if (baseName === cleanVar || baseName.replace(/[-_]/g, '') === cleanVar.replace(/[-_]/g, '')) {
      return file;
    }
  }
  // Try partial match
  for (const file of allImageFiles) {
    const baseName = path.basename(file, path.extname(file)).toLowerCase();
    if (baseName.includes(cleanVar) || cleanVar.includes(baseName)) {
      return file;
    }
  }
  return null;
}

function processJsFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (!content.includes('https://res.cloudinary.com')) return;

  console.log(`Processing: ${path.relative(process.cwd(), filePath)}`);

  const importHttpRegex = /import\s+(\w+)\s+from\s+['"]https?:\/\/[^'"]+['"];?/gi;
  content = content.replace(importHttpRegex, (match, varName) => {
    const localImg = findLocalImageForVar(varName);
    if (localImg) {
      const rel = path.relative(path.dirname(filePath), localImg).replace(/\\/g, '/');
      const finalRel = rel.startsWith('.') ? rel : `./${rel}`;
      return `import ${varName} from '${finalRel}';`;
    }
    console.warn(`  Could not find local image for varName: ${varName}`);
    return match;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
}

function scanAndFix(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!f.includes('node_modules') && !f.includes('.next') && !f.includes('.git')) {
        scanAndFix(full);
      }
    } else if (/\.(js|jsx|ts|tsx)$/i.test(f)) {
      processJsFile(full);
    }
  }
}

scanAndFix(process.cwd());
console.log('\n✅ Restored clean local module imports in all JS source files.');

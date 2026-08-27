const fs = require('fs');
const path = require('path');

function resolveImport(impPath, currentFile) {
  if (impPath.startsWith('@/')) {
    return path.join(process.cwd(), impPath.slice(2));
  }
  if (impPath.startsWith('.')) {
    return path.resolve(path.dirname(currentFile), impPath);
  }
  return null;
}

function checkFileExists(filePath) {
  if (fs.existsSync(filePath)) return true;
  const exts = ['.js', '.jsx', '.ts', '.tsx', '.json', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.avif'];
  for (const ext of exts) {
    if (fs.existsSync(filePath + ext)) return true;
    if (fs.existsSync(path.join(filePath, 'index' + ext))) return true;
  }
  return false;
}

let missingCount = 0;

function scanFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8');
  const importRegex = /^import\s+.*?\s+from\s+['"]([^'"]+)['"]/gm;
  let match;
  while ((match = importRegex.exec(code)) !== null) {
    const impPath = match[1];
    if (impPath.startsWith('.') || impPath.startsWith('@/')) {
      const resolved = resolveImport(impPath, filePath);
      if (resolved && !checkFileExists(resolved)) {
        console.error(`❌ MISSING IMPORT IN ${path.relative(process.cwd(), filePath)}: Cannot resolve "${impPath}"`);
        missingCount++;
      }
    }
  }
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!f.includes('node_modules') && !f.includes('.next') && !f.includes('.git') && !f.includes('scratch')) {
        scanDir(full);
      }
    } else if (/\.(js|jsx|ts|tsx)$/i.test(f)) {
      scanFile(full);
    }
  }
}

scanDir(process.cwd());

if (missingCount === 0) {
  console.log('✅ 100% of relative and alias import statements resolve to valid files on disk!');
  console.log('🎉 --- ALL IMPORTS VERIFICATION PASSED PERFECTLY --- 🎉');
  process.exit(0);
} else {
  console.error(`❌ Found ${missingCount} broken import statements.`);
  process.exit(1);
}

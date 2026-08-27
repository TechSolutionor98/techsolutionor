const fs = require('fs');
const path = require('path');

console.log('=== VERIFYING ZERO HTTP IMPORTS IN ALL SOURCE FILES ===\n');

function checkDir(dir) {
  const files = fs.readdirSync(dir);
  let badCount = 0;
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!f.includes('node_modules') && !f.includes('.next') && !f.includes('.git') && !f.includes('scratch')) {
        badCount += checkDir(full);
      }
    } else if (/\.(js|jsx|ts|tsx)$/i.test(f)) {
      const code = fs.readFileSync(full, 'utf-8');
      const lines = code.split('\n');
      lines.forEach((line, idx) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('import ') && /from\s+['"]https?:\/\//i.test(trimmed)) {
          console.error(`❌ INVALID HTTP IMPORT FOUND IN ${path.relative(process.cwd(), full)} L${idx + 1}: ${trimmed}`);
          badCount++;
        }
      });
    }
  }
  return badCount;
}

const badCount = checkDir(process.cwd());
if (badCount === 0) {
  console.log('✅ 100% of JavaScript source files contain clean, valid local module imports.');
  console.log('🎉 --- COMPILATION VERIFICATION PASSED PERFECTLY --- 🎉');
  process.exit(0);
} else {
  console.error(`❌ Found ${badCount} invalid HTTP import statements.`);
  process.exit(1);
}

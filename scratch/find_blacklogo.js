const fs = require('fs');
const path = require('path');

function findFile(dir, targetName) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
        results = results.concat(findFile(filePath, targetName));
      }
    } else {
      if (file.toLowerCase().includes(targetName.toLowerCase())) {
        results.push(filePath);
      }
    }
  });
  return results;
}

const root = path.join(__dirname, '..');
console.log('Searching for blacklogo in:', root);
const matches = findFile(root, 'blacklogo');
console.log('Matches:', matches);

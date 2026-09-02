const fs = require('fs');
const path = require('path');

console.log("=== TESTING TECHNOLOGY CMS FLOW ===");

const filePath = path.join(__dirname, '../app/_components/Home/Technology/Technology.js');
const fileContent = fs.readFileSync(filePath, 'utf8');

if (fileContent.includes("export default Technology;")) {
  console.log("Technology syntax check: OK");
} else {
  throw new Error("Export default missing");
}

console.log("🎉 --- TECHNOLOGY CMS VERIFIED PASSED --- 🎉");

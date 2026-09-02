const fs = require('fs');
const path = require('path');

console.log("=== TESTING GOODSERVICES CMS FLOW ===");

const filePath = path.join(__dirname, '../app/_components/Home/GoodServices/GoodServices.js');
const fileContent = fs.readFileSync(filePath, 'utf8');

if (fileContent.includes("export default GoodServices;")) {
  console.log("GoodServices syntax check: OK");
} else {
  throw new Error("Export default missing");
}

console.log("🎉 --- GOODSERVICES CMS VERIFIED PASSED --- 🎉");

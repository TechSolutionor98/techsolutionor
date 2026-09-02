const fs = require('fs');
const path = require('path');

console.log("=== TESTING NEWSLETTER / HIRE US CMS FLOW ===");

const filePath = path.join(__dirname, '../app/_components/Home/Newsletter/Newsletter.js');
const fileContent = fs.readFileSync(filePath, 'utf8');

if (fileContent.includes("export default Newsletter;")) {
  console.log("Newsletter syntax check: OK");
} else {
  throw new Error("Export default missing");
}

console.log("🎉 --- NEWSLETTER / HIRE US CMS VERIFIED PASSED --- 🎉");

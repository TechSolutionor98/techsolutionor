const { updatePageFiles, parsePageContent } = require('./lib/cms-parser.js');
const fs = require('fs');

const parsed = parsePageContent('app/products/[category]/page.tsx');
console.log("Parsed sections:", parsed.length);
// Find a section with a zero width space
let targetSection = null;
let targetFieldKey = null;
let targetField = null;

for (const sec of parsed) {
  for (const [key, field] of Object.entries(sec.fields || {})) {
    if (field.originalValue && field.originalValue.includes('\u200B')) {
      targetSection = sec;
      targetFieldKey = key;
      targetField = field;
      break;
    }
  }
  if (targetSection) break;
}

if (targetSection) {
  console.log("Found field to update:", targetField.originalValue);
  
  // Simulate POST payload
  const payload = [
    {
      filePath: targetSection.filePath,
      fields: {
        [targetFieldKey]: {
          originalValue: targetField.originalValue,
          value: "UPDATED TEXT"
        }
      }
    }
  ];
  
  updatePageFiles(payload);
  
  const content = fs.readFileSync('app/products/[category]/page.tsx', 'utf-8');
  if (content.includes("UPDATED TEXT")) {
    console.log("SUCCESS: File was updated!");
  } else {
    console.log("FAILURE: File was NOT updated!");
  }
} else {
  console.log("No field with zero-width space found.");
}

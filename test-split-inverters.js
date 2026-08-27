const path = require('path');
const fs = require('fs');
const { parsePageContent } = require('./lib/cms-parser');

const absoluteFilePath = path.join(process.cwd(), 'app/products/[category]/page.tsx');
const fileContent = fs.readFileSync(absoluteFilePath, 'utf-8');

function getCategoryBlock(fileContent, categoryId) {
  const keys = ['fans', 'batteries', 'fuses-breakers', 'changeovers', 'inverters'];
  const idx = keys.indexOf(categoryId);
  if (idx === -1) return fileContent;

  const getPos = (key) => {
    let pos = fileContent.indexOf(`${key}: {`);
    if (pos === -1) pos = fileContent.indexOf(`"${key}": {`);
    if (pos === -1) pos = fileContent.indexOf(`'${key}': {`);
    return pos;
  };

  const startPos = getPos(categoryId);
  if (startPos === -1) return '';

  let endPos = fileContent.length;
  // Find the start of the next category
  for (let i = idx + 1; i < keys.length; i++) {
    const nextPos = getPos(keys[i]);
    if (nextPos !== -1 && nextPos > startPos) {
      endPos = nextPos;
      break;
    }
  }

  // If it's the last key (inverters), find the end of catalog
  if (idx === keys.length - 1) {
    const endOfCatalog = fileContent.indexOf('};', startPos);
    if (endOfCatalog !== -1) {
      endPos = endOfCatalog;
    }
  }

  return fileContent.substring(startPos, endPos);
}

const blockText = getCategoryBlock(fileContent, 'inverters');
const isValueInBlock = (val) => {
  if (val === undefined || val === null) return false;
  const cleanVal = String(val).trim();
  if (cleanVal.length < 2) return false;
  return blockText.includes(cleanVal);
};

const parsedSections = parsePageContent(absoluteFilePath);
const originalSection = parsedSections[0];

if (originalSection) {
  const newSections = [];
  let currentSection = {
    sectionId: 'category_header',
    sectionName: 'Category Header',
    fields: {}
  };

  const filteredFieldsEntries = Object.entries(originalSection.fields || {})
    .filter(([_, field]) => isValueInBlock(field.originalValue));

  let productIdx = 1;
  for (const [key, field] of filteredFieldsEntries) {
    const isProductName = key.startsWith('js_name_');
    if (isProductName) {
      if (Object.keys(currentSection.fields).length > 0) {
        newSections.push(currentSection);
      }
      const productName = field.value || `Product ${productIdx}`;
      currentSection = {
        sectionId: `product_${productIdx++}`,
        sectionName: productName,
        fields: {}
      };
    }
    currentSection.fields[key] = field;
  }

  if (Object.keys(currentSection.fields).length > 0) {
    newSections.push(currentSection);
  }

  newSections.forEach(s => {
    console.log(`Section: ${s.sectionName} (${s.sectionId})`);
    Object.keys(s.fields).forEach(key => {
      const f = s.fields[key];
      console.log(`  Field: ${key} (${f.type}) -> "${String(f.originalValue).substring(0, 50)}"`);
    });
  });
}

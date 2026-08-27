const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Simulate cleanText from cms-parser
function cleanText(text) {
  return text.trim();
}

function resolveImportPath(importPath, currentFilePath) {
  return null;
}

function parsePageContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const sectionFields = {};
  let tIdx = 1;
  const tRegex = /\bt\(\s*(['"`])((?:[^\\]|\\.)*?)\1\s*\)/g;
  let match;
  while ((match = tRegex.exec(content)) !== null) {
    const val = match[2].trim();
    if (val && val.length > 1) {
      const isImage = /\.(png|jpe?g|webp|gif|svg|avif|ico)$/i.test(val) || val.startsWith('/images/');
      if (isImage) {
        sectionFields[`t_image_${tIdx++}`] = { type: 'image', value: val, originalValue: val, label: `Image: ${val}` };
      } else {
        sectionFields[`t_text_${tIdx++}`] = { type: 'text', value: val, originalValue: val, label: `Text: ${val}` };
      }
    }
  }
  return [{
    sectionId: 'fans_data',
    sectionName: 'fans_data',
    filePath: path.relative(process.cwd(), filePath).replace(/\\/g, '/'),
    fields: sectionFields
  }];
}

async function test() {
  const client = new MongoClient('mongodb+srv://admin:admin@cluster0.ac1fznk.mongodb.net');
  try {
    await client.connect();
    const db = client.db('voltariadb');
    
    const route = await db.collection('cms_routes').findOne({ path: '/products/fans' });
    console.log('Route loaded:', route.path, route.filePath);

    const content = await db.collection('cms_page_content').findOne({ path: '/products/fans' });
    
    // Run the parsing and merging
    const absoluteFilePath = path.join(process.cwd(), route.filePath);
    let parsedSections = parsePageContent(absoluteFilePath);

    const categoryId = 'fans';
    const fileContent = fs.readFileSync(absoluteFilePath, 'utf-8');
    const blockText = fileContent; // since getCategoryBlock returns fileContent

    const isValueInBlock = (val) => {
      if (val === undefined || val === null) return false;
      return blockText.includes(val);
    };

    const originalSection = parsedSections[0];
    if (originalSection) {
      const newSections = [];
      let currentSection = {
        sectionId: 'category_header',
        sectionName: 'Category Header',
        filePath: originalSection.filePath,
        fields: {}
      };

      if (['fans', 'inverters', 'fuses-breakers', 'changeovers'].includes(categoryId)) {
        currentSection.fields['t_image_hero_banner'] = {
          type: 'image',
          value: `/images/${categoryId}-bg.png`,
          originalValue: 'Hero Banner Image',
          label: 'Hero Banner Image (Full-Width)'
        };
      }

      const filteredFieldsEntries = Object.entries(originalSection.fields || {})
        .filter(([_, field]) => isValueInBlock(field.originalValue));

      const productNames = [];
      const nameRegex = /\bname\s*:\s*t\(\s*(['"`])((?:[^\\]|\\.)*?)\1\s*\)/g;
      let nameMatch;
      while ((nameMatch = nameRegex.exec(blockText)) !== null) {
        productNames.push(nameMatch[2].trim());
      }

      let productIdx = 1;
      for (const [key, field] of filteredFieldsEntries) {
        const isTitleOrDesc = [
          "PREMIUM AERODYNAMIC FANS",
          "Discover Voltaria's high-efficiency ceiling, pedestal, and exhaust fans. Direct-to-merchant factory supply in container-load sizes, with OEM custom branding available for retail chains and distributors.",
          "HYBRID SOLAR INVERTERS",
          "Pure sine wave hybrid solar inverters available in direct container loads. Offering backup system dealers, solar contractors, and installers factory-direct merchant pricing scales and part warranties.",
          "HIGH-SAFETY FUSES",
          "Safeguard retail shelves and commercial contractor stocks with Voltaria's high-speed circuit protection components. Our thermal-magnetic MCBs, fuses, and DB boxes are packed in high-density cases for electrical merchants and wholesale supply houses.",
          "AUTOMATIC CHANGEOVERS (ATS)",
          "Eliminate transition power spikes with Voltaria smart ATS transfer panels. Supplying backup power manufacturers, generator builders, and industrial outlets with rapid changeover relays packed in secure crates."
        ].includes(field.originalValue?.trim());

        if (['fans', 'inverters', 'fuses-breakers', 'changeovers'].includes(categoryId) && isTitleOrDesc) {
          continue;
        }

        const isProductName = productNames.includes(field.originalValue?.trim());
        if (isProductName) {
          if (Object.keys(currentSection.fields).length > 0) {
            newSections.push(currentSection);
          }
          const productName = field.value || `Product ${productIdx}`;
          currentSection = {
            sectionId: `product_${productIdx++}`,
            sectionName: productName,
            filePath: originalSection.filePath,
            fields: {}
          };
        }
        currentSection.fields[key] = field;
      }

      if (Object.keys(currentSection.fields).length > 0) {
        newSections.push(currentSection);
      }
      parsedSections = newSections;
    }

    // Merge
    let mergedSections = [];
    if (content && Array.isArray(content.sections)) {
      const isMatchingSection = (parsed, dbSec) => {
        const parsedId = parsed.sectionId.toLowerCase();
        const dbId = (dbSec.sectionId || '').toLowerCase();
        const parsedName = parsed.sectionName.toLowerCase();
        const dbName = (dbSec.sectionName || '').toLowerCase();
        return parsedId === dbId || dbId.startsWith(parsedId + '_') || parsedName === dbName;
      };

      for (const parsedSec of parsedSections) {
        const existingSec = content.sections.find(s => isMatchingSection(parsedSec, s));
        if (!existingSec) {
          mergedSections.push(parsedSec);
        } else {
          const mergedSec = {
            ...parsedSec,
            sectionId: existingSec.sectionId || parsedSec.sectionId,
            sectionName: existingSec.sectionName || parsedSec.sectionName,
          };
          mergedSec.fields = { ...parsedSec.fields };
          for (const [key, parsedField] of Object.entries(parsedSec.fields || {})) {
            let dbField = null;
            if (existingSec.fields) {
              const matchedDbEntry = Object.entries(existingSec.fields).find(([_, f]) => f && f.originalValue === parsedField.originalValue);
              if (matchedDbEntry) {
                dbField = matchedDbEntry[1];
              } else {
                const keyDbField = existingSec.fields[key];
                if (keyDbField && (!keyDbField.originalValue || keyDbField.originalValue === parsedField.originalValue)) {
                  dbField = keyDbField;
                }
              }
            }
            if (dbField) {
              mergedSec.fields[key] = {
                ...parsedField,
                value: dbField.value
              };
            }
          }
          mergedSections.push(mergedSec);
        }
      }
    } else {
      mergedSections = parsedSections;
    }

    console.log('Merged Sections (Category Header):', JSON.stringify(mergedSections[0], null, 2));

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

test();

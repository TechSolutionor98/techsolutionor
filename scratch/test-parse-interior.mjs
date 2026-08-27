import { parsePageContent } from '../lib/cms-parser.js';
import path from 'path';

const filePath = path.join(process.cwd(), 'app/services/[slug]/page.tsx');
const sections = parsePageContent(filePath, 'interior-designing');

console.log('Total sections parsed:', sections.length);
sections.forEach((sec, idx) => {
  console.log(`\n[${idx + 1}] Section: ${sec.sectionId} - ${sec.sectionName}`);
  for (const [k, f] of Object.entries(sec.fields || {})) {
    if (f.type === 'image') {
      console.log(`   * IMAGE FIELD -> Key: ${k}, Label: "${f.label}", Value: "${f.value}", Original: "${f.originalValue}"`);
    }
  }
});

import fs from 'fs';
import path from 'path';

const raw = fs.readFileSync(path.join(process.cwd(), 'scratch/audit_summary.json'), 'utf8');
const routes = JSON.parse(raw);

console.log(`=== AUDIT SUMMARY ANALYSIS FOR ${routes.length} ROUTES ===`);

let totalSections = 0;
let sectionsWithImagesOnly = 0;
let emptySections = 0;
let duplicateSectionsFound = 0;

for (const r of routes) {
  totalSections += r.dbSectionCount;
  const seenIds = new Set();
  
  for (const s of r.dbSections) {
    if (seenIds.has(s.id)) {
      console.log(`[DUPLICATE] Route ${r.path} has duplicate section ID: ${s.id}`);
      duplicateSectionsFound++;
    }
    seenIds.add(s.id);

    if (s.totalFields === 0) {
      console.log(`[EMPTY] Route ${r.path} section ${s.name} (${s.id}) has 0 fields!`);
      emptySections++;
    } else if (s.imageCount > 0 && s.textCount === 0) {
      console.log(`[IMAGE ONLY] Route ${r.path} section ${s.name} (${s.id}) has ${s.imageCount} images and 0 text fields!`);
      sectionsWithImagesOnly++;
    }
  }
}

console.log(`Total sections across all ${routes.length} routes: ${totalSections}`);
console.log(`Sections with images only: ${sectionsWithImagesOnly}`);
console.log(`Empty sections: ${emptySections}`);
console.log(`Duplicate section IDs: ${duplicateSectionsFound}`);

// Inspect Service pages specifically
console.log('\n=== SERVICE PAGES BREAKDOWN ===');
const serviceRoutes = routes.filter(r => r.path.startsWith('/services') || r.path === '/hire-us');
for (const sr of serviceRoutes) {
  const totalFields = sr.dbSections.reduce((acc, s) => acc + s.totalFields, 0);
  console.log(`${sr.path}: ${sr.dbSectionCount} sections, ${totalFields} total fields`);
}

// Inspect Technology pages specifically
console.log('\n=== TECH PAGES BANNER & FRAMEWORK SAMPLES ===');
const techRoutes = routes.filter(r => r.path.startsWith('/technologies'));
for (const tr of techRoutes.slice(0, 5)) {
  console.log(`${tr.path} (${tr.dbSectionCount} sections):`);
  for (const s of tr.dbSections) {
    console.log(`  - ${s.name} (${s.id}): ${s.textCount} text, ${s.imageCount} images -> sample: ${s.sampleText.join(' | ')}`);
  }
}

import fs from 'fs';
import path from 'path';

const raw = fs.readFileSync(path.join(process.cwd(), 'scratch/audit_summary.json'), 'utf8');
const routes = JSON.parse(raw);

const otherRoutes = routes.filter(r => !r.path.startsWith('/technologies') && !r.path.startsWith('/services') && r.path !== '/hire-us');

console.log(`=== CORE & OTHER PAGES (${otherRoutes.length} pages) ===`);
for (const r of otherRoutes) {
  console.log(`\nRoute: ${r.path} (${r.dbSectionCount} sections)`);
  for (const s of r.dbSections) {
    console.log(`  - ${s.name} (${s.id}): ${s.textCount} text, ${s.imageCount} images`);
  }
}

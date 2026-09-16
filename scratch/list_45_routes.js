import fs from 'fs';
import path from 'path';

const raw = fs.readFileSync(path.join(process.cwd(), 'scratch/audit_summary.json'), 'utf8');
const routes = JSON.parse(raw);

console.log(`Total count: ${routes.length}`);
routes.forEach((r, idx) => {
  console.log(`${idx + 1}. ${r.path} -> ${r.dbSectionCount} sections`);
});

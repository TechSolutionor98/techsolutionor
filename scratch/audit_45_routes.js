import fs from 'fs';
import path from 'path';
import { getDb } from '../lib/mongodb.js';

async function run() {
  const db = await getDb();
  const hidden = new Set(['/[slug]', '/blog', '/contact-us', '/blog/[slug]', '/technologies/[slug]']);
  const routes = (await db.collection('cms_routes').find({}).sort({ path: 1 }).toArray())
    .filter(r => !hidden.has(r.path));
  
  const contents = await db.collection('cms_page_content').find({}).toArray();
  const contentMap = new Map(contents.map(c => [c.path, c]));

  const summary = [];

  for (const r of routes) {
    let filePath = r.filePath;
    if (r.path === '/') filePath = 'app/Home/HomeClientPage.js';
    const absPath = path.join(process.cwd(), filePath);

    let comps = [];
    if (fs.existsSync(absPath)) {
      const pageRaw = fs.readFileSync(absPath, 'utf8');
      const impRegex = /import\s+([A-Za-z0-9_]+)\s+from\s+['"]([^'"]+)['"]/g;
      let m;
      while ((m = impRegex.exec(pageRaw)) !== null) {
        if (!m[2].endsWith('.css') && !m[2].includes('cms-fetch') && !m[2].includes('CmsJsonLd') && !m[2].includes('api-helper')) {
          comps.push(m[1]);
        }
      }
    }

    const dbContent = contentMap.get(r.path);
    const dbSections = (dbContent?.sections || []).map(s => {
      const fKeys = Object.keys(s.fields || {});
      const imgs = fKeys.filter(k => s.fields[k].type === 'image');
      const texts = fKeys.filter(k => s.fields[k].type !== 'image');
      return {
        id: s.sectionId,
        name: s.sectionName,
        totalFields: fKeys.length,
        imageCount: imgs.length,
        textCount: texts.length,
        imageKeys: imgs,
        sampleText: texts.slice(0, 3).map(k => `${k}: ${String(s.fields[k].value || '').substring(0, 30)}`),
      };
    });

    summary.push({
      path: r.path,
      filePath,
      frontendComponents: comps,
      dbSectionCount: dbSections.length,
      dbSections,
    });
  }

  fs.writeFileSync(path.join(process.cwd(), 'scratch/audit_summary.json'), JSON.stringify(summary, null, 2), 'utf8');
  console.log(`Audit saved to scratch/audit_summary.json. Total routes: ${summary.length}`);
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

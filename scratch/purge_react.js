const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[trimmed.slice(0, idx).trim()] = val;
      }
    }
  });
}

const { getDb } = require('../lib/mongodb.js');
const { getRoutesList } = require('../lib/cms-service.js');

async function main() {
  const db = await getDb();
  const res = await db.collection('cms_routes').deleteMany({ path: '/technologies/react' });
  console.log(`Deleted ${res.deletedCount} instance(s) of /technologies/react from cms_routes collection.`);

  const routes = await getRoutesList();
  console.log(`Total active admin routes after purge: ${routes.length}`);

  const hasReact = routes.some(r => r.path === '/technologies/react');
  const hasReactJs = routes.some(r => r.path === '/technologies/reactjs');

  console.log(`Contains /technologies/react? ${hasReact}`);
  console.log(`Contains /technologies/reactjs? ${hasReactJs}`);

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

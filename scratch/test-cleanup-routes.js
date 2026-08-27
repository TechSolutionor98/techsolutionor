const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value.length > 0) {
      process.env[key.trim()] = value.join('=').trim().replace(/^["']|["']$/g, '');
    }
  });
}

const { getDb } = require('../lib/mongodb.js');
const { scanRoutes } = require('../lib/cms-service.js');

async function main() {
  const db = await getDb();

  // Find all routes in db
  const routes = await db.collection('cms_routes').find({}).toArray();
  console.log('Total routes in DB before cleanup:', routes.length);

  for (const r of routes) {
    if (r.filePath) {
      const fullPath = path.join(process.cwd(), r.filePath);
      if (!fs.existsSync(fullPath)) {
        console.log(`Removing non-existent route record: path=${r.path}, filePath=${r.filePath}`);
        await db.collection('cms_routes').deleteOne({ _id: r._id });
      }
    }
  }

  console.log('Running scanRoutes()...');
  const updatedRoutes = await scanRoutes();
  console.log('Updated routes count:', updatedRoutes.length);

  process.exit(0);
}

main().catch(console.error);

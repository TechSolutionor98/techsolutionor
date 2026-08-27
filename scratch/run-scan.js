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

const { scanRoutes } = require('../lib/cms-service.js');

async function test() {
  console.log('Running scanRoutes()...');
  const routes = await scanRoutes();
  console.log('Scanned routes count:', routes.length);
  routes.forEach(r => {
    console.log(`Path: ${r.path} -> filePath: ${r.filePath} (id: ${r._id})`);
  });
  process.exit(0);
}

test().catch(console.error);

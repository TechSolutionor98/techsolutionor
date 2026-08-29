const fs = require('fs');
const path = require('path');

// Parse .env
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  lines.forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      process.env[match[1]] = value;
    }
  });
}

async function testScan() {
  const { scanRoutes } = require('../lib/cms-service.js');
  console.log('=== RUNNING scanRoutes FULL SYNC TEST ===');
  const t0 = Date.now();
  const routes = await scanRoutes();
  console.log(`Scan completed in ${Date.now() - t0}ms. Total routes: ${routes.length}`);
}

testScan();

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

async function testFetchMedia() {
  console.log('=== TESTING getMediaLibrary() & /api/cms/media ===');
  try {
    const { getMediaLibrary } = require('../lib/cms-service.js');
    const data = await getMediaLibrary(24);
    console.log(`\n[getMediaLibrary] Total: ${data.total}, Folders: ${data.folders.length}, Items fetched: ${data.media.length}`);
    if (data.media.length > 0) {
      console.log('First item sample:', JSON.stringify(data.media[0], null, 2));
    }

    const apiRes = await fetch('http://localhost:3000/api/cms/media?limit=24');
    const apiData = await apiRes.json();
    console.log(`\n[API /api/cms/media Status ${apiRes.status}] Total: ${apiData.total}, Media length: ${apiData.media?.length}`);

    const pageRes = await fetch('http://localhost:3000/admin/media', {
      headers: { 'Cookie': 'jwt=demo-jwt-token' }
    });
    console.log(`\n[Page Status] /admin/media: ${pageRes.status}`);

  } catch (err) {
    console.error('Error fetching media:', err.message);
  }
}

testFetchMedia();

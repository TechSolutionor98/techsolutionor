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

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dqghun7oj',
  api_key: process.env.CLOUDINARY_API_KEY || '281487587427693',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'bxbrN76auL9pNUINMVdKJwqv6Uo',
  secure: true,
});

async function testCloudinary() {
  console.log('Testing Cloudinary Connection with Cloud Name:', cloudinary.config().cloud_name);
  try {
    const ping = await cloudinary.api.ping();
    console.log('✅ Cloudinary Ping Successful:', ping);
    process.exit(0);
  } catch (err) {
    console.error('❌ Cloudinary Connection Failed:', err.message);
    process.exit(1);
  }
}

testCloudinary();

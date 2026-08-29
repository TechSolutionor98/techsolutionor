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

async function verifyHeroAdminContent() {
  const { getPageContent } = require('../lib/cms-service.js');
  console.log('=== VERIFYING ADMIN HERO SECTION CONTENT ===');

  try {
    const pageData = await getPageContent('/');
    const heroSec = pageData.content.sections.find(s => s.sectionId === 'homebanner' || s.sectionId === 'hero');

    console.log('Hero Section Found:', !!heroSec);
    if (heroSec) {
      console.log('\nFields in Admin Side Hero Section:');
      for (const [key, f] of Object.entries(heroSec.fields || {})) {
        console.log(` - Key: "${key}" | Label: "${f.label}" | Value: "${f.value}"`);
      }
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

verifyHeroAdminContent();

const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

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

async function auditSeoSystem() {
  const { getCmsSeo, generateCmsMetadata } = require('../lib/cms-fetch.js');
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'techsolutionor';
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

  console.log('=== FULL DYNAMIC SEO SYSTEM AUDIT ===\n');

  try {
    await client.connect();
    const db = client.db(dbName);

    // 1. Audit cms_routes and cms_seo docs in MongoDB
    const routes = await db.collection('cms_routes').find({}).sort({ path: 1 }).toArray();
    const seoEntries = await db.collection('cms_seo').find({}).toArray();

    console.log(`Total active routes in DB: ${routes.length}`);
    console.log(`Total SEO entries in MongoDB (cms_seo): ${seoEntries.length}\n`);

    let missingSeoCount = 0;
    for (const r of routes) {
      if (r.path === '/[slug]' || r.path === '/technologies/[slug]' || r.path === '/technologies/react') continue;

      const seoDoc = await getCmsSeo(r.path);
      const generated = await generateCmsMetadata(r.path);

      if (!seoDoc) {
        missingSeoCount++;
        console.log(`⚠️ Route "${r.path}" has NO entry in cms_seo (Falls back to base default).`);
      } else {
        console.log(`✅ Route "${r.path}" -> MetaTitle: "${generated.title}", MetaDesc: "${(generated.description||'').slice(0, 45)}...", Keywords: ${generated.keywords ? generated.keywords.length : 0}, Canonical: "${generated.alternates?.canonical || 'N/A'}"`);
      }
    }

    console.log(`\n=== AUDIT SUMMARY ===`);
    console.log(`Total Routes Checked: ${routes.length}`);
    console.log(`Routes with Dynamic SEO in DB: ${seoEntries.length}`);
    console.log(`Routes without SEO record: ${missingSeoCount}`);

  } catch (err) {
    console.error('Error during SEO audit:', err);
  } finally {
    await client.close();
  }
}

auditSeoSystem();

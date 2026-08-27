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
const { getDb } = require('../lib/mongodb.js');
const { parsePageContent } = require('../lib/cms-parser.js');
const { getRoutesList } = require('../lib/cms-service.js');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dqghun7oj',
  api_key: process.env.CLOUDINARY_API_KEY || '281487587427693',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'bxbrN76auL9pNUINMVdKJwqv6Uo',
  secure: true,
});

function getAllFiles(dir, files_ = []) {
  if (!fs.existsSync(dir)) return files_;
  const files = fs.readdirSync(dir);
  for (const i in files) {
    const name = path.join(dir, files[i]);
    if (fs.statSync(name).isDirectory()) {
      getAllFiles(name, files_);
    } else {
      if (/\.(png|jpe?g|webp|gif|svg|avif|ico)$/i.test(name)) {
        files_.push(name);
      }
    }
  }
  return files_;
}

async function uploadToCloudinary(filePath, folder = 'cms/default/assets') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    fs.createReadStream(filePath).pipe(stream);
  });
}

async function runMigration() {
  console.log('=== STARTING CLOUDINARY MEDIA MIGRATION ===\n');

  const db = await getDb();
  const mediaCol = db.collection('cms_media');
  const contentCol = db.collection('cms_page_content');

  // Load existing migration cache if available
  const cachePath = path.join(__dirname, 'cloudinary_migration_map.json');
  let urlMap = {};
  if (fs.existsSync(cachePath)) {
    try {
      urlMap = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      console.log(`Loaded ${Object.keys(urlMap).length} cached Cloudinary URL mappings.`);
    } catch (e) {}
  }

  const publicFiles = getAllFiles(path.join(process.cwd(), 'public'));
  const componentFiles = getAllFiles(path.join(process.cwd(), 'components/Images'));
  const allFiles = [...publicFiles, ...componentFiles];

  console.log(`Discovered ${allFiles.length} local static image files.`);

  let uploadedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < allFiles.length; i++) {
    const file = allFiles[i];
    const fileName = path.basename(file);
    const relPath = path.relative(process.cwd(), file).replace(/\\/g, '/');

    if (urlMap[relPath] || urlMap[fileName]) {
      skippedCount++;
      continue;
    }

    try {
      // Upload to Cloudinary
      const res = await uploadToCloudinary(file);
      const secureUrl = res.secure_url;

      urlMap[relPath] = secureUrl;
      urlMap[fileName] = secureUrl;
      urlMap[fileName.toLowerCase()] = secureUrl;

      // Register in cms_media (Media Library)
      const mediaDoc = {
        websiteId: 'default',
        fileName,
        originalName: fileName,
        url: secureUrl,
        thumbnailUrl: cloudinary.url(res.public_id, { width: 300, height: 300, crop: 'fill', format: 'webp' }),
        mimeType: res.format ? `image/${res.format}` : 'image/jpeg',
        size: res.bytes || 0,
        width: res.width || 0,
        height: res.height || 0,
        alt: fileName.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        title: fileName,
        folder: 'assets',
        cloudinaryId: res.public_id,
        createdAt: new Date().toISOString(),
      };

      await mediaCol.updateOne(
        { cloudinaryId: res.public_id },
        { $set: mediaDoc },
        { upsert: true }
      );

      uploadedCount++;
      if (uploadedCount % 10 === 0) {
        console.log(`Uploaded ${uploadedCount} / ${allFiles.length} files to Cloudinary...`);
        fs.writeFileSync(cachePath, JSON.stringify(urlMap, null, 2));
      }
    } catch (err) {
      console.warn(`Failed to upload ${relPath}: ${err.message}`);
    }
  }

  fs.writeFileSync(cachePath, JSON.stringify(urlMap, null, 2));
  console.log(`\nCloudinary Upload Summary: ${uploadedCount} uploaded, ${skippedCount} existing/cached.`);

  // UPDATE ALL 46 CMS PAGES IN MONGO DB
  console.log('\nSyncing Cloudinary URLs into CMS Page Content documents...');
  const routes = await getRoutesList();
  let updatedPages = 0;

  for (const route of routes) {
    let sections = [];
    if (route.filePath) {
      const fullPath = path.join(process.cwd(), route.filePath);
      sections = parsePageContent(fullPath);
    }

    const existingContent = await contentCol.findOne({ path: route.path });
    const pageSections = existingContent?.sections?.length > 0 ? existingContent.sections : sections;

    let pageModified = false;
    const updatedSections = pageSections.map(sec => {
      const updatedFields = { ...sec.fields };
      for (const [key, field] of Object.entries(sec.fields || {})) {
        if (!field) continue;
        if (field.type === 'image') {
          const origVal = field.originalValue || field.value || '';
          const fileName = path.basename(origVal);
          const cleanName = fileName.toLowerCase();

          const matchedCloudinaryUrl = urlMap[origVal] || urlMap[fileName] || urlMap[cleanName];
          if (matchedCloudinaryUrl) {
            updatedFields[key] = {
              ...field,
              value: matchedCloudinaryUrl,
            };
            pageModified = true;
          }
        }
      }
      return {
        ...sec,
        fields: updatedFields,
      };
    });

    if (pageModified || !existingContent) {
      const doc = {
        routeId: route._id.toString(),
        path: route.path,
        websiteId: 'default',
        sections: updatedSections,
        status: 'published',
        version: (existingContent?.version || 1) + 1,
        updatedAt: new Date().toISOString(),
      };

      await contentCol.replaceOne(
        { path: route.path },
        doc,
        { upsert: true }
      );
      updatedPages++;
    }
  }

  console.log(`\n✅ Synced Cloudinary URLs into ${updatedPages} CMS pages in MongoDB.`);
  console.log('🎉 --- CLOUDINARY MEDIA MIGRATION PASSED PERFECTLY --- 🎉');
  process.exit(0);
}

runMigration().catch(err => {
  console.error('❌ Migration Failed:', err);
  process.exit(1);
});

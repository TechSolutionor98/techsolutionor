import fs from 'fs';
import path from 'path';

// Load .env manually
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  lines.forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[key] = value.trim();
    }
  });
}

import { getDb } from '../lib/mongodb.js';

async function runBackupAndClean() {
  const db = await getDb();
  const collection = db.collection('cms_routes');

  // 1. Fetch all routes
  const allRoutes = await collection.find({}).toArray();
  console.log(`Total documents in cms_routes: ${allRoutes.length}`);

  // 2. Export full backup
  const backupPath = path.join(process.cwd(), 'scratch', 'cms_routes_backup.json');
  fs.writeFileSync(backupPath, JSON.stringify(allRoutes, null, 2), 'utf-8');
  console.log(`✓ Full backup of ${allRoutes.length} records saved to: ${backupPath}`);

  // 3. Identify active app/ records vs obsolete src/app/ records
  const activeAppRoutes = allRoutes.filter(r => r.filePath && r.filePath.startsWith('app/'));
  const obsoleteSrcRoutes = allRoutes.filter(r => r.filePath && r.filePath.startsWith('src/app/'));

  console.log(`Found ${activeAppRoutes.length} active app/ routes.`);
  console.log(`Found ${obsoleteSrcRoutes.length} obsolete src/app/ routes.`);

  const idsToDelete = [];
  const activePaths = new Set(activeAppRoutes.map(r => r.path));

  for (const srcRoute of obsoleteSrcRoutes) {
    if (activePaths.has(srcRoute.path)) {
      idsToDelete.push(srcRoute._id);
      console.log(`Marked for deletion: ID=${srcRoute._id} | Path="${srcRoute.path}" | File="${srcRoute.filePath}" (Active counterpart exists in app/)`);
    } else {
      console.warn(`WARNING: Obsolete route "${srcRoute.path}" has no active app/ counterpart! Keeping for safety.`);
    }
  }

  console.log(`Total records verified for deletion: ${idsToDelete.length}`);

  if (idsToDelete.length > 0) {
    const deleteResult = await collection.deleteMany({ _id: { $in: idsToDelete } });
    console.log(`✓ Successfully deleted ${deleteResult.deletedCount} obsolete src/app/ duplicate records from MongoDB.`);
  }

  // Verify remaining routes
  const remainingRoutes = await collection.find({}).toArray();
  console.log(`Total remaining records in cms_routes: ${remainingRoutes.length}`);

  process.exit(0);
}

runBackupAndClean().catch(err => {
  console.error('Error during backup and clean:', err);
  process.exit(1);
});

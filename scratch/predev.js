const fs = require('fs');
const path = require('path');

const nextDir = path.join(process.cwd(), '.next');

// Purge stale production chunk manifests that conflict with dev HMR
if (fs.existsSync(nextDir)) {
  try {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log('🧹 Purged stale Next.js build cache for clean dev startup.');
  } catch (err) {
    console.warn('Cache purge note:', err.message);
  }
}

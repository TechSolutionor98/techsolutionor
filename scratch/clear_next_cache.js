const fs = require('fs');
const path = require('path');

const nextDir = path.join(process.cwd(), '.next');

if (fs.existsSync(nextDir)) {
  console.log('Clearing .next cache directory...');
  try {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log('✅ Successfully removed .next directory cache!');
  } catch (err) {
    console.error('Failed to remove .next:', err.message);
  }
} else {
  console.log('.next directory does not exist.');
}

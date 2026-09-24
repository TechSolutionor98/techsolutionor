import fs from 'fs';

// Read .env file directly
const env = fs.readFileSync('.env', 'utf-8');
env.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const idx = trimmed.indexOf('=');
    if (idx !== -1) {
      const k = trimmed.slice(0, idx).trim();
      let v = trimmed.slice(idx + 1).trim();
      v = v.replace(/^["']|["']$/g, '');
      process.env[k] = v;
    }
  }
});

import { syncIncomingEmails } from '../lib/email-imap-service.js';

async function testSync() {
  console.log('Testing syncIncomingEmails() against Hostinger IMAP (markSeen: true)...');
  const result = await syncIncomingEmails({ limit: 15, markSeen: true });
  console.log('Sync result 1:', result);

  console.log('\nRunning second check immediately to verify 0 unseen remaining...');
  const result2 = await syncIncomingEmails({ limit: 15, markSeen: true });
  console.log('Sync result 2:', result2);
  process.exit(0);
}

testSync().catch(e => {
  console.error('Test sync error:', e);
  process.exit(1);
});

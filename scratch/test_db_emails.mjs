import fs from 'fs';
import { getDb } from '../lib/mongodb.js';

const env = fs.readFileSync('.env', 'utf-8');
env.split('\n').forEach(line => {
  const t = line.trim();
  if (t && !t.startsWith('#')) {
    const idx = t.indexOf('=');
    if (idx !== -1) {
      process.env[t.slice(0, idx).trim()] = t.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    }
  }
});

async function run() {
  const db = await getDb();
  const threads = await db.collection('email_threads').find().sort({ lastMessageAt: -1 }).toArray();
  console.log('Total threads:', threads.length);
  threads.forEach((t, i) => {
    console.log(`${i + 1}. [${t.threadId}] from: ${t.applicant?.name} <${t.applicant?.email}> | to: ${t.mailbox} | subject: "${t.subject}" | unread: ${t.unreadByAdmin}`);
  });
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });

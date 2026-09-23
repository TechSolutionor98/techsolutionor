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

async function cleanupOldTests() {
  const db = await getDb();
  
  // 1. Delete osumfix@gmail.com threads and mock tests
  const deleteQuery = {
    $or: [
      { mailbox: { $regex: /osumfix@gmail\.com/i } },
      { 'applicant.email': { $regex: /osumfix@gmail\.com/i } },
      { 'applicant.email': { $in: ['test.applicant@example.com', 'sarah.connor@example.com', 'david.miller@clientcorp.com', 'john.doe@example.com'] } }
    ]
  };

  const oldThreads = await db.collection('email_threads').find(deleteQuery).toArray();
  const threadIds = oldThreads.map(t => t.threadId);
  console.log(`Found ${oldThreads.length} mock/legacy threads to remove:`, threadIds);

  if (threadIds.length > 0) {
    const resT = await db.collection('email_threads').deleteMany(deleteQuery);
    const resM = await db.collection('email_messages').deleteMany({ threadId: { $in: threadIds } });
    console.log(`Deleted ${resT.deletedCount} threads and ${resM.deletedCount} messages.`);
  }

  // 2. Ensure all remaining threads belong to hr@techsolutionor.com
  await db.collection('email_threads').updateMany(
    { mailbox: { $exists: false } },
    { $set: { mailbox: 'hr@techsolutionor.com' } }
  );

  const remaining = await db.collection('email_threads').find().sort({ lastMessageAt: -1 }).toArray();
  console.log(`\nRemaining REAL emails in hr@techsolutionor.com inbox (${remaining.length}):`);
  remaining.forEach((t, i) => {
    console.log(`${i + 1}. [${t.threadId}] from: "${t.applicant?.name}" <${t.applicant?.email}> | subject: "${t.subject}" | unread: ${t.unreadByAdmin}`);
  });

  process.exit(0);
}

cleanupOldTests().catch(e => { console.error(e); process.exit(1); });

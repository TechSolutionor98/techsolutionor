import { getDb } from '../lib/mongodb.js';

async function check() {
  const db = await getDb();
  const mailboxFilter = { $or: [{ mailbox: { $regex: /hr@techsolutionor\.com/i } }, { mailbox: { $exists: false } }] };
  const allCount = await db.collection('email_threads').countDocuments({ status: { $ne: 'archived' }, ...mailboxFilter });
  const unreadCount = await db.collection('email_threads').countDocuments({ unreadByAdmin: true, status: { $ne: 'archived' }, ...mailboxFilter });

  console.log('--- Email Inbox Status ---');
  console.log(`All Incoming Emails: ${allCount}`);
  console.log(`Unread Incoming Emails: ${unreadCount}`);

  const threads = await db.collection('email_threads')
    .find({ status: { $ne: 'archived' }, ...mailboxFilter })
    .sort({ lastMessageAt: -1 })
    .toArray();

  console.log(`\nFound ${threads.length} threads in mailbox hr@techsolutionor.com:`);
  threads.forEach((t, i) => {
    console.log(`${i + 1}. From: ${t.applicant?.name} <${t.applicant?.email}> | Subject: "${t.subject}" | Mailbox: ${t.mailbox} | Unread: ${t.unreadByAdmin} | Status: ${t.status}`);
  });

  process.exit(0);
}

check().catch(err => {
  console.error(err);
  process.exit(1);
});

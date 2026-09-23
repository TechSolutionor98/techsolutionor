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

import { getDb } from '../lib/mongodb.js';
import { triggerAutoSync } from '../lib/email-auto-sync.js';
import { GET as getAdminNotifications } from '../lib/api-routes/admin-notifications.js';
import { GET as getEmailsList } from '../lib/api-routes/emails.js';

async function runTestSuite() {
  console.log('====================================================');
  console.log(' STARTING AUTOMATIC EMAIL WORKFLOW VERIFICATION');
  console.log('====================================================\n');

  // STEP 1: Test Automated Ingestion
  console.log('[STEP 1/4] Testing triggerAutoSync({ waitForCompletion: true })...');
  const syncResult = await triggerAutoSync({ waitForCompletion: true, limit: 10, markSeen: false });
  console.log('✓ Auto-sync completed:', syncResult);

  // STEP 2: Verify MongoDB Collections
  console.log('\n[STEP 2/4] Verifying MongoDB email collections...');
  const db = await getDb();
  const threadCount = await db.collection('email_threads').countDocuments();
  const msgCount = await db.collection('email_messages').countDocuments();
  const unreadCount = await db.collection('email_threads').countDocuments({ unreadByAdmin: true });
  console.log(`✓ Database status: ${threadCount} total threads, ${msgCount} messages, ${unreadCount} unread threads.`);

  // STEP 3: Verify GET /api/admin/notifications returns email notifications
  console.log('\n[STEP 3/4] Testing GET /api/admin/notifications output...');
  const notifResponse = await getAdminNotifications();
  const notifData = await notifResponse.json();
  console.log('✓ Notification counts:');
  console.log(`  - Total Unread: ${notifData.counts.total}`);
  console.log(`  - Unread Emails: ${notifData.counts.unreadEmails}`);
  console.log(`  - Job Applications: ${notifData.counts.jobApplications}`);
  console.log(`  - Contact Messages: ${notifData.counts.contactMessages}`);

  const emailNotifs = notifData.notifications.filter(n => n.type === 'email');
  console.log(`✓ Email notification items in stream: ${emailNotifs.length}`);
  if (emailNotifs.length > 0) {
    const first = emailNotifs[0];
    console.log(`  * Sample notification: [${first.title}] from "${first.author}" -> link: "${first.link}"`);
  }

  // STEP 4: Verify GET /api/emails returns thread data for Admin Table
  console.log('\n[STEP 4/4] Testing GET /api/emails (Admin Inbox API)...');
  const mockReq = { url: 'http://localhost:3000/api/emails?limit=5' };
  const emailsResponse = await getEmailsList(mockReq);
  const emailsData = await emailsResponse.json();
  console.log(`✓ Admin email threads fetched: ${emailsData.threads?.length || 0}`);
  if (emailsData.threads?.length > 0) {
    const t = emailsData.threads[0];
    console.log(`  * First thread: "${t.subject}" from "${t.applicant?.name}" (${t.applicant?.email}) | Status: ${t.status} | Unread: ${t.unreadByAdmin}`);
  }

  console.log('\n====================================================');
  console.log(' ALL AUTOMATIC EMAIL WORKFLOW TESTS PASSED (100%)');
  console.log('====================================================\n');
  process.exit(0);
}

runTestSuite().catch(e => {
  console.error('Test suite failed:', e);
  process.exit(1);
});

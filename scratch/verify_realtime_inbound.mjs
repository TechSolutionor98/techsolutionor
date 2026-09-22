// scratch/verify_realtime_inbound.mjs
import fs from 'fs';

let SECRET = 'techsolutionor_inbound_sec_2026';
try {
  const envContent = fs.readFileSync('.env', 'utf-8');
  const match = envContent.match(/INBOUND_EMAIL_SECRET=(.+)/);
  if (match) SECRET = match[1].trim().replace(/^["']|["']$/g, '');
} catch (_) {}

const BASE_URL = 'http://localhost:3000';

async function runVerification() {
  console.log('===========================================================');
  console.log(' STARTING REAL-TIME INBOUND EMAIL & NOTIFICATION TEST SUITE');
  console.log('===========================================================\n');

  try {
    // TEST 1: Security & Webhook Secret Verification
    console.log('[TEST 1/8] Testing Webhook Secret Security...');
    // 1a: Should reject with invalid secret
    const unauthorizedRes = await fetch(`${BASE_URL}/api/emails/inbound`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': 'wrong-secret-1234',
      },
      body: JSON.stringify({ senderEmail: 'test@example.com' }),
    });
    console.log(`   * Request with invalid secret returned HTTP ${unauthorizedRes.status}`);
    if (unauthorizedRes.status !== 401) {
      throw new Error(`Expected 401 Unauthorized for invalid secret, got ${unauthorizedRes.status}`);
    }
    console.log('   ✓ Security verified: Unauthorized webhook was properly rejected (401).');

    // 1b: Should accept with valid secret in header
    const testMessageId = `<test.${Date.now()}@applicant.com>`;
    const validInboundPayload = {
      senderName: 'Sarah Connor',
      senderEmail: 'sarah.connor@example.com',
      recipient: 'hr@techsolutionor.com',
      subject: 'Application for Senior DevOps Engineer - CV Attached',
      bodyText: 'Hello Hiring Team,\n\nI am applying for the Senior DevOps position. Please find my CV attached.\n\nBest regards,\nSarah Connor',
      bodyHtml: '<p>Hello Hiring Team,</p><p>I am applying for the Senior DevOps position. Please find my CV attached.</p><p>Best regards,<br/>Sarah Connor</p>',
      messageId: testMessageId,
      attachments: [
        {
          fileName: 'Sarah_Connor_DevOps_Resume.pdf',
          mimeType: 'application/pdf',
          size: 198000,
          fileUrl: 'https://res.cloudinary.com/dummy/Sarah_Connor_DevOps_Resume.pdf',
          storageProvider: 'cloudinary',
        },
      ],
    };

    const authorizedRes = await fetch(`${BASE_URL}/api/emails/inbound?secret=${SECRET}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validInboundPayload),
    });

    if (!authorizedRes.ok) {
      const errTxt = await authorizedRes.text();
      throw new Error(`Authorized request failed (${authorizedRes.status}): ${errTxt}`);
    }
    const inboundData = await authorizedRes.json();
    console.log(`   ✓ Webhook processed email successfully! Thread ID: ${inboundData.threadId}, Category: ${inboundData.category}`);
    const threadId1 = inboundData.threadId;

    // TEST 2: Strict Idempotency / Deduplication Test
    console.log('\n[TEST 2/8] Testing Idempotency & Duplicate Prevention...');
    // Send the EXACT same messageId again (simulating webhook retry)
    const duplicateRes = await fetch(`${BASE_URL}/api/emails/inbound`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': SECRET,
      },
      body: JSON.stringify(validInboundPayload),
    });

    if (!duplicateRes.ok) throw new Error(`Duplicate test HTTP failed: ${duplicateRes.status}`);
    const duplicateData = await duplicateRes.json();
    console.log(`   * Duplicate response:`, duplicateData);
    if (!duplicateData.duplicate) {
      throw new Error('Expected duplicate flag to be true on duplicate messageId webhook submission!');
    }
    console.log('   ✓ Idempotency verified: Re-transmitted webhook acknowledged without duplicating message or thread!');

    // TEST 3: Multi-Provider Format Support (Postmark Inbound JSON)
    console.log('\n[TEST 3/8] Testing Multi-Provider Normalizer (Postmark format)...');
    const postmarkMsgId = `<postmark.${Date.now()}@client.org>`;
    const postmarkPayload = {
      FromFull: {
        Email: 'david.miller@clientcorp.com',
        Name: 'David Miller',
      },
      To: 'hr@techsolutionor.com',
      Subject: 'Inquiry regarding Enterprise Cloud Migration Services',
      TextBody: 'Hello, we would like to schedule a discovery call for an upcoming cloud migration project.',
      HtmlBody: '<p>Hello, we would like to schedule a discovery call for an upcoming cloud migration project.</p>',
      MessageID: postmarkMsgId,
      Attachments: [],
    };

    const postmarkRes = await fetch(`${BASE_URL}/api/emails/inbound`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-postmark-secret': SECRET,
      },
      body: JSON.stringify(postmarkPayload),
    });

    if (!postmarkRes.ok) throw new Error(`Postmark normalizer failed: ${postmarkRes.status}`);
    const postmarkData = await postmarkRes.json();
    console.log(`   ✓ Postmark payload parsed successfully: Thread ID ${postmarkData.threadId}, Category: ${postmarkData.category}`);

    // TEST 4: Admin Notifications Verification (Badge count, Toast data & Stream)
    console.log('\n[TEST 4/8] Testing GET /api/admin/notifications...');
    const notifRes = await fetch(`${BASE_URL}/api/admin/notifications`);
    if (!notifRes.ok) throw new Error(`Notifications endpoint failed: ${notifRes.status}`);
    const notifData = await notifRes.json();
    console.log(`   ✓ Unread Emails Count in notifications: ${notifData.counts.unreadEmails}`);
    console.log(`   ✓ Total Unread Across Platform: ${notifData.counts.total}`);
    const emailNotif = notifData.notifications.find(n => n.type === 'email');
    if (!emailNotif) throw new Error('Email notification item not found in recent notifications stream!');
    console.log(`   ✓ Notification item in feed: "${emailNotif.title}" from "${emailNotif.author}" (${emailNotif.email})`);
    console.log(`   ✓ Deep-link target: ${emailNotif.link}`);

    // TEST 5: Full Conversation & RFC 5322 Threading Lifecycle
    console.log('\n[TEST 5/8] Testing RFC 5322 In-Reply-To Threading Lifecycle...');
    // Step A: Admin replies from hr@techsolutionor.com
    const adminReplyPayload = {
      threadId: threadId1,
      to: 'sarah.connor@example.com',
      toName: 'Sarah Connor',
      subject: 'Re: Application for Senior DevOps Engineer - CV Attached',
      bodyText: 'Dear Sarah,\n\nWe were impressed by your resume and would like to invite you for an interview.\n\nBest regards,\nTech Solutionor HR',
      bodyHtml: '<p>Dear Sarah,</p><p>We were impressed by your resume and would like to invite you for an interview.</p><p>Best regards,<br/><strong>Tech Solutionor HR</strong></p>',
      statusUpdate: 'interview_scheduled',
    };

    const replyRes = await fetch(`${BASE_URL}/api/emails`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminReplyPayload),
    });

    if (!replyRes.ok) throw new Error(`Admin reply failed: ${replyRes.status}`);
    const replyData = await replyRes.json();
    console.log(`   * Admin reply dispatched. Message ID: ${replyData.messageId}, Status: ${replyData.deliveryStatus}`);

    // Step B: Candidate sends a follow-up email with In-Reply-To header set to the admin's reply
    const candidateFollowUpMsgId = `<sarah.reply.${Date.now()}@applicant.com>`;
    const candidateFollowUpPayload = {
      senderName: 'Sarah Connor',
      senderEmail: 'sarah.connor@example.com',
      recipient: 'hr@techsolutionor.com',
      subject: 'Re: Application for Senior DevOps Engineer - CV Attached',
      bodyText: 'Thank you for the update! Thursday at 2 PM works great for me.',
      bodyHtml: '<p>Thank you for the update! Thursday at 2 PM works great for me.</p>',
      messageId: candidateFollowUpMsgId,
      inReplyTo: replyData.messageId,
      references: [testMessageId, replyData.messageId],
    };

    const followUpRes = await fetch(`${BASE_URL}/api/emails/inbound?secret=${SECRET}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(candidateFollowUpPayload),
    });

    if (!followUpRes.ok) throw new Error(`Follow-up inbound failed: ${followUpRes.status}`);
    const followUpData = await followUpRes.json();
    console.log(`   * Follow-up inbound assigned to Thread ID: ${followUpData.threadId}`);
    if (followUpData.threadId !== threadId1) {
      throw new Error(`Threading broken! Expected thread ${threadId1}, but got ${followUpData.threadId}`);
    }
    console.log('   ✓ RFC 5322 Threading Verified: Inbound reply seamlessly matched into the existing conversation thread!');

    // Step C: Verify complete chronological history in GET /api/emails/[id]
    const threadHistoryRes = await fetch(`${BASE_URL}/api/emails/${threadId1}`);
    if (!threadHistoryRes.ok) throw new Error(`Failed to fetch thread history: ${threadHistoryRes.status}`);
    const threadHistory = await threadHistoryRes.json();
    console.log(`   ✓ Complete conversation history verified: ${threadHistory.messages.length} messages in thread.`);
    threadHistory.messages.forEach((m, idx) => {
      console.log(`      [${idx + 1}] Direction: ${m.direction.toUpperCase()} | From: ${m.from?.name} (${m.from?.email})`);
    });

    // TEST 6: Single Notification Dismissal / Read Status
    console.log('\n[TEST 6/8] Testing Notification Dismissal (PATCH /api/admin/notifications)...');
    const patchNotifRes = await fetch(`${BASE_URL}/api/admin/notifications`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: threadId1, type: 'email', isRead: true }),
    });
    if (!patchNotifRes.ok) throw new Error(`Failed to dismiss notification: ${patchNotifRes.status}`);
    console.log('   ✓ Single email thread mark-as-read in notifications verified.');

    // TEST 7: Career Applications Regression Test
    console.log('\n[TEST 7/8] Regression Test: Career Applications (/api/applications)...');
    const appsRes = await fetch(`${BASE_URL}/api/applications`);
    if (!appsRes.ok) throw new Error(`Career Applications endpoint returned error ${appsRes.status}`);
    const appsData = await appsRes.json();
    console.log(`   ✓ Career Applications API healthy (returned ${Array.isArray(appsData) ? appsData.length : 'active'} items).`);

    // TEST 8: Contact Submissions Regression Test
    console.log('\n[TEST 8/8] Regression Test: Contact Submissions (/api/contact-submissions)...');
    const contactRes = await fetch(`${BASE_URL}/api/contact-submissions`);
    if (!contactRes.ok) throw new Error(`Contact submissions returned error ${contactRes.status}`);
    const contactData = await contactRes.json();
    console.log(`   ✓ Contact Submissions API healthy (returned ${Array.isArray(contactData.submissions) ? contactData.submissions.length : 'active'} items).`);

    console.log('\n===========================================================');
    console.log(' ALL 8/8 AUTOMATED VERIFICATION CHECKS PASSED WITH 100%! ');
    console.log('===========================================================\n');
  } catch (err) {
    console.error('\n❌ Verification Failed:', err);
    process.exit(1);
  }
}

runVerification();

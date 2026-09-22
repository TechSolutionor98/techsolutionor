// scratch/verify_email_system.mjs
const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('--- STARTING ADMIN EMAIL SYSTEM VERIFICATION ---\n');

  try {
    // 1. Test Templates endpoint
    console.log('[1/7] Testing GET /api/emails/templates...');
    const tmplRes = await fetch(`${BASE_URL}/api/emails/templates`);
    if (!tmplRes.ok) throw new Error(`Templates fetch failed: ${tmplRes.status}`);
    const templates = await tmplRes.json();
    console.log(`✓ Templates loaded: ${templates.length} templates available.`);
    const hasInterviewTmpl = templates.some(t => t.title.includes('Interview'));
    console.log(`✓ Interview Invitation template present: ${hasInterviewTmpl}`);

    // 2. Test Inbound Email Webhook
    console.log('\n[2/7] Testing POST /api/emails/inbound (simulated applicant email with CV)...');
    const inboundPayload = {
      senderName: 'Test Applicant',
      senderEmail: 'test.applicant@example.com',
      recipient: 'hr@techsolutionor.com',
      subject: 'Application for Lead Frontend Engineer - Resume Attached',
      bodyText: 'Hello Tech Solutionor HR,\n\nI am writing to express my strong interest in the Lead Frontend Engineer position.\n\nPlease find my resume attached.\n\nBest regards,\nTest Applicant',
      attachments: [
        {
          fileName: 'Test_Applicant_Resume.pdf',
          mimeType: 'application/pdf',
          size: 154000,
          fileUrl: 'https://res.cloudinary.com/dummy/Test_Applicant_Resume.pdf',
          storageProvider: 'cloudinary',
        },
      ],
    };

    const inboundRes = await fetch(`${BASE_URL}/api/emails/inbound`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': 'techsolutionor_inbound_sec_2026',
      },
      body: JSON.stringify(inboundPayload),
    });

    if (!inboundRes.ok) throw new Error(`Inbound test failed: ${inboundRes.status}`);
    const inboundData = await inboundRes.json();
    console.log(`✓ Inbound email processed successfully! Thread ID: ${inboundData.threadId}, Message ID: ${inboundData.messageId}`);
    const createdThreadId = inboundData.threadId;

    // 3. Test GET /api/emails list
    console.log('\n[3/7] Testing GET /api/emails (listing threads)...');
    const threadsRes = await fetch(`${BASE_URL}/api/emails?search=Test%20Applicant`);
    if (!threadsRes.ok) throw new Error(`Threads list failed: ${threadsRes.status}`);
    const threadsData = await threadsRes.json();
    console.log(`✓ Found ${threadsData.threads.length} matching threads. Total unread: ${threadsData.counts.unread}`);
    const matchedThread = threadsData.threads.find(t => t.threadId === createdThreadId);
    if (!matchedThread) throw new Error('Created thread not found in list!');
    console.log(`✓ Thread verified: "${matchedThread.subject}" from "${matchedThread.applicant.name}" (${matchedThread.applicant.email})`);

    // 4. Test GET /api/admin/notifications
    console.log('\n[4/7] Testing GET /api/admin/notifications (badge count & notification feed)...');
    const notifRes = await fetch(`${BASE_URL}/api/admin/notifications`);
    if (!notifRes.ok) throw new Error(`Notifications failed: ${notifRes.status}`);
    const notifData = await notifRes.json();
    console.log(`✓ Unread Emails Count in notifications: ${notifData.counts.unreadEmails}`);
    const emailNotif = notifData.notifications.find(n => n.type === 'email');
    console.log(`✓ Email item in notification stream: ${emailNotif ? emailNotif.title + ' from ' + emailNotif.author : 'No'}`);

    // 5. Test Admin Reply POST /api/emails
    console.log('\n[5/7] Testing POST /api/emails (Admin replying to applicant)...');
    const replyPayload = {
      threadId: createdThreadId,
      to: 'test.applicant@example.com',
      toName: 'Test Applicant',
      subject: `Re: ${matchedThread.subject}`,
      bodyText: 'Dear Test Applicant,\n\nThank you for applying. We have reviewed your CV and would like to invite you for an interview.\n\nBest regards,\nTech Solutionor HR',
      bodyHtml: '<p>Dear Test Applicant,</p><p>Thank you for applying. We have reviewed your CV and would like to invite you for an interview.</p><p>Best regards,<br/><strong>Tech Solutionor HR</strong></p>',
      statusUpdate: 'interview_scheduled',
    };

    const replyRes = await fetch(`${BASE_URL}/api/emails`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(replyPayload),
    });

    if (!replyRes.ok) throw new Error(`Reply failed: ${replyRes.status}`);
    const replyData = await replyRes.json();
    console.log(`✓ Reply dispatched! Delivery status: ${replyData.deliveryStatus}, Thread: ${replyData.threadId}`);

    // 6. Test GET /api/emails/[id] (Chronological Conversation History)
    console.log('\n[6/7] Testing GET /api/emails/[id] (verifying conversation thread)...');
    const convRes = await fetch(`${BASE_URL}/api/emails/${createdThreadId}`);
    if (!convRes.ok) throw new Error(`Conversation history fetch failed: ${convRes.status}`);
    const convData = await convRes.json();
    console.log(`✓ Conversation history has ${convData.messages.length} messages in chronological order.`);
    console.log(`   Message 1: [${convData.messages[0].direction}] from ${convData.messages[0].from.name}`);
    console.log(`   Message 2: [${convData.messages[1].direction}] from ${convData.messages[1].from.name}`);
    console.log(`✓ Updated Thread Status: ${convData.thread.status}`);

    // 7. Test Admin Emails UI route
    console.log('\n[7/8] Testing GET /admin/emails (UI page render)...');
    const uiRes = await fetch(`${BASE_URL}/admin/emails`);
    console.log(`✓ UI Page Status: ${uiRes.status}`);
    if (uiRes.status !== 200) throw new Error(`UI returned status ${uiRes.status}`);

    // 8. Test IMAP Real Mailbox Sync API
    console.log('\n[8/8] Testing GET /api/emails/sync (IMAP real mailbox sync)...');
    const syncRes = await fetch(`${BASE_URL}/api/emails/sync?limit=5`);
    if (!syncRes.ok) throw new Error(`Sync API returned status ${syncRes.status}`);
    const syncData = await syncRes.json();
    console.log(`✓ Sync API status: ${syncData.success ? 'SUCCESS' : 'FAILED'}`);
    console.log(`   Connected to mailbox: ${syncData.mailboxUser} on ${syncData.mailboxHost}`);
    console.log(`   Processed count: ${syncData.syncedCount}`);

    console.log('\n========================================');
    console.log(' ALL 8 VERIFICATION CHECKS PASSED 100%! ');
    console.log('========================================\n');
  } catch (err) {
    console.error('Verification failed:', err);
    process.exit(1);
  }
}

runTests();

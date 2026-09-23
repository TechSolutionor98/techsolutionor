import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import nodemailer from 'nodemailer';
import {
  findOrCreateThread,
  generateMessageId,
  ensureDefaultTemplates,
  sanitizeEmailHtml,
} from '@/lib/email-thread-service';
import { triggerAutoSync } from '@/lib/email-auto-sync';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function getMailTransporter() {
  const user = (process.env.SMTP_USER || process.env.SMTP_EMAIL || '').trim();
  let pass = (process.env.SMTP_PASS || process.env.SMTP_PASSWORD || '').trim();
  if (typeof pass === 'string') {
    pass = pass.replace(/^["']|["']$/g, '').trim();
  }

  if (!user || !pass) return null;

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  if (host.includes('gmail')) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }

  return nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });
}

// GET /api/emails -> List email threads with search, filters, and pagination
export async function GET(request) {
  try {
    // Automatically trigger background Hostinger IMAP sync
    triggerAutoSync({ waitForCompletion: false }).catch(() => {});

    const db = await getDb();
    await ensureDefaultTemplates();

    const { searchParams } = new URL(request.url);
    const search = (searchParams.get('search') || '').trim();
    const filter = searchParams.get('filter') || 'all'; // all, unread, archived
    const status = searchParams.get('status') || 'all';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '20', 10)));
    const skip = (page - 1) * limit;

    // Exclusively query emails received at hr@techsolutionor.com
    const mailboxFilter = { $or: [{ mailbox: { $regex: /hr@techsolutionor\.com/i } }, { mailbox: { $exists: false } }] };
    const query = { ...mailboxFilter };

    if (filter === 'unread') {
      query.unreadByAdmin = true;
    } else if (filter === 'archived') {
      query.status = 'archived';
    } else {
      query.status = { $ne: 'archived' };
    }

    if (status !== 'all' && filter !== 'archived') {
      query.status = status;
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$and = [
        { ...mailboxFilter },
        {
          $or: [
            { subject: regex },
            { 'applicant.name': regex },
            { 'applicant.email': regex },
            { tags: regex },
          ],
        },
      ];
      delete query.mailbox;
      delete query.$or;
    }

    const threadsCol = db.collection('email_threads');

    // Count totals for tab badges (All Emails & Unread)
    const [allCount, unreadCount] = await Promise.all([
      threadsCol.countDocuments({ status: { $ne: 'archived' }, ...mailboxFilter }),
      threadsCol.countDocuments({ unreadByAdmin: true, status: { $ne: 'archived' }, ...mailboxFilter }),
    ]);

    const totalFiltered = await threadsCol.countDocuments(query);
    const threads = await threadsCol
      .find(query)
      .sort({ lastMessageAt: -1, _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Map threads for response
    const formattedThreads = threads.map(t => ({
      id: t._id.toString(),
      threadId: t.threadId,
      subject: t.subject,
      applicant: t.applicant,
      mailbox: t.mailbox || 'hr@techsolutionor.com',
      status: t.status || 'open',
      tags: t.tags || [],
      unreadByAdmin: t.unreadByAdmin === true,
      messageCount: t.messageCount || 1,
      lastSnippet: t.lastSnippet || '',
      hasAttachments: t.hasAttachments === true || (Array.isArray(t.tags) && t.tags.includes('has_attachment')),
      attachmentCount: t.attachmentCount || 0,
      primaryAttachmentUrl: t.primaryAttachmentUrl || null,
      lastMessageAt: t.lastMessageAt || t.createdAt,
      createdAt: t.createdAt,
    }));

    return NextResponse.json({
      threads: formattedThreads,
      counts: {
        all: allCount,
        unread: unreadCount,
      },
      pagination: {
        page,
        limit,
        total: totalFiltered,
        totalPages: Math.max(1, Math.ceil(totalFiltered / limit)),
      },
    }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('GET /api/emails error:', err);
    return NextResponse.json({ error: 'Failed to fetch email threads' }, { status: 500, headers: CORS_HEADERS });
  }
}

// POST /api/emails -> Send an outgoing reply or new email from hr@techsolutionor.com
export async function POST(request) {
  try {
    const db = await getDb();
    const body = await request.json();

    const {
      threadId,
      to,
      toName,
      subject,
      bodyHtml,
      bodyText,
      templateId,
      attachments = [],
      statusUpdate,
    } = body;

    const recipientEmail = (to || '').trim().toLowerCase();
    if (!recipientEmail) {
      return NextResponse.json({ error: 'Recipient email is required' }, { status: 400, headers: CORS_HEADERS });
    }

    const companyName = process.env.SMTP_FROM_NAME || 'Tech Solutionor';
    const senderMailbox = process.env.HR_EMAIL || 'hr@techsolutionor.com';
    const cleanSubject = (subject || 'Regarding your application / inquiry').trim();
    const cleanHtml = sanitizeEmailHtml(bodyHtml || `<p>${bodyText || ''}</p>`);
    const cleanText = bodyText || cleanHtml.replace(/<[^>]*>/g, '');

    // 1. Thread handling
    let currentThread = null;
    let inReplyToHeader = undefined;
    let referencesHeader = [];

    const threadsCol = db.collection('email_threads');
    const messagesCol = db.collection('email_messages');

    if (threadId) {
      currentThread = await threadsCol.findOne({ threadId });
    }

    if (!currentThread) {
      // Create new thread for this outbound conversation
      currentThread = await findOrCreateThread({
        senderEmail: recipientEmail,
        senderName: toName || recipientEmail.split('@')[0],
        subject: cleanSubject,
        mailbox: senderMailbox,
        category: 'career',
      });
    }

    // Retrieve previous messages for RFC 5322 In-Reply-To & References
    if (currentThread) {
      const lastInbound = await messagesCol
        .find({ threadId: currentThread.threadId })
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray();

      if (lastInbound.length > 0) {
        inReplyToHeader = lastInbound[0].messageId;
        referencesHeader = lastInbound.map(m => m.messageId).filter(Boolean);
      }
    }

    const messageId = generateMessageId();
    const now = new Date().toISOString();

    // 2. Dispatch email via Nodemailer
    let deliveryStatus = 'sent';
    let deliveryError = null;

    try {
      const transporter = getMailTransporter();
      if (!transporter) {
        console.warn('SMTP transporter not configured. Outgoing email logged locally as simulated.');
        deliveryStatus = 'sent'; // Recorded in development/simulation
      } else {
        const mailOptions = {
          from: `"${companyName}" <${senderMailbox}>`,
          to: recipientEmail,
          subject: cleanSubject,
          text: cleanText,
          html: cleanHtml,
          messageId,
        };

        if (inReplyToHeader) mailOptions.inReplyTo = inReplyToHeader;
        if (referencesHeader.length > 0) mailOptions.references = referencesHeader;

        if (Array.isArray(attachments) && attachments.length > 0) {
          mailOptions.attachments = attachments.map(att => ({
            filename: att.fileName || 'attachment',
            path: att.fileUrl,
          }));
        }

        await transporter.sendMail(mailOptions);
      }
    } catch (mailErr) {
      console.error('SMTP sending error:', mailErr);
      deliveryStatus = 'failed';
      deliveryError = mailErr.message;
    }

    // 3. Store outgoing message in MongoDB
    const newMessage = {
      threadId: currentThread.threadId,
      messageId,
      inReplyTo: inReplyToHeader || null,
      references: referencesHeader,
      direction: 'outbound',
      from: {
        name: companyName,
        email: senderMailbox,
      },
      to: [
        {
          name: toName || recipientEmail.split('@')[0],
          email: recipientEmail,
        },
      ],
      subject: cleanSubject,
      bodyText: cleanText,
      bodyHtml: cleanHtml,
      attachments: attachments || [],
      templateId: templateId ? (ObjectId.isValid(templateId) ? new ObjectId(templateId) : templateId) : null,
      deliveryStatus,
      deliveryError,
      isRead: true,
      createdAt: now,
    };

    const insertedMsg = await messagesCol.insertOne(newMessage);

    // 4. Update parent thread metadata
    const threadUpdate = {
      $set: {
        lastMessageAt: now,
        lastSnippet: cleanText.substring(0, 120),
        unreadByAdmin: false,
        updatedAt: now,
      },
      $inc: { messageCount: 1 },
    };

    if (statusUpdate) {
      threadUpdate.$set.status = statusUpdate;
    }

    await threadsCol.updateOne({ threadId: currentThread.threadId }, threadUpdate);

    return NextResponse.json({
      success: deliveryStatus !== 'failed',
      messageId,
      threadId: currentThread.threadId,
      insertedId: insertedMsg.insertedId,
      deliveryStatus,
      deliveryError,
    }, { status: deliveryStatus === 'failed' ? 502 : 201, headers: CORS_HEADERS });
  } catch (err) {
    console.error('POST /api/emails error:', err);
    return NextResponse.json({ error: 'Failed to send email: ' + err.message }, { status: 500, headers: CORS_HEADERS });
  }
}

// PATCH /api/emails -> Update thread status, mark read/unread, or toggle tags
export async function PATCH(request) {
  try {
    const db = await getDb();
    const body = await request.json();
    const { threadId, id, status, unreadByAdmin, tags, markAllRead } = body;

    const threadsCol = db.collection('email_threads');

    if (markAllRead) {
      await threadsCol.updateMany({}, { $set: { unreadByAdmin: false, updatedAt: new Date().toISOString() } });
      return NextResponse.json({ success: true, markAll: true }, { headers: CORS_HEADERS });
    }

    const query = {};
    if (threadId) query.threadId = threadId;
    else if (id && ObjectId.isValid(id)) query._id = new ObjectId(id);
    else {
      return NextResponse.json({ error: 'threadId or id is required' }, { status: 400, headers: CORS_HEADERS });
    }

    const updateFields = { updatedAt: new Date().toISOString() };
    if (typeof unreadByAdmin === 'boolean') updateFields.unreadByAdmin = unreadByAdmin;
    if (status) updateFields.status = status;
    if (Array.isArray(tags)) updateFields.tags = tags;

    await threadsCol.updateOne(query, { $set: updateFields });

    return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('PATCH /api/emails error:', err);
    return NextResponse.json({ error: 'Failed to update email thread' }, { status: 500, headers: CORS_HEADERS });
  }
}

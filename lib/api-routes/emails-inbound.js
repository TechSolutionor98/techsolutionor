import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getDb } from '@/lib/mongodb';
import {
  findOrCreateThread,
  generateMessageId,
  uploadAttachmentToCloudinary,
  sanitizeEmailHtml,
} from '@/lib/email-thread-service';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Webhook-Secret, X-Postmark-Secret',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

/**
 * Verify optional Mailgun HMAC signature if configured
 */
function verifyMailgunSignature({ timestamp, token, signature }) {
  const apiKey = (process.env.MAILGUN_API_KEY || '').trim();
  if (!apiKey || !timestamp || !token || !signature) return null;

  try {
    const hmac = crypto.createHmac('sha256', apiKey);
    hmac.update(`${timestamp}${token}`);
    const expected = hmac.digest('hex');
    return expected === signature;
  } catch (err) {
    console.warn('[Inbound Webhook] Mailgun signature check error:', err.message);
    return false;
  }
}

/**
 * Parse email address & display name from raw email string
 * Examples: "John Doe <john@example.com>", "<john@example.com>", "john@example.com"
 */
function parseAddressString(rawStr = '') {
  if (!rawStr || typeof rawStr !== 'string') return { name: '', email: '' };

  const angleMatch = rawStr.match(/^(.*?)\s*<([^>]+)>/);
  if (angleMatch) {
    const name = angleMatch[1].replace(/^["']|["']$/g, '').trim();
    const email = angleMatch[2].trim().toLowerCase();
    return { name: name || email.split('@')[0], email };
  }

  const emailOnly = rawStr.replace(/^["']|["']$/g, '').trim().toLowerCase();
  return { name: emailOnly.split('@')[0] || 'Anonymous', email: emailOnly };
}

/**
 * POST /api/emails/inbound
 * Universal real-time inbound email ingestion endpoint.
 * Supports:
 * - Postmark Inbound Webhook (JSON)
 * - Mailgun Inbound Routes (JSON or Multipart FormData)
 * - SendGrid Inbound Parse (Multipart FormData)
 * - Cloudflare Email Routing Worker (JSON)
 * - Internal / Simulated test payloads
 */
export async function POST(request) {
  try {
    const db = await getDb();
    const contentType = request.headers.get('content-type') || '';
    const urlObj = new URL(request.url);

    // 1. Webhook Security Verification
    const expectedSecret = (process.env.INBOUND_EMAIL_SECRET || '').trim();
    if (expectedSecret) {
      const headerSecret = request.headers.get('x-webhook-secret') || request.headers.get('x-postmark-secret');
      const querySecret = urlObj.searchParams.get('secret');
      const authHeader = request.headers.get('authorization') || '';
      const bearerSecret = authHeader.toLowerCase().startsWith('bearer ')
        ? authHeader.substring(7).trim()
        : null;

      const providedSecret = (headerSecret || querySecret || bearerSecret || '').trim();
      const hasAdminCookie = Boolean(request.cookies.get('jwt')?.value);

      if (!hasAdminCookie && (!providedSecret || providedSecret !== expectedSecret)) {
        return NextResponse.json(
          { error: 'Unauthorized: Invalid or missing webhook secret signature' },
          { status: 401, headers: CORS_HEADERS }
        );
      }
    }

    let senderEmail = '';
    let senderName = '';
    let recipient = '';
    let subject = '';
    let bodyText = '';
    let bodyHtml = '';
    let messageId = '';
    let inReplyTo = '';
    let references = [];
    const rawAttachments = [];

    // 2. Ingest Payload based on Content-Type
    if (contentType.includes('application/json')) {
      const data = await request.json();

      // Check Mailgun HMAC if signature fields exist
      if (data.timestamp && data.token && data.signature) {
        const isValid = verifyMailgunSignature({
          timestamp: data.timestamp,
          token: data.token,
          signature: data.signature,
        });
        if (isValid === false) {
          return NextResponse.json(
            { error: 'Unauthorized: Invalid Mailgun webhook signature' },
            { status: 401, headers: CORS_HEADERS }
          );
        }
      }

      // Format A: Postmark Inbound JSON
      if (data.FromFull || (data.From && data.MessageID)) {
        const fromAddr = data.FromFull?.Email || data.From;
        const parsedFrom = parseAddressString(fromAddr);
        senderEmail = parsedFrom.email;
        senderName = data.FromFull?.Name || parsedFrom.name;
        recipient = data.OriginalRecipient || data.To || process.env.HR_EMAIL || 'hr@techsolutionor.com';
        subject = data.Subject || 'No Subject';
        bodyText = data.TextBody || '';
        bodyHtml = data.HtmlBody || `<p>${bodyText}</p>`;
        messageId = data.MessageID || generateMessageId();

        const headers = Array.isArray(data.Headers) ? data.Headers : [];
        const inReplyHeader = headers.find(h => h.Name?.toLowerCase() === 'in-reply-to');
        if (inReplyHeader) inReplyTo = inReplyHeader.Value;

        const refHeader = headers.find(h => h.Name?.toLowerCase() === 'references');
        if (refHeader?.Value) {
          references = refHeader.Value.split(/\s+/).filter(Boolean);
        }

        if (Array.isArray(data.Attachments)) {
          for (const att of data.Attachments) {
            rawAttachments.push({
              fileName: att.Name || 'attachment',
              mimeType: att.ContentType || 'application/octet-stream',
              buffer: Buffer.from(att.Content, 'base64'),
              size: att.ContentLength || 0,
            });
          }
        }
      }
      // Format B: Mailgun JSON
      else if (data.sender || data.from) {
        const parsedFrom = parseAddressString(data.sender || data.from);
        senderEmail = parsedFrom.email;
        senderName = parsedFrom.name;
        recipient = data.recipient || process.env.HR_EMAIL || 'hr@techsolutionor.com';
        subject = data.subject || 'No Subject';
        bodyText = data['body-plain'] || data.text || '';
        bodyHtml = data['body-html'] || data.html || `<p>${bodyText}</p>`;
        messageId = data['Message-Id'] || generateMessageId();
        inReplyTo = data['In-Reply-To'] || '';
        if (data['References']) {
          references = data['References'].split(/\s+/).filter(Boolean);
        }
      }
      // Format C: Cloudflare Email Routing / Generic Standard JSON
      else {
        const rawFrom = data.senderEmail || data.from || '';
        const parsedFrom = parseAddressString(rawFrom);
        senderEmail = parsedFrom.email;
        senderName = data.senderName || data.name || parsedFrom.name;
        recipient = data.recipient || data.to || process.env.HR_EMAIL || 'hr@techsolutionor.com';
        subject = data.subject || 'No Subject';
        bodyText = data.bodyText || data.text || data.message || '';
        bodyHtml = data.bodyHtml || data.html || `<p>${bodyText}</p>`;
        messageId = data.messageId || data.MessageId || generateMessageId();
        inReplyTo = data.inReplyTo || data.InReplyTo || '';
        if (data.references) {
          references = Array.isArray(data.references) ? data.references : data.references.split(/\s+/);
        }
        if (Array.isArray(data.attachments)) {
          for (const att of data.attachments) {
            if (att.buffer && typeof att.buffer === 'string') {
              rawAttachments.push({
                ...att,
                buffer: Buffer.from(att.buffer, 'base64'),
              });
            } else {
              rawAttachments.push(att);
            }
          }
        }
      }
    }
    // Format D: Multipart FormData (SendGrid Inbound Parse or Mailgun Multipart)
    else if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();

      // Check Mailgun HMAC in FormData if present
      const mgTimestamp = formData.get('timestamp');
      const mgToken = formData.get('token');
      const mgSignature = formData.get('signature');
      if (mgTimestamp && mgToken && mgSignature) {
        const isValid = verifyMailgunSignature({
          timestamp: mgTimestamp.toString(),
          token: mgToken.toString(),
          signature: mgSignature.toString(),
        });
        if (isValid === false) {
          return NextResponse.json(
            { error: 'Unauthorized: Invalid Mailgun multipart signature' },
            { status: 401, headers: CORS_HEADERS }
          );
        }
      }

      const rawFrom = (formData.get('from') || formData.get('sender') || '').toString();
      const parsedFrom = parseAddressString(rawFrom);
      senderEmail = parsedFrom.email;
      senderName = (formData.get('name') || parsedFrom.name).toString();
      recipient = (formData.get('to') || formData.get('recipient') || process.env.HR_EMAIL || 'hr@techsolutionor.com').toString();
      subject = (formData.get('subject') || 'No Subject').toString();
      bodyText = (formData.get('text') || formData.get('body-plain') || '').toString();
      bodyHtml = (formData.get('html') || formData.get('body-html') || `<p>${bodyText}</p>`).toString();
      messageId = (formData.get('Message-Id') || formData.get('message-id') || generateMessageId()).toString();
      inReplyTo = (formData.get('In-Reply-To') || formData.get('in-reply-to') || '').toString();

      const rawRef = formData.get('References') || formData.get('references');
      if (rawRef) {
        references = rawRef.toString().split(/\s+/).filter(Boolean);
      }

      // Check SendGrid 'headers' string for In-Reply-To and References if missing
      const rawHeaders = formData.get('headers');
      if (rawHeaders && typeof rawHeaders === 'string') {
        const inReplyMatch = rawHeaders.match(/in-reply-to:\s*<([^>]+)>/i);
        if (inReplyMatch && !inReplyTo) inReplyTo = `<${inReplyMatch[1]}>`;
        const refMatch = rawHeaders.match(/references:\s*(<[^>]+(?:\s*<[^>]+)*>)/i);
        if (refMatch && references.length === 0) {
          references = refMatch[1].split(/\s+/).filter(Boolean);
        }
      }

      // Extract binary files from FormData
      for (const [key, value] of formData.entries()) {
        if (value && typeof value === 'object' && typeof value.arrayBuffer === 'function') {
          const buffer = Buffer.from(await value.arrayBuffer());
          rawAttachments.push({
            fileName: value.name || key,
            mimeType: value.type || 'application/octet-stream',
            buffer,
            size: buffer.length,
          });
        }
      }
    } else {
      return NextResponse.json(
        { error: `Unsupported Content-Type: ${contentType}. Expected application/json or multipart/form-data.` },
        { status: 415, headers: CORS_HEADERS }
      );
    }

    senderEmail = (senderEmail || '').trim().toLowerCase();
    if (!senderEmail) {
      return NextResponse.json(
        { error: 'Sender email address is missing or invalid in inbound payload' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const messagesCol = db.collection('email_messages');
    const threadsCol = db.collection('email_threads');

    // 3. Strict Idempotency & Deduplication
    // If provider retries webhook, return 200 OK immediately without inserting duplicate messages
    if (messageId) {
      const existingMessage = await messagesCol.findOne({ messageId });
      if (existingMessage) {
        console.log(`[Inbound Webhook] Idempotent hit: messageId ${messageId} already exists. Skipping duplicate.`);
        return NextResponse.json(
          {
            success: true,
            duplicate: true,
            messageId,
            threadId: existingMessage.threadId,
            message: 'Email was already processed previously (idempotent response)',
          },
          { status: 200, headers: CORS_HEADERS }
        );
      }
    }

    // 4. Attachment Offloading to Cloudinary (Keeps mailbox and MongoDB limits untouched)
    const processedAttachments = [];
    for (const att of rawAttachments) {
      if (att.fileUrl) {
        // Pre-uploaded or remote URL
        processedAttachments.push(att);
      } else if (att.buffer && att.buffer.length > 0) {
        const uploaded = await uploadAttachmentToCloudinary({
          buffer: att.buffer,
          fileName: att.fileName,
          mimeType: att.mimeType,
        });

        if (uploaded) {
          processedAttachments.push(uploaded);
        } else {
          // Graceful fallback if Cloudinary upload fails or is unconfigured
          processedAttachments.push({
            fileName: att.fileName,
            mimeType: att.mimeType,
            size: att.size || att.buffer.length,
            storageProvider: 'direct',
            fileUrl: '#',
          });
        }
      }
    }

    // 5. Intelligent Thread Matching & Categorization
    const subjectClean = (subject || 'No Subject').trim();
    const isJobRelated =
      subjectClean.toLowerCase().includes('cv') ||
      subjectClean.toLowerCase().includes('application') ||
      subjectClean.toLowerCase().includes('job') ||
      subjectClean.toLowerCase().includes('resume') ||
      processedAttachments.some(
        a => a.fileName?.toLowerCase()?.includes('cv') || a.fileName?.toLowerCase()?.includes('resume')
      );

    const category = isJobRelated ? 'career' : 'inquiry';

    const thread = await findOrCreateThread({
      senderEmail,
      senderName,
      subject: subjectClean,
      inReplyTo,
      references,
      mailbox: recipient || process.env.HR_EMAIL || 'hr@techsolutionor.com',
      category,
    });

    const now = new Date().toISOString();
    const cleanHtml = sanitizeEmailHtml(bodyHtml);
    const cleanText = (bodyText || cleanHtml.replace(/<[^>]*>/g, '')).trim();

    // 6. Save Inbound Message in MongoDB
    const newMessage = {
      threadId: thread.threadId,
      messageId,
      inReplyTo: inReplyTo || null,
      references,
      direction: 'inbound',
      from: {
        name: senderName,
        email: senderEmail,
      },
      to: [
        {
          name: process.env.SMTP_FROM_NAME || 'Tech Solutionor HR',
          email: recipient || process.env.HR_EMAIL || 'hr@techsolutionor.com',
        },
      ],
      subject: subjectClean,
      bodyText: cleanText,
      bodyHtml: cleanHtml || `<p>${cleanText}</p>`,
      attachments: processedAttachments,
      deliveryStatus: 'delivered',
      isRead: false,
      createdAt: now,
    };

    const insertedMsg = await messagesCol.insertOne(newMessage);

    // 7. Update Parent Thread in MongoDB
    const primaryAttachment = processedAttachments.find(
      a => a.fileUrl && a.fileUrl !== '#' && (a.mimeType?.includes('pdf') || a.fileName?.toLowerCase()?.endsWith('.pdf') || a.fileName?.toLowerCase()?.includes('cv'))
    ) || processedAttachments[0];

    await threadsCol.updateOne(
      { threadId: thread.threadId },
      {
        $set: {
          lastMessageAt: now,
          lastSnippet: cleanText.substring(0, 120),
          unreadByAdmin: true,
          updatedAt: now,
          hasAttachments: processedAttachments.length > 0 || thread.hasAttachments === true,
          attachmentCount: (thread.attachmentCount || 0) + processedAttachments.length,
          ...(primaryAttachment?.fileUrl && primaryAttachment.fileUrl !== '#'
            ? { primaryAttachmentUrl: primaryAttachment.fileUrl }
            : {}),
        },
        $inc: { messageCount: 1 },
      }
    );

    console.log(`[Inbound Webhook] Successfully processed email from ${senderEmail} in thread ${thread.threadId}`);

    return NextResponse.json(
      {
        success: true,
        messageId,
        threadId: thread.threadId,
        insertedId: insertedMsg.insertedId,
        attachmentsCount: processedAttachments.length,
        category,
      },
      { status: 201, headers: CORS_HEADERS }
    );
  } catch (err) {
    console.error('POST /api/emails/inbound fatal error:', err);
    return NextResponse.json(
      { error: 'Internal server error processing inbound email: ' + err.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

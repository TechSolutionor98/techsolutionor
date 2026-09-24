import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import { getDb } from './mongodb.js';
import {
  findOrCreateThread,
  generateMessageId,
  sanitizeEmailHtml,
  uploadAttachmentToCloudinary,
} from './email-thread-service.js';

/**
 * Get configured IMAP settings from environment variables
 */
export function getImapConfig() {
  const host = (
    process.env.IMAP_HOST ||
    (process.env.SMTP_HOST?.includes('gmail') ? 'imap.gmail.com' : 'imap.hostinger.com')
  ).trim();

  const port = parseInt(process.env.IMAP_PORT || '993', 10);
  const secure = process.env.IMAP_SECURE !== 'false';

  let user = (process.env.IMAP_USER || process.env.SMTP_USER || '').trim();
  let pass = (process.env.IMAP_PASS || process.env.SMTP_PASS || '').trim();
  if (typeof pass === 'string') {
    pass = pass.replace(/^["']|["']$/g, '').trim();
  }

  return { host, port, secure, user, pass };
}

/**
 * Connect to IMAP server and synchronize new/unseen incoming emails into MongoDB
 */
export async function syncIncomingEmails({ limit = 40, markSeen = true, onlyUnseen = true } = {}) {
  const { host, port, secure, user, pass } = getImapConfig();

  if (!user || !pass) {
    return {
      success: false,
      error: 'IMAP mailbox credentials are not configured in environment variables (IMAP_USER / IMAP_PASS or SMTP_USER / SMTP_PASS).',
      syncedCount: 0,
      newThreadsCount: 0,
    };
  }

  const client = new ImapFlow({
    host,
    port,
    secure,
    auth: { user, pass },
    logger: false,
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
  });

  const db = await getDb();
  const messagesCol = db.collection('email_messages');
  const threadsCol = db.collection('email_threads');

  let syncedCount = 0;
  let newThreadsCount = 0;
  const errors = [];

  try {
    await client.connect();
    const lock = await client.getMailboxLock('INBOX');

    try {
      // 1. Search for unseen messages, or fallback to latest only if not restricted to unseen
      let isUidRange = true;
      let searchRange = await client.search({ seen: false }, { uid: true });

      if (!Array.isArray(searchRange) || searchRange.length === 0) {
        if (!onlyUnseen) {
          // Fallback: check the latest messages in INBOX only when explicitly requested
          const mailboxStatus = await client.status('INBOX', { messages: true });
          if (mailboxStatus?.messages > 0) {
            const start = Math.max(1, mailboxStatus.messages - limit + 1);
            searchRange = `${start}:${mailboxStatus.messages}`;
            isUidRange = false;
          } else {
            return {
              success: true,
              syncedCount: 0,
              newThreadsCount: 0,
              mailboxUser: user,
              mailboxHost: host,
              message: 'Mailbox is empty.',
            };
          }
        } else {
          return {
            success: true,
            syncedCount: 0,
            newThreadsCount: 0,
            mailboxUser: user,
            mailboxHost: host,
            message: 'No new unseen emails.',
          };
        }
      } else if (Array.isArray(searchRange) && searchRange.length > limit) {
        searchRange = searchRange.slice(-limit);
      }

      // Fast pre-check: query envelopes first to identify messages already in MongoDB
      const uidsToMarkSeen = [];
      let uidsToFetchFull = [];

      if (isUidRange && Array.isArray(searchRange)) {
        for await (const msg of client.fetch(searchRange, { uid: true, envelope: true }, { uid: true })) {
          const msgId = msg.envelope?.messageId;
          if (msgId) {
            const existing = await messagesCol.findOne({ messageId: msgId });
            if (existing) {
              if (msg.uid) uidsToMarkSeen.push(msg.uid);
              continue;
            }
          }
          if (msg.uid) uidsToFetchFull.push(msg.uid);
        }
      } else {
        uidsToFetchFull = searchRange;
      }

      // If all unseen messages were already in MongoDB, mark them seen atomically and return immediately
      if (uidsToFetchFull.length === 0) {
        if (markSeen && uidsToMarkSeen.length > 0) {
          try {
            await client.messageFlagsAdd(uidsToMarkSeen, ['\\Seen'], { uid: true });
          } catch (_) {}
        }
        return {
          success: true,
          syncedCount: 0,
          newThreadsCount: 0,
          mailboxUser: user,
          mailboxHost: host,
          message: 'All unseen emails were already recorded.',
        };
      }

      console.log(`[IMAP] Ingesting ${uidsToFetchFull.length} new incoming email(s)...`);

      // 2. Fetch and parse each new message
      for await (const message of client.fetch(uidsToFetchFull, { source: true, uid: true, envelope: true }, { uid: isUidRange })) {
        try {
          if (!message.source) continue;
          const parsed = await simpleParser(message.source);

          const rfcMessageId = parsed.messageId || generateMessageId();

          // Double check if message already exists in database
          const existing = await messagesCol.findOne({ messageId: rfcMessageId });
          if (existing) {
            if (message.uid) uidsToMarkSeen.push(message.uid);
            continue;
          }

          const senderEmail = (parsed.from?.value?.[0]?.address || '').trim().toLowerCase();
          const senderName = (parsed.from?.value?.[0]?.name || senderEmail.split('@')[0] || 'Anonymous').trim();
          const recipient = (parsed.to?.value?.[0]?.address || user || 'hr@techsolutionor.com').trim();
          const subject = (parsed.subject || 'No Subject').trim();
          const inReplyTo = (parsed.inReplyTo || '').trim();
          const references = Array.isArray(parsed.references)
            ? parsed.references
            : (typeof parsed.references === 'string' ? parsed.references.split(/\s+/) : []);

          const dateStr = parsed.date ? new Date(parsed.date).toISOString() : new Date().toISOString();
          const cleanHtml = sanitizeEmailHtml(parsed.html || '');
          const cleanText = (parsed.text || cleanHtml.replace(/<[^>]*>/g, '')).trim();

          // 3. Process attachments (CVs, documents)
          const processedAttachments = [];
          if (Array.isArray(parsed.attachments) && parsed.attachments.length > 0) {
            for (const att of parsed.attachments) {
              const fileName = att.filename || 'attachment';
              const mimeType = att.contentType || 'application/octet-stream';
              const buffer = att.content;

              if (buffer && buffer.length > 0) {
                const uploaded = await uploadAttachmentToCloudinary({
                  buffer,
                  fileName,
                  mimeType,
                });

                if (uploaded) {
                  processedAttachments.push(uploaded);
                } else {
                  processedAttachments.push({
                    fileName,
                    mimeType,
                    size: att.size || buffer.length,
                    storageProvider: 'direct',
                    fileUrl: '#',
                  });
                }
              }
            }
          }

          // 4. Categorize: job application / CV vs inquiry
          const isJobRelated =
            subject.toLowerCase().includes('cv') ||
            subject.toLowerCase().includes('application') ||
            subject.toLowerCase().includes('job') ||
            subject.toLowerCase().includes('resume') ||
            processedAttachments.some(
              a => a.fileName?.toLowerCase()?.includes('cv') || a.fileName?.toLowerCase()?.includes('resume')
            );

          const category = isJobRelated ? 'career' : 'inquiry';

          // 5. Match or create thread
          const thread = await findOrCreateThread({
            senderEmail,
            senderName,
            subject,
            inReplyTo,
            references,
            mailbox: recipient || 'hr@techsolutionor.com',
            category,
          });

          if (thread.messageCount === 0) {
            newThreadsCount++;
          }

          // 6. Save message to MongoDB
          const newMessage = {
            threadId: thread.threadId,
            messageId: rfcMessageId,
            inReplyTo: inReplyTo || null,
            references,
            direction: 'inbound',
            from: {
              name: senderName,
              email: senderEmail,
            },
            to: [
              {
                name: 'Tech Solutionor HR',
                email: recipient,
              },
            ],
            subject,
            bodyText: cleanText,
            bodyHtml: cleanHtml || `<p>${cleanText}</p>`,
            attachments: processedAttachments,
            deliveryStatus: 'delivered',
            isRead: false,
            createdAt: dateStr,
          };

          await messagesCol.insertOne(newMessage);

          // 7. Update thread in MongoDB
          await threadsCol.updateOne(
            { threadId: thread.threadId },
            {
              $set: {
                lastMessageAt: dateStr,
                lastSnippet: cleanText.substring(0, 120),
                unreadByAdmin: true,
                updatedAt: new Date().toISOString(),
                hasAttachments: processedAttachments.length > 0 || thread.hasAttachments === true,
                attachmentCount: (thread.attachmentCount || 0) + processedAttachments.length,
                ...(processedAttachments.length > 0 && processedAttachments[0].fileUrl && processedAttachments[0].fileUrl !== '#'
                  ? { primaryAttachmentUrl: processedAttachments[0].fileUrl }
                  : {}),
              },
              $inc: { messageCount: 1 },
            }
          );

          if (message.uid) {
            uidsToMarkSeen.push(message.uid);
          }
          syncedCount++;
        } catch (msgErr) {
          console.warn('Error parsing IMAP message:', msgErr.message);
          errors.push(msgErr.message);
        }
      }

      // Mark all processed messages as seen on IMAP in one atomic command outside the fetch loop
      if (markSeen && uidsToMarkSeen.length > 0) {
        try {
          await client.messageFlagsAdd(uidsToMarkSeen, ['\\Seen'], { uid: true });
        } catch (_) {}
      }
    } finally {
      lock.release();
    }

    await client.logout();

    return {
      success: true,
      syncedCount,
      newThreadsCount,
      mailboxUser: user,
      mailboxHost: host,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch (err) {
    console.error('IMAP sync failed:', err);
    try {
      await client.logout().catch(() => {});
    } catch (_) {}

    return {
      success: false,
      error: err.message,
      mailboxUser: user,
      mailboxHost: host,
      syncedCount: 0,
      newThreadsCount: 0,
    };
  }
}

import { getDb } from './mongodb.js';
import { ObjectId } from 'mongodb';
import cloudinary from './cloudinary.js';
import { PREBUILT_EMAIL_TEMPLATES } from './email-templates-catalog.js';

// System Default Templates exported from centralized catalog
export const DEFAULT_EMAIL_TEMPLATES = PREBUILT_EMAIL_TEMPLATES.map(t => ({
  id: t.id,
  title: t.label,
  label: t.label,
  category: t.category,
  subject: t.subject,
  bodyText: t.bodyText,
  bodyHtml: t.bodyHtml,
  recommendedStatus: t.recommendedStatus,
  isSystemDefault: true,
}));

/**
 * Seed default templates if they don't already exist or update them in the database
 */
export async function ensureDefaultTemplates() {
  try {
    const db = await getDb();
    const collection = db.collection('email_templates');
    const now = new Date().toISOString();

    for (const t of DEFAULT_EMAIL_TEMPLATES) {
      await collection.updateOne(
        { id: t.id },
        {
          $set: {
            title: t.label,
            label: t.label,
            category: t.category,
            subject: t.subject,
            bodyText: t.bodyText,
            bodyHtml: t.bodyHtml,
            recommendedStatus: t.recommendedStatus,
            isSystemDefault: true,
            updatedAt: now,
          },
          $setOnInsert: {
            createdAt: now,
          },
        },
        { upsert: true }
      );
    }
  } catch (err) {
    console.error('Failed to ensure default email templates:', err);
  }
}

/**
 * Normalize an email subject by stripping repetitive Re:, Fwd:, etc.
 */
export function normalizeSubject(subject = '') {
  return subject
    .replace(/^(re|fwd|fw):\s*/gi, '')
    .replace(/^(re|fwd|fw)\[\d+\]:\s*/gi, '')
    .trim();
}

/**
 * Sanitize HTML body to prevent XSS while preserving legitimate email formatting
 */
export function sanitizeEmailHtml(html = '') {
  if (!html || typeof html !== 'string') return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*(['"]).*?\1/gi, '')
    .replace(/javascript:/gi, '');
}

/**
 * Upload an email attachment buffer to Cloudinary
 */
export async function uploadAttachmentToCloudinary({ buffer, fileName, mimeType }) {
  try {
    const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;
    if (!isCloudinaryConfigured) {
      return null;
    }

    const isPdf = mimeType?.includes('pdf') || fileName?.toLowerCase()?.endsWith('.pdf');
    const isDoc = mimeType?.includes('word') || mimeType?.includes('document') || fileName?.toLowerCase()?.endsWith('.docx') || fileName?.toLowerCase()?.endsWith('.doc');
    const resourceType = (isPdf || isDoc) ? 'raw' : 'auto';

    return new Promise((resolve) => {
      const cleanFileName = (fileName || 'attachment').replace(/[^a-zA-Z0-9._-]/g, '_');
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'email_attachments',
          resource_type: resourceType,
          public_id: `${Date.now()}_${cleanFileName}`,
        },
        (error, result) => {
          if (error) {
            console.warn('Cloudinary attachment upload warning:', error.message || error);
            resolve(null);
          } else {
            resolve({
              fileUrl: result.secure_url,
              publicId: result.public_id,
              fileName,
              mimeType,
              size: result.bytes || buffer?.length || 0,
              storageProvider: 'cloudinary',
            });
          }
        }
      );
      uploadStream.end(buffer);
    });
  } catch (err) {
    console.warn('Attachment upload error:', err.message);
    return null;
  }
}

/**
 * Find an existing thread or create a new one based on RFC 5322 In-Reply-To / References or sender email + subject
 */
export async function findOrCreateThread({
  senderEmail,
  senderName,
  subject,
  inReplyTo,
  references = [],
  mailbox = 'hr@techsolutionor.com',
  category = 'career',
}) {
  const db = await getDb();
  const threadsCol = db.collection('email_threads');
  const messagesCol = db.collection('email_messages');

  let thread = null;

  // 1. Try finding by matching Message-ID in references or In-Reply-To
  const searchIds = [inReplyTo, ...(Array.isArray(references) ? references : [references])].filter(Boolean);
  if (searchIds.length > 0) {
    const parentMsg = await messagesCol.findOne({
      messageId: { $in: searchIds },
    });
    if (parentMsg?.threadId) {
      thread = await threadsCol.findOne({ threadId: parentMsg.threadId });
    }
  }

  // 2. If not found, try matching by applicant email AND normalized subject
  if (!thread && senderEmail && subject) {
    const normSub = normalizeSubject(subject);
    if (normSub) {
      thread = await threadsCol.findOne({
        'applicant.email': senderEmail.toLowerCase(),
        normalizedSubject: normSub.toLowerCase(),
        status: { $ne: 'archived' },
      });
    }
  }

  // 3. If still not found, create a new thread
  if (!thread) {
    const now = new Date().toISOString();
    const threadId = `thr_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const newThread = {
      threadId,
      subject: subject || 'No Subject',
      normalizedSubject: normalizeSubject(subject || '').toLowerCase(),
      applicant: {
        name: senderName || 'Anonymous',
        email: (senderEmail || '').toLowerCase(),
      },
      mailbox,
      status: 'open',
      category: category || (subject?.toLowerCase()?.includes('inquiry') ? 'inquiry' : 'career'),
      tags: [],
      unreadByAdmin: true,
      messageCount: 0,
      lastMessageAt: now,
      createdAt: now,
      updatedAt: now,
    };

    const res = await threadsCol.insertOne(newThread);
    thread = { ...newThread, _id: res.insertedId };
  }

  return thread;
}

/**
 * Generate a unique RFC 5322 Message-ID
 */
export function generateMessageId(domain = 'techsolutionor.com') {
  const cleanDomain = domain.replace(/^@/, '');
  const randomPart = Math.random().toString(36).substring(2, 12);
  return `<${Date.now()}.${randomPart}@${cleanDomain}>`;
}

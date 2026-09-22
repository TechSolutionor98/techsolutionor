import { getDb } from './mongodb.js';
import { ObjectId } from 'mongodb';
import cloudinary from './cloudinary.js';

// System Default Templates
export const DEFAULT_EMAIL_TEMPLATES = [
  {
    title: 'Application Received',
    category: 'career',
    subject: 'Application Received: {{position}} at {{companyName}}',
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>Thank you for submitting your application for the <strong>{{position}}</strong> position at <strong>{{companyName}}</strong>.</p>
<p>We have successfully received your credentials and resume. Our recruitment team is currently reviewing your profile to determine if your background matches our technical and cultural criteria.</p>
<p>You will receive an update as soon as the initial screening phase is completed.</p>
<p>Best regards,<br/><strong>The {{companyName}} Talent Acquisition Team</strong></p>`,
    isSystemDefault: true,
  },
  {
    title: 'Application Under Review',
    category: 'career',
    subject: 'Application Status Update: {{position}} at {{companyName}}',
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>We are writing to let you know that your application for the <strong>{{position}}</strong> position at <strong>{{companyName}}</strong> is currently active and undergoing in-depth evaluation by our engineering leads.</p>
<p>We review applications thoroughly and aim to get back to all qualified candidates within a few business days.</p>
<p>Thank you for your patience and enthusiasm.</p>
<p>Warm regards,<br/><strong>{{companyName}} Hiring Team</strong></p>`,
    isSystemDefault: true,
  },
  {
    title: 'Interview Invitation',
    category: 'career',
    subject: 'Interview Invitation: {{position}} with {{companyName}}',
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>We were very impressed with your portfolio and experience, and we would like to invite you for an introductory interview for the <strong>{{position}}</strong> position at <strong>{{companyName}}</strong>.</p>
<p><strong>Proposed Date & Time:</strong> {{interviewDate}}</p>
<p><strong>Interview Format:</strong> Online Video Call (Link: {{interviewLink}})</p>
<p>Please reply directly to this email to confirm if this time works for you or to suggest alternative slots.</p>
<p>We look forward to speaking with you!</p>
<p>Best regards,<br/><strong>{{senderName}}</strong><br/>{{companyName}}</p>`,
    isSystemDefault: true,
  },
  {
    title: 'Request for More Information / CV',
    category: 'career',
    subject: 'Information Request Regarding Your Application for {{position}}',
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>Thank you for your interest in joining <strong>{{companyName}}</strong> as a <strong>{{position}}</strong>.</p>
<p>To help us proceed with reviewing your profile, could you please provide:</p>
<ul>
  <li>An updated copy of your CV/Resume (PDF preferred)</li>
  <li>Links to your GitHub/portfolio or recent live projects</li>
  <li>Your earliest available start date and notice period</li>
</ul>
<p>You can reply directly to this email with the requested information attached.</p>
<p>Best regards,<br/><strong>The {{companyName}} Hiring Team</strong></p>`,
    isSystemDefault: true,
  },
  {
    title: 'Application Approved',
    category: 'career',
    subject: 'Application Approved: Next Steps at {{companyName}}! ({{position}})',
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>Congratulations! We are delighted to inform you that your application for the <strong>{{position}}</strong> role at <strong>{{companyName}}</strong> has been <strong>Approved</strong> for the next stage of our hiring process.</p>
<p>Our team will reach out with the onboarding and formal assessment details shortly.</p>
<p>Welcome to the next phase, and well done!</p>
<p>Warm regards,<br/><strong>{{companyName}} Talent Acquisition</strong></p>`,
    isSystemDefault: true,
  },
  {
    title: 'Application Rejected / Talent Pool',
    category: 'career',
    subject: 'Update Regarding Your Application for {{position}} at {{companyName}}',
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>Thank you very much for taking the time to apply for the <strong>{{position}}</strong> role at <strong>{{companyName}}</strong> and for sharing your background with us.</p>
<p>After careful consideration, we have decided to move forward with other candidates whose experience more closely aligns with the immediate requirements of this position.</p>
<p>We were genuinely impressed by your skills and would like to retain your profile in our talent pool for future opportunities as our team expands.</p>
<p>We wish you every success in your ongoing job search and professional endeavors.</p>
<p>Sincerely,<br/><strong>{{companyName}} Recruitment Team</strong></p>`,
    isSystemDefault: true,
  },
  {
    title: 'General Contact / Inquiry Reply',
    category: 'general',
    subject: 'Re: Your Inquiry with {{companyName}}',
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>Thank you for getting in touch with <strong>{{companyName}}</strong>.</p>
<p>We have received your message regarding our services and digital solutions. Our team is reviewing your requirements and one of our specialists will be in touch with you shortly.</p>
<p>If you have any immediate questions or urgent project requirements, feel free to reply directly to this email.</p>
<p>Best regards,<br/><strong>{{companyName}} Client Support</strong></p>`,
    isSystemDefault: true,
  },
];

/**
 * Seed default templates if they don't already exist in the database
 */
export async function ensureDefaultTemplates() {
  try {
    const db = await getDb();
    const collection = db.collection('email_templates');
    const count = await collection.countDocuments();
    if (count === 0) {
      const now = new Date().toISOString();
      const docs = DEFAULT_EMAIL_TEMPLATES.map(t => ({
        ...t,
        createdAt: now,
        updatedAt: now,
      }));
      await collection.insertMany(docs);
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

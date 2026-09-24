import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { triggerAutoSync } from '@/lib/email-auto-sync';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PATCH,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function toObjectId(id) {
  if (!id) return null;
  if (typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id)) {
    try {
      return new ObjectId(id);
    } catch (_) {
      return null;
    }
  }
  return null;
}

function safeIsoDate(val) {
  if (!val) return new Date().toISOString();
  if (val instanceof Date) {
    return isNaN(val.getTime()) ? new Date().toISOString() : val.toISOString();
  }
  try {
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      return d.toISOString();
    }
  } catch (_) {}
  return new Date().toISOString();
}

function getMailboxFilter() {
  let activeMailbox = (process.env.IMAP_USER || process.env.SMTP_USER || 'hr@techsolutionor.com').trim();
  if (!activeMailbox || activeMailbox.toLowerCase().includes('osumfix')) {
    activeMailbox = 'hr@techsolutionor.com';
  }
  const escaped = activeMailbox.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return {
    activeMailbox,
    filter: {
      $or: [
        { mailbox: { $regex: new RegExp(escaped, 'i') } },
        { mailbox: { $exists: false } }
      ]
    }
  };
}

// GET /api/admin/notifications -> Unread counts & recent activity feed
export async function GET() {
  try {
    // In serverless / production environments, automatically trigger IMAP sync if interval elapsed
    try {
      await Promise.race([
        triggerAutoSync({ waitForCompletion: true, limit: 15, onlyUnseen: true }),
        new Promise(resolve => setTimeout(resolve, 3500)),
      ]);
    } catch (_) {}

    const db = await getDb();
    const { activeMailbox, filter: mailboxFilter } = getMailboxFilter();

    // 1. Unread Counts across collections
    const [contactUnread, appUnread, reviewUnread, commentUnread, emailUnread] = await Promise.all([
      db.collection('contact_submissions').countDocuments({ isRead: { $ne: true } }).catch(() => 0),
      db.collection('applications').countDocuments({ isRead: { $ne: true } }).catch(() => 0),
      db.collection('reviews').countDocuments({ isRead: { $ne: true } }).catch(() => 0),
      db.collection('cms_blog_comments').countDocuments({ isRead: { $ne: true } }).catch(() => 0),
      db.collection('email_threads').countDocuments({ unreadByAdmin: true, status: { $ne: 'archived' }, ...mailboxFilter }).catch(() => 0),
    ]);

    // 2. Fetch pending/unread submissions from each collection for notification stream
    const [recentContacts, recentApps, recentReviews, recentComments, recentEmails] = await Promise.all([
      db.collection('contact_submissions')
        .find({ isRead: { $ne: true } })
        .sort({ createdAt: -1, _id: -1 })
        .limit(50)
        .toArray()
        .catch(() => []),

      db.collection('applications')
        .find({ isRead: { $ne: true } })
        .sort({ createdAt: -1, _id: -1 })
        .limit(50)
        .toArray()
        .catch(() => []),

      db.collection('reviews')
        .find({ isRead: { $ne: true } })
        .sort({ createdAt: -1, _id: -1 })
        .limit(50)
        .toArray()
        .catch(() => []),

      db.collection('cms_blog_comments')
        .find({ isRead: { $ne: true } })
        .sort({ createdAt: -1, _id: -1 })
        .limit(50)
        .toArray()
        .catch(() => []),

      db.collection('email_threads')
        .find({ unreadByAdmin: true, status: { $ne: 'archived' }, ...mailboxFilter })
        .sort({ lastMessageAt: -1, _id: -1 })
        .limit(25)
        .toArray()
        .catch(() => []),
    ]);

    // 3. Format unified notification items
    const notifications = [];

    // Contact & Appointment submissions
    for (const c of recentContacts || []) {
      if (!c) continue;
      const isQuote = (c.source || '').toLowerCase().includes('quote') || (c.source || '').toLowerCase().includes('appointment') || (c.source || '').toLowerCase().includes('touch');
      notifications.push({
        id: c._id?.toString() || c.id || Math.random().toString(),
        _id: c._id?.toString() || c.id || Math.random().toString(),
        type: isQuote ? 'appointment' : 'contact',
        category: 'inquiries',
        title: isQuote ? 'New Appointment Request' : 'New Contact Inquiry',
        author: c.name || c.fullName || 'Anonymous Client',
        email: c.email || '',
        phone: c.phone || '',
        preview: c.serviceRequired ? `${c.serviceRequired} • ${c.message || 'No additional note'}` : (c.message || 'New contact inquiry received'),
        source: c.source || (isQuote ? 'Get Appointments Modal' : 'Contact Us Form'),
        link: '/admin/contact-submissions',
        isRead: c.isRead === true,
        createdAt: safeIsoDate(c.createdAt),
      });
    }

    // Career job applications
    for (const a of recentApps || []) {
      if (!a) continue;
      notifications.push({
        id: a._id?.toString() || a.id || Math.random().toString(),
        _id: a._id?.toString() || a.id || Math.random().toString(),
        type: 'application',
        category: 'inquiries',
        title: 'New Job Application',
        author: a.name || 'Job Applicant',
        email: a.email || '',
        phone: a.phone || '',
        preview: a.position ? `Applied for: ${a.position}` : (a.coverLetter || 'New career application received'),
        source: 'Career Page',
        link: '/admin/applications',
        isRead: a.isRead === true,
        createdAt: safeIsoDate(a.createdAt),
      });
    }

    // Customer / Google reviews
    for (const r of recentReviews || []) {
      if (!r) continue;
      const isGoogle = r.source === 'Google' || !!r.googleReviewId;
      notifications.push({
        id: r._id?.toString() || r.id || Math.random().toString(),
        _id: r._id?.toString() || r.id || Math.random().toString(),
        type: 'review',
        category: 'inquiries',
        title: isGoogle ? 'New Google Review' : 'New Customer Review',
        author: r.name || 'Verified Client',
        email: r.email || '',
        preview: `${r.rating || 5} Stars • "${(r.message || r.comment || '').slice(0, 70)}${(r.message || '').length > 70 ? '...' : ''}"`,
        source: isGoogle ? 'Google Reviews' : 'Website Review',
        link: '/admin/reviews',
        isRead: r.isRead === true,
        createdAt: safeIsoDate(r.createdAt),
      });
    }

    // Blog comments
    for (const m of recentComments || []) {
      if (!m) continue;
      notifications.push({
        id: m._id?.toString() || m.id || Math.random().toString(),
        _id: m._id?.toString() || m.id || Math.random().toString(),
        type: 'comment',
        category: 'blogs',
        title: 'New Blog Comment',
        author: m.authorName || 'Blog Reader',
        email: m.authorEmail || '',
        preview: (m.comment || '').slice(0, 70),
        source: 'Blog Post',
        link: '/admin/blogs/comments',
        isRead: m.isRead === true,
        createdAt: safeIsoDate(m.createdAt),
      });
    }

    // Email communications
    for (const e of recentEmails || []) {
      if (!e) continue;
      notifications.push({
        id: e._id?.toString() || e.threadId || Math.random().toString(),
        _id: e._id?.toString() || e.threadId || Math.random().toString(),
        type: 'email',
        category: 'inquiries',
        title: 'New Incoming Email',
        author: e.applicant?.name || 'Email Sender',
        email: e.applicant?.email || '',
        phone: '',
        preview: `${e.subject || 'No Subject'} • ${e.lastSnippet || 'New message in thread'}`,
        source: e.mailbox || activeMailbox,
        link: `/admin/emails?threadId=${e.threadId || ''}`,
        isRead: false,
        createdAt: safeIsoDate(e.lastMessageAt || e.createdAt),
      });
    }

    // Sort notifications newest first safely
    notifications.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime() || 0;
      const timeB = new Date(b.createdAt).getTime() || 0;
      return timeB - timeA;
    });

    const totalInquiries = (contactUnread || 0) + (appUnread || 0) + (reviewUnread || 0) + (emailUnread || 0);
    const totalBlogs = commentUnread || 0;
    const totalAll = totalInquiries + totalBlogs;

    return NextResponse.json({
      counts: {
        contactMessages: contactUnread || 0,
        jobApplications: appUnread || 0,
        customerReviews: reviewUnread || 0,
        blogComments: commentUnread || 0,
        unreadEmails: emailUnread || 0,
        total: totalAll,
      },
      unreadByGroup: {
        inquiries: totalInquiries,
        blogs: totalBlogs,
      },
      notifications: notifications.slice(0, 30),
    }, { headers: CORS_HEADERS });

  } catch (err) {
    console.error('GET /api/admin/notifications error:', err);
    return NextResponse.json({
      counts: {
        contactMessages: 0,
        jobApplications: 0,
        customerReviews: 0,
        blogComments: 0,
        unreadEmails: 0,
        total: 0,
      },
      unreadByGroup: {
        inquiries: 0,
        blogs: 0,
      },
      notifications: [],
      error: err.message,
    }, { status: 200, headers: CORS_HEADERS });
  }
}

// PATCH /api/admin/notifications -> Mark single item, category, or all as read
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, type, markAll, isRead = true } = body || {};
    const db = await getDb();
    const { filter: mailboxFilter } = getMailboxFilter();

    // 1. Mark EVERYTHING across the system as read
    if (markAll && (!type || type === 'all')) {
      await Promise.all([
        db.collection('contact_submissions').updateMany({}, { $set: { isRead: true } }),
        db.collection('applications').updateMany({}, { $set: { isRead: true } }),
        db.collection('reviews').updateMany({}, { $set: { isRead: true } }),
        db.collection('cms_blog_comments').updateMany({}, { $set: { isRead: true } }),
        db.collection('email_threads').updateMany({ ...mailboxFilter }, { $set: { unreadByAdmin: false } }),
      ]);
      return NextResponse.json({ ok: true, message: 'All notifications marked as read' }, { headers: CORS_HEADERS });
    }

    // 2. Mark an entire specific collection as read
    if (markAll && type) {
      if (type === 'contact' || type === 'appointment' || type === 'contactMessages') {
        await db.collection('contact_submissions').updateMany({}, { $set: { isRead: true } });
      } else if (type === 'application' || type === 'jobApplications') {
        await db.collection('applications').updateMany({}, { $set: { isRead: true } });
      } else if (type === 'review' || type === 'customerReviews') {
        await db.collection('reviews').updateMany({}, { $set: { isRead: true } });
      } else if (type === 'comment' || type === 'blogComments') {
        await db.collection('cms_blog_comments').updateMany({}, { $set: { isRead: true } });
      } else if (type === 'email' || type === 'unreadEmails') {
        await db.collection('email_threads').updateMany({ ...mailboxFilter }, { $set: { unreadByAdmin: false } });
      }
      return NextResponse.json({ ok: true, message: `All ${type} marked as read` }, { headers: CORS_HEADERS });
    }

    // 3. Mark a single item as read/unread by ID
    if (id) {
      const oid = toObjectId(id);
      const query = oid ? { $or: [{ _id: oid }, { _id: id }, { id }] } : { $or: [{ _id: id }, { id }] };
      const update = { $set: { isRead: isRead === true } };

      let updated = false;

      // If type provided, target specific collection directly
      if (type === 'contact' || type === 'appointment') {
        const res = await db.collection('contact_submissions').updateOne(query, update);
        updated = res.matchedCount > 0;
      } else if (type === 'application') {
        const res = await db.collection('applications').updateOne(query, update);
        updated = res.matchedCount > 0;
      } else if (type === 'review') {
        const res = await db.collection('reviews').updateOne(query, update);
        updated = res.matchedCount > 0;
      } else if (type === 'comment') {
        const res = await db.collection('cms_blog_comments').updateOne(query, update);
        updated = res.matchedCount > 0;
      } else if (type === 'email') {
        const threadQuery = oid ? { $or: [{ _id: oid }, { _id: id }, { threadId: id }] } : { $or: [{ _id: id }, { threadId: id }] };
        const res = await db.collection('email_threads').updateOne(
          { $and: [threadQuery, mailboxFilter] },
          { $set: { unreadByAdmin: isRead !== true, updatedAt: new Date().toISOString() } }
        );
        updated = res.matchedCount > 0;
      } else {
        // Search across all five collections
        const res1 = await db.collection('contact_submissions').updateOne(query, update);
        if (res1.matchedCount > 0) updated = true;
        else {
          const res2 = await db.collection('applications').updateOne(query, update);
          if (res2.matchedCount > 0) updated = true;
          else {
            const res3 = await db.collection('reviews').updateOne(query, update);
            if (res3.matchedCount > 0) updated = true;
            else {
              const res4 = await db.collection('cms_blog_comments').updateOne(query, update);
              if (res4.matchedCount > 0) updated = true;
              else {
                const threadQuery = oid ? { $or: [{ _id: oid }, { _id: id }, { threadId: id }] } : { $or: [{ _id: id }, { threadId: id }] };
                const res5 = await db.collection('email_threads').updateOne(
                  { $and: [threadQuery, mailboxFilter] },
                  { $set: { unreadByAdmin: isRead !== true, updatedAt: new Date().toISOString() } }
                );
                if (res5.matchedCount > 0) updated = true;
              }
            }
          }
        }
      }

      return NextResponse.json({ ok: true, updated }, { headers: CORS_HEADERS });
    }

    return NextResponse.json({ error: 'Missing id or markAll parameter' }, { status: 400, headers: CORS_HEADERS });

  } catch (err) {
    console.error('PATCH /api/admin/notifications error:', err);
    return NextResponse.json({ error: err.message }, { status: 500, headers: CORS_HEADERS });
  }
}

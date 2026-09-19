import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

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
  if (ObjectId.isValid(id) && id.length === 24) {
    try {
      return new ObjectId(id);
    } catch (_) {
      return null;
    }
  }
  return null;
}

// GET /api/admin/notifications -> Unread counts & recent activity feed
export async function GET() {
  try {
    const db = await getDb();

    // 1. Unread Counts across collections
    const [contactUnread, appUnread, reviewUnread, commentUnread] = await Promise.all([
      db.collection('contact_submissions').countDocuments({ isRead: { $ne: true } }).catch(() => 0),
      db.collection('applications').countDocuments({ isRead: { $ne: true } }).catch(() => 0),
      db.collection('reviews').countDocuments({ isRead: { $ne: true } }).catch(() => 0),
      db.collection('cms_blog_comments').countDocuments({ isRead: { $ne: true } }).catch(() => 0),
    ]);

    // 2. Fetch recent submissions from each collection for notification stream
    const [recentContacts, recentApps, recentReviews, recentComments] = await Promise.all([
      db.collection('contact_submissions')
        .find({})
        .sort({ createdAt: -1, _id: -1 })
        .limit(15)
        .toArray()
        .catch(() => []),

      db.collection('applications')
        .find({})
        .sort({ createdAt: -1, _id: -1 })
        .limit(15)
        .toArray()
        .catch(() => []),

      db.collection('reviews')
        .find({})
        .sort({ createdAt: -1, _id: -1 })
        .limit(15)
        .toArray()
        .catch(() => []),

      db.collection('cms_blog_comments')
        .find({})
        .sort({ createdAt: -1, _id: -1 })
        .limit(15)
        .toArray()
        .catch(() => []),
    ]);

    // 3. Format unified notification items
    const notifications = [];

    // Contact & Appointment submissions
    for (const c of recentContacts) {
      const isQuote = (c.source || '').toLowerCase().includes('quote') || (c.source || '').toLowerCase().includes('appointment') || (c.source || '').toLowerCase().includes('touch');
      notifications.push({
        id: c._id?.toString() || c.id,
        _id: c._id?.toString() || c.id,
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
        createdAt: c.createdAt || new Date().toISOString(),
      });
    }

    // Career job applications
    for (const a of recentApps) {
      notifications.push({
        id: a._id?.toString() || a.id,
        _id: a._id?.toString() || a.id,
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
        createdAt: a.createdAt || new Date().toISOString(),
      });
    }

    // Customer / Google reviews
    for (const r of recentReviews) {
      const isGoogle = r.source === 'Google' || !!r.googleReviewId;
      notifications.push({
        id: r._id?.toString() || r.id,
        _id: r._id?.toString() || r.id,
        type: 'review',
        category: 'inquiries',
        title: isGoogle ? 'New Google Review' : 'New Customer Review',
        author: r.name || 'Verified Client',
        email: r.email || '',
        preview: `${r.rating || 5} Stars • "${(r.message || r.comment || '').slice(0, 70)}${(r.message || '').length > 70 ? '...' : ''}"`,
        source: isGoogle ? 'Google Reviews' : 'Website Review',
        link: '/admin/reviews',
        isRead: r.isRead === true,
        createdAt: r.createdAt ? (new Date(r.createdAt)).toISOString() : new Date().toISOString(),
      });
    }

    // Blog comments
    for (const m of recentComments) {
      notifications.push({
        id: m._id?.toString() || m.id,
        _id: m._id?.toString() || m.id,
        type: 'comment',
        category: 'blogs',
        title: 'New Blog Comment',
        author: m.authorName || 'Blog Reader',
        email: m.authorEmail || '',
        preview: (m.comment || '').slice(0, 70),
        source: 'Blog Post',
        link: '/admin/blogs/comments',
        isRead: m.isRead === true,
        createdAt: m.createdAt || new Date().toISOString(),
      });
    }

    // Sort notifications newest first
    notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const totalInquiries = contactUnread + appUnread + reviewUnread;
    const totalBlogs = commentUnread;
    const totalAll = totalInquiries + totalBlogs;

    return NextResponse.json({
      counts: {
        contactMessages: contactUnread,
        jobApplications: appUnread,
        customerReviews: reviewUnread,
        blogComments: commentUnread,
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
      counts: { contactMessages: 0, jobApplications: 0, customerReviews: 0, blogComments: 0, total: 0 },
      unreadByGroup: { inquiries: 0, blogs: 0 },
      notifications: [],
      error: err.message,
    }, { status: 500, headers: CORS_HEADERS });
  }
}

// PATCH /api/admin/notifications -> Mark single item, category, or all as read
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, type, markAll, isRead = true } = body || {};
    const db = await getDb();

    // 1. Mark EVERYTHING across the system as read
    if (markAll && (!type || type === 'all')) {
      await Promise.all([
        db.collection('contact_submissions').updateMany({}, { $set: { isRead: true } }),
        db.collection('applications').updateMany({}, { $set: { isRead: true } }),
        db.collection('reviews').updateMany({}, { $set: { isRead: true } }),
        db.collection('cms_blog_comments').updateMany({}, { $set: { isRead: true } }),
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
      } else {
        // Search across all four collections
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

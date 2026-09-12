import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { logActivity } from '@/lib/activity-logger';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function jsonResponse(data, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS });
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// GET /api/blogs/comments -> list comments
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const blogId = url.searchParams.get('blogId');
    const all = url.searchParams.get('all') === 'true'; // admin views all statuses

    const db = await getDb();
    const col = db.collection('cms_blog_comments');

    const filter = {};
    if (blogId) {
      if (ObjectId.isValid(blogId) && blogId.length === 24) {
        filter.blogId = blogId;
      } else {
        const blogsCol = db.collection('cms_blogs');
        const blog = await blogsCol.findOne({ slug: blogId });
        if (blog) {
          filter.blogId = blog._id.toString();
        } else {
          return jsonResponse([]);
        }
      }
    }
    
    if (!all) {
      filter.$or = [{ approved: true }, { status: 'approved' }];
    }

    const cursor = col.find(filter).sort({ createdAt: -1 });
    const comments = await cursor.toArray();

    // Attach blog title and slug
    const blogsCol = db.collection('cms_blogs');
    const blogs = await blogsCol.find({}).toArray();
    const blogMap = {};
    blogs.forEach(b => {
      blogMap[b._id.toString()] = { title: b.title, slug: b.slug, coverImage: b.coverImage };
      blogMap[b.slug] = { title: b.title, slug: b.slug, coverImage: b.coverImage };
    });

    const enrichedComments = comments.map((c) => {
      const bInfo = blogMap[c.blogId] || { title: 'Deleted Article', slug: '', coverImage: '' };
      return {
        ...c,
        _id: c._id.toString(),
        blogTitle: bInfo.title,
        blogSlug: bInfo.slug,
        blogImage: bInfo.coverImage,
      };
    });

    return jsonResponse(enrichedComments);
  } catch (err) {
    console.error('GET /api/blogs/comments error', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

// POST /api/blogs/comments -> submit a verified comment or admin reply
export async function POST(req) {
  try {
    const body = await req.json();
    const blogId = (body.blogId || '').toString().trim();
    const authorName = (body.authorName || '').toString().trim();
    const authorEmail = (body.authorEmail || '').toString().trim().toLowerCase();
    const comment = (body.comment || '').toString().trim();
    const otp = (body.otp || '').toString().trim();
    const isAdmin = body.isAdmin === true || authorName.toLowerCase() === 'admin';
    const inReplyTo = body.inReplyTo ? body.inReplyTo.toString() : null;

    // Validation checks
    if (!blogId) {
      return jsonResponse({ error: 'Blog ID is required' }, 400);
    }
    if (!authorName) {
      return jsonResponse({ error: 'Please enter author name' }, 400);
    }
    if (!authorEmail) {
      return jsonResponse({ error: 'Please enter email address' }, 400);
    }
    if (!comment) {
      return jsonResponse({ error: 'Please enter comment text' }, 400);
    }

    const db = await getDb();

    // If submitted by regular user, verify OTP strictly
    if (!isAdmin) {
      if (!EMAIL_REGEX.test(authorEmail)) {
        return jsonResponse({ error: 'Please enter a valid email address' }, 400);
      }
      if (!otp) {
        return jsonResponse({ error: 'Verification code (OTP) is required' }, 400);
      }

      const otpsCol = db.collection('otps');
      const otpRecord = await otpsCol.findOne({ email: authorEmail, otp });
      
      if (!otpRecord) {
        return jsonResponse({ error: 'Invalid verification code.' }, 400);
      }

      if (new Date() > new Date(otpRecord.expiresAt)) {
        await otpsCol.deleteOne({ _id: otpRecord._id });
        return jsonResponse({ error: 'Verification code has expired.' }, 400);
      }

      await otpsCol.deleteOne({ _id: otpRecord._id });
    }

    // Verify blog exists
    const blogsCol = db.collection('cms_blogs');
    let blog = null;
    try {
      blog = await blogsCol.findOne({ _id: new ObjectId(blogId) });
    } catch (e) {
      blog = await blogsCol.findOne({ slug: blogId });
    }
    
    if (!blog) {
      return jsonResponse({ error: 'Referenced blog post not found' }, 404);
    }

    const col = db.collection('cms_blog_comments');

    const doc = {
      blogId: blog._id.toString(),
      authorName,
      authorEmail,
      authorIp: req.headers.get('x-forwarded-for') || '127.0.0.1',
      comment,
      inReplyTo,
      isMine: isAdmin,
      approved: isAdmin, // Admin replies auto-approved
      status: isAdmin ? 'approved' : 'pending',
      verified: true,
      createdAt: new Date(),
    };

    const result = await col.insertOne(doc);

    await logActivity(req, 'create_comment', authorName, { blogId: doc.blogId, id: result.insertedId.toString() });

    return jsonResponse({ 
      ok: true, 
      message: isAdmin ? 'Reply posted successfully!' : 'Comment submitted successfully and is pending approval.',
      comment: { ...doc, _id: result.insertedId.toString(), blogTitle: blog.title, blogSlug: blog.slug } 
    }, 201);
  } catch (err) {
    console.error('POST /api/blogs/comments error', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

// PATCH /api/blogs/comments -> update single or multiple comments (status / comment text)
export async function PATCH(req) {
  try {
    const body = await req.json();
    const id = body.id;
    const ids = Array.isArray(body.ids) ? body.ids : null;

    if (!id && (!ids || ids.length === 0)) {
      return jsonResponse({ error: 'id or ids array is required' }, 400);
    }

    const db = await getDb();
    const col = db.collection('cms_blog_comments');

    const updateFields = {};

    // Status update: approved | pending | spam | trash | rejected
    if (body.status !== undefined) {
      const validStatuses = ['approved', 'pending', 'spam', 'trash', 'rejected'];
      if (!validStatuses.includes(body.status)) {
        return jsonResponse({ error: 'Invalid status. Must be: approved, pending, spam, trash, rejected' }, 400);
      }
      updateFields.status = body.status;
      updateFields.approved = body.status === 'approved';
    }

    // Comment text edit
    if (body.comment !== undefined) {
      const trimmed = body.comment.toString().trim();
      if (!trimmed) return jsonResponse({ error: 'Comment text cannot be empty' }, 400);
      updateFields.comment = trimmed;
      updateFields.editedAt = new Date();
    }

    if (Object.keys(updateFields).length === 0) {
      return jsonResponse({ error: 'No fields to update' }, 400);
    }

    // Bulk update
    if (ids && ids.length > 0) {
      const objectIds = ids.filter(ObjectId.isValid).map(i => new ObjectId(i));
      await col.updateMany(
        { _id: { $in: objectIds } },
        { $set: updateFields }
      );
      return jsonResponse({ ok: true, count: objectIds.length });
    }

    // Single update
    if (!ObjectId.isValid(id)) return jsonResponse({ error: 'Invalid ID format' }, 400);

    const result = await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return jsonResponse({ error: 'Comment not found' }, 404);
    }

    await logActivity(req, 'update_comment', id, updateFields);

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error('PATCH /api/blogs/comments error', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

// DELETE /api/blogs/comments -> delete comment(s)
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    const idsParam = url.searchParams.get('ids');

    const db = await getDb();
    const col = db.collection('cms_blog_comments');

    if (idsParam) {
      const idsList = idsParam.split(',').filter(ObjectId.isValid).map(i => new ObjectId(i));
      const res = await col.deleteMany({ _id: { $in: idsList } });
      return jsonResponse({ ok: true, count: res.deletedCount });
    }

    if (!id || !ObjectId.isValid(id)) {
      return jsonResponse({ error: 'Valid id is required' }, 400);
    }

    const result = await col.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return jsonResponse({ error: 'Comment not found' }, 404);
    }

    await logActivity(req, 'delete_comment', id);

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error('DELETE /api/blogs/comments error', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

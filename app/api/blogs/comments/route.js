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

// GET /api/blogs/comments -> list comments (by blog or all for admin)
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const blogId = url.searchParams.get('blogId');
    const all = url.searchParams.get('all') === 'true'; // admin views all (approved and pending)

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

    // Map comments and attach blog title
    const blogsCol = db.collection('cms_blogs');
    const enrichedComments = await Promise.all(comments.map(async (c) => {
      let blogTitle = 'Deleted Blog';
      if (c.blogId) {
        try {
          const blog = await blogsCol.findOne({ _id: new ObjectId(c.blogId) });
          if (blog) {
            blogTitle = blog.title;
          }
        } catch (err) {
          const blog = await blogsCol.findOne({ slug: c.blogId });
          if (blog) {
            blogTitle = blog.title;
          }
        }
      }

      return {
        ...c,
        _id: c._id.toString(),
        blogTitle,
      };
    }));

    return jsonResponse(enrichedComments);
  } catch (err) {
    console.error('GET /api/blogs/comments error', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

// POST /api/blogs/comments -> submit a verified comment
export async function POST(req) {
  try {
    const body = await req.json();
    const blogId = (body.blogId || '').toString().trim();
    const authorName = (body.authorName || '').toString().trim();
    const authorEmail = (body.authorEmail || '').toString().trim().toLowerCase();
    const comment = (body.comment || '').toString().trim();
    const otp = (body.otp || '').toString().trim();

    // Validation checks
    if (!blogId) {
      return jsonResponse({ error: 'Blog ID is required' }, 400);
    }
    if (!authorName) {
      return jsonResponse({ error: 'Please enter your name' }, 400);
    }
    if (!authorEmail) {
      return jsonResponse({ error: 'Please enter your email address' }, 400);
    }
    if (!EMAIL_REGEX.test(authorEmail)) {
      return jsonResponse({ error: 'Please enter a valid email address (e.g. name@domain.com)' }, 400);
    }
    if (!comment) {
      return jsonResponse({ error: 'Please enter your comment' }, 400);
    }
    if (comment.length < 3) {
      return jsonResponse({ error: 'Comment must be at least 3 characters long' }, 400);
    }
    if (!otp) {
      return jsonResponse({ error: 'Verification code (OTP) is required. Please check your email.' }, 400);
    }

    const db = await getDb();

    // Verify OTP strictly
    const otpsCol = db.collection('otps');
    const otpRecord = await otpsCol.findOne({ email: authorEmail, otp });
    
    if (!otpRecord) {
      return jsonResponse({ error: 'Invalid verification code. Please check your email or request a new code.' }, 400);
    }

    if (new Date() > new Date(otpRecord.expiresAt)) {
      await otpsCol.deleteOne({ _id: otpRecord._id });
      return jsonResponse({ error: 'Verification code has expired. Please request a new code.' }, 400);
    }

    // Delete OTP after successful verification to prevent reuse
    await otpsCol.deleteOne({ _id: otpRecord._id });
    
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

    // Duplicate comment prevention within 60 seconds
    const existingRecent = await col.findOne({
      blogId: blog._id.toString(),
      authorEmail,
      comment,
      createdAt: { $gte: new Date(Date.now() - 60 * 1000) }
    });

    if (existingRecent) {
      return jsonResponse({ error: 'You have already submitted this comment recently.' }, 400);
    }

    const doc = {
      blogId: blog._id.toString(),
      authorName,
      authorEmail,
      comment,
      approved: false, // Pending admin moderation
      status: 'pending',
      verified: true,
      createdAt: new Date(),
    };

    const result = await col.insertOne(doc);

    await logActivity(req, 'create_comment', authorName, { blogId: doc.blogId, id: result.insertedId.toString() });

    return jsonResponse({ 
      ok: true, 
      message: 'Comment submitted successfully! It will appear once approved by admin.',
      comment: { ...doc, _id: result.insertedId.toString() } 
    }, 201);
  } catch (err) {
    console.error('POST /api/blogs/comments error', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

// PATCH /api/blogs/comments -> update comment (status and/or text)
export async function PATCH(req) {
  try {
    const body = await req.json();
    const id = body.id;
    if (!id) return jsonResponse({ error: 'id is required' }, 400);
    if (!ObjectId.isValid(id)) return jsonResponse({ error: 'Invalid ID format' }, 400);

    const db = await getDb();
    const col = db.collection('cms_blog_comments');

    const updateFields = {};

    // Status update: approved | pending | rejected
    if (body.status !== undefined) {
      const validStatuses = ['approved', 'pending', 'rejected'];
      if (!validStatuses.includes(body.status)) {
        return jsonResponse({ error: 'Invalid status. Must be: approved, pending, rejected' }, 400);
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

// DELETE /api/blogs/comments?id=... -> delete a comment
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) return jsonResponse({ error: 'id is required' }, 400);
    if (!ObjectId.isValid(id)) return jsonResponse({ error: 'Invalid ID format' }, 400);

    const db = await getDb();
    const col = db.collection('cms_blog_comments');

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

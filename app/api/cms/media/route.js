import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import cloudinary from 'cloudinary';
import { logActivity } from '@/lib/activity-logger';

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dqghun7oj',
  api_key: process.env.CLOUDINARY_API_KEY || '281487587427693',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'bxbrN76auL9pNUINMVdKJwqv6Uo',
  secure: true,
});

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_ADMIN_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function jsonResponse(data, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS });
}

// GET /api/cms/media → List media files
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const websiteId = url.searchParams.get('websiteId') || 'default';
    const search = url.searchParams.get('search') || '';
    const folder = url.searchParams.get('folder') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '24');
    const skip = (page - 1) * limit;

    const db = await getDb();
    const collection = db.collection('cms_media');

    const filter = { websiteId };
    if (search) {
      filter.$or = [
        { fileName: { $regex: search, $options: 'i' } },
        { originalName: { $regex: search, $options: 'i' } },
        { alt: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }
    if (folder) filter.folder = folder;

    const total = await collection.countDocuments(filter);
    const media = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const normalized = media.map(m => ({
      ...m,
      _id: m._id.toString(),
    }));

    const folders = await collection.distinct('folder', { websiteId });

    return jsonResponse({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      folders: folders.filter(Boolean),
      media: normalized,
    });
  } catch (err) {
    console.error('GET /api/cms/media error:', err);
    return jsonResponse({ error: 'Failed to fetch media' }, 500);
  }
}

// POST /api/cms/media → Upload media file to Cloudinary
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const websiteId = formData.get('websiteId') || 'default';
    const folder = formData.get('folder') || 'general';
    const alt = formData.get('alt') || '';
    const title = formData.get('title') || '';
    const tags = formData.get('tags') || '';

    if (!file) {
      return jsonResponse({ error: 'No file uploaded' }, 400);
    }

    // Upload to Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: `cms/${websiteId}/${folder}`,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    });

    // Save metadata to MongoDB
    const db = await getDb();
    const doc = {
      websiteId,
      fileName: result.public_id.split('/').pop(),
      originalName: file.name || 'unnamed',
      url: result.secure_url,
      thumbnailUrl: cloudinary.v2.url(result.public_id, {
        width: 300,
        height: 300,
        crop: 'fill',
        quality: 'auto',
        format: 'webp',
      }),
      mimeType: file.type || 'image/jpeg',
      size: result.bytes || 0,
      width: result.width || 0,
      height: result.height || 0,
      alt: alt,
      title: title,
      folder: folder,
      tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      cloudinaryId: result.public_id,
      createdAt: new Date().toISOString(),
    };

    const insertResult = await db.collection('cms_media').insertOne(doc);

    await logActivity(request, 'upload_media', doc.originalName, { mimeType: doc.mimeType, size: doc.size, id: insertResult.insertedId.toString() });

    return jsonResponse({
      ok: true,
      media: { ...doc, _id: insertResult.insertedId.toString() },
    }, 201);
  } catch (err) {
    console.error('POST /api/cms/media error:', err);
    return jsonResponse({ error: 'Upload failed: ' + err.message }, 500);
  }
}

// PATCH /api/cms/media → Update media metadata
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, alt, title, folder, tags } = body;

    if (!id) return jsonResponse({ error: 'id is required' }, 400);

    const db = await getDb();
    const updateFields = { updatedAt: new Date().toISOString() };
    if (alt !== undefined) updateFields.alt = alt;
    if (title !== undefined) updateFields.title = title;
    if (folder !== undefined) updateFields.folder = folder;
    if (tags !== undefined) {
      updateFields.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()).filter(Boolean);
    }

    const result = await db.collection('cms_media').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return jsonResponse({ error: 'Media not found' }, 404);
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error('PATCH /api/cms/media error:', err);
    return jsonResponse({ error: 'Failed to update media' }, 500);
  }
}

// DELETE /api/cms/media → Delete media file from Cloudinary and MongoDB
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) return jsonResponse({ error: 'id is required' }, 400);

    const db = await getDb();
    const media = await db.collection('cms_media').findOne({ _id: new ObjectId(id) });

    if (!media) return jsonResponse({ error: 'Media not found' }, 404);

    // Delete from Cloudinary
    if (media.cloudinaryId) {
      try {
        await cloudinary.v2.uploader.destroy(media.cloudinaryId);
      } catch (cloudErr) {
        console.warn('Cloudinary delete failed:', cloudErr);
      }
    }

    // Delete from MongoDB
    await db.collection('cms_media').deleteOne({ _id: new ObjectId(id) });

    await logActivity(request, 'delete_media', media.originalName, { id });

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error('DELETE /api/cms/media error:', err);
    return jsonResponse({ error: 'Failed to delete media' }, 500);
  }
}

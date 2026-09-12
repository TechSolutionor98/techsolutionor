import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

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

// GET /api/cms/redirects → List all redirects
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const websiteId = url.searchParams.get('websiteId') || 'default';
    const status = url.searchParams.get('status'); // active | inactive
    const search = url.searchParams.get('search') || '';

    const db = await getDb();
    const collection = db.collection('cms_redirects');

    const filter = { websiteId };
    if (status && status !== 'all') filter.status = status;
    if (search) {
      filter.$or = [
        { fromPath: { $regex: search, $options: 'i' } },
        { toPath: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const redirects = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    const normalized = redirects.map(r => ({
      ...r,
      _id: r._id.toString(),
    }));

    return jsonResponse({ total: normalized.length, redirects: normalized });
  } catch (err) {
    console.error('GET /api/cms/redirects error:', err);
    return jsonResponse({ error: 'Failed to fetch redirects' }, 500);
  }
}

// POST /api/cms/redirects → Create a new redirect
export async function POST(request) {
  try {
    const body = await request.json();
    const { fromPath, toPath, type = '301', status = 'active', description = '', websiteId = 'default' } = body;

    // Validation
    if (!fromPath || !fromPath.startsWith('/')) {
      return jsonResponse({ error: 'Redirect From path must start with a slash (/)' }, 400);
    }
    if (!toPath) {
      return jsonResponse({ error: 'Redirect To destination is required' }, 400);
    }
    if (!toPath.startsWith('/') && !toPath.startsWith('http://') && !toPath.startsWith('https://')) {
      return jsonResponse({ error: 'Redirect To must be a relative path starting with / or an absolute URL (http/https)' }, 400);
    }

    const db = await getDb();
    const collection = db.collection('cms_redirects');

    // Clean slashes for internal links
    const cleanFrom = fromPath.replace(/\/+$/, '') || '/';
    const cleanTo = toPath.startsWith('/') ? (toPath.replace(/\/+$/, '') || '/') : toPath;

    // Check for duplicate fromPath
    const existing = await collection.findOne({ fromPath: cleanFrom, websiteId });
    if (existing) {
      return jsonResponse({ error: `A redirect rule from "${cleanFrom}" already exists.` }, 409);
    }

    const now = new Date().toISOString();
    const redirectData = {
      fromPath: cleanFrom,
      toPath: cleanTo,
      type: type.toString(),
      status,
      description,
      websiteId,
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(redirectData);

    return jsonResponse({
      ok: true,
      redirect: {
        ...redirectData,
        _id: result.insertedId.toString(),
      }
    }, 211); // standard OK response code
  } catch (err) {
    console.error('POST /api/cms/redirects error:', err);
    return jsonResponse({ error: 'Failed to create redirect' }, 500);
  }
}

// PATCH /api/cms/redirects → Update a redirect
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, fromPath, toPath, type, status, description } = body;

    if (!id) return jsonResponse({ error: 'id is required' }, 400);

    const db = await getDb();
    const collection = db.collection('cms_redirects');

    const updateFields = { updatedAt: new Date().toISOString() };
    
    if (fromPath !== undefined) {
      if (!fromPath.startsWith('/')) {
        return jsonResponse({ error: 'Redirect From path must start with a slash (/)' }, 400);
      }
      updateFields.fromPath = fromPath.replace(/\/+$/, '') || '/';
    }
    
    if (toPath !== undefined) {
      if (!toPath.startsWith('/') && !toPath.startsWith('http://') && !toPath.startsWith('https://')) {
        return jsonResponse({ error: 'Redirect To must be a relative path starting with / or an absolute URL (http/https)' }, 400);
      }
      updateFields.toPath = toPath.startsWith('/') ? (toPath.replace(/\/+$/, '') || '/') : toPath;
    }
    
    if (type !== undefined) updateFields.type = type.toString();
    if (status !== undefined) updateFields.status = status;
    if (description !== undefined) updateFields.description = description;

    // If fromPath changed, check duplicate
    if (updateFields.fromPath) {
      const existing = await collection.findOne({ 
        fromPath: updateFields.fromPath, 
        _id: { $ne: new ObjectId(id) } 
      });
      if (existing) {
        return jsonResponse({ error: `A redirect rule from "${updateFields.fromPath}" already exists.` }, 409);
      }
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return jsonResponse({ error: 'Redirect not found' }, 404);
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error('PATCH /api/cms/redirects error:', err);
    return jsonResponse({ error: 'Failed to update redirect' }, 500);
  }
}

// DELETE /api/cms/redirects → Delete a redirect
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) return jsonResponse({ error: 'id is required' }, 400);

    const db = await getDb();
    const collection = db.collection('cms_redirects');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return jsonResponse({ error: 'Redirect not found' }, 404);
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error('DELETE /api/cms/redirects error:', err);
    return jsonResponse({ error: 'Failed to delete redirect' }, 500);
  }
}

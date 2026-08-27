import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { logActivity } from '../../../lib/activity-logger';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Respond to preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function jsonResponse(data, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS });
}

// POST /api/reviews  -> create a new review
export async function POST(req) {
  try {
    const body = await req.json();
    // support multiple possible field names from different frontends
    const name = (body.name || '').toString().trim();
    const position = (body.position || '').toString().trim();
    const company = (body.company || '').toString().trim();
    // frontend sometimes posts `comment` instead of `message`
    const message = (body.message || body.comment || body.review || '').toString().trim();
    const email = (body.email || '').toString().trim();
    const avatar = (body.avatar || body.image || '').toString().trim();
    const title = (body.title || body.reviewTitle || '').toString().trim();
    let rating = Number(body.rating ?? 5);
    if (!name || !message) {
      console.warn('POST /api/reviews validation failed', { bodyPreview: { name: body.name, comment: body.comment, message: body.message, rating: body.rating } });
      return jsonResponse({ error: 'name and message (or comment) are required' }, 400);
    }
    if (!Number.isFinite(rating)) rating = 5;
    rating = Math.max(1, Math.min(5, Math.round(rating)));

    const db = await getDb();
    const col = db.collection('reviews');

    const doc = {
      name,
      email: email || null,
      position: position || null,
      company: company || null,
      title: title || null,
      rating,
      message,
      avatar: avatar || null,
      createdAt: new Date(),
      approved: true, // admin can approve later
    };

    const result = await col.insertOne(doc);
    await logActivity(req, 'create_review', name, { rating, company, position });
    // return saved document with string id
    return jsonResponse({ ...doc, _id: result.insertedId.toString() }, 201);
  } catch (err) {
    console.error('POST /api/reviews error', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

// GET /api/reviews  -> list reviews (only approved by default)
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const all = url.searchParams.get('all') === 'true';

    const db = await getDb();
    const col = db.collection('reviews');

    const filter = all ? {} : { approved: true };
    const cursor = col.find(filter).sort({ createdAt: -1 }).limit(200);
    const rows = await cursor.toArray();
    const normalized = rows.map(r => ({
      ...r,
      _id: r._id.toString(),
      createdAt: r.createdAt ? (new Date(r.createdAt)).toISOString() : null,
      avatar: r.avatar || null,
      email: r.email || null,
      title: r.title || null,
    }));
    return jsonResponse(normalized);
  } catch (err) {
    console.error('GET /api/reviews error', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

// PATCH /api/reviews  -> update review (approve/unapprove)
export async function PATCH(req) {
  try {
    const body = await req.json();
    const id = body.id;
    if (!id) return jsonResponse({ error: 'id is required' }, 400);
    const approve = !!body.approve;

    const db = await getDb();
    const col = db.collection('reviews');

    const existing = await col.findOne({ _id: new ObjectId(id) });
    const target = existing ? existing.name : id;

    const result = await col.updateOne({ _id: new ObjectId(id) }, { $set: { approved: approve } });
    if (result.matchedCount === 0) {
      return jsonResponse({ error: 'Not found' }, 404);
    }

    await logActivity(req, 'update_review', target, { id, approved: approve });

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error('PATCH /api/reviews error', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

// DELETE /api/reviews?id=...  -> delete a review
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) return jsonResponse({ error: 'id is required' }, 400);

    const db = await getDb();
    const col = db.collection('reviews');
    const existing = await col.findOne({ _id: new ObjectId(id) });
    const target = existing ? existing.name : id;

    const result = await col.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return jsonResponse({ error: 'Not found' }, 404);

    await logActivity(req, 'delete_review', target, { id });

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error('DELETE /api/reviews error', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

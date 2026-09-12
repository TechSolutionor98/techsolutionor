import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_ADMIN_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function jsonResponse(data, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS });
}

// GET /api/cms/activity → List activity logs
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const websiteId = url.searchParams.get('websiteId') || 'default';
    const action = url.searchParams.get('action');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const db = await getDb();
    const filter = {};
    if (websiteId !== 'all') filter.websiteId = websiteId;
    if (action) filter.action = action;

    const total = await db.collection('cms_activity_logs').countDocuments(filter);
    const logs = await db.collection('cms_activity_logs')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const normalized = logs.map(l => ({
      ...l,
      _id: l._id.toString(),
    }));

    return jsonResponse({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      logs: normalized,
    });
  } catch (err) {
    console.error('GET /api/cms/activity error:', err);
    return jsonResponse({ error: 'Failed to fetch activity logs' }, 500);
  }
}

// POST /api/cms/activity → Log an activity
export async function POST(request) {
  try {
    const body = await request.json();
    const { websiteId = 'default', userId, userName, action, target, details } = body;

    if (!action) {
      return jsonResponse({ error: 'action is required' }, 400);
    }

    const db = await getDb();
    const doc = {
      websiteId,
      userId: userId || null,
      userName: userName || 'System',
      action,
      target: target || '',
      details: details || {},
      createdAt: new Date().toISOString(),
    };

    await db.collection('cms_activity_logs').insertOne(doc);

    return jsonResponse({ ok: true }, 201);
  } catch (err) {
    console.error('POST /api/cms/activity error:', err);
    return jsonResponse({ error: 'Failed to log activity' }, 500);
  }
}

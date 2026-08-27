import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_ADMIN_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function jsonResponse(data, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS });
}

// GET /api/cms/redirect-check?path=... → Check if there is a matching redirect path
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const pathParam = url.searchParams.get('path');
    const websiteId = url.searchParams.get('websiteId') || 'default';

    if (!pathParam) {
      return jsonResponse({ redirect: null });
    }

    const normalizedPath = pathParam.replace(/\/+$/, '') || '/';

    const db = await getDb();
    const collection = db.collection('cms_redirects');

    const redirect = await collection.findOne({
      fromPath: normalizedPath,
      $or: [{ websiteId }, { websiteId: { $exists: false } }]
    });

    if (redirect && redirect.toPath && redirect.toPath !== normalizedPath) {
      return jsonResponse({
        redirect: {
          fromPath: redirect.fromPath,
          toPath: redirect.toPath,
          type: redirect.type || '301',
        }
      });
    }

    return jsonResponse({ redirect: null });
  } catch (err) {
    console.error('GET /api/cms/redirect-check error:', err);
    return jsonResponse({ redirect: null });
  }
}

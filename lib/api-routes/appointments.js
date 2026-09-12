import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_ADMIN_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  'Pragma': 'no-cache',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

// GET all appointment links
export async function GET() {
  try {
    const db = await getDb();
    const doc = await db.collection('appointments').findOne({ _id: 'appointment_links' });
    const links = doc?.links || [];
    return NextResponse.json({ links }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('Error fetching appointments:', err);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500, headers: CORS_HEADERS });
  }
}

// POST – save all appointment links (full replace)
export async function POST(request) {
  try {
    const body = await request.json();
    const links = Array.isArray(body.links) ? body.links : [];

    // Validate each link has name + url, preserve active status
    const sanitized = links
      .filter(l => l.name && l.url)
      .map(l => ({
        id: l.id || `link_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        name: String(l.name).trim(),
        url: String(l.url).trim(),
        description: l.description ? String(l.description).trim() : '',
        profileImage: l.profileImage ? String(l.profileImage).trim() : '',
        category: l.category ? String(l.category).trim() : '',
        socials: {
          linkedin: l.socials?.linkedin ? String(l.socials.linkedin).trim() : '',
          twitter: l.socials?.twitter ? String(l.socials.twitter).trim() : '',
          facebook: l.socials?.facebook ? String(l.socials.facebook).trim() : '',
          instagram: l.socials?.instagram ? String(l.socials.instagram).trim() : '',
        },
        active: l.active !== false, // default true if not set
      }));

    const db = await getDb();
    await db.collection('appointments').replaceOne(
      { _id: 'appointment_links' },
      { _id: 'appointment_links', links: sanitized, updatedAt: new Date().toISOString() },
      { upsert: true }
    );

    return NextResponse.json({ ok: true, links: sanitized }, { status: 200, headers: CORS_HEADERS });
  } catch (err) {
    console.error('Error saving appointments:', err);
    return NextResponse.json({ error: 'Failed to save appointments' }, { status: 500, headers: CORS_HEADERS });
  }
}

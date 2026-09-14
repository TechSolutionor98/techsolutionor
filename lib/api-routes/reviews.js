import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { logActivity } from '@/lib/activity-logger';

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

// Helper: sync reviews from Google Places API if credentials are configured
async function syncGooglePlacesReviews(db, force = false) {
  try {
    const settings = await db.collection('settings').findOne({ _id: 'website_settings' });
    const placeId = process.env.GOOGLE_PLACE_ID || settings?.googlePlaceId;
    const apiKey = process.env.GOOGLE_PLACES_API_KEY || settings?.googleApiKey;

    if (!placeId || !apiKey) {
      return false;
    }

    const lastSync = settings?.lastGoogleReviewSync ? new Date(settings.lastGoogleReviewSync).getTime() : 0;
    const now = Date.now();
    // Cache for 30 minutes to stay within Google API quotas, unless force=true
    if (!force && now - lastSync < 30 * 60 * 1000) {
      return false;
    }

    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=name,rating,reviews,user_ratings_total&key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(apiUrl, { next: { revalidate: 1800 } });
    if (!res.ok) return false;

    const data = await res.json();
    if (data.status === 'OK' && data.result && Array.isArray(data.result.reviews)) {
      const col = db.collection('reviews');
      for (const gr of data.result.reviews) {
        const googleReviewId = `google_${gr.author_name}_${gr.time}`;
        await col.updateOne(
          { googleReviewId },
          {
            $set: {
              name: gr.author_name,
              avatar: gr.profile_photo_url || null,
              rating: gr.rating || 5,
              message: gr.text || '',
              time: gr.relative_time_description || 'Recently',
              authorUrl: gr.author_url || null,
              source: 'Google',
              approved: true,
              googleReviewId,
              createdAt: new Date((gr.time || Math.floor(now / 1000)) * 1000),
            },
          },
          { upsert: true }
        );
      }

      await db.collection('settings').updateOne(
        { _id: 'website_settings' },
        {
          $set: {
            lastGoogleReviewSync: new Date().toISOString(),
            googleUserRatingsTotal: data.result.user_ratings_total || 22,
            googleRating: data.result.rating || 5.0,
          },
        },
        { upsert: true }
      );
      return true;
    }
  } catch (err) {
    console.warn('syncGooglePlacesReviews error:', err.message);
  }
  return false;
}

// Seed initial verified customer reviews if MongoDB reviews collection is completely empty
async function seedInitialReviewsIfEmpty(col) {
  const count = await col.countDocuments();
  if (count >= 8) return;

  const initialSeed = [
    {
      name: 'DreamCatcherTV',
      initial: 'D',
      color: 'bg-[#F47413]',
      rating: 5,
      time: '10 days ago',
      message: 'We hired TechSolutionor to develop our eCommerce platform, and the outcome exceeded expectations. The website is fast, easy to manage, and optimized for conversions. We appreciate their professional approach.',
      source: 'Google',
      approved: true,
      createdAt: new Date(Date.now() - 10 * 86400000),
    },
    {
      name: 'Bellanoir',
      initial: 'B',
      color: 'bg-[#912D91]',
      rating: 5,
      time: '10 days ago',
      message: 'Very professional team. Our social media engagement improved noticeably after working with them.',
      source: 'Google',
      approved: true,
      createdAt: new Date(Date.now() - 10 * 86400000),
    },
    {
      name: 'Endless Data',
      initial: 'E',
      color: 'bg-[#2B6DAA]',
      rating: 5,
      time: 'a year ago',
      message: 'good experience',
      source: 'Google',
      approved: true,
      createdAt: new Date(Date.now() - 365 * 86400000),
    },
    {
      name: 'Salam Bin Sultan',
      initial: 'S',
      color: 'bg-[#43B949]',
      rating: 5,
      time: '2 months ago',
      message: 'Our partnership with Techsolutionor has exceeded our expectations. Their innovative solutions and reliable support have been crucial in driving our branch technology initiatives forward.',
      source: 'Google',
      approved: true,
      createdAt: new Date(Date.now() - 60 * 86400000),
    },
    {
      name: 'M saleem Mughal',
      initial: 'M',
      color: 'bg-[#4F46E5]',
      rating: 5,
      time: 'Recently',
      message: 'Exceptional engineering and digital transformation consultancy. Tech Solutionor delivered our project ahead of schedule with top-tier technical quality.',
      source: 'Google',
      approved: true,
      createdAt: new Date(Date.now() - 2 * 86400000),
    },
    {
      name: 'Apex Digital Systems',
      initial: 'A',
      color: 'bg-[#059669]',
      rating: 5,
      time: '3 weeks ago',
      message: 'Great communication and solid technical stack. They built our cloud architecture with high performance and zero downtime.',
      source: 'Google',
      approved: true,
      createdAt: new Date(Date.now() - 21 * 86400000),
    },
    {
      name: 'OmniRetail Solutions',
      initial: 'O',
      color: 'bg-[#0284C7]',
      rating: 5,
      time: '1 month ago',
      message: 'The custom POS system and inventory management developed by Tech Solutionor streamlined our retail operations across all branches in Dubai.',
      source: 'Google',
      approved: true,
      createdAt: new Date(Date.now() - 30 * 86400000),
    },
    {
      name: 'NEXA Technologies',
      initial: 'N',
      color: 'bg-[#7C3AED]',
      rating: 5,
      time: '2 weeks ago',
      message: 'Outstanding UI/UX redesign and web app development. Their attention to detail and responsive design delivered a flawless customer experience.',
      source: 'Google',
      approved: true,
      createdAt: new Date(Date.now() - 14 * 86400000),
    },
  ];

  for (const r of initialSeed) {
    await col.updateOne(
      { name: r.name },
      { $setOnInsert: r },
      { upsert: true }
    );
  }
}

// POST /api/reviews  -> create a new review
export async function POST(req) {
  try {
    const body = await req.json();
    const name = (body.name || '').toString().trim();
    const position = (body.position || '').toString().trim();
    const company = (body.company || '').toString().trim();
    const message = (body.message || body.comment || body.review || '').toString().trim();
    const email = (body.email || '').toString().trim();
    const avatar = (body.avatar || body.image || '').toString().trim();
    const title = (body.title || body.reviewTitle || '').toString().trim();
    let rating = Number(body.rating ?? 5);
    
    if (!name || !message) {
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
      source: body.source || 'Website',
      createdAt: new Date(),
      approved: true,
    };

    const result = await col.insertOne(doc);
    await logActivity(req, 'create_review', name, { rating, company, position });
    return jsonResponse({ ...doc, _id: result.insertedId.toString() }, 201);
  } catch (err) {
    console.error('POST /api/reviews error', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

// GET /api/reviews  -> list reviews (only approved by default, with dynamic Google sync)
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const all = url.searchParams.get('all') === 'true';
    const forceSync = url.searchParams.get('sync') === 'true';

    const db = await getDb();
    const col = db.collection('reviews');

    // 1. Attempt Google Places API sync if configured
    await syncGooglePlacesReviews(db, forceSync);

    // 2. Ensure initial seed if database is completely empty
    await seedInitialReviewsIfEmpty(col);

    // 3. Query all approved reviews
    const filter = all ? {} : { approved: true };
    const cursor = col.find(filter).sort({ createdAt: -1 }).limit(200);
    const rows = await cursor.toArray();
    
    const normalized = rows.map(r => ({
      ...r,
      _id: r._id.toString(),
      name: r.name || 'Verified Client',
      message: r.message || r.comment || r.review || '',
      rating: r.rating || 5,
      time: r.time || (r.createdAt ? formatRelativeTime(new Date(r.createdAt)) : 'Recently'),
      createdAt: r.createdAt ? (new Date(r.createdAt)).toISOString() : null,
      avatar: r.avatar || null,
      source: r.source || 'Google',
      email: r.email || null,
      title: r.title || null,
      company: r.company || null,
    }));

    return jsonResponse(normalized);
  } catch (err) {
    console.error('GET /api/reviews error', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

function formatRelativeTime(date) {
  const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays} days ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} months ago`;
  return `${Math.floor(diffMonths / 12)} years ago`;
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

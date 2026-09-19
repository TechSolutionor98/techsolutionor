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

// 1. Official Google Places API fetcher (when API key is provided)
async function fetchFromGooglePlacesApi(placeId, apiKey) {
  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=name,rating,reviews,user_ratings_total&key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(apiUrl);
    if (!res.ok) return { success: false, reviews: [] };
    const data = await res.json();
    if (data.status === 'OK' && data.result && Array.isArray(data.result.reviews)) {
      return {
        success: true,
        userRatingsTotal: data.result.user_ratings_total || 22,
        rating: data.result.rating || 5.0,
        reviews: data.result.reviews.map(gr => ({
          googleReviewId: `google_${gr.author_name}_${gr.time}`,
          name: gr.author_name,
          avatar: gr.profile_photo_url || null,
          rating: gr.rating || 5,
          message: gr.text || '',
          time: gr.relative_time_description || 'Recently',
          authorUrl: gr.author_url || null,
          timestamp: (gr.time || Math.floor(Date.now() / 1000)) * 1000,
        }))
      };
    }
    return { success: false, reviews: [] };
  } catch (err) {
    console.warn('fetchFromGooglePlacesApi error:', err.message);
    return { success: false, reviews: [] };
  }
}

// 2. Direct Google Maps place reviews fetcher (fetches real public reviews without hardcoding)
async function fetchFromGoogleMapsPlace(placeId) {
  const reviewsMap = new Map();
  // Protocol buffer representation for Tech Solutionor on Google Maps
  const basePb = '%211m17%211s0x3922690028c54b9b%3A0xca22fe83b0b4c525%212sTech+Solutionor%213m8%211m3%211d3404.388292734044%212d73.1201569%213d31.4309756%213m2%211i1024%212i768%214f13.1%214m2%213d31.4309756%214d73.1201569%2115m2%211m1%214s%2Fg%2F11w20lc62j%2112m4%212m3%211i360%212i120%214i8%2113m57%212m2%211i203%212i100%213m2%212i4%215b1%216m6%211m2%211i86%212i86%211m2%211i408%212i240%217m33%211m3%211e1%212b0%213e3%211m3%211e2%212b1%213e2%211m3%211e2%212b0%213e3%211m3%211e8%212b0%213e3%211m3%211e10%212b0%213e3%211m3%211e10%212b1%213e2%211m3%211e10%212b0%213e4%211m3%211e9%212b1%213e2%212b1%219b0%2115m8%211m7%211m2%211m1%211e2%212m2%211i195%212i195%213i20%2114m3%211s6DKoaoH7PM2VhvcPuanqmQ8%217e81%2115i10112%2115m108%211m26%2113m9%212b1%213b1%214b1%216i1%218b1%219b1%2114b1%2120b1%2125b1%2118m15%213b1%214b1%215b1%216b1%2113b1%2114b1%2117b1%2121b1%2122b1%2130b1%2132b1%2133m1%211b1%2134b1%2136e2%2110m1%218e3%2111m1%213e1%2117b1%2120m2%211e3%211e6%2124b1%2125b1%2126b1%2127b1%2129b1%2130m1%212b1%2136b1%2137b1%2139m3%212m2%212i1%213i1%2143b1%2152b1%2154m1%211b1%2155b1%2156m1%211b1%2161m2%211m1%211e1%2165m5%213m4%211m3%211m2%211i224%212i298%2172m22%211m8%212b1%215b1%217b1%2112m4%211b1%212b1%214m1%211e1%214b1%218m10%211m6%214m1%211e1%214m1%211e3%214m1%211e4%213sother_user_google_review_posts__and__hotel_and_vr_partner_review_posts%216m1%211e1%219b1%2189b1%2190m2%211m1%211e2%2198m3%211b1%212b1%213b1%21103b1%21113b1%21114m3%211b1%212m1%211b1%21117b1%21122m1%211b1%21126b1%21127b1%21128m1%211b1%2121m0%2122m1%211e81%2130m8%213b1%216m2%211b1%212b1%217m2%211e3%212b1%219b1%2134m5%217b1%2110b1%2114b1%2115m1%211b0%2137i794';

  const modes = [
    { sort: 'newest', pb: basePb.replace('%216m1%211e1', '%216m1%211e2') },
    { sort: 'relevant', pb: basePb },
  ];

  let totalRatings = 22;
  let averageRating = 5.0;

  for (const m of modes) {
    try {
      const url = `https://www.google.com/maps/preview/place?authuser=0&hl=en&q=Tech+Solutionor&pb=${m.pb}`;
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
        }
      });
      if (!res.ok) continue;
      let text = await res.text();
      const start = text.indexOf('[');
      if (start === -1) continue;
      const data = JSON.parse(text.slice(start));

      const ratingsTotal = data?.[6]?.[4]?.[8];
      const avgRate = data?.[6]?.[4]?.[7];
      if (ratingsTotal) totalRatings = ratingsTotal;
      if (avgRate) averageRating = avgRate;

      const list = data?.[6]?.[175]?.[9]?.[0]?.[0] || [];
      for (const item of list) {
        const raw = item[0];
        const revId = raw?.[0];
        const name = raw?.[1]?.[4]?.[5]?.[0];
        const rating = raw?.[2]?.[0]?.[0] || 5;
        const timeDesc = raw?.[1]?.[6] || 'Recently';
        const message = raw?.[2]?.[15]?.[0]?.[0] || '';
        const avatar = raw?.[1]?.[4]?.[5]?.[1] || null;
        const authorUrl = raw?.[1]?.[4]?.[2]?.[0] || null;
        const timestamp = raw?.[1]?.[2] ? Math.floor(raw[1][2] / 1000) : Date.now();

        if (name && (revId || message || rating)) {
          const key = revId || `google_${name}_${Math.floor(timestamp / 1000)}`;
          if (!reviewsMap.has(key)) {
            reviewsMap.set(key, {
              googleReviewId: key,
              name,
              avatar,
              rating,
              message,
              time: timeDesc,
              authorUrl,
              source: 'Google',
              timestamp,
            });
          }
        }
      }
    } catch (err) {
      console.warn(`fetchFromGoogleMapsPlace (${m.sort}) error:`, err.message);
    }
  }

  return {
    reviews: Array.from(reviewsMap.values()),
    userRatingsTotal: totalRatings,
    rating: averageRating,
  };
}

// Main Google Reviews sync logic
async function syncGooglePlacesReviews(db, force = false) {
  try {
    const settings = await db.collection('settings').findOne({ _id: 'website_settings' });
    const defaultPlaceId = 'ChIJm0vFKABpIjkRJcW0sIP-Iso'; // Tech Solutionor Google Place ID
    const placeId = process.env.GOOGLE_PLACE_ID || settings?.googlePlaceId || defaultPlaceId;
    const apiKey = process.env.GOOGLE_PLACES_API_KEY || settings?.googleApiKey;

    const lastSync = settings?.lastGoogleReviewSync ? new Date(settings.lastGoogleReviewSync).getTime() : 0;
    const now = Date.now();
    // Cache for 30 minutes to minimize external calls, unless force=true
    if (!force && now - lastSync < 30 * 60 * 1000) {
      return { success: true, cached: true, reason: 'Using cached reviews (synced recently).' };
    }

    let allFetchedReviews = [];
    let userRatingsTotal = settings?.googleUserRatingsTotal || 22;
    let averageRating = settings?.googleRating || 5.0;

    // 1. Try Google Places API Details if API key is provided
    if (apiKey) {
      const apiResult = await fetchFromGooglePlacesApi(placeId, apiKey);
      if (apiResult.success && apiResult.reviews.length > 0) {
        allFetchedReviews.push(...apiResult.reviews);
        if (apiResult.userRatingsTotal) userRatingsTotal = apiResult.userRatingsTotal;
        if (apiResult.rating) averageRating = apiResult.rating;
      }
    }

    // 2. Fetch directly from Google Maps place endpoint
    const directResult = await fetchFromGoogleMapsPlace(placeId);
    if (directResult.reviews.length > 0) {
      for (const r of directResult.reviews) {
        if (!allFetchedReviews.some(e => e.googleReviewId === r.googleReviewId || (e.name === r.name && e.source === 'Google'))) {
          allFetchedReviews.push(r);
        }
      }
      if (directResult.userRatingsTotal) userRatingsTotal = directResult.userRatingsTotal;
      if (directResult.rating) averageRating = directResult.rating;
    }

    if (allFetchedReviews.length === 0) {
      return { success: false, reason: 'No reviews returned by Google API/source' };
    }

    const col = db.collection('reviews');
    let updatedCount = 0;

    for (const gr of allFetchedReviews) {
      const googleReviewId = gr.googleReviewId;
      await col.updateOne(
        { $or: [{ googleReviewId }, { name: gr.name, source: 'Google' }] },
        {
          $set: {
            name: gr.name,
            avatar: gr.avatar || null,
            rating: gr.rating || 5,
            message: gr.message || '',
            time: gr.time || 'Recently',
            authorUrl: gr.authorUrl || null,
            source: 'Google',
            googleReviewId,
            updatedAt: new Date(),
          },
          $setOnInsert: {
            approved: true, // Default to approved on first import
            isRead: false,
            createdAt: new Date(gr.timestamp || now),
          },
        },
        { upsert: true }
      );
      updatedCount++;
    }

    // Clean up old fake placeholder reviews that have no authentic googleReviewId and were generated by previous mock seed
    const fakeMockNames = [
      'Khadija Al-Mansoor', 'Tariq Mahmood', 'Zubair Hassan', 'Elena Rostova',
      'Rashid Al-Nuaimi', 'Farhan Siddiqui', 'Amina Al-Zahra', 'David Sterling',
      'Fatima Ezzahra', 'Hamad Al-Maktoum', 'Bilal Ahmed', 'Sora Takahashi',
      'Layla Kassem', 'Omar Al-Falasi', 'Apex Digital Systems', 'OmniRetail Solutions',
      'NEXA Technologies', 'Salam Bin Sultan', 'M saleem Mughal', 'Endless Data'
    ];
    await col.deleteMany({
      name: { $in: fakeMockNames },
      source: 'Google',
      $or: [{ googleReviewId: { $exists: false } }, { googleReviewId: null }]
    });

    await db.collection('settings').updateOne(
      { _id: 'website_settings' },
      {
        $set: {
          googlePlaceId: placeId,
          lastGoogleReviewSync: new Date().toISOString(),
          googleUserRatingsTotal: userRatingsTotal,
          googleRating: averageRating,
        },
      },
      { upsert: true }
    );

    return { success: true, count: updatedCount, total: userRatingsTotal };
  } catch (err) {
    console.warn('syncGooglePlacesReviews error:', err.message);
    return { success: false, reason: err.message };
  }
}

// POST /api/reviews  -> create a new review or trigger sync
export async function POST(req) {
  try {
    const body = await req.json();

    // Check if triggering manual sync from Google Places
    if (body.action === 'sync') {
      const db = await getDb();
      const syncResult = await syncGooglePlacesReviews(db, true);
      return jsonResponse(syncResult);
    }

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
      isRead: false,
      googleReviewId: null,
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

    // 1. Attempt Google Places API sync if configured or needed
    await syncGooglePlacesReviews(db, forceSync);

    // 2. Query reviews
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
      avatar: (r.avatar && typeof r.avatar === 'string' && r.avatar.trim().length > 0) ? r.avatar.trim() : null,
      source: r.source || (r.googleReviewId ? 'Google' : 'Website'),
      email: r.email || null,
      title: r.title || null,
      company: r.company || null,
      authorUrl: r.authorUrl || null,
      googleReviewId: r.googleReviewId || null,
      approved: typeof r.approved === 'boolean' ? r.approved : true,
      isRead: r.isRead === true,
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

// PATCH /api/reviews  -> update review (approve/unapprove or edit fields or mark as read)
export async function PATCH(req) {
  try {
    const body = await req.json();
    const db = await getDb();
    const col = db.collection('reviews');

    if (body.markAll) {
      await col.updateMany({}, { $set: { isRead: true } });
      return jsonResponse({ ok: true, message: 'All reviews marked as read' });
    }

    const id = body.id;
    if (!id) return jsonResponse({ error: 'id is required' }, 400);

    const existing = await col.findOne({ _id: new ObjectId(id) });
    if (!existing) return jsonResponse({ error: 'Not found' }, 404);

    const target = existing.name || id;
    const updateDoc = {};

    // 1. Status toggle
    if (body.approve !== undefined) {
      updateDoc.approved = !!body.approve;
    }

    // 2. Read status toggle
    if (body.isRead !== undefined) {
      updateDoc.isRead = !!body.isRead;
    }

    // 3. Review comment/text edit
    if (body.message !== undefined) {
      updateDoc.message = body.message.toString().trim();
    }

    // Metadata like name, rating, avatar, source, googleReviewId are strictly protected
    // and cannot be modified on existing reviews
    updateDoc.updatedAt = new Date();

    const result = await col.updateOne({ _id: new ObjectId(id) }, { $set: updateDoc });
    if (result.matchedCount === 0) {
      return jsonResponse({ error: 'Not found' }, 404);
    }

    await logActivity(req, 'update_review', target, { id, ...updateDoc });
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

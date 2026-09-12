import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import cloudinary from 'cloudinary';
import { logActivity } from '@/lib/activity-logger';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dqghun7oj',
  api_key: process.env.CLOUDINARY_API_KEY || '281487587427693',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'bxbrN76auL9pNUINMVdKJwqv6Uo',
  secure: true,
});

let cachedLogo = null;
let cachedAt = 0;
const LOGO_TTL = 30 * 1000;

function jsonWithCache(payload) {
  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
    },
  });
}

// GET: Return logo URL from DB
export async function GET() {
  try {
    if (cachedLogo && Date.now() - cachedAt < LOGO_TTL) {
      return jsonWithCache({ logo: cachedLogo });
    }

    const db = await getDb();
    const settings = await db.collection('settings').findOne(
      { key: 'logo' },
      { projection: { value: 1 } }
    );
    const logo = settings?.value || '/file.svg';

    cachedLogo = logo;
    cachedAt = Date.now();

    return jsonWithCache({ logo });
  } catch (err) {
    console.error('GET /api/logo error:', err);
    return jsonWithCache({ logo: '/file.svg' });
  }
}

// POST: Upload logo to Cloudinary, save URL in DB
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('logo');
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        { resource_type: 'image', folder: 'logo' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    });

    const secureUrl = result.secure_url;

    const db = await getDb();
    await db.collection('settings').updateOne(
      { key: 'logo' },
      { $set: { value: secureUrl } },
      { upsert: true }
    );

    cachedLogo = secureUrl;
    cachedAt = Date.now();

    await logActivity(req, 'update_logo', 'Website Logo', { url: secureUrl });

    return jsonWithCache({ logo: secureUrl });
  } catch (err) {
    console.error('POST /api/logo error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

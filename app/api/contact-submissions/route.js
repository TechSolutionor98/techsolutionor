import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { logActivity } from '@/lib/activity-logger';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// GET /api/contact-submissions -> Fetch all contact submissions
export async function GET() {
  try {
    const db = await getDb();
    const subs = await db.collection('contact_submissions').find({}).sort({ createdAt: -1, _id: -1 }).toArray();

    return NextResponse.json(subs.map(s => ({
      id: s._id?.toString?.() || s.id,
      _id: s._id?.toString?.() || s.id,
      name: s.name || s.fullName || '',
      email: s.email || '',
      phone: s.phone || '',
      country: s.country || '',
      serviceRequired: s.serviceRequired || s.service || '',
      budget: s.budget || '',
      preferredDate: s.preferredDate || s.date || '',
      propertyLocation: s.propertyLocation || s.country || '',
      message: s.message || s.note || '',
      source: s.source || 'Contact Us Form',
      createdAt: s.createdAt || new Date().toISOString()
    })), { headers: CORS_HEADERS });
  } catch (err) {
    console.error('GET /api/contact-submissions error', err);
    return NextResponse.json({ error: 'Failed to read contact submissions' }, { status: 500, headers: CORS_HEADERS });
  }
}

// POST /api/contact-submissions -> Submit new contact / quote request
export async function POST(request) {
  try {
    const body = await request.json();
    const name = (body.name || body.fullName || '').toString().trim();
    const email = (body.email || '').toString().trim().toLowerCase();
    const phone = (body.phone || '').toString().trim();
    const country = (body.country || '').toString().trim();
    const serviceRequired = (body.serviceRequired || body.service || '').toString().trim();
    const budget = (body.budget || '').toString().trim();
    const preferredDate = (body.preferredDate || body.date || '').toString().trim();
    const message = (body.message || body.note || '').toString().trim();
    const source = (body.source || 'Get A Quote Modal').toString().trim();

    // Required fields validation
    if (!name) {
      return NextResponse.json({ error: 'Please enter your full name' }, { status: 400, headers: CORS_HEADERS });
    }
    if (!email) {
      return NextResponse.json({ error: 'Please enter your email address' }, { status: 400, headers: CORS_HEADERS });
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address (e.g. name@domain.com)' }, { status: 400, headers: CORS_HEADERS });
    }
    if (!phone) {
      return NextResponse.json({ error: 'Please enter your phone number' }, { status: 400, headers: CORS_HEADERS });
    }

    const db = await getDb();
    const doc = {
      name,
      email,
      phone,
      country,
      serviceRequired,
      budget,
      preferredDate,
      message,
      source,
      createdAt: new Date().toISOString()
    };

    const res = await db.collection('contact_submissions').insertOne(doc);
    const entry = { id: res.insertedId.toString(), _id: res.insertedId.toString(), ...doc };

    await logActivity(request, 'contact_submission', name, { 
      email, 
      phone, 
      service: serviceRequired, 
      source 
    });

    return NextResponse.json({ 
      ok: true, 
      message: 'Thank you! Your submission has been received successfully. We will get in touch with you shortly.',
      entry 
    }, { status: 201, headers: CORS_HEADERS });
  } catch (err) {
    console.error('POST /api/contact-submissions error', err);
    return NextResponse.json({ error: 'Failed to save contact submission' }, { status: 500, headers: CORS_HEADERS });
  }
}

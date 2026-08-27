import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { logActivity } from '@/lib/activity-logger';

async function getSubmissions() {
  const db = await getDb();
  return db.collection('contact_submissions').find().sort({ _id: -1 }).toArray();
}

async function saveSubmission({ name, email, businessType, otherBusinessType, companyName, businessInfo, message }) {
  const db = await getDb();
  const doc = {
    name,
    email,
    businessType: businessType || '',
    otherBusinessType: otherBusinessType || '',
    companyName: companyName || '',
    businessInfo: businessInfo || '',
    message: message || '',
    createdAt: new Date().toISOString()
  };
  const res = await db.collection('contact_submissions').insertOne(doc);
  return { id: res.insertedId.toString(), ...doc };
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};  

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  try {
    const subs = await getSubmissions();
    return NextResponse.json(subs.map(s => ({
      id: s._id?.toString?.() || s.id,
      name: s.name,
      email: s.email,
      phone: s.phone || '',
      serviceRequired: s.serviceRequired || '',
      propertyLocation: s.propertyLocation || '',
      message: s.message || '',
      createdAt: s.createdAt
    })), { headers: CORS_HEADERS });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to read contact submissions' }, { status: 500, headers: CORS_HEADERS });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceRequired, propertyLocation, message } = body || {};
    
    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Name, Phone, and Message are required' }, { status: 400, headers: CORS_HEADERS });
    }

    const db = await getDb();
    const doc = {
      name,
      email: email || '',
      phone: phone || '',
      serviceRequired: serviceRequired || '',
      propertyLocation: propertyLocation || '',
      message: message || '',
      createdAt: new Date().toISOString()
    };
    const res = await db.collection('contact_submissions').insertOne(doc);
    const entry = { id: res.insertedId.toString(), ...doc };

    await logActivity(request, 'contact_submission', name, { email, phone, serviceRequired });

    return NextResponse.json({ ok: true, entry }, { status: 201, headers: CORS_HEADERS });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to save contact submission' }, { status: 500, headers: CORS_HEADERS });
  }
}

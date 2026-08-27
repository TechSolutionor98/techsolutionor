import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { logActivity } from '@/lib/activity-logger';

async function getApplications() {
  const db = await getDb();
  return db.collection('applications').find().sort({ _id: -1 }).toArray();
}

async function saveApplicationMongo({ name, email, phone, position, info }) {
  const db = await getDb();
  const doc = { name, email, phone, position, info, createdAt: new Date().toISOString() };
  const res = await db.collection('applications').insertOne(doc);
  return { id: res.insertedId.toString(), ...doc };
}

export async function GET() {
  try {
    const db = await getDb();
    const data = await db.collection('applications').find({}).toArray();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, position, info } = body || {};
    if (!name || !email || !phone || !position) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify that OTP was verified for this email
    const db = await getDb();
    const otpRecord = await db.collection('otps').findOne({ email, verified: true });
    if (!otpRecord) {
      return NextResponse.json({ error: 'Email not verified. Please verify OTP first.' }, { status: 403 });
    }

    const entry = await saveApplicationMongo({ name, email, phone, position, info });

    await logActivity(request, 'career_application_submitted', name, { email, position });

    // Clean up used OTP
    await db.collection('otps').deleteMany({ email });

    return NextResponse.json({ ok: true, entry }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to save application' }, { status: 500 });
  }
}

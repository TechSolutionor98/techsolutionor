import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request) {
  try {
    const { email, otp } = await request.json();
    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400, headers: CORS_HEADERS });
    }

    const db = await getDb();
    const record = await db.collection('otps').findOne({ email, otp });

    if (!record) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400, headers: CORS_HEADERS });
    }

    if (new Date() > new Date(record.expiresAt)) {
      await db.collection('otps').deleteOne({ _id: record._id });
      return NextResponse.json({ error: 'OTP has expired' }, { status: 400, headers: CORS_HEADERS });
    }

    // Mark as verified
    await db.collection('otps').updateOne({ _id: record._id }, { $set: { verified: true } });

    return NextResponse.json({ ok: true, message: 'OTP verified successfully' }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('Verify OTP error:', err);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500, headers: CORS_HEADERS });
  }
}

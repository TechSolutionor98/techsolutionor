import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const email = (body.email || '').toString().trim().toLowerCase();
    const otp = (body.otp || '').toString().trim();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and verification code are required.' }, { status: 400, headers: CORS_HEADERS });
    }

    const db = await getDb();
    const record = await db.collection('otps').findOne({ email, otp });

    if (!record) {
      return NextResponse.json({ 
        error: 'Invalid verification code. Please check the code sent to your email and try again.' 
      }, { status: 400, headers: CORS_HEADERS });
    }

    if (new Date() > new Date(record.expiresAt)) {
      await db.collection('otps').deleteOne({ _id: record._id });
      return NextResponse.json({ 
        error: 'Verification code has expired. Please click "Resend Code" to receive a new one.' 
      }, { status: 400, headers: CORS_HEADERS });
    }

    // Mark as verified
    await db.collection('otps').updateOne({ _id: record._id }, { $set: { verified: true, verifiedAt: new Date() } });

    return NextResponse.json({ ok: true, message: 'OTP verified successfully' }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('Verify OTP error:', err);
    return NextResponse.json({ error: 'Failed to verify code. Please try again.' }, { status: 500, headers: CORS_HEADERS });
  }
}

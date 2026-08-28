import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import nodemailer from 'nodemailer';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(request) {
  try {
    const body = await request.json();
    const email = (body.email || '').toString().trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400, headers: CORS_HEADERS });
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address (e.g. name@domain.com)' }, { status: 400, headers: CORS_HEADERS });
    }

    const db = await getDb();
    const otpsCol = db.collection('otps');

    // Check rate limit: prevent spamming OTPs within 30 seconds
    const existingOtp = await otpsCol.findOne({ email });
    if (existingOtp && existingOtp.createdAt) {
      const secondsSinceLast = (Date.now() - new Date(existingOtp.createdAt).getTime()) / 1000;
      if (secondsSinceLast < 30) {
        return NextResponse.json({ 
          error: `Please wait ${Math.ceil(30 - secondsSinceLast)} seconds before requesting another verification code.` 
        }, { status: 429, headers: CORS_HEADERS });
      }
    }

    // Generate secure 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Delete existing OTPs for this email and insert new one
    await otpsCol.deleteMany({ email });
    await otpsCol.insertOne({ 
      email, 
      otp, 
      expiresAt, 
      verified: false,
      createdAt: new Date()
    });

    // Send email with Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL || 'Osumfix@gmail.com',
        pass: process.env.SMTP_PASSWORD || 'ygre mdup eglu gnou',
      },
    });

    await transporter.sendMail({
      from: `"Tech Solutionor" <${process.env.SMTP_EMAIL || 'Osumfix@gmail.com'}>`,
      to: email,
      subject: `${otp} is your Tech Solutionor verification code`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; background: #ffffff; border: 1px solid #eaeaea; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #41b349; font-size: 26px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">Tech Solutionor</h1>
            <p style="color: #64748b; font-size: 14px; margin-top: 4px;">Email Verification for Blog Comment</p>
          </div>

          <div style="background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
            <p style="color: #334155; font-size: 15px; margin: 0 0 16px 0; font-weight: 500;">
              Your 6-digit verification code is:
            </p>
            <div style="display: inline-block; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #16a34a; background: #ffffff; padding: 14px 28px; border-radius: 10px; border: 1px solid #e2e8f0; font-family: monospace;">
              ${otp}
            </div>
            <p style="color: #94a3b8; font-size: 12px; margin: 16px 0 0 0;">
              This code is valid for 10 minutes.
            </p>
          </div>

          <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0; text-align: center;">
            If you did not attempt to post a comment on Tech Solutionor, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, message: 'Verification code sent to your email.' }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('Send OTP error:', err);
    return NextResponse.json({ error: 'Failed to send verification code. Please try again.' }, { status: 500, headers: CORS_HEADERS });
  }
}

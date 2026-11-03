import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { logActivity } from '@/lib/activity-logger';
import { validatePhoneNumber } from '@/lib/country-phone';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
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
      website: s.website || '',
      serviceRequired: s.serviceRequired || s.service || '',
      budget: s.budget || '',
      preferredDate: s.preferredDate || s.date || '',
      propertyLocation: s.propertyLocation || s.country || '',
      message: s.message || s.note || '',
      source: s.source || 'Contact Us Form',
      isRead: s.isRead === true,
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

    // 1. Honeypot check: If hidden honeypot fields are filled by automated bots, reject silently with 200
    const honeypot = (body._hp_val || body._gotcha || body.website_hp || body.company_fax || '').toString().trim();
    if (honeypot) {
      console.warn(`[ContactSubmissions] Blocked bot honeypot submission from name="${name}", email="${email}"`);
      return NextResponse.json({
        ok: true,
        message: 'Thank you! Your submission has been received successfully. We will get in touch with you shortly.',
      }, { status: 200, headers: CORS_HEADERS });
    }

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

    // 2. Automated spambot heuristics:
    // 2a. Message is a single unspaced alphanumeric gibberish token (length >= 12)
    const isSingleLongToken = message.length >= 12 && !/\s/.test(message) && /^[a-zA-Z0-9_-]+$/.test(message);
    // 2b. Name is a single unspaced random mixed-case token (length >= 14)
    const isGibberishName = name.length >= 14 && !/\s/.test(name) && /^[a-zA-Z0-9]+$/.test(name) && /[A-Z]/.test(name) && /[a-z]/.test(name);
    // 2c. Dotted Gmail spambot alias: 4 or more dots in username (e.g. e.v.o.x.u.f.o.c...@gmail.com)
    const emailUserPart = email.split('@')[0] || '';
    const emailDomainPart = email.split('@')[1] || '';
    const isDottedSpam = emailDomainPart.includes('gmail.com') && (emailUserPart.match(/\./g) || []).length >= 4;

    if (isSingleLongToken || isGibberishName || isDottedSpam) {
      console.warn(`[ContactSubmissions] Rejected automated spambot submission: name="${name}", email="${email}", message="${message.slice(0, 30)}"`);
      return NextResponse.json({
        ok: true,
        message: 'Thank you! Your submission has been received successfully. We will get in touch with you shortly.',
      }, { status: 200, headers: CORS_HEADERS });
    }

    let normalizedPhone = phone;
    if (country) {
      const phoneValidation = validatePhoneNumber(phone, country);
      if (!phoneValidation.valid) {
        return NextResponse.json({ error: phoneValidation.error }, { status: 400, headers: CORS_HEADERS });
      }
      normalizedPhone = phoneValidation.formattedPhone;
    } else {
      const digitsOnly = phone.replace(/[^0-9]/g, '');
      if (digitsOnly.length < 7 || digitsOnly.length > 15 || /[^0-9\s\-()+]/.test(phone)) {
        return NextResponse.json({ error: 'Please enter a valid phone number (7 to 15 digits).' }, { status: 400, headers: CORS_HEADERS });
      }
    }

    const db = await getDb();

    // 3. Duplicate submission protection: prevent identical submissions within 15 minutes
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const existingDuplicate = await db.collection('contact_submissions').findOne({
      email,
      $or: [
        { phone: normalizedPhone },
        { message: message }
      ],
      createdAt: { $gte: fifteenMinutesAgo }
    });

    if (existingDuplicate) {
      console.warn(`[ContactSubmissions] Duplicate submission prevented for email="${email}"`);
      return NextResponse.json({
        ok: true,
        message: 'Thank you! Your submission has already been received. We will get in touch with you shortly.',
        entry: { id: existingDuplicate._id.toString(), _id: existingDuplicate._id.toString(), ...existingDuplicate }
      }, { status: 200, headers: CORS_HEADERS });
    }

    const doc = {
      name,
      email,
      phone: normalizedPhone,
      country,
      serviceRequired,
      budget,
      preferredDate,
      message,
      source,
      isRead: false,
      createdAt: new Date().toISOString(),
      ...(body.details ? { details: body.details } : {}),
      ...(body.formData ? { formData: body.formData } : {})
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

// PATCH /api/contact-submissions -> Toggle isRead or mark all as read
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, isRead = true, markAll } = body || {};
    const db = await getDb();

    if (markAll) {
      await db.collection('contact_submissions').updateMany({}, { $set: { isRead: true } });
      return NextResponse.json({ ok: true, message: 'All submissions marked as read' }, { headers: CORS_HEADERS });
    }

    if (!id) {
      return NextResponse.json({ error: 'Missing submission ID' }, { status: 400, headers: CORS_HEADERS });
    }

    let query = { $or: [{ _id: id }, { id: id }] };
    if (ObjectId.isValid(id) && id.length === 24) {
      query = { $or: [{ _id: new ObjectId(id) }, { _id: id }, { id: id }] };
    }

    const res = await db.collection('contact_submissions').updateOne(query, {
      $set: { isRead: isRead === true }
    });

    return NextResponse.json({ ok: true, matchedCount: res.matchedCount }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('PATCH /api/contact-submissions error:', err);
    return NextResponse.json({ error: err.message }, { status: 500, headers: CORS_HEADERS });
  }
}


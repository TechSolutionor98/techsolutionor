import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { ensureDefaultTemplates } from '@/lib/email-thread-service';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

// GET /api/emails/templates -> List all templates
export async function GET() {
  try {
    const db = await getDb();
    await ensureDefaultTemplates();

    const templates = await db
      .collection('email_templates')
      .find({})
      .sort({ isSystemDefault: -1, createdAt: 1 })
      .toArray();

    return NextResponse.json(
      templates.map(t => ({
        id: t.id || t._id.toString(),
        title: t.label || t.title,
        label: t.label || t.title,
        category: t.category || 'career',
        subject: t.subject,
        bodyText: t.bodyText || '',
        bodyHtml: t.bodyHtml,
        recommendedStatus: t.recommendedStatus || 'open',
        isSystemDefault: t.isSystemDefault === true,
        createdAt: t.createdAt,
      })),
      { headers: CORS_HEADERS }
    );
  } catch (err) {
    console.error('GET /api/emails/templates error:', err);
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500, headers: CORS_HEADERS });
  }
}

// POST /api/emails/templates -> Create a new template
export async function POST(request) {
  try {
    const db = await getDb();
    const body = await request.json();
    const { title, category, subject, bodyHtml } = body;

    if (!title || !subject || !bodyHtml) {
      return NextResponse.json({ error: 'Title, subject, and body are required' }, { status: 400, headers: CORS_HEADERS });
    }

    const now = new Date().toISOString();
    const newDoc = {
      title: title.trim(),
      category: category || 'career',
      subject: subject.trim(),
      bodyHtml,
      isSystemDefault: false,
      createdAt: now,
      updatedAt: now,
    };

    const res = await db.collection('email_templates').insertOne(newDoc);
    return NextResponse.json({ id: res.insertedId.toString(), ...newDoc }, { status: 201, headers: CORS_HEADERS });
  } catch (err) {
    console.error('POST /api/emails/templates error:', err);
    return NextResponse.json({ error: 'Failed to create template' }, { status: 500, headers: CORS_HEADERS });
  }
}

// PUT /api/emails/templates -> Edit an existing template
export async function PUT(request) {
  try {
    const db = await getDb();
    const body = await request.json();
    const { id, title, category, subject, bodyHtml } = body;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Valid template ID is required' }, { status: 400, headers: CORS_HEADERS });
    }

    const updateDoc = {
      updatedAt: new Date().toISOString(),
    };
    if (title) updateDoc.title = title.trim();
    if (category) updateDoc.category = category;
    if (subject) updateDoc.subject = subject.trim();
    if (bodyHtml) updateDoc.bodyHtml = bodyHtml;

    await db.collection('email_templates').updateOne({ _id: new ObjectId(id) }, { $set: updateDoc });
    return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('PUT /api/emails/templates error:', err);
    return NextResponse.json({ error: 'Failed to update template' }, { status: 500, headers: CORS_HEADERS });
  }
}

// DELETE /api/emails/templates -> Delete a template
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Valid template ID is required' }, { status: 400, headers: CORS_HEADERS });
    }

    const db = await getDb();
    await db.collection('email_templates').deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('DELETE /api/emails/templates error:', err);
    return NextResponse.json({ error: 'Failed to delete template' }, { status: 500, headers: CORS_HEADERS });
  }
}

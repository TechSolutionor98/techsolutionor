import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

// GET /api/emails/[id] -> Get thread details and full chronological conversation history
export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const identifier = resolvedParams?.id;

    if (!identifier) {
      return NextResponse.json({ error: 'Thread ID is required' }, { status: 400, headers: CORS_HEADERS });
    }

    const db = await getDb();
    const threadsCol = db.collection('email_threads');
    const messagesCol = db.collection('email_messages');

    let thread = null;
    if (ObjectId.isValid(identifier)) {
      thread = await threadsCol.findOne({ _id: new ObjectId(identifier) });
    }
    if (!thread) {
      thread = await threadsCol.findOne({ threadId: identifier });
    }

    if (!thread) {
      return NextResponse.json({ error: 'Email thread not found' }, { status: 404, headers: CORS_HEADERS });
    }

    // Automatically mark thread as read when opened
    if (thread.unreadByAdmin) {
      await threadsCol.updateOne(
        { _id: thread._id },
        { $set: { unreadByAdmin: false, updatedAt: new Date().toISOString() } }
      );
      thread.unreadByAdmin = false;
    }

    // Fetch all messages in this thread ordered chronologically (oldest to newest)
    const messages = await messagesCol
      .find({ threadId: thread.threadId })
      .sort({ createdAt: 1, _id: 1 })
      .toArray();

    const formattedMessages = messages.map(m => ({
      id: m._id.toString(),
      messageId: m.messageId,
      inReplyTo: m.inReplyTo,
      references: m.references || [],
      direction: m.direction || 'inbound',
      from: m.from,
      to: m.to,
      subject: m.subject,
      bodyText: m.bodyText,
      bodyHtml: m.bodyHtml,
      attachments: m.attachments || [],
      deliveryStatus: m.deliveryStatus || 'delivered',
      deliveryError: m.deliveryError || null,
      createdAt: m.createdAt,
    }));

    return NextResponse.json({
      thread: {
        id: thread._id.toString(),
        threadId: thread.threadId,
        subject: thread.subject,
        applicant: thread.applicant,
        mailbox: thread.mailbox || 'hr@techsolutionor.com',
        status: thread.status || 'open',
        category: thread.category || 'career',
        tags: thread.tags || [],
        unreadByAdmin: thread.unreadByAdmin === true,
        messageCount: formattedMessages.length,
        lastMessageAt: thread.lastMessageAt || thread.createdAt,
        createdAt: thread.createdAt,
      },
      messages: formattedMessages,
    }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('GET /api/emails/[id] error:', err);
    return NextResponse.json({ error: 'Failed to fetch thread conversation' }, { status: 500, headers: CORS_HEADERS });
  }
}

// DELETE /api/emails/[id] -> Archive or permanently delete thread
export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;
    const identifier = resolvedParams?.id;

    if (!identifier) {
      return NextResponse.json({ error: 'Thread ID is required' }, { status: 400, headers: CORS_HEADERS });
    }

    const { searchParams } = new URL(request.url);
    const permanent = searchParams.get('permanent') === 'true';

    const db = await getDb();
    const threadsCol = db.collection('email_threads');
    const messagesCol = db.collection('email_messages');

    const query = ObjectId.isValid(identifier) ? { _id: new ObjectId(identifier) } : { threadId: identifier };
    const thread = await threadsCol.findOne(query);

    if (!thread) {
      return NextResponse.json({ error: 'Email thread not found' }, { status: 404, headers: CORS_HEADERS });
    }

    if (permanent) {
      await Promise.all([
        threadsCol.deleteOne({ _id: thread._id }),
        messagesCol.deleteMany({ threadId: thread.threadId }),
      ]);
      return NextResponse.json({ success: true, deleted: true }, { headers: CORS_HEADERS });
    } else {
      await threadsCol.updateOne({ _id: thread._id }, { $set: { status: 'archived', updatedAt: new Date().toISOString() } });
      return NextResponse.json({ success: true, archived: true }, { headers: CORS_HEADERS });
    }
  } catch (err) {
    console.error('DELETE /api/emails/[id] error:', err);
    return NextResponse.json({ error: 'Failed to delete email thread' }, { status: 500, headers: CORS_HEADERS });
  }
}

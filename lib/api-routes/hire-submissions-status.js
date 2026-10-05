import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

function getHireSubmissionQuery(id) {
  if (ObjectId.isValid(id) && id.length === 24) {
    return { $or: [{ _id: new ObjectId(id) }, { _id: id }, { id: id }] };
  }
  return { $or: [{ _id: id }, { id: id }] };
}

export async function PATCH(request, context) {
  try {
    const params = await context.params;
    const { id } = params || {};
    if (!id) {
      return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const { status, note = '' } = body || {};

    const validStatuses = ['Pending', 'In Review', 'Contacted', 'Proposal Sent', 'Converted', 'Archived', 'Rejected'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ 
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
      }, { status: 400 });
    }

    const db = await getDb();
    const query = getHireSubmissionQuery(id);
    const existing = await db.collection('hire_submissions').findOne(query);
    if (!existing) {
      return NextResponse.json({ error: 'Hire submission not found' }, { status: 404 });
    }

    const now = new Date().toISOString();
    const updateDoc = {
      $set: {
        status,
        statusNote: note,
        updatedAt: now,
      },
      $push: {
        statusHistory: {
          status,
          note,
          changedAt: now,
        },
      },
    };

    await db.collection('hire_submissions').updateOne({ _id: existing._id }, updateDoc);

    const updated = await db.collection('hire_submissions').findOne({ _id: existing._id });
    const formatted = {
      ...updated,
      id: updated._id.toString(),
      _id: updated._id.toString(),
    };

    await logActivity(request, `hire_submission_${status.toLowerCase().replace(/\s+/g, '_')}`, existing.name, {
      id: formatted.id,
      email: existing.email,
      status,
      note,
    });

    return NextResponse.json({
      ok: true,
      status,
      submission: formatted,
      message: `Hire submission updated to ${status}.`,
    });
  } catch (error) {
    console.error('Error updating hire submission status:', error);
    return NextResponse.json({ error: error.message || 'Failed to update status' }, { status: 500 });
  }
}

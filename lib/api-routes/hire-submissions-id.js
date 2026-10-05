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

export async function GET(request, context) {
  try {
    const params = await context.params;
    const { id } = params || {};
    if (!id) {
      return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 });
    }

    const db = await getDb();
    const sub = await db.collection('hire_submissions').findOne(getHireSubmissionQuery(id));
    if (!sub) {
      return NextResponse.json({ error: 'Hire submission not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...sub,
      id: sub._id.toString(),
      _id: sub._id.toString(),
    });
  } catch (error) {
    console.error('Error fetching hire submission:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch submission' }, { status: 500 });
  }
}

export async function PATCH(request, context) {
  try {
    const params = await context.params;
    const { id } = params || {};
    if (!id) {
      return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const { status, note, adminNotes, isRead } = body || {};

    const db = await getDb();
    const query = getHireSubmissionQuery(id);
    const existing = await db.collection('hire_submissions').findOne(query);
    if (!existing) {
      return NextResponse.json({ error: 'Hire submission not found' }, { status: 404 });
    }

    const now = new Date().toISOString();
    const updateSet = { updatedAt: now };

    if (isRead !== undefined) {
      updateSet.isRead = isRead === true;
    }

    if (adminNotes !== undefined) {
      updateSet.adminNotes = adminNotes;
    }

    let pushUpdate = null;
    if (status && status !== existing.status) {
      updateSet.status = status;
      if (note !== undefined) {
        updateSet.statusNote = note;
      }
      pushUpdate = {
        statusHistory: {
          status,
          note: note || `Status changed to ${status}`,
          changedAt: now,
        }
      };
    } else if (note !== undefined) {
      updateSet.statusNote = note;
    }

    const mongoOperation = { $set: updateSet };
    if (pushUpdate) {
      mongoOperation.$push = pushUpdate;
    }

    await db.collection('hire_submissions').updateOne({ _id: existing._id }, mongoOperation);

    const updated = await db.collection('hire_submissions').findOne({ _id: existing._id });
    const formatted = {
      ...updated,
      id: updated._id.toString(),
      _id: updated._id.toString(),
    };

    if (status && status !== existing.status) {
      await logActivity(request, `hire_submission_status_${status.toLowerCase().replace(/\s+/g, '_')}`, existing.name, {
        id: formatted.id,
        email: existing.email,
        oldStatus: existing.status,
        newStatus: status,
      });
    }

    return NextResponse.json({
      ok: true,
      message: 'Submission updated successfully',
      submission: formatted,
    });
  } catch (error) {
    console.error('Error updating hire submission:', error);
    return NextResponse.json({ error: error.message || 'Failed to update submission' }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const params = await context.params;
    const { id } = params || {};
    if (!id) {
      return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 });
    }

    const db = await getDb();
    const query = getHireSubmissionQuery(id);
    const existing = await db.collection('hire_submissions').findOne(query);
    if (!existing) {
      return NextResponse.json({ error: 'Hire submission not found' }, { status: 404 });
    }

    await db.collection('hire_submissions').deleteOne({ _id: existing._id });

    await logActivity(request, 'hire_submission_deleted', existing.name, {
      id: existing._id.toString(),
      email: existing.email,
      requirementType: existing.requirementType,
    });

    return NextResponse.json({
      ok: true,
      message: 'Hire submission deleted successfully',
      deletedId: existing._id.toString(),
    });
  } catch (error) {
    console.error('Error deleting hire submission:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete submission' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { logActivity } from '@/lib/activity-logger';
import { sendApplicationStatusNotification } from '@/lib/application-mailer';

export const dynamic = 'force-dynamic';

export async function PATCH(request, context) {
  try {
    const params = await context.params;
    const { id } = params || {};
    if (!id) {
      return NextResponse.json({ error: 'Application ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const { status, note = '' } = body || {};

    const validStatuses = ['Pending', 'Approved', 'Rejected'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ 
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
      }, { status: 400 });
    }

    const db = await getDb();
    let query = null;
    if (ObjectId.isValid(id) && id.length === 24) {
      query = { $or: [{ _id: new ObjectId(id) }, { _id: id }, { id: id }] };
    } else {
      query = { $or: [{ _id: id }, { id: id }] };
    }

    const existing = await db.collection('applications').findOne(query);
    if (!existing) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
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

    await db.collection('applications').updateOne({ _id: existing._id }, updateDoc);

    const updated = await db.collection('applications').findOne({ _id: existing._id });
    const formattedApp = {
      ...updated,
      id: updated._id.toString(),
    };

    // Send email notification if Approved or Rejected
    let emailResult = null;
    if (status === 'Approved' || status === 'Rejected') {
      try {
        emailResult = await sendApplicationStatusNotification({
          application: formattedApp,
          status,
          note,
        });
      } catch (mailErr) {
        console.error('Error dispatching application email notification:', mailErr);
        emailResult = { success: false, error: mailErr?.message };
      }
    }

    await logActivity(request, `career_application_${status.toLowerCase()}`, existing.name, {
      id: formattedApp.id,
      email: existing.email,
      position: existing.position,
      status,
      emailSent: emailResult?.success ?? false,
    });

    return NextResponse.json({
      ok: true,
      status,
      emailSent: emailResult?.success ?? false,
      emailMessageId: emailResult?.messageId,
      application: formattedApp,
      message: `Application marked as ${status}.${emailResult?.success ? ' Notification email sent to applicant.' : ''}`,
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    return NextResponse.json({ error: error.message || 'Failed to update application status' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

function getApplicationQuery(id) {
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
      return NextResponse.json({ error: 'Application ID is required' }, { status: 400 });
    }

    const db = await getDb();
    const app = await db.collection('applications').findOne(getApplicationQuery(id));
    if (!app) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...app,
      id: app._id.toString(),
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch application' }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const params = await context.params;
    const { id } = params || {};
    if (!id) {
      return NextResponse.json({ error: 'Application ID is required' }, { status: 400 });
    }

    const db = await getDb();
    const query = getApplicationQuery(id);
    const existing = await db.collection('applications').findOne(query);
    if (!existing) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    await db.collection('applications').deleteOne({ _id: existing._id });

    await logActivity(request, 'career_application_deleted', existing.name, {
      id: existing._id.toString(),
      email: existing.email,
      position: existing.position,
    });

    return NextResponse.json({
      ok: true,
      message: 'Application deleted successfully',
      deletedId: existing._id.toString(),
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete application' }, { status: 500 });
  }
}

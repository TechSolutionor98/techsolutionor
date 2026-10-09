import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { logActivity } from '@/lib/activity-logger';
import { validatePhoneNumber } from '@/lib/country-phone';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function toObjectId(id) {
  if (!id) return null;
  if (typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id)) {
    try {
      return new ObjectId(id);
    } catch (_) {
      return null;
    }
  }
  return null;
}

function getQueryById(id) {
  const oid = toObjectId(id);
  if (oid) {
    return { $or: [{ _id: oid }, { _id: id }, { id: id }] };
  }
  return { $or: [{ _id: id }, { id: id }] };
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// GET /api/hire-submissions -> Fetch all Hire Us submissions
export async function GET(request) {
  try {
    const db = await getDb();
    const subs = await db.collection('hire_submissions')
      .find({})
      .sort({ createdAt: -1, _id: -1 })
      .toArray();

    const formatted = subs.map(s => {
      const id = s._id?.toString?.() || s.id;
      const details = s.details || {};

      return {
        id,
        _id: id,
        name: s.name || s.fullName || details.fullName || 'Anonymous Client',
        fullName: s.fullName || s.name || details.fullName || '',
        email: s.email || details.email || '',
        phone: s.phone || details.phone || '',
        whatsapp: s.whatsapp || details.whatsapp || '',
        country: s.country || details.country || '',
        jobTitle: s.jobTitle || details.jobTitle || '',
        requirementType: s.requirementType || details.requirementType || 'Dedicated Resource',
        services: Array.isArray(s.services) ? s.services : (details.services || (s.serviceRequired ? [s.serviceRequired] : [])),
        otherService: s.otherService || details.otherService || '',
        resourceCount: s.resourceCount || details.resourceCount || '1',
        exactResourceCount: s.exactResourceCount || details.exactResourceCount || '',
        experienceLevel: s.experienceLevel || details.experienceLevel || '3-5 Years',
        workArrangement: s.workArrangement || details.workArrangement || 'Remote',
        requiredLocation: s.requiredLocation || details.requiredLocation || s.city || details.city || '',
        city: s.city || details.city || s.requiredLocation || details.requiredLocation || '',
        arrangementCountry: s.arrangementCountry || details.arrangementCountry || '',
        timeZone: s.timeZone || details.timeZone || '',
        workingHours: s.workingHours || details.workingHours || '',
        workingDays: s.workingDays || details.workingDays || '',
        hoursPerDay: s.hoursPerDay || details.hoursPerDay || '',
        hoursPerWeek: s.hoursPerWeek || details.hoursPerWeek || '',
        duration: s.duration || details.duration || '',
        startDate: s.startDate || details.startDate || '',
        endDate: s.endDate || details.endDate || '',
        budgetType: s.budgetType || details.budgetType || '',
        minBudget: s.minBudget || details.minBudget || '',
        maxBudget: s.maxBudget || details.maxBudget || '',
        currency: s.currency || details.currency || 'USD',
        budget: s.budget || '',
        hasInternalTeam: s.hasInternalTeam || details.hasInternalTeam || '',
        existingTeamRoles: Array.isArray(s.existingTeamRoles) ? s.existingTeamRoles : (details.existingTeamRoles || []),
        otherTeamRole: s.otherTeamRole || details.otherTeamRole || '',
        communicationMethods: Array.isArray(s.communicationMethods) ? s.communicationMethods : (details.communicationMethods || []),
        meetingFrequency: s.meetingFrequency || details.meetingFrequency || '',
        teamManager: s.teamManager || details.teamManager || '',
        hasDocumentation: s.hasDocumentation || details.hasDocumentation || '',
        documentationTypes: Array.isArray(s.documentationTypes) ? s.documentationTypes : (details.documentationTypes || []),
        referenceLinks: s.referenceLinks || details.referenceLinks || '',
        preferredContactMethod: s.preferredContactMethod || details.preferredContactMethod || 'Email',
        bestTimeToContact: s.bestTimeToContact || details.bestTimeToContact || '',
        referralSources: Array.isArray(s.referralSources) ? s.referralSources : (details.referralSources || []),
        otherReferral: s.otherReferral || details.otherReferral || '',
        confirmAccurate: s.confirmAccurate ?? details.confirmAccurate ?? true,
        confirmContact: s.confirmContact ?? details.confirmContact ?? true,
        attachedFilesList: Array.isArray(s.attachedFilesList) ? s.attachedFilesList : (details.attachedFilesList || []),
        message: s.message || '',
        source: s.source || 'Hire Us Form',
        status: s.status || 'Pending',
        statusNote: s.statusNote || s.notes || '',
        adminNotes: s.adminNotes || s.statusNote || '',
        statusHistory: s.statusHistory || [],
        isRead: s.isRead === true,
        createdAt: s.createdAt || new Date().toISOString(),
        updatedAt: s.updatedAt || s.createdAt || new Date().toISOString(),
        details: s.details || {},
      };
    });

    return NextResponse.json(formatted, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('GET /api/hire-submissions error:', err);
    return NextResponse.json({ error: 'Failed to read hire submissions' }, { status: 500, headers: CORS_HEADERS });
  }
}

// POST /api/hire-submissions -> Submit new Hire Us requirement
export async function POST(request) {
  try {
    const body = await request.json();

    const name = (body.fullName || body.name || '').toString().trim();
    const email = (body.email || '').toString().trim().toLowerCase();
    const phone = (body.phone || '').toString().trim();
    const country = (body.country || '').toString().trim();

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

    let normalizedPhone = phone;
    if (country) {
      const phoneValidation = validatePhoneNumber(phone, country);
      if (!phoneValidation.valid) {
        return NextResponse.json({ error: phoneValidation.error }, { status: 400, headers: CORS_HEADERS });
      }
      normalizedPhone = phoneValidation.formattedPhone;
    } else {
      const digitsOnly = phone.replace(/[^0-9]/g, '');
      if (digitsOnly.length < 7 || digitsOnly.length > 16 || /[^0-9\s\-()+]/.test(phone)) {
        return NextResponse.json({ error: 'Please enter a valid phone number (7 to 15 digits).' }, { status: 400, headers: CORS_HEADERS });
      }
    }

    const now = new Date().toISOString();
    const services = Array.isArray(body.services) ? body.services : (body.details?.services || []);
    const requirementType = body.requirementType || body.details?.requirementType || 'Dedicated Resource';
    const isDraft = body.isDraft === true || body.status === 'Draft';
    const status = isDraft ? 'Draft' : (body.status || 'Pending');

    const doc = {
      name,
      fullName: name,
      email,
      phone: normalizedPhone,
      whatsapp: (body.whatsapp || body.details?.whatsapp || '').toString().trim(),
      country,
      jobTitle: (body.jobTitle || body.details?.jobTitle || '').toString().trim(),
      requirementType,
      services,
      otherService: (body.otherService || body.details?.otherService || '').toString().trim(),
      resourceCount: (body.resourceCount || body.details?.resourceCount || '1').toString().trim(),
      exactResourceCount: (body.exactResourceCount || body.details?.exactResourceCount || '').toString().trim(),
      experienceLevel: (body.experienceLevel || body.details?.experienceLevel || '3-5 Years').toString().trim(),
      workArrangement: (body.workArrangement || body.details?.workArrangement || 'Remote').toString().trim(),
      requiredLocation: (body.requiredLocation || body.details?.requiredLocation || body.city || body.details?.city || '').toString().trim(),
      city: (body.city || body.details?.city || body.requiredLocation || body.details?.requiredLocation || '').toString().trim(),
      arrangementCountry: (body.arrangementCountry || body.details?.arrangementCountry || '').toString().trim(),
      timeZone: (body.timeZone || body.details?.timeZone || '').toString().trim(),
      workingHours: (body.workingHours || body.details?.workingHours || '').toString().trim(),
      workingDays: (body.workingDays || body.details?.workingDays || '').toString().trim(),
      hoursPerDay: (body.hoursPerDay || body.details?.hoursPerDay || '').toString().trim(),
      hoursPerWeek: (body.hoursPerWeek || body.details?.hoursPerWeek || '').toString().trim(),
      duration: (body.duration || body.details?.duration || '').toString().trim(),
      startDate: (body.startDate || body.details?.startDate || '').toString().trim(),
      endDate: (body.endDate || body.details?.endDate || '').toString().trim(),
      budgetType: (body.budgetType || body.details?.budgetType || '').toString().trim(),
      minBudget: (body.minBudget || body.details?.minBudget || '').toString().trim(),
      maxBudget: (body.maxBudget || body.details?.maxBudget || '').toString().trim(),
      currency: (body.currency || body.details?.currency || 'USD').toString().trim(),
      budget: (body.budget || '').toString().trim(),
      hasInternalTeam: (body.hasInternalTeam || body.details?.hasInternalTeam || '').toString().trim(),
      existingTeamRoles: Array.isArray(body.existingTeamRoles) ? body.existingTeamRoles : (body.details?.existingTeamRoles || []),
      otherTeamRole: (body.otherTeamRole || body.details?.otherTeamRole || '').toString().trim(),
      communicationMethods: Array.isArray(body.communicationMethods) ? body.communicationMethods : (body.details?.communicationMethods || []),
      meetingFrequency: (body.meetingFrequency || body.details?.meetingFrequency || '').toString().trim(),
      teamManager: (body.teamManager || body.details?.teamManager || '').toString().trim(),
      hasDocumentation: (body.hasDocumentation || body.details?.hasDocumentation || '').toString().trim(),
      documentationTypes: Array.isArray(body.documentationTypes) ? body.documentationTypes : (body.details?.documentationTypes || []),
      referenceLinks: (body.referenceLinks || body.details?.referenceLinks || '').toString().trim(),
      preferredContactMethod: (body.preferredContactMethod || body.details?.preferredContactMethod || 'Email').toString().trim(),
      bestTimeToContact: (body.bestTimeToContact || body.details?.bestTimeToContact || '').toString().trim(),
      referralSources: Array.isArray(body.referralSources) ? body.referralSources : (body.details?.referralSources || []),
      otherReferral: (body.otherReferral || body.details?.otherReferral || '').toString().trim(),
      confirmAccurate: body.confirmAccurate ?? body.details?.confirmAccurate ?? true,
      confirmContact: body.confirmContact ?? body.details?.confirmContact ?? true,
      attachedFilesList: Array.isArray(body.attachedFilesList) ? body.attachedFilesList : (body.details?.attachedFilesList || []),
      message: (body.message || '').toString().trim(),
      source: (body.source || 'Hire Us Form').toString().trim(),
      status,
      isDraft,
      emailVerified: body.emailVerified === true,
      statusNote: isDraft ? 'Draft contact information saved.' : '',
      adminNotes: '',
      statusHistory: [
        {
          status,
          note: isDraft
            ? 'Draft / incomplete requirement submission received (Contact Step 1).'
            : 'Initial requirement submission received via Hire Us form.',
          changedAt: now,
        }
      ],
      isRead: false,
      createdAt: now,
      updatedAt: now,
      details: body.details || {},
    };

    const db = await getDb();

    // Check if updating an existing draft submission
    const draftId = body.draftId || body.id;
    if (draftId) {
      const query = getQueryById(draftId);
      const existing = await db.collection('hire_submissions').findOne(query);
      if (existing) {
        doc.createdAt = existing.createdAt || now;
        doc.statusHistory = [
          ...(existing.statusHistory || []),
          {
            status: doc.status,
            note: isDraft
              ? 'Draft contact info updated.'
              : 'Full requirements submitted after contact verification.',
            changedAt: now,
          }
        ];
        await db.collection('hire_submissions').updateOne(
          { _id: existing._id },
          { $set: doc }
        );
        const entry = { id: existing._id.toString(), _id: existing._id.toString(), ...doc };
        await logActivity(request, isDraft ? 'hire_draft_updated' : 'hire_submission', name, {
          email,
          phone: normalizedPhone,
          requirementType,
          status: doc.status,
          id: entry.id,
        });
        return NextResponse.json({
          ok: true,
          message: isDraft
            ? 'Contact information saved as draft.'
            : 'Thank you! Your requirement has been submitted successfully.',
          entry,
        }, { status: 200, headers: CORS_HEADERS });
      }
    }

    const res = await db.collection('hire_submissions').insertOne(doc);
    const entry = { id: res.insertedId.toString(), _id: res.insertedId.toString(), ...doc };

    await logActivity(request, isDraft ? 'hire_draft_created' : 'hire_submission', name, {
      email,
      phone: normalizedPhone,
      requirementType,
      services: services.join(', '),
      source: doc.source,
      status: doc.status,
      id: entry.id,
    });

    return NextResponse.json({
      ok: true,
      message: isDraft
        ? 'Contact information saved as draft.'
        : 'Thank you! Your requirement has been submitted successfully.',
      entry,
    }, { status: 201, headers: CORS_HEADERS });
  } catch (err) {
    console.error('POST /api/hire-submissions error:', err);
    return NextResponse.json({ error: 'Failed to process hire submission. Please try again.' }, { status: 500, headers: CORS_HEADERS });
  }
}

// PATCH /api/hire-submissions -> Update read status, lead status, or admin notes
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, isRead, status, note, adminNotes, markAll } = body || {};
    const db = await getDb();

    // Mark all as read
    if (markAll) {
      await db.collection('hire_submissions').updateMany({}, {
        $set: { isRead: true, updatedAt: new Date().toISOString() }
      });
      return NextResponse.json({ ok: true, message: 'All hire submissions marked as read' }, { headers: CORS_HEADERS });
    }

    if (!id) {
      return NextResponse.json({ error: 'Submission ID is required' }, { status: 400, headers: CORS_HEADERS });
    }

    const query = getQueryById(id);
    const existing = await db.collection('hire_submissions').findOne(query);
    if (!existing) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404, headers: CORS_HEADERS });
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
    }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('PATCH /api/hire-submissions error:', err);
    return NextResponse.json({ error: err.message || 'Failed to update submission' }, { status: 500, headers: CORS_HEADERS });
  }
}

// DELETE /api/hire-submissions -> Delete a submission
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');

    if (!id) {
      try {
        const body = await request.json();
        id = body?.id;
      } catch (_) { }
    }

    if (!id) {
      return NextResponse.json({ error: 'Submission ID is required' }, { status: 400, headers: CORS_HEADERS });
    }

    const db = await getDb();
    const query = getQueryById(id);
    const existing = await db.collection('hire_submissions').findOne(query);

    if (!existing) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404, headers: CORS_HEADERS });
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
    }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('DELETE /api/hire-submissions error:', err);
    return NextResponse.json({ error: err.message || 'Failed to delete submission' }, { status: 500, headers: CORS_HEADERS });
  }
}

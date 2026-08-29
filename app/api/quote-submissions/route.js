import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const submissions = await db.collection('submissions')
      .find({
        $or: [
          { source: { $regex: /quote/i } },
          { serviceRequired: { $exists: true } },
          { budget: { $exists: true } }
        ]
      })
      .sort({ createdAt: -1 })
      .toArray();

    const formatted = submissions.map(doc => {
      const nameParts = (doc.name || doc.fullName || '').trim().split(' ');
      return {
        _id: doc._id.toString(),
        firstName: nameParts[0] || 'N/A',
        lastName: nameParts.slice(1).join(' ') || '',
        email: doc.email || 'N/A',
        phone: doc.phone || doc.mobile || 'N/A',
        service: doc.serviceRequired || doc.service || 'N/A',
        location: doc.country || doc.location || 'N/A',
        propertyType: doc.budget || doc.propertyType || 'N/A',
        details: doc.message || doc.details || '',
        createdAt: doc.createdAt || new Date(),
        status: doc.status || 'Pending'
      };
    });

    return NextResponse.json(formatted);
  } catch (err) {
    console.error('Error fetching quote submissions:', err);
    return NextResponse.json([], { status: 500 });
  }
}

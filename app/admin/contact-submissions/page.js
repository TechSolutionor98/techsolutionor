import React from 'react';
import ContactTableClient from './ContactTableClient';
import { getApiBase } from '@/lib/api-helper';
import { getContactSubmissionsList } from '@/lib/cms-service';

export const metadata = {
  title: 'Contact Submissions - Admin',
};
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ContactSubmissionsPage() {
  const apiBase = getApiBase();
  let submissions = [];

  try {
    submissions = await getContactSubmissionsList();
  } catch (err) {
    console.error('Error fetching contact submissions', err);
  }

  return (
    <div>
      <h2 className="text-[30px] font-bold uppercase">Contact Submissions</h2>
      <div className="bg-white p-4 rounded shadow mt-10">

        <p className="text-sm text-gray-600 mb-4">
          <span className='font-bold'>Total Submissions:</span> {submissions.length}
        </p>
        <ContactTableClient initialData={submissions} apiBase={apiBase} />
      </div>
    </div>
  );
}

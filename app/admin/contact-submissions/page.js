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
    <div className="w-full">
      <h2 className="text-[26px] sm:text-[28px] font-bold uppercase mb-4 text-gray-900">Contact Submissions</h2>
      <ContactTableClient initialData={submissions} apiBase={apiBase} />
    </div>
  );
}

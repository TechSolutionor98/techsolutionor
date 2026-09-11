import React from 'react';
import ApplicationsTableClient from './ApplicationsTableClient';
import { getApiBase } from '@/lib/api-helper';
import { getApplicationsList } from '@/lib/cms-service';

export const metadata = {
  title: 'Career Applications - Admin',
};
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ApplicationsPage() {
  const apiBase = getApiBase();
  let applications = [];

  try {
    applications = await getApplicationsList();
  } catch (err) {
    console.error('Error fetching career applications', err);
  }

  return (
    <div className="w-full">
      <h2 className="text-[26px] sm:text-[28px] font-bold uppercase mb-4 text-gray-900">Career Applications</h2>
      <ApplicationsTableClient initialData={applications} apiBase={apiBase} />
    </div>
  );
}

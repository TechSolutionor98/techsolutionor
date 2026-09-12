import React from 'react';
import ApplicationsTableClient from './ApplicationsTableClient';

export const metadata = {
  title: 'Career Applications - Admin',
};

export default function ApplicationsPage() {
  return (
    <div className="w-full">
      <h2 className="text-[26px] sm:text-[28px] font-bold uppercase mb-4 text-gray-900">Career Applications</h2>
      <ApplicationsTableClient />
    </div>
  );
}

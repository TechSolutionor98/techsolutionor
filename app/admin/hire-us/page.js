import React from 'react';
import HireUsTableClient from './HireUsTableClient';

export const metadata = {
  title: 'Hire Us Submissions - Admin',
  description: 'Manage and review client talent requirements, resource inquiries, and Hire Us form submissions.',
};

export default function HireUsPage() {
  return (
    <div className="w-full">
      <h2 className="text-[26px] sm:text-[28px] font-bold uppercase mb-4 text-gray-900">Hire Us Submissions</h2>
      <HireUsTableClient />
    </div>
  );
}

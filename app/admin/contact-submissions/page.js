import React from 'react';
import ContactTableClient from './ContactTableClient';

export const metadata = {
  title: 'Contact Submissions - Admin',
};

export default function ContactSubmissionsPage() {
  return (
    <div className="w-full">
      <h2 className="text-[26px] sm:text-[28px] font-bold uppercase mb-4 text-gray-900">Contact Submissions</h2>
      <ContactTableClient />
    </div>
  );
}

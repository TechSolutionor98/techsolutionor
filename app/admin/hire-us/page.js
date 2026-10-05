import React from 'react';
import HireUsTableClient from './HireUsTableClient';

export const metadata = {
  title: 'Hire Us Submissions - Admin',
  description: 'Manage and review client talent requirements, candidate requests, and Hire Us form submissions.',
};

export default function HireUsPage() {
  return (
    <div className="w-full">
      <HireUsTableClient />
    </div>
  );
}

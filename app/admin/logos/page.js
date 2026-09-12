import React from 'react';
import LogoClient from './LogoClient';

export const metadata = { title: 'Logo Management - Admin' };

export default function LogosPage() {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Logo Management</h2>
      <p className="text-gray-600 mb-6">
        Manage your website logo. Changes will reflect across the entire website including the footer.
      </p>
      
      <LogoClient />
    </div>
  );
}

import React from 'react';
import AppointmentsClient from './AppointmentsClient';

export const metadata = { title: 'Appointments - Admin' };

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-bold text-gray-800 font-sans">APPOINTMENTS & CALENDLY</h1>
          <p className="text-sm text-gray-500">
            Manage booking links, calendar scheduling URLs, and team meeting slots.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 mt-6">
        <AppointmentsClient />
      </div>
    </div>
  );
}

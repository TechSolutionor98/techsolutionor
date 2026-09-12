import React from 'react';
import SettingsClient from './SettingsClient';

export const metadata = {
  title: 'Website Settings - Admin',
};

export default function SettingsPage() {
  return (
    <div className="w-full">
      <h2 className="text-[26px] sm:text-[28px] font-bold uppercase mb-4 text-gray-900">Website Settings</h2>
      <SettingsClient />
    </div>
  );
}

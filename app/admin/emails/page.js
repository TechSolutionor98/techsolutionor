import React from 'react';
import EmailInboxClient from './EmailInboxClient';

export const metadata = {
  title: 'Email Inbox & Management - Admin',
};

export default function AdminEmailsPage() {
  return (
    <div className="w-full">
      <h2 className="text-[26px] sm:text-[28px] font-bold uppercase mb-4 text-gray-900">Email Inbox</h2>
      <EmailInboxClient />
    </div>
  );
}

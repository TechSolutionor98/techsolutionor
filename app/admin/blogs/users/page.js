import React from 'react';
import BlogUsersClient from './BlogUsersClient';

export const metadata = { title: 'Blog Users - Admin' };

export default function BlogUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-bold text-gray-800 font-sans">BLOG USERS</h1>
          <p className="text-sm text-gray-500">
            View details of users who have commented on blog posts, and export the list to CSV for campaigns.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 mt-6">
        <BlogUsersClient />
      </div>
    </div>
  );
}

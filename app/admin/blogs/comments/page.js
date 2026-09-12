import React from 'react';
import CommentsListClient from './CommentsListClient';

export const metadata = { title: 'Blog Comments - Admin' };

export default function CommentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-bold text-gray-800 font-sans">BLOG COMMENTS</h1>
          <p className="text-sm text-gray-500">
            Review, approve, reply to, and moderate reader comments across all blog posts.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 mt-6">
        <CommentsListClient />
      </div>
    </div>
  );
}

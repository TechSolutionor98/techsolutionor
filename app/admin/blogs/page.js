import React from 'react';
import BlogsListClient from './BlogsListClient';

export const metadata = { title: 'Blogs - Admin' };

export default function BlogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-bold text-gray-800 font-sans">BLOG POSTS</h1>
          <p className="text-sm text-gray-500">
            Create, edit, moderate comments, and manage blog articles.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 mt-6">
        <BlogsListClient />
      </div>
    </div>
  );
}

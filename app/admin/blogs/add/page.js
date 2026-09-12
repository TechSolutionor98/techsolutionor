import React from 'react';
import BlogFormClient from '../components/BlogFormClient';

export const metadata = { title: 'Add Blog - Admin' };

export default function AddBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-bold text-gray-800 font-sans">ADD BLOG POST</h1>
          <p className="text-sm text-gray-500">
            Create and publish a new article for your website.
          </p>
        </div>
      </div>
      
      <BlogFormClient isEdit={false} />
    </div>
  );
}

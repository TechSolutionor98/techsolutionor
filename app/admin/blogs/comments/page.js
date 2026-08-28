import React from 'react';
import CommentsListClient from './CommentsListClient';
import { getApiBase } from '@/lib/api-helper';
import { getBlogsList, getBlogCommentsList } from '@/lib/cms-service';

export const metadata = { title: 'Blog Comments - Admin' };
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CommentsPage() {
  const apiBase = getApiBase();

  let blogs = [];
  let comments = [];

  try {
    const blogsRaw = await getBlogsList(true);
    blogs = JSON.parse(JSON.stringify(blogsRaw)) || [];
  } catch (err) {
    console.error('Failed to fetch blogs list for comments page:', err);
  }

  try {
    const commentsRaw = await getBlogCommentsList(true);
    comments = JSON.parse(JSON.stringify(commentsRaw)) || [];
  } catch (err) {
    console.error('Failed to fetch comments list for comments page:', err);
  }

  return (
    <div className="space-y-6">
      <CommentsListClient 
        initialBlogs={blogs} 
        initialComments={comments} 
        apiBase={apiBase} 
      />
    </div>
  );
}

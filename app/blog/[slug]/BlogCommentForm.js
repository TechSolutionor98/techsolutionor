"use client";

import React, { useState } from 'react';

export default function BlogCommentForm({ blogId }) {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!authorName.trim() || !comment.trim()) {
      setError('Please enter your name and comment.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/blogs/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogId,
          authorName: authorName.trim(),
          authorEmail: authorEmail.trim() || undefined,
          comment: comment.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit comment');
      }

      setSuccess(true);
      setComment('');
    } catch (err) {
      setError(err.message || 'An error occurred while submitting your comment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-6 md:p-8 mt-10">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Leave a Reply</h3>
      <p className="text-xs text-gray-500 mb-6">Your email address will not be published. Required fields are marked *</p>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm flex items-center gap-2">
          <svg className="w-5 h-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Thank you! Your comment has been submitted and will appear once approved by our team.</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. Alex Johnson"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#41b349] focus:ring-1 focus:ring-[#41b349] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email Address <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#41b349] focus:ring-1 focus:ring-[#41b349] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Comment <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts, questions, or insights..."
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#41b349] focus:ring-1 focus:ring-[#41b349] transition-all resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-[#41b349] hover:bg-black text-white font-semibold text-sm rounded-full transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
}

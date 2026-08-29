"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// Status config
const STATUS_CONFIG = {
  approved: {
    label: 'APPROVED',
    pill: 'bg-green-50 text-green-700 border-green-200',
    dot: 'bg-green-500',
  },
  pending: {
    label: 'PENDING',
    pill: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    dot: 'bg-yellow-400',
  },
  spam: {
    label: 'SPAM',
    pill: 'bg-red-50 text-red-600 border-red-200',
    dot: 'bg-red-500',
  },
  trash: {
    label: 'TRASH',
    pill: 'bg-gray-100 text-gray-700 border-gray-300',
    dot: 'bg-gray-500',
  },
  rejected: {
    label: 'REJECTED',
    pill: 'bg-red-50 text-red-600 border-red-200',
    dot: 'bg-red-500',
  },
};

function getStatus(c) {
  if (c.status) return c.status.toLowerCase();
  return c.approved ? 'approved' : 'pending';
}

function formatDateTime(dateStr) {
  if (!dateStr) return { date: 'N/A', time: '' };
  try {
    const d = new Date(dateStr);
    const date = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    return { date, time };
  } catch (e) {
    return { date: String(dateStr), time: '' };
  }
}

function formatLatestDate(dateStr) {
  if (!dateStr) return 'No comments yet.';
  try {
    const d = new Date(dateStr);
    const date = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    return `${date}, ${time}`;
  } catch (e) {
    return 'No comments yet.';
  }
}

// ---- Edit Modal ----
function EditModal({ comment, onClose, onSave }) {
  const [text, setText] = useState(comment.comment || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!text.trim()) return;
    setSaving(true);
    await onSave(comment._id, text.trim());
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs transition-all duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden border border-gray-100 flex flex-col text-gray-900">
        {/* Header */}
        <div className="bg-[#34953C] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <h2 className="text-white font-extrabold text-base tracking-wide">Edit Comment Content</h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white transition-all text-xl font-bold p-1 hover:bg-white/10 rounded-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-left">
          <div className="bg-[#34953C]/5 rounded-xl border border-[#34953C]/20 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Comment Author</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-8 h-8 bg-[#34953C] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {comment.authorName ? comment.authorName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 leading-tight">{comment.authorName}</p>
                  {comment.authorEmail && (
                    <p className="text-xs text-gray-500 font-mono select-all mt-0.5">{comment.authorEmail}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-1 border-t md:border-t-0 md:border-l border-gray-200/60 pt-3 md:pt-0 md:pl-4">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Associated Article</span>
              <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight mt-1">
                {comment.blogTitle || 'N/A'}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Comment Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#34953C]/50 focus:border-[#34953C] transition bg-gray-50/30 focus:bg-white resize-y"
              placeholder="Write the comment text..."
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !text.trim()}
            className="px-6 py-2 bg-[#34953C] hover:bg-[#2b7e32] text-white rounded-lg text-xs font-bold transition-all cursor-pointer disabled:opacity-50 shadow-sm"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Status Dropdown ----
function StatusDropdown({ comment, onStatusChange, loading }) {
  const [open, setOpen] = useState(false);
  const current = getStatus(comment);
  const cfg = STATUS_CONFIG[current] || STATUS_CONFIG.pending;

  const options = ['approved', 'pending', 'spam', 'trash'].filter((s) => s !== current);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={loading}
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border uppercase cursor-pointer hover:shadow-xs transition ${cfg.pill}`}
      >
        <span className={`w-2 h-2 rounded-full ${cfg.dot}`}></span>
        {cfg.label}
        <svg className="w-2.5 h-2.5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-1 z-30 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden min-w-[130px]">
            {options.map((status) => {
              const c = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
              return (
                <button
                  key={status}
                  onClick={() => {
                    onStatusChange(comment._id, status);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-gray-50 transition cursor-pointer text-left ${c.pill.split(' ')[1]}`}
                >
                  <span className={`w-2 h-2 rounded-full ${c.dot}`}></span>
                  {c.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ---- Truncated Comment Cell ----
function CommentCell({ text }) {
  const [hovered, setHovered] = useState(false);
  const isLong = text?.length > 90;

  return (
    <div className="relative group max-w-xs md:max-w-sm text-left">
      <p className="text-gray-700 text-sm leading-5 break-words line-clamp-2">
        {text}
      </p>
      {isLong && (
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="absolute -top-1 left-0 w-full h-full cursor-default"
        >
          {hovered && (
            <div className="absolute z-30 left-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 text-xs text-gray-700 leading-relaxed whitespace-pre-wrap break-words text-left">
              <span className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Full Comment</span>
              {text}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CommentsListClient({
  initialBlogs = [],
  initialComments = [],
  apiBase = ''
}) {
  const [blogs] = useState(initialBlogs);
  const [comments, setComments] = useState(initialComments);

  // When selectedBlog is null, show Blogs List Table. When set, show that blog's comments table.
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Filters state for comments view
  const [statusTab, setStatusTab] = useState('all'); // 'all' | 'mine' | 'pending' | 'approved' | 'spam' | 'trash'
  const [search, setSearch] = useState('');
  const [blogSearch, setBlogSearch] = useState('');
  const [commentType, setCommentType] = useState('all'); // 'all' | 'comments'
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkAction, setBulkAction] = useState('');

  const [loading, setLoading] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

  // Calculate live comment stats for each blog
  const blogStats = useMemo(() => {
    const map = {};
    blogs.forEach((b) => {
      const bId = b._id.toString();
      const bSlug = b.slug;
      map[bId] = { total: 0, pending: 0, approved: 0, spam: 0, trash: 0, mine: 0, latestCommentAt: null };
      if (bSlug) map[bSlug] = map[bId];
    });

    comments.forEach((c) => {
      const stats = map[c.blogId];
      if (stats) {
        stats.total += 1;
        const status = getStatus(c);
        if (status === 'approved') stats.approved += 1;
        else if (status === 'pending') stats.pending += 1;
        else if (status === 'spam') stats.spam += 1;
        else if (status === 'trash') stats.trash += 1;
        if (c.isMine || c.authorName?.toLowerCase() === 'admin') stats.mine += 1;

        if (c.createdAt) {
          const cDate = new Date(c.createdAt);
          if (!stats.latestCommentAt || cDate > new Date(stats.latestCommentAt)) {
            stats.latestCommentAt = c.createdAt;
          }
        }
      }
    });

    return map;
  }, [blogs, comments]);

  // Comments belonging strictly to the currently selected blog
  const currentBlogComments = useMemo(() => {
    if (!selectedBlog) return [];
    const bId = selectedBlog._id.toString();
    const bSlug = selectedBlog.slug;
    return comments.filter((c) => c.blogId === bId || c.blogId === bSlug);
  }, [comments, selectedBlog]);

  // Tab counts for the currently selected blog
  const tabCounts = useMemo(() => {
    const counts = { all: 0, mine: 0, pending: 0, approved: 0, spam: 0, trash: 0 };
    currentBlogComments.forEach((c) => {
      const status = getStatus(c);
      counts.all += 1;
      if (status === 'approved') counts.approved += 1;
      else if (status === 'pending') counts.pending += 1;
      else if (status === 'spam') counts.spam += 1;
      else if (status === 'trash') counts.trash += 1;
      if (c.isMine || c.authorName?.toLowerCase() === 'admin') counts.mine += 1;
    });
    return counts;
  }, [currentBlogComments]);

  // Filtered comments for the selected blog
  const filteredComments = useMemo(() => {
    return currentBlogComments.filter((c) => {
      const status = getStatus(c);

      // Status Tab filter
      if (statusTab === 'approved' && status !== 'approved') return false;
      if (statusTab === 'pending' && status !== 'pending') return false;
      if (statusTab === 'spam' && status !== 'spam') return false;
      if (statusTab === 'trash' && status !== 'trash') return false;
      if (statusTab === 'mine' && !c.isMine && c.authorName?.toLowerCase() !== 'admin') return false;

      // Comment Type filter
      if (commentType === 'comments' && c.inReplyTo) return false;

      // Search filter
      if (search.trim()) {
        const query = search.toLowerCase();
        const matches =
          c.comment?.toLowerCase().includes(query) ||
          c.authorName?.toLowerCase().includes(query) ||
          (c.authorEmail && c.authorEmail.toLowerCase().includes(query)) ||
          (c.blogTitle && c.blogTitle.toLowerCase().includes(query));
        if (!matches) return false;
      }

      return true;
    });
  }, [currentBlogComments, statusTab, commentType, search]);

  // Filtered blogs for Blog List View
  const filteredBlogs = useMemo(() => {
    if (!blogSearch.trim()) return blogs;
    return blogs.filter((b) =>
      b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.category?.toLowerCase().includes(blogSearch.toLowerCase())
    );
  }, [blogs, blogSearch]);

  // Refresh list
  const refresh = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/blogs/comments?all=true`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setComments(data);
    } catch (err) {
      alert('Failed to refresh: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Change single status
  const changeStatus = async (id, newStatus) => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/blogs/comments`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      setComments((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, status: newStatus, approved: newStatus === 'approved' } : c
        )
      );
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Save quick edit
  const saveEdit = async (id, newText) => {
    try {
      const res = await fetch(`${apiBase}/api/blogs/comments`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, comment: newText }),
      });
      if (!res.ok) throw new Error('Failed to update comment');
      setComments((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, comment: newText, editedAt: new Date().toISOString() } : c
        )
      );
      setEditingComment(null);
    } catch (err) {
      alert('Failed to save: ' + err.message);
    }
  };

  // Single delete
  const deleteComment = async (id) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/blogs/comments?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setComments((prev) => prev.filter((c) => c._id !== id));
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Bulk action apply
  const handleApplyBulkAction = async () => {
    if (!bulkAction) {
      alert('Please select a bulk action from the dropdown.');
      return;
    }
    if (selectedIds.length === 0) {
      alert('Please select at least one comment using the checkboxes.');
      return;
    }

    if (bulkAction === 'delete') {
      if (!confirm(`Are you sure you want to permanently delete ${selectedIds.length} comments?`)) return;
      try {
        setLoading(true);
        const res = await fetch(`${apiBase}/api/blogs/comments?ids=${selectedIds.join(',')}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Bulk delete failed');
        setComments((prev) => prev.filter((c) => !selectedIds.includes(c._id)));
        setSelectedIds([]);
        setBulkAction('');
      } catch (err) {
        alert('Error: ' + err.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    const statusMap = {
      unapprove: 'pending',
      approve: 'approved',
      spam: 'spam',
      trash: 'trash',
    };
    const targetStatus = statusMap[bulkAction];
    if (!targetStatus) return;

    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/blogs/comments`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds, status: targetStatus }),
      });
      if (!res.ok) throw new Error('Bulk update failed');
      setComments((prev) =>
        prev.map((c) =>
          selectedIds.includes(c._id)
            ? { ...c, status: targetStatus, approved: targetStatus === 'approved' }
            : c
        )
      );
      setSelectedIds([]);
      setBulkAction('');
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Select all checkboxes
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredComments.map((c) => c._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full flex flex-col">
      {/* Edit Modal */}
      {editingComment && (
        <EditModal
          comment={editingComment}
          onClose={() => setEditingComment(null)}
          onSave={saveEdit}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[28px] sm:text-[30px] font-bold text-gray-900 font-sans tracking-tight">
            BLOG COMMENTS
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Moderate, approve, reject, or edit user comments on blog posts.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SCREEN 1: BLOGS TABLE LIST (Grouped by Blog, Each Blog Listed Once)       */}
      {/* ========================================================================= */}
      {!selectedBlog ? (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 min-h-[calc(100vh-230px)] flex flex-col">
          {/* Controls Bar: Refresh & Search Blogs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <button
                onClick={refresh}
                disabled={loading}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 font-semibold rounded-lg text-xs transition cursor-pointer ${loading ? 'opacity-60' : ''}`}
              >
                <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
              <span className="text-xs font-semibold text-gray-600">
                Total: {filteredBlogs.length} Blogs ({comments.length} Comments)
              </span>
            </div>

            <div className="w-full sm:w-80">
              <input
                type="text"
                value={blogSearch}
                onChange={(e) => setBlogSearch(e.target.value)}
                placeholder="Search blog posts..."
                className="w-full px-3.5 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-800 focus:ring-2 focus:ring-[#34953C]/40 focus:border-[#34953C] outline-none transition"
              />
            </div>
          </div>

          {/* Blogs Table (Row and Column Wise with Orange Header #34953C) */}
          <div className="overflow-x-hidden overflow-y-auto w-full rounded-xl border border-gray-200 shadow-xs flex-1 min-h-[380px] max-h-[calc(100vh-270px)]">
            <table className="w-full text-xs text-left table-fixed">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#34953C] text-white text-left font-semibold shadow-xs">
                  <th className="px-4 py-3.5 w-[32%]">Blog Post</th>
                  <th className="px-3 py-3.5 w-[16%]">Category</th>
                  <th className="px-3 py-3.5 w-[12%]">Status</th>
                  <th className="px-3 py-3.5 w-[14%]">Total Comments</th>
                  <th className="px-3 py-3.5 w-[14%]">Latest Comment</th>
                  <th className="px-4 py-3.5 text-right w-[12%]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {filteredBlogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-gray-400 font-medium">
                      No blog posts found.
                    </td>
                  </tr>
                ) : (
                  filteredBlogs.map((b) => {
                    const stats = blogStats[b._id.toString()] || { total: 0, pending: 0, approved: 0, latestCommentAt: null };
                    const coverImg = b.coverImage || '/images/blogabout.png';

                    return (
                      <tr
                        key={b._id}
                        onClick={() => {
                          setSelectedBlog(b);
                          setStatusTab('all');
                          setSelectedIds([]);
                          setSearch('');
                        }}
                        className="hover:bg-orange-50/30 transition-colors align-middle cursor-pointer group"
                      >
                        {/* Blog Post with Thumbnail */}
                        <td className="px-4 py-3 min-w-0">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-8 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                              <img src={coverImg} alt={b.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="font-bold text-gray-900 group-hover:text-[#34953C] transition-colors block truncate text-xs" title={b.title}>
                                {b.title}
                              </span>
                              {b.slug && (
                                <Link
                                  href={`/blog/${b.slug}`}
                                  target="_blank"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-[10px] text-[#41b349] hover:underline inline-block mt-0.5"
                                >
                                  View Live Post ↗
                                </Link>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-3 py-3 text-gray-700 font-medium truncate" title={b.category}>
                          {b.category || 'General'}
                        </td>

                        {/* Status */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            b.published ? 'bg-black text-white' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {b.published ? 'Published' : 'Draft'}
                          </span>
                        </td>

                        {/* Total Comments Count */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="font-extrabold text-gray-900 text-xs">
                            {stats.total} {stats.total === 1 ? 'Comment' : 'Comments'}
                          </span>
                        </td>

                        {/* Latest Comment Date & Time (Two Separate Lines) */}
                        <td className="px-3 py-3 whitespace-nowrap text-left text-xs">
                          {stats.latestCommentAt ? (
                            <div>
                              <div className="font-semibold text-gray-800">
                                {formatDateTime(stats.latestCommentAt).date}
                              </div>
                              <div className="text-gray-400 text-[11px] mt-0.5">
                                {formatDateTime(stats.latestCommentAt).time}
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400 italic text-xs">
                              No comments yet.
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBlog(b);
                              setStatusTab('all');
                              setSelectedIds([]);
                              setSearch('');
                            }}
                            className="px-3 py-1.5 bg-[#34953C] hover:bg-[#2b7e32] text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs inline-flex items-center gap-1"
                          >
                            <span>Manage ({stats.total})</span>
                            <span>→</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* SCREEN 2: SELECTED BLOG'S COMMENTS TABLE (Row-by-Row, Exact Matching)    */
        /* ========================================================================= */
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 space-y-4 min-h-[calc(100vh-230px)] flex flex-col">
          {/* Back Button & Selected Blog Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-150">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedBlog(null);
                  setSelectedIds([]);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg border border-gray-300 transition-colors cursor-pointer"
              >
                ← Back to All Blogs
              </button>
              <div>
                <span className="text-[10px] font-bold text-[#34953C] uppercase tracking-wider block">
                  Blog Selected:
                </span>
                <h2 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">
                  {selectedBlog.title} ({currentBlogComments.length} Comments)
                </h2>
              </div>
            </div>

            {selectedBlog.slug && (
              <Link
                href={`/blog/${selectedBlog.slug}`}
                target="_blank"
                className="text-xs text-[#41b349] hover:underline font-semibold inline-flex items-center gap-1"
              >
                View Live Article ↗
              </Link>
            )}
          </div>

          {/* Row 1: Refresh Button | Status Filter Tabs | Search Input */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Refresh */}
              <button
                onClick={refresh}
                disabled={loading}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 font-semibold rounded-lg text-xs transition cursor-pointer ${loading ? 'opacity-60' : ''}`}
              >
                <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>

              {/* Status Tabs: All | Mine | Pending | Approved | Spam | Trash */}
              <div className="flex bg-gray-100 p-0.5 rounded-lg text-xs flex-wrap">
                {[
                  { key: 'all', label: 'All', count: tabCounts.all },
                  { key: 'mine', label: 'Mine', count: tabCounts.mine },
                  { key: 'pending', label: 'Pending', count: tabCounts.pending },
                  { key: 'approved', label: 'Approved', count: tabCounts.approved },
                  { key: 'spam', label: 'Spam', count: tabCounts.spam },
                  { key: 'trash', label: 'Trash', count: tabCounts.trash },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setStatusTab(tab.key)}
                    className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      statusTab === tab.key
                        ? tab.key === 'approved'
                          ? 'bg-white text-green-700 shadow-xs'
                          : tab.key === 'pending'
                          ? 'bg-white text-yellow-700 shadow-xs'
                          : tab.key === 'spam' || tab.key === 'trash'
                          ? 'bg-white text-red-600 shadow-xs'
                          : 'bg-white text-gray-900 shadow-xs font-bold'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      statusTab === tab.key ? 'bg-gray-100 text-gray-800' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search Box */}
            <div className="w-full sm:w-80">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search comments, authors..."
                className="w-full px-3.5 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-800 focus:ring-2 focus:ring-[#34953C]/40 focus:border-[#34953C] outline-none transition"
              />
            </div>
          </div>

          {/* Row 2: Bulk Actions & Filter by Comment Type */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Bulk Actions Dropdown */}
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-[#34953C]"
              >
                <option value="">Bulk actions</option>
                <option value="approve">Approve</option>
                <option value="unapprove">Unapprove</option>
                <option value="spam">Mark as Spam</option>
                <option value="trash">Move to Trash</option>
                <option value="delete">Delete Permanently</option>
              </select>

              <button
                type="button"
                onClick={handleApplyBulkAction}
                disabled={loading || selectedIds.length === 0}
                className="border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer disabled:opacity-50"
              >
                Apply
              </button>

              {/* Filter by Comment Type */}
              <select
                value={commentType}
                onChange={(e) => setCommentType(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-[#34953C] ml-1"
              >
                <option value="all">All comment types</option>
                <option value="comments">Comments</option>
              </select>
            </div>

            {/* Counter info */}
            <div className="text-xs text-gray-500 font-semibold">
              {selectedIds.length > 0 && (
                <span className="text-[#34953C] mr-2 font-bold">{selectedIds.length} selected</span>
              )}
              <span>Showing {filteredComments.length} of {currentBlogComments.length} comments</span>
            </div>
          </div>

          {/* Comments Table (Row-by-Row, Exact Matching Screenshot 1 & 3) */}
          <div className="overflow-x-hidden overflow-y-auto w-full rounded-xl border border-gray-200 shadow-xs flex-1 min-h-[580px] max-h-[calc(100vh-310px)]">
            <table className="w-full text-xs text-left table-fixed">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#34953C] text-white text-left font-semibold shadow-xs">
                  <th className="px-3.5 py-3 w-[4%] text-center">
                    <input
                      type="checkbox"
                      checked={filteredComments.length > 0 && selectedIds.length === filteredComments.length}
                      onChange={handleSelectAll}
                      className="rounded text-[#34953C] focus:ring-[#34953C] cursor-pointer"
                    />
                  </th>
                  <th className="px-3.5 py-3 w-[18%]">Blog Post</th>
                  <th className="px-3.5 py-3 w-[16%]">Author</th>
                  <th className="px-3.5 py-3 w-[26%]">Comment</th>
                  <th className="px-3.5 py-3 w-[14%] whitespace-nowrap">Date & Time</th>
                  <th className="px-3.5 py-3 w-[12%]">Status</th>
                  <th className="px-3.5 py-3 text-right w-[10%]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {filteredComments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-gray-400 font-medium">
                      No comments found for this blog.
                    </td>
                  </tr>
                ) : (
                  filteredComments.map((c) => {
                    const dt = formatDateTime(c.createdAt);
                    const isSelected = selectedIds.includes(c._id);

                    return (
                      <tr
                        key={c._id}
                        className={`hover:bg-gray-50/80 transition-colors align-middle ${
                          isSelected ? 'bg-orange-50/40' : ''
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="px-3.5 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelect(c._id)}
                            className="rounded text-[#34953C] focus:ring-[#34953C] cursor-pointer"
                          />
                        </td>

                        {/* Blog Post */}
                        <td className="px-3.5 py-3 min-w-0 text-left">
                          <span className="font-bold text-gray-900 block truncate text-xs" title={c.blogTitle || selectedBlog.title}>
                            {c.blogTitle || selectedBlog.title}
                          </span>
                          {selectedBlog.slug && (
                            <Link
                              href={`/blog/${selectedBlog.slug}`}
                              target="_blank"
                              className="text-[10px] text-[#41b349] hover:underline block truncate mt-0.5"
                            >
                              View Post ↗
                            </Link>
                          )}
                        </td>

                        {/* Author */}
                        <td className="px-3.5 py-3 min-w-0 text-left">
                          <div className="font-bold text-gray-900 text-xs truncate">{c.authorName}</div>
                          {c.authorEmail && (
                            <div className="text-[11px] text-gray-400 font-mono truncate mt-0.5">
                              {c.authorEmail}
                            </div>
                          )}
                        </td>

                        {/* Comment */}
                        <td className="px-3.5 py-3 text-left">
                          {c.inReplyTo && (
                            <span className="text-[10px] text-[#41b349] font-semibold block mb-0.5">
                              In reply to {c.inReplyTo}
                            </span>
                          )}
                          <CommentCell text={c.comment} />
                        </td>

                        {/* Date & Time */}
                        <td className="px-3.5 py-3 text-xs whitespace-nowrap text-left">
                          <div className="font-semibold text-gray-700">{dt.date}</div>
                          <div className="text-gray-400 text-[11px] mt-0.5">{dt.time}</div>
                        </td>

                        {/* Status Dropdown */}
                        <td className="px-3.5 py-3 text-left whitespace-nowrap align-middle">
                          <StatusDropdown comment={c} onStatusChange={changeStatus} loading={loading} />
                        </td>

                        {/* Actions: Edit & Delete (Stacked Vertically) */}
                        <td className="px-3.5 py-3 text-right whitespace-nowrap align-middle">
                          <div className="flex flex-col items-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditingComment(c)}
                              className="px-2.5 py-1 text-[11px] font-semibold rounded border border-gray-200 text-gray-700 hover:bg-gray-100 transition cursor-pointer flex items-center justify-center gap-1 w-[68px]"
                            >
                              <svg className="w-2.5 h-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => deleteComment(c._id)}
                              disabled={loading}
                              className="px-2.5 py-1 border border-red-200 text-red-600 hover:bg-red-50 rounded text-[11px] font-semibold transition cursor-pointer disabled:opacity-50 w-[68px] text-center"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

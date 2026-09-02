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
            className="px-6 py-2 bg-[#34953C] hover:bg-[#2b7e32] text-white rounded-lg text-xs font-bold transition-all cursor-pointer disabled:opacity-50 shadow-xs"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- WordPress-Style Comment Cell with Hover Actions & Inline Edit/Reply ----
function CommentRowContent({
  comment,
  onStatusChange,
  onOpenEditModal,
  onQuickEditSave,
  onReplySubmit,
  onDelete,
  loading
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replySubmitting, setReplySubmitting] = useState(false);

  const [isQuickEditing, setIsQuickEditing] = useState(false);
  const [quickEditText, setQuickEditText] = useState(comment.comment || '');
  const [quickEditSaving, setQuickEditSaving] = useState(false);

  const currentStatus = getStatus(comment);

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setReplySubmitting(true);
    await onReplySubmit(comment, replyText.trim());
    setReplySubmitting(false);
    setReplyText('');
    setIsReplying(false);
  };

  const handleQuickEditSave = async () => {
    if (!quickEditText.trim()) return;
    setQuickEditSaving(true);
    await onQuickEditSave(comment._id, quickEditText.trim());
    setQuickEditSaving(false);
    setIsQuickEditing(false);
  };

  return (
    <div className="flex flex-col text-left space-y-1.5 py-1">
      {comment.inReplyTo && (
        <span className="text-[10px] text-[#34953C] font-semibold block">
          In reply to {comment.inReplyTo}
        </span>
      )}

      {isQuickEditing ? (
        <div className="space-y-2 mt-1 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
          <textarea
            value={quickEditText}
            onChange={(e) => setQuickEditText(e.target.value)}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded text-xs text-gray-800 focus:ring-1 focus:ring-[#34953C] outline-none bg-white"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickEditSave}
              disabled={quickEditSaving || !quickEditText.trim()}
              className="px-3 py-1 bg-[#34953C] hover:bg-[#2b7e32] text-white text-xs font-bold rounded cursor-pointer disabled:opacity-50"
            >
              {quickEditSaving ? 'Updating...' : 'Update Comment'}
            </button>
            <button
              onClick={() => {
                setIsQuickEditing(false);
                setQuickEditText(comment.comment || '');
              }}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-800 text-xs sm:text-sm leading-relaxed break-words">
          {comment.comment}
        </p>
      )}

      {/* WordPress-style Hover Actions Underneath Comment */}
      {!isQuickEditing && !isReplying && (
        <div className="flex items-center gap-1.5 text-[11px] font-medium pt-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity flex-wrap select-none">
          {currentStatus === 'approved' ? (
            <button
              onClick={() => onStatusChange(comment._id, 'pending')}
              disabled={loading}
              className="text-amber-600 hover:underline cursor-pointer"
            >
              Unapprove
            </button>
          ) : (
            <button
              onClick={() => onStatusChange(comment._id, 'approved')}
              disabled={loading}
              className="text-green-700 hover:underline cursor-pointer font-semibold"
            >
              Approve
            </button>
          )}
          <span className="text-gray-300">|</span>

          <button
            onClick={() => setIsReplying(true)}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Reply
          </button>
          <span className="text-gray-300">|</span>

          <button
            onClick={() => setIsQuickEditing(true)}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Quick Edit
          </button>
          <span className="text-gray-300">|</span>

          <button
            onClick={() => onOpenEditModal(comment)}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Edit
          </button>
          <span className="text-gray-300">|</span>

          {currentStatus === 'spam' ? (
            <button
              onClick={() => onStatusChange(comment._id, 'pending')}
              disabled={loading}
              className="text-amber-600 hover:underline cursor-pointer"
            >
              Not Spam
            </button>
          ) : (
            <button
              onClick={() => onStatusChange(comment._id, 'spam')}
              disabled={loading}
              className="text-red-600 hover:underline cursor-pointer"
            >
              Spam
            </button>
          )}
          <span className="text-gray-300">|</span>

          {currentStatus === 'trash' ? (
            <button
              onClick={() => onDelete(comment._id)}
              disabled={loading}
              className="text-red-700 hover:underline cursor-pointer font-bold"
            >
              Delete Permanently
            </button>
          ) : (
            <button
              onClick={() => onStatusChange(comment._id, 'trash')}
              disabled={loading}
              className="text-red-600 hover:underline cursor-pointer"
            >
              Trash
            </button>
          )}
        </div>
      )}

      {/* Inline Reply Form */}
      {isReplying && (
        <div className="space-y-2 mt-2 bg-blue-50/50 p-2.5 rounded-lg border border-blue-200">
          <span className="text-[11px] font-bold text-blue-800 block">
            Replying to {comment.authorName}:
          </span>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write admin reply..."
            rows={3}
            className="w-full p-2 border border-blue-300 rounded text-xs text-gray-800 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleReply}
              disabled={replySubmitting || !replyText.trim()}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded cursor-pointer disabled:opacity-50"
            >
              {replySubmitting ? 'Posting...' : 'Submit Reply'}
            </button>
            <button
              onClick={() => {
                setIsReplying(false);
                setReplyText('');
              }}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded cursor-pointer"
            >
              Cancel
            </button>
          </div>
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

  // When selectedBlog is null, show Main Table (all comments from all blogs).
  // When set, show that specific blog's comments table (without Blog column).
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Filters state for comments view
  const [statusTab, setStatusTab] = useState('all'); // 'all' | 'mine' | 'pending' | 'approved' | 'spam' | 'trash'
  const [search, setSearch] = useState('');
  const [commentType, setCommentType] = useState('all'); // 'all' | 'comments'
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkAction, setBulkAction] = useState('');

  const [loading, setLoading] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

  // Map of blogs for fast lookup
  const blogsMap = useMemo(() => {
    const map = {};
    blogs.forEach((b) => {
      if (b._id) map[b._id.toString()] = b;
      if (b.slug) map[b.slug] = b;
    });
    return map;
  }, [blogs]);

  // Calculate live comment stats for each blog
  const blogStats = useMemo(() => {
    const map = {};
    blogs.forEach((b) => {
      const bId = b._id ? b._id.toString() : '';
      const bSlug = b.slug;
      const initial = { total: 0, pending: 0, approved: 0, spam: 0, trash: 0, mine: 0, latestCommentAt: null };
      if (bId) map[bId] = { ...initial };
      if (bSlug) map[bSlug] = map[bId] || { ...initial };
    });

    comments.forEach((c) => {
      let stats = map[c.blogId];
      if (!stats) {
        map[c.blogId] = { total: 0, pending: 0, approved: 0, spam: 0, trash: 0, mine: 0, latestCommentAt: null };
        stats = map[c.blogId];
      }
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
    });

    return map;
  }, [blogs, comments]);

  // Determine active dataset (All comments OR Specific blog's comments)
  const activeComments = useMemo(() => {
    if (!selectedBlog) return comments;
    const bId = selectedBlog._id ? selectedBlog._id.toString() : '';
    const bSlug = selectedBlog.slug;
    return comments.filter((c) => c.blogId === bId || c.blogId === bSlug);
  }, [comments, selectedBlog]);

  // Tab counts for the currently active dataset
  const tabCounts = useMemo(() => {
    const counts = { all: 0, mine: 0, pending: 0, approved: 0, spam: 0, trash: 0 };
    activeComments.forEach((c) => {
      const status = getStatus(c);
      counts.all += 1;
      if (status === 'approved') counts.approved += 1;
      else if (status === 'pending') counts.pending += 1;
      else if (status === 'spam') counts.spam += 1;
      else if (status === 'trash') counts.trash += 1;
      if (c.isMine || c.authorName?.toLowerCase() === 'admin') counts.mine += 1;
    });
    return counts;
  }, [activeComments]);

  // Filtered comments based on status tab, type, search
  const filteredComments = useMemo(() => {
    return activeComments.filter((c) => {
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
  }, [activeComments, statusTab, commentType, search]);

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

  // Open specific blog view
  const openSpecificBlog = (blogId, blogTitle = '', blogSlug = '') => {
    const blogObj = blogsMap[blogId] || { _id: blogId, title: blogTitle || 'Blog Post', slug: blogSlug };
    setSelectedBlog(blogObj);
    setStatusTab('all');
    setSelectedIds([]);
    setSearch('');
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

  // Submit Admin Reply
  const handleReplySubmit = async (parentComment, replyText) => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/blogs/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogId: parentComment.blogId,
          authorName: 'Admin',
          authorEmail: 'admin@osumfix.com',
          comment: replyText,
          inReplyTo: parentComment.authorName,
          isAdmin: true,
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to post reply');
      }
      const data = await res.json();
      if (data.comment) {
        setComments((prev) => [data.comment, ...prev]);
      } else {
        await refresh();
      }
    } catch (err) {
      alert('Failed to post reply: ' + err.message);
    } finally {
      setLoading(false);
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
    <div className="w-full flex flex-col space-y-6">
      {/* Edit Modal */}
      {editingComment && (
        <EditModal
          comment={editingComment}
          onClose={() => setEditingComment(null)}
          onSave={saveEdit}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] sm:text-[30px] font-bold text-gray-900 font-sans tracking-tight">
            BLOG COMMENTS
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Moderate, approve, reject, or edit user comments on blog posts.
          </p>
        </div>
      </div>

      {/* Main Comments Container Card */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 space-y-4 min-h-[calc(100vh-230px)] flex flex-col">
        {/* Specific Blog Back Header (Only when a specific blog is selected) */}
        {selectedBlog && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-150">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedBlog(null);
                  setSelectedIds([]);
                  setStatusTab('all');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg border border-gray-300 transition-colors cursor-pointer"
              >
                ← Back to All Comments
              </button>
              <div>
                <span className="text-[10px] font-bold text-[#34953C] uppercase tracking-wider block">
                  Blog Selected:
                </span>
                <h2 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">
                  {selectedBlog.title} ({activeComments.length} Comments)
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
        )}

        {/* Top Controls Row 1: Refresh Button | Status Tabs | Search Input */}
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
              placeholder="Search comments, authors, blogs..."
              className="w-full px-3.5 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-800 focus:ring-2 focus:ring-[#34953C]/40 focus:border-[#34953C] outline-none transition"
            />
          </div>
        </div>

        {/* Top Controls Row 2: Bulk Actions & Filter by Comment Type */}
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
            <span>Showing {filteredComments.length} of {activeComments.length} comments</span>
          </div>
        </div>

        {/* COMMENTS TABLE (Main Table: Shows All Comments from All Blogs || Specific Blog Table) */}
        <div className="overflow-x-hidden overflow-y-auto w-full rounded-xl border border-gray-200 shadow-xs flex-1 min-h-[480px] max-h-[calc(100vh-310px)]">
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

                {/* Author Column */}
                <th className={selectedBlog ? "px-3.5 py-3 w-[24%]" : "px-3.5 py-3 w-[22%]"}>Author</th>

                {/* Comments Column */}
                <th className={selectedBlog ? "px-3.5 py-3 w-[58%]" : "px-3.5 py-3 w-[38%]"}>
                  Comments
                </th>

                {/* Blog Column (Only rendered when in Main All-Comments View) */}
                {!selectedBlog && (
                  <th className="px-3.5 py-3 w-[22%]">Blog</th>
                )}

                {/* Time / Date Column */}
                <th className="px-3.5 py-3 w-[14%] whitespace-nowrap">Time / Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredComments.length === 0 ? (
                <tr>
                  <td colSpan={selectedBlog ? 4 : 5} className="px-4 py-12 text-center text-gray-400 font-medium">
                    No comments found.
                  </td>
                </tr>
              ) : (
                filteredComments.map((c) => {
                  const dt = formatDateTime(c.createdAt);
                  const isSelected = selectedIds.includes(c._id);
                  const bObj = blogsMap[c.blogId];
                  const blogTitle = c.blogTitle || bObj?.title || 'Blog Post';
                  const blogSlug = c.blogSlug || bObj?.slug || '';
                  const bStats = blogStats[c.blogId] || { total: 0, latestCommentAt: null };

                  return (
                    <tr
                      key={c._id}
                      className={`group hover:bg-gray-50/80 transition-colors align-top ${
                        isSelected ? 'bg-orange-50/40' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-3.5 py-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(c._id)}
                          className="rounded text-[#34953C] focus:ring-[#34953C] cursor-pointer mt-0.5"
                        />
                      </td>

                      {/* Author Column: Profile image on left, Author name inline, Email on next line below wrapping naturally */}
                      <td className="px-3.5 py-3.5 text-left align-top min-w-0">
                        <div className="flex flex-col space-y-1">
                          {/* Top Row: Profile avatar on left + Author name inline */}
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-7 h-7 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border border-gray-300">
                              {c.authorName ? c.authorName.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <span className="font-bold text-gray-900 text-xs break-words min-w-0 leading-tight">
                              {c.authorName}
                            </span>
                          </div>

                          {/* Bottom Row: Email address on next line below profile image/name, wrapping naturally */}
                          {c.authorEmail && (
                            <div className="text-[11px] text-gray-500 font-mono break-all leading-normal">
                              {c.authorEmail}
                            </div>
                          )}

                          {/* IP Address */}
                          {c.authorIp && (
                            <div className="text-[10px] text-gray-400 font-mono break-all leading-tight">
                              {c.authorIp}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Comments Column (Includes WordPress Hover Actions & Inline Quick Edit/Reply) */}
                      <td className="px-3.5 py-3.5 text-left">
                        <CommentRowContent
                          comment={c}
                          onStatusChange={changeStatus}
                          onOpenEditModal={setEditingComment}
                          onQuickEditSave={saveEdit}
                          onReplySubmit={handleReplySubmit}
                          onDelete={deleteComment}
                          loading={loading}
                        />
                      </td>

                      {/* Blog Column (Rendered only on Main View) */}
                      {!selectedBlog && (
                        <td className="px-3.5 py-3.5 min-w-0 text-left">
                          <span className="font-bold text-gray-900 block truncate text-xs" title={blogTitle}>
                            {blogTitle}
                          </span>
                          {blogSlug && (
                            <Link
                              href={`/blog/${blogSlug}`}
                              target="_blank"
                              className="text-[10px] text-[#41b349] hover:underline inline-block mt-0.5 font-medium"
                            >
                              View Post ↗
                            </Link>
                          )}

                          {/* Blog Comment Count Badge/Link */}
                          <div className="mt-1.5">
                            <button
                              type="button"
                              onClick={() => openSpecificBlog(c.blogId, blogTitle, blogSlug)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#34953C]/10 hover:bg-[#34953C]/20 text-[#34953C] text-[11px] font-bold transition cursor-pointer group-hover:shadow-xs"
                              title="Click to view all comments for this blog"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              <span>{bStats.total} {bStats.total === 1 ? 'Comment' : 'Comments'}</span>
                            </button>
                          </div>

                          {/* Comment count and date/time at bottom of blog info */}
                          <div className="text-[10px] text-gray-500 mt-1.5 font-medium border-t border-gray-100 pt-1">
                            Total: <span className="font-semibold text-gray-700">{bStats.total}</span>
                            {bStats.latestCommentAt && (
                              <span className="ml-1 text-gray-400">
                                • Latest: {formatDateTime(bStats.latestCommentAt).date}
                              </span>
                            )}
                          </div>
                        </td>
                      )}

                      {/* Time / Date Column */}
                      <td className="px-3.5 py-3.5 text-xs whitespace-nowrap text-left">
                        <div className="font-semibold text-gray-700">{dt.date}</div>
                        <div className="text-gray-400 text-[11px] mt-0.5">{dt.time}</div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

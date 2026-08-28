"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  FaComments, 
  FaArrowLeft, 
  FaSearch, 
  FaCheck, 
  FaTimes, 
  FaReply, 
  FaEdit, 
  FaTrash, 
  FaBan, 
  FaRedo, 
  FaExternalLinkAlt, 
  FaUser, 
  FaEnvelope, 
  FaCalendarAlt,
  FaShieldAlt
} from 'react-icons/fa';

function formatDateTime(dateStr) {
  if (!dateStr) return { date: 'N/A', time: '' };
  try {
    const d = new Date(dateStr);
    const date = d.toLocaleDateString('en-CA').replace(/-/g, '/'); // 2026/08/28
    const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase(); // 11:06 am
    return { date, time, formatted: `${date} at ${time}` };
  } catch (e) {
    return { date: String(dateStr), time: '', formatted: String(dateStr) };
  }
}

// ---- Quick Edit Modal ----
function EditModal({ comment, onClose, onSave }) {
  const [text, setText] = useState(comment.comment || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSaving(true);
    await onSave(comment._id, text.trim());
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-200">
        <div className="bg-[#41b349] px-6 py-4 flex items-center justify-between text-white">
          <h3 className="font-bold text-base flex items-center gap-2">
            <FaEdit /> Edit Comment
          </h3>
          <button onClick={onClose} className="text-white/80 hover:text-white font-bold text-lg cursor-pointer">✕</button>
        </div>
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-150">
            <p><strong>Author:</strong> {comment.authorName} ({comment.authorEmail})</p>
            <p className="mt-1"><strong>Article:</strong> {comment.blogTitle}</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Comment Content</label>
            <textarea
              required
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-[#41b349] focus:ring-1 focus:ring-[#41b349] outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !text.trim()}
              className="px-5 py-2 bg-[#41b349] hover:bg-black text-white rounded-lg text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Update Comment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---- Admin Reply Modal ----
function ReplyModal({ comment, onClose, onReply }) {
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSubmitting(true);
    await onReply(comment.blogId, comment.authorName, replyText.trim());
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-200">
        <div className="bg-[#262323] px-6 py-4 flex items-center justify-between text-white">
          <h3 className="font-bold text-base flex items-center gap-2">
            <FaReply className="text-[#41b349]" /> Reply to {comment.authorName}
          </h3>
          <button onClick={onClose} className="text-white/80 hover:text-white font-bold text-lg cursor-pointer">✕</button>
        </div>
        <form onSubmit={handleReply} className="p-6 space-y-4">
          <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <span className="font-bold text-gray-800">In reply to {comment.authorName}:</span>
            <p className="italic mt-1 text-gray-500 line-clamp-2">"{comment.comment}"</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Reply (as Admin)</label>
            <textarea
              required
              rows={5}
              placeholder="Write your response here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-[#41b349] focus:ring-1 focus:ring-[#41b349] outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !replyText.trim()}
              className="px-5 py-2 bg-[#41b349] hover:bg-black text-white rounded-lg text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'Posting Reply...' : 'Post Reply'}
            </button>
          </div>
        </form>
      </div>
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
  const [selectedBlog, setSelectedBlog] = useState(null); // null = Blog List view; Blog Object = Blog Comments view

  // Filters state
  const [statusTab, setStatusTab] = useState('all'); // 'all' | 'mine' | 'pending' | 'approved' | 'spam' | 'trash'
  const [searchQuery, setSearchQuery] = useState('');
  const [commentType, setCommentType] = useState('all'); // 'all' | 'comments'
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkAction, setBulkAction] = useState('');

  // Modals state
  const [editingComment, setEditingComment] = useState(null);
  const [replyingComment, setReplyingComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blogSearch, setBlogSearch] = useState('');

  // Calculate live comment counts per blog
  const blogStats = useMemo(() => {
    const map = {};
    blogs.forEach((b) => {
      const bId = b._id.toString();
      const bSlug = b.slug;
      map[bId] = { total: 0, pending: 0, approved: 0, spam: 0, trash: 0, mine: 0 };
      if (bSlug) map[bSlug] = map[bId];
    });

    comments.forEach((c) => {
      const stats = map[c.blogId];
      if (stats) {
        stats.total += 1;
        const status = (c.status || (c.approved ? 'approved' : 'pending')).toLowerCase();
        if (status === 'approved') stats.approved += 1;
        else if (status === 'pending') stats.pending += 1;
        else if (status === 'spam') stats.spam += 1;
        else if (status === 'trash') stats.trash += 1;
        if (c.isMine || c.authorName?.toLowerCase() === 'admin') stats.mine += 1;
      }
    });

    return map;
  }, [blogs, comments]);

  // Comments for the selected blog (or all if none selected)
  const blogComments = useMemo(() => {
    if (!selectedBlog) return comments;
    const bId = selectedBlog._id.toString();
    const bSlug = selectedBlog.slug;
    return comments.filter((c) => c.blogId === bId || c.blogId === bSlug);
  }, [comments, selectedBlog]);

  // Tab counts for the currently selected blog
  const currentTabCounts = useMemo(() => {
    const counts = { all: 0, mine: 0, pending: 0, approved: 0, spam: 0, trash: 0 };
    blogComments.forEach((c) => {
      const status = (c.status || (c.approved ? 'approved' : 'pending')).toLowerCase();
      counts.all += 1;
      if (status === 'approved') counts.approved += 1;
      else if (status === 'pending') counts.pending += 1;
      else if (status === 'spam') counts.spam += 1;
      else if (status === 'trash') counts.trash += 1;
      if (c.isMine || c.authorName?.toLowerCase() === 'admin') counts.mine += 1;
    });
    return counts;
  }, [blogComments]);

  // Filtered comments to display in table
  const displayedComments = useMemo(() => {
    return blogComments.filter((c) => {
      const status = (c.status || (c.approved ? 'approved' : 'pending')).toLowerCase();

      // Tab filter
      if (statusTab === 'approved' && status !== 'approved') return false;
      if (statusTab === 'pending' && status !== 'pending') return false;
      if (statusTab === 'spam' && status !== 'spam') return false;
      if (statusTab === 'trash' && status !== 'trash') return false;
      if (statusTab === 'mine' && !c.isMine && c.authorName?.toLowerCase() !== 'admin') return false;

      // Type filter
      if (commentType === 'comments' && c.inReplyTo) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          c.comment?.toLowerCase().includes(q) ||
          c.authorName?.toLowerCase().includes(q) ||
          c.authorEmail?.toLowerCase().includes(q) ||
          c.blogTitle?.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  }, [blogComments, statusTab, commentType, searchQuery]);

  // Refresh comments list
  const refreshComments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/blogs/comments?all=true`);
      if (!res.ok) throw new Error('Failed to fetch comments');
      const data = await res.json();
      setComments(data);
    } catch (err) {
      alert('Failed to refresh comments: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Change single comment status
  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/blogs/comments`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error('Status update failed');
      setComments((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, status: newStatus, approved: newStatus === 'approved' } : c
        )
      );
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Apply Bulk Action
  const handleApplyBulkAction = async () => {
    if (!bulkAction) {
      alert('Please select an action from the dropdown.');
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

    // Status updates: 'unapprove' -> 'pending', 'approve' -> 'approved', 'spam' -> 'spam', 'trash' -> 'trash'
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

  // Save quick edit
  const handleSaveEdit = async (id, newText) => {
    try {
      const res = await fetch(`${apiBase}/api/blogs/comments`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, comment: newText }),
      });
      if (!res.ok) throw new Error('Failed to update comment');
      setComments((prev) =>
        prev.map((c) => (c._id === id ? { ...c, comment: newText, editedAt: new Date().toISOString() } : c))
      );
      setEditingComment(null);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Post Admin reply
  const handlePostReply = async (blogId, originalAuthor, replyText) => {
    try {
      const res = await fetch(`${apiBase}/api/blogs/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogId,
          authorName: 'admin',
          authorEmail: 'support@techsolutionor.com',
          comment: replyText,
          isAdmin: true,
          inReplyTo: originalAuthor,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to post reply');
      if (data.comment) {
        setComments((prev) => [data.comment, ...prev]);
      }
      setReplyingComment(null);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Checkbox handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(displayedComments.map((c) => c._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Filtered blogs for Blog List View
  const filteredBlogs = useMemo(() => {
    if (!blogSearch.trim()) return blogs;
    return blogs.filter((b) =>
      b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.category?.toLowerCase().includes(blogSearch.toLowerCase())
    );
  }, [blogs, blogSearch]);

  return (
    <div className="w-full">
      {/* Modals */}
      {editingComment && (
        <EditModal
          comment={editingComment}
          onClose={() => setEditingComment(null)}
          onSave={handleSaveEdit}
        />
      )}

      {replyingComment && (
        <ReplyModal
          comment={replyingComment}
          onClose={() => setReplyingComment(null)}
          onReply={handlePostReply}
        />
      )}

      {/* ========================================================================= */}
      {/* VIEW 1: BLOG LIST SCREEN (Choose Blog to View Comments) */}
      {/* ========================================================================= */}
      {!selectedBlog ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                BLOG COMMENTS
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Select a blog post below to manage, moderate, and filter its specific comments.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={refreshComments}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg border border-gray-300 transition-colors cursor-pointer"
              >
                <FaRedo className={loading ? 'animate-spin' : ''} />
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between gap-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={blogSearch}
                onChange={(e) => setBlogSearch(e.target.value)}
                placeholder="Search blog posts by title or category..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs text-gray-800 outline-none focus:border-[#41b349] focus:bg-white transition-all"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            </div>
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
              {filteredBlogs.length} {filteredBlogs.length === 1 ? 'Blog Post' : 'Blog Posts'} Available
            </span>
          </div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => {
              const stats = blogStats[blog._id.toString()] || { total: 0, pending: 0, approved: 0 };
              const coverImg = blog.coverImage || '/images/blogabout.png';

              return (
                <div
                  key={blog._id}
                  onClick={() => {
                    setSelectedBlog(blog);
                    setStatusTab('all');
                    setSelectedIds([]);
                    setSearchQuery('');
                  }}
                  className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs hover:shadow-lg hover:border-[#41b349] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-gray-100 mb-4">
                      <img
                        src={coverImg}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Category Pill */}
                      {blog.category && (
                        <span className="absolute top-3 left-3 bg-[#41b349] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                          {blog.category}
                        </span>
                      )}
                      {/* Status Tag */}
                      <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs ${
                        blog.published ? 'bg-black text-white' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </div>

                    {/* Blog Title */}
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#41b349] transition-colors line-clamp-2 leading-snug mb-3">
                      {blog.title}
                    </h3>
                  </div>

                  {/* Comment Stats Bar */}
                  <div className="pt-4 border-t border-gray-100 mt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#41b349]/10 text-[#41b349] flex items-center justify-center text-sm font-bold">
                          <FaComments />
                        </div>
                        <div>
                          <span className="text-sm font-extrabold text-gray-900 block">
                            {stats.total} {stats.total === 1 ? 'Comment' : 'Comments'}
                          </span>
                          {stats.pending > 0 ? (
                            <span className="text-[11px] font-bold text-amber-600">
                              {stats.pending} Pending Review
                            </span>
                          ) : (
                            <span className="text-[11px] text-gray-400">
                              {stats.approved} Approved
                            </span>
                          )}
                        </div>
                      </div>

                      <button className="px-3.5 py-1.5 bg-[#41b349] group-hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors shadow-xs">
                        View Comments →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* VIEW 2: SELECTED BLOG COMMENTS SCREEN (Exact Screenshot 2 & 3 Matching)   */
        /* ========================================================================= */
        <div className="space-y-4">
          {/* Back Button & Selected Blog Header */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedBlog(null);
                  setSelectedIds([]);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg border border-gray-300 transition-colors cursor-pointer"
              >
                <FaArrowLeft /> All Blogs
              </button>
              <div>
                <span className="text-[10px] font-bold text-[#41b349] uppercase tracking-wider block">
                  Managing Comments For:
                </span>
                <h2 className="text-lg font-bold text-gray-900 line-clamp-1 leading-snug">
                  {selectedBlog.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/blog/${selectedBlog.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs text-[#41b349] hover:underline font-semibold"
              >
                View Live Article <FaExternalLinkAlt size={10} />
              </Link>
            </div>
          </div>

          {/* Comment Status Filters Bar (Matching Screenshot 2 & 3) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
            {/* Status Tabs: All | Mine | Pending | Approved | Spam | Trash */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium flex-wrap text-blue-600">
              <button
                onClick={() => setStatusTab('all')}
                className={`cursor-pointer ${
                  statusTab === 'all' ? 'font-bold text-gray-900' : 'hover:underline'
                }`}
              >
                All ({currentTabCounts.all})
              </button>
              <span className="text-gray-300">|</span>

              <button
                onClick={() => setStatusTab('mine')}
                className={`cursor-pointer ${
                  statusTab === 'mine' ? 'font-bold text-gray-900' : 'hover:underline'
                }`}
              >
                Mine ({currentTabCounts.mine})
              </button>
              <span className="text-gray-300">|</span>

              <button
                onClick={() => setStatusTab('pending')}
                className={`cursor-pointer ${
                  statusTab === 'pending' ? 'font-bold text-gray-900' : 'hover:underline'
                }`}
              >
                Pending ({currentTabCounts.pending})
              </button>
              <span className="text-gray-300">|</span>

              <button
                onClick={() => setStatusTab('approved')}
                className={`cursor-pointer ${
                  statusTab === 'approved' ? 'font-bold text-gray-900' : 'hover:underline'
                }`}
              >
                Approved ({currentTabCounts.approved})
              </button>
              <span className="text-gray-300">|</span>

              <button
                onClick={() => setStatusTab('spam')}
                className={`cursor-pointer ${
                  statusTab === 'spam' ? 'font-bold text-gray-900' : 'hover:underline'
                }`}
              >
                Spam ({currentTabCounts.spam})
              </button>
              <span className="text-gray-300">|</span>

              <button
                onClick={() => setStatusTab('trash')}
                className={`cursor-pointer ${
                  statusTab === 'trash' ? 'font-bold text-gray-900' : 'hover:underline'
                }`}
              >
                Trash ({currentTabCounts.trash})
              </button>
            </div>

            {/* Search Box */}
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search comments..."
                className="bg-white border border-gray-300 rounded px-3 py-1 text-xs text-gray-800 outline-none focus:border-[#41b349]"
              />
              <button
                onClick={() => {}}
                className="border border-[#41b349] text-[#41b349] hover:bg-[#41b349] hover:text-white px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Search Comments
              </button>
            </div>
          </div>

          {/* Action Toolbar (Bulk actions & Filter by comment type) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Bulk Actions Dropdown */}
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="bg-white border border-gray-300 rounded px-2.5 py-1 text-xs text-gray-700 outline-none focus:border-[#41b349]"
              >
                <option value="">Bulk actions</option>
                <option value="approve">Approve</option>
                <option value="unapprove">Unapprove</option>
                <option value="spam">Mark as Spam</option>
                <option value="trash">Move to Trash</option>
                <option value="delete">Delete Permanently</option>
              </select>

              <button
                onClick={handleApplyBulkAction}
                disabled={loading || selectedIds.length === 0}
                className="border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                Apply
              </button>

              {/* Filter by comment type Dropdown */}
              <select
                value={commentType}
                onChange={(e) => setCommentType(e.target.value)}
                className="bg-white border border-gray-300 rounded px-2.5 py-1 text-xs text-gray-700 outline-none focus:border-[#41b349] ml-2"
              >
                <option value="all">All comment types</option>
                <option value="comments">Comments</option>
              </select>

              <button
                onClick={() => {}}
                className="border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Filter
              </button>
            </div>

            {/* Pagination count info */}
            <div className="text-xs text-gray-500 font-medium">
              {displayedComments.length} {displayedComments.length === 1 ? 'item' : 'items'}
            </div>
          </div>

          {/* Comments Table (Exact Screenshot 2 & 3 Matching) */}
          <div className="bg-white border border-gray-300 rounded overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-semibold">
                    <th className="p-3 w-8">
                      <input
                        type="checkbox"
                        checked={displayedComments.length > 0 && selectedIds.length === displayedComments.length}
                        onChange={handleSelectAll}
                        className="rounded text-[#41b349] focus:ring-[#41b349] cursor-pointer"
                      />
                    </th>
                    <th className="p-3 w-48 font-bold">Author</th>
                    <th className="p-3 font-bold">Comment</th>
                    <th className="p-3 w-56 font-bold">In response to</th>
                    <th className="p-3 w-44 font-bold">Submitted on</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {displayedComments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-gray-400">
                        <FaComments size={32} className="mx-auto mb-2 text-gray-300" />
                        <p className="font-semibold">No comments found for the selected filter.</p>
                      </td>
                    </tr>
                  ) : (
                    displayedComments.map((c) => {
                      const status = (c.status || (c.approved ? 'approved' : 'pending')).toLowerCase();
                      const isPending = status === 'pending';
                      const dt = formatDateTime(c.createdAt);
                      const isSelected = selectedIds.includes(c._id);

                      return (
                        <tr
                          key={c._id}
                          className={`transition-colors group align-top ${
                            isPending
                              ? 'bg-[#fefaf0] border-l-4 border-red-500'
                              : 'bg-white hover:bg-gray-50/70'
                          }`}
                        >
                          {/* Checkbox */}
                          <td className="p-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleSelect(c._id)}
                              className="rounded text-[#41b349] focus:ring-[#41b349] cursor-pointer"
                            />
                          </td>

                          {/* Author Column */}
                          <td className="p-3">
                            <div className="flex gap-2.5 items-start">
                              <div className="w-8 h-8 rounded bg-gray-200 text-gray-600 flex items-center justify-center shrink-0 font-bold text-xs">
                                {c.isMine || c.authorName?.toLowerCase() === 'admin' ? (
                                  <span className="text-[#41b349]">ADM</span>
                                ) : (
                                  <FaUser size={12} />
                                )}
                              </div>
                              <div className="min-w-0">
                                <span className="font-bold text-gray-900 block truncate">
                                  {c.authorName}
                                </span>
                                {c.authorEmail && (
                                  <a
                                    href={`mailto:${c.authorEmail}`}
                                    className="text-blue-600 hover:underline block truncate text-[11px]"
                                  >
                                    {c.authorEmail}
                                  </a>
                                )}
                                <span className="text-gray-400 block text-[10px] mt-0.5">
                                  {c.authorIp || '127.0.0.1'}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Comment Column */}
                          <td className="p-3">
                            {c.inReplyTo && (
                              <p className="text-[11px] text-blue-600 font-medium mb-1">
                                In reply to {c.inReplyTo}.
                              </p>
                            )}
                            <p className="text-gray-800 leading-relaxed text-xs break-words">
                              {c.comment}
                            </p>

                            {/* WordPress-style Hover Action Bar */}
                            <div className="mt-2.5 flex items-center gap-2 text-[11px] text-blue-600 font-medium flex-wrap opacity-90 group-hover:opacity-100">
                              {isPending ? (
                                <>
                                  <button
                                    onClick={() => handleStatusChange(c._id, 'approved')}
                                    className="hover:underline text-green-700 cursor-pointer font-bold"
                                  >
                                    Approve
                                  </button>
                                  <span className="text-gray-300">|</span>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleStatusChange(c._id, 'pending')}
                                    className="hover:underline text-amber-700 cursor-pointer"
                                  >
                                    Unapprove
                                  </button>
                                  <span className="text-gray-300">|</span>
                                </>
                              )}

                              <button
                                onClick={() => setReplyingComment(c)}
                                className="hover:underline cursor-pointer"
                              >
                                Reply
                              </button>
                              <span className="text-gray-300">|</span>

                              <button
                                onClick={() => setEditingComment(c)}
                                className="hover:underline cursor-pointer"
                              >
                                Quick Edit
                              </button>
                              <span className="text-gray-300">|</span>

                              {status === 'spam' ? (
                                <button
                                  onClick={() => handleStatusChange(c._id, 'pending')}
                                  className="hover:underline text-green-600 cursor-pointer"
                                >
                                  Not Spam
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleStatusChange(c._id, 'spam')}
                                  className="hover:underline text-red-600 cursor-pointer"
                                >
                                  Spam
                                </button>
                              )}
                              <span className="text-gray-300">|</span>

                              {status === 'trash' ? (
                                <button
                                  onClick={() => handleStatusChange(c._id, 'pending')}
                                  className="hover:underline text-green-600 cursor-pointer"
                                >
                                  Restore
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleStatusChange(c._id, 'trash')}
                                  className="hover:underline text-red-600 cursor-pointer"
                                >
                                  Trash
                                </button>
                              )}
                            </div>
                          </td>

                          {/* In response to Column */}
                          <td className="p-3">
                            <div className="space-y-1">
                              <Link
                                href={`/blog/${selectedBlog.slug}`}
                                target="_blank"
                                className="font-semibold text-blue-600 hover:underline line-clamp-2 leading-snug block"
                              >
                                {c.blogTitle || selectedBlog.title}
                              </Link>
                              <div className="flex items-center gap-2">
                                <Link
                                  href={`/blog/${selectedBlog.slug}`}
                                  target="_blank"
                                  className="text-gray-500 hover:text-black text-[11px] underline"
                                >
                                  View Post
                                </Link>
                                <span className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                  💬 {blogComments.length}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Submitted on Column */}
                          <td className="p-3 text-gray-600 whitespace-nowrap">
                            <div className="space-y-1">
                              <div>{dt.formatted}</div>
                              <div>
                                {status === 'approved' && (
                                  <span className="inline-block bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                    Approved
                                  </span>
                                )}
                                {status === 'pending' && (
                                  <span className="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                    Pending
                                  </span>
                                )}
                                {status === 'spam' && (
                                  <span className="inline-block bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                    Spam
                                  </span>
                                )}
                                {status === 'trash' && (
                                  <span className="inline-block bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded">
                                    Trash
                                  </span>
                                )}
                              </div>
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
        </div>
      )}
    </div>
  );
}

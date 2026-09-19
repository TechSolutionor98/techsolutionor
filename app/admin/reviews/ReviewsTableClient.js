"use client";
import React, { useState, useMemo, useEffect } from 'react';
import ReviewPopupForm from './ReviewPopupForm';
import { FaGoogle, FaStar, FaSyncAlt, FaCheck, FaEyeSlash, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import { Search, X, ChevronLeft, ChevronRight, CheckCheck } from 'lucide-react';

export default function ReviewsTableClient({ initialData = [], apiBase = '' }) {
  const [rows, setRows] = useState(initialData || []);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'approved' | 'hidden' | 'google'
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const baseUrl = apiBase || '';

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      refresh();
    }
  }, []);

  async function refresh() {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/reviews?all=true`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to refresh reviews:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSync() {
    try {
      setSyncing(true);
      setSyncStatusMsg(null);
      const res = await fetch(`${baseUrl}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync' }),
      });
      const data = await res.json();
      if (data?.success) {
        setSyncStatusMsg({
          type: 'success',
          text: data.cached
            ? 'Synced successfully (Google reviews cached within 30 min).'
            : `Synced successfully! ${data.count || 0} reviews updated from Google.`,
        });
      } else {
        setSyncStatusMsg({
          type: 'info',
          text: data?.reason || 'Sync completed. Add Google Place ID & API Key in Settings to pull live Google listing.',
        });
      }
      await refresh();
    } catch (err) {
      setSyncStatusMsg({ type: 'error', text: 'Google sync failed: ' + (err.message || err) });
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncStatusMsg(null), 6000);
    }
  }

  async function toggleApprove(id, currentApproved) {
    const nextApproved = !currentApproved;

    // Optimistic UI update: instantly toggle status in Admin panel & mark as read
    setRows((prev) =>
      prev.map((r) => (r._id === id ? { ...r, approved: nextApproved, isRead: true } : r))
    );

    try {
      const res = await fetch(`${baseUrl}/api/reviews`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, approve: nextApproved, isRead: true }),
      });
      const json = await res.json();
      if (!res.ok) {
        // Revert on error
        setRows((prev) =>
          prev.map((r) => (r._id === id ? { ...r, approved: currentApproved } : r))
        );
        alert('Failed to update status: ' + (json?.error || 'Unknown error'));
      } else {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('admin-notifications-refresh'));
        }
      }
    } catch (err) {
      // Revert on error
      setRows((prev) =>
        prev.map((r) => (r._id === id ? { ...r, approved: currentApproved } : r))
      );
      alert('Failed to update status: ' + (err.message || err));
    }
  }

  async function handleMarkRead(id) {
    setRows((prev) =>
      prev.map((r) => (r._id === id ? { ...r, isRead: true } : r))
    );
    try {
      await fetch(`${baseUrl}/api/reviews`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isRead: true }),
      });
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-notifications-refresh'));
      }
    } catch (err) {
      console.error('Failed to mark review read:', err);
    }
  }

  async function remove(id) {
    if (!confirm('Delete this review permanently? This cannot be undone.')) return;
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/reviews?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Delete failed');
      await refresh();
    } catch (err) {
      alert('Failed to delete: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkAllRead() {
    setRows(prev => prev.map(r => ({ ...r, isRead: true })));
    try {
      await fetch(`${baseUrl}/api/reviews`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAll: true })
      });
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-notifications-refresh'));
      }
    } catch (err) {
      console.error('Failed to mark all reviews read:', err);
    }
  }

  const counts = useMemo(() => {
    return {
      all: rows.length,
      unread: rows.filter((r) => !r.isRead).length,
      approved: rows.filter((r) => r.approved).length,
      hidden: rows.filter((r) => !r.approved).length,
      google: rows.filter((r) => r.source === 'Google' || r.googleReviewId).length,
    };
  }, [rows]);

  // Step 1 & 2: Tab filter + Real-time search filter
  const filtered = useMemo(() => {
    // 1. Tab filter
    const tabFiltered = rows.filter((r) => {
      if (activeTab === 'unread') return !r.isRead;
      if (activeTab === 'approved') return !!r.approved;
      if (activeTab === 'hidden') return !r.approved;
      if (activeTab === 'google') return r.source === 'Google' || !!r.googleReviewId;
      return true;
    });

    // 2. Real-time search filter
    if (!searchQuery.trim()) return tabFiltered;

    const q = searchQuery.trim().toLowerCase();
    return tabFiltered.filter((r) => {
      const name = (r.name || '').toLowerCase();
      const message = (r.message || r.comment || r.review || '').toLowerCase();
      const rawSource = (r.source || '').toLowerCase();
      const isGoogle = rawSource === 'google' || !!r.googleReviewId;

      // Source matching: matches 'google', 'custom', 'website' when user types at least 3 letters
      const matchesSource = isGoogle
        ? (q.length >= 3 && 'google'.startsWith(q))
        : (q.length >= 3 && ('custom'.startsWith(q) || 'website'.startsWith(q)));

      const company = (r.company || '').toLowerCase();
      const position = (r.position || '').toLowerCase();
      const ratingStr = String(r.rating || 5);

      return (
        name.includes(q) ||
        message.includes(q) ||
        matchesSource ||
        company.includes(q) ||
        position.includes(q) ||
        ratingStr === q
      );
    });
  }, [rows, activeTab, searchQuery]);

  // Step 3: Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  // Keep currentPage valid when search results shrink
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRows = filtered.slice(startIndex, startIndex + pageSize);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [];
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  }, [totalPages, currentPage]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setEditingReview(null);
              setShowPopup(true);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#34953C] hover:bg-[#2e8235] text-white text-sm font-semibold shadow-xs transition-all cursor-pointer"
          >
            <FaPlus size={12} />
            <span>Add Review</span>
          </button>

          <button
            onClick={handleGoogleSync}
            disabled={syncing}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1E293B] hover:bg-[#0F172A] text-white text-sm font-semibold shadow-xs transition-all cursor-pointer ${
              syncing ? 'opacity-60 cursor-not-allowed' : ''
            }`}
            title="Sync live reviews from Google Places API"
          >
            <FaGoogle size={12} className="text-amber-400" />
            <FaSyncAlt size={11} className={syncing ? 'animate-spin' : ''} />
            <span>{syncing ? 'Syncing...' : 'Sync from Google'}</span>
          </button>

          {counts.unread > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xs transition-all cursor-pointer"
              title="Mark all reviews as read"
            >
              <CheckCheck size={14} />
              <span>Mark All Read</span>
            </button>
          )}
          <button
            onClick={refresh}
            disabled={loading}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium transition-all cursor-pointer ${
              loading ? 'opacity-60' : ''
            }`}
          >
            <FaSyncAlt size={11} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
          <span className="font-semibold text-gray-900">Total: {counts.all}</span>
          <span>·</span>
          <span className="text-emerald-700 font-semibold">{counts.approved} Live on Website</span>
          {counts.hidden > 0 && (
            <>
              <span>·</span>
              <span className="text-amber-700 font-semibold">{counts.hidden} Hidden</span>
            </>
          )}
        </div>
      </div>

      {/* Sync Status Banner Notification */}
      {syncStatusMsg && (
        <div
          className={`mb-4 px-4 py-3 rounded-lg text-sm flex items-center justify-between transition-all ${
            syncStatusMsg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : syncStatusMsg.type === 'error'
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}
        >
          <span>{syncStatusMsg.text}</span>
          <button
            onClick={() => setSyncStatusMsg(null)}
            className="text-xs font-bold hover:underline ml-3 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 mb-4 overflow-x-auto pb-1">
        <button
          onClick={() => handleTabChange('all')}
          className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'border-b-2 border-[#34953C] text-[#34953C] bg-emerald-50/50'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          All Reviews ({counts.all})
        </button>

        <button
          onClick={() => handleTabChange('unread')}
          className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'unread'
              ? 'border-b-2 border-[#34953C] text-[#34953C] bg-emerald-50/50'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <span>Unread</span>
          {counts.unread > 0 && (
            <span className="px-1.5 py-0.2 bg-red-500 text-white rounded-full text-[10px] font-bold">
              {counts.unread}
            </span>
          )}
        </button>

        <button
          onClick={() => handleTabChange('approved')}
          className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-all cursor-pointer ${
            activeTab === 'approved'
              ? 'border-b-2 border-[#34953C] text-[#34953C] bg-emerald-50/50'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Approved / Live ({counts.approved})
        </button>

        <button
          onClick={() => handleTabChange('hidden')}
          className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-all cursor-pointer ${
            activeTab === 'hidden'
              ? 'border-b-2 border-[#34953C] text-[#34953C] bg-emerald-50/50'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Hidden / Pending ({counts.hidden})
        </button>

        <button
          onClick={() => handleTabChange('google')}
          className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-all cursor-pointer ${
            activeTab === 'google'
              ? 'border-b-2 border-[#34953C] text-[#34953C] bg-emerald-50/50'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Google Reviews ({counts.google})
        </button>
      </div>

      {/* Real-time Search Bar & Reviews-per-page Selector Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        {/* Real-time Search Input */}
        <div className="relative flex items-center w-full sm:w-80 md:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search name, comment, source (Google/Custom)..."
            className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm outline-none focus:border-[#34953C] focus:ring-1 focus:ring-[#34953C] transition-all bg-white placeholder:text-gray-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
              className="absolute right-2.5 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Reviews per page filter & count summary */}
        <div className="flex items-center justify-between sm:justify-end gap-3.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Reviews per page:</span>
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm outline-none focus:border-[#34953C] focus:ring-1 focus:ring-[#34953C] cursor-pointer bg-white font-semibold text-gray-700 shadow-2xs"
            >
              {[10, 25, 50, 100].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="text-gray-500 font-medium whitespace-nowrap hidden md:block">
            {filtered.length === 0 ? (
              '0 reviews'
            ) : (
              <>
                Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span>–
                <span className="font-semibold text-gray-900">
                  {Math.min(filtered.length, startIndex + pageSize)}
                </span>{' '}
                of <span className="font-semibold text-gray-900">{filtered.length}</span>
                {searchQuery && filtered.length !== rows.length ? ` (filtered)` : ''}
              </>
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <ReviewPopupForm
          apiBase={baseUrl}
          initialReview={editingReview}
          onClose={() => {
            setShowPopup(false);
            setEditingReview(null);
          }}
          onSuccess={refresh}
        />
      )}

      {/* Reviews Table */}
      <div className="overflow-x-auto w-full border border-gray-100 rounded-lg">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#34953C] text-white text-left">
              <th className="px-4 py-3 font-semibold">Reviewer</th>
              <th className="px-4 py-3 font-semibold">Source</th>
              <th className="px-4 py-3 font-semibold">Rating</th>
              <th className="px-4 py-3 font-semibold">Review Comment</th>
              <th className="px-4 py-3 font-semibold text-center">Status</th>
              <th className="px-4 py-3 font-semibold text-center w-[110px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedRows.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-500 text-sm">
                  {searchQuery
                    ? `No reviews found matching "${searchQuery}".`
                    : 'No reviews found in this view.'}
                </td>
              </tr>
            ) : (
              paginatedRows.map((r) => {
                const isGoogle = r.source === 'Google' || !!r.googleReviewId;
                const hasAvatar = Boolean(r.avatar && typeof r.avatar === 'string' && r.avatar.trim());
                const isUnread = !r.isRead;

                return (
                  <tr key={r._id} className={`hover:bg-[#f4fbf7] transition-all ${isUnread ? 'bg-emerald-50/40' : ''}`}>
                    {/* Reviewer info: exact reviewer image if provided; empty with initial circle if not */}
                    <td className="px-4 py-3.5 align-top">
                      <div className="flex items-center gap-2.5">
                        {hasAvatar ? (
                          <img
                            src={r.avatar}
                            alt={r.name}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              if (e.currentTarget.nextElementSibling) {
                                e.currentTarget.nextElementSibling.style.display = 'flex';
                              }
                            }}
                            className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-200 shadow-2xs"
                          />
                        ) : null}
                        <div
                          className={`w-8 h-8 rounded-full ${
                            r.color || 'bg-[#2B6DAA]'
                          } flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-2xs`}
                          style={{ display: hasAvatar ? 'none' : 'flex' }}
                        >
                          {r.initial || (r.name ? r.name.charAt(0).toUpperCase() : 'C')}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-gray-900">{r.name}</span>
                            {isUnread && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 text-[#2b7e32] border border-emerald-200 uppercase tracking-wider shrink-0">
                                NEW
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {r.company || r.position || r.time || 'Recently'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Source */}
                    <td className="px-4 py-3.5 align-top">
                      {isGoogle ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/60">
                          <FaGoogle size={11} className="text-blue-600" />
                          <span>Google</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                          Website
                        </span>
                      )}
                    </td>

                    {/* Rating */}
                    <td className="px-4 py-3.5 align-top whitespace-nowrap">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(Number(r.rating) || 5)].map((_, idx) => (
                          <FaStar key={idx} size={11} className="fill-amber-400" />
                        ))}
                        <span className="text-xs font-bold text-gray-700 ml-1">
                          {r.rating || 5}.0
                        </span>
                      </div>
                    </td>

                    {/* Comment */}
                    <td className="px-4 py-3.5 align-top max-w-md">
                      <p className="text-xs sm:text-sm text-gray-800 leading-relaxed break-words whitespace-pre-wrap">
                        {r.message}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5 align-top text-center whitespace-nowrap">
                      {r.approved ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                          <FaCheck size={10} />
                          <span>Live</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                          <FaEyeSlash size={10} />
                          <span>Hidden</span>
                        </span>
                      )}
                    </td>

                    {/* Actions Column: Vertically arranged, one per line (Top: Delete, Center: Edit, Bottom: Approve/Hide, Plus Mark Read) */}
                    <td className="px-4 py-3.5 align-top whitespace-nowrap">
                      <div className="flex flex-col items-stretch gap-1.5 w-[90px] mx-auto">
                        
                        {/* 1. Top: Delete */}
                        <button
                          type="button"
                          onClick={() => remove(r._id)}
                          className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all cursor-pointer w-full"
                          title="Permanently delete review"
                        >
                          <FaTrash size={10} />
                          <span>Delete</span>
                        </button>

                        {/* 2. Center: Edit */}
                        <button
                          type="button"
                          onClick={() => {
                            if (isUnread) handleMarkRead(r._id);
                            setEditingReview(r);
                            setShowPopup(true);
                          }}
                          className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer w-full"
                          title="Edit this review"
                        >
                          <FaEdit size={11} />
                          <span>Edit</span>
                        </button>

                        {/* 3. Bottom: Approve / Hide */}
                        {r.approved ? (
                          <button
                            type="button"
                            onClick={() => toggleApprove(r._id, true)}
                            className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-100 transition-all cursor-pointer w-full"
                            title="Hide this review from the public website"
                          >
                            <FaEyeSlash size={11} />
                            <span>Hide</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleApprove(r._id, false)}
                            className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-[#34953C] hover:bg-[#2e8235] text-white shadow-2xs transition-all cursor-pointer w-full"
                            title="Approve this review to show on the website"
                          >
                            <FaCheck size={11} />
                            <span>Approve</span>
                          </button>
                        )}

                        {/* 4. Quick Mark Read if unread */}
                        {isUnread && (
                          <button
                            type="button"
                            onClick={() => handleMarkRead(r._id)}
                            className="inline-flex items-center justify-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 transition-all cursor-pointer w-full"
                            title="Mark review as read"
                          >
                            <CheckCheck size={11} />
                            <span>Mark Read</span>
                          </button>
                        )}

                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {filtered.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500 font-medium order-2 sm:order-1">
            Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{' '}
            <span className="font-semibold text-gray-900">
              {Math.min(filtered.length, startIndex + pageSize)}
            </span>{' '}
            of <span className="font-semibold text-gray-900">{filtered.length}</span> reviews
            {searchQuery && (
              <span className="text-emerald-700 font-semibold ml-1.5">
                (filtered by &quot;{searchQuery}&quot;)
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 order-1 sm:order-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed bg-white hover:bg-gray-50 text-gray-700 transition cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {pageNumbers.map((page, idx) => {
                if (page === '...') {
                  return (
                    <span key={`ellipsis-${idx}`} className="px-1.5 text-xs text-gray-400 select-none">
                      ...
                    </span>
                  );
                }
                const isCurrent = page === currentPage;
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[32px] h-8 px-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                      isCurrent
                        ? 'bg-[#34953C] text-white shadow-2xs'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed bg-white hover:bg-gray-50 text-gray-700 transition cursor-pointer shadow-2xs"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Footer Guidelines note for Admin */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 gap-2">
        <p>
          💡 <strong>Moderation note:</strong> Only reviews with <span className="text-emerald-700 font-semibold">Live (Approved)</span> status appear on the Home page customer reviews rotation.
        </p>
        <p className="text-gray-400">
          Google reviews are displayed verbatim to comply with Google & FTC consumer transparency policies.
        </p>
      </div>

    </div>
  );
}


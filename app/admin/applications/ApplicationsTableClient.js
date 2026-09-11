"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  X, 
  Phone, 
  Mail, 
  Calendar, 
  Briefcase, 
  Globe, 
  Clock, 
  FileText, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Loader2,
  AlertCircle
} from 'lucide-react';

function getCvViewUrl(app) {
  if (!app) return '#';
  const appId = app.id || app._id;
  if (appId) {
    return `/api/applications/${appId}/cv`;
  }
  if (!app.cv) return '#';
  const trimmed = app.cv.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  if (trimmed.startsWith('/')) return trimmed;
  return `/${trimmed}`;
}

export default function ApplicationsTableClient({ initialData = [], apiBase = '' }) {
  const [rows, setRows] = useState(initialData || []);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [viewRow, setViewRow] = useState(null);
  const [statusNote, setStatusNote] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      refresh();
    }
  }, []);

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Sort latest first
  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db - da;
    });
  }, [rows]);

  // Tab counts
  const counts = useMemo(() => {
    const pendingCount = sorted.filter(r => (r.status || 'Pending').toLowerCase() === 'pending').length;
    const approvedCount = sorted.filter(r => (r.status || '').toLowerCase() === 'approved').length;
    const rejectedCount = sorted.filter(r => (r.status || '').toLowerCase() === 'rejected').length;
    return {
      all: sorted.length,
      pending: pendingCount,
      approved: approvedCount,
      rejected: rejectedCount,
    };
  }, [sorted]);

  const filtered = useMemo(() => {
    let result = sorted;

    // Filter by status tab
    if (statusFilter === 'pending') {
      result = result.filter(r => (r.status || 'Pending').toLowerCase() === 'pending');
    } else if (statusFilter === 'approved') {
      result = result.filter(r => (r.status || '').toLowerCase() === 'approved');
    } else if (statusFilter === 'rejected') {
      result = result.filter(r => (r.status || '').toLowerCase() === 'rejected');
    }

    // Filter by search query
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(r => (
        (r.name || '').toString().toLowerCase().includes(q) ||
        (r.email || '').toString().toLowerCase().includes(q) ||
        (r.phone || '').toString().toLowerCase().includes(q) ||
        (r.position || '').toString().toLowerCase().includes(q) ||
        (r.experience || '').toString().toLowerCase().includes(q) ||
        (r.portfolio || '').toString().toLowerCase().includes(q) ||
        (r.coverLetter || r.message || '').toString().toLowerCase().includes(q)
      ));
    }

    return result;
  }, [sorted, query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  async function refresh() {
    try {
      setLoading(true);
      const baseUrl = apiBase || '';
      const res = await fetch(`${baseUrl}/api/applications`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setRows(data);
      setPage(1);
    } catch (err) {
      console.error('Failed to refresh:', err);
      showToast('Failed to refresh: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(appId, newStatus, customNote = '') {
    if (!appId) return;
    const confirmText = newStatus === 'Approved'
      ? 'Are you sure you want to APPROVE this application? An automated congratulations & next steps email will be sent to the applicant.'
      : newStatus === 'Rejected'
      ? 'Are you sure you want to REJECT this application? An automated polite notification email will be sent to the applicant.'
      : `Reset status to ${newStatus}? An automated update email will be sent to the applicant.`;

    if (!window.confirm(confirmText)) {
      return;
    }

    try {
      setActionLoading(true);
      const res = await fetch(`/api/applications/${appId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, note: customNote }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to update status');

      setRows(prev => prev.map(item => {
        const itemId = item.id || item._id;
        if (itemId === appId) {
          return {
            ...item,
            status: newStatus,
            statusNote: customNote,
            updatedAt: new Date().toISOString(),
          };
        }
        return item;
      }));

      if (viewRow && (viewRow.id === appId || viewRow._id === appId)) {
        setViewRow(prev => ({
          ...prev,
          status: newStatus,
          statusNote: customNote,
        }));
      }

      setStatusNote('');
      showToast(
        `Application marked as ${newStatus}.${result.emailSent ? ' Candidate email notification sent successfully!' : ''}`,
        'success'
      );
    } catch (error) {
      console.error('Status update failed:', error);
      showToast(error.message || 'Failed to update application status.', 'error');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDeleteApplication(appId, candidateName = 'this candidate') {
    if (!appId) return;
    if (!window.confirm(`Are you sure you want to permanently delete the application of "${candidateName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setActionLoading(true);
      const res = await fetch(`/api/applications/${appId}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to delete application');

      setRows(prev => prev.filter(item => (item.id || item._id) !== appId));
      if (viewRow && (viewRow.id === appId || viewRow._id === appId)) {
        setViewRow(null);
      }
      showToast('Application deleted successfully.');
    } catch (error) {
      console.error('Delete failed:', error);
      showToast(error.message || 'Failed to delete application.', 'error');
    } finally {
      setActionLoading(false);
    }
  }

  function downloadCSV() {
    if (!rows || rows.length === 0) return alert('No data');
    const headers = ['#', 'Name', 'Email', 'Phone', 'Position', 'Experience', 'Status', 'Portfolio', 'Resume CV', 'Cover Letter', 'Submitted At'];
    const csv = [headers.join(',')].concat(rows.map((r, i) => {
      const vals = [
        i + 1,
        r.name,
        r.email,
        r.phone,
        r.position,
        r.experience || '',
        r.status || 'Pending',
        r.portfolio || '',
        r.cv || '',
        r.coverLetter || r.message || '',
        r.createdAt ? new Date(r.createdAt).toLocaleString() : ''
      ];
      return vals.map(v => {
        const s = ((v ?? '') + '').replace(/"/g, '""');
        return `"${s}"`;
      }).join(',');
    })).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `career_applications_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const getGlobalIndex = (pageIndex) => (page - 1) * pageSize + pageIndex + 1;

  const renderStatusBadge = (status) => {
    const st = (status || 'Pending').toLowerCase();
    if (st === 'approved') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
          Approved
        </span>
      );
    }
    if (st === 'rejected') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
          Rejected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
        Pending Review
      </span>
    );
  };

  return (
    <div className="w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-lg shadow-xl flex items-center gap-2.5 text-xs font-semibold transition-all duration-300 animate-in fade-in-50 slide-in-from-top-4 ${
          toastMessage.type === 'error' ? 'bg-red-600 text-white' : 'bg-[#34953C] text-white'
        }`}>
          {toastMessage.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Total Applications Header */}
      <p className="text-sm text-gray-600 mb-3 font-medium">
        <span className="font-bold text-gray-800">Total Applications:</span> {rows.length}
      </p>

      {/* Row 1: Status Filter Tabs on Left | Action Buttons on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
        {/* Status Filter Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-lg text-xs font-semibold">
          {[
            { key: 'all', label: 'All Applications', count: counts.all },
            { key: 'pending', label: 'Pending Review', count: counts.pending },
            { key: 'approved', label: 'Approved', count: counts.approved },
            { key: 'rejected', label: 'Rejected', count: counts.rejected },
          ].map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => { setStatusFilter(tab.key); setPage(1); }}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === tab.key
                  ? 'bg-white text-[#34953C] font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                statusFilter === tab.key ? 'bg-gray-100 text-[#34953C]' : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className={`px-3.5 py-1.5 rounded-lg bg-[#34953C] hover:bg-[#2b7e32] text-white font-semibold text-xs ${loading ? 'opacity-60' : ''} transition-all cursor-pointer`}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <button
            onClick={downloadCSV}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all cursor-pointer"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Row 2: Search Bar | Rows per page & Count on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
        {/* Search Bar */}
        <div className="relative flex items-center w-full sm:w-80 md:w-96">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 pointer-events-none" />
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search candidate, email, phone, position..."
            className="w-full pl-9 pr-8 py-1.5 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#34953C] focus:ring-1 focus:ring-[#34953C] transition-all bg-white"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setPage(1); }}
              className="absolute right-2.5 p-0.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Rows per page & Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Rows per page:</span>
            <select
              value={pageSize}
              onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="border border-gray-300 rounded-md px-2 py-1 text-xs outline-none focus:border-[#34953C] cursor-pointer bg-white"
            >
              {[10, 25, 50, 100].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="text-gray-500 font-medium whitespace-nowrap">
            Showing {filtered.length > 0 ? (page - 1) * pageSize + 1 : 0} - {Math.min(filtered.length, page * pageSize)} of {filtered.length} applications
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div style={{ overflowX: "auto", maxHeight: "620px", overflowY: "auto" }} className="w-full border border-gray-200 rounded-lg">
        <table style={{ whiteSpace: "nowrap" }} className="w-full text-xs text-left">
          <thead className="bg-[#34953C] text-white sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2.5 text-left font-semibold min-w-[220px]">Candidate</th>
              <th className="px-4 py-2.5 text-left font-semibold min-w-[160px]">Position Applied</th>
              <th className="px-4 py-2.5 text-left font-semibold max-w-[280px]">Cover Letter / Statement</th>
              <th className="px-4 py-2.5 text-left font-semibold w-32">Status</th>
              <th className="px-4 py-2.5 text-left font-semibold w-36">Submitted At</th>
              <th className="px-4 py-2.5 text-right font-semibold w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-400 font-medium">
                  No applications found matching the current filters.
                </td>
              </tr>
            ) : (
              pageData.map((app, idx) => {
                const appId = app.id || app._id;
                const dt = app.createdAt ? new Date(app.createdAt) : null;
                const formattedDate = dt ? dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
                const formattedTime = dt ? dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
                const initial = app.name ? app.name.trim().charAt(0).toUpperCase() : (app.email ? app.email.trim().charAt(0).toUpperCase() : 'C');

                return (
                  <tr key={appId ?? idx} className="hover:bg-gray-50/80 align-middle transition-all">
                    {/* 1. Candidate Column: Avatar circle on left, Name inline, Email on line below */}
                    <td className="px-4 py-2.5 text-left align-middle min-w-[220px]">
                      <div className="flex flex-col space-y-0.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                            {initial}
                          </div>
                          <span className="font-bold text-gray-900 text-xs break-words min-w-0 leading-tight">
                            {app.name || 'Anonymous'}
                          </span>
                        </div>

                        {app.email && (
                          <div className="text-[11px] text-gray-500 font-mono break-all leading-normal">
                            {app.email}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* 2. Position Applied & Experience */}
                    <td className="px-4 py-2.5 align-middle min-w-[160px]">
                      <div className="font-bold text-gray-900 text-xs leading-tight">
                        {app.position || '—'}
                      </div>
                      <div className="text-[11px] text-gray-500 leading-normal">
                        {app.experience || 'Experience not specified'}
                      </div>
                    </td>

                    {/* 3. Cover Letter / Statement Preview */}
                    <td className="px-4 py-2.5 align-middle text-gray-600 truncate max-w-[280px]" title={app.coverLetter || app.message}>
                      {app.coverLetter || app.message || '—'}
                    </td>

                    {/* 4. Status Badge */}
                    <td className="px-4 py-2.5 align-middle">
                      {renderStatusBadge(app.status)}
                    </td>

                    {/* 5. Submitted At */}
                    <td className="px-4 py-2.5 align-middle text-[11px] text-gray-500 whitespace-nowrap">
                      <div className="font-semibold text-gray-700 leading-tight">{formattedDate}</div>
                      <div className="text-gray-400 text-[10px] leading-tight">{formattedTime}</div>
                    </td>

                    {/* 6. Actions: View & View CV Buttons stacked */}
                    <td className="px-4 py-2.5 text-right align-middle whitespace-nowrap">
                      <div className="flex flex-col items-end gap-1.5 min-w-[80px]">
                        <button
                          type="button"
                          onClick={() => {
                            setViewRow({ ...app, appNo: getGlobalIndex(idx) });
                            setStatusNote(app.statusNote || '');
                          }}
                          className="w-20 px-2 py-1 bg-[#34953C] hover:bg-[#2b7e32] text-white text-[11px] font-bold rounded-md transition-all cursor-pointer text-center"
                        >
                          View
                        </button>
                        {app.cv ? (
                          <a
                            href={getCvViewUrl(app)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-20 inline-flex items-center justify-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md border border-blue-200 transition-all cursor-pointer text-center"
                            title="Open / Preview applicant's CV in new browser tab"
                          >
                            <FileText className="w-3 h-3 shrink-0" />
                            <span>View CV</span>
                          </a>
                        ) : (
                          <span
                            className="w-20 inline-flex items-center justify-center text-[10px] font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-200 text-center cursor-not-allowed select-none"
                            title="No CV uploaded"
                          >
                            No CV
                          </span>
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

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-xs text-gray-500">
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-3 py-1.5 border border-gray-300 rounded text-xs disabled:opacity-40 bg-white hover:bg-gray-100 transition cursor-pointer"
          >
            Previous
          </button>
          <div className="px-3 py-1.5 font-bold text-xs bg-gray-100 rounded text-gray-800">{page}</div>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 border border-gray-300 rounded text-xs disabled:opacity-40 bg-white hover:bg-gray-100 transition cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

      {/* View Detail Modal Popup */}
      {viewRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6" onClick={() => setViewRow(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[780px] max-h-[92vh] flex flex-col overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#34953C] px-6 sm:px-8 py-4.5 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center font-bold text-sm">
                  #{viewRow.appNo}
                </div>
                <div>
                  <h2 className="text-white text-base sm:text-lg font-bold leading-tight">
                    Application Details
                  </h2>
                  <p className="text-white/80 text-[11px] font-medium">
                    Candidate #{viewRow.appNo} &bull; {viewRow.position || 'Open Role'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-2xs ${
                  (viewRow.status || '').toLowerCase() === 'approved'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300/60'
                    : (viewRow.status || '').toLowerCase() === 'rejected'
                    ? 'bg-red-100 text-red-900 border border-red-300/60'
                    : 'bg-amber-100 text-amber-900 border border-amber-300/60'
                }`}>
                  {viewRow.status || 'Pending Review'}
                </span>
                <button
                  onClick={() => setViewRow(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white/90 hover:text-white transition-all cursor-pointer"
                  title="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 space-y-5 overflow-y-auto flex-1 text-left">
              {/* 1. Candidate Profile Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-gray-50/90 border border-gray-200/80">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl sm:text-2xl border-2 border-emerald-200/80 shrink-0">
                    {viewRow.name ? viewRow.name.trim().charAt(0).toUpperCase() : (viewRow.email ? viewRow.email.trim().charAt(0).toUpperCase() : 'C')}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug truncate">
                      {viewRow.name || 'Anonymous Candidate'}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                      {viewRow.email && (
                        <a
                          href={`mailto:${viewRow.email}`}
                          className="flex items-center gap-1.5 font-mono text-gray-600 hover:text-[#34953C] transition-colors"
                          title="Send email"
                        >
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <span className="truncate">{viewRow.email}</span>
                        </a>
                      )}
                      {viewRow.phone && (
                        <a
                          href={`tel:${viewRow.phone}`}
                          className="flex items-center gap-1.5 font-semibold text-gray-600 hover:text-[#34953C] transition-colors"
                          title="Call phone"
                        >
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <span>{viewRow.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {viewRow.cv && (
                    <a
                      href={getCvViewUrl(viewRow)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#20507C] hover:bg-[#163857] text-white rounded-lg text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                      title="Open / Preview applicant's CV in new browser tab"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View CV</span>
                    </a>
                  )}
                  {viewRow.email && (
                    <a
                      href={`mailto:${viewRow.email}`}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 shadow-2xs transition-all cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-gray-500" />
                      <span>Reply via Email</span>
                    </a>
                  )}
                </div>
              </div>

              {/* 2. Structured Key Info Grid */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
                  Application Specifications
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {/* Phone */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Phone Number</span>
                    </div>
                    {viewRow.phone ? (
                      <a href={`tel:${viewRow.phone}`} className="text-xs font-bold text-[#34953C] hover:underline truncate">
                        {viewRow.phone}
                      </a>
                    ) : (
                      <span className="text-xs font-semibold text-gray-400">—</span>
                    )}
                  </div>

                  {/* Position Applied */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#34953C]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Target Role</span>
                    </div>
                    <span className="text-xs font-bold text-gray-900 truncate">
                      {viewRow.position || '—'}
                    </span>
                  </div>

                  {/* Experience */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Experience Level</span>
                    </div>
                    <div>
                      {viewRow.experience ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200/80">
                          {viewRow.experience}
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-gray-400">—</span>
                      )}
                    </div>
                  </div>

                  {/* Portfolio Link */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <Globe className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Portfolio / Profile</span>
                    </div>
                    {viewRow.portfolio ? (
                      <a
                        href={viewRow.portfolio.startsWith('http') ? viewRow.portfolio : `https://${viewRow.portfolio}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-blue-600 hover:underline truncate"
                      >
                        {viewRow.portfolio}
                      </a>
                    ) : (
                      <span className="text-xs font-semibold text-gray-400">Not provided</span>
                    )}
                  </div>

                  {/* Current Status */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#34953C]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Application Status</span>
                    </div>
                    <div>
                      {renderStatusBadge(viewRow.status)}
                    </div>
                  </div>

                  {/* Submitted At */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Submitted At</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">
                      {viewRow.createdAt ? new Date(viewRow.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Cover Letter / Statement Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Candidate Statement / Cover Letter
                  </span>
                  {(viewRow.coverLetter || viewRow.message) && (
                    <span className="text-[11px] text-gray-400 font-medium">
                      {(viewRow.coverLetter || viewRow.message).length} characters
                    </span>
                  )}
                </div>
                <div className="bg-gray-50/90 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-gray-800 whitespace-pre-wrap break-words border border-gray-200/80 leading-relaxed min-h-[90px]">
                  {viewRow.coverLetter || viewRow.message || <span className="text-gray-400 italic">No statement provided with this application.</span>}
                </div>
              </div>

              {/* 4. Hiring Manager Feedback / Note Input */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Internal Feedback / Email Note <span className="text-gray-400 font-normal lowercase">(included in notification email)</span>:
                </label>
                <textarea
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="Optional custom feedback, interview schedule details, or notes to send to the candidate..."
                  rows={2}
                  className="w-full bg-white border border-gray-300 focus:border-[#34953C] rounded-lg p-2.5 text-xs outline-none transition-all"
                />
              </div>

              {/* 5. Recruitment Decision Actions */}
              <div className="pt-2 border-t border-gray-200 space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                  Application Decisions & Automated Email Dispatch
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    disabled={actionLoading || (viewRow.status || '').toLowerCase() === 'approved'}
                    onClick={() => handleStatusChange(viewRow.id || viewRow._id, 'Approved', statusNote)}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                    <span>{(viewRow.status || '').toLowerCase() === 'approved' ? 'Already Approved' : 'Approve & Send Welcome Email'}</span>
                  </button>

                  <button
                    type="button"
                    disabled={actionLoading || (viewRow.status || '').toLowerCase() === 'rejected'}
                    onClick={() => handleStatusChange(viewRow.id || viewRow._id, 'Rejected', statusNote)}
                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{(viewRow.status || '').toLowerCase() === 'rejected' ? 'Already Rejected' : 'Reject & Send Update Email'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs">
                  {(viewRow.status || '').toLowerCase() !== 'pending' ? (
                    <button
                      type="button"
                      disabled={actionLoading}
                      onClick={() => handleStatusChange(viewRow.id || viewRow._id, 'Pending', statusNote || '')}
                      className="text-gray-500 hover:text-gray-800 underline cursor-pointer"
                    >
                      Revert status to Pending Review & Send Update Email
                    </button>
                  ) : <span />}
                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={() => handleDeleteApplication(viewRow.id || viewRow._id, viewRow.name)}
                    className="text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Application</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 sm:px-8 py-3.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-gray-400 font-medium hidden sm:inline">
                Application #{viewRow.appNo} &bull; {viewRow.position || 'Open Role'}
              </span>
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                {viewRow.phone && (
                  <a
                    href={`tel:${viewRow.phone}`}
                    className="px-3.5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-gray-500" />
                    <span>Call</span>
                  </a>
                )}
                {viewRow.email && (
                  <a
                    href={`mailto:${viewRow.email}`}
                    className="px-3.5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-gray-500" />
                    <span>Email</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setViewRow(null)}
                  className="px-6 py-2 bg-[#34953C] hover:bg-[#2b7e32] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  X,
  Phone,
  Mail,
  DollarSign,
  Calendar,
  Briefcase,
  MapPin,
  Clock,
  CheckCheck,
  RefreshCw,
  Download,
  FileText,
  Trash2,
  Check,
  Copy,
  Users,
  Layers,
  MessageSquare,
  FileCheck,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Link2
} from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'Pending', label: 'Pending', color: 'bg-amber-100 text-amber-900 border-amber-300' },
  { value: 'Draft', label: 'Draft (Incomplete)', color: 'bg-orange-100 text-orange-900 border-orange-300' },
  { value: 'In Review', label: 'In Review', color: 'bg-blue-100 text-blue-900 border-blue-300' },
  { value: 'Contacted', label: 'Contacted', color: 'bg-purple-100 text-purple-900 border-purple-300' },
  { value: 'Proposal Sent', label: 'Proposal Sent', color: 'bg-indigo-100 text-indigo-900 border-indigo-300' },
  { value: 'Converted', label: 'Converted', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  { value: 'Archived', label: 'Archived', color: 'bg-gray-100 text-gray-800 border-gray-300' },
];

function getStatusBadge(status) {
  const found = STATUS_OPTIONS.find(s => s.value.toLowerCase() === (status || '').toLowerCase());
  return found || { value: status || 'Pending', label: status || 'Pending', color: 'bg-gray-100 text-gray-800 border-gray-300' };
}

export default function HireUsTableClient({ initialData = [], apiBase = process.env.NEXT_PUBLIC_API_URL || '' }) {
  const [rows, setRows] = useState(initialData || []);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [viewRow, setViewRow] = useState(null);

  // Status & Notes editing in modal
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  // Deletion state
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      refresh();
    }
  }, []);

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
    const unreadCount = sorted.filter(r => !r.isRead).length;
    const pendingCount = sorted.filter(r => (r.status || 'Pending').toLowerCase() === 'pending').length;
    const draftCount = sorted.filter(r => (r.status || '').toLowerCase() === 'draft').length;
    const inReviewCount = sorted.filter(r => (r.status || '').toLowerCase() === 'in review').length;
    const contactedCount = sorted.filter(r => (r.status || '').toLowerCase() === 'contacted').length;
    const convertedCount = sorted.filter(r => (r.status || '').toLowerCase() === 'converted').length;
    return {
      all: sorted.length,
      unread: unreadCount,
      pending: pendingCount,
      draft: draftCount,
      inReview: inReviewCount,
      contacted: contactedCount,
      converted: convertedCount,
    };
  }, [sorted]);

  const filtered = useMemo(() => {
    let result = sorted;

    // Filter by tab
    if (statusFilter === 'unread') {
      result = result.filter(r => !r.isRead);
    } else if (statusFilter !== 'all') {
      result = result.filter(r => (r.status || 'Pending').toLowerCase() === statusFilter.toLowerCase());
    }

    // Filter by search query across all active client-side fields
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(r => {
        const servicesStr = Array.isArray(r.services) ? r.services.join(' ') : (r.services || '');
        const filesStr = Array.isArray(r.attachedFilesList) ? r.attachedFilesList.map(f => f.name).join(' ') : '';
        const teamRolesStr = Array.isArray(r.existingTeamRoles) ? r.existingTeamRoles.join(' ') : '';
        const commMethodsStr = Array.isArray(r.communicationMethods) ? r.communicationMethods.join(' ') : '';
        const docTypesStr = Array.isArray(r.documentationTypes) ? r.documentationTypes.join(' ') : '';
        const referralStr = Array.isArray(r.referralSources) ? r.referralSources.join(' ') : '';

        const haystack = [
          r.name,
          r.fullName,
          r.email,
          r.phone,
          r.whatsapp,
          r.country,
          r.jobTitle,
          r.requirementType,
          servicesStr,
          r.otherService,
          r.resourceCount,
          r.exactResourceCount,
          r.experienceLevel,
          r.workArrangement,
          r.requiredLocation,
          r.city,
          r.timeZone,
          r.workingHours,
          r.workingDays,
          r.duration,
          r.budgetType,
          r.budget,
          r.hasInternalTeam,
          teamRolesStr,
          r.otherTeamRole,
          r.teamManager,
          r.meetingFrequency,
          commMethodsStr,
          r.hasDocumentation,
          docTypesStr,
          r.referenceLinks,
          r.preferredContactMethod,
          r.bestTimeToContact,
          referralStr,
          r.otherReferral,
          r.message,
          r.adminNotes,
          filesStr,
        ].filter(Boolean).join(' ').toLowerCase();

        return haystack.includes(q);
      });
    }

    return result;
  }, [sorted, query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const getGlobalIndex = (pageIndex) => (page - 1) * pageSize + pageIndex + 1;

  async function refresh() {
    try {
      setLoading(true);
      const baseUrl = apiBase || '';
      const res = await fetch(`${baseUrl}/api/hire-submissions`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
      setPage(1);
    } catch (err) {
      console.error('Failed to refresh hire submissions:', err);
      alert('Failed to refresh: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  function downloadCSV() {
    if (!rows || rows.length === 0) return alert('No data available to export');
    const headers = [
      '#',
      'Status',
      'Name',
      'Job Title',
      'Email',
      'Phone',
      'WhatsApp',
      'Country',
      'Requirement Type',
      'Resource Count',
      'Experience Level',
      'Services Required',
      'Other Requirement',
      'Work Arrangement',
      'Time Zone',
      'Location / City',
      'Working Hours',
      'Working Days',
      'Hours Per Day',
      'Hours Per Week',
      'Duration',
      'Start Date',
      'End Date',
      'Budget Type',
      'Budget',
      'Currency',
      'Internal Team',
      'Existing Team Roles',
      'Other Roles',
      'Team Manager',
      'Meeting Frequency',
      'Communication Methods',
      'Has Documentation',
      'Documentation Types',
      'Reference Links',
      'Preferred Contact Method',
      'Best Time to Contact',
      'Referral Source',
      'Other Referral',
      'Confirmed Accurate',
      'Consent to Contact',
      'Attached Files Count',
      'Admin Notes',
      'Submitted At'
    ];

    const csv = [headers.join(',')].concat(rows.map((r, i) => {
      const servicesStr = Array.isArray(r.services) ? r.services.join('; ') : (r.services || '');
      const filesCount = Array.isArray(r.attachedFilesList) ? r.attachedFilesList.length : 0;
      const teamRolesStr = Array.isArray(r.existingTeamRoles) ? r.existingTeamRoles.join('; ') : '';
      const commStr = Array.isArray(r.communicationMethods) ? r.communicationMethods.join('; ') : '';
      const docTypesStr = Array.isArray(r.documentationTypes) ? r.documentationTypes.join('; ') : '';
      const referralStr = Array.isArray(r.referralSources) ? r.referralSources.join('; ') : '';

      const vals = [
        i + 1,
        r.status || 'Pending',
        r.name || r.fullName || '',
        r.jobTitle || '',
        r.email || '',
        r.phone || '',
        r.whatsapp || '',
        r.country || '',
        r.requirementType || 'Dedicated Resource',
        `${r.resourceCount || '1'}${r.exactResourceCount ? ` (${r.exactResourceCount})` : ''}`,
        r.experienceLevel || '',
        servicesStr,
        r.otherService || '',
        r.workArrangement || 'Remote',
        r.timeZone || '',
        r.city || r.requiredLocation || '',
        r.workingHours || '',
        r.workingDays || '',
        r.hoursPerDay || '',
        r.hoursPerWeek || '',
        r.duration || '',
        r.startDate || '',
        r.endDate || '',
        r.budgetType || '',
        r.budget || `${r.currency || 'USD'} ${r.minBudget || '0'} - ${r.maxBudget || '0'}`,
        r.currency || 'USD',
        r.hasInternalTeam || '',
        teamRolesStr,
        r.otherTeamRole || '',
        r.teamManager || '',
        r.meetingFrequency || '',
        commStr,
        r.hasDocumentation || '',
        docTypesStr,
        r.referenceLinks || '',
        r.preferredContactMethod || '',
        r.bestTimeToContact || '',
        referralStr,
        r.otherReferral || '',
        r.confirmAccurate ? 'Yes' : 'No',
        r.confirmContact ? 'Yes' : 'No',
        filesCount,
        r.adminNotes || r.statusNote || '',
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
    a.download = `hire_us_submissions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function handleOpenView(row, idx) {
    const inquiryNo = getGlobalIndex(idx);
    setViewRow({ ...row, inquiryNo });
    setAdminNoteInput(row.adminNotes || row.statusNote || '');

    if (!row.isRead) {
      const targetId = row.id || row._id;
      setRows(prev => prev.map(r => ((r.id === targetId || r._id === targetId) ? { ...r, isRead: true } : r)));
      try {
        const baseUrl = apiBase || '';
        await fetch(`${baseUrl}/api/hire-submissions`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: targetId, isRead: true })
        });
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('admin-notifications-refresh'));
        }
      } catch (e) {
        console.error('Failed to mark read:', e);
      }
    }
  }

  async function handleMarkAllRead() {
    setRows(prev => prev.map(r => ({ ...r, isRead: true })));
    try {
      const baseUrl = apiBase || '';
      await fetch(`${baseUrl}/api/hire-submissions`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAll: true })
      });
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-notifications-refresh'));
      }
    } catch (e) {
      console.error('Failed to mark all read:', e);
    }
  }

  // Update Status
  const handleStatusChange = async (targetId, newStatus) => {
    setUpdatingStatusId(targetId);
    try {
      const baseUrl = apiBase || '';
      const res = await fetch(`${baseUrl}/api/hire-submissions`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: targetId,
          status: newStatus,
          note: `Status updated to ${newStatus} by admin`,
        }),
      });

      if (!res.ok) throw new Error('Status update failed');

      setRows(prev => prev.map(r => (r.id === targetId || r._id === targetId) ? { ...r, status: newStatus } : r));
      if (viewRow && (viewRow.id === targetId || viewRow._id === targetId)) {
        setViewRow(prev => ({
          ...prev,
          status: newStatus,
          statusHistory: [
            ...(prev.statusHistory || []),
            { status: newStatus, note: `Status updated to ${newStatus}`, changedAt: new Date().toISOString() }
          ]
        }));
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  // Save Internal Remarks
  const handleSaveAdminNotes = async (targetId) => {
    setIsSavingNotes(true);
    try {
      const baseUrl = apiBase || '';
      const res = await fetch(`${baseUrl}/api/hire-submissions`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: targetId,
          adminNotes: adminNoteInput,
        }),
      });

      if (!res.ok) throw new Error('Failed to save remarks');

      setRows(prev => prev.map(r => (r.id === targetId || r._id === targetId) ? { ...r, adminNotes: adminNoteInput } : r));
      if (viewRow && (viewRow.id === targetId || viewRow._id === targetId)) {
        setViewRow(prev => ({ ...prev, adminNotes: adminNoteInput }));
      }
      alert('Internal remarks saved successfully');
    } catch (err) {
      alert('Failed to save remarks: ' + err.message);
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Delete submission
  const confirmDelete = async () => {
    if (!deleteCandidate) return;
    const targetId = deleteCandidate.id || deleteCandidate._id;
    setIsDeleting(true);

    try {
      const baseUrl = apiBase || '';
      const res = await fetch(`${baseUrl}/api/hire-submissions?id=${targetId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete submission');

      setRows(prev => prev.filter(r => (r.id !== targetId && r._id !== targetId)));
      if (viewRow && (viewRow.id === targetId || viewRow._id === targetId)) {
        setViewRow(null);
      }
      setDeleteCandidate(null);
    } catch (err) {
      alert('Error deleting submission: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const copyToClipboard = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  return (
    <div className="w-full">
      {/* Total Submissions Header */}
      <p className="text-sm text-gray-600 mb-3 font-medium">
        <span className="font-bold text-gray-800">Total Submissions:</span> {rows.length}
      </p>

      {/* Row 1: Filter Tabs on Left | Action Buttons on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
        {/* Filter Tabs */}
        <div className="flex flex-wrap bg-gray-100 p-1 rounded-lg text-xs font-semibold gap-1">
          {[
            { key: 'all', label: 'All Submissions', count: counts.all },
            { key: 'unread', label: 'Unread', count: counts.unread, isHighlight: counts.unread > 0 },
            { key: 'Pending', label: 'Pending', count: counts.pending },
            { key: 'Draft', label: 'Drafts', count: counts.draft },
            { key: 'In Review', label: 'In Review', count: counts.inReview },
            { key: 'Contacted', label: 'Contacted', count: counts.contacted },
            { key: 'Converted', label: 'Converted', count: counts.converted },
          ].map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => { setStatusFilter(tab.key); setPage(1); }}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${statusFilter === tab.key
                  ? 'bg-white text-[#34953C] font-bold shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${tab.isHighlight
                  ? 'bg-red-500 text-white'
                  : statusFilter === tab.key
                    ? 'bg-gray-100 text-[#34953C]'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2">
          {counts.unread > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
              title="Mark all submissions as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark All Read</span>
            </button>
          )}
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

      {/* Row 2: Search Bar placed below filter buttons | Rows per page & Count on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
        {/* Search Bar */}
        <div className="relative flex items-center w-full sm:w-80 md:w-96">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 pointer-events-none" />
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search name, email, phone, role, service, budget..."
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
            Showing {Math.min(filtered.length, (page - 1) * pageSize + 1)} - {Math.min(filtered.length, page * pageSize)} of {filtered.length} submissions
          </div>
        </div>
      </div>

      {/* Submissions Table - matching Contact Submissions styling exactly */}
      <div style={{ overflowX: "auto", minHeight: "560px", maxHeight: "620px", overflowY: "auto" }} className="w-full border border-gray-200 rounded-lg bg-white">
        <table style={{ whiteSpace: "nowrap" }} className="w-full text-xs text-left">
          <thead className="bg-[#34953C] text-white sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2.5 text-left font-semibold min-w-[210px]">Client</th>
              <th className="px-4 py-2.5 text-left font-semibold min-w-[190px]">Resource & Model</th>
              <th className="px-4 py-2.5 text-left font-semibold min-w-[200px] max-w-[240px]">Services Requested</th>
              <th className="px-4 py-2.5 text-left font-semibold w-28">Status</th>
              <th className="px-4 py-2.5 text-left font-semibold w-36">Submitted At</th>
              <th className="px-4 py-2.5 text-right font-semibold w-20">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-28 text-center text-gray-400 font-medium">
                  No submissions found.
                </td>
              </tr>
            ) : (
              pageData.map((s, idx) => {
                const targetId = s.id ?? s._id ?? idx;
                const dt = s.createdAt ? new Date(s.createdAt) : null;
                const formattedDate = dt ? dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
                const formattedTime = dt ? dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
                const initial = s.name ? s.name.trim().charAt(0).toUpperCase() : (s.email ? s.email.trim().charAt(0).toUpperCase() : 'C');
                const isUnread = !s.isRead;
                const statusBadge = getStatusBadge(s.status);
                const servicesList = Array.isArray(s.services) ? s.services : [];

                return (
                  <tr
                    key={targetId}
                    className={`align-middle transition-all ${isUnread ? 'bg-green-50/50 hover:bg-green-50/80 font-medium' : 'hover:bg-gray-50/80'}`}
                  >
                    {/* 1. Client Column: Avatar on left, Name inline, Email & Job title on line below */}
                    <td className="px-4 py-2.5 text-left align-middle min-w-[210px]">
                      <div className="flex flex-col space-y-0.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 bg-emerald-100 text-[#2b7e32] border border-emerald-200 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                            {initial}
                          </div>
                          <span className={`text-xs break-words min-w-0 leading-tight ${isUnread ? 'font-extrabold text-gray-950' : 'font-bold text-gray-900'}`}>
                            {s.name || s.fullName || 'Anonymous Client'}
                          </span>
                          {isUnread && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 text-[#2b7e32] border border-emerald-200 uppercase tracking-wider shrink-0">
                              NEW
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] text-gray-500 flex items-center gap-1.5 truncate">
                          {s.email && <span className="font-mono text-gray-500 truncate max-w-[140px]">{s.email}</span>}
                          {s.country && <span className="text-gray-400">• {s.country}</span>}
                        </div>
                      </div>
                    </td>

                    {/* 2. Resource & Model Column */}
                    <td className="px-4 py-2.5 align-middle min-w-[190px]">
                      <div className="flex flex-col space-y-0.5">
                        <div className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-[#34953C] shrink-0" />
                          <span className="truncate max-w-[160px]">{s.requirementType || 'Dedicated Resource'}</span>
                        </div>
                        <div className="text-[11px] text-gray-600 flex items-center gap-1.5">
                          <span>
                            <strong>{s.resourceCount || '1'}</strong> {parseInt(s.resourceCount, 10) === 1 ? 'Resource' : 'Resources'}
                            {s.exactResourceCount ? ` (${s.exactResourceCount})` : ''}
                          </span>
                          {s.experienceLevel && <span className="text-gray-400">• {s.experienceLevel}</span>}
                        </div>
                      </div>
                    </td>

                    {/* 3. Services Requested Column (wrapped pills) */}
                    <td className="px-4 py-2.5 align-middle whitespace-normal min-w-[200px] max-w-[240px]">
                      <div className="flex flex-wrap gap-1 items-center">
                        {servicesList.length > 0 ? (
                          servicesList.slice(0, 2).map((srv, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 border border-gray-200 truncate max-w-[130px]"
                            >
                              {srv}
                            </span>
                          ))
                        ) : s.otherService ? (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 truncate">
                            {s.otherService}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs italic">—</span>
                        )}
                        {servicesList.length > 2 && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                            +{servicesList.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* 4. Status Badge Column */}
                    <td className="px-4 py-2.5 align-middle">
                      <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={s.status || 'Pending'}
                          disabled={updatingStatusId === targetId}
                          onChange={(e) => handleStatusChange(targetId, e.target.value)}
                          className={`text-[11px] font-bold uppercase tracking-wider py-1 pl-2.5 pr-6 rounded-full border cursor-pointer focus:outline-none ${statusBadge.color}`}
                        >
                          {STATUS_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </td>

                    {/* 7. Submitted At Column */}
                    <td className="px-4 py-2.5 align-middle text-[11px] text-gray-500 whitespace-nowrap">
                      <div className="font-semibold text-gray-700 leading-tight">{formattedDate}</div>
                      <div className="text-gray-400 text-[10px] leading-tight">{formattedTime}</div>
                    </td>

                    {/* 8. Action Column */}
                    <td className="px-4 py-2.5 text-right align-middle whitespace-nowrap">
                      <button
                        onClick={() => handleOpenView(s, idx)}
                        className="px-3 py-1 bg-[#34953C] hover:bg-[#2b7e32] text-white text-[11px] font-bold rounded-md transition cursor-pointer shadow-2xs"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - Matching Contact Submissions */}
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

      {/* View Detail Modal Popup - Structured like Contact Submissions Modal */}
      {viewRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6" onClick={() => setViewRow(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[820px] max-h-[92vh] flex flex-col overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#34953C] px-6 sm:px-8 py-4.5 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center font-bold text-sm">
                  #{viewRow.inquiryNo}
                </div>
                <div>
                  <h2 className="text-white text-base sm:text-lg font-bold leading-tight">
                    Hire Requirement Details
                  </h2>
                  <p className="text-white/80 text-[11px] font-medium">
                    Inquiry #{viewRow.inquiryNo} &bull; {viewRow.requirementType || 'Dedicated Resource'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-2xs ${getStatusBadge(viewRow.status).color}`}>
                  {viewRow.status || 'Pending'}
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

              {/* 1. Author / Client Profile Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-gray-50/90 border border-gray-200/80">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl sm:text-2xl border-2 border-emerald-200/80 shrink-0">
                    {viewRow.name ? viewRow.name.trim().charAt(0).toUpperCase() : (viewRow.email ? viewRow.email.trim().charAt(0).toUpperCase() : 'C')}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug truncate">
                      {viewRow.name || viewRow.fullName || 'Anonymous Client'}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                      {viewRow.jobTitle && (
                        <span className="font-semibold text-gray-700 flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                          <span>{viewRow.jobTitle}</span>
                        </span>
                      )}
                      {viewRow.country && (
                        <span className="flex items-center gap-1 text-gray-600">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span>{viewRow.country}</span>
                        </span>
                      )}
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
                      {viewRow.whatsapp && (
                        <a
                          href={`https://wa.me/${viewRow.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 font-semibold text-emerald-700 hover:underline"
                          title="WhatsApp chat"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{viewRow.whatsapp}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {viewRow.email && (
                    <a
                      href={`mailto:${viewRow.email}`}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 shadow-2xs transition-all cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-gray-500" />
                      <span>Reply via Email</span>
                    </a>
                  )}
                  {viewRow.whatsapp && (
                    <a
                      href={`https://wa.me/${viewRow.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-lg text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>

              {/* 2. Structured Key Info Grid (All Client Form Fields cleanly presented) */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
                  Client Talent Specifications
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

                  {/* Model & Headcount */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#34953C]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Requirement Model</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block truncate">
                        {viewRow.requirementType || 'Dedicated Resource'}
                      </span>
                      <span className="text-[11px] text-gray-500 mt-0.5 block">
                        Headcount: <strong>{viewRow.resourceCount || '1'}</strong> {viewRow.exactResourceCount ? `(Exact: ${viewRow.exactResourceCount})` : ''}
                      </span>
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Experience Required</span>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200/80">
                        {viewRow.experienceLevel || '3-5 Years'}
                      </span>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Estimated Budget</span>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                        {viewRow.budget || `${viewRow.currency || 'USD'} ${viewRow.minBudget || '0'} - ${viewRow.maxBudget || '0'}`}
                      </span>
                      {viewRow.budgetType && (
                        <span className="text-[10px] text-gray-500 block mt-0.5">{viewRow.budgetType}</span>
                      )}
                    </div>
                  </div>

                  {/* Work Arrangement */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Work Arrangement</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">
                        {viewRow.workArrangement || 'Remote'}
                      </span>
                      <span className="text-[11px] text-gray-500 truncate block mt-0.5">
                        Location: {viewRow.city || viewRow.requiredLocation || 'Remote / Office'}
                      </span>
                    </div>
                  </div>

                  {/* Time Zone */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Preferred Time Zone</span>
                    </div>
                    <span className="text-xs font-bold text-gray-900 truncate">
                      {viewRow.timeZone || 'Client Local Time'}
                    </span>
                  </div>

                  {/* Working Schedule */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Working Schedule</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block truncate">
                        {viewRow.workingHours || 'Full-Time (8h/day)'}
                      </span>
                      <span className="text-[11px] text-gray-500 block mt-0.5 truncate">
                        {viewRow.workingDays || 'Monday - Friday'} ({viewRow.hoursPerDay || '8'}h/d, {viewRow.hoursPerWeek || '40'}h/w)
                      </span>
                    </div>
                  </div>

                  {/* Engagement Duration */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Engagement Duration</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block truncate">
                        {viewRow.duration || 'Flexible'}
                      </span>
                      <span className="text-[10px] text-gray-500 block mt-0.5 truncate">
                        Start: {viewRow.startDate || 'Immediate'} &bull; End: {viewRow.endDate || 'Flexible'}
                      </span>
                    </div>
                  </div>

                  {/* Internal Team Setup */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Internal Team</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">
                        Has Team: {viewRow.hasInternalTeam || 'No'}
                      </span>
                      {Array.isArray(viewRow.existingTeamRoles) && viewRow.existingTeamRoles.length > 0 && (
                        <span className="text-[10px] text-gray-500 block mt-0.5 truncate" title={viewRow.existingTeamRoles.join(', ')}>
                          Roles: {viewRow.existingTeamRoles.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Management & Communication */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Management & Comm</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block truncate">
                        Manager: {viewRow.teamManager || 'Client'}
                      </span>
                      <span className="text-[10px] text-gray-500 block mt-0.5 truncate">
                        Meetings: {viewRow.meetingFrequency || 'Weekly Review'}
                      </span>
                    </div>
                  </div>

                  {/* Documentation & Specifications */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-[#34953C]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Available Documentation</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">
                        Has Documentation: {viewRow.hasDocumentation || 'No'}
                      </span>
                      {Array.isArray(viewRow.documentationTypes) && viewRow.documentationTypes.length > 0 && (
                        <span className="text-[10px] text-gray-500 block mt-0.5 truncate" title={viewRow.documentationTypes.join(', ')}>
                          Types: {viewRow.documentationTypes.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Preferred Contact Mode */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Preferred Contact</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">
                        {viewRow.preferredContactMethod || 'Email'}
                      </span>
                      <span className="text-[10px] text-gray-500 block mt-0.5">
                        Best Time: {viewRow.bestTimeToContact || 'Any Time'}
                      </span>
                    </div>
                  </div>

                  {/* Referral Source */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Found Us Via</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block truncate">
                        {Array.isArray(viewRow.referralSources) ? viewRow.referralSources.join(', ') : 'Direct'}
                        {viewRow.otherReferral ? ` (${viewRow.otherReferral})` : ''}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Services Requested Card */}
              <div className="p-4 sm:p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Layers className="w-4 h-4 text-[#34953C]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Requested Services & Talent Roles
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(viewRow.services) && viewRow.services.length > 0 ? (
                    viewRow.services.map((srv, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        {srv}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs italic">No specific service selected</span>
                  )}
                  {viewRow.otherService && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      Other: {viewRow.otherService}
                    </span>
                  )}
                </div>
              </div>

              {/* Reference Links & Attached Files (if any) */}
              {(viewRow.referenceLinks || (Array.isArray(viewRow.attachedFilesList) && viewRow.attachedFilesList.length > 0)) && (
                <div className="p-4 sm:p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-3">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <FileCheck className="w-4 h-4 text-[#34953C]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                      Documentation Links & Attachments
                    </span>
                  </div>

                  {viewRow.referenceLinks && (
                    <div className="text-xs">
                      <span className="text-gray-500 block mb-0.5">Reference Links:</span>
                      <a
                        href={viewRow.referenceLinks.startsWith('http') ? viewRow.referenceLinks : `https://${viewRow.referenceLinks}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center gap-1 font-semibold break-all"
                      >
                        <Link2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{viewRow.referenceLinks}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  )}

                  {Array.isArray(viewRow.attachedFilesList) && viewRow.attachedFilesList.length > 0 && (
                    <div>
                      <span className="text-gray-500 text-xs block mb-1.5">Attached Files ({viewRow.attachedFilesList.length}):</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {viewRow.attachedFilesList.map((file, fIdx) => (
                          <div key={fIdx} className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/70 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 truncate">
                              <FileText className="w-4 h-4 text-[#34953C] shrink-0" />
                              <div className="truncate">
                                <span className="font-semibold text-gray-800 block truncate">{file.name}</span>
                                {file.docType && <span className="text-[10px] text-gray-500">[{file.docType}]</span>}
                              </div>
                            </div>
                            {file.size && (
                              <span className="text-[10px] text-gray-400 shrink-0 ml-2">
                                {(file.size / 1024).toFixed(0)} KB
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3. Compiled Specifications Message Box (Matching Contact Submissions Message Box) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Compiled Requirement Summary
                  </span>
                  <div className="flex items-center gap-2">
                    {viewRow.message && (
                      <span className="text-[11px] text-gray-400 font-medium">
                        {viewRow.message.length} characters
                      </span>
                    )}
                    <button
                      onClick={() => copyToClipboard(viewRow.message, 'specMessage')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition cursor-pointer"
                    >
                      {copiedKey === 'specMessage' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50/90 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-gray-800 whitespace-pre-wrap break-words border border-gray-200/80 leading-relaxed font-mono min-h-[90px]">
                  {viewRow.message || <span className="text-gray-400 italic">No message summary compiled.</span>}
                </div>
              </div>

              {/* 4. Internal Admin Notes & Audit Trail */}
              <div className="p-4 sm:p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Admin Remarks & Status Notes
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-600">Update Status:</span>
                    <select
                      value={viewRow.status || 'Pending'}
                      disabled={updatingStatusId === (viewRow.id || viewRow._id)}
                      onChange={(e) => handleStatusChange(viewRow.id || viewRow._id, e.target.value)}
                      className={`text-xs font-bold uppercase tracking-wider py-1 px-2.5 rounded-md border cursor-pointer ${getStatusBadge(viewRow.status).color}`}
                    >
                      {STATUS_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <textarea
                  rows={3}
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  placeholder="Add internal remarks, client discussion summary, candidate matching progress..."
                  className="w-full p-3 text-xs text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-[#34953C] focus:ring-1 focus:ring-[#34953C]"
                />

                <div className="flex justify-end">
                  <button
                    onClick={() => handleSaveAdminNotes(viewRow.id || viewRow._id)}
                    disabled={isSavingNotes}
                    className="px-4 py-1.5 text-xs font-bold text-white bg-[#34953C] hover:bg-[#2b7e32] rounded-lg shadow-2xs transition cursor-pointer disabled:opacity-60"
                  >
                    {isSavingNotes ? 'Saving...' : 'Save Remarks'}
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer - Structured like Contact Submissions */}
            <div className="px-6 sm:px-8 py-3.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 font-medium hidden sm:inline">
                  Inquiry #{viewRow.inquiryNo} &bull; {viewRow.status || 'Pending'}
                </span>
                <button
                  onClick={() => setDeleteCandidate(viewRow)}
                  className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>

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

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setDeleteCandidate(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-base font-bold text-gray-900">Delete Hire Us Submission?</h3>
              <p className="text-xs text-gray-500 mt-1">
                Are you sure you want to permanently delete the requirement submitted by{' '}
                <strong className="text-gray-800">{deleteCandidate.name || deleteCandidate.fullName || 'this client'}</strong>?
                This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteCandidate(null)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition cursor-pointer disabled:opacity-60"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

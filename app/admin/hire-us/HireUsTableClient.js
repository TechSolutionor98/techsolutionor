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
  AlertCircle,
  ExternalLink,
  ChevronDown,
  CheckCheck,
  RefreshCw,
  Copy,
  Check,
  Building2,
  DollarSign,
  Users,
  Layers,
  MessageSquare,
  Eye,
  Filter,
  ArrowRight,
  Shield,
  FileCheck,
  Send,
  Sparkles
} from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'Pending', label: 'Pending / New', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { value: 'In Review', label: 'In Review', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { value: 'Contacted', label: 'Contacted', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { value: 'Proposal Sent', label: 'Proposal Sent', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { value: 'Converted', label: 'Converted / Hired', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { value: 'Archived', label: 'Archived / Closed', color: 'bg-gray-100 text-gray-700 border-gray-200' },
];

function getStatusBadge(status) {
  const found = STATUS_OPTIONS.find(s => s.value.toLowerCase() === (status || '').toLowerCase());
  return found || { value: status || 'Pending', label: status || 'Pending', color: 'bg-gray-50 text-gray-700 border-gray-200' };
}

function formatDate(isoStr) {
  if (!isoStr) return 'N/A';
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return isoStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (_) {
    return isoStr;
  }
}

function formatRelativeTime(isoStr) {
  if (!isoStr) return '';
  try {
    const d = new Date(isoStr);
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - d.getTime()) / 1000);
    if (diffSec < 60) return 'Just now';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch (_) {
    return '';
  }
}

export default function HireUsTableClient({ initialData = [], apiBase = '' }) {
  const [rows, setRows] = useState(initialData || []);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [viewRow, setViewRow] = useState(null);
  const [detailTab, setDetailTab] = useState('specs');
  
  // Status update states
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [statusNote, setStatusNote] = useState('');
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Deletion modal
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Copy helper
  const [copiedKey, setCopiedKey] = useState(null);

  // Toast alert
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      refresh();
    }
  }, []);

  async function refresh() {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/hire-submissions`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
      setPage(1);
    } catch (err) {
      console.error('Failed to fetch hire submissions:', err);
      showToast('Failed to refresh data: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  }

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
    const unread = sorted.filter(r => !r.isRead).length;
    const pending = sorted.filter(r => (r.status || 'Pending').toLowerCase() === 'pending').length;
    const inReview = sorted.filter(r => (r.status || '').toLowerCase() === 'in review').length;
    const contacted = sorted.filter(r => (r.status || '').toLowerCase() === 'contacted').length;
    const proposal = sorted.filter(r => (r.status || '').toLowerCase() === 'proposal sent').length;
    const converted = sorted.filter(r => (r.status || '').toLowerCase() === 'converted').length;
    const archived = sorted.filter(r => (r.status || '').toLowerCase() === 'archived').length;

    return {
      all: sorted.length,
      unread,
      pending,
      inReview,
      contacted,
      proposal,
      converted,
      archived,
    };
  }, [sorted]);

  // Unique Requirement Types for filter dropdown
  const uniqueTypes = useMemo(() => {
    const types = new Set();
    sorted.forEach(r => {
      if (r.requirementType) types.add(r.requirementType);
    });
    return Array.from(types);
  }, [sorted]);

  // Filtered rows
  const filtered = useMemo(() => {
    let result = sorted;

    // Filter by tab
    if (statusFilter === 'unread') {
      result = result.filter(r => !r.isRead);
    } else if (statusFilter !== 'all') {
      result = result.filter(r => (r.status || 'Pending').toLowerCase() === statusFilter.toLowerCase());
    }

    // Filter by requirement type
    if (typeFilter !== 'all') {
      result = result.filter(r => r.requirementType === typeFilter);
    }

    // Search query
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(r => {
        const servicesStr = Array.isArray(r.services) ? r.services.join(' ') : (r.services || '');
        const filesStr = Array.isArray(r.attachedFilesList) ? r.attachedFilesList.map(f => f.name).join(' ') : '';
        const haystack = [
          r.name,
          r.fullName,
          r.email,
          r.phone,
          r.whatsapp,
          r.country,
          r.organization,
          r.companyName,
          r.jobTitle,
          r.requirementType,
          servicesStr,
          r.otherService,
          r.experienceLevel,
          r.requiredSkills,
          r.projectName,
          r.projectType,
          r.workArrangement,
          r.budget,
          r.duration,
          r.message,
          r.adminNotes,
          filesStr,
        ].filter(Boolean).join(' ').toLowerCase();

        return haystack.includes(q);
      });
    }

    return result;
  }, [sorted, statusFilter, typeFilter, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Trigger sync of unread count badges in sidebar
  const notifySidebarRefresh = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('admin-notifications-refresh'));
    }
  };

  // Open view modal and mark as read
  async function handleOpenView(row) {
    setViewRow(row);
    setAdminNoteInput(row.adminNotes || row.statusNote || '');
    setDetailTab('specs');

    if (!row.isRead) {
      setRows(prev => prev.map(r => ((r.id === row.id || r._id === row._id) ? { ...r, isRead: true } : r)));
      try {
        await fetch(`${apiBase}/api/hire-submissions`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: row.id || row._id, isRead: true })
        });
        notifySidebarRefresh();
      } catch (err) {
        console.error('Failed to mark read:', err);
      }
    }
  }

  // Toggle Read / Unread
  async function handleToggleRead(row, e) {
    e?.stopPropagation?.();
    const newIsRead = !row.isRead;
    const targetId = row.id || row._id;

    setRows(prev => prev.map(r => ((r.id === targetId || r._id === targetId) ? { ...r, isRead: newIsRead } : r)));
    if (viewRow && (viewRow.id === targetId || viewRow._id === targetId)) {
      setViewRow(prev => ({ ...prev, isRead: newIsRead }));
    }

    try {
      const res = await fetch(`${apiBase}/api/hire-submissions`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: targetId, isRead: newIsRead })
      });
      if (!res.ok) throw new Error('Failed to update read state');
      notifySidebarRefresh();
      showToast(newIsRead ? 'Marked as read' : 'Marked as unread');
    } catch (err) {
      console.error(err);
      showToast('Failed to update read state', 'error');
    }
  }

  // Mark all as read
  async function handleMarkAllRead() {
    if (counts.unread === 0) return;
    setRows(prev => prev.map(r => ({ ...r, isRead: true })));
    try {
      const res = await fetch(`${apiBase}/api/hire-submissions`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAll: true })
      });
      if (!res.ok) throw new Error('Failed to mark all read');
      notifySidebarRefresh();
      showToast('All hire submissions marked as read');
    } catch (err) {
      console.error(err);
      showToast('Failed to mark all read', 'error');
    }
  }

  // Quick Status Change
  async function handleStatusChange(row, newStatus, customNote = '') {
    const targetId = row.id || row._id;
    setUpdatingStatusId(targetId);

    try {
      const res = await fetch(`${apiBase}/api/hire-submissions`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: targetId,
          status: newStatus,
          note: customNote || `Status updated to ${newStatus}`,
          isRead: true,
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');

      const updatedSub = data.submission || { ...row, status: newStatus, isRead: true };

      setRows(prev => prev.map(r => ((r.id === targetId || r._id === targetId) ? { ...r, ...updatedSub } : r)));
      if (viewRow && (viewRow.id === targetId || viewRow._id === targetId)) {
        setViewRow(prev => ({ ...prev, ...updatedSub }));
      }

      notifySidebarRefresh();
      showToast(`Status changed to ${newStatus}`);
    } catch (err) {
      console.error('Status change error:', err);
      showToast(`Failed to update status: ${err.message}`, 'error');
    } finally {
      setUpdatingStatusId(null);
    }
  }

  // Save Admin Notes
  async function handleSaveAdminNotes(row) {
    if (!row) return;
    const targetId = row.id || row._id;
    setIsSavingNotes(true);

    try {
      const res = await fetch(`${apiBase}/api/hire-submissions`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: targetId,
          adminNotes: adminNoteInput,
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save notes');

      setRows(prev => prev.map(r => ((r.id === targetId || r._id === targetId) ? { ...r, adminNotes: adminNoteInput } : r)));
      setViewRow(prev => ({ ...prev, adminNotes: adminNoteInput }));

      showToast('Internal notes saved successfully');
    } catch (err) {
      console.error(err);
      showToast('Failed to save notes: ' + err.message, 'error');
    } finally {
      setIsSavingNotes(false);
    }
  }

  // Delete submission
  async function confirmDelete() {
    if (!deleteCandidate) return;
    const targetId = deleteCandidate.id || deleteCandidate._id;
    setIsDeleting(true);

    try {
      const res = await fetch(`${apiBase}/api/hire-submissions?id=${targetId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');

      setRows(prev => prev.filter(r => r.id !== targetId && r._id !== targetId));
      if (viewRow && (viewRow.id === targetId || viewRow._id === targetId)) {
        setViewRow(null);
      }
      setDeleteCandidate(null);
      notifySidebarRefresh();
      showToast('Hire submission deleted permanently');
    } catch (err) {
      console.error(err);
      showToast('Failed to delete submission: ' + err.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  }

  // Copy helper
  const copyToClipboard = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Export to CSV
  function downloadCSV() {
    if (!rows || rows.length === 0) {
      return showToast('No data available to export', 'error');
    }

    const headers = [
      '#',
      'Status',
      'Full Name',
      'Email',
      'Phone',
      'WhatsApp',
      'Country',
      'Job Title',
      'Organization / Company',
      'Requirement Type',
      'Services / Roles',
      'Resource Count',
      'Experience Level',
      'Required Skills',
      'Key Responsibilities',
      'Deliverables',
      'Preferred Tools',
      'Project Name',
      'Project Type',
      'Project Status',
      'Work Arrangement',
      'Location / City',
      'Time Zone',
      'Working Hours',
      'Duration',
      'Start Date',
      'End Date',
      'Budget Type',
      'Budget Range',
      'Currency',
      'Documentation',
      'Internal Team',
      'Preferred Contact Method',
      'Best Time to Contact',
      'Referral Source',
      'Attached Files',
      'Admin Notes',
      'Submitted Date',
    ];

    const csvRows = [headers.join(',')];

    filtered.forEach((r, idx) => {
      const servicesStr = Array.isArray(r.services) ? r.services.join('; ') : (r.services || '');
      const filesStr = Array.isArray(r.attachedFilesList) ? r.attachedFilesList.map(f => f.name).join('; ') : '';
      const referralStr = Array.isArray(r.referralSources) ? r.referralSources.join('; ') : '';
      const budgetRange = `${r.currency || 'USD'} ${r.minBudget || '0'} - ${r.maxBudget || '0'}`;

      const rowData = [
        idx + 1,
        r.status || 'Pending',
        r.name || r.fullName || '',
        r.email || '',
        r.phone || '',
        r.whatsapp || '',
        r.country || '',
        r.jobTitle || '',
        r.organization || r.companyName || '',
        r.requirementType || 'Dedicated Resource',
        servicesStr,
        r.resourceCount || '1',
        r.experienceLevel || '',
        r.requiredSkills || '',
        r.keyResponsibilities || '',
        r.expectedDeliverables || '',
        r.preferredTools || '',
        r.projectName || '',
        r.projectType || '',
        r.projectStatus || '',
        r.workArrangement || 'Remote',
        `${r.city || ''} ${r.arrangementCountry || ''}`.trim(),
        r.timeZone || '',
        r.workingHours || '',
        r.duration || '',
        r.startDate || '',
        r.endDate || '',
        r.budgetType || '',
        r.budget || budgetRange,
        r.currency || 'USD',
        r.hasDocumentation || '',
        r.hasInternalTeam || '',
        r.preferredContactMethod || '',
        r.bestTimeToContact || '',
        referralStr,
        filesStr,
        r.adminNotes || r.statusNote || '',
        r.createdAt ? new Date(r.createdAt).toLocaleString() : '',
      ];

      const formattedLine = rowData.map(v => {
        const str = ((v ?? '') + '').replace(/"/g, '""');
        return `"${str}"`;
      }).join(',');

      csvRows.push(formattedLine);
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hire_us_submissions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    showToast('Submissions exported to CSV successfully');
  }

  return (
    <div className="space-y-6">

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all transform animate-in slide-in-from-bottom duration-300 ${
          toastMessage.type === 'error' 
            ? 'bg-red-50 text-red-800 border-red-200' 
            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
        }`}>
          {toastMessage.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-black/5 rounded-md ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. PAGE HEADER & PRIMARY ACTIONS                                          */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 uppercase tracking-tight">
              Hire Us Submissions
            </h1>
            {counts.unread > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white animate-pulse">
                {counts.unread} New
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Review, evaluate and manage all dedicated resource inquiries, developer team requests and client specifications.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {counts.unread > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-colors cursor-pointer"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mark All Read</span>
            </button>
          )}

          <button
            onClick={downloadCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-colors cursor-pointer"
            title="Export filtered records to CSV"
          >
            <Download className="w-3.5 h-3.5 text-gray-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={refresh}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#41B349] hover:bg-[#36963d] rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-60"
            title="Refresh submissions"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. STATS KPI OVERVIEW CARDS                                               */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <button
          onClick={() => { setStatusFilter('all'); setPage(1); }}
          className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
            statusFilter === 'all'
              ? 'bg-emerald-50/50 border-[#41B349] ring-2 ring-[#41B349]/20'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-1">
            <span>Total Intake</span>
            <Users className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{counts.all}</div>
          <div className="text-[11px] text-gray-400 mt-0.5">All submissions</div>
        </button>

        <button
          onClick={() => { setStatusFilter('unread'); setPage(1); }}
          className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
            statusFilter === 'unread'
              ? 'bg-amber-50/50 border-amber-500 ring-2 ring-amber-500/20'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-amber-700 font-medium mb-1">
            <span>Unread / New</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-700">{counts.unread}</div>
          <div className="text-[11px] text-amber-600 mt-0.5">Awaiting first review</div>
        </button>

        <button
          onClick={() => { setStatusFilter('Pending'); setPage(1); }}
          className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
            statusFilter === 'Pending'
              ? 'bg-amber-50/50 border-amber-500 ring-2 ring-amber-500/20'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-amber-700 font-medium mb-1">
            <span>Pending</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{counts.pending}</div>
          <div className="text-[11px] text-gray-400 mt-0.5">Needs action</div>
        </button>

        <button
          onClick={() => { setStatusFilter('In Review'); setPage(1); }}
          className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
            statusFilter === 'In Review'
              ? 'bg-blue-50/50 border-blue-500 ring-2 ring-blue-500/20'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-blue-700 font-medium mb-1">
            <span>In Review</span>
            <Eye className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{counts.inReview}</div>
          <div className="text-[11px] text-gray-400 mt-0.5">Under evaluation</div>
        </button>

        <button
          onClick={() => { setStatusFilter('Contacted'); setPage(1); }}
          className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
            statusFilter === 'Contacted'
              ? 'bg-purple-50/50 border-purple-500 ring-2 ring-purple-500/20'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-purple-700 font-medium mb-1">
            <span>Contacted</span>
            <MessageSquare className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{counts.contacted}</div>
          <div className="text-[11px] text-gray-400 mt-0.5">In communication</div>
        </button>

        <button
          onClick={() => { setStatusFilter('Converted'); setPage(1); }}
          className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
            statusFilter === 'Converted'
              ? 'bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-500/20'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-emerald-700 font-medium mb-1">
            <span>Converted</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-700">{counts.converted}</div>
          <div className="text-[11px] text-gray-400 mt-0.5">Client onboarded</div>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 3. SEARCH & FILTER TOOLBAR                                                */}
      {/* ========================================================================= */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search by client name, email, phone, role, company..."
            className="w-full pl-10 pr-9 py-2 text-sm text-gray-800 placeholder-gray-400 bg-gray-50/70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41B349]/30 focus:border-[#41B349] transition-all"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setPage(1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdowns / Filter selectors */}
        <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap sm:flex-nowrap justify-end">
          {/* Requirement Type Filter */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-xs text-gray-500 whitespace-nowrap">Model:</span>
            <select
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
              className="px-2.5 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41B349]/30 cursor-pointer"
            >
              <option value="all">All Engagement Models</option>
              {uniqueTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-xs text-gray-500 whitespace-nowrap">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="px-2.5 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41B349]/30 cursor-pointer"
            >
              <option value="all">All Statuses ({counts.all})</option>
              <option value="unread">Unread Only ({counts.unread})</option>
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. SUBMISSIONS DATA TABLE                                                 */}
      {/* ========================================================================= */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#41B349]" />
            <p className="text-sm">Loading Hire Us submissions...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-500 px-4">
            <div className="w-14 h-14 mx-auto mb-3.5 rounded-full bg-emerald-50 flex items-center justify-center text-[#41B349]">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-base font-semibold text-gray-800">No Hire Us Submissions Found</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              {query || statusFilter !== 'all' || typeFilter !== 'all'
                ? "Try clearing your search query or adjusting your filters to find what you're looking for."
                : "When prospective clients submit talent requirements via the Hire Us or Hire Resources form, they will automatically appear here."}
            </p>
            {(query || statusFilter !== 'all' || typeFilter !== 'all') && (
              <button
                onClick={() => { setQuery(''); setStatusFilter('all'); setTypeFilter('all'); }}
                className="mt-4 px-3.5 py-1.5 text-xs font-medium text-[#41B349] bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Client & Contact</th>
                  <th className="py-3 px-4">Engagement & Roles</th>
                  <th className="py-3 px-4">Scope & Arrangement</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Submitted</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {pageData.map((row, idx) => {
                  const globalIdx = (page - 1) * pageSize + idx + 1;
                  const isUnread = !row.isRead;
                  const statusBadge = getStatusBadge(row.status);
                  const servicesList = Array.isArray(row.services) ? row.services : [];
                  const filesCount = Array.isArray(row.attachedFilesList) ? row.attachedFilesList.length : 0;

                  return (
                    <tr
                      key={row.id || row._id || idx}
                      onClick={() => handleOpenView(row)}
                      className={`hover:bg-emerald-50/30 transition-colors cursor-pointer group ${
                        isUnread ? 'bg-amber-50/25 font-medium' : 'bg-white'
                      }`}
                    >
                      {/* Index / Unread dot */}
                      <td className="py-3.5 px-4 text-center text-xs text-gray-400 group-hover:text-gray-600">
                        <div className="flex items-center justify-center gap-1.5">
                          {isUnread && (
                            <span 
                              className="w-2 h-2 rounded-full bg-amber-500 shrink-0" 
                              title="Unread requirement" 
                            />
                          )}
                          <span>{globalIdx}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="relative inline-block">
                          <select
                            value={row.status || 'Pending'}
                            disabled={updatingStatusId === (row.id || row._id)}
                            onChange={(e) => handleStatusChange(row, e.target.value)}
                            className={`text-[11px] font-semibold uppercase tracking-wider py-1 pl-2.5 pr-6 rounded-full border cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500 ${statusBadge.color}`}
                          >
                            {STATUS_OPTIONS.map(opt => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>

                      {/* Client & Contact */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 group-hover:text-[#41B349] transition-colors">
                              {row.name || row.fullName || 'Anonymous'}
                            </span>
                            {row.country && (
                              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                                {row.country}
                              </span>
                            )}
                          </div>

                          {(row.organization || row.companyName || row.jobTitle) && (
                            <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                              <Building2 className="w-3 h-3 text-gray-400 shrink-0" />
                              <span className="truncate max-w-[180px]">
                                {[row.jobTitle, row.organization || row.companyName].filter(Boolean).join(' • ')}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1" onClick={(e) => e.stopPropagation()}>
                            {row.email && (
                              <a
                                href={`mailto:${row.email}`}
                                className="inline-flex items-center gap-1 hover:text-[#41B349] transition-colors"
                                title={`Email: ${row.email}`}
                              >
                                <Mail className="w-3 h-3 text-gray-400" />
                                <span className="truncate max-w-[140px]">{row.email}</span>
                              </a>
                            )}
                            {row.phone && (
                              <a
                                href={`tel:${row.phone}`}
                                className="inline-flex items-center gap-1 hover:text-[#41B349] transition-colors"
                                title={`Call: ${row.phone}`}
                              >
                                <Phone className="w-3 h-3 text-gray-400" />
                                <span>{row.phone}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Engagement & Roles */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col gap-1 max-w-[240px]">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-800">
                            <Briefcase className="w-3 h-3 text-[#41B349]" />
                            <span>{row.requirementType || 'Dedicated Resource'}</span>
                          </span>

                          {/* Services Tags */}
                          {servicesList.length > 0 ? (
                            <div className="flex flex-wrap gap-1 mt-0.5">
                              {servicesList.slice(0, 2).map((srv, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 border border-gray-200 truncate max-w-[150px]"
                                >
                                  {srv}
                                </span>
                              ))}
                              {servicesList.length > 2 && (
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  +{servicesList.length - 2} more
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400 italic">No specific service</span>
                          )}

                          {row.experienceLevel && (
                            <span className="text-[11px] text-gray-500">
                              Exp: <span className="font-medium text-gray-700">{row.experienceLevel}</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Scope & Arrangement */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col text-xs text-gray-600 gap-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-gray-900">
                              {row.resourceCount} {parseInt(row.resourceCount, 10) === 1 ? 'Resource' : 'Resources'}
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                              {row.workArrangement || 'Remote'}
                            </span>
                          </div>

                          {row.duration && (
                            <span className="text-[11px] text-gray-500">
                              Duration: <span className="text-gray-700 font-medium">{row.duration}</span>
                            </span>
                          )}

                          {filesCount > 0 && (
                            <div className="flex items-center gap-1 text-[11px] text-emerald-600 mt-0.5">
                              <FileCheck className="w-3 h-3" />
                              <span>{filesCount} {filesCount === 1 ? 'file' : 'files'} attached</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Budget */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col text-xs">
                          {row.budget ? (
                            <span className="font-semibold text-gray-900 truncate max-w-[130px]">
                              {row.budget}
                            </span>
                          ) : row.minBudget || row.maxBudget ? (
                            <span className="font-semibold text-gray-900">
                              {row.currency || 'USD'} {row.minBudget || '0'} - {row.maxBudget || '0'}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">Flexible</span>
                          )}
                          {row.budgetType && (
                            <span className="text-[11px] text-gray-500">{row.budgetType}</span>
                          )}
                        </div>
                      </td>

                      {/* Submitted Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex flex-col text-xs">
                          <span className="font-medium text-gray-900">
                            {formatRelativeTime(row.createdAt)}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            {row.createdAt ? new Date(row.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                          </span>
                        </div>
                      </td>

                      {/* Quick Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenView(row)}
                            className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                            title="View Full Specifications"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={(e) => handleToggleRead(row, e)}
                            className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                            title={isUnread ? "Mark as Read" : "Mark as Unread"}
                          >
                            <CheckCheck className={`w-4 h-4 ${isUnread ? 'text-amber-500' : 'text-gray-400'}`} />
                          </button>

                          <button
                            onClick={() => setDeleteCandidate(row)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Submission"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. TABLE PAGINATION FOOTER                                                */}
        {/* ========================================================================= */}
        {!loading && filtered.length > 0 && (
          <div className="p-3.5 sm:p-4 bg-gray-50/70 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span>Showing</span>
              <span className="font-semibold text-gray-900">
                {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, filtered.length)}
              </span>
              <span>of</span>
              <span className="font-semibold text-gray-900">{filtered.length}</span>
              <span>records</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span>Per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                  className="px-2 py-1 bg-white border border-gray-300 rounded text-xs focus:outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-2.5 py-1 bg-white border border-gray-300 rounded text-xs hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Prev
                </button>
                <span className="px-2 font-medium text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-2.5 py-1 bg-white border border-gray-300 rounded text-xs hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 6. FULL DETAILS DRAWER / MODAL                                            */}
      {/* ========================================================================= */}
      {viewRow && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-end animate-in fade-in duration-200">
          <div 
            className="w-full max-w-3xl h-full bg-white shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#41B349]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold">
                      {viewRow.name || viewRow.fullName || 'Requirement Details'}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white font-medium">
                      {viewRow.requirementType || 'Dedicated Resource'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Submitted on {formatDate(viewRow.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleRead(viewRow)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer flex items-center gap-1.5"
                  title="Toggle Read"
                >
                  <CheckCheck className={`w-3.5 h-3.5 ${viewRow.isRead ? 'text-emerald-400' : 'text-gray-300'}`} />
                  <span>{viewRow.isRead ? 'Read' : 'Mark Read'}</span>
                </button>
                <button
                  onClick={() => setViewRow(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Status Bar */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-600">Lead Status:</span>
                <select
                  value={viewRow.status || 'Pending'}
                  disabled={updatingStatusId === (viewRow.id || viewRow._id)}
                  onChange={(e) => handleStatusChange(viewRow, e.target.value)}
                  className={`text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full border cursor-pointer focus:outline-none ${getStatusBadge(viewRow.status).color}`}
                >
                  {STATUS_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Direct Communication Quick Links */}
              <div className="flex items-center gap-2">
                {viewRow.email && (
                  <a
                    href={`mailto:${viewRow.email}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-white border border-gray-300 text-gray-700 hover:text-[#41B349] hover:border-[#41B349] shadow-xs transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-gray-500" />
                    <span>Send Email</span>
                  </a>
                )}
                {viewRow.phone && (
                  <a
                    href={`tel:${viewRow.phone}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-white border border-gray-300 text-gray-700 hover:text-[#41B349] hover:border-[#41B349] shadow-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-gray-500" />
                    <span>Call</span>
                  </a>
                )}
                {viewRow.whatsapp && (
                  <a
                    href={`https://wa.me/${viewRow.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>

            {/* Modal Tabs */}
            <div className="px-6 bg-white border-b border-gray-200 flex items-center gap-4 text-xs font-semibold shrink-0">
              <button
                onClick={() => setDetailTab('specs')}
                className={`py-3 border-b-2 transition-all cursor-pointer ${
                  detailTab === 'specs' 
                    ? 'border-[#41B349] text-[#41B349]' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Requirement Specs
              </button>
              <button
                onClick={() => setDetailTab('client')}
                className={`py-3 border-b-2 transition-all cursor-pointer ${
                  detailTab === 'client' 
                    ? 'border-[#41B349] text-[#41B349]' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Client & Company
              </button>
              <button
                onClick={() => setDetailTab('project')}
                className={`py-3 border-b-2 transition-all cursor-pointer ${
                  detailTab === 'project' 
                    ? 'border-[#41B349] text-[#41B349]' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Project & Schedule
              </button>
              <button
                onClick={() => setDetailTab('notes')}
                className={`py-3 border-b-2 transition-all cursor-pointer ${
                  detailTab === 'notes' 
                    ? 'border-[#41B349] text-[#41B349]' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Admin Notes & History
              </button>
              <button
                onClick={() => setDetailTab('raw')}
                className={`py-3 border-b-2 transition-all cursor-pointer ${
                  detailTab === 'raw' 
                    ? 'border-[#41B349] text-[#41B349]' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Compiled Message
              </button>
            </div>

            {/* Modal Body / Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* TAB 1: REQUIREMENT SPECS */}
              {detailTab === 'specs' && (
                <div className="space-y-6">
                  {/* Overview Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold block mb-1">
                        Requirement Type
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {viewRow.requirementType || 'Dedicated Resource'}
                      </span>
                    </div>

                    <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold block mb-1">
                        Resource Count
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {viewRow.resourceCount} {viewRow.exactResourceCount ? `(Exact: ${viewRow.exactResourceCount})` : ''}
                      </span>
                    </div>

                    <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold block mb-1">
                        Experience Required
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {viewRow.experienceLevel || '3-5 Years'}
                      </span>
                    </div>
                  </div>

                  {/* Services Requested */}
                  <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-[#41B349]" />
                      Requested Roles & Services
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(viewRow.services) && viewRow.services.length > 0 ? (
                        viewRow.services.map((srv, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            {srv}
                          </span>
                        ))
                      ) : (
                        <p className="text-xs text-gray-400 italic">No services listed</p>
                      )}
                      {viewRow.otherService && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                          Other: {viewRow.otherService}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Skills & Responsibilities */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50/70 rounded-xl border border-gray-200">
                      <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Specific Skills Required
                      </h4>
                      <p className="text-xs text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {viewRow.requiredSkills || 'None specified by client'}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50/70 rounded-xl border border-gray-200">
                      <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Key Responsibilities
                      </h4>
                      <p className="text-xs text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {viewRow.keyResponsibilities || 'None specified by client'}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50/70 rounded-xl border border-gray-200">
                      <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Expected Deliverables
                      </h4>
                      <p className="text-xs text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {viewRow.expectedDeliverables || 'None specified by client'}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50/70 rounded-xl border border-gray-200">
                      <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Preferred Tools & Technologies
                      </h4>
                      <p className="text-xs text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {viewRow.preferredTools || 'None specified by client'}
                      </p>
                    </div>
                  </div>

                  {/* Attached Files List */}
                  {Array.isArray(viewRow.attachedFilesList) && viewRow.attachedFilesList.length > 0 && (
                    <div className="p-4 bg-white rounded-xl border border-gray-200">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-[#41B349]" />
                        Attached Files & Documents ({viewRow.attachedFilesList.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {viewRow.attachedFilesList.map((file, fIdx) => (
                          <div 
                            key={fIdx}
                            className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/60 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                              <span className="font-medium text-gray-800 truncate">{file.name}</span>
                            </div>
                            {file.size && (
                              <span className="text-[11px] text-gray-400 shrink-0 ml-2">
                                {(file.size / 1024).toFixed(0)} KB
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Special Requirements */}
                  {Array.isArray(viewRow.specialRequirements) && viewRow.specialRequirements.length > 0 && (
                    <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200">
                      <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-amber-600" />
                        Special Requirements & Governance
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {viewRow.specialRequirements.map((req, rIdx) => (
                          <span
                            key={rIdx}
                            className="text-xs px-2.5 py-1 rounded bg-white text-amber-800 border border-amber-300 font-medium"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: CLIENT & COMPANY */}
              {detailTab === 'client' && (
                <div className="space-y-6">
                  {/* Contact Info Card */}
                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#41B349]" />
                      Primary Contact Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-gray-400 block mb-0.5">Full Name</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 text-sm">{viewRow.name || viewRow.fullName || 'N/A'}</span>
                          <button
                            onClick={() => copyToClipboard(viewRow.name || viewRow.fullName, 'name')}
                            className="text-gray-400 hover:text-gray-600"
                            title="Copy Name"
                          >
                            {copiedKey === 'name' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-gray-400 block mb-0.5">Email Address</span>
                        <div className="flex items-center gap-2">
                          <a href={`mailto:${viewRow.email}`} className="font-semibold text-[#41B349] hover:underline">
                            {viewRow.email || 'N/A'}
                          </a>
                          <button
                            onClick={() => copyToClipboard(viewRow.email, 'email')}
                            className="text-gray-400 hover:text-gray-600"
                            title="Copy Email"
                          >
                            {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-gray-400 block mb-0.5">Phone Number</span>
                        <div className="flex items-center gap-2">
                          <a href={`tel:${viewRow.phone}`} className="font-semibold text-gray-900 hover:text-[#41B349]">
                            {viewRow.phone || 'N/A'}
                          </a>
                          <button
                            onClick={() => copyToClipboard(viewRow.phone, 'phone')}
                            className="text-gray-400 hover:text-gray-600"
                            title="Copy Phone"
                          >
                            {copiedKey === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-gray-400 block mb-0.5">WhatsApp</span>
                        <div className="flex items-center gap-2">
                          {viewRow.whatsapp ? (
                            <a 
                              href={`https://wa.me/${viewRow.whatsapp.replace(/[^0-9]/g, '')}`} 
                              target="_blank" 
                              rel="noreferrer"
                              className="font-semibold text-emerald-700 hover:underline"
                            >
                              {viewRow.whatsapp}
                            </a>
                          ) : (
                            <span className="text-gray-400">Not provided</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <span className="text-gray-400 block mb-0.5">Country / Location</span>
                        <span className="font-semibold text-gray-900">{viewRow.country || 'N/A'}</span>
                      </div>

                      <div>
                        <span className="text-gray-400 block mb-0.5">Job Title</span>
                        <span className="font-semibold text-gray-900">{viewRow.jobTitle || 'N/A'}</span>
                      </div>

                      <div>
                        <span className="text-gray-400 block mb-0.5">Preferred Contact Method</span>
                        <span className="font-semibold text-gray-900">{viewRow.preferredContactMethod || 'Email'}</span>
                      </div>

                      <div>
                        <span className="text-gray-400 block mb-0.5">Best Time To Contact</span>
                        <span className="font-semibold text-gray-900">{viewRow.bestTimeToContact || 'Anytime'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Company Info Card */}
                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-[#41B349]" />
                      Company / Organization Profile
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-gray-400 block mb-0.5">Company / Organization</span>
                        <span className="font-semibold text-gray-900 text-sm">
                          {viewRow.companyName || viewRow.organization || 'N/A'}
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-400 block mb-0.5">Industry Sector</span>
                        <span className="font-semibold text-gray-900">{viewRow.industry || 'N/A'}</span>
                      </div>

                      <div>
                        <span className="text-gray-400 block mb-0.5">Company Size</span>
                        <span className="font-semibold text-gray-900">{viewRow.companySize || 'N/A'}</span>
                      </div>

                      <div>
                        <span className="text-gray-400 block mb-0.5">Website URL</span>
                        {viewRow.companyWebsite ? (
                          <a 
                            href={viewRow.companyWebsite.startsWith('http') ? viewRow.companyWebsite : `https://${viewRow.companyWebsite}`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-[#41B349] hover:underline inline-flex items-center gap-1"
                          >
                            <span>{viewRow.companyWebsite}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-gray-400">Not provided</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Referral Source */}
                  {Array.isArray(viewRow.referralSources) && viewRow.referralSources.length > 0 && (
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                      <span className="text-gray-400 block mb-1">Found Us Via:</span>
                      <span className="font-semibold text-gray-800">
                        {viewRow.referralSources.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: PROJECT & SCHEDULE */}
              {detailTab === 'project' && (
                <div className="space-y-6">
                  {/* Project Details */}
                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-[#41B349]" />
                      Project Details & Stage
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-gray-400 block mb-0.5">Project Name</span>
                        <span className="font-semibold text-gray-900 text-sm">
                          {viewRow.projectName || 'Not specified'}
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-400 block mb-0.5">Project Type</span>
                        <span className="font-semibold text-gray-900">
                          {viewRow.projectType || 'General'}
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-400 block mb-0.5">Project Status / Stage</span>
                        <span className="font-semibold text-gray-900">
                          {viewRow.projectStatus || 'N/A'}
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-400 block mb-0.5">Project URL / Prototype</span>
                        {viewRow.projectUrl ? (
                          <a 
                            href={viewRow.projectUrl.startsWith('http') ? viewRow.projectUrl : `https://${viewRow.projectUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-[#41B349] hover:underline inline-flex items-center gap-1"
                          >
                            <span>{viewRow.projectUrl}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-gray-400">None</span>
                        )}
                      </div>
                    </div>

                    {viewRow.projectDescription && (
                      <div className="pt-2 border-t border-gray-100">
                        <span className="text-gray-400 text-xs block mb-1">Project Description / Scope</span>
                        <p className="text-xs text-gray-800 whitespace-pre-wrap leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
                          {viewRow.projectDescription}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Work Arrangement & Schedule */}
                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#41B349]" />
                      Working Arrangement & Schedule
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-400 block mb-0.5">Arrangement</span>
                        <span className="font-bold text-gray-900">{viewRow.workArrangement || 'Remote'}</span>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-400 block mb-0.5">Location / City</span>
                        <span className="font-bold text-gray-900">
                          {[viewRow.city, viewRow.arrangementCountry].filter(Boolean).join(', ') || 'Remote'}
                        </span>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-400 block mb-0.5">Time Zone</span>
                        <span className="font-bold text-gray-900">{viewRow.timeZone || 'Client Local'}</span>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-400 block mb-0.5">Working Hours</span>
                        <span className="font-bold text-gray-900">{viewRow.workingHours || 'Full-Time'}</span>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-400 block mb-0.5">Working Days</span>
                        <span className="font-bold text-gray-900">{viewRow.workingDays || 'Monday - Friday'}</span>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-400 block mb-0.5">Duration</span>
                        <span className="font-bold text-gray-900">{viewRow.duration || 'Flexible'}</span>
                      </div>
                    </div>

                    {(viewRow.startDate || viewRow.endDate) && (
                      <div className="text-xs text-gray-600 flex items-center gap-4 pt-1">
                        <span>Target Start: <strong className="text-gray-900">{viewRow.startDate || 'Immediate'}</strong></span>
                        <span>Target End: <strong className="text-gray-900">{viewRow.endDate || 'Flexible'}</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Budget Card */}
                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-[#41B349]" />
                      Estimated Budget & Model
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 gap-2">
                      <div>
                        <span className="text-xs text-emerald-800 font-medium block">
                          {viewRow.budgetType || 'Budget Model'}
                        </span>
                        <span className="text-xl font-bold text-gray-900">
                          {viewRow.budget || `${viewRow.currency || 'USD'} ${viewRow.minBudget || '0'} - ${viewRow.maxBudget || '0'}`}
                        </span>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white text-emerald-800 border border-emerald-300 self-start sm:self-auto">
                        Currency: {viewRow.currency || 'USD'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: ADMIN NOTES & HISTORY */}
              {detailTab === 'notes' && (
                <div className="space-y-6">
                  {/* Status History */}
                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#41B349]" />
                      Status Audit Trail & Timeline
                    </h3>

                    {Array.isArray(viewRow.statusHistory) && viewRow.statusHistory.length > 0 ? (
                      <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-gray-200">
                        {viewRow.statusHistory.map((item, idx) => (
                          <div key={idx} className="relative flex items-start gap-3 pl-7">
                            <span className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#41B349] ring-4 ring-white shrink-0" />
                            <div className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${getStatusBadge(item.status).color}`}>
                                  {item.status}
                                </span>
                                <span className="text-[11px] text-gray-400">
                                  {formatDate(item.changedAt)}
                                </span>
                              </div>
                              <p className="text-gray-700">{item.note || 'Status updated'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic">No previous status history logged.</p>
                    )}
                  </div>

                  {/* Internal Notes Editor */}
                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#41B349]" />
                      Internal Team Remarks & Notes
                    </h3>
                    <p className="text-xs text-gray-500">
                      Add private notes, candidate matching updates, proposal status, or client call summaries visible only to admins.
                    </p>
                    <textarea
                      rows={4}
                      value={adminNoteInput}
                      onChange={(e) => setAdminNoteInput(e.target.value)}
                      placeholder="e.g., Called client on Oct 5. Interested in hiring 2 Senior React devs for 6 months. Sent custom proposal."
                      className="w-full p-3 text-xs text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41B349]/30 focus:border-[#41B349]"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleSaveAdminNotes(viewRow)}
                        disabled={isSavingNotes}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#41B349] hover:bg-[#36963d] rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-60 flex items-center gap-1.5"
                      >
                        {isSavingNotes && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                        <span>{isSavingNotes ? 'Saving Notes...' : 'Save Internal Notes'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: RAW / COMPILED MESSAGE */}
              {detailTab === 'raw' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Full Compiled Specification
                    </h3>
                    <button
                      onClick={() => copyToClipboard(viewRow.message, 'rawMessage')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                    >
                      {copiedKey === 'rawMessage' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Message</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-4 bg-gray-900 text-gray-100 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed border border-gray-800">
                    {viewRow.message || 'No compiled message provided'}
                  </pre>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between shrink-0">
              <button
                onClick={() => setDeleteCandidate(viewRow)}
                className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Submission</span>
              </button>

              <button
                onClick={() => setViewRow(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer shadow-xs"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. DELETE CONFIRMATION MODAL                                              */}
      {/* ========================================================================= */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
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
                className="flex-1 px-4 py-2.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all cursor-pointer shadow-sm disabled:opacity-60 flex items-center justify-center gap-1.5"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{isDeleting ? 'Deleting...' : 'Yes, Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

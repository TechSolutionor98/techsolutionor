"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Mail,
  Search,
  RefreshCw,
  Send,
  Paperclip,
  Trash2,
  Archive,
  ChevronDown,
  ChevronUp,
  User,
  Clock,
  Briefcase,
  FileText,
  X,
  Download,
  Calendar,
  CheckCheck,
  Eye,
  ArrowUpDown,
  ExternalLink,
  Loader2,
  CornerUpLeft,
  Printer,
  Sparkles,
  Info,
  Check,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { PREBUILT_EMAIL_TEMPLATES, populateTemplate } from '@/lib/email-templates-catalog';
import { wrapWithTechSolutionorTemplate } from '@/lib/email-branded-template';

const STATUS_CONFIG = {
  open: { label: 'Open', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  under_review: { label: 'Under Review', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  interview_scheduled: { label: 'Interview', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  approved: { label: 'Approved', color: 'bg-green-50 text-green-700 border-green-200' },
  rejected: { label: 'Rejected', color: 'bg-red-50 text-red-700 border-red-200' },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-700 border-gray-200' },
  archived: { label: 'Archived', color: 'bg-gray-100 text-gray-500 border-gray-200' },
};

export default function EmailInboxClient() {
  const searchParams = useSearchParams();
  const urlThreadId = searchParams.get('threadId');

  // Threads & Table State
  const [threads, setThreads] = useState([]);
  const [counts, setCounts] = useState({ all: 0, unread: 0 });
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  // Selected Thread Detail Modal State
  const [viewThread, setViewThread] = useState(null);
  const [threadMessages, setThreadMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Gmail-style Reply Composer State inside Modal
  const [replyBody, setReplyBody] = useState('');
  const [replySubject, setReplySubject] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [statusUpdate, setStatusUpdate] = useState('');
  const [includeSignature, setIncludeSignature] = useState(true);
  const [sendingReply, setSendingReply] = useState(false);
  const [composerTab, setComposerTab] = useState('write'); // 'write' | 'preview'
  const [showQuotedContext, setShowQuotedContext] = useState(false);
  const [expandedHeaderId, setExpandedHeaderId] = useState(null);

  // Templates
  const [templates, setTemplates] = useState([]);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const messagesEndRef = useRef(null);
  const composerRef = useRef(null);
  const replyInputRef = useRef(null);

  // Initial load: fetch incoming threads and templates
  useEffect(() => {
    fetchThreads();
    fetchTemplates();
  }, [unreadOnly]);

  // Real-time automatic polling & event listener for instant incoming emails
  useEffect(() => {
    const handleNotificationRefresh = () => {
      fetchThreads(true);
    };
    window.addEventListener('admin-notifications-refresh', handleNotificationRefresh);

    // Poll every 30 seconds silently while tab is active
    const pollInterval = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        fetchThreads(true);
      }
    }, 30000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchThreads(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('admin-notifications-refresh', handleNotificationRefresh);
      clearInterval(pollInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [unreadOnly, query]);

  // Handle URL threadId query param
  useEffect(() => {
    if (urlThreadId) {
      handleOpenThreadModal(urlThreadId);
    }
  }, [urlThreadId]);

  // Auto-scroll messages in modal
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [threadMessages]);

  async function fetchThreads(isSilent = false, forceSync = false) {
    try {
      if (!isSilent) setLoading(true);
      if (forceSync) {
        try {
          await fetch('/api/emails/sync?limit=25');
        } catch (_) {}
      }
      const params = new URLSearchParams();
      if (unreadOnly) params.append('filter', 'unread');
      if (query.trim()) params.append('search', query.trim());
      params.append('limit', '100'); // Fetch enough for client-side sorting & pagination

      const res = await fetch(`/api/emails?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch emails');
      const data = await res.json();
      setThreads(data.threads || []);
      setCounts(data.counts || { all: 0, unread: 0 });
    } catch (err) {
      console.error('Failed to load email threads:', err);
    } finally {
      if (!isSilent) setLoading(false);
    }
  }

  async function fetchTemplates() {
    try {
      const res = await fetch('/api/emails/templates');
      if (!res.ok) return;
      const data = await res.json();
      setTemplates(data || []);
    } catch (err) {
      console.error('Failed to load email templates:', err);
    }
  }

  // Filtered and paginated rows
  const filteredThreads = useMemo(() => {
    let result = threads;

    if (unreadOnly) {
      result = result.filter(t => t.unreadByAdmin);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(t =>
        (t.applicant?.name || '').toLowerCase().includes(q) ||
        (t.applicant?.email || '').toLowerCase().includes(q) ||
        (t.subject || '').toLowerCase().includes(q) ||
        (t.lastSnippet || '').toLowerCase().includes(q) ||
        (t.mailbox || '').toLowerCase().includes(q)
      );
    }

    return result;
  }, [threads, query, unreadOnly]);

  const totalPages = Math.max(1, Math.ceil(filteredThreads.length / pageSize));
  const pageData = filteredThreads.slice((page - 1) * pageSize, page * pageSize);

  // Open Conversation Detail Modal
  async function handleOpenThreadModal(threadId) {
    try {
      setLoadingMessages(true);
      const res = await fetch(`/api/emails/${threadId}`);
      if (!res.ok) throw new Error('Failed to load thread conversation');
      const data = await res.json();

      setViewThread(data.thread);
      setThreadMessages(data.messages || []);
      setReplySubject(data.thread?.subject?.startsWith('Re:') ? data.thread.subject : `Re: ${data.thread?.subject || ''}`);
      setStatusUpdate(data.thread?.status || 'open');
      setReplyBody('');
      setSelectedTemplateId('');
      setComposerTab('write');
      setShowQuotedContext(false);
      setExpandedHeaderId(null);

      // Mark locally as read
      setThreads(prev =>
        prev.map(t => (t.threadId === threadId ? { ...t, unreadByAdmin: false } : t))
      );

      // Trigger admin bell count refresh
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-notifications-refresh'));
      }
    } catch (err) {
      console.error('Error opening thread:', err);
      alert('Failed to load conversation: ' + err.message);
    } finally {
      setLoadingMessages(false);
    }
  }

  // Pre-built template selection inside reply composer
  function handleSelectTemplate(tmplId) {
    setSelectedTemplateId(tmplId);
    if (!tmplId || !viewThread) return;

    // Check catalog or fetched templates
    const tmpl = PREBUILT_EMAIL_TEMPLATES.find(t => t.id === tmplId) ||
                 templates.find(t => t.id === tmplId);
    if (!tmpl) return;

    const populated = populateTemplate(tmpl, {
      candidateName: viewThread.applicant?.name || 'Applicant',
      senderName: 'Talent Acquisition Team',
      position: viewThread.subject || 'Open Position',
      companyName: 'Tech Solutionor',
      interviewDate: 'Upcoming business day (or your preferred time)',
      interviewLink: 'https://meet.google.com/techsolutionor',
    });

    // Populate editable reply text
    setReplyBody(populated.bodyText);

    // Populate subject
    if (populated.subject) {
      setReplySubject(populated.subject.startsWith('Re:') ? populated.subject : `Re: ${populated.subject}`);
    }

    // Auto set recommended status
    if (populated.recommendedStatus) {
      setStatusUpdate(populated.recommendedStatus);
    }
  }

  // Compute live branded HTML preview for the Tech Solutionor master template
  const previewBrandedHtml = useMemo(() => {
    if (!viewThread) return '';
    const bodyHtml = replyBody.trim()
      ? replyBody.split('\n\n').map(p => `<p style="margin: 0 0 16px; line-height: 1.6;">${p.replace(/\n/g, '<br/>')}</p>`).join('')
      : '<p style="color: #94a3b8; font-style: italic;">Start typing your reply or choose a pre-built template from the dropdown above to preview the branded email...</p>';

    return wrapWithTechSolutionorTemplate({
      contentHtml: bodyHtml,
      subject: replySubject || `Re: ${viewThread.subject || ''}`,
      recipientName: viewThread.applicant?.name || 'Recipient',
      includeSignature,
    });
  }, [replyBody, replySubject, viewThread, includeSignature]);

  // Jump to and focus reply composer
  function handleFocusComposer() {
    setComposerTab('write');
    composerRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      replyInputRef.current?.focus();
    }, 150);
  }

  // Send reply from inside the modal
  async function handleSendReply(e) {
    e?.preventDefault();
    if (!replyBody.trim()) return alert('Please write a message before sending.');
    if (!viewThread) return;

    try {
      setSendingReply(true);

      let finalBodyHtml = replyBody.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`).join('');

      // If quoted original context is enabled, include Gmail-style quoted block
      if (showQuotedContext && threadMessages.length > 0) {
        const originalMsg = threadMessages.find(m => m.direction === 'inbound') || threadMessages[0];
        const dateStr = originalMsg?.createdAt ? new Date(originalMsg.createdAt).toLocaleString() : '';
        const senderStr = `${originalMsg?.from?.name || viewThread.applicant?.name || 'Sender'} <${originalMsg?.from?.email || viewThread.applicant?.email || ''}>`;
        const snippetText = (originalMsg?.bodyText || viewThread.lastSnippet || '').replace(/\n/g, '<br/>');

        finalBodyHtml += `
          <br/><br/>
          <div style="border-left: 2px solid #cbd5e1; padding-left: 12px; margin-left: 4px; color: #64748b; font-size: 13px;">
            <p style="margin: 0 0 6px;">On ${dateStr}, ${senderStr} wrote:</p>
            <blockquote style="margin: 0; padding: 0;">${snippetText}</blockquote>
          </div>
        `;
      }

      const res = await fetch('/api/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          threadId: viewThread.threadId,
          to: viewThread.applicant.email,
          toName: viewThread.applicant.name,
          subject: replySubject || `Re: ${viewThread.subject}`,
          bodyText: replyBody,
          bodyHtml: finalBodyHtml,
          templateId: selectedTemplateId || null,
          statusUpdate,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to send reply');
      }

      setReplyBody('');
      setSelectedTemplateId('');
      setComposerTab('write');
      setShowQuotedContext(false);

      // Reload messages in the modal
      const convRes = await fetch(`/api/emails/${viewThread.threadId}`);
      if (convRes.ok) {
        const convData = await convRes.json();
        setThreadMessages(convData.messages || []);
        setViewThread(convData.thread);
      }

      await fetchThreads(true);
    } catch (err) {
      alert('Error sending reply: ' + err.message);
    } finally {
      setSendingReply(false);
    }
  }

  // Mark all emails as read
  async function handleMarkAllRead() {
    try {
      await fetch('/api/emails', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAllRead: true }),
      });
      setThreads(prev => prev.map(t => ({ ...t, unreadByAdmin: false })));
      setCounts(prev => ({ ...prev, unread: 0 }));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-notifications-refresh'));
      }
    } catch (err) {
      console.error('Failed to mark all read:', err);
    }
  }

  // Toggle single thread unread status
  async function handleToggleRead(thread, e) {
    e?.stopPropagation();
    const newUnread = !thread.unreadByAdmin;
    try {
      await fetch('/api/emails', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId: thread.threadId, unreadByAdmin: newUnread }),
      });
      setThreads(prev =>
        prev.map(t => (t.threadId === thread.threadId ? { ...t, unreadByAdmin: newUnread } : t))
      );
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-notifications-refresh'));
      }
    } catch (err) {
      console.error('Failed to toggle read:', err);
    }
  }

  // Update thread status directly from the table dropdown
  async function handleTableStatusChange(thread, newStatus) {
    if (!thread?.threadId) return;
    if (thread.status === newStatus) return;

    try {
      setUpdatingStatusId(thread.threadId);
      const res = await fetch('/api/emails', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId: thread.threadId, status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');

      setThreads(prev =>
        prev.map(t => (t.threadId === thread.threadId ? { ...t, status: newStatus } : t))
      );
      if (viewThread?.threadId === thread.threadId) {
        setViewThread(prev => ({ ...prev, status: newStatus }));
        setStatusUpdate(newStatus);
      }
    } catch (err) {
      console.error('Failed to update email thread status:', err);
      alert('Failed to update status: ' + err.message);
    } finally {
      setUpdatingStatusId(null);
    }
  }

  // Export CSV
  function downloadCSV() {
    if (!threads || threads.length === 0) return alert('No emails to export');
    const headers = ['#', 'Sender Name', 'Sender Email', 'Subject', 'Recipient Mailbox', 'Status', 'Messages', 'Last Activity'];
    const csv = [headers.join(',')].concat(threads.map((t, i) => {
      const vals = [
        i + 1,
        t.applicant?.name || 'Anonymous',
        t.applicant?.email || '',
        t.subject || '',
        t.mailbox || 'hr@techsolutionor.com',
        t.status || 'open',
        t.messageCount || 1,
        t.lastMessageAt ? new Date(t.lastMessageAt).toLocaleString() : ''
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
    a.download = 'incoming_email_inbox.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // Format date helper
  const formatDate = (isoStr) => {
    if (!isoStr) return '—';
    const dt = new Date(isoStr);
    return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };
  const formatTime = (isoStr) => {
    if (!isoStr) return '';
    const dt = new Date(isoStr);
    return dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full">
      {/* Total Emails Header */}
      <p className="text-sm text-gray-600 mb-3 font-medium">
        <span className="font-bold text-gray-800">Total Email Threads:</span> {threads.length}
      </p>

      {/* Row 1: Source Filter Tabs on Left | Global Action Buttons on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
        {/* Email Inbox Filter Tabs */}
        <div className="flex flex-wrap bg-gray-100 p-1 rounded-lg text-xs font-semibold gap-1">
          {[
            { key: 'all', label: 'All Emails', count: counts.all, onClick: () => { setUnreadOnly(false); setPage(1); } },
            { key: 'unread', label: 'Unread', count: counts.unread, isHighlight: counts.unread > 0, onClick: () => { setUnreadOnly(true); setPage(1); } },
          ].map(tab => {
            const isActive = tab.key === 'unread' ? unreadOnly : !unreadOnly;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={tab.onClick}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-[#34953C] font-bold shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  tab.isHighlight
                    ? 'bg-red-500 text-white'
                    : isActive
                    ? 'bg-gray-100 text-[#34953C]'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {counts.unread > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
              title="Mark all emails as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark All Read</span>
            </button>
          )}

          {/* Email Templates */}
          <button
            type="button"
            onClick={() => setShowTemplateModal(true)}
            className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-gray-500" />
            <span>Templates</span>
          </button>

          {/* Refresh Table */}
          <button
            type="button"
            onClick={() => fetchThreads(false, true)}
            className={`px-3 py-1.5 rounded-lg bg-[#34953C] hover:bg-[#2b7e32] text-white font-semibold text-xs ${loading ? 'opacity-60' : ''} transition-all cursor-pointer flex items-center gap-1`}
            title="Refresh email list"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          {/* Export CSV */}
          <button
            type="button"
            onClick={downloadCSV}
            className="px-3 py-1.5 rounded-lg bg-[#34953C] hover:bg-[#2b7e32] text-white font-semibold text-xs transition-all cursor-pointer shadow-xs"
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
            placeholder="Search sender, email, subject, keyword..."
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
            Showing {filteredThreads.length > 0 ? (page - 1) * pageSize + 1 : 0} - {Math.min(filteredThreads.length, page * pageSize)} of {filteredThreads.length} emails
          </div>
        </div>
      </div>


      {/* Main Email Inbox Table */}
      <div style={{ overflowX: "auto", minHeight: "560px", maxHeight: "620px", overflowY: "auto" }} className="w-full border border-gray-200 rounded-lg shadow-2xs bg-white">
        <table style={{ whiteSpace: "nowrap" }} className="w-full text-xs text-left">
          <thead className="bg-[#34953C] text-white sticky top-0 z-10">
            <tr>
              <th className="px-3.5 py-2.5 text-left font-semibold min-w-[190px]">Sender</th>
              <th className="px-3 py-2.5 text-left font-semibold min-w-[150px] max-w-[210px]">Subject</th>
              <th className="px-3 py-2.5 text-left font-semibold w-[160px] max-w-[175px]">Message Preview</th>
              <th className="px-3 py-2.5 text-center font-semibold w-[120px]">Status</th>
              <th className="px-3 py-2.5 text-left font-semibold w-28">Date & Time</th>
              <th className="px-3 py-2.5 text-right font-semibold w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-28 text-center text-gray-400 font-medium">
                  {loading ? 'Loading emails...' : 'No email conversations found matching current filters.'}
                </td>
              </tr>
            ) : (
              pageData.map((thread, idx) => {
                const isUnread = thread.unreadByAdmin;
                const initial = (thread.applicant?.name || 'A').trim().charAt(0).toUpperCase();
                const hasAttachment = thread.hasAttachments === true ||
                  thread.subject?.toLowerCase().includes('attached') ||
                  thread.subject?.toLowerCase().includes('attachment');

                return (
                  <tr
                    key={thread.threadId || thread.id || idx}
                    onClick={() => handleOpenThreadModal(thread.threadId)}
                    className={`align-middle transition-all cursor-pointer ${
                      isUnread
                        ? 'bg-green-50/50 hover:bg-green-50/80 font-medium'
                        : 'hover:bg-gray-50/80'
                    }`}
                  >
                    {/* 1. Sender Column: Avatar circle, Name on line 1 with NEW badge, Email on line 2 */}
                    <td className="px-3.5 py-2.5 text-left align-middle min-w-[190px]">
                      <div className="flex flex-col space-y-0.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            isUnread ? 'bg-[#34953C] text-white' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {initial}
                          </div>
                          <span className={`text-xs break-words min-w-0 leading-tight ${isUnread ? 'font-extrabold text-gray-950' : 'font-bold text-gray-900'}`}>
                            {thread.applicant?.name || 'Email Sender'}
                          </span>
                          {isUnread && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 text-[#2b7e32] border border-emerald-200 uppercase tracking-wider shrink-0">
                              NEW
                            </span>
                          )}
                        </div>

                        {thread.applicant?.email && (
                          <div className="text-[11px] text-gray-500 font-mono break-all leading-normal">
                            {thread.applicant.email}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* 2. Subject & Recipient Mailbox */}
                    <td className="px-3 py-2.5 align-middle min-w-[150px] max-w-[210px] truncate" title={thread.subject}>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className={`text-xs truncate leading-tight ${isUnread ? 'font-extrabold text-gray-950' : 'font-bold text-gray-900'}`}>
                          {thread.subject || 'No Subject'}
                        </span>
                        {thread.messageCount > 1 && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-gray-100 text-gray-600 shrink-0">
                            {thread.messageCount}
                          </span>
                        )}
                        {hasAttachment && (
                          <Paperclip className="w-3 h-3 text-gray-400 shrink-0" title="Has attachment" />
                        )}
                      </div>
                      <div className="text-[11px] text-gray-400 font-mono leading-normal truncate">
                        to: {thread.mailbox || 'hr@techsolutionor.com'}
                      </div>
                    </td>

                    {/* 3. Message Preview (wrapped up to 3 lines, narrower column) */}
                    <td className="px-3 py-2.5 align-middle w-[160px] max-w-[175px] whitespace-normal">
                      <div
                        className="text-gray-600 text-[11px] leading-relaxed break-words line-clamp-3"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                        title={thread.lastSnippet || thread.subject || ''}
                      >
                        {thread.lastSnippet || 'Click to view conversation...'}
                      </div>
                    </td>

                    {/* 4. Status Dropdown (Manageable directly from table) */}
                    <td className="px-3 py-2.5 text-center align-middle whitespace-nowrap w-[120px]" onClick={(e) => e.stopPropagation()}>
                      {(() => {
                        const rawStatus = thread.status || 'open';
                        const isUpdating = updatingStatusId === thread.threadId;
                        const stLower = rawStatus.toLowerCase();

                        const currentSelectValue =
                          (stLower === 'approved') ? 'approved' :
                          (stLower === 'rejected') ? 'rejected' :
                          (stLower === 'interview_scheduled' || stLower === 'interview') ? 'interview_scheduled' :
                          (stLower === 'under_review') ? 'under_review' :
                          (stLower === 'closed') ? 'closed' : 'open';

                        const statusBorderBg =
                          (stLower === 'approved' || stLower === 'open')
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100/70 focus:ring-1 focus:ring-emerald-400'
                            : stLower === 'rejected'
                            ? 'bg-red-50 text-red-800 border-red-300 hover:bg-red-100/70 focus:ring-1 focus:ring-red-400'
                            : (stLower === 'interview' || stLower === 'interview_scheduled')
                            ? 'bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100/70 focus:ring-1 focus:ring-blue-400'
                            : stLower === 'closed'
                            ? 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200/70 focus:ring-1 focus:ring-gray-400'
                            : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100/70 focus:ring-1 focus:ring-amber-400';

                        const chevronColor =
                          (stLower === 'approved' || stLower === 'open') ? 'text-emerald-600' :
                          stLower === 'rejected' ? 'text-red-600' :
                          (stLower === 'interview' || stLower === 'interview_scheduled') ? 'text-blue-600' :
                          stLower === 'closed' ? 'text-gray-500' :
                          'text-amber-600';

                        return (
                          <div className="relative inline-flex items-center">
                            <select
                              value={currentSelectValue}
                              disabled={isUpdating}
                              onChange={(e) => handleTableStatusChange(thread, e.target.value)}
                              className={`text-[11px] font-bold py-1 pl-2.5 pr-5 rounded-full border transition-all cursor-pointer outline-none appearance-none shadow-2xs max-w-[114px] truncate ${statusBorderBg} ${isUpdating ? 'opacity-60 cursor-wait' : ''}`}
                              title="Change email status"
                            >
                              <option value="open" className="bg-white text-emerald-700 font-semibold">Open</option>
                              <option value="under_review" className="bg-white text-amber-700 font-semibold">Pending Review</option>
                              <option value="interview_scheduled" className="bg-white text-blue-700 font-semibold">Interview</option>
                              <option value="approved" className="bg-white text-emerald-700 font-semibold">Approved</option>
                              <option value="rejected" className="bg-white text-red-700 font-semibold">Rejected</option>
                              <option value="closed" className="bg-white text-gray-700 font-semibold">Closed</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5">
                              {isUpdating ? (
                                <Loader2 className="w-3 h-3 animate-spin text-gray-500" />
                              ) : (
                                <ChevronDown className={`w-3 h-3 ${chevronColor}`} />
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </td>

                    {/* 5. Date & Time */}
                    <td className="px-3 py-2.5 align-middle text-[11px] text-gray-500 whitespace-nowrap w-28">
                      <div className="font-semibold text-gray-700 leading-tight">{formatDate(thread.lastMessageAt)}</div>
                      <div className="text-gray-400 text-[10px] leading-tight">{formatTime(thread.lastMessageAt)}</div>
                    </td>

                    {/* 6. Actions: View & Reply */}
                    <td className="px-3 py-2.5 text-right align-middle whitespace-nowrap w-32">
                      <div className="flex items-center justify-end" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleOpenThreadModal(thread.threadId)}
                          className="px-3.5 py-1.5 bg-[#34953C] hover:bg-[#2b7e32] text-white text-[11px] font-bold rounded-md transition-all cursor-pointer text-center shadow-2xs"
                        >
                          View & Reply
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

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
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

      {/* MODAL: Full Google/Gmail-Style Email Viewing & Reply Composer Experience */}
      {viewThread && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 md:p-6 backdrop-blur-2xs" onClick={() => setViewThread(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[920px] max-h-[94vh] flex flex-col overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Gmail-Style Top Header Bar */}
            <div className="bg-white border-b border-gray-200 px-5 sm:px-6 py-3.5 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#34953C] flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-100">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex items-center gap-2 flex-wrap">
                  <h2 className="text-gray-900 text-base sm:text-lg font-bold leading-tight truncate" title={viewThread.subject}>
                    {viewThread.subject || '(No Subject)'}
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                    Inbox
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34953C]"></span>
                    {viewThread.mailbox || 'hr@techsolutionor.com'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${STATUS_CONFIG[viewThread.status]?.color || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                  {STATUS_CONFIG[viewThread.status]?.label || viewThread.status}
                </span>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition cursor-pointer"
                  title="Print conversation"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewThread(null)}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 transition cursor-pointer"
                  title="Close conversation"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. Gmail-Style Message Conversation Scroll Area */}
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 bg-[#f6f8fc]">
              <div className="flex items-center justify-between gap-2 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Conversation Thread ({threadMessages.length} Messages)
                </span>
                <button
                  type="button"
                  onClick={handleFocusComposer}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#34953C] hover:text-[#23732a] transition cursor-pointer"
                >
                  <CornerUpLeft className="w-3.5 h-3.5" />
                  <span>Reply to this email</span>
                </button>
              </div>

              {loadingMessages ? (
                <div className="p-12 text-center text-xs text-gray-400 bg-white rounded-2xl border border-gray-200 shadow-2xs">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2.5 text-[#34953C]" />
                  Loading conversation history...
                </div>
              ) : threadMessages.length === 0 ? (
                <div className="p-8 text-center text-xs text-gray-400 bg-white rounded-2xl border border-gray-200">
                  No previous messages recorded in this conversation yet.
                </div>
              ) : (
                threadMessages.map((msg, idx) => {
                  const isInbound = msg.direction === 'inbound';
                  const senderInitial = (isInbound ? (msg.from?.name || viewThread.applicant?.name || 'A') : 'TS').charAt(0).toUpperCase();
                  const isHeaderExpanded = expandedHeaderId === (msg.id || idx);

                  return (
                    <div
                      key={msg.id || idx}
                      className={`rounded-2xl border p-5 shadow-2xs transition-all ${
                        isInbound
                          ? 'bg-white border-gray-200'
                          : 'bg-white border-emerald-200 border-l-4 border-l-[#34953C]'
                      }`}
                    >
                      {/* Gmail Message Card Top Header */}
                      <div className="flex items-start justify-between gap-3 pb-3 mb-3 border-b border-gray-100">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Avatar */}
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${
                              isInbound
                                ? 'bg-linear-to-br from-indigo-500 to-purple-600 text-white'
                                : 'bg-[#34953C] text-white'
                            }`}
                          >
                            {isInbound ? senderInitial : 'TS'}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                                {isInbound ? (msg.from?.name || viewThread.applicant?.name || 'Email Sender') : 'Tech Solutionor HR'}
                              </span>
                              <span className="text-[11px] font-mono text-gray-500 truncate">
                                {isInbound ? `<${msg.from?.email || viewThread.applicant?.email}>` : '<hr@techsolutionor.com>'}
                              </span>
                              {!isInbound && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  Official Reply
                                </span>
                              )}
                            </div>

                            {/* Collapsible 'to me / details' dropdown toggle */}
                            <div className="relative mt-0.5">
                              <button
                                type="button"
                                onClick={() => setExpandedHeaderId(isHeaderExpanded ? null : (msg.id || idx))}
                                className="inline-flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-700 cursor-pointer"
                              >
                                <span>{isInbound ? 'to me' : `to ${viewThread.applicant?.name || 'Recipient'}`}</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${isHeaderExpanded ? 'rotate-180' : ''}`} />
                              </button>

                              {/* Gmail Full Details Popover Box */}
                              {isHeaderExpanded && (
                                <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs space-y-1 font-sans text-gray-700 shadow-2xs max-w-md">
                                  <div><span className="font-semibold text-gray-900">from:</span> {isInbound ? (msg.from?.name || viewThread.applicant?.name) : 'Tech Solutionor HR'} &lt;{isInbound ? (msg.from?.email || viewThread.applicant?.email) : 'hr@techsolutionor.com'}&gt;</div>
                                  <div><span className="font-semibold text-gray-900">to:</span> {isInbound ? (viewThread.mailbox || 'hr@techsolutionor.com') : `${viewThread.applicant?.name} <${viewThread.applicant?.email}>`}</div>
                                  <div><span className="font-semibold text-gray-900">date:</span> {new Date(msg.createdAt).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                                  <div><span className="font-semibold text-gray-900">subject:</span> {viewThread.subject}</div>
                                  <div><span className="font-semibold text-gray-900">security:</span> Standard TLS Encryption</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right: Date and Quick Reply Action */}
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[11px] text-gray-500 font-medium whitespace-nowrap">
                            {formatDate(msg.createdAt)} {formatTime(msg.createdAt)}
                          </span>
                          <button
                            type="button"
                            onClick={handleFocusComposer}
                            className="p-1.5 text-gray-400 hover:text-[#34953C] hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                            title="Reply to message"
                          >
                            <CornerUpLeft className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Message Content Body */}
                      <div
                        className="text-xs sm:text-sm text-gray-800 leading-relaxed space-y-2.5 break-words font-sans selection:bg-emerald-100"
                        dangerouslySetInnerHTML={{ __html: msg.bodyHtml || `<p>${(msg.bodyText || '').replace(/\n/g, '<br/>')}</p>` }}
                      />

                      {/* Gmail Style Attachment Cards */}
                      {Array.isArray(msg.attachments) && msg.attachments.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                            Attachments ({msg.attachments.length})
                          </span>
                          <div className="flex flex-wrap gap-2.5">
                            {msg.attachments.map((att, i) => (
                              <a
                                key={i}
                                href={att.fileUrl || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50/80 hover:bg-white text-xs font-semibold text-gray-800 shadow-2xs transition group"
                              >
                                <div className="w-6 h-6 rounded-md bg-emerald-100 text-[#34953C] flex items-center justify-center shrink-0">
                                  <Paperclip className="w-3.5 h-3.5" />
                                </div>
                                <div className="truncate max-w-[200px]">
                                  <div className="truncate text-gray-900 group-hover:text-[#34953C]">{att.fileName || 'Attachment'}</div>
                                  <div className="text-[10px] text-gray-400 font-normal">{att.contentType || 'File'}</div>
                                </div>
                                <Download className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#34953C] ml-1" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />

              {/* 3. Google/Gmail-Style Inline Reply Composer */}
              <div ref={composerRef} className="bg-white rounded-2xl border border-gray-300 shadow-md overflow-hidden transition-all mt-5">
                {/* Composer Header Bar */}
                <div className="bg-[#f8fafc] border-b border-gray-200 px-4 py-3 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <CornerUpLeft className="w-4 h-4 text-[#34953C] shrink-0" />
                    <span className="text-xs text-gray-700">
                      Reply to <strong className="text-gray-900">{viewThread.applicant?.name || 'Applicant'}</strong>
                      <span className="text-gray-400 font-mono text-[11px] ml-1.5 hidden sm:inline">&lt;{viewThread.applicant?.email}&gt;</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    {/* Pre-built Email Template Selector */}
                    <div className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 shadow-2xs hover:border-[#34953C] transition">
                      <Sparkles className="w-3.5 h-3.5 text-[#34953C] shrink-0" />
                      <span className="text-[11px] font-bold text-gray-700 whitespace-nowrap">Template:</span>
                      <select
                        value={selectedTemplateId}
                        onChange={e => handleSelectTemplate(e.target.value)}
                        className="bg-transparent text-xs font-semibold text-gray-900 outline-none cursor-pointer max-w-[240px] sm:max-w-[280px] truncate"
                      >
                        <option value="">-- Choose Pre-built Template --</option>
                        {PREBUILT_EMAIL_TEMPLATES.map(tmpl => (
                          <option key={tmpl.id} value={tmpl.id}>
                            {tmpl.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Editor / Live Branded Preview Tabs */}
                    <div className="flex items-center bg-gray-200/80 p-0.5 rounded-lg text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setComposerTab('write')}
                        className={`px-3 py-1 rounded-md transition cursor-pointer text-xs ${
                          composerTab === 'write' ? 'bg-white text-gray-900 shadow-2xs font-bold' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        ✏️ Edit Message
                      </button>
                      <button
                        type="button"
                        onClick={() => setComposerTab('preview')}
                        className={`px-3 py-1 rounded-md transition cursor-pointer text-xs ${
                          composerTab === 'preview' ? 'bg-white text-[#34953C] shadow-2xs font-bold' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        👁️ Branded Preview
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subject Input Row */}
                <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2 text-xs bg-white">
                  <span className="font-semibold text-gray-400 select-none">Subject:</span>
                  <input
                    value={replySubject}
                    onChange={e => setReplySubject(e.target.value)}
                    placeholder="Subject line..."
                    className="w-full text-xs font-bold text-gray-900 outline-none placeholder:text-gray-400"
                  />
                </div>

                {/* Composer Tab 1: Write & Edit Message */}
                {composerTab === 'write' ? (
                  <div className="p-4 space-y-3">
                    <textarea
                      ref={replyInputRef}
                      rows={6}
                      value={replyBody}
                      onChange={e => setReplyBody(e.target.value)}
                      placeholder={`Write your reply to ${viewThread.applicant?.name || 'the sender'}...\nTip: Choose a pre-built template from the dropdown above to auto-load ready-to-send content, then customize any text freely before sending.`}
                      className="w-full text-xs sm:text-sm text-gray-900 leading-relaxed outline-none resize-y min-h-[160px] font-sans placeholder:text-gray-400 selection:bg-emerald-100"
                    />

                    {/* Collapsible Quoted Original Message Context (Gmail-style ... button) */}
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setShowQuotedContext(prev => !prev)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-mono transition cursor-pointer"
                          title="Toggle original quoted email context"
                        >
                          <span className="font-bold">...</span>
                          <span className="text-[10px] font-sans font-medium text-gray-600">
                            {showQuotedContext ? 'Hide quoted text' : 'Show quoted original message'}
                          </span>
                        </button>

                        <span className="text-[11px] text-gray-400 hidden sm:inline">
                          Automatically formatted with Tech Solutionor header logo &amp; social links upon sending
                        </span>
                      </div>

                      {showQuotedContext && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-2 border-l-gray-400 text-xs text-gray-600 font-mono space-y-1">
                          <div className="text-[11px] text-gray-500 font-sans font-bold">Original Message Context:</div>
                          <div className="text-[11px]">
                            On {formatDate(viewThread.lastMessageAt)} at {formatTime(viewThread.lastMessageAt)}, {viewThread.applicant?.name} &lt;{viewThread.applicant?.email}&gt; wrote:
                          </div>
                          <blockquote className="pl-2 border-l border-gray-300 text-gray-700 italic font-sans text-xs mt-1">
                            {viewThread.lastSnippet || 'Original email content...'}
                          </blockquote>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Composer Tab 2: Live Tech Solutionor Branded Preview */
                  <div className="p-4 bg-gray-100 space-y-2.5">
                    <div className="flex items-center justify-between text-xs px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-medium">
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#34953C]" />
                        <span><strong>Official Email Preview:</strong> Tech Solutionor top logo, customized message body, HR signature, and social footer.</span>
                      </span>
                      <span className="text-[11px] text-emerald-700 font-bold">Gmail / Outlook Ready</span>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-gray-300 shadow-xs bg-white">
                      <iframe
                        title="Tech Solutionor Branded Email Preview"
                        srcDoc={previewBrandedHtml}
                        className="w-full h-[470px] border-0"
                      />
                    </div>
                  </div>
                )}

                {/* Composer Bottom Action Toolbar */}
                <div className="bg-[#f8fafc] border-t border-gray-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      type="button"
                      onClick={handleSendReply}
                      disabled={sendingReply || !replyBody.trim()}
                      className="px-5 py-2 rounded-lg bg-[#34953C] hover:bg-[#2b7e32] text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      {sendingReply ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending Email...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send from hr@techsolutionor.com</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-gray-500 font-medium">Update Status:</span>
                      <select
                        value={statusUpdate}
                        onChange={e => setStatusUpdate(e.target.value)}
                        className="border border-gray-300 bg-white rounded-md px-2 py-1 text-xs font-semibold text-gray-800 outline-none cursor-pointer focus:border-[#34953C]"
                      >
                        <option value="open">Open</option>
                        <option value="under_review">Pending Review</option>
                        <option value="interview_scheduled">Interview</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={includeSignature}
                        onChange={e => setIncludeSignature(e.target.checked)}
                        className="rounded text-[#34953C] focus:ring-[#34953C]"
                      />
                      <span>HR Signature</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Discard this draft reply?')) {
                          setReplyBody('');
                          setSelectedTemplateId('');
                          setComposerTab('write');
                        }
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition cursor-pointer"
                      title="Discard draft"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Status Bar */}
            <div className="px-6 py-2.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 shrink-0">
              <span>
                Thread <code className="font-mono text-gray-700">#{viewThread.threadId}</code> &bull; {viewThread.applicant?.name}
              </span>
              <button
                type="button"
                onClick={() => setViewThread(null)}
                className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Template Library */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowTemplateModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[700px] max-h-[85vh] flex flex-col overflow-hidden border border-gray-100" onClick={e => e.stopPropagation()}>
            <div className="bg-[#34953C] px-6 py-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <h3 className="font-bold text-base">HR Email Templates Library</h3>
              </div>
              <button type="button" onClick={() => setShowTemplateModal(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <p className="text-xs text-gray-500">
                Pre-configured email response templates with dynamic token replacement (<code className="bg-gray-100 px-1 py-0.5 rounded text-[11px] text-emerald-700">{`{{candidateName}}`}</code>, <code className="bg-gray-100 px-1 py-0.5 rounded text-[11px] text-emerald-700">{`{{position}}`}</code>, <code className="bg-gray-100 px-1 py-0.5 rounded text-[11px] text-emerald-700">{`{{companyName}}`}</code>).
              </p>

              <div className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden bg-white">
                {(templates && templates.length > 0 ? templates : PREBUILT_EMAIL_TEMPLATES).map(tmpl => (
                  <div key={tmpl.id} className="p-4 hover:bg-gray-50/80 transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-xs font-bold text-gray-900">{tmpl.label || tmpl.title}</h4>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-gray-100 text-gray-700 uppercase">
                        {tmpl.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-semibold mb-1">Subject: {tmpl.subject}</p>
                    <div
                      className="text-[11px] text-gray-600 line-clamp-2 bg-gray-50 p-2 rounded border border-gray-100"
                      dangerouslySetInnerHTML={{ __html: tmpl.bodyHtml }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setShowTemplateModal(false)}
                className="px-5 py-2 bg-[#34953C] hover:bg-[#2b7e32] text-white rounded-lg text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

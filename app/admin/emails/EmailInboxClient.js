"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Mail,
  Search,
  Plus,
  RefreshCw,
  Send,
  Paperclip,
  Trash2,
  Archive,
  ChevronDown,
  User,
  Clock,
  Briefcase,
  Sparkles,
  FileText,
  X,
  Download,
  Calendar,
  CheckCheck,
  Eye,
  ArrowUpDown,
  ExternalLink,
  Loader2
} from 'lucide-react';

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
  const [counts, setCounts] = useState({ all: 0, unread: 0, career: 0, inquiry: 0 });
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all'); // all, career, inquiry
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  // Selected Thread Detail Modal State
  const [viewThread, setViewThread] = useState(null);
  const [threadMessages, setThreadMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Reply Composer inside Modal
  const [replyBody, setReplyBody] = useState('');
  const [replySubject, setReplySubject] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [statusUpdate, setStatusUpdate] = useState('');
  const [includeSignature, setIncludeSignature] = useState(true);
  const [sendingReply, setSendingReply] = useState(false);

  // Templates
  const [templates, setTemplates] = useState([]);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  // Compose New Outbound Email Modal
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [newEmailTo, setNewEmailTo] = useState('');
  const [newEmailName, setNewEmailName] = useState('');
  const [newEmailSubject, setNewEmailSubject] = useState('');
  const [newEmailBody, setNewEmailBody] = useState('');
  const [newEmailTemplateId, setNewEmailTemplateId] = useState('');
  const [sendingNewEmail, setSendingNewEmail] = useState(false);

  // Simulate Inbound Email Modal
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [simSenderName, setSimSenderName] = useState('John Doe');
  const [simSenderEmail, setSimSenderEmail] = useState('john.doe@example.com');
  const [simSubject, setSimSubject] = useState('Application for Senior Web Developer - CV Attached');
  const [simMessage, setSimMessage] = useState('Hello Hiring Team,\n\nI came across your job opening on social media and would love to submit my CV and portfolio for consideration.\n\nPlease find my resume attached.\n\nBest regards,\nJohn Doe');
  const [simulating, setSimulating] = useState(false);

  // Mailbox IMAP Sync State
  const [syncing, setSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState('');

  const messagesEndRef = useRef(null);

  // Initial load: fetch threads and templates (no manual sync required)
  useEffect(() => {
    fetchThreads();
    fetchTemplates();
  }, [categoryFilter, unreadOnly]);

  // Real-time automatic polling & event listener for instant incoming emails
  useEffect(() => {
    const handleNotificationRefresh = () => {
      fetchThreads(true);
    };
    window.addEventListener('admin-notifications-refresh', handleNotificationRefresh);

    // Poll every 10 seconds silently while tab is active
    const pollInterval = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        fetchThreads(true);
      }
    }, 10000);

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
  }, [categoryFilter, unreadOnly, query]);

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

  async function fetchThreads(isSilent = false) {
    try {
      if (!isSilent) setLoading(true);
      const params = new URLSearchParams();
      if (categoryFilter !== 'all') params.append('category', categoryFilter);
      if (unreadOnly) params.append('filter', 'unread');
      if (query.trim()) params.append('search', query.trim());
      params.append('limit', '100'); // Fetch enough for client-side sorting & pagination

      const res = await fetch(`/api/emails?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch emails');
      const data = await res.json();
      setThreads(data.threads || []);
      setCounts(data.counts || { all: 0, unread: 0, career: 0, inquiry: 0 });
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

  // Synchronize incoming emails from real mail server via IMAP
  async function handleSyncMailbox() {
    try {
      setSyncing(true);
      setSyncFeedback('Checking mailbox for new emails...');
      const res = await fetch('/api/emails/sync');
      const data = await res.json();
      if (data.success) {
        if (data.syncedCount > 0) {
          setSyncFeedback(`Successfully synced ${data.syncedCount} new incoming email${data.syncedCount > 1 ? 's' : ''}!`);
        } else {
          setSyncFeedback('Mailbox is up to date.');
        }
        await fetchThreads();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('admin-notifications-refresh'));
        }
      } else {
        setSyncFeedback(data.error || 'Could not sync emails.');
      }
    } catch (err) {
      console.error('Mailbox sync failed:', err);
      setSyncFeedback('Sync error: ' + err.message);
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncFeedback(''), 5000);
    }
  }

  // Filtered and paginated rows
  const filteredThreads = useMemo(() => {
    let result = threads;

    if (categoryFilter !== 'all') {
      result = result.filter(t => t.category === categoryFilter);
    }

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
  }, [threads, query, categoryFilter, unreadOnly]);

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

  // Template selection inside reply composer
  function handleSelectTemplate(tmplId) {
    setSelectedTemplateId(tmplId);
    if (!tmplId || !viewThread) return;

    const tmpl = templates.find(t => t.id === tmplId);
    if (!tmpl) return;

    const candidateName = viewThread.applicant?.name || 'Applicant';
    const position = viewThread.subject?.replace(/^(re|fwd):\s*/i, '').replace(/^Application for /i, '') || 'Open Position';
    const companyName = 'Tech Solutionor';
    const senderName = 'HR Team';

    let replacedBody = tmpl.bodyHtml
      .replace(/{{candidateName}}/g, candidateName)
      .replace(/{{position}}/g, position)
      .replace(/{{companyName}}/g, companyName)
      .replace(/{{senderName}}/g, senderName)
      .replace(/{{interviewDate}}/g, 'To be confirmed upon your reply')
      .replace(/{{interviewLink}}/g, 'https://meet.google.com/techsolutionor');

    setReplyBody(replacedBody.replace(/<p>/gi, '').replace(/<\/p>/gi, '\n\n').replace(/<br\s*[\/]?>/gi, '\n').replace(/<[^>]*>/g, '').trim());

    let replacedSubj = tmpl.subject
      .replace(/{{candidateName}}/g, candidateName)
      .replace(/{{position}}/g, position)
      .replace(/{{companyName}}/g, companyName);

    setReplySubject(replacedSubj.startsWith('Re:') ? replacedSubj : `Re: ${replacedSubj}`);
  }

  // Send reply from inside the modal
  async function handleSendReply(e) {
    e?.preventDefault();
    if (!replyBody.trim()) return alert('Please write a message before sending.');
    if (!viewThread) return;

    try {
      setSendingReply(true);
      const signatureHtml = includeSignature
        ? '<br/><br/>--<br/><strong>HR & Talent Acquisition Team</strong><br/>Tech Solutionor &bull; Global Digital Solutions<br/><a href="https://techsolutionor.com">techsolutionor.com</a>'
        : '';

      const bodyHtml = `<p>${replyBody.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</p>${signatureHtml}`;

      const res = await fetch('/api/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          threadId: viewThread.threadId,
          to: viewThread.applicant.email,
          toName: viewThread.applicant.name,
          subject: replySubject || `Re: ${viewThread.subject}`,
          bodyText: replyBody,
          bodyHtml,
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

      // Reload messages in the modal
      const convRes = await fetch(`/api/emails/${viewThread.threadId}`);
      if (convRes.ok) {
        const convData = await convRes.json();
        setThreadMessages(convData.messages || []);
        setViewThread(convData.thread);
      }

      await fetchThreads();
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

  // Update thread status directly from the table dropdown (matching Career Applications)
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

  // Send new outbound email
  async function handleSendNewEmail(e) {
    e?.preventDefault();
    if (!newEmailTo.trim() || !newEmailSubject.trim() || !newEmailBody.trim()) {
      return alert('Please fill in recipient, subject, and message.');
    }

    try {
      setSendingNewEmail(true);
      const signatureHtml = '<br/><br/>--<br/><strong>HR & Talent Acquisition Team</strong><br/>Tech Solutionor &bull; Global Digital Solutions<br/><a href="https://techsolutionor.com">techsolutionor.com</a>';
      const bodyHtml = `<p>${newEmailBody.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</p>${signatureHtml}`;

      const res = await fetch('/api/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: newEmailTo.trim(),
          toName: newEmailName.trim(),
          subject: newEmailSubject.trim(),
          bodyText: newEmailBody,
          bodyHtml,
          templateId: newEmailTemplateId || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to send email');
      }

      const resData = await res.json();
      setShowComposeModal(false);
      setNewEmailTo('');
      setNewEmailName('');
      setNewEmailSubject('');
      setNewEmailBody('');
      setNewEmailTemplateId('');

      await fetchThreads();
      if (resData.threadId) {
        handleOpenThreadModal(resData.threadId);
      }
    } catch (err) {
      alert('Error sending new email: ' + err.message);
    } finally {
      setSendingNewEmail(false);
    }
  }

  // Simulate inbound candidate email
  async function handleSimulateInbound() {
    try {
      setSimulating(true);
      const res = await fetch('/api/emails/inbound', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: simSenderName.trim(),
          senderEmail: simSenderEmail.trim(),
          recipient: 'hr@techsolutionor.com',
          subject: simSubject.trim(),
          bodyText: simMessage,
          attachments: [
            {
              fileName: `${simSenderName.replace(/\s+/g, '_')}_CV.pdf`,
              mimeType: 'application/pdf',
              size: 245000,
              fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
              storageProvider: 'simulated',
            },
          ],
        }),
      });

      if (!res.ok) throw new Error('Simulation failed');
      const data = await res.json();
      setShowSimulateModal(false);
      await fetchThreads();
      if (data.threadId) {
        handleOpenThreadModal(data.threadId);
      }
    } catch (err) {
      alert('Simulation error: ' + err.message);
    } finally {
      setSimulating(false);
    }
  }

  // Export CSV
  function downloadCSV() {
    if (!threads || threads.length === 0) return alert('No emails to export');
    const headers = ['#', 'Sender Name', 'Sender Email', 'Subject', 'Category', 'Status', 'Messages', 'Last Activity'];
    const csv = [headers.join(',')].concat(threads.map((t, i) => {
      const vals = [
        i + 1,
        t.applicant?.name || 'Anonymous',
        t.applicant?.email || '',
        t.subject || '',
        t.category || 'career',
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
    a.download = 'admin_email_inbox.csv';
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
        {/* Category Tabs */}
        <div className="flex flex-wrap bg-gray-100 p-1 rounded-lg text-xs font-semibold gap-1">
          {[
            { key: 'all', label: 'All Emails', count: counts.all, onClick: () => { setCategoryFilter('all'); setUnreadOnly(false); setPage(1); } },
            { key: 'unread', label: 'Unread', count: counts.unread, isHighlight: counts.unread > 0, onClick: () => { setUnreadOnly(true); setPage(1); } },
            { key: 'career', label: 'Job Applications / CVs', count: counts.career, onClick: () => { setCategoryFilter('career'); setUnreadOnly(false); setPage(1); } },
            { key: 'inquiry', label: 'Inquiries', count: counts.inquiry, onClick: () => { setCategoryFilter('inquiry'); setUnreadOnly(false); setPage(1); } },
          ].map(tab => {
            const isActive = tab.key === 'unread' ? unreadOnly : (!unreadOnly && categoryFilter === tab.key);
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

          {/* Simulate Inbound Test Email */}
          <button
            type="button"
            onClick={() => setShowSimulateModal(true)}
            className="px-3 py-1.5 rounded-lg border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            title="Simulate receiving an applicant email with CV attachment"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Simulate Inbound</span>
          </button>

          {/* Email Templates */}
          <button
            type="button"
            onClick={() => setShowTemplateModal(true)}
            className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-gray-500" />
            <span>Templates</span>
          </button>

          {/* Sync Mailbox (Manual Fallback / Diagnostic) */}
          <button
            type="button"
            onClick={handleSyncMailbox}
            disabled={syncing}
            className={`px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${syncing ? 'opacity-60 cursor-wait' : ''}`}
            title="Manual diagnostic utility: poll IMAP mailbox directly if needed"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing...' : 'Sync Mail'}</span>
          </button>

          {/* Refresh Table */}
          <button
            type="button"
            onClick={() => fetchThreads(false)}
            className={`px-3 py-1.5 rounded-lg bg-[#34953C] hover:bg-[#2b7e32] text-white font-semibold text-xs ${loading ? 'opacity-60' : ''} transition-all cursor-pointer flex items-center gap-1`}
            title="Refresh email list"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          {/* Compose New Email */}
          <button
            type="button"
            onClick={() => setShowComposeModal(true)}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Compose</span>
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

      {/* Sync Feedback Toast Banner */}
      {syncFeedback && (
        <div className="mb-3 px-3.5 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center justify-between shadow-2xs animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
            <span>{syncFeedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setSyncFeedback('')}
            className="text-emerald-600 hover:text-emerald-900 cursor-pointer p-0.5"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Email Inbox Table */}
      <div style={{ overflowX: "auto", minHeight: "560px", maxHeight: "620px", overflowY: "auto" }} className="w-full border border-gray-200 rounded-lg shadow-2xs bg-white">
        <table style={{ whiteSpace: "nowrap" }} className="w-full text-xs text-left">
          <thead className="bg-[#34953C] text-white sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2.5 text-left font-semibold min-w-[220px]">Sender</th>
              <th className="px-4 py-2.5 text-left font-semibold min-w-[170px] max-w-[240px]">Subject</th>
              <th className="px-4 py-2.5 text-left font-semibold w-[220px] max-w-[240px]">Message Preview</th>
              <th className="px-4 py-2.5 text-left font-semibold w-[150px]">Status</th>
              <th className="px-4 py-2.5 text-left font-semibold w-36">Date & Time</th>
              <th className="px-4 py-2.5 text-right font-semibold w-24">Actions</th>
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
                  thread.subject?.toLowerCase().includes('cv') ||
                  thread.subject?.toLowerCase().includes('resume') ||
                  thread.subject?.toLowerCase().includes('attached') ||
                  thread.category === 'career';

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
                    <td className="px-4 py-2.5 text-left align-middle min-w-[220px]">
                      <div className="flex flex-col space-y-0.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            isUnread ? 'bg-[#34953C] text-white' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {initial}
                          </div>
                          <span className={`text-xs break-words min-w-0 leading-tight ${isUnread ? 'font-extrabold text-gray-950' : 'font-bold text-gray-900'}`}>
                            {thread.applicant?.name || 'Anonymous Applicant'}
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

                    {/* 2. Subject & Category */}
                    <td className="px-4 py-2.5 align-middle min-w-[170px] max-w-[240px] truncate" title={thread.subject}>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className={`text-xs truncate leading-tight ${isUnread ? 'font-extrabold text-gray-950' : 'font-bold text-gray-900'}`}>
                          {thread.subject || 'No Subject'}
                        </span>
                        {thread.messageCount > 1 && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-gray-100 text-gray-600 shrink-0">
                            {thread.messageCount}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-gray-500 leading-normal truncate">
                        {thread.category === 'career' ? 'Job Application / CV' : thread.category === 'inquiry' ? 'General Inquiry' : 'Email Communication'}
                      </div>
                    </td>

                    {/* 3. Message Preview (wrapped up to 3 lines, narrower column) */}
                    <td className="px-4 py-2.5 align-middle w-[220px] max-w-[240px] whitespace-normal">
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

                    {/* 4. Status Dropdown (Manageable directly from table matching Career Applications) */}
                    <td className="px-4 py-2.5 align-middle whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
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
                              className={`text-[11px] font-bold py-1 pl-2.5 pr-6 rounded-full border transition-all cursor-pointer outline-none appearance-none shadow-2xs ${statusBorderBg} ${isUpdating ? 'opacity-60 cursor-wait' : ''}`}
                              title="Change email status"
                            >
                              <option value="open" className="bg-white text-emerald-700 font-semibold">Open</option>
                              <option value="under_review" className="bg-white text-amber-700 font-semibold">Pending Review</option>
                              <option value="interview_scheduled" className="bg-white text-blue-700 font-semibold">Interview</option>
                              <option value="approved" className="bg-white text-emerald-700 font-semibold">Approved</option>
                              <option value="rejected" className="bg-white text-red-700 font-semibold">Rejected</option>
                              <option value="closed" className="bg-white text-gray-700 font-semibold">Closed</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
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
                    <td className="px-4 py-2.5 align-middle text-[11px] text-gray-500 whitespace-nowrap w-36">
                      <div className="font-semibold text-gray-700 leading-tight">{formatDate(thread.lastMessageAt)}</div>
                      <div className="text-gray-400 text-[10px] leading-tight">{formatTime(thread.lastMessageAt)}</div>
                    </td>

                    {/* 6. Actions: View & View CV / No CV stacked matching Career Applications */}
                    <td className="px-4 py-2.5 text-right align-middle whitespace-nowrap w-24">
                      <div className="flex flex-col items-end gap-1.5 min-w-[80px]" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleOpenThreadModal(thread.threadId)}
                          className="w-20 px-2 py-1 bg-[#34953C] hover:bg-[#2b7e32] text-white text-[11px] font-bold rounded-md transition-all cursor-pointer text-center shadow-2xs"
                        >
                          View
                        </button>
                        {hasAttachment ? (
                          thread.primaryAttachmentUrl && thread.primaryAttachmentUrl !== '#' ? (
                            <a
                              href={thread.primaryAttachmentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="w-20 inline-flex items-center justify-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md border border-blue-200 transition-all cursor-pointer text-center"
                              title="Open / Preview applicant's CV in new tab"
                            >
                              <FileText className="w-3 h-3 shrink-0" />
                              <span>View CV</span>
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleOpenThreadModal(thread.threadId)}
                              className="w-20 inline-flex items-center justify-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md border border-blue-200 transition-all cursor-pointer text-center"
                              title="View conversation and CV attachment"
                            >
                              <FileText className="w-3 h-3 shrink-0" />
                              <span>View CV</span>
                            </button>
                          )
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

      {/* MODAL: Full Thread Conversation View & Integrated Reply Composer */}
      {viewThread && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6" onClick={() => setViewThread(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[820px] max-h-[92vh] flex flex-col overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#34953C] px-6 py-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center font-bold text-sm shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-white text-base sm:text-lg font-bold leading-tight truncate">
                    {viewThread.subject}
                  </h2>
                  <p className="text-white/80 text-[11px] font-medium">
                    Conversation with {viewThread.applicant?.name} &bull; {viewThread.mailbox || 'hr@techsolutionor.com'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold shadow-2xs border bg-white text-emerald-800 border-white/60`}>
                  {STATUS_CONFIG[viewThread.status]?.label || viewThread.status}
                </span>
                <button
                  type="button"
                  onClick={() => setViewThread(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white/90 hover:text-white transition cursor-pointer"
                  title="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 bg-[#f8fafc]">
              {/* 1. Applicant Profile Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base shrink-0">
                    {(viewThread.applicant?.name || 'A').trim().charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 truncate leading-snug">
                      {viewThread.applicant?.name}
                    </h3>
                    <a
                      href={`mailto:${viewThread.applicant?.email}`}
                      className="text-xs text-gray-500 font-mono hover:text-[#34953C] hover:underline block truncate"
                    >
                      {viewThread.applicant?.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-gray-500">Status:</span>
                  <select
                    value={statusUpdate}
                    onChange={async (e) => {
                      const newSt = e.target.value;
                      setStatusUpdate(newSt);
                      await fetch('/api/emails', {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ threadId: viewThread.threadId, status: newSt }),
                      });
                      setViewThread(prev => ({ ...prev, status: newSt }));
                      setThreads(prev =>
                        prev.map(t => (t.threadId === viewThread.threadId ? { ...t, status: newSt } : t))
                      );
                    }}
                    className="border border-gray-300 rounded-lg px-2.5 py-1 text-xs outline-none focus:border-[#34953C] bg-white cursor-pointer font-medium"
                  >
                    <option value="open">Open</option>
                    <option value="under_review">Under Review</option>
                    <option value="interview_scheduled">Interview</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* 2. Chronological Conversation Messages Timeline */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                  Communication History ({threadMessages.length} Messages)
                </span>

                {loadingMessages ? (
                  <div className="p-8 text-center text-xs text-gray-400 bg-white rounded-xl border border-gray-200">
                    <RefreshCw className="w-4 h-4 animate-spin mx-auto mb-2 text-[#34953C]" />
                    Loading conversation messages...
                  </div>
                ) : threadMessages.length === 0 ? (
                  <div className="p-6 text-center text-xs text-gray-400 bg-white rounded-xl border border-gray-200">
                    No messages recorded in this thread yet.
                  </div>
                ) : (
                  threadMessages.map((msg, idx) => {
                    const isInbound = msg.direction === 'inbound';
                    return (
                      <div
                        key={msg.id || idx}
                        className={`rounded-xl border p-4 shadow-2xs transition-all ${
                          isInbound
                            ? 'bg-white border-gray-200'
                            : 'bg-emerald-50/40 border-emerald-200/80 ml-4 sm:ml-8'
                        }`}
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                              isInbound ? 'bg-blue-100 text-blue-800' : 'bg-emerald-600 text-white'
                            }`}>
                              {isInbound ? 'IN' : 'HR'}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-gray-900 mr-2">
                                {isInbound ? msg.from?.name || 'Applicant' : 'Tech Solutionor HR'}
                              </span>
                              <span className="text-[11px] font-mono text-gray-500">
                                {isInbound ? `<${msg.from?.email}>` : '<hr@techsolutionor.com>'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(msg.createdAt)} {formatTime(msg.createdAt)}</span>
                          </div>
                        </div>

                        {/* Body */}
                        <div
                          className="text-xs sm:text-[13px] text-gray-800 leading-relaxed space-y-2 break-words"
                          dangerouslySetInnerHTML={{ __html: msg.bodyHtml || `<p>${msg.bodyText || ''}</p>` }}
                        />

                        {/* Attachments */}
                        {Array.isArray(msg.attachments) && msg.attachments.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-gray-100 space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                              Attached Files ({msg.attachments.length})
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {msg.attachments.map((att, i) => (
                                <a
                                  key={i}
                                  href={att.fileUrl || '#'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 shadow-2xs transition group"
                                >
                                  <Paperclip className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#34953C]" />
                                  <span className="truncate max-w-[220px]">{att.fileName || 'Document'}</span>
                                  <Download className="w-3 h-3 text-gray-400 ml-1" />
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
              </div>

              {/* 3. Integrated Reply Composer */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-gray-700">Email Template:</span>
                    <select
                      value={selectedTemplateId}
                      onChange={e => handleSelectTemplate(e.target.value)}
                      className="border border-gray-300 rounded-lg px-2.5 py-1 text-xs outline-none focus:border-[#34953C] bg-white cursor-pointer"
                    >
                      <option value="">-- Choose Pre-built Template --</option>
                      {templates.map(tmpl => (
                        <option key={tmpl.id} value={tmpl.id}>
                          {tmpl.title} ({tmpl.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="text-[11px] text-gray-500 font-medium">
                    Replying from: <span className="font-bold text-gray-900">hr@techsolutionor.com</span>
                  </div>
                </div>

                <input
                  value={replySubject}
                  onChange={e => setReplySubject(e.target.value)}
                  placeholder="Subject line..."
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold outline-none focus:border-[#34953C]"
                />

                <textarea
                  rows={4}
                  value={replyBody}
                  onChange={e => setReplyBody(e.target.value)}
                  placeholder={`Write your reply to ${viewThread.applicant?.name}...`}
                  className="w-full p-3 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#34953C] leading-relaxed resize-none"
                />

                <div className="flex items-center justify-between gap-2 pt-1">
                  <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={includeSignature}
                      onChange={e => setIncludeSignature(e.target.checked)}
                      className="rounded text-[#34953C] focus:ring-[#34953C]"
                    />
                    <span>Attach Official HR Signature</span>
                  </label>

                  <button
                    type="button"
                    onClick={handleSendReply}
                    disabled={sendingReply || !replyBody.trim()}
                    className="px-4 py-2 rounded-lg bg-[#34953C] hover:bg-[#2b7e32] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    {sendingReply ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending Reply...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send from hr@techsolutionor.com</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-gray-500 hidden sm:inline">
                Thread #{viewThread.threadId} &bull; {viewThread.applicant?.name}
              </span>
              <button
                type="button"
                onClick={() => setViewThread(null)}
                className="px-5 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Compose New Outbound Email */}
      {showComposeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowComposeModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[620px] overflow-hidden border border-gray-100" onClick={e => e.stopPropagation()}>
            <div className="bg-[#34953C] px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <h3 className="font-bold text-base">Compose New Outbound Email</h3>
              </div>
              <button type="button" onClick={() => setShowComposeModal(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendNewEmail} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Recipient Name</label>
                  <input
                    value={newEmailName}
                    onChange={e => setNewEmailName(e.target.value)}
                    placeholder="e.g. John Smith"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#34953C]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Recipient Email *</label>
                  <input
                    type="email"
                    required
                    value={newEmailTo}
                    onChange={e => setNewEmailTo(e.target.value)}
                    placeholder="candidate@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#34953C]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Load Template</label>
                <select
                  value={newEmailTemplateId}
                  onChange={e => {
                    setNewEmailTemplateId(e.target.value);
                    const tmpl = templates.find(t => t.id === e.target.value);
                    if (tmpl) {
                      setNewEmailSubject(tmpl.subject.replace(/{{candidateName}}/g, newEmailName || 'Candidate').replace(/{{companyName}}/g, 'Tech Solutionor'));
                      setNewEmailBody(tmpl.bodyHtml.replace(/<[^>]*>/g, '').replace(/{{candidateName}}/g, newEmailName || 'Candidate').replace(/{{companyName}}/g, 'Tech Solutionor'));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#34953C] bg-white"
                >
                  <option value="">-- None (Custom Message) --</option>
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Subject *</label>
                <input
                  required
                  value={newEmailSubject}
                  onChange={e => setNewEmailSubject(e.target.value)}
                  placeholder="Subject line..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-semibold outline-none focus:border-[#34953C]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Message Body *</label>
                <textarea
                  required
                  rows={6}
                  value={newEmailBody}
                  onChange={e => setNewEmailBody(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full p-3 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#34953C] leading-relaxed resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowComposeModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingNewEmail}
                  className="px-5 py-2 rounded-lg bg-[#34953C] hover:bg-[#2b7e32] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                >
                  {sendingNewEmail ? 'Sending...' : 'Send from hr@techsolutionor.com'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Simulate Inbound Email */}
      {showSimulateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowSimulateModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[560px] overflow-hidden border border-gray-100" onClick={e => e.stopPropagation()}>
            <div className="bg-purple-700 px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-200" />
                <h3 className="font-bold text-base">Simulate Inbound Candidate Email</h3>
              </div>
              <button type="button" onClick={() => setShowSimulateModal(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3.5">
              <p className="text-xs text-gray-600">
                Simulate an applicant sending an email and resume to <strong className="text-gray-900">hr@techsolutionor.com</strong>.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Applicant Name</label>
                  <input
                    value={simSenderName}
                    onChange={e => setSimSenderName(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs outline-none focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Applicant Email</label>
                  <input
                    value={simSenderEmail}
                    onChange={e => setSimSenderEmail(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Subject</label>
                <input
                  value={simSubject}
                  onChange={e => setSimSubject(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Message</label>
                <textarea
                  rows={4}
                  value={simMessage}
                  onChange={e => setSimMessage(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-xs outline-none focus:border-purple-600 leading-relaxed resize-none"
                />
              </div>

              <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 flex items-center gap-2 text-xs text-purple-900">
                <Paperclip className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Simulated Attachment: <strong>{simSenderName.replace(/\s+/g, '_')}_CV.pdf</strong></span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowSimulateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSimulateInbound}
                  disabled={simulating}
                  className="px-5 py-2 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  {simulating ? 'Processing...' : 'Simulate Inbound Email'}
                </button>
              </div>
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
                Pre-configured recruitment and inquiry response templates with dynamic token replacement (<code className="bg-gray-100 px-1 py-0.5 rounded text-[11px] text-emerald-700">{`{{candidateName}}`}</code>, <code className="bg-gray-100 px-1 py-0.5 rounded text-[11px] text-emerald-700">{`{{position}}`}</code>, <code className="bg-gray-100 px-1 py-0.5 rounded text-[11px] text-emerald-700">{`{{companyName}}`}</code>).
              </p>

              <div className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden bg-white">
                {templates.map(tmpl => (
                  <div key={tmpl.id} className="p-4 hover:bg-gray-50/80 transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-xs font-bold text-gray-900">{tmpl.title}</h4>
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

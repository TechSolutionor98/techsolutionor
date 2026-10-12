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
  Link2,
  Eye,
  Upload,
  Paperclip,
  FileSpreadsheet,
  Image as ImageIcon,
  Archive,
  AlertTriangle,
  Loader2,
  ArrowLeft,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

function formatBytes(bytes) {
  if (!bytes || isNaN(bytes)) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(2) + ' MB';
}

function getFileBadge(filename) {
  const ext = (filename || '').split('.').pop()?.toLowerCase() || '';
  if (['pdf'].includes(ext)) {
    return { ext: 'PDF', bg: 'bg-rose-50 text-rose-700 border-rose-200', iconColor: 'text-rose-600', isPdf: true, isViewable: true };
  }
  if (['doc', 'docx'].includes(ext)) {
    return { ext: ext.toUpperCase(), bg: 'bg-blue-50 text-blue-700 border-blue-200', iconColor: 'text-blue-600', isWord: true, isViewable: false };
  }
  if (['xls', 'xlsx', 'csv'].includes(ext)) {
    return { ext: ext.toUpperCase(), bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', iconColor: 'text-emerald-600', isExcel: true, isViewable: false };
  }
  if (['ppt', 'pptx'].includes(ext)) {
    return { ext: ext.toUpperCase(), bg: 'bg-amber-50 text-amber-700 border-amber-200', iconColor: 'text-amber-600', isPpt: true, isViewable: false };
  }
  if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext)) {
    return { ext: ext.toUpperCase(), bg: 'bg-purple-50 text-purple-700 border-purple-200', iconColor: 'text-purple-600', isImage: true, isViewable: true };
  }
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
    return { ext: ext.toUpperCase(), bg: 'bg-orange-50 text-orange-700 border-orange-200', iconColor: 'text-orange-600', isArchive: true, isViewable: false };
  }
  if (['fig'].includes(ext)) {
    return { ext: 'FIGMA', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', iconColor: 'text-indigo-600', isFigma: true, isViewable: false };
  }
  return { ext: (ext || 'DOC').toUpperCase(), bg: 'bg-gray-100 text-gray-700 border-gray-200', iconColor: 'text-gray-600', isViewable: false };
}

function parseReferenceLinks(rawText) {
  if (!rawText) return [];
  const items = String(rawText).split(/[\r\n,;]+/).map(s => s.trim()).filter(Boolean);
  return items.map(link => {
    let url = link;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    let tag = 'External Link';
    let tagColor = 'bg-gray-100 text-gray-700 border-gray-200';
    if (url.includes('figma.com')) {
      tag = 'Figma';
      tagColor = 'bg-pink-50 text-pink-700 border-pink-200';
    } else if (url.includes('drive.google.com') || url.includes('docs.google.com')) {
      tag = 'Google Drive';
      tagColor = 'bg-blue-50 text-blue-700 border-blue-200';
    } else if (url.includes('github.com')) {
      tag = 'GitHub';
      tagColor = 'bg-slate-100 text-slate-800 border-slate-300';
    } else if (url.includes('dropbox.com')) {
      tag = 'Dropbox';
      tagColor = 'bg-sky-50 text-sky-700 border-sky-200';
    }
    return { original: link, url, tag, tagColor };
  });
}

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

function getCompiledSummaryText(row) {
  if (!row) return '';
  if (row.message && typeof row.message === 'string' && row.message.trim().length > 0) {
    return row.message.trim();
  }

  const rawServices = row.services || row.details?.services;
  const servicesList = Array.isArray(rawServices) ? rawServices.join(', ') : (rawServices || 'Not specified');
  const otherSrv = row.otherService || row.details?.otherService;
  const servicesText = servicesList + (otherSrv ? ` (Other: ${otherSrv})` : '');
  const budgetSummary = row.budget || `${row.budgetType || 'Estimated'}: ${row.currency || 'USD'} ${row.minBudget || 'N/A'} - ${row.maxBudget || 'N/A'}`;

  const rawRoles = row.existingTeamRoles || row.details?.existingTeamRoles;
  const teamRoles = Array.isArray(rawRoles) ? rawRoles.join(', ') : (rawRoles || 'None');
  const otherRole = row.otherTeamRole || row.details?.otherTeamRole;

  const rawDocs = row.documentationTypes || row.details?.documentationTypes;
  const docTypes = Array.isArray(rawDocs) ? rawDocs.join(', ') : (rawDocs || 'None');

  const rawComm = row.communicationMethods || row.details?.communicationMethods;
  const commMethods = Array.isArray(rawComm) ? rawComm.join(', ') : (rawComm || 'Not specified');

  const rawReferrals = row.referralSources || row.details?.referralSources;
  const referrals = Array.isArray(rawReferrals) ? rawReferrals.join(', ') : (rawReferrals || 'Direct');
  const otherRef = row.otherReferral || row.details?.otherReferral;

  const filesList = (Array.isArray(row.attachedFilesList) ? row.attachedFilesList : (Array.isArray(row.files) ? row.files : []))
    .map(f => f.docType ? `${f.name || f.fileName || f.filename} [${f.docType}]` : (f.name || f.fileName || f.filename))
    .join(', ') || 'None';

  const exactCount = row.exactResourceCount || row.details?.exactResourceCount;
  const reqLoc = row.requiredLocation || row.city || row.details?.requiredLocation;

  return `
--- HIRE RESOURCES SPECIFICATIONS ---
Requirement Type: ${row.requirementType || 'Dedicated Resource'}
Selected Services: ${servicesText}
Resources Count: ${row.resourceCount || '1'}${exactCount ? ` (Exact: ${exactCount})` : ''}
Experience Level: ${row.experienceLevel || 'Not specified'}

--- ARRANGEMENT & SCHEDULE ---
Arrangement: ${row.workArrangement || 'Remote'}${reqLoc ? ` (${reqLoc})` : ''} (TZ: ${row.timeZone || 'Client Local Time'})
Schedule: ${row.workingHours || 'Full-Time (8h/day)'} | ${row.workingDays || 'Monday - Friday'} (${row.hoursPerDay || '8'}h/day, ${row.hoursPerWeek || '40'}h/week)
Duration: ${row.duration || 'Flexible'} (Start: ${row.startDate || 'Immediate'}, End: ${row.endDate || 'Flexible'})
Budget: ${budgetSummary}

--- TEAM & DOCUMENTATION ---
Internal Team: ${row.hasInternalTeam || 'No'}${teamRoles && teamRoles !== 'None' ? ` (${teamRoles}${otherRole ? ` - Other: ${otherRole}` : ''})` : ''}
Management: ${row.teamManager || 'Client'} (Meeting: ${row.meetingFrequency || 'Weekly Review'})
Preferred Communication: ${commMethods}
Documentation: ${row.hasDocumentation || 'No'}${docTypes && docTypes !== 'None' ? ` (${docTypes})` : ''}
Reference Links: ${row.referenceLinks || 'None'}

--- CONTACT DETAILS ---
Name: ${row.fullName || row.name || 'Anonymous Client'}
Job Title: ${row.jobTitle || 'N/A'}
Email: ${row.email || 'N/A'}
Phone: ${row.phone || 'N/A'}
WhatsApp: ${row.whatsapp || 'N/A'}
Country: ${row.country || 'N/A'}
Contact Method: ${row.preferredContactMethod || 'Email'} | Best Time: ${row.bestTimeToContact || 'Any Time'}
Found Us Via: ${referrals}${otherRef ? ` (Other: ${otherRef})` : ''}
Attached Files: ${filesList}
  `.trim();
}

function SummaryKeyValueRow({ label, children, value, className = '' }) {
  return (
    <div className={`px-5 py-2.5 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 hover:bg-gray-50/60 transition-colors ${className}`}>
      <div className="w-full sm:w-56 md:w-60 shrink-0 text-gray-500 font-semibold text-xs flex items-center justify-between sm:justify-start pt-0.5">
        <span>{label}</span>
        <span className="text-gray-300 font-bold ml-1 sm:ml-auto sm:mr-3">:</span>
      </div>
      <div className="flex-1 text-xs text-gray-900 font-medium break-words leading-relaxed min-w-0">
        {children !== undefined ? children : (value ?? '—')}
      </div>
    </div>
  );
}

export default function HireUsTableClient({ initialData = [], apiBase = process.env.NEXT_PUBLIC_API_URL || '' }) {
  const [rows, setRows] = useState(initialData || []);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [viewRow, setViewRow] = useState(null);
  const [modalView, setModalView] = useState('details'); // 'details' | 'summary'

  // Status & Notes editing in modal
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  // Deletion state
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // File management state
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [deletingFileIdx, setDeletingFileIdx] = useState(null);

  // Email Reply State & Handlers
  const [showReplyComposer, setShowReplyComposer] = useState(false);
  const [replyTo, setReplyTo] = useState('');
  const [replyToName, setReplyToName] = useState('');
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSendSuccess, setEmailSendSuccess] = useState('');
  const [emailSendError, setEmailSendError] = useState('');

  const replyTemplates = useMemo(() => {
    if (!viewRow) return [];
    const clientName = viewRow.name || viewRow.fullName || 'Client';
    const rawServices = viewRow.services || viewRow.details?.services;
    const servicesStr = Array.isArray(rawServices) ? rawServices.join(', ') : (rawServices || 'Hire Resources');
    const exp = viewRow.experienceLevel || 'specified';

    return [
      {
        id: 'discovery',
        label: 'Discovery Call',
        subject: `Re: Hire Resources Requirement - ${clientName}`,
        body: `Dear ${clientName},\n\nThank you for reaching out to Tech Solutionor regarding your hire resources requirement for ${servicesStr}.\n\nWe have received your detailed specifications and our talent acquisition team is actively reviewing your criteria. We would like to schedule a brief 15-minute consultation to discuss your project timeline and candidate availability.\n\nPlease let us know what days and times work best for you this week, or feel free to reply directly to this email.\n\nBest regards,\nTech Solutionor Team\nhr@techsolutionor.com`,
      },
      {
        id: 'shortlist',
        label: 'Profiles Shortlisted',
        subject: `Candidate Profiles Shortlisted for Your ${servicesStr} Requirement`,
        body: `Dear ${clientName},\n\nRegarding your requirement for ${servicesStr} (${exp} experience level), our team has shortlisted qualified, pre-vetted specialists ready for deployment.\n\nWe would love to share their verified technical portfolios and coordinate introductory interviews at your earliest convenience.\n\nPlease reply with any specific schedule preferences.\n\nBest regards,\nTech Solutionor Team\nhr@techsolutionor.com`,
      },
      {
        id: 'clarify',
        label: 'Scope Clarification',
        subject: `Follow-up: Scope Clarification for ${servicesStr}`,
        body: `Dear ${clientName},\n\nThank you for submitting your talent requirement with Tech Solutionor.\n\nTo ensure our team matches the exact skill set and framework proficiencies required for your ${servicesStr} initiative, could you please provide a few additional details regarding your primary tech stack, development workflow, and targeted start date?\n\nLooking forward to your reply.\n\nBest regards,\nTech Solutionor Team\nhr@techsolutionor.com`,
      },
    ];
  }, [viewRow]);

  const handleToggleReplyComposer = () => {
    if (!showReplyComposer && viewRow) {
      setReplyTo(viewRow.email || '');
      setReplyToName(viewRow.name || viewRow.fullName || '');
      setReplySubject(`Re: Hire Resources Requirement - ${viewRow.name || viewRow.fullName || 'Tech Solutionor'}`);
      if (!replyMessage) {
        setReplyMessage(`Dear ${viewRow.name || viewRow.fullName || 'Client'},\n\nThank you for reaching out to Tech Solutionor regarding your hire resources requirement.\n\n`);
      }
      setEmailSendSuccess('');
      setEmailSendError('');
    }
    setShowReplyComposer(prev => !prev);
  };

  const handleApplyReplyTemplate = (tmpl) => {
    if (!tmpl) return;
    setReplySubject(tmpl.subject);
    setReplyMessage(tmpl.body);
    setEmailSendError('');
    setEmailSendSuccess('');
  };

  const handleSendEmailReply = async () => {
    setEmailSendError('');
    setEmailSendSuccess('');

    const targetEmail = (replyTo || '').trim();
    if (!targetEmail) {
      setEmailSendError('Recipient email address is required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)) {
      setEmailSendError('Please provide a valid recipient email address.');
      return;
    }

    const targetSubject = (replySubject || '').trim();
    if (!targetSubject) {
      setEmailSendError('Email subject is required.');
      return;
    }

    const targetBody = (replyMessage || '').trim();
    if (!targetBody || targetBody.length < 5) {
      setEmailSendError('Please write your response message before sending.');
      return;
    }

    setIsSendingEmail(true);

    try {
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: targetEmail,
          toName: (replyToName || '').trim() || targetEmail.split('@')[0],
          subject: targetSubject,
          bodyText: targetBody,
          bodyHtml: `<p>${targetBody.replace(/\r\n/g, '\n').replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</p>`,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(data.deliveryError || data.error || 'Failed to send email. Please check SMTP settings or try again.');
      }

      setEmailSendSuccess(`Reply email successfully delivered to ${targetEmail}.`);

      // Record note in submission audit trail
      const auditNote = `[Email Sent on ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}] Subject: "${targetSubject}"`;
      const currentNotes = viewRow?.adminNotes || '';
      const updatedNotes = currentNotes ? `${currentNotes}\n${auditNote}` : auditNote;
      setViewRow(prev => prev ? { ...prev, adminNotes: updatedNotes } : prev);
      setAdminNoteInput(updatedNotes);

      // Persist note to MongoDB in background
      if (viewRow) {
        try {
          await fetch('/api/hire-submissions', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: viewRow.id || viewRow._id,
              adminNotes: updatedNotes,
            }),
          });
        } catch (_) {}
      }
    } catch (err) {
      setEmailSendError(err.message || 'An error occurred while sending the email.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleAdminFileUpload = async (submissionId, files, replaceIndex = null, docType = null) => {
    if (!submissionId || !files || files.length === 0) return;
    setIsUploadingFile(true);
    setUploadError('');
    try {
      const fd = new FormData();
      Array.from(files).forEach(f => fd.append('files', f));
      fd.append('docType', docType || 'Admin Document');
      if (replaceIndex !== null && replaceIndex !== undefined) {
        fd.append('replaceIndex', String(replaceIndex));
      }

      const res = await fetch(`/api/hire-submissions/${submissionId}/files`, {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload file');
      }

      const updatedList = data.attachedFilesList || [];
      setViewRow(prev => prev ? { ...prev, attachedFilesList: updatedList } : prev);
      setRows(prevRows => prevRows.map(r => {
        if ((r.id || r._id) === submissionId) {
          return { ...r, attachedFilesList: updatedList };
        }
        return r;
      }));
    } catch (err) {
      console.error('Error uploading file:', err);
      setUploadError(err.message || 'File upload failed');
    } finally {
      setIsUploadingFile(false);
    }
  };

  const handleAdminFileDelete = async (submissionId, fileIdx, fileId) => {
    if (!window.confirm('Are you sure you want to remove this attached file?')) return;
    setDeletingFileIdx(fileIdx);
    try {
      const queryParam = fileId ? `fileId=${fileId}` : `index=${fileIdx}`;
      const res = await fetch(`/api/hire-submissions/${submissionId}/files?${queryParam}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete file');
      }
      const updatedList = data.attachedFilesList || [];
      setViewRow(prev => prev ? { ...prev, attachedFilesList: updatedList } : prev);
      setRows(prevRows => prevRows.map(r => {
        if ((r.id || r._id) === submissionId) {
          return { ...r, attachedFilesList: updatedList };
        }
        return r;
      }));
    } catch (err) {
      console.error('Error deleting file:', err);
      alert(err.message || 'Failed to remove file');
    } finally {
      setDeletingFileIdx(null);
    }
  };

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
    setModalView('details');
    setAdminNoteInput(row.adminNotes || row.statusNote || '');
    setShowReplyComposer(false);
    setEmailSendSuccess('');
    setEmailSendError('');
    setReplyMessage('');

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

                        {/* File & Links indicator badges */}
                        <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                          {Array.isArray(s.attachedFilesList) && s.attachedFilesList.length > 0 && (
                            <span
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
                              title={`${s.attachedFilesList.length} file(s) attached`}
                            >
                              <Paperclip className="w-2.5 h-2.5 text-emerald-600" />
                              <span>{s.attachedFilesList.length} {s.attachedFilesList.length === 1 ? 'file' : 'files'}</span>
                            </span>
                          )}
                          {s.referenceLinks && (
                            <span
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200"
                              title="External documentation links provided"
                            >
                              <Link2 className="w-2.5 h-2.5 text-blue-600" />
                              <span>Links</span>
                            </span>
                          )}
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
                    {modalView === 'summary' ? 'Compiled Requirement Summary' : 'Hire Requirement Details'}
                  </h2>
                  <p className="text-white/80 text-[11px] font-medium">
                    Inquiry #{viewRow.inquiryNo} &bull; {viewRow.requirementType || 'Dedicated Resource'}{modalView === 'summary' ? ' • Summary View' : ''}
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

                <div className="flex flex-col items-stretch sm:items-end gap-2 shrink-0">
                  <div className="flex items-center gap-2">
                    {viewRow.email && (
                      <button
                        type="button"
                        onClick={handleToggleReplyComposer}
                        className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 border rounded-lg text-xs font-semibold shadow-2xs transition-all cursor-pointer flex-1 sm:flex-initial ${
                          showReplyComposer
                            ? 'bg-[#34953C] text-white border-[#34953C] shadow-xs'
                            : 'bg-white hover:bg-gray-100 border-gray-300 text-gray-700'
                        }`}
                        title="Reply directly via email without leaving the admin panel"
                      >
                        <Mail className={`w-3.5 h-3.5 ${showReplyComposer ? 'text-white' : 'text-gray-500'}`} />
                        <span>Reply Email</span>
                      </button>
                    )}
                    {viewRow.whatsapp && (
                      <a
                        href={`https://wa.me/${viewRow.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-lg text-xs font-semibold shadow-2xs transition-all cursor-pointer flex-1 sm:flex-initial"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>

                  {/* Dedicated View Summary / Back to Details Button (Positioned at bottom of Reply Email section) */}
                  {modalView === 'details' ? (
                    <button
                      type="button"
                      onClick={() => setModalView('summary')}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#34953C] hover:bg-[#2b7e32] text-white rounded-lg text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer w-full sm:w-auto"
                      title="View Complete Compiled Requirement Summary"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Summary</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setModalView('details')}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer w-full sm:w-auto"
                      title="Return to details"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Details</span>
                    </button>
                  )}
                </div>
              </div>

              {/* INTERACTIVE REPLY EMAIL COMPOSER */}
              {showReplyComposer && (
                <div className="p-4 sm:p-5 bg-white rounded-2xl border-2 border-[#34953C]/30 shadow-md space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#34953C]/10 text-[#34953C] flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 font-jakarta flex items-center gap-2">
                          <span>Reply Email</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Direct Outbound Mail
                          </span>
                        </h4>
                        <p className="text-[11px] text-gray-500 font-jakarta mt-0.5">
                          Recipient auto-populated from submission: <strong className="text-gray-800">{replyTo}</strong>
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowReplyComposer(false)}
                      className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                      title="Close reply composer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Feedback Banners */}
                  {emailSendError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="font-semibold block">Failed to send reply:</span>
                        <span>{emailSendError}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEmailSendError('')}
                        className="text-rose-400 hover:text-rose-700 cursor-pointer p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {emailSendSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-800 animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="font-semibold block">Success:</span>
                        <span>{emailSendSuccess}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEmailSendSuccess('')}
                        className="text-emerald-500 hover:text-emerald-800 cursor-pointer p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Form fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Recipient */}
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                        To (Recipient Email)
                      </label>
                      <input
                        type="email"
                        value={replyTo}
                        onChange={(e) => setReplyTo(e.target.value)}
                        disabled={isSendingEmail}
                        className="w-full px-3 py-2 text-xs text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#34953C] focus:bg-white disabled:opacity-60"
                        placeholder="recipient@example.com"
                      />
                    </div>

                    {/* Recipient Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Recipient Name
                      </label>
                      <input
                        type="text"
                        value={replyToName}
                        onChange={(e) => setReplyToName(e.target.value)}
                        disabled={isSendingEmail}
                        className="w-full px-3 py-2 text-xs text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#34953C] focus:bg-white disabled:opacity-60"
                        placeholder="Client Name"
                      />
                    </div>
                  </div>

                  {/* Subject Line & Templates */}
                  <div className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                        Subject Line
                      </label>
                      {/* Quick Template pills */}
                      <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
                        <span className="text-gray-400 font-medium text-[10px]">Templates:</span>
                        {replyTemplates.map((tmpl) => (
                          <button
                            key={tmpl.id}
                            type="button"
                            onClick={() => handleApplyReplyTemplate(tmpl)}
                            disabled={isSendingEmail}
                            className="px-2 py-0.5 bg-gray-100 hover:bg-[#34953C]/10 hover:text-[#34953C] border border-gray-200 rounded text-[10px] font-semibold text-gray-600 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                            title={`Apply: ${tmpl.label}`}
                          >
                            {tmpl.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <input
                      type="text"
                      value={replySubject}
                      onChange={(e) => setReplySubject(e.target.value)}
                      disabled={isSendingEmail}
                      className="w-full px-3 py-2 text-xs text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#34953C] focus:ring-1 focus:ring-[#34953C] disabled:opacity-60"
                      placeholder="Email subject..."
                    />
                  </div>

                  {/* Message Body */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Email Message
                    </label>
                    <textarea
                      rows={7}
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      disabled={isSendingEmail}
                      className="w-full p-3 text-xs text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#34953C] focus:ring-1 focus:ring-[#34953C] leading-relaxed custom-scrollbar disabled:opacity-60"
                      placeholder="Type your response to the user here..."
                    />
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-gray-100">
                    <span className="text-[11px] text-gray-400">
                      Dispatched from official mail service. Logged in communication history.
                    </span>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setShowReplyComposer(false)}
                        disabled={isSendingEmail}
                        className="px-3.5 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSendEmailReply}
                        disabled={isSendingEmail}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#34953C] hover:bg-[#2b7e32] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer min-w-[110px]"
                      >
                        {isSendingEmail ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Send Email</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 1: Standard Details (Summary hidden by default) */}
              {modalView === 'details' && (
                <>
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

              {/* Reference Links & Attached Files Section */}
              <div className="p-4 sm:p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <FileCheck className="w-4 h-4 text-[#34953C]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700">
                      Documentation, Attachments & Reference Links
                    </span>
                  </div>
                  {/* Admin File Upload Trigger */}
                  <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#2b7e32] rounded-lg text-xs font-bold transition cursor-pointer shadow-2xs">
                    {isUploadingFile ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-emerald-700" />
                    )}
                    <span>{isUploadingFile ? 'Uploading...' : 'Attach Document'}</span>
                    <input
                      type="file"
                      multiple
                      disabled={isUploadingFile}
                      className="hidden"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          handleAdminFileUpload(viewRow.id || viewRow._id, files);
                        }
                        e.target.value = '';
                      }}
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar,.7z,.tar,.gz,.jpg,.jpeg,.png,.webp,.fig,.txt,.csv,.rtf"
                    />
                  </label>
                </div>

                {uploadError && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* Reference Links List */}
                {(() => {
                  const parsedRefLinks = parseReferenceLinks(viewRow.referenceLinks);
                  if (parsedRefLinks.length === 0) return null;

                  return (
                    <div className="space-y-1.5">
                      <span className="text-gray-500 text-xs font-semibold block">
                        External Reference Links ({parsedRefLinks.length}):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {parsedRefLinks.map((item, lIdx) => (
                          <div
                            key={lIdx}
                            className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/70 flex items-center justify-between gap-2 text-xs"
                          >
                            <div className="flex items-center gap-2 truncate min-w-0">
                              <Link2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <div className="truncate min-w-0">
                                <span className="font-semibold text-gray-800 block truncate" title={item.url}>
                                  {item.original}
                                </span>
                                <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold border ${item.tagColor}`}>
                                  {item.tag}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => copyToClipboard(item.url, `ref-${lIdx}`)}
                                className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700 transition"
                                title="Copy URL"
                              >
                                {copiedKey === `ref-${lIdx}` ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-blue-50 border border-gray-200 text-blue-600 font-bold text-[11px] transition shadow-2xs"
                                title="Open in new tab"
                              >
                                <span>Open</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Attached Files List */}
                {Array.isArray(viewRow.attachedFilesList) && viewRow.attachedFilesList.length > 0 ? (
                  <div className="space-y-2">
                    <span className="text-gray-500 text-xs font-semibold block">
                      Attached Documents ({viewRow.attachedFilesList.length}):
                    </span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {viewRow.attachedFilesList.map((file, fIdx) => {
                        const targetSubmissionId = viewRow.id || viewRow._id;
                        const originalName = file.name || file.fileName || 'Untitled Document';
                        const badgeInfo = getFileBadge(originalName);
                        const hasStorage = Boolean(file.url || file.fileUrl || file.localPath || file.cloudinaryUrl);
                        const fileQuery = file.id ? `fileId=${encodeURIComponent(file.id)}` : `index=${fIdx}`;
                        const previewUrl = `/api/hire-submissions/${targetSubmissionId}/files?${fileQuery}`;
                        const downloadUrl = `/api/hire-submissions/${targetSubmissionId}/files?${fileQuery}&download=1`;
                        const isDeleting = deletingFileIdx === fIdx;

                        return (
                          <div
                            key={fIdx}
                            className="p-3 rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-white hover:border-gray-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs"
                          >
                            {/* File info */}
                            <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${badgeInfo.bg}`}>
                                {badgeInfo.isPdf ? (
                                  <FileText className={`w-4 h-4 ${badgeInfo.iconColor}`} />
                                ) : badgeInfo.isImage ? (
                                  <ImageIcon className={`w-4 h-4 ${badgeInfo.iconColor}`} />
                                ) : badgeInfo.isExcel ? (
                                  <FileSpreadsheet className={`w-4 h-4 ${badgeInfo.iconColor}`} />
                                ) : badgeInfo.isArchive ? (
                                  <Archive className={`w-4 h-4 ${badgeInfo.iconColor}`} />
                                ) : (
                                  <FileText className={`w-4 h-4 ${badgeInfo.iconColor}`} />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-bold text-gray-900 truncate max-w-[260px] sm:max-w-[340px]" title={originalName}>
                                    {originalName}
                                  </span>
                                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold border uppercase tracking-wider ${badgeInfo.bg}`}>
                                    {badgeInfo.ext}
                                  </span>
                                  {file.docType && (
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                                      {file.docType}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400 flex-wrap">
                                  {file.size && <span>{formatBytes(file.size)}</span>}
                                  {file.uploadedAt && <span>• Uploaded {new Date(file.uploadedAt).toLocaleDateString()}</span>}
                                  {!hasStorage && (
                                    <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-semibold text-[10px]">
                                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                                      <span>Legacy metadata only (content not stored on server)</span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                              {hasStorage ? (
                                <>
                                  <a
                                    href={previewUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 font-bold text-xs transition shadow-2xs cursor-pointer"
                                    title="Open or preview file in new tab"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-gray-500" />
                                    <span>Preview</span>
                                  </a>

                                  <a
                                    href={downloadUrl}
                                    download={originalName}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#34953C] hover:bg-[#2b7e32] text-white font-bold text-xs transition shadow-2xs cursor-pointer"
                                    title="Download file directly"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Download</span>
                                  </a>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      const fullUrl = window.location.origin + downloadUrl;
                                      copyToClipboard(fullUrl, `file-${file.id || fIdx}`);
                                    }}
                                    className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-500 transition cursor-pointer"
                                    title="Copy download URL"
                                  >
                                    {copiedKey === `file-${file.id || fIdx}` ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                </>
                              ) : (
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span
                                    className="text-[11px] text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200 italic"
                                    title="Original file was submitted as metadata before file storage was active on server."
                                  >
                                    File content unavailable
                                  </span>

                                  <label
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#34953C] hover:bg-[#2b7e32] text-white font-bold text-xs transition shadow-2xs cursor-pointer"
                                    title="Upload the document file for this entry"
                                  >
                                    <Upload className="w-3.5 h-3.5 text-white" />
                                    <span>Upload File</span>
                                    <input
                                      type="file"
                                      disabled={isUploadingFile}
                                      className="hidden"
                                      onChange={(e) => {
                                        const fls = e.target.files;
                                        if (fls && fls.length > 0) {
                                          handleAdminFileUpload(targetSubmissionId, fls, fIdx, file.docType);
                                        }
                                        e.target.value = '';
                                      }}
                                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar,.7z,.tar,.gz,.jpg,.jpeg,.png,.webp,.fig,.txt,.csv,.rtf"
                                    />
                                  </label>
                                </div>
                              )}

                              <button
                                type="button"
                                disabled={isDeleting}
                                onClick={() => handleAdminFileDelete(targetSubmissionId, fIdx, file.id)}
                                className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition hover:bg-red-50 cursor-pointer"
                                title="Remove file"
                              >
                                {isDeleting ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <Trash2 className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border border-dashed border-gray-200 text-center text-xs text-gray-400">
                    No files attached to this submission. Click &quot;Attach Document&quot; above to add files.
                  </div>
                )}
              </div>

              {/* 3. Internal Admin Notes & Audit Trail */}
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
            </>
          )}

          {/* VIEW 2: Complete Compiled Requirement Summary View (Displayed only upon clicking View Summary) */}
          {modalView === 'summary' && (() => {
            const rawServices = viewRow.services || viewRow.details?.services;
            const servicesArr = Array.isArray(rawServices) ? rawServices : (rawServices ? [rawServices] : []);
            const otherSrv = viewRow.otherService || viewRow.details?.otherService;
            const allServices = [...servicesArr, ...(otherSrv ? [`Other: ${otherSrv}`] : [])];
            const servicesText = allServices.length > 0 ? allServices.join(', ') : 'None';

            const exactCount = viewRow.exactResourceCount || viewRow.details?.exactResourceCount;
            const resourceCountText = `${viewRow.resourceCount || '1'} (Exact: ${exactCount || 'N/A'})`;

            const workArr = viewRow.workArrangement || 'Remote';
            const loc = viewRow.requiredLocation || viewRow.city || (viewRow.arrangementCountry ? `${viewRow.city ? viewRow.city + ', ' : ''}${viewRow.arrangementCountry}` : '');
            const tz = viewRow.timeZone || '';
            const arrDetails = [loc, tz].filter(Boolean).join(', ');
            const arrangementText = arrDetails ? `${workArr} (${arrDetails})` : workArr;

            const workingHours = viewRow.workingHours || 'Full-Time';
            const hDay = viewRow.hoursPerDay || '8';
            const hWeek = viewRow.hoursPerWeek || '40';
            const days = viewRow.workingDays || 'Monday–Friday';
            const scheduleText = `${workingHours} (${hDay} Hours/Day – ${hWeek}h/week), ${days}`;

            const dur = viewRow.duration || 'Flexible';
            const start = viewRow.startDate || 'Immediate';
            const end = viewRow.endDate || 'Flexible';
            const durationText = `${dur} (Start: ${start}, End: ${end})`;

            let budgetText = viewRow.budget || '';
            if (!budgetText) {
              const bType = viewRow.budgetType ? `${viewRow.budgetType}: ` : '';
              const curr = viewRow.currency || 'USD';
              const min = viewRow.minBudget || 'N/A';
              const max = viewRow.maxBudget || 'N/A';
              budgetText = `${bType}${curr} ${min} – ${max}`;
            }

            const hasTeam = viewRow.hasInternalTeam || 'No';
            const rawRoles = viewRow.existingTeamRoles || viewRow.details?.existingTeamRoles;
            const rolesArr = Array.isArray(rawRoles) ? rawRoles : [];
            const otherRole = viewRow.otherTeamRole || viewRow.details?.otherTeamRole;
            const allRoles = [...rolesArr, ...(otherRole ? [`Other: ${otherRole}`] : [])];
            const teamRolesStr = allRoles.join(', ');
            const internalTeamText = teamRolesStr ? `${hasTeam} (${teamRolesStr})` : hasTeam;

            const mgr = viewRow.teamManager || 'Client';
            const freq = viewRow.meetingFrequency || 'Weekly Review';
            const managementText = `${mgr} (${freq})`;

            const rawComm = viewRow.communicationMethods || viewRow.details?.communicationMethods;
            const commText = Array.isArray(rawComm) && rawComm.length > 0 ? rawComm.join(', ') : (rawComm || 'None');

            const hasDoc = viewRow.hasDocumentation || 'No';
            const rawDocs = viewRow.documentationTypes || viewRow.details?.documentationTypes;
            const docsArr = Array.isArray(rawDocs) ? rawDocs : [];
            const docsStr = docsArr.join(', ');
            const documentationText = docsStr ? `${hasDoc} (${docsStr})` : hasDoc;

            const rawRefs = viewRow.referralSources || viewRow.details?.referralSources;
            const refsStr = Array.isArray(rawRefs) ? rawRefs.join(', ') : (rawRefs || 'Direct');
            const otherRef = viewRow.otherReferral || viewRow.details?.otherReferral;
            const foundUsText = otherRef ? `${refsStr} (${otherRef})` : refsStr;

            const parsedLinks = parseReferenceLinks(viewRow.referenceLinks);
            const attachedFiles = Array.isArray(viewRow.attachedFilesList) ? viewRow.attachedFilesList : (Array.isArray(viewRow.files) ? viewRow.files : []);

            return (
              <div className="animate-in fade-in duration-150">
                {/* Continuous Simple Key: Value List (No separate cards or section blocks) */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
                  <div className="divide-y divide-gray-100 text-xs">
                    <SummaryKeyValueRow label="Requirement Type" value={viewRow.requirementType || 'Dedicated Resource'} />
                    <SummaryKeyValueRow label="Selected Services" value={servicesText} />
                    <SummaryKeyValueRow label="Resources Count" value={resourceCountText} />
                    <SummaryKeyValueRow label="Experience Level" value={viewRow.experienceLevel || 'Not specified'} />
                    <SummaryKeyValueRow label="Arrangement" value={arrangementText} />
                    <SummaryKeyValueRow label="Schedule" value={scheduleText} />
                    <SummaryKeyValueRow label="Duration" value={durationText} />
                    <SummaryKeyValueRow label="Budget" value={budgetText} />
                    <SummaryKeyValueRow label="Internal Team" value={internalTeamText} />
                    <SummaryKeyValueRow label="Management" value={managementText} />
                    <SummaryKeyValueRow label="Preferred Communication" value={commText} />
                    <SummaryKeyValueRow label="Documentation" value={documentationText} />
                    <SummaryKeyValueRow label="Reference Links">
                      {parsedLinks.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-2">
                          {parsedLinks.map((item, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1.5">
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 hover:underline font-semibold"
                              >
                                {item.original}
                              </a>
                              {idx < parsedLinks.length - 1 && <span className="text-gray-300">,</span>}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span>{viewRow.referenceLinks ? viewRow.referenceLinks.trim() : 'None'}</span>
                      )}
                    </SummaryKeyValueRow>
                    <SummaryKeyValueRow label="Name" value={viewRow.fullName || viewRow.name || 'Anonymous Client'} />
                    <SummaryKeyValueRow label="Job Title" value={viewRow.jobTitle || 'N/A'} />
                    <SummaryKeyValueRow label="Email">
                      {viewRow.email ? (
                        <a href={`mailto:${viewRow.email}`} className="text-[#34953C] hover:underline font-mono">
                          {viewRow.email}
                        </a>
                      ) : (
                        <span>N/A</span>
                      )}
                    </SummaryKeyValueRow>
                    <SummaryKeyValueRow label="Phone">
                      {viewRow.phone ? (
                        <a href={`tel:${viewRow.phone}`} className="text-gray-900 hover:text-[#34953C] font-semibold">
                          {viewRow.phone}
                        </a>
                      ) : (
                        <span>N/A</span>
                      )}
                    </SummaryKeyValueRow>
                    <SummaryKeyValueRow label="WhatsApp">
                      {viewRow.whatsapp ? (
                        <a
                          href={`https://wa.me/${viewRow.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-700 hover:underline font-semibold"
                        >
                          {viewRow.whatsapp}
                        </a>
                      ) : (
                        <span>N/A</span>
                      )}
                    </SummaryKeyValueRow>
                    <SummaryKeyValueRow label="Country" value={viewRow.country || 'N/A'} />
                    <SummaryKeyValueRow label="Contact Method" value={viewRow.preferredContactMethod || 'Email'} />
                    <SummaryKeyValueRow label="Best Time" value={viewRow.bestTimeToContact || 'Any Time'} />
                    <SummaryKeyValueRow label="Found Us Via" value={foundUsText} />
                    <SummaryKeyValueRow label="Attached Files">
                      {attachedFiles.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-2">
                          {attachedFiles.map((f, fIdx) => {
                            const targetSubmissionId = viewRow.id || viewRow._id;
                            const fileQuery = f.id ? `fileId=${encodeURIComponent(f.id)}` : `index=${fIdx}`;
                            const downloadUrl = `/api/hire-submissions/${targetSubmissionId}/files?${fileQuery}&download=1`;
                            const hasStorage = Boolean(f.url || f.fileUrl || f.localPath || f.cloudinaryUrl);
                            const fileName = f.name || f.fileName || f.filename || `Document_${fIdx + 1}`;
                            const docTypeStr = f.docType ? ` [${f.docType}]` : '';
                            return (
                              <span key={fIdx} className="inline-flex items-center gap-1.5">
                                {hasStorage ? (
                                  <a
                                    href={downloadUrl}
                                    download={fileName}
                                    className="text-[#34953C] hover:underline font-semibold"
                                    title="Download file"
                                  >
                                    {fileName}{docTypeStr}
                                  </a>
                                ) : (
                                  <span>{fileName}{docTypeStr}</span>
                                )}
                                {fIdx < attachedFiles.length - 1 && <span className="text-gray-300">,</span>}
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <span>None</span>
                      )}
                    </SummaryKeyValueRow>
                  </div>
                </div>
              </div>
            );
          })()}

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
            {modalView === 'details' ? (
              <button
                type="button"
                onClick={() => setModalView('summary')}
                className="px-3.5 py-2 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-[#2b7e32] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="View complete compiled requirement summary"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                <span>View Summary</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setModalView('details')}
                className="px-3.5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Return to details"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-gray-500" />
                <span>Back to Details</span>
              </button>
            )}
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

      {/* Image Preview Lightbox */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-2"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-gray-100">
              <span className="font-bold text-sm text-gray-800">{previewImage.name}</span>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-center max-h-[75vh] overflow-auto">
              <img
                src={previewImage.url}
                alt={previewImage.name}
                className="max-w-full max-h-[70vh] object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

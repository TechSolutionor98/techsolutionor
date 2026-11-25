"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  CornerUpLeft,
  Sparkles,
  Send,
  Trash2,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  ChevronDown,
  Check,
  FileText,
  ArrowLeft,
  Clock,
  History,
  ExternalLink
} from 'lucide-react';
import { PREBUILT_EMAIL_TEMPLATES, populateTemplate } from '@/lib/email-templates-catalog';
import { wrapWithTechSolutionorTemplate } from '@/lib/email-branded-template';

export default function AdminEmailReplyComposer({
  recipientEmail = '',
  recipientName = '',
  defaultSubject = '',
  defaultBody = '',
  category = 'general',
  originalContext = '',
  originalDate = '',
  statusOptions = [],
  currentStatus = '',
  onStatusChange,
  onSuccess,
  onBackToData,
  sourceLabel = '',
}) {
  const [replyBody, setReplyBody] = useState(defaultBody || '');
  const [replySubject, setReplySubject] = useState(defaultSubject || '');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [statusUpdate, setStatusUpdate] = useState(currentStatus || '');
  const [includeSignature, setIncludeSignature] = useState(true);
  const [composerTab, setComposerTab] = useState('write'); // 'write' | 'preview'
  const [showQuotedContext, setShowQuotedContext] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);
  const [sendSuccessMsg, setSendSuccessMsg] = useState('');
  const [sendErrorMsg, setSendErrorMsg] = useState('');

  // Conversation history for this specific user
  const [threadMessages, setThreadMessages] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const replyInputRef = useRef(null);
  const composerBoxRef = useRef(null);

  // Sync props when recipient or subject changes
  useEffect(() => {
    if (defaultSubject && !replySubject) {
      setReplySubject(defaultSubject);
    }
  }, [defaultSubject]);

  useEffect(() => {
    if (currentStatus) {
      setStatusUpdate(currentStatus);
    }
  }, [currentStatus]);

  // Fetch email thread history for this recipient
  useEffect(() => {
    if (!recipientEmail) return;
    let isCancelled = false;

    async function loadHistory() {
      try {
        setLoadingHistory(true);
        const res = await fetch(`/api/emails?email=${encodeURIComponent(recipientEmail)}`);
        if (res.ok) {
          const data = await res.json();
          if (!isCancelled) {
            setThreadMessages(data.messages || []);
          }
        }
      } catch (err) {
        console.error('Failed to load user email history:', err);
      } finally {
        if (!isCancelled) setLoadingHistory(false);
      }
    }

    loadHistory();
    return () => { isCancelled = true; };
  }, [recipientEmail]);

  // Group templates by relevance (matching category first)
  const availableTemplates = useMemo(() => {
    const list = [...PREBUILT_EMAIL_TEMPLATES];
    return list.sort((a, b) => {
      const aMatch = a.category === category ? 1 : 0;
      const bMatch = b.category === category ? 1 : 0;
      return bMatch - aMatch;
    });
  }, [category]);

  // Handle template selection
  const handleSelectTemplate = (tmplId) => {
    setSelectedTemplateId(tmplId);
    setSendErrorMsg('');
    setSendSuccessMsg('');
    if (!tmplId) return;

    const tmpl = availableTemplates.find(t => t.id === tmplId);
    if (!tmpl) return;

    const populated = populateTemplate(tmpl, {
      candidateName: recipientName || recipientEmail?.split('@')[0] || 'Valued Contact',
      name: recipientName,
      fullName: recipientName,
      position: defaultSubject?.replace(/^(re|fwd|fw):\s*/i, '')?.replace(/^Application for\s+/i, '') || 'Digital Solutions',
      service: defaultSubject?.replace(/^(re|fwd|fw):\s*/i, '') || 'Technology Services',
      companyName: 'Tech Solutionor',
      senderName: category === 'career' ? 'Talent Acquisition Team' : 'Client Relations Team',
      interviewDate: 'Upcoming business day (or your preferred time)',
      interviewLink: 'https://meet.google.com/techsolutionor',
    });

    setReplyBody(populated.bodyText);
    if (populated.subject) {
      setReplySubject(populated.subject.startsWith('Re:') ? populated.subject : `Re: ${populated.subject}`);
    }
    if (populated.recommendedStatus && statusOptions.some(o => o.value.toLowerCase() === populated.recommendedStatus.toLowerCase())) {
      const match = statusOptions.find(o => o.value.toLowerCase() === populated.recommendedStatus.toLowerCase());
      if (match) setStatusUpdate(match.value);
    }
  };

  // Live Branded HTML Preview
  const previewBrandedHtml = useMemo(() => {
    const bodyHtml = replyBody.trim()
      ? replyBody.split('\n\n').map(p => `<p style="margin: 0 0 16px; line-height: 1.6;">${p.replace(/\n/g, '<br/>')}</p>`).join('')
      : '<p style="color: #94a3b8; font-style: italic;">Start typing your reply or choose a pre-built template from the dropdown above to preview the branded email...</p>';

    return wrapWithTechSolutionorTemplate({
      contentHtml: bodyHtml,
      subject: replySubject || `Re: Communication from Tech Solutionor`,
      recipientName: recipientName || 'Recipient',
      includeSignature,
    });
  }, [replyBody, replySubject, recipientName, includeSignature]);

  // Send Reply Email Handler
  const handleSendReply = async (e) => {
    e?.preventDefault();
    setSendErrorMsg('');
    setSendSuccessMsg('');

    const targetEmail = (recipientEmail || '').trim();
    if (!targetEmail) {
      setSendErrorMsg('Recipient email is missing.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)) {
      setSendErrorMsg('Valid recipient email address is required.');
      return;
    }
    if (!replyBody.trim()) {
      setSendErrorMsg('Please write your response message before sending.');
      return;
    }

    try {
      setSendingReply(true);

      let finalBodyHtml = replyBody
        .split('\n\n')
        .map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`)
        .join('');

      // Append quoted original message context if enabled
      if (showQuotedContext && originalContext) {
        const dateStr = originalDate ? new Date(originalDate).toLocaleString() : 'earlier';
        const senderStr = `${recipientName || 'Sender'} <${targetEmail}>`;
        const snippetText = (originalContext || '').replace(/\n/g, '<br/>');

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
          to: targetEmail,
          toName: recipientName || targetEmail.split('@')[0],
          subject: replySubject || `Re: Communication from Tech Solutionor`,
          bodyText: replyBody,
          bodyHtml: finalBodyHtml,
          templateId: selectedTemplateId || null,
          statusUpdate: statusUpdate || undefined,
          category: category || 'general',
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data.success === false) {
        throw new Error(data.deliveryError || data.error || 'Failed to dispatch email. Please check SMTP configuration.');
      }

      setSendSuccessMsg(`Reply email successfully delivered to ${targetEmail}.`);

      // Append sent email to conversation thread view immediately
      const newLocalMsg = {
        id: data.messageId || Date.now().toString(),
        direction: 'outbound',
        from: { name: 'Tech Solutionor HR', email: 'hr@techsolutionor.com' },
        to: [{ name: recipientName, email: targetEmail }],
        subject: replySubject,
        bodyText: replyBody,
        bodyHtml: finalBodyHtml,
        deliveryStatus: 'sent',
        createdAt: new Date().toISOString(),
      };
      setThreadMessages(prev => [...prev, newLocalMsg]);

      setReplyBody('');
      setSelectedTemplateId('');
      setComposerTab('write');
      setShowQuotedContext(false);

      // Trigger bell count refresh
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-notifications-refresh'));
      }

      // If status update callback provided, trigger parent DB status sync
      if (statusUpdate && onStatusChange) {
        try {
          await onStatusChange(statusUpdate);
        } catch (_) {}
      }

      if (onSuccess) {
        onSuccess({
          messageId: data.messageId,
          threadId: data.threadId,
          subject: replySubject,
          bodyText: replyBody,
          statusUpdate,
        });
      }
    } catch (err) {
      console.error('Email send failed:', err);
      setSendErrorMsg(err.message || 'An error occurred while sending the email.');
    } finally {
      setSendingReply(false);
    }
  };

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
    <div className="space-y-4 text-left">
      {/* 0. Top Navigation Switcher: Back to Data View */}
      {onBackToData && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
          <button
            type="button"
            onClick={onBackToData}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-gray-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-lg shadow-2xs transition-all cursor-pointer w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to {sourceLabel ? `${sourceLabel} Data` : 'Submission Data'}</span>
          </button>

          <div className="text-xs text-gray-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#34953C]"></span>
            <span>
              Managing emails for <strong className="text-gray-900">{recipientName}</strong> &lt;{recipientEmail}&gt;
            </span>
          </div>
        </div>
      )}

      {/* 1. User Email Conversation History Thread */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        <div className="bg-[#f8fafc] px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#34953C]" />
            <h4 className="text-xs font-bold text-gray-900">
              Email History with {recipientName || 'User'}
            </h4>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              {threadMessages.length} {threadMessages.length === 1 ? 'Message' : 'Messages'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              composerBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => replyInputRef.current?.focus(), 150);
            }}
            className="text-xs font-bold text-[#34953C] hover:text-[#23732a] flex items-center gap-1 cursor-pointer"
          >
            <CornerUpLeft className="w-3.5 h-3.5" />
            <span>Write New Email</span>
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-[360px] overflow-y-auto bg-gray-50/50">
          {loadingHistory ? (
            <div className="py-8 text-center text-xs text-gray-400">
              <Loader2 className="w-4 h-4 animate-spin mx-auto mb-2 text-[#34953C]" />
              Loading email history...
            </div>
          ) : threadMessages.length === 0 ? (
            <div className="py-6 px-4 text-center text-xs text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
              <Mail className="w-6 h-6 text-gray-300 mx-auto mb-1.5" />
              <p className="font-semibold text-gray-700">No previous email correspondence yet.</p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Use the reply composer below to dispatch the first official email to <strong className="text-gray-600">{recipientEmail}</strong>.
              </p>
            </div>
          ) : (
            threadMessages.map((msg, idx) => {
              const isInbound = msg.direction === 'inbound';
              return (
                <div
                  key={msg.id || idx}
                  className={`p-3.5 rounded-xl border transition-all text-xs ${
                    isInbound
                      ? 'bg-white border-gray-200'
                      : 'bg-white border-emerald-200 border-l-4 border-l-[#34953C]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-gray-100">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                        isInbound ? 'bg-indigo-100 text-indigo-700' : 'bg-[#34953C] text-white'
                      }`}>
                        {isInbound ? (msg.from?.name?.charAt(0) || 'U') : 'TS'}
                      </div>
                      <div className="min-w-0 truncate">
                        <span className="font-bold text-gray-900 mr-1.5">
                          {isInbound ? (msg.from?.name || recipientName) : 'Tech Solutionor Official'}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {isInbound ? `<${recipientEmail}>` : '<hr@techsolutionor.com>'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-gray-400">
                        {formatDate(msg.createdAt)} {formatTime(msg.createdAt)}
                      </span>
                      {!isInbound && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Sent
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-gray-800 text-[11px] leading-relaxed break-words font-sans space-y-1">
                    <div className="font-semibold text-gray-900 mb-1">Subject: {msg.subject}</div>
                    <div
                      className="whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: msg.bodyHtml || msg.bodyText?.replace(/\n/g, '<br/>') || '' }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 2. Interactive Reply Composer Box */}
      <div ref={composerBoxRef} className="bg-white rounded-2xl border border-gray-300 shadow-sm overflow-hidden transition-all text-left">
        {/* Composer Top Bar */}
        <div className="bg-[#f8fafc] border-b border-gray-200 px-4 py-3 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#34953C] flex items-center justify-center shrink-0">
              <CornerUpLeft className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs text-gray-700">
              Reply to <strong className="text-gray-900">{recipientName || 'Client'}</strong>
              <span className="text-gray-400 font-mono text-[11px] ml-1.5 hidden sm:inline">&lt;{recipientEmail}&gt;</span>
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
                className="bg-transparent text-xs font-semibold text-gray-900 outline-none cursor-pointer max-w-[200px] sm:max-w-[260px] truncate"
              >
                <option value="">-- Choose Pre-built Template --</option>
                {availableTemplates.map(tmpl => (
                  <option key={tmpl.id} value={tmpl.id}>
                    {tmpl.category === category ? '⭐ ' : ''}{tmpl.label}
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

        {/* Feedback Banners */}
        {sendSuccessMsg && (
          <div className="mx-4 mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-800 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{sendSuccessMsg}</div>
            <button
              type="button"
              onClick={() => setSendSuccessMsg('')}
              className="text-emerald-500 hover:text-emerald-800 cursor-pointer"
            >
              &times;
            </button>
          </div>
        )}

        {sendErrorMsg && (
          <div className="mx-4 mt-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-800 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{sendErrorMsg}</div>
            <button
              type="button"
              onClick={() => setSendErrorMsg('')}
              className="text-red-500 hover:text-red-800 cursor-pointer"
            >
              &times;
            </button>
          </div>
        )}

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

        {/* Composer Content Tabs */}
        {composerTab === 'write' ? (
          <div className="p-4 space-y-3">
            <textarea
              ref={replyInputRef}
              rows={6}
              value={replyBody}
              onChange={e => setReplyBody(e.target.value)}
              placeholder={`Write your reply to ${recipientName || 'the recipient'}...\nTip: Select a template from the dropdown above to auto-populate ready-to-send content, then customize as needed.`}
              className="w-full text-xs sm:text-sm text-gray-900 leading-relaxed outline-none resize-y min-h-[140px] font-sans placeholder:text-gray-400 selection:bg-emerald-100"
            />

            {/* Quoted Original Message Context */}
            {originalContext && (
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowQuotedContext(prev => !prev)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-mono transition cursor-pointer"
                    title="Toggle original quoted text"
                  >
                    <span className="font-bold">...</span>
                    <span className="text-[10px] font-sans font-medium text-gray-600">
                      {showQuotedContext ? 'Hide quoted text' : 'Show quoted original message'}
                    </span>
                  </button>

                  <span className="text-[11px] text-gray-400 hidden sm:inline">
                    Formatted with Tech Solutionor official header logo &amp; social links upon sending
                  </span>
                </div>

                {showQuotedContext && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-2 border-l-gray-400 text-xs text-gray-600 font-mono space-y-1">
                    <div className="text-[11px] text-gray-500 font-sans font-bold">Original Message Context:</div>
                    <div className="text-[11px]">
                      From: {recipientName} &lt;{recipientEmail}&gt;
                    </div>
                    <blockquote className="pl-2 border-l border-gray-300 text-gray-700 italic font-sans text-xs mt-1 whitespace-pre-wrap max-h-40 overflow-y-auto">
                      {originalContext}
                    </blockquote>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Live Tech Solutionor Branded Preview */
          <div className="p-4 bg-gray-100 space-y-2.5">
            <div className="flex items-center justify-between text-xs px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-medium">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#34953C]" />
                <span><strong>Official Email Preview:</strong> Tech Solutionor top logo, customized message body, HR signature, and social footer.</span>
              </span>
              <span className="text-[11px] text-emerald-700 font-bold hidden sm:inline">Gmail / Outlook Ready</span>
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-300 shadow-2xs bg-white">
              <iframe
                title="Tech Solutionor Branded Email Preview"
                srcDoc={previewBrandedHtml}
                className="w-full h-[440px] border-0"
              />
            </div>
          </div>
        )}

        {/* Bottom Action Toolbar */}
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
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Sending Email...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send from hr@techsolutionor.com</span>
                </>
              )}
            </button>

            {statusOptions.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-gray-500 font-medium">Update Status:</span>
                <select
                  value={statusUpdate}
                  onChange={e => setStatusUpdate(e.target.value)}
                  className="border border-gray-300 bg-white rounded-md px-2 py-1 text-xs font-semibold text-gray-800 outline-none cursor-pointer focus:border-[#34953C]"
                >
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
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
  );
}

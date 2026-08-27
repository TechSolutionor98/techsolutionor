"use client";
import React, { useState } from 'react';
import { FiActivity, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ACTION_LABELS = {
  scan_routes: { label: 'Scanned Routes', color: 'bg-blue-100 text-blue-700', icon: '🔍' },
  update_content: { label: 'Updated Content', color: 'bg-green-100 text-green-700', icon: '✏️' },
  update_seo: { label: 'Updated SEO', color: 'bg-purple-100 text-purple-700', icon: '🔎' },
  delete_seo: { label: 'Deleted SEO', color: 'bg-red-100 text-red-700', icon: '🗑️' },
  upload_media: { label: 'Uploaded Media', color: 'bg-yellow-100 text-yellow-700', icon: '📷' },
  delete_media: { label: 'Deleted Media', color: 'bg-red-100 text-red-700', icon: '🗑️' },
  create_user: { label: 'Created User', color: 'bg-indigo-100 text-indigo-700', icon: '👤' },
  update_user: { label: 'Updated User', color: 'bg-violet-100 text-violet-700', icon: '👤' },
  delete_user: { label: 'Deleted User', color: 'bg-rose-100 text-rose-700', icon: '🗑️' },
  toggle_user_status: { label: 'Toggled User Status', color: 'bg-slate-100 text-slate-700', icon: '🔄' },
  create_website: { label: 'Added Website', color: 'bg-teal-100 text-teal-700', icon: '🌐' },
  deactivate_website: { label: 'Deactivated Website', color: 'bg-amber-100 text-amber-700', icon: '🛑' },
  update_settings: { label: 'Updated Settings', color: 'bg-orange-100 text-orange-700', icon: '⚙️' },
  login: { label: 'Logged In', color: 'bg-emerald-100 text-emerald-700', icon: '🔑' },
  logout: { label: 'Logged Out', color: 'bg-zinc-100 text-zinc-700', icon: '🔒' },
  contact_submission: { label: 'Contact Inquiry', color: 'bg-cyan-100 text-cyan-700', icon: '✉️' },
  career_application_submitted: { label: 'Career Application', color: 'bg-sky-100 text-sky-700', icon: '📄' },
  create_review: { label: 'Created Review', color: 'bg-green-100 text-green-700', icon: '⭐' },
  update_review: { label: 'Updated Review', color: 'bg-teal-100 text-teal-700', icon: '⭐' },
  delete_review: { label: 'Deleted Review', color: 'bg-rose-100 text-rose-700', icon: '🗑️' },
  update_logo: { label: 'Updated Logo', color: 'bg-orange-100 text-orange-700', icon: '🖼️' },
};

export default function ActivityClient({ initialLogs = [], initialTotal = 0, apiBase }) {
  const [logs, setLogs] = useState(initialLogs);
  const [total, setTotal] = useState(initialTotal);
  const [actionFilter, setActionFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchLogs = async (page = 1, action = '') => {
    try {
      const params = new URLSearchParams({ websiteId: 'all', limit: '50', page: page.toString() });
      if (action) params.set('action', action);

      const res = await fetch(`${apiBase}/api/cms/activity?${params}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
        setTotal(data.total || 0);
        setCurrentPage(page);
      }
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    }
  };

  const getActionDisplay = (action) => {
    return ACTION_LABELS[action] || { label: action, color: 'bg-gray-100 text-gray-700', icon: '📝' };
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const totalPages = Math.ceil(total / 50);

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-3">
          <FiFilter className="text-gray-400" />
          <select
            value={actionFilter}
            onChange={(e) => { setActionFilter(e.target.value); fetchLogs(1, e.target.value); }}
            className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 text-sm
                       focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none"
          >
            <option value="">All Actions</option>
            {Object.entries(ACTION_LABELS).map(([key, val]) => (
              <option key={key} value={key}>{val.icon} {val.label}</option>
            ))}
          </select>
          <span className="text-sm text-gray-500 ml-auto">{total} entries</span>
        </div>
      </div>

      {/* Activity Timeline */}
      {logs.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <FiActivity className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Activity Yet</h3>
          <p className="text-sm text-gray-400">Actions will appear here as they happen.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow divide-y divide-gray-100">
          {logs.map(log => {
            const actionDisplay = getActionDisplay(log.action);
            return (
              <div key={log._id} className="flex items-start gap-4 p-4 hover:bg-gray-50 transition">
                <div className="text-2xl mt-0.5">{actionDisplay.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${actionDisplay.color}`}>
                      {actionDisplay.label}
                    </span>
                    {log.target && (
                      <code className="text-xs text-gray-500 font-mono bg-gray-100 px-1.5 py-0.5 rounded truncate max-w-[200px]">
                        {log.target}
                      </code>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    by <span className="font-medium text-gray-800">{log.userName || 'System'}</span>
                  </p>
                  {log.details && Object.keys(log.details).length > 0 && (
                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                      {JSON.stringify(log.details).slice(0, 100)}
                    </p>
                  )}
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{formatTime(log.createdAt)}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => fetchLogs(currentPage - 1, actionFilter)}
            disabled={currentPage <= 1}
            className="p-2 rounded border border-gray-300 disabled:opacity-30 hover:bg-gray-50"
          >
            <FiChevronLeft size={16} />
          </button>
          <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => fetchLogs(currentPage + 1, actionFilter)}
            disabled={currentPage >= totalPages}
            className="p-2 rounded border border-gray-300 disabled:opacity-30 hover:bg-gray-50"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

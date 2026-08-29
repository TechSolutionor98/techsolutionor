"use client"
import React, { useState, useMemo, useEffect } from 'react';

export default function ContactTableClient({ initialData = [], apiBase = process.env.NEXT_PUBLIC_API_URL }) {
  const [rows, setRows] = useState(initialData || []);
  const [query, setQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [viewRow, setViewRow] = useState(null);

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
    const quoteCount = sorted.filter(r => (r.source || '').toLowerCase().includes('quote')).length;
    const contactCount = sorted.filter(r => !(r.source || '').toLowerCase().includes('quote')).length;
    return {
      all: sorted.length,
      quote: quoteCount,
      contact: contactCount
    };
  }, [sorted]);

  const filtered = useMemo(() => {
    let result = sorted;

    // Filter by source
    if (sourceFilter === 'quote') {
      result = result.filter(r => (r.source || '').toLowerCase().includes('quote'));
    } else if (sourceFilter === 'contact') {
      result = result.filter(r => !(r.source || '').toLowerCase().includes('quote'));
    }

    // Filter by search query
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(r => (
        (r.name || '').toString().toLowerCase().includes(q) ||
        (r.email || '').toString().toLowerCase().includes(q) ||
        (r.phone || '').toString().toLowerCase().includes(q) ||
        (r.country || '').toString().toLowerCase().includes(q) ||
        (r.serviceRequired || '').toString().toLowerCase().includes(q) ||
        (r.budget || '').toString().toLowerCase().includes(q) ||
        (r.preferredDate || '').toString().toLowerCase().includes(q) ||
        (r.source || '').toString().toLowerCase().includes(q) ||
        (r.message || '').toString().toLowerCase().includes(q)
      ));
    }

    return result;
  }, [sorted, query, sourceFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  async function refresh() {
    try {
      setLoading(true);
      const baseUrl = apiBase || '';
      const res = await fetch(`${baseUrl}/api/contact-submissions`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setRows(data);
      setPage(1);
    } catch (err) {
      console.error('Failed to refresh:', err);
      alert('Failed to refresh: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  function downloadCSV() {
    if (!rows || rows.length === 0) return alert('No data');
    const headers = ['#', 'Source', 'Name', 'Phone', 'Email', 'Country', 'Service Required', 'Budget', 'Preferred Date', 'Message', 'Submitted At'];
    const csv = [headers.join(',')].concat(rows.map((r, i) => {
      const vals = [
        i + 1,
        r.source || 'Contact Us Form',
        r.name,
        r.phone,
        r.email,
        r.country || r.propertyLocation || '',
        r.serviceRequired,
        r.budget || '',
        r.preferredDate || '',
        r.message,
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
    a.download = 'contact_and_quote_submissions.csv'; 
    document.body.appendChild(a); 
    a.click(); 
    a.remove();
    URL.revokeObjectURL(url);
  }

  const getGlobalIndex = (pageIndex) => (page - 1) * pageSize + pageIndex + 1;

  const isQuoteSource = (src) => (src || '').toLowerCase().includes('quote');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full">
      {/* Top Filter Tabs & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Source Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-lg text-xs font-semibold">
            {[
              { key: 'all', label: 'All Submissions', count: counts.all },
              { key: 'quote', label: 'Get A Quote', count: counts.quote },
              { key: 'contact', label: 'Contact Us', count: counts.contact },
            ].map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => { setSourceFilter(tab.key); setPage(1); }}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  sourceFilter === tab.key
                    ? 'bg-white text-[#34953C] shadow-xs font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  sourceFilter === tab.key ? 'bg-gray-100 text-[#34953C]' : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-2">
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search name, email, phone, service, budget..."
              className="border border-[#34953C] focus:border-[#34953C] px-3 py-1.5 rounded-lg w-72 text-xs outline-none transition-all"
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setPage(1); }}
                className="px-2.5 py-1.5 bg-gray-100 hover:bg-[#34953C] hover:text-white rounded-lg text-xs transition-all cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className={`px-3.5 py-1.5 rounded-lg bg-[#34953C] hover:bg-[#2b7e32] text-white font-semibold text-xs shadow-xs ${loading ? 'opacity-60' : ''} transition-all cursor-pointer`}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <button
            onClick={downloadCSV}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Page size selector */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Rows per page:</span>
          <select
            value={pageSize}
            onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="border border-gray-300 rounded-md px-2 py-1 text-xs outline-none focus:border-[#34953C] cursor-pointer"
          >
            {[10, 25, 50, 100].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="text-xs text-gray-500 font-medium">
          Showing {Math.min(filtered.length, (page - 1) * pageSize + 1)} - {Math.min(filtered.length, page * pageSize)} of {filtered.length} submissions
        </div>
      </div>

      {/* Submissions Table */}
      <div style={{ overflowX: "auto", maxHeight: "540px", overflowY: "auto" }} className="w-full rounded-lg border border-gray-200">
        <table style={{ whiteSpace: "nowrap" }} className="w-full text-xs text-left">
          <thead className="bg-[#34953C] text-white sticky top-0 z-10">
            <tr>
              <th className="px-3.5 py-3 text-left font-semibold w-12">#</th>
              <th className="px-3.5 py-3 text-left font-semibold">Source</th>
              <th className="px-3.5 py-3 text-left font-semibold">Customer Name</th>
              <th className="px-3.5 py-3 text-left font-semibold">Phone</th>
              <th className="px-3.5 py-3 text-left font-semibold">Email</th>
              <th className="px-3.5 py-3 text-left font-semibold">Service</th>
              <th className="px-3.5 py-3 text-left font-semibold">Budget</th>
              <th className="px-3.5 py-3 text-left font-semibold">Preferred Date</th>
              <th className="px-3.5 py-3 text-left font-semibold max-w-[220px]">Message</th>
              <th className="px-3.5 py-3 text-left font-semibold w-36">Submitted At</th>
              <th className="px-3.5 py-3 text-right font-semibold w-20">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-4 py-12 text-center text-gray-400 font-medium">
                  No submissions found.
                </td>
              </tr>
            ) : (
              pageData.map((s, idx) => {
                const isQuote = isQuoteSource(s.source);
                const dt = s.createdAt ? new Date(s.createdAt) : null;
                const formattedDate = dt ? dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
                const formattedTime = dt ? dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';

                return (
                  <tr key={s.id ?? s._id ?? idx} className="hover:bg-gray-50/80 align-middle transition-all">
                    <td className="px-3.5 py-3 font-semibold text-[#34953C]">{getGlobalIndex(idx)}</td>

                    {/* Source Badge */}
                    <td className="px-3.5 py-3">
                      {isQuote ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Get A Quote
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                          Contact Us
                        </span>
                      )}
                    </td>

                    {/* Customer Name */}
                    <td className="px-3.5 py-3 font-bold text-gray-900">{s.name || '—'}</td>

                    {/* Phone */}
                    <td className="px-3.5 py-3 font-medium text-gray-700">{s.phone || '—'}</td>

                    {/* Email */}
                    <td className="px-3.5 py-3 text-gray-600 font-mono text-[11px]">{s.email || '—'}</td>

                    {/* Service */}
                    <td className="px-3.5 py-3">
                      <span className="font-medium text-gray-800">{s.serviceRequired || '—'}</span>
                    </td>

                    {/* Budget */}
                    <td className="px-3.5 py-3">
                      <span className="text-gray-700 font-semibold">{s.budget || '—'}</span>
                    </td>

                    {/* Preferred Date */}
                    <td className="px-3.5 py-3 text-gray-600 font-medium">
                      {s.preferredDate || '—'}
                    </td>

                    {/* Message Preview */}
                    <td className="px-3.5 py-3 text-gray-600 truncate max-w-[200px]" title={s.message}>
                      {s.message || '—'}
                    </td>

                    {/* Submitted At */}
                    <td className="px-3.5 py-3 text-[11px] text-gray-500 whitespace-nowrap">
                      <div className="font-semibold text-gray-700">{formattedDate}</div>
                      <div className="text-gray-400">{formattedTime}</div>
                    </td>

                    {/* Action */}
                    <td className="px-3.5 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => setViewRow({ ...s, inquiryNo: getGlobalIndex(idx) })}
                        className="px-2.5 py-1 bg-[#34953C] hover:bg-[#2b7e32] text-white text-[11px] font-bold rounded transition cursor-pointer shadow-xs"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setViewRow(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[620px] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#34953C] rounded-t-2xl px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-white text-lg font-bold">Submission #{viewRow.inquiryNo}</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  isQuoteSource(viewRow.source) 
                    ? 'bg-emerald-200 text-emerald-900' 
                    : 'bg-blue-200 text-blue-900'
                }`}>
                  {viewRow.source || 'Contact Us Form'}
                </span>
              </div>
              <button
                onClick={() => setViewRow(null)}
                className="text-white/80 hover:text-white text-2xl font-bold cursor-pointer leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Name</p>
                  <p className="text-gray-900 font-bold text-sm">{viewRow.name || '—'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Phone</p>
                  <p className="text-gray-900 font-semibold text-sm">{viewRow.phone || '—'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-gray-900 font-mono text-xs break-all">{viewRow.email || '—'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Country / Location</p>
                  <p className="text-gray-900 font-semibold text-sm">{viewRow.country || viewRow.propertyLocation || '—'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Service Required</p>
                  <p className="text-gray-900 font-semibold text-sm">{viewRow.serviceRequired || '—'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Budget</p>
                  <p className="text-gray-900 font-semibold text-sm">{viewRow.budget || '—'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Preferred Date</p>
                  <p className="text-gray-900 font-semibold text-sm">{viewRow.preferredDate || '—'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Submitted At</p>
                  <p className="text-gray-900 text-xs font-semibold">
                    {viewRow.createdAt ? new Date(viewRow.createdAt).toLocaleString() : '—'}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">Message / Project Details</p>
                <div className="bg-gray-50 rounded-lg p-4 text-xs sm:text-sm text-gray-800 whitespace-pre-wrap break-words min-h-[90px] border border-gray-200">
                  {viewRow.message || 'No additional details provided.'}
                </div>
              </div>

              <button
                onClick={() => setViewRow(null)}
                className="w-full bg-[#34953C] hover:bg-[#2b7e32] text-white rounded-lg h-[40px] font-bold text-xs uppercase tracking-wide cursor-pointer transition-colors"
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

"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Phone, Mail, DollarSign, Calendar, Briefcase, MapPin, Clock } from 'lucide-react';

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
    <div className="w-full">
      {/* Total Submissions Header */}
      <p className="text-sm text-gray-600 mb-3 font-medium">
        <span className="font-bold text-gray-800">Total Submissions:</span> {rows.length}
      </p>

      {/* Row 1: Source Filter Tabs on Left | Action Buttons on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
        {/* Source Filter Tabs */}
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
                  ? 'bg-white text-[#34953C] font-bold'
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

      {/* Row 2: Search Bar placed below filter buttons | Rows per page & Count on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
        {/* Search Bar */}
        <div className="relative flex items-center w-full sm:w-80 md:w-96">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 pointer-events-none" />
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search name, email, phone, service, budget..."
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

      {/* Submissions Table - subtle 1px border */}
      <div style={{ overflowX: "auto", maxHeight: "620px", overflowY: "auto" }} className="w-full border border-gray-200 rounded-lg">
        <table style={{ whiteSpace: "nowrap" }} className="w-full text-xs text-left">
          <thead className="bg-[#34953C] text-white sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2.5 text-left font-semibold min-w-[220px]">Author</th>
              <th className="px-4 py-2.5 text-left font-semibold max-w-[320px]">Message</th>
              <th className="px-4 py-2.5 text-left font-semibold min-w-[140px]">Service</th>
              <th className="px-4 py-2.5 text-left font-semibold w-28">Source</th>
              <th className="px-4 py-2.5 text-left font-semibold w-36">Submitted At</th>
              <th className="px-4 py-2.5 text-right font-semibold w-20">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-400 font-medium">
                  No submissions found.
                </td>
              </tr>
            ) : (
              pageData.map((s, idx) => {
                const isQuote = isQuoteSource(s.source);
                const dt = s.createdAt ? new Date(s.createdAt) : null;
                const formattedDate = dt ? dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
                const formattedTime = dt ? dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
                const initial = s.name ? s.name.trim().charAt(0).toUpperCase() : (s.email ? s.email.trim().charAt(0).toUpperCase() : 'U');

                return (
                  <tr key={s.id ?? s._id ?? idx} className="hover:bg-gray-50/80 align-middle transition-all">
                    {/* 1. Author Column: Profile avatar on left, Name inline, Email on line below */}
                    <td className="px-4 py-2.5 text-left align-middle min-w-[220px]">
                      <div className="flex flex-col space-y-0.5">
                        <div className="flex items-center gap-2 min-w-0">
                          {s.avatar || s.profileImage ? (
                            <img
                              src={s.avatar || s.profileImage}
                              alt={s.name || 'User'}
                              className="w-7 h-7 rounded-full object-cover shrink-0"
                            />
                          ) : (
                            <div className="w-7 h-7 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                              {initial}
                            </div>
                          )}
                          <span className="font-bold text-gray-900 text-xs break-words min-w-0 leading-tight">
                            {s.name || 'Anonymous'}
                          </span>
                        </div>

                        {s.email && (
                          <div className="text-[11px] text-gray-500 font-mono break-all leading-normal">
                            {s.email}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* 2. Message Preview */}
                    <td className="px-4 py-2.5 align-middle text-gray-600 truncate max-w-[320px]" title={s.message}>
                      {s.message || '—'}
                    </td>

                    {/* 3. Service */}
                    <td className="px-4 py-2.5 align-middle">
                      <span className="font-medium text-gray-800 text-xs">{s.serviceRequired || '—'}</span>
                    </td>

                    {/* 4. Source Badge */}
                    <td className="px-4 py-2.5 align-middle">
                      {isQuote ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Get A Quote
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                          Contact Us
                        </span>
                      )}
                    </td>

                    {/* 5. Submitted At */}
                    <td className="px-4 py-2.5 align-middle text-[11px] text-gray-500 whitespace-nowrap">
                      <div className="font-semibold text-gray-700 leading-tight">{formattedDate}</div>
                      <div className="text-gray-400 text-[10px] leading-tight">{formattedTime}</div>
                    </td>

                    {/* 6. Action */}
                    <td className="px-4 py-2.5 text-right align-middle whitespace-nowrap">
                      <button
                        onClick={() => setViewRow({ ...s, inquiryNo: getGlobalIndex(idx) })}
                        className="px-3 py-1 bg-[#34953C] hover:bg-[#2b7e32] text-white text-[11px] font-bold rounded-md transition cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6" onClick={() => setViewRow(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[780px] max-h-[92vh] flex flex-col overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
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
                    Submission Details
                  </h2>
                  <p className="text-white/80 text-[11px] font-medium">
                    Inquiry #{viewRow.inquiryNo}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-2xs ${
                  isQuoteSource(viewRow.source) 
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300/60' 
                    : 'bg-blue-100 text-blue-900 border border-blue-300/60'
                }`}>
                  {viewRow.source || 'Contact Us Form'}
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
              {/* 1. Author Profile Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-gray-50/90 border border-gray-200/80">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl sm:text-2xl border-2 border-emerald-200/80 shrink-0">
                    {viewRow.name ? viewRow.name.trim().charAt(0).toUpperCase() : (viewRow.email ? viewRow.email.trim().charAt(0).toUpperCase() : 'U')}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug truncate">
                      {viewRow.name || 'Anonymous'}
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

                {viewRow.email && (
                  <a
                    href={`mailto:${viewRow.email}`}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 shadow-2xs transition-all shrink-0 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-gray-500" />
                    <span>Reply via Email</span>
                  </a>
                )}
              </div>

              {/* 2. Structured Key Info Grid (Phone, Budget, Preferred Date, Service, Location, Submitted At) */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
                  Inquiry Specifications
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

                  {/* Budget */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Estimated Budget</span>
                    </div>
                    <div>
                      {viewRow.budget ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                          {viewRow.budget}
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-gray-400">—</span>
                      )}
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Preferred Date</span>
                    </div>
                    <div>
                      {viewRow.preferredDate ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200/80">
                          {viewRow.preferredDate}
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-gray-400">—</span>
                      )}
                    </div>
                  </div>

                  {/* Service Required */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Service Required</span>
                    </div>
                    <span className="text-xs font-bold text-gray-900 truncate">
                      {viewRow.serviceRequired || '—'}
                    </span>
                  </div>

                  {/* Country / Location */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Country / Location</span>
                    </div>
                    <span className="text-xs font-bold text-gray-900 truncate">
                      {viewRow.country || viewRow.propertyLocation || '—'}
                    </span>
                  </div>

                  {/* Submitted At */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Submitted At</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">
                      {viewRow.createdAt ? new Date(viewRow.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Message / Project Details Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Message / Project Details
                  </span>
                  {viewRow.message && (
                    <span className="text-[11px] text-gray-400 font-medium">
                      {viewRow.message.length} characters
                    </span>
                  )}
                </div>
                <div className="bg-gray-50/90 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-gray-800 whitespace-pre-wrap break-words border border-gray-200/80 leading-relaxed min-h-[100px]">
                  {viewRow.message || <span className="text-gray-400 italic">No additional details or message provided with this submission.</span>}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 sm:px-8 py-3.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-gray-400 font-medium hidden sm:inline">
                Submission #{viewRow.inquiryNo} &bull; {viewRow.source || 'Contact Us Form'}
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

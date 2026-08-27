"use client"
import React, { useState, useMemo, useEffect } from 'react';

export default function ContactTableClient({ initialData = [], apiBase = process.env.NEXT_PUBLIC_API_URL }) {
  const [rows, setRows] = useState(initialData || []);
  const [query, setQuery] = useState('');
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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(r => (
      (r.name || '').toString().toLowerCase().includes(q) ||
      (r.email || '').toString().toLowerCase().includes(q) ||
      (r.phone || '').toString().toLowerCase().includes(q) ||
      (r.serviceRequired || '').toString().toLowerCase().includes(q) ||
      (r.propertyLocation || '').toString().toLowerCase().includes(q) ||
      (r.message || '').toString().toLowerCase().includes(q)
    ));
  }, [sorted, query]);

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
    const headers = ['#', 'Name', 'Phone', 'Email', 'Service Required', 'Property Location', 'Message', 'Submitted At'];
    const csv = [headers.join(',')].concat(rows.map((r, i) => {
      const vals = [
        i + 1,
        r.name,
        r.phone,
        r.email,
        r.serviceRequired,
        r.propertyLocation,
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
    a.href = url; a.download = 'contact_submissions.csv'; document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }

  // Get the global index for a row on current page
  const getGlobalIndex = (pageIndex) => (page - 1) * pageSize + pageIndex + 1;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search name, email, phone, subject..."
            className="border border-[#20507C] focus:border-[#20507C] p-2 rounded-lg w-80 outline-none transition-all"
          />
          <button
            onClick={() => { setQuery(''); setPage(1); }}
            className="px-3 py-2 bg-gray-100 hover:bg-[#E46704] hover:text-white rounded-lg transition-all"
          >
            Clear
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className={`px-3 py-2 rounded-lg bg-[#20507C] hover:bg-[#E46704] text-white font-semibold shadow ${loading ? 'opacity-60' : ''} transition-all`}
          >
            Refresh
          </button>
          <button
            onClick={downloadCSV}
            className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-800 text-white font-semibold shadow transition-all"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Page size selector */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-600">Rows per page:</span>
        <select
          value={pageSize}
          onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#20507C] cursor-pointer"
        >
          {[10, 25, 50, 100].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div style={{ overflowX: "auto", maxHeight: "520px", overflowY: "auto" }} className="w-full rounded-lg border border-gray-200">
        <table style={{ whiteSpace: "nowrap" }} className="w-full text-sm overflow-hidden">
          <thead className="bg-[#20507C] text-white">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-sm w-16">#</th>
              <th className="px-4 py-3 text-left font-semibold text-sm">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-sm">Phone</th>
              <th className="px-4 py-3 text-left font-semibold text-sm">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-sm">Service Required</th>
              <th className="px-4 py-3 text-left font-semibold text-sm">Location</th>
              <th className="px-4 py-3 text-left font-semibold text-sm max-w-[200px]">Message</th>
              <th className="px-4 py-3 text-left font-semibold text-sm w-40">Submitted At</th>
              <th className="px-4 py-3 text-left font-semibold text-sm w-24">Action</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((s, idx) => (
              <tr key={s.id ?? s._id ?? idx} className="hover:bg-[#e6f9f0] align-top transition-all">
                <td className="px-4 py-3 border-b border-gray-100 align-top font-semibold text-[#20507C]">{getGlobalIndex(idx)}</td>
                <td className="px-4 py-3 border-b border-gray-100 align-top overflow-hidden text-ellipsis">{s.name}</td>
                <td className="px-4 py-3 border-b border-gray-100 align-top overflow-hidden text-ellipsis">{s.phone}</td>
                <td className="px-4 py-3 border-b border-gray-100 align-top overflow-hidden text-ellipsis">{s.email}</td>
                <td className="px-4 py-3 border-b border-gray-100 align-top overflow-hidden text-ellipsis">
                  {s.serviceRequired}
                </td>
                <td className="px-4 py-3 border-b border-gray-100 align-top overflow-hidden text-ellipsis">{s.propertyLocation}</td>
                <td className="px-4 py-3 border-b border-gray-100 align-top overflow-hidden text-ellipsis whitespace-nowrap">
                  {(s.message || '').length > 30 ? s.message.substring(0, 30) + '...' : s.message}
                </td>
                <td className="px-4 py-3 border-b border-gray-100 align-top">
                  {s.createdAt ? new Date(s.createdAt).toLocaleString() : ''}
                </td>
                <td className="px-4 py-3 border-b border-gray-100 align-top">
                  <button
                    onClick={() => setViewRow({ ...s, inquiryNo: getGlobalIndex(idx) })}
                    className="px-3 py-1.5 bg-[#E46704] hover:bg-[#0a5a47] text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Showing {Math.min(filtered.length, (page - 1) * pageSize + 1)} - {Math.min(filtered.length, page * pageSize)} of {filtered.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 bg-white hover:bg-[#e6f9f0] transition-all"
          >
            Prev
          </button>
          <div className="px-4 py-2 font-semibold">{page} / {totalPages}</div>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 bg-white hover:bg-[#e6f9f0] transition-all"
          >
            Next
          </button>
        </div>
      </div>

      {/* View Detail Popup */}
      {viewRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setViewRow(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#E46704] rounded-t-2xl px-6 py-4 flex items-center justify-between">
              <h2 className="text-white text-lg font-bold">Inquiry #{viewRow.inquiryNo}</h2>
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
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Name</p>
                  <p className="text-[#20507C] font-semibold text-sm">{viewRow.name || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-[#20507C] font-semibold text-sm">{viewRow.phone || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-[#20507C] font-semibold text-sm break-all">{viewRow.email || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Service Required</p>
                  <p className="text-[#20507C] font-semibold text-sm">{viewRow.serviceRequired || '—'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Property Location</p>
                  <p className="text-[#20507C] font-semibold text-sm">{viewRow.propertyLocation || '—'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Submitted At</p>
                  <p className="text-[#20507C] font-semibold text-sm">{viewRow.createdAt ? new Date(viewRow.createdAt).toLocaleString() : '—'}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Message</p>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap break-words min-h-[80px]">
                  {viewRow.message || '—'}
                </div>
              </div>

              <button
                onClick={() => setViewRow(null)}
                className="w-full bg-[#E46704] hover:bg-[#0a5a47] text-white rounded-full h-[42px] font-semibold text-[14px] cursor-pointer transition-colors"
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

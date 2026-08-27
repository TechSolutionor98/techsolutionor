"use client";
import React, { useState, useMemo } from 'react';
import ReviewPopupForm from './ReviewPopupForm';

export default function ReviewsTableClient({ initialData = [], apiBase = process.env.NEXT_PUBLIC_API_URL }) {
  const [rows, setRows] = useState(initialData || []);
  const [showAll, setShowAll] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const filtered = useMemo(() => {
    return rows.filter(r => showAll ? true : !r.approved);
  }, [rows, showAll]);

  async function refresh() {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/reviews?all=true`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setRows(data);
    } catch (err) {
      alert('Failed to refresh reviews');
    } finally {
      setLoading(false);
    }
  }

  async function approve(id) {
    if (!confirm('Approve this review?')) return;
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/reviews`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, approve: true }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Approve failed');
      await refresh();
    } catch (err) {
      alert('Failed to approve: ' + (err.message || err));
    } finally { setLoading(false); }
  }

  async function remove(id) {
    if (!confirm('Delete this review? This cannot be undone.')) return;
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/reviews?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Delete failed');
      await refresh();
    } catch (err) {
      alert('Failed to delete: ' + (err.message || err));
    } finally { setLoading(false); }
  }

  function handleSuccess() {
    refresh();
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPopup(true)}
            className="px-3 py-2 rounded-lg bg-[#E46704] hover:bg-[#E46704] text-white font-semibold shadow transition-all"
          >
            Add Review
          </button>
          <button
            onClick={refresh}
            className={`px-3 py-2 rounded-lg bg-green-600 hover:bg-green-800 text-white font-semibold shadow ${loading ? 'opacity-60' : ''} transition-all`}
          >
            Refresh
          </button>
        </div>
        <div className="text-sm text-gray-600">
          <span className='font-bold'>Total Reviews: </span>{rows.length}
        </div>
      </div>

      {showPopup && (
        <ReviewPopupForm
          apiBase={apiBase}
          onClose={() => setShowPopup(false)}
          onSuccess={handleSuccess}
        />
      )}

      <div className="overflow-x-auto w-full">
        <table className="min-w-full text-sm shadow border border-gray-100">
          <thead>
            <tr className="bg-[#E46704] text-white text-left">
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Company</th>
              <th className="px-4 py-3 font-semibold">Rating</th>
              <th className="px-4 py-3 font-semibold">Message</th>
              <th className="px-4 py-3 font-semibold">Approved</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r._id} className="hover:bg-[#e6f9f0] align-top transition-all">
                <td className="px-4 py-3 border-b border-gray-100 align-top text-left">{r._id}</td>
                <td className="px-4 py-3 border-b border-gray-100 align-top text-left">{r.name}</td>
                <td className="px-4 py-3 border-b border-gray-100 align-top text-left">{r.company}</td>
                <td className="px-4 py-3 border-b border-gray-100 align-top text-left">{r.rating}</td>
                <td className="px-4 py-3 border-b border-gray-100 align-top max-w-sm whitespace-pre-wrap break-words text-left">
                  {r.message}
                </td>
                <td className="px-4 py-3 border-b border-gray-100 align-top text-left">
                  {r.approved ? 'Yes' : 'No'}
                </td>
                <td className="px-4 py-3 border-b border-gray-100 align-top text-left">
                  {!r.approved && (
                    <button
                      onClick={() => approve(r._id)}
                      className="px-2 py-1 bg-[#E46704] hover:bg-[#E46704] text-white rounded mr-2 transition-all"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => remove(r._id)}
                    className="px-2 py-1 border border-red-600 text-red-600 hover:bg-red-50 rounded transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

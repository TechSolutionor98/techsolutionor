"use client";
import React, { useEffect, useState } from 'react';

export default function LogoUploader() {
  const [logoUrl, setLogoUrl] = useState('/file.svg');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchLogo() {
      try {
        const res = await fetch('/api/logo');
        if (!res.ok) throw new Error('Failed to load logo');
        const data = await res.json();
        if (mounted && data?.logo) setLogoUrl(data.logo);
      } catch (err) {
        console.warn('Logo fetch failed', err);
      }
    }
    fetchLogo();
    return () => { mounted = false; };
  }, []);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return setError('Please select a file to upload');
    setError(null);
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('logo', file);
      const res = await fetch('/api/logo', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      if (data?.logo) setLogoUrl(data.logo);
      setFile(null);
      alert('Logo uploaded successfully');
    } catch (err) {
      console.error(err);
      setError('Upload failed');
    } finally { setLoading(false); }
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded shadow flex items-center gap-6">
      <div className="flex items-center gap-4">
        <div className="w-28 h-28 bg-gray-100 flex items-center justify-center rounded overflow-hidden border">
          <img src={logoUrl} alt="logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <div className="text-sm text-gray-700 mb-2">Site Logo</div>
          <form onSubmit={handleUpload} className="flex items-center gap-2">
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] ?? null)} />
            <button type="submit" disabled={loading} className="px-3 py-1 bg-[#E46704] text-white rounded">{loading ? 'Uploading...' : 'Upload'}</button>
          </form>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
}

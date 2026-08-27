'use client';

import { useState } from 'react';
import { FiPlus, FiTrash2, FiCalendar, FiEdit2, FiUpload, FiX, FiCheck } from 'react-icons/fi';
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function AppointmentsClient({ initialLinks = [], apiBase = '' }) {
  // Helper to ensure all rich schema fields are initialized
  const normalize = (items) =>
    items.map(l => ({
      id: l.id || `link_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      name: l.name || '',
      url: l.url || '',
      description: l.description || '',
      profileImage: l.profileImage || '',
      category: l.category || '',
      socials: {
        linkedin: l.socials?.linkedin || '',
        twitter: l.socials?.twitter || '',
        facebook: l.socials?.facebook || '',
        instagram: l.socials?.instagram || '',
      },
      active: l.active !== false,
    }));

  const [links, setLinks] = useState(normalize(initialLinks));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // Modal form states
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // ── open modal for add new ──────────────────────────────────────────────────
  function openAddModal() {
    setFormData({
      id: `link_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      name: '',
      url: '',
      description: '',
      profileImage: '',
      category: '',
      socials: {
        linkedin: '',
        twitter: '',
        facebook: '',
        instagram: '',
      },
      active: true,
      isNew: true
    });
    setShowModal(true);
  }

  // ── open modal for edit ─────────────────────────────────────────────────────
  function openEditModal(link) {
    setFormData({
      ...link,
      socials: {
        linkedin: link.socials?.linkedin || '',
        twitter: link.socials?.twitter || '',
        facebook: link.socials?.facebook || '',
        instagram: link.socials?.instagram || '',
      },
      isNew: false
    });
    setShowModal(true);
  }

  // ── delete row ──────────────────────────────────────────────────────────────
  function removeLink(id) {
    if (!confirm('Are you sure you want to delete this appointment profile?')) return;
    const updated = links.filter(l => l.id !== id);
    setLinks(updated);
    persistLinks(updated);
  }

  // ── toggle active/inactive ──────────────────────────────────────────────────
  function toggleActive(id) {
    const updated = links.map(l => l.id === id ? { ...l, active: !l.active } : l);
    setLinks(updated);
    persistLinks(updated);
  }

  // ── upload image to Cloudinary ──────────────────────────────────────────────
  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const fd = new FormData();
      fd.append('file', file);
      fd.append('websiteId', 'default');
      fd.append('folder', 'appointments');

      const res = await fetch(`${apiBase}/api/cms/media`, {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      
      if (data.media?.url) {
        setFormData(prev => ({ ...prev, profileImage: data.media.url }));
      }
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  }

  // ── save modal changes ──────────────────────────────────────────────────────
  function saveModal(e) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.url.trim()) {
      alert('Please fill in both Name and Booking URL.');
      return;
    }

    let updated;
    if (formData.isNew) {
      // Remove temporary isNew key and append
      const { isNew, ...newLink } = formData;
      updated = [...links, newLink];
    } else {
      const { isNew, ...updatedLink } = formData;
      updated = links.map(l => l.id === formData.id ? updatedLink : l);
    }

    setLinks(updated);
    setShowModal(false);
    setFormData(null);
    persistLinks(updated);
  }

  // ── persist to DB ───────────────────────────────────────────────────────────
  async function persistLinks(linksToSave) {
    // Only save valid rows that have both name and url
    const valid = linksToSave.filter(l => l.name && l.url);
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`${apiBase}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ links: valid }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setLinks(normalize(data.links));
        setMessage({ type: 'success', text: 'Saved successfully!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  }

  const activeCount = links.filter(l => l.active && l.name && l.url).length;
  const totalCount = links.filter(l => l.name && l.url).length;

  return (
    <div className="space-y-5 text-left text-black">

      {/* ── Top bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[#20507C]">
          <FiCalendar size={18} />
          <span className="font-semibold text-sm">
            Manage Appointment Profiles
          </span>
          {totalCount > 0 && (
            <span className="ml-1 text-xs text-gray-400 font-normal">
              ({activeCount} active / {totalCount} total)
            </span>
          )}
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#E46704] text-white text-sm rounded hover:bg-[#E46704] transition-colors duration-200 cursor-pointer font-semibold"
        >
          <FiPlus size={14} />
          Add Appointment Slot
        </button>
      </div>

      {/* ── Status message ── */}
      {message && (
        <div className={`px-4 py-2.5 rounded text-sm font-medium flex items-center gap-2 ${
          message.type === 'success'
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {saving && (
            <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
          )}
          {message.text}
        </div>
      )}

      {/* ── Empty state ── */}
      {links.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
          <FiCalendar size={34} className="mb-3 opacity-40" />
          <p className="text-sm font-medium">No appointment links yet.</p>
          <p className="text-xs mt-1">Click <strong>&ldquo;Add Appointment Slot&rdquo;</strong> to get started.</p>
        </div>
      ) : (

        /* ── Table ── */
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-12">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Profile</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Department/Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Booking URL</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide w-28">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {links.map((link, idx) => (
                <tr key={link.id} className="hover:bg-gray-50 transition-colors">
                  {/* Index */}
                  <td className="px-4 py-4">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#E46704]/10 text-[#20507C] text-xs font-bold">
                      {idx + 1}
                    </span>
                  </td>

                  {/* Profile Info */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {link.profileImage ? (
                        <img
                          src={link.profileImage}
                          alt={link.name}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0 bg-gray-50"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#E46704]/10 flex items-center justify-center text-[#20507C] text-sm font-bold shrink-0">
                          {link.name ? link.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'AP'}
                        </div>
                      )}
                      <div>
                        <span className="font-semibold text-gray-800 block leading-tight">{link.name}</span>
                        {link.description && (
                          <span className="text-[11px] text-gray-400 line-clamp-1 mt-0.5 max-w-[300px] break-words">
                            {link.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Department / Category */}
                  <td className="px-4 py-4">
                    {link.category ? (
                      <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider bg-green-50 text-[#20507C] border border-[#20507C]/10 px-2 py-0.5 rounded">
                        {link.category}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs italic">General</span>
                    )}
                  </td>

                  {/* Booking URL */}
                  <td className="px-4 py-4 max-w-[200px]">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#20507C] hover:text-[#20507C] hover:underline text-xs truncate block"
                      title={link.url}
                    >
                      {link.url}
                    </a>
                  </td>

                  {/* Status Toggle */}
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => toggleActive(link.id)}
                      title={link.active ? 'Click to deactivate' : 'Click to activate'}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        link.active
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${link.active ? 'bg-green-500' : 'bg-gray-400'}`} />
                      {link.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEditModal(link)}
                        title="Edit Details"
                        className="p-1.5 text-[#20507C] hover:text-[#173A5A] hover:bg-[#E46704]/10 rounded transition-colors cursor-pointer border-0 bg-transparent"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        onClick={() => removeLink(link.id)}
                        title="Delete Slot"
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer border-0 bg-transparent"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Form Edit Modal ── */}
      {showModal && formData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl flex flex-col p-6 md:p-8 space-y-6 text-left my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FiCalendar className="text-[#20507C]" />
                {formData.isNew ? 'Create Appointment Slot' : 'Edit Appointment Profile'}
              </h2>
              <button
                onClick={() => { setShowModal(false); setFormData(null); }}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-all cursor-pointer border-0 bg-transparent"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={saveModal} className="space-y-5">
              
              {/* Profile Details Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Full Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 border border-gray-250 rounded-lg text-sm focus:outline-none focus:border-[#20507C] focus:ring-1 focus:ring-[#20507C]"
                  />
                </div>

                {/* Calendar URL */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Calendar Booking URL *</label>
                  <input
                    required
                    type="url"
                    value={formData.url}
                    onChange={e => setFormData(p => ({ ...p, url: e.target.value }))}
                    placeholder="https://calendar.google.com/..."
                    className="w-full px-3 py-2 border border-gray-250 rounded-lg text-sm focus:outline-none focus:border-[#20507C] focus:ring-1 focus:ring-[#20507C]"
                  />
                </div>

                {/* Department / Category */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Department / Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                    placeholder="e.g. Technical Support, Sales"
                    className="w-full px-3 py-2 border border-gray-250 rounded-lg text-sm focus:outline-none focus:border-[#20507C] focus:ring-1 focus:ring-[#20507C]"
                  />
                </div>

                {/* Profile Image URL & Upload */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 block">Profile Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.profileImage}
                      onChange={e => setFormData(p => ({ ...p, profileImage: e.target.value }))}
                      placeholder="https://cloudinary.com/..."
                      className="flex-1 px-3 py-2 border border-gray-250 rounded-lg text-sm focus:outline-none focus:border-[#20507C] min-w-0"
                    />
                    
                    {/* Cloudinary Upload Trigger */}
                    <div className="relative shrink-0">
                      <input
                        type="file"
                        id="modal-image-upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                      <label
                        htmlFor="modal-image-upload"
                        className={`flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 text-sm font-semibold cursor-pointer select-none transition-colors ${
                          uploadingImage ? 'opacity-50 pointer-events-none' : ''
                        }`}
                      >
                        {uploadingImage ? (
                          <svg className="animate-spin h-4.5 w-4.5 text-gray-600" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                          </svg>
                        ) : (
                          <FiUpload size={14} />
                        )}
                        <span>{uploadingImage ? 'Uploading' : 'Upload'}</span>
                      </label>
                    </div>
                  </div>
                </div>

              </div>

              {/* Profile Image Preview if URL exists */}
              {formData.profileImage && (
                <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-lg border border-gray-150 w-fit">
                  <img
                    src={formData.profileImage}
                    alt="Uploaded Preview"
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200 animate-fade-in"
                  />
                  <div className="text-left">
                    <span className="text-[11px] font-bold text-green-700 block">Preview Ready</span>
                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, profileImage: '' }))}
                      className="text-[10px] text-red-500 hover:text-red-700 font-semibold uppercase tracking-wider block mt-0.5 cursor-pointer border-0 bg-transparent"
                    >
                      Remove Photo
                    </button>
                  </div>
                </div>
              )}

              {/* Bio / Description */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Bio / Description (Client-side details)</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                  placeholder="Provide a brief description of this meeting's scope, consulting parameters, or consultant biography..."
                  className="w-full px-3 py-2 border border-gray-250 rounded-lg text-sm focus:outline-none focus:border-[#20507C] focus:ring-1 focus:ring-[#20507C] resize-none"
                />
              </div>

              {/* Social links section */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Social Profile Links</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* LinkedIn */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-550 flex items-center gap-1.5">
                      <FaLinkedinIn className="text-blue-600 animate-fade-in" />
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      value={formData.socials.linkedin}
                      onChange={e => setFormData(p => ({
                        ...p,
                        socials: { ...p.socials, linkedin: e.target.value }
                      }))}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-xs focus:outline-none focus:border-[#20507C]"
                    />
                  </div>

                  {/* Twitter */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-550 flex items-center gap-1.5">
                      <FaTwitter className="text-sky-500" />
                      Twitter Profile
                    </label>
                    <input
                      type="url"
                      value={formData.socials.twitter}
                      onChange={e => setFormData(p => ({
                        ...p,
                        socials: { ...p.socials, twitter: e.target.value }
                      }))}
                      placeholder="https://twitter.com/username"
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-xs focus:outline-none focus:border-[#20507C]"
                    />
                  </div>

                  {/* Facebook */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-550 flex items-center gap-1.5">
                      <FaFacebookF className="text-indigo-600" />
                      Facebook Profile
                    </label>
                    <input
                      type="url"
                      value={formData.socials.facebook}
                      onChange={e => setFormData(p => ({
                        ...p,
                        socials: { ...p.socials, facebook: e.target.value }
                      }))}
                      placeholder="https://facebook.com/username"
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-xs focus:outline-none focus:border-[#20507C]"
                    />
                  </div>

                  {/* Instagram */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-550 flex items-center gap-1.5">
                      <FaInstagram className="text-pink-500" />
                      Instagram Profile
                    </label>
                    <input
                      type="url"
                      value={formData.socials.instagram}
                      onChange={e => setFormData(p => ({
                        ...p,
                        socials: { ...p.socials, instagram: e.target.value }
                      }))}
                      placeholder="https://instagram.com/username"
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-xs focus:outline-none focus:border-[#20507C]"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions Footer */}
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setFormData(null); }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E46704] hover:bg-[#E46704] text-white rounded-lg text-sm font-semibold flex items-center gap-1 cursor-pointer border-0"
                >
                  <FiCheck size={14} />
                  Save Profile
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ── Legend ── */}
      {links.length > 0 && (
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Active — visible to clients
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
            Inactive — hidden from clients
          </span>
          <span className="ml-auto text-gray-300 italic">
            {saving ? 'Saving…' : 'Changes auto-save instantly'}
          </span>
        </div>
      )}
    </div>
  );
}

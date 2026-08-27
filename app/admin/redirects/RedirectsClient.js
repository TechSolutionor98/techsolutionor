"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { FiSearch, FiEdit, FiTrash2, FiPlus, FiCheckCircle, FiAlertCircle, FiCopy, FiCheck, FiExternalLink, FiHelpCircle } from 'react-icons/fi';

export default function RedirectsClient({ initialRedirects = [], apiBase, initialError }) {
  const [redirects, setRedirects] = useState(initialRedirects);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [message, setMessage] = useState(initialError || '');
  const [messageType, setMessageType] = useState(initialError ? 'error' : '');
  const [copiedText, setCopiedText] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [currentId, setCurrentId] = useState(null);

  // Form states
  const [fromPath, setFromPath] = useState('');
  const [toPath, setToPath] = useState('');
  const [redirectType, setRedirectType] = useState('301');
  const [status, setStatus] = useState('active');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          setCurrentUser(JSON.parse(userStr));
        } catch (e) {
          console.error("Failed to parse user session:", e);
        }
      } else {
        const token = localStorage.getItem("jwt");
        if (token) {
          setCurrentUser({ name: "Super Admin", role: "super_admin" });
        }
      }
    }
  }, []);

  const role = currentUser?.role || 'super_admin';
  const canEdit = role !== 'viewer';

  const handleCopy = (text) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 2000);
    }
  };

  // Open modal for adding
  const openAddModal = () => {
    setModalMode('add');
    setCurrentId(null);
    setFromPath('');
    setToPath('');
    setRedirectType('301');
    setStatus('active');
    setDescription('');
    setShowModal(true);
  };

  // Open modal for editing
  const openEditModal = (redirect) => {
    setModalMode('edit');
    setCurrentId(redirect._id);
    setFromPath(redirect.fromPath);
    setToPath(redirect.toPath);
    setRedirectType(redirect.type || '301');
    setStatus(redirect.status || 'active');
    setDescription(redirect.description || '');
    setShowModal(true);
  };

  // Save redirect rule (Insert or Update)
  const handleSaveRedirect = async (e) => {
    e.preventDefault();
    if (!canEdit) return;

    if (!fromPath.startsWith('/')) {
      alert("Redirect From path must start with a slash (/)");
      return;
    }
    if (!toPath.startsWith('/') && !toPath.startsWith('http://') && !toPath.startsWith('https://')) {
      alert("Redirect To destination must start with / or be a full link (http/https)");
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      const url = `${apiBase}/api/cms/redirects`;
      const method = modalMode === 'add' ? 'POST' : 'PATCH';
      
      const payload = {
        fromPath,
        toPath,
        type: redirectType,
        status,
        description,
        websiteId: 'default'
      };

      if (modalMode === 'edit') {
        payload.id = currentId;
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save redirect rules.');
      }

      if (modalMode === 'add') {
        setRedirects(prev => [data.redirect, ...prev]);
        setMessage("Redirect rule added successfully!");
      } else {
        setRedirects(prev =>
          prev.map(r => r._id === currentId ? { ...r, fromPath, toPath, type: redirectType, status, description } : r)
        );
        setMessage("Redirect rule updated successfully!");
      }
      
      setMessageType('success');
      setShowModal(false);
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      console.error(err);
      setMessage(err.message);
      setMessageType('error');
    } finally {
      setSaving(false);
    }
  };

  // Delete redirect rule
  const handleDeleteRedirect = async (id) => {
    if (!canEdit) return;
    if (!confirm("Are you sure you want to delete this redirect rule?")) return;

    try {
      const res = await fetch(`${apiBase}/api/cms/redirects?id=${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setRedirects(prev => prev.filter(r => r._id !== id));
        setMessage("Redirect rule deleted successfully!");
        setMessageType('success');
        setTimeout(() => setMessage(''), 4000);
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete redirect.');
      }
    } catch (err) {
      console.error(err);
      setMessage(err.message);
      setMessageType('error');
    }
  };

  // Filter redirects
  const filteredRedirects = useMemo(() => {
    return redirects.filter(redirect => {
      const matchesSearch = !search || 
        redirect.fromPath.toLowerCase().includes(search.toLowerCase()) ||
        redirect.toPath.toLowerCase().includes(search.toLowerCase()) ||
        (redirect.description || '').toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || redirect.status === statusFilter;
      const matchesType = typeFilter === 'all' || redirect.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [redirects, search, statusFilter, typeFilter]);

  // Statistics
  const stats = useMemo(() => ({
    total: redirects.length,
    active: redirects.filter(r => r.status === 'active').length,
    permanent: redirects.filter(r => r.type === '301').length,
    temporary: redirects.filter(r => r.type === '302').length,
  }), [redirects]);

  return (
    <div className="space-y-6">
      {/* Alert Message */}
      {message && (
        <div
          className={`rounded-md px-4 py-3 text-sm font-medium flex items-center gap-2
            ${messageType === 'success'
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-red-100 text-red-700 border border-red-300'}`}
          role="alert"
        >
          {messageType === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
          {message}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-[#20507C]">
          <p className="text-sm text-gray-500">Total Redirects</p>
          <p className="text-2xl font-bold text-[#20507C]">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Active Rules</p>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">301 (Permanent)</p>
          <p className="text-2xl font-bold text-blue-600">{stats.permanent}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">302 (Temporary)</p>
          <p className="text-2xl font-bold text-purple-600">{stats.temporary}</p>
        </div>
      </div>

      {/* Actions and Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full md:w-auto">
            <div className="relative flex-1 min-w-[200px]">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search redirects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 text-gray-900 text-sm
                           focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none transition"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 text-sm focus:outline-none focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 text-sm focus:outline-none focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704]"
            >
              <option value="all">All Types</option>
              <option value="301">301 - Permanent</option>
              <option value="302">302 - Temporary</option>
            </select>
          </div>

          {canEdit && (
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#E46704] hover:bg-[#E46704] text-white text-sm font-semibold rounded-md transition whitespace-nowrap shadow-sm"
            >
              <FiPlus /> Add URL redirect
            </button>
          )}
        </div>
      </div>

      {/* Redirects Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredRedirects.length === 0 ? (
          <div className="p-12 text-center">
            <FiHelpCircle className="mx-auto text-4xl text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Redirects Found</h3>
            <p className="text-sm text-gray-400 mb-4">
              Create redirects to forward traffic from old URLs to new pages or external websites.
            </p>
            {canEdit && (
              <button
                onClick={openAddModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#E46704] text-white text-sm font-semibold hover:bg-[#E46704] transition shadow-sm"
              >
                <FiPlus /> Add URL redirect
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Redirect From</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Redirect To</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRedirects.map((redirect) => (
                  <tr key={redirect._id} className="hover:bg-gray-50 transition-colors">
                    {/* Redirect From */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono text-[#20507C] font-semibold">{redirect.fromPath}</span>
                        <button
                          onClick={() => handleCopy(redirect.fromPath)}
                          className="p-1 text-gray-400 hover:text-[#20507C] rounded hover:bg-gray-100 transition-colors"
                          title="Copy original link"
                        >
                          {copiedText === redirect.fromPath ? <FiCheck className="text-green-600" size={13} /> : <FiCopy size={13} />}
                        </button>
                      </div>
                    </td>

                    {/* Redirect To */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 flex-wrap max-w-xs md:max-w-md lg:max-w-lg">
                        <span className="text-sm text-gray-700 truncate font-mono" title={redirect.toPath}>
                          {redirect.toPath}
                        </span>
                        <a
                          href={redirect.toPath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-gray-400 hover:text-[#20507C] rounded hover:bg-gray-100 transition-colors flex-shrink-0"
                          title="Open Destination URL"
                        >
                          <FiExternalLink size={13} />
                        </a>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        redirect.type === '301' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {redirect.type === '301' ? '301 - Permanent' : '302 - Temporary'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        redirect.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {redirect.status}
                      </span>
                    </td>

                    {/* Description */}
                    <td className="px-5 py-4">
                      <span className="text-xs text-gray-500 block max-w-xs truncate" title={redirect.description}>
                        {redirect.description || '—'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right whitespace-nowrap text-sm">
                      {canEdit ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(redirect)}
                            className="p-1.5 text-gray-500 hover:text-blue-600 rounded hover:bg-gray-100 transition"
                            title="Edit URL redirect"
                          >
                            <FiEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteRedirect(redirect._id)}
                            className="p-1.5 text-gray-500 hover:text-red-600 rounded hover:bg-gray-100 transition"
                            title="Delete URL redirect"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">View Only</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* URL Redirect Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div 
            className="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden text-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-base font-bold text-gray-800">
                {modalMode === 'add' ? 'Add a new URL redirect' : 'Edit URL redirect'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                &times;
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveRedirect}>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                
                {/* Redirect From */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Redirect From
                  </label>
                  <input
                    type="text"
                    required
                    value={fromPath}
                    onChange={(e) => setFromPath(e.target.value)}
                    placeholder="/old-product-url"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704]"
                  />
                  <span className="text-xs text-gray-500 mt-1 block">
                    The URL path to redirect from (must start with /). Trailing slashes will be automatically removed.
                  </span>
                </div>

                {/* Redirect To */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Redirect To
                  </label>
                  <input
                    type="text"
                    required
                    value={toPath}
                    onChange={(e) => setToPath(e.target.value)}
                    placeholder="/new-product-url or https://example.com"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704]"
                  />
                  <span className="text-xs text-gray-500 mt-1 block">
                    The destination URL (internal path or external URL). Trailing slashes will be automatically removed for internal URLs.
                  </span>
                </div>

                {/* Redirect Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Redirect Type
                  </label>
                  <select
                    value={redirectType}
                    onChange={(e) => setRedirectType(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704]"
                  >
                    <option value="301">301 - Permanent Redirect</option>
                    <option value="302">302 - Temporary Redirect</option>
                  </select>
                  <span className="text-xs text-gray-500 mt-1 block">
                    HTTP status code for the redirect.
                  </span>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704]"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <span className="text-xs text-gray-500 mt-1 block">
                    Whether this redirect is currently active.
                  </span>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add notes about this redirect..."
                    rows={3}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] resize-none"
                  />
                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E46704] hover:bg-[#E46704] text-white text-sm font-semibold rounded-md transition shadow-sm"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save redirect'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

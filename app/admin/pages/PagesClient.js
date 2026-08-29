"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { FiSearch, FiRefreshCw, FiEdit, FiEye, FiGlobe, FiLayers, FiChevronRight, FiChevronDown, FiCheckCircle, FiAlertCircle, FiCopy, FiCheck } from 'react-icons/fi';

export default function PagesClient({ initialRoutes = [], apiBase, initialError }) {
  const [routes, setRoutes] = useState(initialRoutes);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [message, setMessage] = useState(initialError || '');
  const [messageType, setMessageType] = useState(initialError ? 'error' : '');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [expandedPaths, setExpandedPaths] = useState(new Set());
  const [currentUser, setCurrentUser] = useState(null);
  const [copiedText, setCopiedText] = useState('');
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target && e.target.closest('.dropdown-container')) {
        return;
      }
      setActiveDropdownId(null);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleCopy = (text) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 2000);
    }
  };

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
  const canEditPages = role !== 'viewer';
  const canEditSeo = ['super_admin', 'admin', 'seo', 'client'].includes(role);
  const canViewSeo = ['super_admin', 'admin', 'seo', 'client', 'viewer'].includes(role);

  // Scan routes from project
  const handleScanRoutes = async () => {
    if (!canEditPages) return;
    setScanning(true);
    setScanResult(null);
    setMessage('');
    try {
      const res = await fetch(`${apiBase}/api/cms/scan-routes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ websiteId: 'default' }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Scan failed');
      }

      setScanResult(data.summary);
      setMessage(`Scan complete! Found ${data.summary.total} routes (${data.summary.created} new, ${data.summary.updated} updated, ${data.summary.archived} archived)`);
      setMessageType('success');

      // Refresh routes list
      const routesRes = await fetch(`${apiBase}/api/cms/routes?websiteId=default`);
      if (routesRes.ok) {
        const routesData = await routesRes.json();
        setRoutes(routesData.routes || []);
      }
    } catch (err) {
      console.error(err);
      setMessage('Scan failed: ' + err.message);
      setMessageType('error');
    } finally {
      setScanning(false);
    }
  };

  // Update route status
  const handleStatusChange = async (id, newStatus) => {
    if (!canEditPages) return;
    try {
      const res = await fetch(`${apiBase}/api/cms/routes`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setRoutes(prev =>
          prev.map(r => r._id === id ? { ...r, status: newStatus } : r)
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  // Filter routes
  const filteredRoutes = useMemo(() => {
    return routes.filter(route => {
      if (route.path === '/[slug]' || route.filePath?.includes('[slug]')) return false;
      const matchesSearch = !search || route.path.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || route.status === statusFilter;
      const matchesType = typeFilter === 'all' || route.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [routes, search, statusFilter, typeFilter]);

  // Stats
  const stats = useMemo(() => {
    const validRoutes = routes.filter(r => r.path !== '/[slug]' && !r.filePath?.includes('[slug]'));
    return {
      total: validRoutes.length,
      active: validRoutes.filter(r => r.status === 'active').length,
      static: validRoutes.filter(r => r.type === 'static').length,
      dynamic: validRoutes.filter(r => r.type === 'dynamic').length,
    };
  }, [routes]);

  // Toggle tree node
  const toggleExpand = (path) => {
    setExpandedPaths(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  // Get children of a route
  const getChildren = (parentPath) => {
    return filteredRoutes.filter(r => r.parentPath === parentPath && r.path !== parentPath);
  };

  // Status badge
  const StatusBadge = ({ status }) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-600',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || colors.active}`}>
        {status}
      </span>
    );
  };

  // Type badge
  const TypeBadge = ({ type }) => {
    const colors = {
      static: 'bg-blue-100 text-blue-800',
      dynamic: 'bg-purple-100 text-purple-800',
      'catch-all': 'bg-orange-100 text-orange-800',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[type] || colors.static}`}>
        {type}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Message */}
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
          <p className="text-sm text-gray-500">Total Pages</p>
          <p className="text-2xl font-bold text-[#20507C]">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Static</p>
          <p className="text-2xl font-bold text-blue-600">{stats.static}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Dynamic</p>
          <p className="text-2xl font-bold text-purple-600">{stats.dynamic}</p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          {/* Left: Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full md:w-auto">
            <div className="relative flex-1 min-w-[200px]">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search routes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 text-gray-900 text-sm
                           focus:border-[#20507C] focus:ring-2 focus:ring-[#34953C] focus:outline-none transition"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 text-sm
                         focus:border-[#20507C] focus:ring-2 focus:ring-[#34953C] focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 text-sm
                         focus:border-[#20507C] focus:ring-2 focus:ring-[#34953C] focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="static">Static</option>
              <option value="dynamic">Dynamic</option>
              <option value="catch-all">Catch-All</option>
            </select>
          </div>

          {/* Right: Scan Button */}
          {canEditPages && (
            <button
              onClick={handleScanRoutes}
              disabled={scanning}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-white text-sm font-semibold transition whitespace-nowrap
                ${scanning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#34953C] hover:bg-[#34953C] focus:outline-none focus:ring-2 focus:ring-[#34953C]'}`}
            >
              <FiRefreshCw className={scanning ? 'animate-spin' : ''} />
              {scanning ? 'Scanning...' : 'Scan Routes'}
            </button>
          )}
        </div>
      </div>

      {/* Routes Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredRoutes.length === 0 ? (
          <div className="p-12 text-center">
            <FiGlobe className="mx-auto text-4xl text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Routes Found</h3>
            <p className="text-sm text-gray-400 mb-4">
              {canEditPages ? 'Click "Scan Routes" to detect all pages in your Next.js project.' : 'No pages are scanned yet.'}
            </p>
            {canEditPages && (
              <button
                onClick={handleScanRoutes}
                disabled={scanning}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#34953C] text-white text-sm font-semibold hover:bg-[#34953C] transition"
              >
                <FiRefreshCw className={scanning ? 'animate-spin' : ''} />
                {scanning ? 'Scanning...' : 'Scan Routes'}
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-auto max-h-[500px] min-h-[350px]">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10">
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Route Path</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">File</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Scanned</th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRoutes.map((route) => {
                  const hasChildren = getChildren(route.path).length > 0;
                  const isExpanded = expandedPaths.has(route.path);
                  const indent = route.depth || 0;

                  return (
                    <tr key={route._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1" style={{ paddingLeft: `${indent * 16}px` }}>
                          {hasChildren ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(route.path);
                              }}
                              className="p-0.5 hover:bg-gray-200 rounded flex-shrink-0"
                            >
                              {isExpanded ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                            </button>
                          ) : (
                            <span className="w-5 flex-shrink-0" />
                          )}
                          <FiLayers className="text-gray-400 mr-1.5 flex-shrink-0" size={14} />
                          <div className="flex items-center gap-1.5 min-w-0 max-w-[120px] sm:max-w-[180px] md:max-w-[220px]">
                            <Link 
                              href={`/admin/pages/${route._id}`} 
                              className="text-sm font-mono text-[#20507C] hover:text-[#173A5A] hover:underline font-semibold truncate"
                              title={route.path}
                            >
                              {route.path}
                            </Link>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(route.path);
                              }}
                              className="p-1 text-gray-400 hover:text-[#20507C] rounded hover:bg-gray-100 transition-colors flex-shrink-0"
                              title="Copy Path"
                            >
                              {copiedText === route.path ? <FiCheck className="text-green-600" size={13} /> : <FiCopy size={13} />}
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <TypeBadge type={route.type} />
                      </td>
                      <td className="px-4 py-2">
                        <StatusBadge status={route.status} />
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1.5 min-w-0 max-w-[110px] sm:max-w-[150px] md:max-w-[180px]">
                          <span className="text-xs text-gray-500 font-mono truncate" title={route.filePath}>
                            {route.filePath || '—'}
                          </span>
                          {route.filePath && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(route.filePath);
                              }}
                              className="p-1 text-gray-400 hover:text-[#20507C] rounded hover:bg-gray-100 transition-colors flex-shrink-0"
                              title="Copy File Path"
                            >
                              {copiedText === route.filePath ? <FiCheck className="text-green-600" size={12} /> : <FiCopy size={12} />}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-xs text-gray-500">
                          {route.lastScannedAt ? new Date(route.lastScannedAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          }) : '—'}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <div className="relative inline-block text-left dropdown-container">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdownId(activeDropdownId === route._id ? null : route._id);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-md text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#34953C] shadow-sm transition-colors"
                          >
                            Actions
                            <FiChevronDown size={14} className={`transition-transform duration-200 ${activeDropdownId === route._id ? 'rotate-180' : ''}`} />
                          </button>

                          {activeDropdownId === route._id && (
                            <div
                              className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 divide-y divide-gray-100 origin-top-right focus:outline-none"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="py-1">
                                <Link
                                  href={`/admin/pages/${route._id}`}
                                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                  onClick={() => setActiveDropdownId(null)}
                                >
                                  <FiEdit className="text-gray-400" size={14} />
                                  {canEditPages ? "Edit Content" : "View Content"}
                                </Link>

                                {canViewSeo && (
                                  <Link
                                    href={`/admin/seo/${route._id}`}
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                    onClick={() => setActiveDropdownId(null)}
                                  >
                                    <FiGlobe className="text-gray-400" size={14} />
                                    {canEditSeo ? "Manage SEO" : "View SEO"}
                                  </Link>
                                )}

                                <a
                                  href={route.path}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                  onClick={() => setActiveDropdownId(null)}
                                >
                                  <FiEye className="text-gray-400" size={14} />
                                  View Page
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Scan Result Details */}
      {scanResult && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Last Scan Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-xl font-bold text-gray-800">{scanResult.total}</p>
              <p className="text-xs text-gray-500">Total Found</p>
            </div>
            <div className="p-3 bg-green-50 rounded">
              <p className="text-xl font-bold text-green-700">{scanResult.created}</p>
              <p className="text-xs text-gray-500">New Routes</p>
            </div>
            <div className="p-3 bg-blue-50 rounded">
              <p className="text-xl font-bold text-blue-700">{scanResult.updated}</p>
              <p className="text-xs text-gray-500">Updated</p>
            </div>
            <div className="p-3 bg-orange-50 rounded">
              <p className="text-xl font-bold text-orange-700">{scanResult.archived}</p>
              <p className="text-xs text-gray-500">Archived</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

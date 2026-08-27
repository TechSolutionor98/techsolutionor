"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { FiSearch, FiGlobe, FiCheckCircle, FiAlertTriangle, FiXCircle, FiExternalLink, FiCopy, FiCheck } from 'react-icons/fi';

export default function SeoOverviewClient({ initialPages = [], apiBase }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          setCurrentUser(JSON.parse(userStr));
        } catch (e) {
          console.error("Failed to parse user session:", e);
        }
      }
    }
  }, []);

  const role = currentUser?.role || 'super_admin';
  const canEditSeo = ['super_admin', 'admin', 'seo', 'client'].includes(role);
  const [pages, setPages] = useState(initialPages);
  const [search, setSearch] = useState('');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = (text) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 2000);
    }
  };

  // Filter pages
  const filteredPages = useMemo(() => {
    return pages.filter(page => {
      const matchesSearch = !search ||
        page.path.toLowerCase().includes(search.toLowerCase()) ||
        (page.metaTitle || '').toLowerCase().includes(search.toLowerCase());
      
      let matchesScore = true;
      if (scoreFilter === 'good') matchesScore = page.seoScore >= 70;
      else if (scoreFilter === 'needs-work') matchesScore = page.seoScore >= 30 && page.seoScore < 70;
      else if (scoreFilter === 'poor') matchesScore = page.seoScore < 30;
      else if (scoreFilter === 'none') matchesScore = !page.hasSeo;

      return matchesSearch && matchesScore;
    });
  }, [pages, search, scoreFilter]);

  // Stats
  const stats = useMemo(() => {
    const total = pages.length;
    const withSeo = pages.filter(p => p.hasSeo).length;
    const avgScore = pages.length > 0
      ? Math.round(pages.reduce((sum, p) => sum + p.seoScore, 0) / pages.length)
      : 0;
    const good = pages.filter(p => p.seoScore >= 70).length;
    return { total, withSeo, avgScore, good };
  }, [pages]);

  // Score color and icon
  const getScoreDisplay = (score) => {
    if (score >= 70) return { color: 'text-green-600', bg: 'bg-green-100', icon: <FiCheckCircle /> };
    if (score >= 30) return { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: <FiAlertTriangle /> };
    return { color: 'text-red-600', bg: 'bg-red-100', icon: <FiXCircle /> };
  };

  // Score bar
  const ScoreBar = ({ score }) => {
    const display = getScoreDisplay(score);
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2 w-14">
          <div
            className={`h-2 rounded-full transition-all ${
              score >= 70 ? 'bg-green-500' : score >= 30 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className={`text-xs font-semibold ${display.color}`}>{score}%</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-[#20507C]">
          <p className="text-sm text-gray-500">Total Pages</p>
          <p className="text-2xl font-bold text-[#20507C]">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-sm text-gray-500">SEO Configured</p>
          <p className="text-2xl font-bold text-green-600">{stats.withSeo}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Average Score</p>
          <p className="text-2xl font-bold text-blue-600">{stats.avgScore}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Good SEO (70%+)</p>
          <p className="text-2xl font-bold text-purple-600">{stats.good}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by path or meta title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 text-gray-900 text-sm
                         focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none transition"
            />
          </div>
          <select
            value={scoreFilter}
            onChange={(e) => setScoreFilter(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 text-sm
                       focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none"
          >
            <option value="all">All Scores</option>
            <option value="good">Good (70%+)</option>
            <option value="needs-work">Needs Work (30-69%)</option>
            <option value="poor">Poor (&lt;30%)</option>
            <option value="none">No SEO Data</option>
          </select>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredPages.length === 0 ? (
          <div className="p-12 text-center">
            <FiGlobe className="mx-auto text-4xl text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Pages Found</h3>
            <p className="text-sm text-gray-400">
              {pages.length === 0
                ? 'Scan your project routes first from the Pages section.'
                : 'No pages match your current filters.'}
            </p>
          </div>
        ) : (
          <div className="overflow-auto max-h-[500px] min-h-[350px]">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10">
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Page</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Meta Title</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Meta Description</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">SEO Score</th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPages.map((page) => {
                  const scoreDisplay = getScoreDisplay(page.seoScore);
                  return (
                    <tr key={page._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1.5 min-w-0 max-w-[150px] sm:max-w-[220px]">
                          <code className="text-xs font-mono text-gray-800 truncate" title={page.path}>{page.path}</code>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(page.path);
                            }}
                            className="p-1 text-gray-400 hover:text-[#20507C] rounded hover:bg-gray-100 transition-colors flex-shrink-0"
                            title="Copy Path"
                          >
                            {copiedText === page.path ? <FiCheck className="text-green-600" size={12} /> : <FiCopy size={12} />}
                          </button>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium flex-shrink-0 ${
                            page.type === 'dynamic' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {page.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-xs text-gray-700 line-clamp-3 max-w-[180px] sm:max-w-[220px] block font-medium" title={page.metaTitle || ''}>
                          {page.metaTitle || <span className="text-gray-400 italic">Not set</span>}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-xs text-gray-500 line-clamp-3 max-w-[200px] sm:max-w-[250px] block" title={page.metaDescription || ''}>
                          {page.metaDescription || <span className="text-gray-400 italic">Not set</span>}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <ScoreBar score={page.seoScore} />
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/seo/${page._id}`}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#E46704] rounded hover:bg-[#E46704] transition-colors whitespace-nowrap"
                          >
                            {canEditSeo ? (page.hasSeo ? 'Edit SEO' : 'Add SEO') : 'View SEO'}
                          </Link>
                          <a
                            href={page.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                            title="View Live Page"
                          >
                            <FiExternalLink size={14} />
                          </a>
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
    </div>
  );
}

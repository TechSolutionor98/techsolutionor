"use client";
import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    contactCount: 0,
    applicationsCount: 0,
    pagesCount: 0,
    mediaCount: 0,
    websitesCount: 1,
  });

  useEffect(() => {
    fetch('/api/cms/dashboard')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setCounts(data);
        }
      })
      .catch(err => console.error('Failed to load dashboard counts:', err));
  }, []);

  const { contactCount, applicationsCount = 0, pagesCount, mediaCount, websitesCount } = counts;

  return (
    <div className="space-y-6 overflow-x-hidden">
      {/* Header */}
      <h1 className="text-[30px] font-bold">ADMIN DASHBOARD</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-lg font-semibold mb-2">Contact Submissions</h3>
          <p className="text-3xl font-bold text-green-600">
            {contactCount}
          </p>
          <p className="text-sm text-gray-600">Total contacts</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-emerald-600">
          <h3 className="text-lg font-semibold mb-2">Career Applications</h3>
          <p className="text-3xl font-bold text-emerald-600">
            {applicationsCount}
          </p>
          <p className="text-sm text-gray-600">Job candidates</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-[#20507C]">
          <h3 className="text-lg font-semibold mb-2">Pages & Routes</h3>
          <p className="text-3xl font-bold text-[#20507C]">{pagesCount}</p>
          <p className="text-sm text-gray-600">Detected routes</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-pink-500">
          <h3 className="text-lg font-semibold mb-2">Media Files</h3>
          <p className="text-3xl font-bold text-pink-600">{mediaCount}</p>
          <p className="text-sm text-gray-600">Uploaded images</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-cyan-500">
          <h3 className="text-lg font-semibold mb-2">Websites</h3>
          <p className="text-3xl font-bold text-cyan-600">{websitesCount}</p>
          <p className="text-sm text-gray-600">Connected projects</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="/admin/applications" className="block p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200">
            <h3 className="font-semibold text-emerald-900">💼 Career Applications</h3>
            <p className="text-sm text-emerald-700">Review & approve job applications</p>
          </a>

          <a href="/admin/contact-submissions" className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200">
            <h3 className="font-semibold text-green-900">📬 Contact Submissions</h3>
            <p className="text-sm text-green-700">View contact form submissions</p>
          </a>

          <a href="/admin/pages" className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200">
            <h3 className="font-semibold text-blue-900">📄 Pages & Routes</h3>
            <p className="text-sm text-blue-700">Scan routes, manage pages, edit content</p>
          </a>

          <a href="/admin/seo" className="block p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200">
            <h3 className="font-semibold text-indigo-900">🔍 SEO Manager</h3>
            <p className="text-sm text-indigo-700">Meta tags, Open Graph, schema markup</p>
          </a>

          <a href="/admin/media" className="block p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors border border-pink-200">
            <h3 className="font-semibold text-pink-900">🖼️ Media Library</h3>
            <p className="text-sm text-pink-700">Upload and manage images</p>
          </a>

          <a href="/admin/users" className="block p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors border border-amber-200">
            <h3 className="font-semibold text-amber-900">👥 Users</h3>
            <p className="text-sm text-amber-700">User accounts and roles</p>
          </a>

          <a href="/admin/activity" className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200">
            <h3 className="font-semibold text-slate-900">📊 Activity Logs</h3>
            <p className="text-sm text-slate-700">Track all CMS actions</p>
          </a>
        </div>
      </div>
    </div>
  );
}

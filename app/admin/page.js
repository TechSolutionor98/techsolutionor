"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { isRouteAllowed } from '@/lib/admin-permissions';

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [counts, setCounts] = useState({
    contactCount: 0,
    hireCount: 0,
    applicationsCount: 0,
    pagesCount: 0,
    mediaCount: 0,
    websitesCount: 1,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          setCurrentUser(JSON.parse(userStr));
        } catch (e) {}
      }
    }
  }, []);

  useEffect(() => {
    fetch('/api/cms/dashboard')
      .then(res => {
        if (!res.ok) return null;
        return res.json().catch(() => null);
      })
      .then(data => {
        if (data && !data.error) {
          setCounts(data);
        }
      })
      .catch(err => console.error('Failed to load dashboard counts:', err));
  }, []);

  const { contactCount, hireCount = 0, applicationsCount = 0, pagesCount, mediaCount, websitesCount } = counts;

  const STAT_CARDS = [
    { href: "/admin/contact-submissions", title: "Contact Inquiries", count: contactCount, sub: "Form messages", border: "border-green-500", text: "text-green-600" },
    { href: "/admin/hire-us", title: "Hire Us Requests", count: hireCount, sub: "Client talent intake", border: "border-[#41B349]", text: "text-[#41B349]" },
    { href: "/admin/applications", title: "Career Applicants", count: applicationsCount, sub: "Job candidates", border: "border-emerald-600", text: "text-emerald-600" },
    { href: "/admin/pages", title: "Pages & Routes", count: pagesCount, sub: "Website pages", border: "border-[#20507C]", text: "text-[#20507C]" },
    { href: "/admin/media", title: "Media Files", count: mediaCount, sub: "Uploaded assets", border: "border-pink-500", text: "text-pink-600" },
    { href: "/admin/settings", title: "Websites", count: websitesCount, sub: "Connected", border: "border-cyan-500", text: "text-cyan-600" },
  ];

  const QUICK_ACTIONS = [
    { href: "/admin/hire-us", title: "🤝 Hire Us Submissions", desc: "Manage client resource requirements & talent intake", bg: "bg-emerald-50", hover: "hover:bg-emerald-100", border: "border-emerald-200", titleColor: "text-emerald-900", descColor: "text-emerald-700" },
    { href: "/admin/contact-submissions", title: "📬 Contact Messages", desc: "View contact inquiries and quotes", bg: "bg-green-50", hover: "hover:bg-green-100", border: "border-green-200", titleColor: "text-green-900", descColor: "text-green-700" },
    { href: "/admin/applications", title: "💼 Career Applications", desc: "Review & manage candidate resumes", bg: "bg-teal-50", hover: "hover:bg-teal-100", border: "border-teal-200", titleColor: "text-teal-900", descColor: "text-teal-700" },
    { href: "/admin/pages", title: "📄 Pages & Routes", desc: "Scan routes, manage pages, edit content", bg: "bg-blue-50", hover: "hover:bg-blue-100", border: "border-blue-200", titleColor: "text-blue-900", descColor: "text-blue-700" },
    { href: "/admin/seo", title: "🔍 SEO Manager", desc: "Meta tags, Open Graph, schema markup", bg: "bg-indigo-50", hover: "hover:bg-indigo-100", border: "border-indigo-200", titleColor: "text-indigo-900", descColor: "text-indigo-700" },
    { href: "/admin/media", title: "🖼️ Media Library", desc: "Upload and manage images", bg: "bg-pink-50", hover: "hover:bg-pink-100", border: "border-pink-200", titleColor: "text-pink-900", descColor: "text-pink-700" },
    { href: "/admin/users", title: "👥 Users", desc: "User accounts and roles", bg: "bg-amber-50", hover: "hover:bg-amber-100", border: "border-amber-200", titleColor: "text-amber-900", descColor: "text-amber-700" },
    { href: "/admin/activity", title: "📊 Activity Logs", desc: "Track all CMS actions", bg: "bg-slate-50", hover: "hover:bg-slate-100", border: "border-slate-200", titleColor: "text-slate-900", descColor: "text-slate-700" },
  ];

  const allowedStatCards = STAT_CARDS.filter(s => isRouteAllowed(s.href, currentUser));
  const allowedQuickActions = QUICK_ACTIONS.filter(q => isRouteAllowed(q.href, currentUser));

  return (
    <div className="space-y-6 overflow-x-hidden">
      {/* Header */}
      <h1 className="text-[30px] font-bold">ADMIN DASHBOARD</h1>
      
      {/* Stats Overview */}
      {allowedStatCards.length > 0 && (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(allowedStatCards.length, 6)} gap-4`}>
          {allowedStatCards.map(s => (
            <div key={s.href} className={`bg-white p-5 rounded-lg shadow border-l-4 ${s.border}`}>
              <h3 className="text-sm font-semibold mb-1 text-gray-700">{s.title}</h3>
              <p className={`text-2xl font-bold ${s.text}`}>{s.count}</p>
              <p className="text-xs text-gray-500">{s.sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      {allowedQuickActions.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {allowedQuickActions.map(action => (
              <Link
                key={action.href}
                href={action.href}
                className={`block p-4 ${action.bg} rounded-lg ${action.hover} transition-colors border ${action.border}`}
              >
                <h3 className={`font-semibold ${action.titleColor}`}>{action.title}</h3>
                <p className={`text-sm ${action.descColor}`}>{action.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

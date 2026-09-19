'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LogoutButton from '@/app/admin/components/LogoutButton';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/src/Components/Images/blacklogo.png';
import { FiLock } from 'react-icons/fi';
import { IoIosLogOut } from "react-icons/io";
import { AdminNotificationProvider, useAdminNotifications } from './AdminNotificationContext';
import NotificationBell from './NotificationBell';
import {
  LayoutDashboard,
  Globe,
  FileText,
  Image as ImageIcon,
  Sparkles,
  Search,
  TrendingUp,
  ArrowRightLeft,
  BookOpen,
  FilePlus,
  MessageSquare,
  Users,
  Inbox,
  Mail,
  Briefcase,
  Calendar,
  Star,
  Settings,
  Sliders,
  ShieldCheck,
  History,
  ChevronDown
} from 'lucide-react';

const ROLE_ALLOWED_ROUTES = {
  super_admin: ["*"],
  admin: [
    "/admin",
    "/admin/applications",
    "/admin/contact-submissions",
    "/admin/reviews",
    "/admin/settings",
    "/admin/pages",
    "/admin/seo",
    "/admin/redirects",
    "/admin/media",
    "/admin/logos",
    "/admin/activity",
    "/admin/blogs",
    "/admin/appointments",
    "/admin/users",
    "/admin/quote-submissions"
  ],
  client: [
    "/admin",
    "/admin/applications",
    "/admin/contact-submissions",
    "/admin/reviews",
    "/admin/settings",
    "/admin/pages",
    "/admin/seo",
    "/admin/redirects",
    "/admin/media",
    "/admin/logos",
    "/admin/blogs",
    "/admin/appointments",
    "/admin/quote-submissions"
  ],
  blog: [
    "/admin",
    "/admin/applications",
    "/admin/blogs"
  ],
  seo: [
    "/admin",
    "/admin/applications",
    "/admin/pages",
    "/admin/seo",
    "/admin/redirects"
  ],
  editor: [
    "/admin",
    "/admin/applications",
    "/admin/contact-submissions",
    "/admin/pages",
    "/admin/redirects",
    "/admin/media",
    "/admin/logos"
  ],
  viewer: [
    "/admin",
    "/admin/applications",
    "/admin/contact-submissions",
    "/admin/pages",
    "/admin/seo",
    "/admin/redirects"
  ]
};

// Logical navigation structure grouped into exactly 4 functional dropdown sections
const NAV_GROUPS = [
  {
    id: "inquiries",
    label: "Leads & Inquiries",
    icon: Inbox,
    items: [
      { href: "/admin/contact-submissions", label: "Contact Messages", icon: Mail, description: "Inquiries from contact forms" },
      { href: "/admin/applications", label: "Job Applications", icon: Briefcase, description: "Career applicant resumes" },
      { href: "/admin/reviews", label: "Customer Reviews", icon: Star, description: "Ratings and testimonials" },
    ]
  },
  {
    id: "content_seo",
    label: "SEO & Content",
    icon: Globe,
    items: [
      { href: "/admin/pages", label: "Pages & Sections", icon: FileText, description: "Manage pages and section content" },
      { href: "/admin/seo", label: "SEO Manager", icon: TrendingUp, description: "Meta tags, schema, and SEO scores" },
      { href: "/admin/media", label: "Media Library", icon: ImageIcon, description: "Manage images and asset files" },
      { href: "/admin/redirects", label: "URL Redirects", icon: ArrowRightLeft, description: "Manage 301/302 link forwarding" },
      { href: "/admin/logos", label: "Website Logo", icon: Sparkles, description: "Update header and footer logo" },
    ]
  },
  {
    id: "blogs",
    label: "Blog Management",
    icon: BookOpen,
    items: [
      { href: "/admin/blogs", label: "All Articles", icon: FileText, description: "View and edit blog posts" },
      { href: "/admin/blogs/add", label: "Create Article", icon: FilePlus, description: "Write and publish new article" },
      { href: "/admin/blogs/comments", label: "Comments", icon: MessageSquare, description: "Moderate user comments" },
      { href: "/admin/blogs/users", label: "Authors & Writers", icon: Users, description: "Manage blog contributors" },
    ]
  },
  {
    id: "system",
    label: "System & Settings",
    icon: Settings,
    items: [
      { href: "/admin/settings", label: "Business Settings", icon: Sliders, description: "Company information and socials" },
      { href: "/admin/users", label: "Admin Accounts", icon: ShieldCheck, description: "Manage user roles and logins" },
      { href: "/admin/activity", label: "Activity Logs", icon: History, description: "System audit trail and history" },
    ]
  }
];

function getItemUnreadCount(href, unreadCounts) {
  if (!unreadCounts) return 0;
  if (href === '/admin/contact-submissions') return unreadCounts.contactMessages || 0;
  if (href === '/admin/applications') return unreadCounts.jobApplications || 0;
  if (href === '/admin/reviews') return unreadCounts.customerReviews || 0;
  if (href === '/admin/blogs/comments') return unreadCounts.blogComments || 0;
  return 0;
}

function getGroupUnreadCount(groupId, unreadByGroup) {
  if (!unreadByGroup) return 0;
  return unreadByGroup[groupId] || 0;
}

function AdminLayoutContent({ children, title = '' }) {
  const pathname = usePathname();
  const { unreadCounts, unreadByGroup } = useAdminNotifications();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDropdowns, setOpenDropdowns] = useState({
    inquiries: true,
    content_seo: true,
    blogs: false,
    system: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          setCurrentUser(JSON.parse(userStr));
        } catch (e) {
          console.error("Failed to parse user details:", e);
        }
      } else {
        const token = localStorage.getItem("jwt");
        if (token) {
          setCurrentUser({ name: "Super Admin", role: "super_admin" });
        }
      }
    }
    setLoading(false);
  }, []);

  // Automatically open the dropdown that contains the current pathname
  useEffect(() => {
    if (!pathname) return;
    for (const group of NAV_GROUPS) {
      const hasActiveChild = group.items.some(item => {
        const target = item.href.replace(/\/$/, "");
        const current = pathname.replace(/\/$/, "");
        return current === target || pathname.startsWith(target + "/");
      });
      if (hasActiveChild) {
        setOpenDropdowns(prev => ({ ...prev, [group.id]: true }));
      }
    }
  }, [pathname]);

  const toggleDropdown = (groupId) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const role = currentUser?.role || 'super_admin';

  const isRouteAllowed = (path) => {
    if (path === "/admin/applications" || path.startsWith("/admin/applications")) {
      return true;
    }
    const allowed = ROLE_ALLOWED_ROUTES[role] || ROLE_ALLOWED_ROUTES.admin || ["*"];
    if (allowed.includes("*")) return true;
    return allowed.some(allowedPath => {
      if (allowedPath === "/admin") {
        return path === "/admin" || path === "/admin/";
      }
      return path.startsWith(allowedPath);
    });
  };

  const isAllowed = loading || isRouteAllowed(pathname);

  const isLinkActive = (href) => {
    if (!pathname || !href) return false;
    const current = pathname.replace(/\/$/, "");
    const target = href.replace(/\/$/, "");
    if (target === "/admin") {
      return current === "/admin";
    }
    return current === target || pathname.startsWith(target + "/");
  };

  const isGroupActive = (group) => {
    return group.items.some(item => isLinkActive(item.href));
  };

  // Filter groups according to current role permissions
  const visibleGroups = NAV_GROUPS.map(group => {
    const allowedItems = group.items.filter(item => isRouteAllowed(item.href));
    return { ...group, items: allowedItems };
  }).filter(group => group.items.length > 0);

  const isDashboardActive = isLinkActive("/admin");

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC] text-gray-900 relative">

      {/* Top-right Controls: Notification Bell + User Role + Logout */}
      <div className="fixed top-3 right-4 z-50 flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur-sm py-1.5 px-3 rounded-xl shadow-sm border border-gray-200/80">
        <NotificationBell />
        <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />
        {currentUser && (
          <span className="hidden md:inline-block text-xs text-gray-500 font-medium">
            Logged in as: <strong className="text-[#20507C]">{currentUser.name}</strong> <span className="capitalize font-semibold text-gray-600">({role.replace('_', ' ')})</span>
          </span>
        )}
        <LogoutButton>
          <div className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-[#34953C] hover:bg-[#2b7e32] text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-xs">
            <IoIosLogOut className="w-4 h-4" />
            <span>Logout</span>
          </div>
        </LogoutButton>
      </div>

      {/* Fixed Admin Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-200 p-4 pt-16 md:pt-5 md:fixed md:top-0 md:left-0 md:h-screen md:z-40 bg-white overflow-y-auto">
        {/* Brand Logo */}
        <div className="mb-4 flex justify-center items-center px-2">
          <Link href="/admin" className="inline-block group no-underline transition-transform hover:scale-[1.01]">
            <Image 
              src={Logo} 
              alt="TechSolutionor Logo" 
              width={260} 
              height={80} 
              className="h-16 sm:h-20 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />

        {/* Sidebar Navigation */}
        <nav className="flex flex-col gap-1.5 text-sm pb-16">
          
          {/* Main Dashboard Link */}
          {isRouteAllowed("/admin") && (
            <div className="mb-2">
              <Link href="/admin" className="no-underline block">
                <div
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDashboardActive
                      ? "bg-[#34953C] text-white shadow-xs"
                      : "text-gray-700 hover:text-gray-950 hover:bg-gray-100/90"
                  }`}
                >
                  <LayoutDashboard className={`w-4 h-4 ${isDashboardActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>Dashboard</span>
                </div>
              </Link>
            </div>
          )}

          {/* Dropdown Groups */}
          {visibleGroups.map(group => {
            const GroupIcon = group.icon;
            const isOpen = !!openDropdowns[group.id];
            const hasActive = isGroupActive(group);
            const groupUnread = getGroupUnreadCount(group.id, unreadByGroup);

            return (
              <div key={group.id} className="rounded-lg transition-all duration-150">
                {/* Dropdown Header Button */}
                <button
                  type="button"
                  onClick={() => toggleDropdown(group.id)}
                  aria-expanded={isOpen}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-all duration-150 cursor-pointer ${
                    hasActive && !isOpen
                      ? "bg-green-50/70 text-[#2b7e32] font-semibold"
                      : "text-gray-700 hover:text-gray-950 hover:bg-gray-100/80 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <GroupIcon className={`w-4 h-4 flex-shrink-0 ${hasActive ? 'text-[#34953C]' : 'text-gray-500'}`} />
                    <span className="text-sm truncate">{group.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {groupUnread > 0 && (
                      <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-red-500 text-white shadow-xs">
                        {groupUnread > 99 ? '99+' : groupUnread}
                      </span>
                    )}
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-gray-600' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Dropdown Children */}
                {isOpen && (
                  <div className="mt-1 ml-3.5 pl-3 border-l-2 border-gray-100 flex flex-col gap-0.5 py-0.5 animate-fadeIn">
                    {group.items.map(item => {
                      const ItemIcon = item.icon;
                      const isActive = isLinkActive(item.href);
                      const unreadCount = getItemUnreadCount(item.href, unreadCounts);

                      return (
                        <Link key={item.href} href={item.href} className="no-underline block">
                          <div
                            className={`flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ${
                              isActive
                                ? "bg-[#34953C] text-white shadow-xs font-semibold"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            }`}
                            title={item.description}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <ItemIcon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                              <span className="truncate">{item.label}</span>
                            </div>
                            {unreadCount > 0 && (
                              <span
                                className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full transition-all flex-shrink-0 ml-1.5 ${
                                  isActive
                                    ? "bg-white text-[#34953C]"
                                    : "bg-red-500 text-white"
                                }`}
                              >
                                {unreadCount > 99 ? '99+' : unreadCount}
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area - Scrollable and Offset by Fixed Sidebar */}
      <main className="flex-1 md:ml-64 px-3 sm:px-4 py-4 md:py-5 overflow-x-hidden min-h-screen">
        {title ? (
          <header className="mb-4 mt-6 md:mt-0">
            <h1 className="text-2xl font-semibold">{title}</h1>
          </header>
        ) : null}
        <section>
          {isAllowed ? (
            children
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6 shadow-sm">
                <FiLock size={30} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Restricted</h2>
              <p className="text-gray-600 max-w-md mb-8">
                Your account role <span className="font-semibold text-[#20507C] uppercase">({role.replace('_', ' ')})</span> does not have permission to view this section.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/admin" className="px-5 py-2.5 bg-[#34953C] hover:bg-[#34953C] text-white font-semibold rounded-md transition shadow-md">
                  Go to Dashboard
                </Link>
                {role === 'seo' && (
                  <Link href="/admin/pages" className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-md transition">
                    Go to Pages & Routes
                  </Link>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default function AdminLayout({ children, title = '' }) {
  return (
    <AdminNotificationProvider>
      <AdminLayoutContent title={title}>
        {children}
      </AdminLayoutContent>
    </AdminNotificationProvider>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminNotifications } from './AdminNotificationContext';
import {
  Bell,
  CheckCheck,
  Mail,
  Calendar,
  Briefcase,
  Star,
  MessageSquare,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

function getNotificationIcon(type) {
  switch (type) {
    case 'appointment':
      return {
        icon: Calendar,
        bgColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        label: 'Appointment',
      };
    case 'contact':
      return {
        icon: Mail,
        bgColor: 'bg-blue-100 text-blue-700 border-blue-200',
        label: 'Contact Us',
      };
    case 'application':
      return {
        icon: Briefcase,
        bgColor: 'bg-purple-100 text-purple-700 border-purple-200',
        label: 'Job Application',
      };
    case 'review':
      return {
        icon: Star,
        bgColor: 'bg-amber-100 text-amber-700 border-amber-200',
        label: 'Review',
      };
    case 'comment':
      return {
        icon: MessageSquare,
        bgColor: 'bg-teal-100 text-teal-700 border-teal-200',
        label: 'Comment',
      };
    default:
      return {
        icon: Bell,
        bgColor: 'bg-gray-100 text-gray-700 border-gray-200',
        label: 'Alert',
      };
  }
}

function formatRelativeTime(dateStr) {
  if (!dateStr) return 'Recently';
  const dt = new Date(dateStr);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - dt.getTime()) / 1000);

  if (diffSec < 45) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

export default function NotificationBell() {
  const router = useRouter();
  const { unreadCounts, notifications, markAsRead, markAllAsRead } = useAdminNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'unread'
  const dropdownRef = useRef(null);

  const totalUnread = unreadCounts.total || 0;

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const filteredNotifications = notifications.filter(item => {
    if (activeTab === 'unread') return !item.isRead;
    return true;
  });

  const handleNotificationClick = (item) => {
    if (!item.isRead) {
      markAsRead(item.type, item.id || item._id);
    }
    setIsOpen(false);
    if (item.link) {
      router.push(item.link);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="relative p-2 rounded-xl text-gray-600 hover:text-gray-950 hover:bg-gray-100 transition-all duration-150 cursor-pointer focus:outline-none"
        aria-label="View notifications"
        aria-expanded={isOpen}
      >
        <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />

        {/* Unread Counter Badge */}
        {totalUnread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full shadow-xs ring-2 ring-white animate-pulse">
            {totalUnread > 99 ? '99+' : totalUnread}
          </span>
        )}
      </button>

      {/* Notification Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[340px] sm:w-[390px] bg-white rounded-2xl shadow-2xl border border-gray-200/90 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="p-3.5 border-b border-gray-100 bg-gray-50/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
              {totalUnread > 0 ? (
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[11px] font-bold rounded-full">
                  {totalUnread} new
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-[11px] font-medium rounded-full">
                  All caught up
                </span>
              )}
            </div>

            {totalUnread > 0 && (
              <button
                type="button"
                onClick={() => markAllAsRead('all')}
                className="flex items-center gap-1 text-xs text-[#34953C] hover:text-[#287730] font-semibold cursor-pointer transition-colors"
                title="Mark all notifications as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="px-3.5 pt-2 pb-1 flex items-center gap-2 border-b border-gray-100 text-xs font-semibold text-gray-500">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`pb-1.5 border-b-2 transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'border-[#34953C] text-[#34953C] font-bold'
                  : 'border-transparent hover:text-gray-900'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('unread')}
              className={`pb-1.5 border-b-2 transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'unread'
                  ? 'border-[#34953C] text-[#34953C] font-bold'
                  : 'border-transparent hover:text-gray-900'
              }`}
            >
              <span>Unread</span>
              {totalUnread > 0 && (
                <span className="px-1.5 py-0.2 bg-red-500 text-white rounded-full text-[9px] font-bold">
                  {totalUnread}
                </span>
              )}
            </button>
          </div>

          {/* Notification Items List */}
          <div className="max-h-[360px] overflow-y-auto divide-y divide-gray-100">
            {filteredNotifications.length === 0 ? (
              <div className="py-12 px-4 text-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center mb-2">
                  <Bell className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-gray-700">No {activeTab === 'unread' ? 'unread ' : ''}notifications</p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  New submissions from frontend forms will appear here in real time.
                </p>
              </div>
            ) : (
              filteredNotifications.map((item) => {
                const { icon: ItemIcon, bgColor } = getNotificationIcon(item.type);
                const isUnread = !item.isRead;

                return (
                  <div
                    key={`${item.type}_${item.id || item._id}`}
                    onClick={() => handleNotificationClick(item)}
                    className={`p-3 transition-colors cursor-pointer flex items-start gap-3 relative hover:bg-gray-50/90 ${
                      isUnread ? 'bg-green-50/40' : 'bg-white'
                    }`}
                  >
                    {/* Unread Status Dot */}
                    {isUnread && (
                      <span className="absolute top-3.5 right-3 w-2 h-2 rounded-full bg-[#34953C] shadow-xs" />
                    )}

                    {/* Type Icon Badge */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${bgColor}`}>
                      <ItemIcon className="w-4 h-4" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-3">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          {item.source}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-[10px] text-gray-400">
                          {formatRelativeTime(item.createdAt)}
                        </span>
                      </div>

                      <h4 className={`text-xs leading-tight truncate ${isUnread ? 'font-bold text-gray-950' : 'font-medium text-gray-800'}`}>
                        {item.author}
                      </h4>

                      <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5 leading-snug">
                        {item.preview}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
            <Link
              href="/admin/contact-submissions"
              onClick={() => setIsOpen(false)}
              className="text-[#34953C] hover:underline font-semibold flex items-center gap-1 text-[11px]"
            >
              <span>View All Submissions</span>
              <ChevronRight className="w-3 h-3" />
            </Link>

            <Link
              href="/admin/applications"
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-800 text-[11px] flex items-center gap-1"
            >
              <span>Applications</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

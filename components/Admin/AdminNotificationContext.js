'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const AdminNotificationContext = createContext({
  unreadCounts: {
    contactMessages: 0,
    jobApplications: 0,
    customerReviews: 0,
    blogComments: 0,
    unreadEmails: 0,
    total: 0,
  },
  unreadByGroup: {
    inquiries: 0,
    blogs: 0,
  },
  notifications: [],
  loading: true,
  refreshNotifications: async () => {},
  markAsRead: async () => {},
  markAllAsRead: async () => {},
});

// Soft, pleasant audio chime using standard Web Audio API
function playNotificationChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(440, now); // A4
    osc2.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  } catch (_) {
    // Ignore audio permission or browser restriction errors silently
  }
}

export function AdminNotificationProvider({ children }) {
  const [unreadCounts, setUnreadCounts] = useState({
    contactMessages: 0,
    jobApplications: 0,
    customerReviews: 0,
    blogComments: 0,
    unreadEmails: 0,
    total: 0,
  });
  const [unreadByGroup, setUnreadByGroup] = useState({
    inquiries: 0,
    blogs: 0,
  });
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeToast, setActiveToast] = useState(null);

  const prevTotalRef = useRef(null);
  const isInitialFetchRef = useRef(true);

  const fetchNotifications = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      const res = await fetch('/api/admin/notifications', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load notifications');
      const data = await res.json();

      const newCounts = data.counts || {
        contactMessages: 0,
        jobApplications: 0,
        customerReviews: 0,
        blogComments: 0,
        unreadEmails: 0,
        total: 0,
      };

      // If new unread items arrived while admin is on the panel (not on first load)
      if (!isInitialFetchRef.current && prevTotalRef.current !== null && newCounts.total > prevTotalRef.current) {
        const diff = newCounts.total - prevTotalRef.current;
        const latestItem = data.notifications?.[0];
        
        playNotificationChime();
        setActiveToast({
          title: latestItem ? `${latestItem.title}` : 'New Notification Received',
          message: latestItem ? `${latestItem.author} • ${latestItem.source}` : `${diff} new submission(s) waiting for review`,
          link: latestItem?.link || '/admin/contact-submissions',
          id: Date.now(),
        });
      }

      isInitialFetchRef.current = false;
      prevTotalRef.current = newCounts.total;

      setUnreadCounts(newCounts);
      setUnreadByGroup(data.unreadByGroup || { inquiries: 0, blogs: 0 });
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error('Error fetching admin notifications:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load and periodic polling every 10 seconds
  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications(true);
    }, 10000);

    // Refresh when tab gains focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchNotifications(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Refresh on custom event dispatched by admin pages
    const handleCustomRefresh = () => {
      fetchNotifications(true);
    };
    window.addEventListener('admin-notifications-refresh', handleCustomRefresh);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('admin-notifications-refresh', handleCustomRefresh);
    };
  }, [fetchNotifications]);

  // Mark a single notification item as read
  const markAsRead = useCallback(async (type, id) => {
    // Optimistic UI update: remove read item from notification list
    setNotifications(prev =>
      prev.filter(item => !(item.id === id || item._id === id))
    );

    setUnreadCounts(prev => {
      const fieldMap = {
        contact: 'contactMessages',
        appointment: 'contactMessages',
        application: 'jobApplications',
        review: 'customerReviews',
        comment: 'blogComments',
      };
      const field = fieldMap[type];
      const updatedCounts = { ...prev };
      if (field && updatedCounts[field] > 0) {
        updatedCounts[field] -= 1;
      }
      if (updatedCounts.total > 0) {
        updatedCounts.total -= 1;
      }
      return updatedCounts;
    });

    try {
      await fetch('/api/admin/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type, isRead: true }),
      });
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-notifications-refresh'));
      }
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
      // Resync in case of error
      fetchNotifications(true);
    }
  }, [fetchNotifications]);

  // Mark all notifications of a specific type or all types as read
  const markAllAsRead = useCallback(async (type = 'all') => {
    // Optimistic UI update: remove read items from notification list
    if (type === 'all') {
      setNotifications([]);
      setUnreadCounts({
        contactMessages: 0,
        jobApplications: 0,
        customerReviews: 0,
        blogComments: 0,
        total: 0,
      });
      setUnreadByGroup({ inquiries: 0, blogs: 0 });
    } else {
      setNotifications(prev =>
        prev.filter(item => item.type !== type)
      );
      setUnreadCounts(prev => {
        const fieldMap = {
          contact: 'contactMessages',
          appointment: 'contactMessages',
          application: 'jobApplications',
          review: 'customerReviews',
          comment: 'blogComments',
        };
        const field = fieldMap[type];
        if (!field) return prev;
        const currentFieldCount = prev[field] || 0;
        return {
          ...prev,
          [field]: 0,
          total: Math.max(0, prev.total - currentFieldCount),
        };
      });
    }

    try {
      await fetch('/api/admin/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, markAll: true }),
      });
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-notifications-refresh'));
      }
    } catch (err) {
      console.error('Failed to mark all as read:', err);
      fetchNotifications(true);
    }
  }, [fetchNotifications]);

  const triggerRefresh = useCallback(() => {
    fetchNotifications(true);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('admin-notifications-refresh'));
    }
  }, [fetchNotifications]);

  return (
    <AdminNotificationContext.Provider
      value={{
        unreadCounts,
        unreadByGroup,
        notifications,
        loading,
        refreshNotifications: triggerRefresh,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}

      {/* Real-time Toast Banner for incoming requests */}
      {activeToast && (
        <div 
          className="fixed bottom-6 right-6 z-[9999] max-w-sm bg-white rounded-xl shadow-2xl border-2 border-[#34953C] p-4 flex items-start gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300"
          role="alert"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-[#34953C] flex-shrink-0 font-bold text-base">
            🔔
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-gray-900 truncate">{activeToast.title}</h4>
            <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-2">{activeToast.message}</p>
            <div className="mt-2 flex items-center gap-2">
              <a
                href={activeToast.link}
                onClick={() => setActiveToast(null)}
                className="text-[11px] font-bold text-[#34953C] hover:underline"
              >
                Review Now →
              </a>
              <button
                type="button"
                onClick={() => setActiveToast(null)}
                className="text-[11px] text-gray-400 hover:text-gray-600 ml-auto cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminNotificationContext.Provider>
  );
}

export function useAdminNotifications() {
  return useContext(AdminNotificationContext);
}

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBottomNav() {
  const pathname = usePathname() || '/';

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      isActive: (path) => path === '/',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 10.5L12 3.5L20 10.5V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V10.5Z" />
          <line x1="10" y1="16" x2="14" y2="16" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'about',
      label: 'About',
      href: '/about-us',
      isActive: (path) => path === '/about-us' || path.startsWith('/about'),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: 'blogs',
      label: 'Blogs',
      href: '/blog',
      isActive: (path) => path === '/blog' || path.startsWith('/blog/'),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M8 6h8" />
          <path d="M8 10h8" />
          <path d="M8 14h5" />
        </svg>
      ),
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '/contact-us',
      isActive: (path) => path === '/contact-us' || path.startsWith('/contact'),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-1.5rem)] max-w-[420px] pointer-events-none select-none">
      <nav
        aria-label="Mobile Bottom Navigation"
        className="pointer-events-auto relative w-full h-[62px] sm:h-[66px] bg-[#181918] border border-white/10 rounded-2xl sm:rounded-full px-2 sm:px-3 flex items-center justify-between"
      >
        {navItems.map((item) => {
          const active = item.isActive(pathname);
          return (
            <Link
              key={item.id}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 group active:scale-95 ${
                active ? 'text-[#41B349]' : 'text-gray-400 hover:text-white'
              }`}
            >
              {/* Icon at the top */}
              <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                {item.icon}
              </div>

              {/* Page name below the icon */}
              <span
                className={`text-[11px] min-[360px]:text-[12px] font-semibold tracking-tight mt-1 transition-colors duration-200 truncate ${
                  active ? 'text-[#41B349]' : 'text-gray-400 group-hover:text-white'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

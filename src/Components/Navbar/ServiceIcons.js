import React from "react";

// 1. Web Development - Modern browser with traffic dots & vibrant code brackets
export const WebDevIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="webdev-grad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    <rect x="2" y="4" width="28" height="24" rx="5" fill="url(#webdev-grad)" />
    <path d="M2 11H30" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
    <circle cx="6.5" cy="7.5" r="1.5" fill="#EF4444" />
    <circle cx="11" cy="7.5" r="1.5" fill="#F59E0B" />
    <circle cx="15.5" cy="7.5" r="1.5" fill="#10B981" />
    {/* Code Brackets */}
    <path d="M12 16L8.5 19.5L12 23" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 16L23.5 19.5L20 23" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.5 15L14.5 24" stroke="#67E8F9" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// 2. App Development - Sleek smartphone with app grid
export const AppDevIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="appdev-grad" x1="6" y1="2" x2="26" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8B5CF6" />
        <stop offset="1" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <rect x="6" y="2" width="20" height="28" rx="4.5" fill="url(#appdev-grad)" />
    <rect x="8.5" y="5.5" width="15" height="20" rx="2" fill="#0F172A" />
    {/* Screen apps */}
    <rect x="10.5" y="7.5" width="4.5" height="4.5" rx="1.2" fill="#38BDF8" />
    <rect x="17" y="7.5" width="4.5" height="4.5" rx="1.2" fill="#F43F5E" />
    <rect x="10.5" y="14" width="4.5" height="4.5" rx="1.2" fill="#FBBF24" />
    <rect x="17" y="14" width="4.5" height="4.5" rx="1.2" fill="#34D399" />
    {/* Home indicator */}
    <line x1="13.5" y1="27.5" x2="18.5" y2="27.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    {/* Speaker notch */}
    <circle cx="16" cy="4" r="0.8" fill="white" fillOpacity="0.8" />
  </svg>
);

// 3. Software Development - Terminal cloud console with binary stack
export const SoftwareDevIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="software-grad" x1="2" y1="3" x2="30" y2="29" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0284C7" />
        <stop offset="1" stopColor="#0369A1" />
      </linearGradient>
    </defs>
    <rect x="2" y="3" width="28" height="26" rx="5" fill="url(#software-grad)" />
    {/* Server disks / Terminal layers */}
    <rect x="5.5" y="6.5" width="21" height="7" rx="2" fill="#0F172A" />
    <circle cx="9" cy="10" r="1.2" fill="#10B981" />
    <line x1="13" y1="10" x2="23" y2="10" stroke="#38BDF8" strokeWidth="1.6" strokeLinecap="round" />

    <rect x="5.5" y="15.5" width="21" height="10" rx="2" fill="#0F172A" />
    {/* Terminal prompt */}
    <path d="M8.5 18.5L11 20.5L8.5 22.5" stroke="#34D399" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="13" y1="20.5" x2="18" y2="20.5" stroke="#F8FAFC" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// 4. Ecommerce Development - Storefront shopping bag with emerald sheen
export const EcommerceDevIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="ecom-grad" x1="4" y1="8" x2="28" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
    </defs>
    {/* Bag handle */}
    <path d="M11 11V7C11 4.23858 13.2386 2 16 2C18.7614 2 21 4.23858 21 7V11" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" />
    {/* Bag body */}
    <path d="M4.5 11L6.5 28C6.6 28.8 7.3 29.5 8.2 29.5H23.8C24.7 29.5 25.4 28.8 25.5 28L27.5 11H4.5Z" fill="url(#ecom-grad)" />
    {/* Shopping cart glyph inside */}
    <circle cx="16" cy="18" r="4.5" fill="#FFFFFF" fillOpacity="0.2" />
    <path d="M13 18.5L15 20.5L19.5 16" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 5. Graphics & UI/UX - Art palette with vibrant paint wells & brush
export const GraphicsDevIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="graphics-grad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EC4899" />
        <stop offset="0.5" stopColor="#A855F7" />
        <stop offset="1" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    {/* Palette base */}
    <path d="M16 2C8.26801 2 2 8.26801 2 16C2 21.5 5.5 26.5 11 28.5C12.5 29 14 28 14 26.5V25C14 23.9 14.9 23 16 23H18C23.5228 23 28 18.5228 28 13C28 6.92487 22.6274 2 16 2Z" fill="url(#graphics-grad)" />
    {/* Color wells */}
    <circle cx="9" cy="10" r="2.2" fill="#FBBF24" />
    <circle cx="16" cy="8" r="2.2" fill="#34D399" />
    <circle cx="22" cy="12" r="2.2" fill="#38BDF8" />
    <circle cx="21" cy="18" r="2.2" fill="#F43F5E" />
    {/* Thumb hole */}
    <circle cx="9.5" cy="22" r="2.5" fill="#FFFFFF" />
  </svg>
);

// 6. Social Media - Heart & messaging bubbles with vibrant social sunset gradient
export const SocialMediaDevIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="social-grad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F43F5E" />
        <stop offset="0.5" stopColor="#D946EF" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    {/* Main bubble */}
    <rect x="2" y="3" width="24" height="20" rx="6" fill="url(#social-grad)" />
    <path d="M8 23L5 28L12 23H20C23.3 23 26 20.3 26 17V9C26 5.7 23.3 3 20 3H8C4.7 3 2 5.7 2 9V17C2 20.3 4.7 23 8 23Z" fill="url(#social-grad)" />
    {/* Heart symbol inside */}
    <path d="M14 8.5C12.5 6.8 9.8 7.3 9.2 9.5C8.4 12.3 12 15.5 14 17C16 15.5 19.6 12.3 18.8 9.5C18.2 7.3 15.5 6.8 14 8.5Z" fill="#FFFFFF" />
    {/* Mini floating notification badge */}
    <circle cx="25.5" cy="6.5" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
    <path d="M23.5 6.5L25 8L27.5 5.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 7. Digital Marketing - Megaphone bullhorn with energetic broadcast waves
export const DigitalMarketingDevIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="dig-grad" x1="2" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EA580C" />
        <stop offset="1" stopColor="#DC2626" />
      </linearGradient>
    </defs>
    {/* Megaphone body */}
    <path d="M4 12H7L16 6V22L7 16H4C2.9 16 2 15.1 2 14V14C2 12.9 2.9 12 4 12Z" fill="url(#dig-grad)" />
    {/* Megaphone bell cap */}
    <path d="M16 6C17.5 6 18.5 9.5 18.5 14C18.5 18.5 17.5 22 16 22V6Z" fill="#FBBF24" />
    {/* Handle */}
    <path d="M8 16V22.5C8 23.9 9.1 25 10.5 25C11.9 25 13 23.9 13 22.5V16" stroke="#9A3412" strokeWidth="2.2" strokeLinecap="round" />
    {/* Sound broadcast waves */}
    <path d="M22 9C24 10.5 25 12.2 25 14C25 15.8 24 17.5 22 19" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M26 6C28.8 8.5 30 11.2 30 14C30 16.8 28.8 19.5 26 22" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// 8. PPC & Amazon - Bullseye target with high-intent click arrow & Amazon orange accent
export const PpcAmazonDevIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="ppc-grad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F59E0B" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
    </defs>
    {/* Outer target circle */}
    <circle cx="16" cy="16" r="13" fill="url(#ppc-grad)" />
    <circle cx="16" cy="16" r="9.5" fill="#FFFFFF" />
    <circle cx="16" cy="16" r="6" fill="#2563EB" />
    <circle cx="16" cy="16" r="2.8" fill="#FFFFFF" />
    {/* Cursor pointer hitting bullseye */}
    <path d="M19 19L27 27M27 27L22 27M27 27L27 22" stroke="#EF4444" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 11. Search Engine Optimization - Magnifying glass with upward ranking chart
export const SeoDevIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="seo-grad" x1="2" y1="2" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563EB" />
        <stop offset="1" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    {/* Lens circle */}
    <circle cx="14" cy="14" r="11" fill="url(#seo-grad)" />
    <circle cx="14" cy="14" r="8.5" fill="#0F172A" />
    {/* Growth bars inside */}
    <rect x="9" y="15" width="2.2" height="4" rx="0.8" fill="#38BDF8" />
    <rect x="12.5" y="12" width="2.2" height="7" rx="0.8" fill="#FBBF24" />
    <rect x="16" y="9" width="2.2" height="10" rx="0.8" fill="#34D399" />
    {/* Upward arrow */}
    <path d="M9 13L17 7M17 7H13.5M17 7V10.5" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    {/* Handle */}
    <path d="M22 22L29 29" stroke="#1E40AF" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

// 12. Content Writing - Document with fountain pen & gold spark
export const ContentWritingDevIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="content-grad" x1="3" y1="2" x2="25" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366F1" />
        <stop offset="1" stopColor="#4338CA" />
      </linearGradient>
    </defs>
    {/* Document */}
    <rect x="3" y="3" width="19" height="26" rx="4" fill="url(#content-grad)" />
    <line x1="7" y1="9" x2="16" y2="9" stroke="#C7D2FE" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="7" y1="14" x2="18" y2="14" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="7" y1="19" x2="14" y2="19" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    {/* Pen / Quill */}
    <path d="M27 7L18 16V20H22L31 11C31.5 10.5 31.5 9.5 31 9L29 7C28.5 6.5 27.5 6.5 27 7Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.2" />
    <circle cx="28" cy="5" r="1.5" fill="#FBBF24" />
  </svg>
);

// 13. Call Center - Support headset with speech bubble
export const CallCenterDevIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="call-grad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06B6D4" />
        <stop offset="1" stopColor="#0891B2" />
      </linearGradient>
    </defs>
    {/* Headset arc */}
    <path d="M6 16C6 10.4772 10.4772 6 16 6C21.5228 6 26 10.4772 26 16V21" stroke="url(#call-grad)" strokeWidth="3" strokeLinecap="round" />
    {/* Left Earcup */}
    <rect x="4" y="15" width="4.5" height="8" rx="2.2" fill="url(#call-grad)" />
    {/* Right Earcup */}
    <rect x="23.5" y="15" width="4.5" height="8" rx="2.2" fill="url(#call-grad)" />
    {/* Microphone arm */}
    <path d="M25 21V23C25 25.2 23.2 27 21 27H17" stroke="#0891B2" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="15.5" cy="27" r="2" fill="#F43F5E" />
    {/* 24/7 bubble in center */}
    <rect x="11.5" y="11" width="9" height="7" rx="2" fill="#10B981" />
    <path d="M14 13H18M14 16H16.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// 14. Hire Us - Verified tech talent / shield with signature green star
export const HireUsDevIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="hire-grad" x1="3" y1="2" x2="29" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#41B349" />
        <stop offset="1" stopColor="#15803D" />
      </linearGradient>
    </defs>
    {/* Badge / Shield */}
    <path d="M16 2L5 6.5V15C5 21.8 9.7 28.1 16 30C22.3 28.1 27 21.8 27 15V6.5L16 2Z" fill="url(#hire-grad)" />
    {/* Inner verified user / developer checkmark */}
    <circle cx="16" cy="12" r="3.5" fill="#FFFFFF" />
    <path d="M10.5 21.5C10.5 18.5 13 16.5 16 16.5C19 16.5 21.5 18.5 21.5 21.5V23H10.5V21.5Z" fill="#FFFFFF" />
    <circle cx="21" cy="9" r="3" fill="#FBBF24" stroke="#15803D" strokeWidth="1" />
    <path d="M20 9L20.8 9.8L22.2 8.2" stroke="#15803D" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 15. Lead Generation - High-converting acquisition funnel with target crosshair & conversion magnet
export const LeadGenIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="leadgen-grad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
    </defs>
    {/* Funnel Body */}
    <path d="M4 6C4 4.89543 4.89543 4 6 4H26C27.1046 4 28 4.89543 28 6V8C28 8.6186 27.7126 9.1994 27.2248 9.5746L19 16V24L13 28V16L4.7752 9.5746C4.2874 9.1994 4 8.6186 4 8V6Z" fill="url(#leadgen-grad)" />
    {/* Target Circle */}
    <circle cx="23" cy="22" r="6.5" fill="#0F172A" stroke="#34D399" strokeWidth="1.8" />
    <circle cx="23" cy="22" r="2.8" fill="#F59E0B" />
    {/* Crosshairs */}
    <line x1="23" y1="17.5" x2="23" y2="19.5" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="23" y1="24.5" x2="23" y2="26.5" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18.5" y1="22" x2="20.5" y2="22" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="25.5" y1="22" x2="27.5" y2="22" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

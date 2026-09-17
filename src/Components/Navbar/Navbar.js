"use client"
import React, { useState, useEffect } from 'react'
import Logo from '@/src/Components/Images/Logo.png'
import Image from 'next/image'
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { Montserrat, Roboto, Plus_Jakarta_Sans } from 'next/font/google';
import { useQuote } from '@/app/_context/QuoteContext';
import Laraval from '@/src/Components/Images/laraval.png'
import Javascript from '@/src/Components/Images/js.png'
import Reactjs from '@/src/Components/Images/reactjs.png'
import Python from '@/src/Components/Images/python.png'
import Swift from '@/src/Components/Images/swift.png'
import Html from '@/src/Components/Images/html.png'
import Php from '@/src/Components/Images/php.png'
import Wp from '@/src/Components/Images/wp.png'
import Shopfiy from '@/src/Components/Images/shopify.png'
import Magento from '@/src/Components/Images/magento.png'
import Css from '@/src/Components/Images/css.png'
import Net from '@/src/Components/Images/net.png'
import Flutter from '@/src/Components/Images/flutter.png'
import Figma from '@/src/Components/Images/figma.png'
import Meta from '@/src/Components/Images/meta.png'
import Analytics from '@/src/Components/Images/nalytics.png'
import GoogleAds from '@/src/Components/Images/googleads.png'
import Angular from '@/src/Components/Images/angular.png'
import Web from '@/src/Components/Images/web.png'
import App from '@/src/Components/Images/app.png'
import Software from '@/src/Components/Images/software.png'
import Ecommerce from '@/src/Components/Images/ecommerce.png'
import Graphics from '@/src/Components/Images/graphics.png'
import SocialMedia from '@/src/Components/Images/socialmedia.png'
import Digital from '@/src/Components/Images/digital.png'
import Ppc from '@/src/Components/Images/ppc.png'
import Seo from '@/src/Components/Images/seo.png'
import Content from '@/src/Components/Images/content.png'
import Call from '@/src/Components/Images/call.png'
import Hire from '@/src/Components/Images/hire.png'

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['500', '600', '700', '800'],
});

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['500', '600', '700'],
});
const roboto = Roboto({
    subsets: ['latin'],
    weight: ['500', '700'],
});

// Tech sublinks
const techSubLinks = [
    { Image: Laraval, label: 'Laravel', href: '/technologies/laravel', desc: 'PHP Web Framework' },
    { Image: Javascript, label: 'JavaScript', href: '/technologies/javascript', desc: 'Modern Web Scripting' },
    { Image: Reactjs, label: 'React JS', href: '/technologies/react', desc: 'Interactive Frontend UIs' },
    { Image: Python, label: 'Python', href: '/technologies/python', desc: 'AI, ML & Backend Systems' },
    { Image: Swift, label: 'Swift', href: '/technologies/swift', desc: 'Native iOS & Apple Apps' },
    { Image: Html, label: 'HTML', href: '/technologies/html', desc: 'Semantic Web Structure' },
    { Image: Php, label: 'PHP', href: '/technologies/php', desc: 'Dynamic Server Solutions' },
    { Image: Wp, label: 'Wordpress', href: '/technologies/wordpress', desc: 'Custom CMS & Portals' },
    { Image: Shopfiy, label: 'Shopify', href: '/technologies/shopify', desc: 'E-Commerce Storefronts' },
    { Image: Magento, label: 'Magento', href: '/technologies/magento', desc: 'Enterprise E-Commerce' },
    { Image: Css, label: 'CSS', href: '/technologies/css', desc: 'Responsive Modern Styling' },
    { Image: Net, label: '.NET', href: '/technologies/dotnet', desc: 'Enterprise Applications' },
    { Image: Flutter, label: 'Flutter', href: '/technologies/flutter', desc: 'Cross-Platform Mobile' },
    { Image: Figma, label: 'Figma', href: '/technologies/figma', desc: 'UI/UX & Prototyping' },
    { Image: Meta, label: 'Meta', href: '/technologies/meta', desc: 'Social Ads & Marketing' },
    { Image: Analytics, label: 'Analytics', href: '/technologies/analytics', desc: 'Data & Performance Tracking' },
    { Image: GoogleAds, label: 'Google Ads', href: '/technologies/google-ads', desc: 'PPC & Search Campaigns' },
    { Image: Angular, label: 'Angular', href: '/technologies/angular', desc: 'Scalable Web Platforms' },
];

// Services sublinks
const servicesSubLinks = [
    { Image: Web, label: 'Web Development', href: '/services/web-development', desc: 'Custom websites & web apps' },
    { Image: App, label: 'App Development', href: '/services/app-development', desc: 'iOS & Android mobile apps' },
    { Image: Software, label: 'Software Development', href: '/services/software-development', desc: 'Enterprise custom systems' },
    { Image: Ecommerce, label: 'Ecommerce Development', href: '/services/ecommerce-development', desc: 'Scalable online stores' },
    { Image: Graphics, label: 'Graphics & UI/UX', href: '/services/graphic-design', desc: 'Brand identity & product design' },
    { Image: SocialMedia, label: 'Social Media', href: '/services/social-media', desc: 'Audience growth & engagement' },
    { Image: Digital, label: 'Digital Marketing', href: '/services/digital-marketing', desc: 'Full-funnel marketing strategy' },
    { Image: Ppc, label: 'PPC & Amazon', href: '/services/ppc-amazon-ads', desc: 'Targeted ads & campaign ROI' },
    { Image: Seo, label: 'Search Engine Optimization', href: '/services/search-engine-optimization', desc: 'Organic ranking & visibility' },
    { Image: Content, label: 'Content Writing', href: '/services/content-writing', desc: 'SEO copywriting & articles' },
    { Image: Call, label: 'Call Center', href: '/services/call-center', desc: '24/7 inbound & support' },
    { Image: Hire, label: 'Hire Us', href: '/services/hire-us', desc: 'Dedicated developer teams' },
];

// Navlinks data
const navLinks = [
    {
        label: 'Technologies',
        href: '/technologies',
        subLinks: techSubLinks,
    },
    {
        label: 'Services',
        href: '/services',
        subLinks: servicesSubLinks,
    },
    {
        label: 'About Us',
        href: '/about-us',
    },
    {
        label: 'Portfolio',
        href: '/our-portfolio',
    },
    {
        label: 'Blog',
        href: '/blog',
    },
    {
        label: 'Contact Us',
        href: '/contact-us',
    },
];

const Navbar = () => {
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const timeoutRef = React.useRef(null);
    const pathname = usePathname();
    const { openQuote } = useQuote();

    const handleMouseEnter = (index) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setDropdownIndex(index);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setDropdownIndex(null);
        }, 150);
    };

    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    // Helper to check if navlink or any sublink is active
    const isActive = (link) => {
        if (link.subLinks) {
            return link.href === pathname || link.subLinks.some(sub => sub.href === pathname);
        }
        return link.href === pathname;
    };

    return (
        <>
            {/* Desktop & Mobile Top Navbar */}
            <nav className='sticky top-0 z-50 bg-[#181918] w-full h-[90px] flex items-center justify-between px-10 lg:px-20 lg:pl-40 py-10'>
                <div className="navbar-logo">
                    <Link href='/'><Image src={Logo} alt="Logo" width={200} height={56} className='w-[54px] h-[35px] min-[380px]:w-[58px] min-[380px]:h-[38px] sm:w-[68px] sm:h-[44px] lg:w-[80px] lg:h-[50px] object-contain' priority /></Link>
                </div>
                {/* Desktop links/buttons */}
                <div className="hidden lg:flex navbar-links items-center gap-1 ml-15">
                    {navLinks.map((link, idx) => (
                        <div
                            key={link.label}
                            className="relative"
                            onMouseEnter={() => link.subLinks ? handleMouseEnter(idx) : handleMouseLeave()}
                            onMouseLeave={handleMouseLeave}
                        >
                            {idx === 0 ? (
                                // Technologies dropdown with clean 3-column list
                                <>
                                    <Link
                                        href={link.href}
                                        className={`${plusJakarta.className} cursor-pointer text-[15px] font-semibold tracking-wide text-white/90 px-3.5 py-2 flex items-center gap-1.5 transition-colors duration-200 hover:text-[#41B349] ${isActive(link) ? 'text-[#41B349] font-bold' : ''
                                            }`}
                                    >
                                        {link.label}
                                        <FaChevronDown className="ml-0.5 text-xs opacity-80" />
                                    </Link>
                                    <div
                                        onMouseEnter={() => handleMouseEnter(idx)}
                                        onMouseLeave={handleMouseLeave}
                                        className={`fixed left-1/2 -translate-x-1/2 top-[65px] pt-4 z-50 w-[900px] max-w-[calc(100vw-2rem)] transition-all duration-200
                      ${dropdownIndex === idx ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}
                    `}
                                    >
                                        <div className="bg-white rounded-2xl p-6 relative shadow-[0_25px_60px_rgba(0,0,0,0.18)] border-0 overflow-hidden">
                                            <div className="grid grid-cols-3 gap-x-5 gap-y-2.5">
                                                {techSubLinks.map((sub) => (
                                                    <Link
                                                        key={sub.label}
                                                        href={sub.href}
                                                        onClick={() => setDropdownIndex(null)}
                                                        className="group relative flex items-center gap-3.5 p-2.5 rounded-xl bg-white hover:bg-[#41B349] border border-gray-200/80 hover:border-transparent hover:shadow-lg hover:shadow-[#41B349]/25 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden"
                                                    >
                                                        {/* SVG Animated Moving Border Line on Hover */}
                                                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                                            <svg className="w-full h-full overflow-visible">
                                                                {/* Subtle base border track with pure white */}
                                                                <rect
                                                                    x="1"
                                                                    y="1"
                                                                    width="calc(100% - 2px)"
                                                                    height="calc(100% - 2px)"
                                                                    rx="11"
                                                                    fill="none"
                                                                    stroke="#FFFFFF"
                                                                    strokeWidth="1.5"
                                                                    strokeOpacity="0.4"
                                                                />
                                                                {/* Animated moving border line with pure white */}
                                                                <rect
                                                                    x="1"
                                                                    y="1"
                                                                    width="calc(100% - 2px)"
                                                                    height="calc(100% - 2px)"
                                                                    rx="11"
                                                                    fill="none"
                                                                    stroke="#FFFFFF"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    pathLength="100"
                                                                    className="dropdown-btn-svg-border-line"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:border-transparent group-hover:scale-105 transition-all duration-300 p-2 shadow-xs relative z-10">
                                                            <Image src={sub.Image} alt={sub.label} width={28} height={28} className="object-contain dropdown-icon-bounce" />
                                                        </div>
                                                        <div className="flex flex-col min-w-0 relative z-10">
                                                            <span className={`${plusJakarta.className} text-[13.5px] font-bold text-gray-900 group-hover:text-white transition-colors duration-200 truncate`}>
                                                                {sub.label}
                                                            </span>
                                                            <span className="text-[11px] text-gray-500 group-hover:text-white/90 transition-colors duration-200 truncate">
                                                                {sub.desc}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : idx === 1 ? (
                                // Services dropdown with clean 3-column list
                                <div className='relative'>
                                    <Link
                                        href={link.href || '/services'}
                                        onClick={() => setDropdownIndex(null)}
                                        className={`${plusJakarta.className} cursor-pointer text-[15px] font-semibold tracking-wide text-white/90 px-3.5 py-2 flex items-center gap-1.5 transition-colors duration-200 hover:text-[#41B349] ${isActive(link) ? 'text-[#41B349] font-bold' : ''
                                            }`}
                                    >
                                        {link.label}
                                        <FaChevronDown className="ml-0.5 text-xs opacity-80" />
                                    </Link>
                                    <div
                                        onMouseEnter={() => handleMouseEnter(idx)}
                                        onMouseLeave={handleMouseLeave}
                                        className={`fixed left-1/2 -translate-x-1/2 top-[65px] pt-4 z-50 w-[900px] max-w-[calc(100vw-2rem)] transition-all duration-200
                      ${dropdownIndex === idx ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}
                    `}
                                    >
                                        <div className="bg-white rounded-2xl p-6 relative shadow-[0_25px_60px_rgba(0,0,0,0.18)] border-0 overflow-hidden">
                                            <div className="grid grid-cols-3 gap-x-5 gap-y-2.5">
                                                {servicesSubLinks.map((sub) => (
                                                    <Link
                                                        key={sub.label}
                                                        href={sub.href}
                                                        onClick={() => setDropdownIndex(null)}
                                                        className="group relative flex items-center gap-3.5 p-2.5 rounded-xl bg-white hover:bg-[#41B349] border border-gray-200/80 hover:border-transparent hover:shadow-lg hover:shadow-[#41B349]/25 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden"
                                                    >
                                                        {/* SVG Animated Moving Border Line on Hover */}
                                                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                                            <svg className="w-full h-full overflow-visible">
                                                                {/* Subtle base border track with pure white */}
                                                                <rect
                                                                    x="1"
                                                                    y="1"
                                                                    width="calc(100% - 2px)"
                                                                    height="calc(100% - 2px)"
                                                                    rx="11"
                                                                    fill="none"
                                                                    stroke="#FFFFFF"
                                                                    strokeWidth="1.5"
                                                                    strokeOpacity="0.4"
                                                                />
                                                                {/* Animated moving border line with pure white */}
                                                                <rect
                                                                    x="1"
                                                                    y="1"
                                                                    width="calc(100% - 2px)"
                                                                    height="calc(100% - 2px)"
                                                                    rx="11"
                                                                    fill="none"
                                                                    stroke="#FFFFFF"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    pathLength="100"
                                                                    className="dropdown-btn-svg-border-line"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:border-transparent group-hover:scale-105 transition-all duration-300 p-2 shadow-xs relative z-10">
                                                            <Image src={sub.Image} alt={sub.label} width={28} height={28} className="object-contain dropdown-icon-bounce" />
                                                        </div>
                                                        <div className="flex flex-col min-w-0 relative z-10">
                                                            <span className={`${plusJakarta.className} text-[13.5px] font-bold text-gray-900 group-hover:text-white transition-colors duration-200 truncate`}>
                                                                {sub.label}
                                                            </span>
                                                            <span className="text-[11px] text-gray-500 group-hover:text-white/90 transition-colors duration-200 truncate">
                                                                {sub.desc}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : link.subLinks ? (
                                <>
                                    <Link
                                        href={link.href}
                                        className={`${plusJakarta.className} cursor-pointer text-[15px] font-semibold tracking-wide text-white/90 px-3.5 py-2 flex items-center gap-1.5 transition-colors duration-200 hover:text-[#41B349] ${isActive(link) ? 'text-[#41B349] font-bold' : ''
                                            }`}
                                    >
                                        {link.label}
                                        <FaChevronDown className="ml-0.5 text-xs opacity-80" />
                                    </Link>
                                    <div
                                        onMouseEnter={() => handleMouseEnter(idx)}
                                        onMouseLeave={handleMouseLeave}
                                        className={`absolute left-0 mt-2 bg-[#181918] border border-gray-800 shadow-xl rounded-lg z-10 min-w-[160px] transition-all duration-200
                      ${dropdownIndex === idx ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}
                    `}
                                    >
                                        {link.subLinks.map((sub) => (
                                            <Link
                                                key={sub.label}
                                                href={sub.href}
                                                onClick={() => setDropdownIndex(null)}
                                                className={`${plusJakarta.className} block px-4 py-2.5 text-[14px] font-medium text-white/90 transition-colors duration-200 hover:text-[#41B349] hover:bg-white/5 ${pathname === sub.href ? 'text-[#41B349] font-bold' : ''
                                                    }`}
                                            >
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href={link.href}
                                    className={`${plusJakarta.className} text-[15px] font-semibold tracking-wide text-white/90 px-3.5 py-2 transition-colors duration-200 hover:text-[#41B349] ${isActive(link) ? 'text-[#41B349] font-bold' : ''
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
                <div className="hidden lg:flex navbar-buttons items-center gap-4">
                    <button
                        className={`${roboto.className} bg-[#41B349] text-white text-[16px] font-medium leading-[20px] w-[106px] h-[40px] rounded-full hover:bg-white hover:text-black transition ease-in-out duration-200 cursor-pointer`}
                    >
                        Get POS
                    </button>
                    <button
                        onClick={openQuote}
                        className={`${roboto.className} bg-[#41B349] text-white text-[16px] font-medium leading-[20px] w-[130px] h-[40px] rounded-full hover:bg-white hover:text-black transition ease-in-out duration-200 cursor-pointer`}
                    >
                        Book Now
                    </button>
                </div>
                {/* Mobile menu button */}
                <button
                    className="lg:hidden flex items-center justify-between text-white text-2xl"
                    onClick={() => setMobileOpen(true)}
                    aria-label="Open menu"
                >
                    <FaBars />
                </button>
            </nav>

            {/* Mobile Navbar Overlay */}
            <div
                className={`fixed inset-0 z-[60] flex flex-col h-full w-full transition-all duration-300 ${
                    mobileOpen
                        ? 'translate-x-0 opacity-100 visible pointer-events-auto'
                        : '-translate-x-full opacity-0 invisible pointer-events-none'
                }`}
                style={{
                    background: '#181918',
                }}
            >
                {/* Fixed Top Header inside Mobile Drawer */}
                <div className="flex-shrink-0 flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#181918] z-20">
                    {/* Logo top left */}
                    <Link href='/' onClick={() => setMobileOpen(false)}>
                        <Image src={Logo} alt="Logo" width={150} height={52} className='w-[54px] h-[35px] min-[380px]:w-[58px] min-[380px]:h-[38px] sm:w-[68px] sm:h-[44px] object-contain' />
                    </Link>
                    {/* Close icon top right */}
                    <button
                        className="text-white text-2xl p-2 -mr-2 cursor-pointer hover:text-[#41B349] transition-colors focus:outline-none"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Vertically Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 pb-28">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link, idx) => (
                            <div key={link.label} className="border-b border-white/5 pb-2 last:border-b-0">
                                {link.subLinks ? (
                                    <MobileDropdown 
                                        label={link.label} 
                                        parentHref={link.href} 
                                        subLinks={
                                            idx === 0 ? techSubLinks :
                                            idx === 1 ? servicesSubLinks :
                                            link.subLinks
                                        } 
                                        setMobileOpen={setMobileOpen} 
                                    />
                                ) : (
                                    <Link
                                        href={link.href}
                                        className={`${montserrat.className} block text-white text-lg font-medium py-3 px-2 rounded-lg hover:bg-[#41B349]/20 hover:text-[#41B349] transition-colors duration-200`}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile Action Button at bottom of scroll */}
                    <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-white/10">
                        <button
                            onClick={() => {
                                setMobileOpen(false);
                                if (openQuote) openQuote();
                            }}
                            className={`${roboto.className} bg-[#41B349] text-white text-[16px] font-semibold w-full h-[46px] rounded-full hover:bg-white hover:text-black transition ease-in-out duration-200 cursor-pointer shadow-lg`}
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

// MobileDropdown component for smooth dropdown transition
function MobileDropdown({ label, parentHref, subLinks = [], setMobileOpen }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="w-full">
            <div className="flex items-center justify-between w-full">
                {parentHref ? (
                    <Link
                        href={parentHref}
                        onClick={() => setMobileOpen(false)}
                        className={`${montserrat.className} flex-1 text-white text-lg font-medium py-2.5 px-2 rounded-lg hover:text-[#41B349] transition-colors duration-200 cursor-pointer`}
                    >
                        {label}
                    </Link>
                ) : (
                    <span className={`${montserrat.className} flex-1 text-white text-lg font-medium py-2.5 px-2`}>
                        {label}
                    </span>
                )}
                <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-[#41B349] hover:bg-[#389e3f] active:scale-95 flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer shadow-sm ml-2"
                    onClick={() => setOpen(o => !o)}
                    aria-label={`Toggle ${label} dropdown`}
                    aria-expanded={open}
                >
                    <FaChevronDown className={`text-xs text-white transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                </button>
            </div>
            <div
                className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[3000px] opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'}`}
            >
                <div className="flex flex-col gap-1 pl-2 pr-1 py-1">
                    {subLinks.map((sub) => (
                        <Link
                            key={sub.label}
                            href={sub.href}
                            className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#41B349] transition-all duration-200 cursor-pointer"
                            onClick={() => setMobileOpen(false)}
                        >
                            {sub.Image && (
                                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 p-1.5 transition-all">
                                    <Image src={sub.Image} alt={sub.label} width={22} height={22} className="object-contain" />
                                </div>
                            )}
                            <div className="flex flex-col min-w-0">
                                <span className={`${plusJakarta.className} text-[13.5px] font-bold text-white group-hover:text-white leading-tight truncate`}>
                                    {sub.label}
                                </span>
                                {sub.desc && (
                                    <span className="text-[11px] text-gray-400 group-hover:text-white/80 transition-colors truncate">
                                        {sub.desc}
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Navbar;

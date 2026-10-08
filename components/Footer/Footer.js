"use client";

import React from 'react';
import Link from 'next/link';
import { 
    FaYoutube, 
    FaLinkedinIn, 
    FaInstagram, 
    FaFacebookF 
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiGooglecalendar } from "react-icons/si";
import { CardHeading } from "@/components/Typography";

const Footer = () => {
    const footerLinks = {
        "Technologies": [
            { name: "React Development", href: "/technologies/react" },
            { name: "Python Development", href: "/technologies/python" },
            { name: "Laravel Development", href: "/technologies/laravel" },
            { name: "Flutter Development", href: "/technologies/flutter" },
            { name: "Swift Development", href: "/technologies/swift" },
            { name: "WordPress Development", href: "/technologies/wordpress" },
            { name: "Shopify Development", href: "/technologies/shopify" },
            { name: "JavaScript Development", href: "/technologies/javascript" },
            { name: "PHP Development", href: "/technologies/php" },
            { name: "Angular Development", href: "/technologies/angular" },
            { name: "Go Development", href: "/technologies/go" },
            { name: "C++ Development", href: "/technologies/c-plus-plus" }
        ],
        "Services": [
            { name: "Web Development", href: "/services/web-development" },
            { name: "App Development", href: "/services/app-development" },
            { name: "Software Development", href: "/services/software-development" },
            { name: "Ecommerce Development", href: "/services/ecommerce-development" },
            { name: "POS Development", href: "/pos-development" },
            { name: "Graphic & UI/UX Design", href: "/services/graphic-design" },
            { name: "Content Writing", href: "/services/content-writing" },
            { name: "Call Center Solutions", href: "/services/call-center" }
        ],
        "Digital Marketing": [
            { name: "Search Engine Optimization", href: "/services/search-engine-optimization" },
            { name: "Digital Marketing", href: "/services/digital-marketing" },
            { name: "Social Media Marketing", href: "/services/social-media" },
            { name: "PPC & Amazon Ads", href: "/services/ppc-amazon-ads" },
            { name: "Google Ads Management", href: "/services/google-ads" },
            { name: "Meta Ads & Marketing", href: "/services/meta" },
            { name: "Lead Generation", href: "/services/lead-generation" },
            { name: "Free SEO Audit", href: "/claim-your-free-seo-audit" }
        ],
        "Company": [
            { name: "About Us", href: "/about-us" },
            { name: "Contact Us", href: "/contact-us" },
            { name: "Our Projects", href: "/our-portfolio" },
            { name: "Hire Resources", href: "/hire-resources" },
            { name: "Career", href: "/career" },
            { name: "Become a Partner", href: "/become-a-partner" },
            { name: "Privacy Policy", href: "/privacy-policy" },
            { name: "Terms and Conditions", href: "/terms-and-conditions" },
            { name: "Blogs", href: "/blog" }
        ]
    };

    return (
        <footer className="font-jakarta w-full bg-[#171717] text-white relative overflow-hidden">
            {/* Background Glow Accents (Matching Get In Touch section) */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#41B349]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#41B349]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
                
                {/* ================= 4 EQUAL COLUMNS ================= */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 items-start">
                    {Object.entries(footerLinks).map(([section, links]) => (
                        <div key={section} className="flex flex-col">
                            {/* Heading / Title */}
                            <div className="flex items-center mb-4 sm:mb-5">
                                <CardHeading 
                                    as="h3" 
                                    size="md" 
                                    theme="inherit" 
                                    className="text-[#41B349] select-none"
                                >
                                    {section}
                                </CardHeading>
                            </div>

                            {/* Links List */}
                            <ul className="space-y-1.5">
                                {links.slice(0, 8).map((linkItem, index) => {
                                    const isObj = typeof linkItem === 'object';
                                    const label = isObj ? linkItem.name : linkItem;
                                    const href = isObj ? linkItem.href : '#';

                                    return (
                                        <li key={index} className="flex items-center">
                                            <Link 
                                                href={href} 
                                                className="group relative inline-flex items-center gap-2 text-xs sm:text-[13px] text-gray-300 hover:text-white transition-colors duration-200 py-0.5"
                                            >
                                                {/* Dot / Icon next to link */}
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] opacity-70 group-hover:opacity-100 group-hover:scale-125 group-hover:shadow-[0_0_6px_rgba(65,179,73,0.9)] transition-all duration-200 flex-shrink-0" />
                                                
                                                {/* Label with smooth animated bottom border/underline */}
                                                <span className="relative inline-block leading-snug">
                                                    {label}
                                                    <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-[#41B349] transition-all duration-300 ease-out group-hover:w-full" />
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* ================= BOTTOM BAR WITH CENTERED SOCIAL ICONS ================= */}
                <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4 text-center md:text-left">
                    {/* Left: Copyright */}
                    <div>
                        © {new Date().getFullYear()} <span className="text-white font-semibold">TECH SOLUTIONOR</span>. All rights reserved.
                    </div>

                    {/* Center: Social Media Icons */}
                    <div className="flex items-center justify-center gap-3 text-white">
                        <a 
                            href="https://www.youtube.com/@techsolutionor" 
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube - Tech Solutionor" 
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#41B349] hover:border-[#41B349] hover:text-white flex items-center justify-center transition-all duration-200"
                        >
                            <FaYoutube size={14} />
                        </a>
                        <a 
                            href="https://www.linkedin.com/company/techsolutionor/posts/?feedView=all" 
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn - Tech Solutionor" 
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#41B349] hover:border-[#41B349] hover:text-white flex items-center justify-center transition-all duration-200"
                        >
                            <FaLinkedinIn size={13} />
                        </a>
                        <a 
                            href="https://www.instagram.com/tech_solutionor/?hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram - Tech Solutionor" 
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#41B349] hover:border-[#41B349] hover:text-white flex items-center justify-center transition-all duration-200"
                        >
                            <FaInstagram size={13} />
                        </a>
                        <a 
                            href="https://www.facebook.com/techsolutionor" 
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook - Tech Solutionor" 
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#41B349] hover:border-[#41B349] hover:text-white flex items-center justify-center transition-all duration-200"
                        >
                            <FaFacebookF size={13} />
                        </a>
                        <a 
                            href="https://x.com/techsolutionors" 
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter / X - Tech Solutionor" 
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#41B349] hover:border-[#41B349] hover:text-white flex items-center justify-center transition-all duration-200"
                        >
                            <FaXTwitter size={13} />
                        </a>
                        <a 
                            href="https://calendar.google.com" 
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Google Calendar - Schedule an Appointment" 
                            title="Schedule an Appointment via Google Calendar"
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#41B349] hover:border-[#41B349] hover:text-white flex items-center justify-center transition-all duration-200"
                        >
                            <SiGooglecalendar size={13} />
                        </a>
                    </div>

                    {/* Right: Tagline */}
                    <div>
                        Empowering Global Technology Solutions
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;

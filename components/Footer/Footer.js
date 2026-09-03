"use client";

import React from 'react';
import Link from 'next/link';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { 
    FaYoutube, 
    FaLinkedinIn, 
    FaInstagram, 
    FaFacebookF 
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    display: 'swap'
});

const Footer = () => {
    const footerLinks = {
        "Technologies": [
            { name: "SWIFT Network", href: "/technologies/swift" },
            { name: "React Development", href: "/technologies/react" },
            { name: "Python Development", href: "/technologies/python" },
            { name: "HTML Development", href: "/technologies/html" },
            { name: "Laravel Development", href: "/technologies/laravel" },
            { name: "Go Development", href: "/technologies" },
            { name: "C++ Development", href: "/technologies" },
            { name: "WordPress Development", href: "/technologies/wordpress" },
            { name: "PHP Development", href: "/technologies/php" },
            { name: "Shopify Development", href: "/technologies/shopify" },
            { name: "Angular Development", href: "/technologies/angular" },
            { name: "JavaScript Development", href: "/technologies/javascript" }
        ],
        "Services": [
            { name: "App Development", href: "/services/app-development" },
            { name: "Web Development", href: "/services/web-development" },
            { name: "Software Development", href: "/services/software-development" },
            { name: "POS Development", href: "/services/pos-development" },
            { name: "Ecommerce Development", href: "/services/ecommerce-development" },
            { name: "Graphic Designing", href: "/services/graphics-ui-ux" },
            { name: "UI/UX Designing", href: "/services/graphics-ui-ux" },
            { name: "Social Media Marketing", href: "/services/digital-marketing" },
            { name: "Digital Marketing", href: "/services/digital-marketing" },
            { name: "PPC And Amazon Ads", href: "/services/ppc-amazon-ads" },
            { name: "Search Engine Optimization", href: "/services/seo" },
            { name: "Content Writing", href: "/services/content-writing" }
        ],
        "Industries": [
            "SAAS", "Finance", "B2B & B2C", "Healthcare", "Education", 
            "Retail & E-commerce", "Manufacturing", "Non-profit & NGOs", "Automotive"
        ],
        "Company": [
            { name: "About Us", href: "/about" },
            { name: "Contact Us", href: "/contact" },
            { name: "Privacy Policy", href: "/privacy-policy" },
            { name: "Terms and Conditions", href: "/terms-and-conditions" },
            { name: "Blogs", href: "/blog" },
            { name: "Our Projects", href: "/projects" },
            { name: "Career", href: "/career" },
            { name: "Become a Partner", href: "/contact" }
        ]
    };

    return (
        <footer className={`${plusJakarta.className} w-full bg-[#171717] text-white relative overflow-hidden`}>
            {/* Background Glow Accents (Matching Get In Touch section) */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#41B349]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#41B349]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
                
                {/* ================= 4 EQUAL COLUMNS ================= */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 items-start">
                    {Object.entries(footerLinks).map(([section, links]) => (
                        <div key={section} className="flex flex-col">
                            {/* Heading / Title */}
                            <div className="flex items-center gap-2 mb-4 sm:mb-5">
                                <span className="w-2 h-2 rounded-full bg-[#41B349] shadow-[0_0_8px_rgba(65,179,73,0.8)] flex-shrink-0" />
                                <h3 
                                    className="text-base sm:text-[17px] font-extrabold text-[#41B349] uppercase tracking-wider"
                                    style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                                >
                                    {section}
                                </h3>
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
                            href="#" 
                            aria-label="YouTube" 
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#41B349] hover:border-[#41B349] hover:text-white flex items-center justify-center transition-all duration-200"
                        >
                            <FaYoutube size={14} />
                        </a>
                        <a 
                            href="#" 
                            aria-label="LinkedIn" 
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#41B349] hover:border-[#41B349] hover:text-white flex items-center justify-center transition-all duration-200"
                        >
                            <FaLinkedinIn size={13} />
                        </a>
                        <a 
                            href="#" 
                            aria-label="Instagram" 
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#41B349] hover:border-[#41B349] hover:text-white flex items-center justify-center transition-all duration-200"
                        >
                            <FaInstagram size={13} />
                        </a>
                        <a 
                            href="#" 
                            aria-label="Facebook" 
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#41B349] hover:border-[#41B349] hover:text-white flex items-center justify-center transition-all duration-200"
                        >
                            <FaFacebookF size={13} />
                        </a>
                        <a 
                            href="#" 
                            aria-label="Twitter" 
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#41B349] hover:border-[#41B349] hover:text-white flex items-center justify-center transition-all duration-200"
                        >
                            <FaXTwitter size={13} />
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

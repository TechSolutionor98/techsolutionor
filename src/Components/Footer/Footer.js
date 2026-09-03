"use client";

import React from 'react';
import Map from '@/src/Components/Images/map.png';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedin, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
        <footer className="w-full bg-[#000000] text-white overflow-hidden border-t border-white/10 select-none">
            {/* Top Links Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 items-start">
                    {Object.entries(footerLinks).map(([section, links]) => (
                        <div key={section} className="flex flex-col">
                            <h2 
                                className="text-lg sm:text-xl text-[#41B349] font-extrabold tracking-tight mb-4 uppercase"
                                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                            >
                                {section}
                            </h2>
                            <ul className="space-y-2.5">
                                {links.map((linkItem, index) => {
                                    const isObj = typeof linkItem === 'object';
                                    const label = isObj ? linkItem.name : linkItem;
                                    const href = isObj ? linkItem.href : '#';

                                    return (
                                        <li key={index}>
                                            <Link 
                                                href={href} 
                                                className="text-gray-400 hover:text-[#41B349] text-xs sm:text-sm font-medium transition-colors duration-200 block"
                                            >
                                                {label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Middle Section: We'd Love To Hear From You & Map */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 flex flex-col items-center justify-center text-center">
                <h3 
                    className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-8"
                    style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                    We'd Love To Hear From You
                </h3>

                <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl mb-10">
                    <Image 
                        src={Map} 
                        alt="Global Presence Map" 
                        width={1024} 
                        height={350} 
                        className="w-full h-auto object-cover rounded-xl filter contrast-[1.05] brightness-95" 
                    />
                </div>

                {/* Form Section */}
                <div className="w-full max-w-4xl mx-auto mb-6">
                    <form 
                        action="" 
                        onSubmit={(e) => e.preventDefault()}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5"
                    >
                        <input 
                            type="text" 
                            className="h-11 bg-white text-gray-900 px-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#41B349] transition-all duration-200 placeholder-gray-400" 
                            placeholder="Name" 
                        />
                        <input 
                            type="email" 
                            className="h-11 bg-white text-gray-900 px-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#41B349] transition-all duration-200 placeholder-gray-400" 
                            placeholder="Email" 
                        />
                        <input 
                            type="text" 
                            className="h-11 bg-white text-gray-900 px-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#41B349] transition-all duration-200 placeholder-gray-400" 
                            placeholder="Website URL" 
                        />
                        <div className="relative">
                            <select 
                                name="services" 
                                className="h-11 w-full bg-white text-gray-700 px-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#41B349] transition-all duration-200 cursor-pointer appearance-none"
                            >
                                <option value="">Select Services</option>
                                <option value="App Development">App Development</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Software Development">Digital Marketing</option>
                                <option value="POS Development">Graphics Designing</option>
                            </select>
                        </div>
                        <button 
                            type="submit" 
                            className="h-11 bg-[#41B349] hover:bg-[#369c3d] text-white font-extrabold text-sm rounded-xl transition-all shadow-md shadow-[#41B349]/20 cursor-pointer flex items-center justify-center"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Bar: Social, Contact & Copyright */}
            <div className="border-t border-white/10 mt-6">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        {[
                            { icon: FaFacebookF, href: "#" },
                            { icon: FaInstagram, href: "#" },
                            { icon: FaXTwitter, href: "#" },
                            { icon: FaLinkedin, href: "#" },
                            { icon: FaPinterest, href: "#" }
                        ].map(({ icon: Icon, href }, idx) => (
                            <a 
                                key={idx} 
                                href={href} 
                                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#41B349] hover:border-[#41B349] transition-all duration-200"
                            >
                                <Icon size={14} />
                            </a>
                        ))}
                    </div>

                    {/* Contact Info */}
                    <div className="text-sm font-medium text-gray-300">
                        <a href="mailto:info@techsolutionor.com" className="hover:text-[#41B349] transition-colors">
                            info@techsolutionor.com
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="text-xs sm:text-sm text-gray-400 font-medium">
                        All rights reserved | <span className="font-extrabold text-white">TECH SOLUTIONOR</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

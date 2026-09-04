"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLayerGroup, FaShieldAlt, FaRocket, FaHeadset, FaArrowRight } from "react-icons/fa";
import AboutImage from "../../../components/Images/about-img.jpg";

const keyPillars = [
    {
        icon: <FaLayerGroup className="text-[#41B349] text-lg" />,
        title: "Agile Engineering",
        desc: "Sprint-based rapid development with full transparency and adaptive velocity.",
    },
    {
        icon: <FaShieldAlt className="text-[#41B349] text-lg" />,
        title: "Enterprise Security",
        desc: "Built according to ISO standards, robust encryption, and cloud resilience.",
    },
    {
        icon: <FaRocket className="text-[#41B349] text-lg" />,
        title: "User-Centric Design",
        desc: "Captivating digital experiences crafted to maximize user engagement and retention.",
    },
    {
        icon: <FaHeadset className="text-[#41B349] text-lg" />,
        title: "Dedicated Partnership",
        desc: "Round-the-clock technical advisory, proactive maintenance, and strategic scaling.",
    },
];

const WhoWeAre = () => {
    return (
        <section id="who-we-are" className="relative w-full py-16 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left: Standalone Clean Image */}
                    <div className="lg:col-span-6 flex justify-center lg:justify-start">
                        <div className="relative w-full max-w-[420px] h-[360px] sm:h-[460px] md:h-[520px]">
                            <Image
                                src={AboutImage}
                                alt="Who We Are - TechSolutionor"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right: Content Section */}
                    <div className="lg:col-span-6 space-y-6 text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#41B349]/15 border border-[#41B349]/30 text-[#41B349] font-extrabold text-xs uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#41B349]" />
                            <span>WHO WE ARE</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight leading-[1.2]">
                            Architecting Next-Gen Software with{" "}
                            <span className="text-[#41B349]">Precision & Passion</span>
                        </h2>

                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-normal">
                            TechSolutionor was founded to eliminate the friction between complex technology and sustainable business growth. As a premier software engineering powerhouse headquartered in the UAE, we blend senior technical craftsmanship with bold creative vision.
                        </p>

                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-normal">
                            Whether architecting high-traffic ecommerce platforms, developing resilient mobile applications, or transforming manual operations into automated cloud workflows, our team stands alongside you as dedicated technical co-pilots.
                        </p>

                        {/* Feature Pillars Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            {keyPillars.map((pillar, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 hover:border-[#41B349]/40 hover:bg-white hover:shadow-md transition-all duration-300"
                                >
                                    <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-gray-100 flex items-center justify-center mb-3">
                                        {pillar.icon}
                                    </div>
                                    <h4 className="text-sm font-extrabold text-gray-900 mb-1">{pillar.title}</h4>
                                    <p className="text-xs text-gray-500 leading-normal">{pillar.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* CTA Links */}
                        <div className="pt-4 flex flex-wrap items-center gap-4">
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2.5 bg-[#111827] hover:bg-[#41B349] text-white px-7 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02]"
                            >
                                <span>Explore Our Services</span>
                                <FaArrowRight size={12} />
                            </Link>
                            <Link
                                href="/contact-us"
                                className="inline-flex items-center gap-2 text-gray-700 hover:text-[#41B349] px-5 py-3 rounded-full font-bold text-sm transition-colors duration-200"
                            >
                                <span>Get in Touch with Us →</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhoWeAre;

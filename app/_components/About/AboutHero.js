"use client";

import React from "react";
import { FaArrowRight, FaChevronDown, FaCheckCircle } from "react-icons/fa";
import { useQuote } from "@/app/_context/QuoteContext";

const AboutHero = () => {
    const { openQuote } = useQuote();

    const scrollToContent = () => {
        const target = document.getElementById("who-we-are");
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative w-full bg-white overflow-hidden py-20 md:py-28 select-none">
            {/* Ambient Emerald Glow for Light Theme */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle_at_top,_rgba(65,179,73,0.1)_0%,_transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#41B34910_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Micro-Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/30 text-[#41B349] font-extrabold text-xs uppercase tracking-widest mb-6 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
                    <span>DISCOVER OUR STORY &amp; PURPOSE</span>
                </div>

                {/* Primary Heading */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#111827] tracking-tight leading-[1.15] max-w-4xl mx-auto">
                    Engineering Digital Excellence, Delivering{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#41B349] via-[#38a840] to-[#41B349]">
                        Scalable Realities
                    </span>
                </h1>

                {/* Description */}
                <p className="mt-6 text-[#4B5563] text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
                    TechSolutionor is a premier technology &amp; software engineering agency based in the UAE, powering brands worldwide. We architect modern web applications, bespoke enterprise systems, and result-driven digital strategies that turn ambitious visions into sustainable market leaders.
                </p>

                {/* Quick Impact Highlight Badges */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-semibold text-[#374151]">
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-sm">
                        <FaCheckCircle className="text-[#41B349] text-xs" />
                        <span>10+ Years of Craft</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-sm">
                        <FaCheckCircle className="text-[#41B349] text-xs" />
                        <span>150+ Enterprise Solutions</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-sm">
                        <FaCheckCircle className="text-[#41B349] text-xs" />
                        <span>99% Client Retention</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-sm">
                        <FaCheckCircle className="text-[#41B349] text-xs" />
                        <span>24/7 Global Delivery</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={openQuote}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#41B349] hover:bg-[#369c3d] text-white font-extrabold px-8 py-4 rounded-full text-sm sm:text-base transition-all duration-300 shadow-lg shadow-[#41B349]/25 hover:scale-[1.02] cursor-pointer"
                    >
                        <span>Start Your Project</span>
                        <FaArrowRight size={13} />
                    </button>
                    <button
                        onClick={scrollToContent}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#111827] hover:text-[#41B349] font-bold px-7 py-4 rounded-full text-sm sm:text-base border border-gray-200 shadow-sm transition-all duration-300 hover:border-gray-300 cursor-pointer"
                    >
                        <span>Explore Our Story</span>
                        <FaChevronDown size={11} className="text-[#41B349]" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;

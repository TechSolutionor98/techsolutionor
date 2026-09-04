"use client";

import React from "react";
import Image from "next/image";
import { FaArrowRight, FaChevronDown, FaCheckCircle } from "react-icons/fa";
import { useQuote } from "@/app/_context/QuoteContext";
import BannerDots from "../../../components/Images/webdevbannerdots.png";

const AboutHero = () => {
    const { openQuote } = useQuote();

    const scrollToContent = () => {
        const target = document.getElementById("who-we-are");
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative w-full bg-[#0A0D12] overflow-hidden py-20 md:py-28 select-none">
            {/* Ambient Emerald Radial Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(circle_at_top,_rgba(65,179,73,0.22)_0%,_transparent_70%)] pointer-events-none" />

            {/* Background Tech Pattern */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
                <Image
                    src={BannerDots}
                    alt="Background Grid Pattern"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Micro-Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#41B349]/15 border border-[#41B349]/35 text-[#41B349] font-extrabold text-xs uppercase tracking-widest mb-6 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
                    <span>DISCOVER OUR STORY & PURPOSE</span>
                </div>

                {/* Primary Heading */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
                    Engineering Digital Excellence, Delivering{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#41B349] via-[#65D46D] to-[#41B349]">
                        Scalable Realities
                    </span>
                </h1>

                {/* Description */}
                <p className="mt-6 text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
                    TechSolutionor is a premier technology & software engineering agency based in the UAE, powering brands worldwide. We architect modern web applications, bespoke enterprise systems, and result-driven digital strategies that turn ambitious visions into sustainable market leaders.
                </p>

                {/* Quick Impact Highlight Badges */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-semibold text-gray-300">
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <FaCheckCircle className="text-[#41B349] text-xs" />
                        <span>10+ Years of Craft</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <FaCheckCircle className="text-[#41B349] text-xs" />
                        <span>150+ Enterprise Solutions</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <FaCheckCircle className="text-[#41B349] text-xs" />
                        <span>99% Client Retention</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <FaCheckCircle className="text-[#41B349] text-xs" />
                        <span>24/7 Global Delivery</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={openQuote}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#41B349] hover:bg-[#369c3d] text-white font-extrabold px-8 py-4 rounded-full text-sm sm:text-base transition-all duration-300 shadow-lg shadow-[#41B349]/30 hover:scale-[1.02] cursor-pointer"
                    >
                        <span>Start Your Project</span>
                        <FaArrowRight size={13} />
                    </button>
                    <button
                        onClick={scrollToContent}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold px-7 py-4 rounded-full text-sm sm:text-base border border-white/15 transition-all duration-300 hover:border-white/30 cursor-pointer"
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

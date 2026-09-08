"use client";

import React from "react";
import Image from "next/image";
import StrategyImage from "../../../../../components/Images/webdevstra.png";
import { useQuote } from "@/app/_context/QuoteContext";

const Strategy = () => {
  const { openQuote } = useQuote();

  const painPoints = [
    "Disjointed user experience",
    "Weak search engine rankings",
    "Poor lead generation",
    "Low conversion rates",
    "Brand identity misalignment",
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#FFFFFF] via-[#FBFDFB] to-[#F7FAF8] py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden select-none">
      {/* Central Ambient Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,_rgba(27,78,44,0.06)_0%,_transparent_70%)] pointer-events-none z-0" />

      {/* Decorative Wavy Lines */}
      <div className="absolute left-0 top-1/4 w-12 h-64 pointer-events-none opacity-20 hidden md:block">
        <svg className="w-full h-full text-[#1B4E2C]" viewBox="0 0 100 400" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M-20 50 Q 60 150 -20 250 T -20 350" />
          <path d="M-40 100 Q 40 200 -40 300" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: TEXT CONTENT & STRATEGIC DIAGNOSIS (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Eyebrow Pill Badge (Matching Home Page About TechSolutionor) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4E2C]/10 border border-[#1B4E2C]/20 text-[#1B4E2C] font-extrabold text-xs sm:text-sm uppercase tracking-widest mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#1B4E2C] animate-pulse" />
              <span>DIGITAL STRATEGY &amp; ROI</span>
            </div>

            {/* Main Heading styled with Outfit & Plus Jakarta Sans */}
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-black text-[#0D0F12] tracking-tight leading-[1.18] mb-4"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              Is Your Website{" "}
              <span className="text-[#1B4E2C] block sm:inline mt-0.5 sm:mt-0">
                Holding Back Your Growth?
              </span>
            </h2>

            {/* Lead Paragraph */}
            <p
              className="text-sm sm:text-base md:text-[17px] text-[#334155] font-normal leading-relaxed mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Many businesses approach website development reactively—fixing issues as they appear, adding features without clear architecture, or redesigning without a cohesive long-term digital strategy.
            </p>

            {/* Pain Points / Results Grid */}
            <div className="w-full mb-5">
              <span
                className="text-xs font-bold uppercase tracking-wider text-[#1B4E2C] block mb-2.5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                The Cost of an Unoptimized Web Platform:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {painPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white border border-gray-100 shadow-2xs hover:border-[#1B4E2C]/30 hover:shadow-xs transition-all duration-300"
                  >
                    <span className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-black shrink-0">
                      ✕
                    </span>
                    <span
                      className="text-xs sm:text-[13px] font-semibold text-[#1F2937]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Value Proposition Callout Box */}
            <div className="w-full p-4 sm:p-5 rounded-2xl bg-[#1B4E2C]/5 border border-[#1B4E2C]/12 mb-5">
              <p
                className="text-xs sm:text-[13.5px] md:text-[14px] text-[#2D3748] font-medium leading-relaxed"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Without a structured engineering roadmap, your website struggles to communicate your enterprise value, rank for competitive keywords, or compete in the UAE and global digital marketplace.
              </p>
            </div>

            {/* Bottom Recommendation */}
            <p
              className="text-xs sm:text-sm md:text-[14.5px] text-[#475569] font-normal leading-relaxed mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              If your website isn’t generating measurable commercial ROI, it’s time to partner with a professional website development team to build high-performance, scalable architectures designed to boost engagement, strengthen brand authority, and maximize results.
            </p>

            {/* Primary CTA Button */}
            <div>
              <button
                onClick={openQuote}
                className="group bg-[#1B4E2C] hover:bg-[#153e23] text-white text-[14px] sm:text-[15.5px] font-bold px-7 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg shadow-[#1B4E2C]/25 hover:shadow-xl hover:shadow-[#1B4E2C]/35 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer inline-flex items-center gap-3"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span>Audit My Website For Growth</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: SHOWCASE CARD WITH 3D VISUAL & METRICS (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <div className="w-full max-w-[460px] bg-white border border-gray-100/90 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0_15px_45px_rgba(27,78,44,0.08)] hover:shadow-[0_20px_55px_rgba(27,78,44,0.14)] transition-all duration-300 relative overflow-hidden flex flex-col items-center">
              
              {/* Corner Ambient Gradients */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#1B4E2C]/8 to-transparent rounded-bl-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#1B4E2C]/8 to-transparent rounded-tr-full pointer-events-none" />

              {/* Floating Top Badge */}
              <div className="w-full flex items-center justify-between mb-4 z-10">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B4E2C]/8 text-[#1B4E2C] text-[11px] font-extrabold uppercase tracking-wider"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1B4E2C]" />
                  PLATFORM AUDIT
                </span>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  ROI ANALYSIS
                </span>
              </div>

              {/* 3D Browser Code Graphic (Clipped neatly to remove accidental black triangle artifact) */}
              <div className="w-full flex justify-center items-center my-3 relative z-10 overflow-hidden">
                <div
                  className="relative flex justify-center items-center"
                  style={{ clipPath: "inset(0 18% 0 0)" }}
                >
                  <Image
                    src={StrategyImage}
                    alt="Web Development Strategy & Platform Architecture"
                    width={340}
                    height={340}
                    className="w-[260px] sm:w-[300px] h-auto object-contain transform hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>

              {/* Floating Metric Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#1B4E2C]/15 shadow-sm text-xs font-bold text-[#1B4E2C] z-10 mb-5">
                <span className="text-[#1B4E2C]">⚡</span>
                <span>Optimized for 99.9% Uptime &amp; Speed</span>
              </div>

              {/* Bottom 3-Column Performance Stats */}
              <div className="w-full pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center z-10">
                <div>
                  <div
                    className="text-lg sm:text-xl font-black text-[#1B4E2C]"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    10x
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Faster Load
                  </div>
                </div>
                <div className="border-x border-gray-100">
                  <div
                    className="text-lg sm:text-xl font-black text-[#1B4E2C]"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    +180%
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Conversions
                  </div>
                </div>
                <div>
                  <div
                    className="text-lg sm:text-xl font-black text-[#1B4E2C]"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    100%
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Clean Code
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Strategy;

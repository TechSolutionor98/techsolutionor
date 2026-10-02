"use client";

import React, { useState } from "react";
import { Users, Globe, FileText } from "lucide-react";

/**
 * Our Software Development Process Data
 * Authentic, industry-standard software engineering stages
 * formatted to match the reference design layout and typography.
 */
const processStages = [
  {
    id: "stage-1",
    title: "Dedicated Architecture & Planning",
    icon: Users,
    isHighlighted: false,
    description:
      "If your enterprise software requires bespoke scalability, we architect a dedicated roadmap upfront. Our senior architects evaluate system dependencies, design database schemas, model microservices data flows, and establish cloud security protocols to eliminate structural risk before development.",
    // Desktop positioning coordinates matching SVG Card 1 (x: 10 to 350, y: 10 to 470)
    desktopStyle: {
      left: "0.877%",
      top: "2.083%",
      width: "29.825%",
      height: "95.833%",
    },
  },
  {
    id: "stage-2",
    title: "Agile Engineering & CI/CD Delivery",
    icon: Globe,
    isHighlighted: true,
    description:
      "When milestones and specifications are established, our 2-week agile sprint cycles keep execution structured. We enforce clean modular architecture, test-driven development (TDD), containerized Docker environments, and automated CI/CD pipelines producing continuous staging builds.",
    // Desktop positioning coordinates matching SVG Card 2 (x: 400 to 740, y: 10 to 470)
    desktopStyle: {
      left: "35.088%",
      top: "2.083%",
      width: "29.825%",
      height: "95.833%",
    },
  },
  {
    id: "stage-3",
    title: "DevSecOps, Launch & 24/7 SLA Support",
    icon: FileText,
    isHighlighted: false,
    description:
      "Prior to production rollout, we execute automated regression suites, load testing for 10,000+ concurrent requests, and OWASP security penetration audits. We manage zero-downtime Kubernetes deployments, configure real-time telemetry, and provide round-the-clock SLA maintenance.",
    // Desktop positioning coordinates matching SVG Card 3 (x: 790 to 1130, y: 10 to 470)
    desktopStyle: {
      left: "69.298%",
      top: "2.083%",
      width: "29.825%",
      height: "95.833%",
    },
  },
];

export default function SoftwareProcess({ cmsContent }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section
      id="software-development-process"
      className="w-full py-16 sm:py-20 md:py-24 bg-[#FFFFFF] text-[#0D0F12] font-sans relative overflow-hidden select-none"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#41B349]/10 via-[#41B349]/5 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Subtle Dot Grid Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#0D0F12 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 md:mb-20">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#41B349]/15 border border-[#41B349]/30 text-[#41B349] font-black text-[11px] sm:text-xs uppercase tracking-widest mb-3.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
            <span>ENTERPRISE AGILE LIFECYCLE</span>
          </div>

          {/* Main Title */}
          <h2
            className="text-2xl sm:text-3xl md:text-[36px] lg:text-[42px] font-black text-[#0D0F12] tracking-tight leading-tight mb-3.5"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            Our Software Development{" "}
            <span className="text-[#41B349]">Process</span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-xs sm:text-sm md:text-[15px] text-[#0D0F12]/75 leading-relaxed font-normal max-w-2xl mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            From architectural discovery and agile sprint delivery to continuous testing and automated cloud deployment,
            we engineer mission-critical enterprise software built to scale.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3-CARD INTERLOCKING PIPELINE CONTAINER                                    */}
        {/* Replicating the exact reference UI, border shape, thickness, and dots     */}
        {/* ========================================================================= */}
        <div className="relative max-w-[1140px] mx-auto w-full">
          
          {/* ======================================================================= */}
          {/* DESKTOP VIEW (lg:block): Cards perfectly aligned to SVG border lines    */}
          {/* ======================================================================= */}
          <div className="hidden lg:block relative w-full" style={{ height: "480px" }}>
            
            {/* SVG CIRCUIT BORDER OVERLAY (UNCHANGED) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 1140 480"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Filter for subtle green glow on hover */}
              <defs>
                <filter id="green-glow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#41B349" floodOpacity="0.6" />
                </filter>
              </defs>

              {/* UPPER CIRCUIT LINE: Card 1 around to Card 2 top via Diagonal 1 */}
              <path
                d="M 350,175 V 38 A 28,28 0 0,0 322,10 H 38 A 28,28 0 0,0 10,38 V 442 A 28,28 0 0,0 38,470 H 322 A 28,28 0 0,0 350,442 V 335 L 400,175 V 38 A 28,28 0 0,1 428,10 H 712 A 28,28 0 0,1 740,38 V 175"
                stroke="#41B349"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                filter={hoveredIdx === 0 || hoveredIdx === 1 ? "url(#green-glow)" : "none"}
                className="transition-all duration-300"
              />

              {/* LOWER CIRCUIT LINE: Card 2 bottom around to Card 3 via Diagonal 2 */}
              <path
                d="M 400,335 V 442 A 28,28 0 0,0 428,470 H 712 A 28,28 0 0,0 740,442 V 335 L 790,175 V 38 A 28,28 0 0,1 818,10 H 1102 A 28,28 0 0,1 1130,38 V 442 A 28,28 0 0,1 1102,470 H 818 A 28,28 0 0,1 790,442 V 335"
                stroke="#41B349"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                filter={hoveredIdx === 1 || hoveredIdx === 2 ? "url(#green-glow)" : "none"}
                className="transition-all duration-300"
              />

              {/* 4 SOLID WHITE TERMINAL NODE DOTS WITH GREEN OUTLINE */}
              {/* Dot 1: Card 1 right edge at y=175 */}
              <circle
                cx="350"
                cy="175"
                r="6.5"
                fill="#FFFFFF"
                stroke="#41B349"
                strokeWidth="2"
                className="transition-colors duration-300"
              />
              {/* Dot 2: Card 2 right edge at y=175 */}
              <circle
                cx="740"
                cy="175"
                r="6.5"
                fill="#FFFFFF"
                stroke="#41B349"
                strokeWidth="2"
                className="transition-colors duration-300"
              />
              {/* Dot 3: Card 2 left edge at y=335 */}
              <circle
                cx="400"
                cy="335"
                r="6.5"
                fill="#FFFFFF"
                stroke="#41B349"
                strokeWidth="2"
                className="transition-colors duration-300"
              />
              {/* Dot 4: Card 3 left edge at y=335 */}
              <circle
                cx="790"
                cy="335"
                r="6.5"
                fill="#FFFFFF"
                stroke="#41B349"
                strokeWidth="2"
                className="transition-colors duration-300"
              />
            </svg>

            {/* 3 DESKTOP CARDS: Exactly positioned underneath their border lines with #FFFFFF background */}
            {processStages.map((stage, idx) => {
              const IconComp = stage.icon;
              const isCenter = stage.isHighlighted;
              const isHovered = hoveredIdx === idx;

              return (
                <div
                  key={stage.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={stage.desktopStyle}
                  className="absolute rounded-[28px] bg-[#FFFFFF] px-7 py-9 flex flex-col items-center text-center justify-start z-10 transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgba(65,179,73,0.18)]"
                >
                  {/* Top Circular Icon Container */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 shadow-md ${
                      isCenter
                        ? "bg-[#41B349] text-white shadow-[0_0_24px_rgba(65,179,73,0.4)]"
                        : "bg-[#0D0F12] text-white border border-[#0D0F12]/10"
                    }`}
                  >
                    <IconComp
                      size={28}
                      className={isCenter ? "stroke-[2.2]" : "stroke-[1.8]"}
                    />
                  </div>

                  {/* Card Title */}
                  <h3
                    className={`text-[19px] sm:text-[20px] font-bold tracking-tight leading-snug mb-3.5 px-2 transition-colors duration-300 ${
                      isHovered ? "text-[#41B349]" : "text-[#0D0F12]"
                    }`}
                    style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {stage.title}
                  </h3>

                  {/* Card Description */}
                  <p
                    className="text-[13px] sm:text-[13.5px] leading-[1.65] text-[#0D0F12]/75 font-normal px-1 max-w-[290px]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {stage.description}
                  </p>
                </div>
              );
            })}

          </div>

          {/* ======================================================================= */}
          {/* MOBILE / TABLET VIEW (lg:hidden): Responsive Stacked Cards (#FFFFFF)     */}
          {/* ======================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:hidden">
            {processStages.map((stage, idx) => {
              const IconComp = stage.icon;
              const isCenter = stage.isHighlighted;
              const isHovered = hoveredIdx === idx;

              return (
                <div
                  key={`mobile-${stage.id}`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="rounded-[28px] bg-[#FFFFFF] border-2 border-[#41B349] px-6 sm:px-8 py-10 flex flex-col items-center text-center justify-start min-h-[420px] transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgba(65,179,73,0.18)]"
                >
                  {/* Top Circular Icon Container */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 shadow-md ${
                      isCenter
                        ? "bg-[#41B349] text-white shadow-[0_0_24px_rgba(65,179,73,0.4)]"
                        : "bg-[#0D0F12] text-white border border-[#0D0F12]/10"
                    }`}
                  >
                    <IconComp
                      size={28}
                      className={isCenter ? "stroke-[2.2]" : "stroke-[1.8]"}
                    />
                  </div>

                  {/* Card Title */}
                  <h3
                    className={`text-[19px] font-bold tracking-tight leading-snug mb-3.5 px-2 transition-colors duration-300 ${
                      isHovered ? "text-[#41B349]" : "text-[#0D0F12]"
                    }`}
                    style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {stage.title}
                  </h3>

                  {/* Card Description */}
                  <p
                    className="text-[13px] leading-[1.65] text-[#0D0F12]/75 font-normal px-1"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {stage.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

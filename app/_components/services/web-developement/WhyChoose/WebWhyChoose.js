"use client";

import React, { useState } from "react";
import { getCmsVal } from "@/lib/api-helper";
import {
  SectionBadge,
  SectionHeading,
  HighlightWord,
  SectionParagraph,
  CardHeading,
  CardParagraph,
} from "@/components/Typography";

// 6 Custom Vector Icons with stroke="currentColor" for seamless color inversion (#1B4E2C <-> #FFFFFF)
const icons = [
  // 1. Expert Developers
  (
    <svg
      className="w-full h-full transition-colors duration-300"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="32" cy="18" r="8" />
      <path d="M26 18h4M34 18h4" />
      <circle cx="28" cy="18" r="1.5" fill="currentColor" />
      <circle cx="36" cy="18" r="1.5" fill="currentColor" />
      <path d="M18 36c0-6 6-10 14-10s14 4 14 10" />
      <rect x="20" y="36" width="24" height="14" rx="2" />
      <path d="M16 50h32" />
      <path d="M27 41l-2 2 2 2M37 41l2 2-2 2M33 40l-2 6" strokeWidth="1.8" />
    </svg>
  ),
  // 2. Custom Digital Solutions
  (
    <svg
      className="w-full h-full transition-colors duration-300"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="18" y="22" width="28" height="20" rx="2" />
      <path d="M28 42v5M36 42v5M24 47h16" />
      <path d="M32 10a7 7 0 0 0-5 11.9c1.2 1.3 2 2.6 2 4.1h6c0-1.5.8-2.8 2-4.1A7 7 0 0 0 32 10z" />
      <path d="M30 29h4" />
      <path d="M32 6v2M22 12l1.5 1.5M42 12l-1.5 1.5" />
      <circle cx="25" cy="32" r="2.5" />
      <circle cx="39" cy="32" r="2.5" />
    </svg>
  ),
  // 3. Fast & Agile Delivery
  (
    <svg
      className="w-full h-full transition-colors duration-300"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="20" y="24" width="24" height="18" rx="2" />
      <path d="M44 30h7l5 6v6h-12v-12z" />
      <circle cx="28" cy="44" r="4" />
      <circle cx="48" cy="44" r="4" />
      <path d="M12 28h5M9 33h6M12 38h5" />
      <circle cx="32" cy="33" r="4" />
      <path d="M32 31v2h2" />
    </svg>
  ),
  // 4. Affordable & Transparent Pricing
  (
    <svg
      className="w-full h-full transition-colors duration-300"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 36v12h-5a2 2 0 0 1-2-2V38a2 2 0 0 1 2-2h5z" />
      <path d="M22 36l5-10a3 3 0 0 1 5 3v3h6a3 3 0 0 1 3 3.5l-2 9.5a4 4 0 0 1-4 3H22" />
      <circle cx="40" cy="22" r="9" />
      <path
        d="M40 17v10M37.5 19.5c0-1 1.2-1.5 2.5-1.5s2.5.5 2.5 1.5-1 2-2.5 2.5-2.5 1-2.5 2.5 1.2 1.5 2.5 1.5 2.5-.5 2.5-1.5"
        strokeWidth="1.8"
      />
    </svg>
  ),
  // 5. 24/7 Ongoing Support
  (
    <svg
      className="w-full h-full transition-colors duration-300"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M46 32a14 14 0 1 1-4.1-9.9" />
      <path d="M42 16l4 6.1-6.1 1" />
      <path d="M18 32a14 14 0 0 1 4.1-9.9" />
      <path d="M22 26l-4-6.1 6.1-1" />
      <text
        x="32"
        y="36"
        textAnchor="middle"
        fontSize="11"
        fontWeight="900"
        fill="currentColor"
        stroke="none"
        fontFamily="sans-serif"
      >
        24/7
      </text>
    </svg>
  ),
  // 6. Proven Growth Results
  (
    <svg
      className="w-full h-full transition-colors duration-300"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="18" y="24" width="28" height="18" rx="2" />
      <path d="M14 44h36" />
      <path d="M23 37l4-4 4 2 6-7" />
      <path d="M33 28h4v4" />
      <circle cx="43" cy="20" r="4" />
      <path d="M43 14v2M43 24v2M37 20h2M47 20h2" />
    </svg>
  ),
];

const webWhyChooseData = [
  // Top Row: Left (0), Center (1), Right (2)
  {
    id: 0,
    title: "Expert Developers",
    desc: "Our team of skilled developers and UX engineers builds responsive, modern web platforms following strict engineering best practices.",
    icon: icons[0],
  },
  {
    id: 1,
    title: "Custom Digital Solutions",
    desc: "Every business is unique. We engineer bespoke web architectures and enterprise platforms tailored to your brand, business goals, and audience.",
    icon: icons[1],
  },
  {
    id: 2,
    title: "Fast & Agile Delivery",
    desc: "Our agile sprint model enables rapid, reliable deployment while maintaining high-throughput security, speed, and responsive fluidity.",
    icon: icons[2],
  },
  // Bottom Row: Left (3), Center (4), Right (5)
  {
    id: 3,
    title: "Affordable & Transparent Pricing",
    desc: "Enterprise-grade web engineering at clear, competitive rates with zero hidden costs, so you can invest with total confidence.",
    icon: icons[3],
  },
  {
    id: 4,
    title: "24/7 Ongoing Support",
    desc: "Our commitment extends beyond launch with round-the-clock maintenance, proactive security monitoring, and instant troubleshooting.",
    icon: icons[4],
  },
  {
    id: 5,
    title: "Proven Growth Results",
    desc: "Custom web architectures built to streamline operations, elevate digital user experience, and drive measurable commercial growth.",
    icon: icons[5],
  },
];

export default function WebWhyChoose({ cmsContent }) {
  const eyebrow = getCmsVal(cmsContent, "WHY CHOOSE US", "webwhychoose");
  const defaultHeading = "Why Choose Tech Solutionor";
  const heading = getCmsVal(cmsContent, defaultHeading, "webwhychoose");
  const defaultSub = "Engineered for high performance, enterprise security, and measurable digital growth.";
  const subtitle = getCmsVal(cmsContent, defaultSub, "webwhychoose");

  const displayCards = webWhyChooseData.map((item) => ({
    ...item,
    title: getCmsVal(cmsContent, item.title, "webwhychoose"),
    desc: getCmsVal(cmsContent, item.desc, "webwhychoose"),
  }));

  // Permanent default active card is center card (index 1)
  const defaultCardIndex = displayCards.findIndex(
    (item) => item.title && item.title.toLowerCase().includes("tailored mobile architecture")
  );
  const defaultActiveId = defaultCardIndex !== -1
    ? (displayCards[defaultCardIndex].id !== undefined ? displayCards[defaultCardIndex].id : defaultCardIndex)
    : (displayCards[1]?.id !== undefined ? displayCards[1].id : (displayCards[0]?.id !== undefined ? displayCards[0].id : 0));

  const [hoveredId, setHoveredId] = useState(null);
  const activeId = hoveredId !== null ? hoveredId : defaultActiveId;

  return (
    <section className="relative w-full bg-[#FFFFFF] py-14 sm:py-20 md:py-24 select-none">
      <div className="w-full max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center z-10">
        
        {/* SECTION HEADER (Exact Home Page Typography) */}
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10">
          {/* Pulsing Pill Eyebrow Badge */}
          <div className="mb-2">
            <SectionBadge variant="light">
              {eyebrow}
            </SectionBadge>
          </div>

          {/* Heading matching Homepage Typography */}
          <SectionHeading
            as="h2"
            size="section"
            theme="dark"
            className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] leading-tight"
          >
            {heading.includes("Tech Solutionor") ? (
              <>
                Why Choose{" "}
                <HighlightWord className="block sm:inline mt-0.5 sm:mt-0 text-[#1B4E2C]">
                  Tech Solutionor
                </HighlightWord>
              </>
            ) : (
              heading
            )}
          </SectionHeading>

          {/* Clean Subtitle matching Home Page Hierarchy */}
          <SectionParagraph
            size="sm"
            theme="slate"
            className="max-w-lg mx-auto mt-1 hidden sm:block"
          >
            {subtitle}
          </SectionParagraph>
        </div>

        {/* =============================================================== */}
        {/* CARDS CONTAINER (Max width 1160px, 3-column layout)             */}
        {/* =============================================================== */}
        <div
          className="w-full flex flex-col gap-2.5 sm:gap-3.5 md:gap-4 lg:gap-5 relative"
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* ROW 1: TOP 3 CARDS */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4 lg:gap-5 relative z-20">
            {displayCards[0] && (
              <Card
                item={displayCards[0]}
                isActive={activeId === displayCards[0].id}
                onMouseEnter={() => setHoveredId(displayCards[0].id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            )}
            {displayCards[1] && (
              <Card
                item={displayCards[1]}
                isActive={activeId === displayCards[1].id}
                onMouseEnter={() => setHoveredId(displayCards[1].id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            )}
            {displayCards[2] && (
              <Card
                item={displayCards[2]}
                isActive={activeId === displayCards[2].id}
                onMouseEnter={() => setHoveredId(displayCards[2].id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            )}
          </div>

          {/* ROW 2: BOTTOM 3 CARDS */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4 lg:gap-5 relative z-10">
            {displayCards[3] && (
              <Card
                item={displayCards[3]}
                isActive={activeId === displayCards[3].id}
                onMouseEnter={() => setHoveredId(displayCards[3].id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            )}
            {displayCards[4] && (
              <Card
                item={displayCards[4]}
                isActive={activeId === displayCards[4].id}
                onMouseEnter={() => setHoveredId(displayCards[4].id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            )}
            {displayCards[5] && (
              <Card
                item={displayCards[5]}
                isActive={activeId === displayCards[5].id}
                onMouseEnter={() => setHoveredId(displayCards[5].id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Single Card Component: White default (#FFFFFF) -> Primary Green (#1B4E2C) on hover/active
function Card({ item, isActive, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-3 sm:p-4 md:p-5 border transition-all duration-300 cursor-pointer min-h-[135px] sm:min-h-[160px] md:min-h-[185px] flex flex-col justify-between relative overflow-hidden ${
        isActive
          ? "bg-[#1B4E2C] border-[#1B4E2C] shadow-[0_16px_40px_rgba(27,78,44,0.25)] -translate-y-1"
          : "bg-[#FFFFFF] border-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:bg-[#1B4E2C] hover:border-[#1B4E2C] hover:shadow-[0_16px_40px_rgba(27,78,44,0.25)] hover:-translate-y-1"
      }`}
    >
      {/* Ambient hover corner highlight */}
      <div
        className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl rounded-bl-full pointer-events-none transition-all duration-300 ${
          isActive
            ? "from-white/10 to-transparent"
            : "from-[#1B4E2C]/5 to-transparent group-hover:from-white/10"
        }`}
      />

      <div>
        {/* Top bar with Icon Badge & Tag */}
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg sm:rounded-xl p-1.5 sm:p-2 flex items-center justify-center transition-all duration-300 ${
              isActive
                ? "bg-white/20 text-white"
                : "bg-[#1B4E2C]/10 text-[#1B4E2C] group-hover:bg-white/20 group-hover:text-white"
            }`}
          >
            {item.icon}
          </div>
          {/* Category Tag matching Home Page badge styling */}
          <span
            className={`hidden sm:inline-block font-jakarta font-bold text-[9px] md:text-[10px] tracking-wider uppercase transition-colors duration-300 ${
              isActive
                ? "text-white/80"
                : "text-[#1B4E2C] group-hover:text-white/80"
            }`}
          >
            TECH SOLUTIONOR
          </span>
        </div>

        {/* Card Title matching Homepage Typography */}
        <CardHeading
          as="h3"
          size="sm"
          className={`text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-display uppercase tracking-tight leading-snug transition-colors duration-300 mb-1 ${
            isActive
              ? "text-white"
              : "text-[#0D0F12] group-hover:text-white"
          }`}
        >
          {item.title}
        </CardHeading>

        {/* Card Description matching Homepage Typography */}
        <CardParagraph
          size="xs"
          className={`text-[10px] sm:text-[11.5px] md:text-[12.5px] leading-relaxed transition-colors duration-300 line-clamp-2 sm:line-clamp-3 ${
            isActive
              ? "text-white/95"
              : "text-[#475569] group-hover:text-white/95"
          }`}
        >
          {item.desc}
        </CardParagraph>
      </div>
    </div>
  );
}

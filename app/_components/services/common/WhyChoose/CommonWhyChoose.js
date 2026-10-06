"use client";

import React, { useState } from "react";
import { servicesWhyChooseData } from "@/app/_data/servicesWhyChooseData";
import { getCmsVal } from "@/lib/api-helper";
import {
  SectionBadge,
  SectionHeading,
  HighlightWord,
  SectionParagraph,
  CardHeading,
  CardParagraph,
} from "@/components/Typography";

/**
 * Reusable Why Choose Component
 * Clean, static section with interactive active/hover card highlighting.
 *
 * @param {string} serviceKey - Target service identifier (e.g., 'app-development', 'software-development', etc.)
 * @param {Array} items - Optional custom 6-card array override
 * @param {string} eyebrow - Optional pill badge label (default: "WHY CHOOSE US")
 * @param {string} titlePrefix - Optional heading prefix (default: "Why Choose")
 * @param {string} titleHighlight - Optional heading highlight (default: "Tech Solutionor")
 * @param {string} subtitle - Optional subtitle override
 * @param {string} tagText - Optional card category badge text (default: "TECH SOLUTIONOR")
 */
export default function CommonWhyChoose({
  cmsContent,
  serviceKey = "app-development",
  items,
  eyebrow = "WHY CHOOSE US",
  titlePrefix = "Why Choose",
  titleHighlight = "Tech Solutionor",
  subtitle,
  tagText = "TECH SOLUTIONOR",
}) {
  // Resolve data based on serviceKey or items prop
  const serviceConfig = servicesWhyChooseData[serviceKey] || servicesWhyChooseData["app-development"];
  const rawItems = items || serviceConfig?.items || [];
  const rawSubtitle = subtitle || serviceConfig?.subtitle || "Engineered for high performance, enterprise security, and measurable digital growth.";

  const dynamicEyebrow = getCmsVal(cmsContent, eyebrow, "whychoose");
  const dynamicTitlePrefix = getCmsVal(cmsContent, titlePrefix, "whychoose");
  const dynamicTitleHighlight = getCmsVal(cmsContent, titleHighlight, "whychoose");
  const displaySubtitle = getCmsVal(cmsContent, rawSubtitle, "whychoose");

  const displayItems = rawItems.map((card) => ({
    ...card,
    title: getCmsVal(cmsContent, card.title, "whychoose"),
    desc: getCmsVal(cmsContent, card.desc, "whychoose"),
  }));

  // Resolve permanent default active card: prefer "Tailored Mobile Architecture" or index 1
  const defaultCardIndex = displayItems.findIndex(
    (item) => item.title && item.title.toLowerCase().includes("tailored mobile architecture")
  );
  const defaultActiveId = defaultCardIndex !== -1
    ? (displayItems[defaultCardIndex].id !== undefined ? displayItems[defaultCardIndex].id : defaultCardIndex)
    : (displayItems[1]?.id !== undefined ? displayItems[1].id : (displayItems[0]?.id !== undefined ? displayItems[0].id : 0));

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
              {dynamicEyebrow}
            </SectionBadge>
          </div>

          {/* Heading matching Homepage Typography */}
          <SectionHeading
            as="h2"
            size="section"
            theme="dark"
            className="text-center"
          >
            {dynamicTitlePrefix}{" "}
            <HighlightWord className="block sm:inline mt-0.5 sm:mt-0">
              {dynamicTitleHighlight}
            </HighlightWord>
          </SectionHeading>

          {/* Clean Subtitle matching Homepage Hierarchy */}
          <SectionParagraph
            size="md"
            theme="slate"
            className="max-w-2xl mx-auto mt-3 text-center"
          >
            {displaySubtitle}
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
            {displayItems[0] && (
              <Card
                item={displayItems[0]}
                tagText={tagText}
                isActive={activeId === displayItems[0].id}
                onMouseEnter={() => setHoveredId(displayItems[0].id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            )}
            {displayItems[1] && (
              <Card
                item={displayItems[1]}
                tagText={tagText}
                isActive={activeId === displayItems[1].id}
                onMouseEnter={() => setHoveredId(displayItems[1].id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            )}
            {displayItems[2] && (
              <Card
                item={displayItems[2]}
                tagText={tagText}
                isActive={activeId === displayItems[2].id}
                onMouseEnter={() => setHoveredId(displayItems[2].id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            )}
          </div>

          {/* ROW 2: BOTTOM 3 CARDS */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4 lg:gap-5 relative z-10">
            {displayItems[3] && (
              <Card
                item={displayItems[3]}
                tagText={tagText}
                isActive={activeId === displayItems[3].id}
                onMouseEnter={() => setHoveredId(displayItems[3].id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            )}
            {displayItems[4] && (
              <Card
                item={displayItems[4]}
                tagText={tagText}
                isActive={activeId === displayItems[4].id}
                onMouseEnter={() => setHoveredId(displayItems[4].id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            )}
            {displayItems[5] && (
              <Card
                item={displayItems[5]}
                tagText={tagText}
                isActive={activeId === displayItems[5].id}
                onMouseEnter={() => setHoveredId(displayItems[5].id)}
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
function Card({ item, tagText, isActive, onMouseEnter, onMouseLeave }) {
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
          {/* Category Tag matching Homepage badge styling */}
          <span
            className={`hidden sm:inline-block font-jakarta font-semibold text-[10px] md:text-[11px] tracking-wider uppercase transition-colors duration-300 ${
              isActive
                ? "text-white/80"
                : "text-[#1B4E2C] group-hover:text-white/80"
            }`}
          >
            {tagText}
          </span>
        </div>

        {/* Card Title matching Homepage Typography */}
        <CardHeading
          as="h3"
          size="sm"
          className={`leading-snug transition-colors duration-300 mb-1 ${
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
          className={`leading-relaxed transition-colors duration-300 line-clamp-2 sm:line-clamp-3 ${
            isActive
              ? "text-white/95"
              : "text-[#4B5563] group-hover:text-white/95"
          }`}
        >
          {item.desc}
        </CardParagraph>
      </div>
    </div>
  );
}

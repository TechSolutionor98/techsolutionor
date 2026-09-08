"use client";

import React, { useState, useEffect, useRef } from "react";
import { servicesWhyChooseData } from "@/app/_data/servicesWhyChooseData";

// Polynomial smoothstep interpolation matching WebWhyChoose exactly
function smoothStep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

/**
 * Reusable Why Choose Component
 * Replicates the exact UI, style, design, layout, animations, spacing, typography,
 * and overall component structure as the existing "Why Choose Tech Solutionor" section (WebWhyChoose.js).
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
  serviceKey = "app-development",
  items,
  eyebrow = "WHY CHOOSE US",
  titlePrefix = "Why Choose",
  titleHighlight = "Tech Solutionor",
  subtitle,
  tagText = "TECH SOLUTIONOR",
}) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Resolve data based on serviceKey or items prop
  const serviceConfig = servicesWhyChooseData[serviceKey] || servicesWhyChooseData["app-development"];
  const displayItems = items || serviceConfig?.items || [];
  const displaySubtitle = subtitle || serviceConfig?.subtitle || "Engineered for high performance, enterprise security, and measurable digital growth.";

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const totalScrollable = rect.height - window.innerHeight;
          if (totalScrollable <= 0) return;

          // Compute scroll progress strictly within [0, 1]
          const p = Math.max(0, Math.min(1, -rect.top / totalScrollable));
          setProgress(p);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // =========================================================================
  // ANIMATION PHASE MAPPINGS (Identical to WebWhyChoose.js)
  // =========================================================================

  // FIRST ANIMATION — Top 3 Cards (Order: Center -> Right -> Left)
  // 1. Center card appears first from bottom: p = 0.05 -> 0.22
  const centerTopT = smoothStep(0.05, 0.22, progress);
  const centerTopY = (1 - centerTopT) * 150;
  const centerTopOpacity = progress < 0.04 ? 0 : Math.min(1, centerTopT * 1.5);

  // 2. Right card appears second from bottom: p = 0.20 -> 0.36
  const rightTopT = smoothStep(0.2, 0.36, progress);
  const rightTopY = (1 - rightTopT) * 150;
  const rightTopOpacity = progress < 0.19 ? 0 : Math.min(1, rightTopT * 1.5);

  // 3. Left card appears third from bottom: p = 0.34 -> 0.50
  const leftTopT = smoothStep(0.34, 0.5, progress);
  const leftTopY = (1 - leftTopT) * 150;
  const leftTopOpacity = progress < 0.33 ? 0 : Math.min(1, leftTopT * 1.5);

  // SECOND ANIMATION — Bottom 3 Cards (Slide down from behind Top Cards)
  // 1. Center bottom emerges first from behind Center top: p = 0.54 -> 0.70
  const centerBottomT = smoothStep(0.54, 0.7, progress);
  const centerBottomY = -(1 - centerBottomT) * 110; // percentage
  const centerBottomOpacity =
    progress < 0.52 ? 0 : Math.min(1, centerBottomT * 2.2);

  // 2. Right bottom emerges second from behind Right top: p = 0.62 -> 0.78
  const rightBottomT = smoothStep(0.62, 0.78, progress);
  const rightBottomY = -(1 - rightBottomT) * 110;
  const rightBottomOpacity =
    progress < 0.6 ? 0 : Math.min(1, rightBottomT * 2.2);

  // 3. Left bottom emerges third from behind Left top: p = 0.70 -> 0.86
  const leftBottomT = smoothStep(0.7, 0.86, progress);
  const leftBottomY = -(1 - leftBottomT) * 110;
  const leftBottomOpacity =
    progress < 0.68 ? 0 : Math.min(1, leftBottomT * 2.2);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#FFFFFF]"
      style={{ height: "360vh" }}
    >
      {/* Equal Top Transition Buffer (Matches Bottom Buffer for complete symmetry) */}
      <div className="w-full h-14 sm:h-20 md:h-24 pointer-events-none" />

      {/* STICKY VIEWPORT WRAPPER (Pinned while progress 0 -> 1) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 select-none bg-[#FFFFFF]">

        {/* ================================================================= */}
        {/* CENTERED CONTENT WRAPPER: EQUAL TOP AND BOTTOM BREATHING ROOM      */}
        {/* ================================================================= */}
        <div className="w-full max-w-[1160px] mx-auto flex flex-col items-center justify-center my-auto z-10">
          
          {/* SECTION HEADER (Exact Home Page "About TechSolutionor" Typography) */}
          <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto mb-3 sm:mb-4 md:mb-5">
            
            {/* Pulsing Pill Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4E2C]/10 border border-[#1B4E2C]/20 text-[#1B4E2C] font-extrabold text-xs uppercase tracking-widest mb-2 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#1B4E2C] animate-pulse" />
              <span>{eyebrow}</span>
            </div>

            {/* Heading with Outfit & Plus Jakarta Sans typography */}
            <h2
              className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-black text-[#0D0F12] tracking-tight leading-tight"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              {titlePrefix}{" "}
              <span className="text-[#1B4E2C] block sm:inline mt-0.5 sm:mt-0">
                {titleHighlight}
              </span>
            </h2>

            {/* Clean Subtitle matching Home Page Hierarchy */}
            <p
              className="text-[#475569] text-xs sm:text-sm max-w-lg mx-auto mt-1 font-normal leading-relaxed hidden sm:block"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {displaySubtitle}
            </p>
          </div>

          {/* =============================================================== */}
          {/* CARDS CONTAINER (Max width 1160px, 3-column layout)             */}
          {/* =============================================================== */}
          <div className="w-full flex flex-col gap-2.5 sm:gap-3.5 md:gap-4 lg:gap-5 relative">
            
            {/* ROW 1: TOP 3 CARDS (Z-INDEX 30 - Solid White to mask Row 2 cards) */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4 lg:gap-5 relative z-30">
              {/* Card 0: Left Top */}
              <div
                style={{
                  transform: `translate3d(0, ${leftTopY}px, 0)`,
                  opacity: leftTopOpacity,
                  willChange: "transform, opacity",
                }}
                className="transition-transform duration-75 ease-out"
              >
                {displayItems[0] && <Card item={displayItems[0]} tagText={tagText} />}
              </div>

              {/* Card 1: Center Top (Enters First) */}
              <div
                style={{
                  transform: `translate3d(0, ${centerTopY}px, 0)`,
                  opacity: centerTopOpacity,
                  willChange: "transform, opacity",
                }}
                className="transition-transform duration-75 ease-out"
              >
                {displayItems[1] && <Card item={displayItems[1]} tagText={tagText} />}
              </div>

              {/* Card 2: Right Top (Enters Second) */}
              <div
                style={{
                  transform: `translate3d(0, ${rightTopY}px, 0)`,
                  opacity: rightTopOpacity,
                  willChange: "transform, opacity",
                }}
                className="transition-transform duration-75 ease-out"
              >
                {displayItems[2] && <Card item={displayItems[2]} tagText={tagText} />}
              </div>
            </div>

            {/* ROW 2: BOTTOM 3 CARDS (Z-INDEX 10 - Slides Down from Behind Row 1)*/}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4 lg:gap-5 relative z-10">
              {/* Card 3: Left Bottom (Emerges from behind Left Top) */}
              <div
                style={{
                  transform: `translate3d(0, ${leftBottomY}%, 0)`,
                  opacity: leftBottomOpacity,
                  willChange: "transform, opacity",
                }}
                className="transition-transform duration-75 ease-out"
              >
                {displayItems[3] && <Card item={displayItems[3]} tagText={tagText} />}
              </div>

              {/* Card 4: Center Bottom (Emerges from behind Center Top) */}
              <div
                style={{
                  transform: `translate3d(0, ${centerBottomY}%, 0)`,
                  opacity: centerBottomOpacity,
                  willChange: "transform, opacity",
                }}
                className="transition-transform duration-75 ease-out"
              >
                {displayItems[4] && <Card item={displayItems[4]} tagText={tagText} />}
              </div>

              {/* Card 5: Right Bottom (Emerges from behind Right Top) */}
              <div
                style={{
                  transform: `translate3d(0, ${rightBottomY}%, 0)`,
                  opacity: rightBottomOpacity,
                  willChange: "transform, opacity",
                }}
                className="transition-transform duration-75 ease-out"
              >
                {displayItems[5] && <Card item={displayItems[5]} tagText={tagText} />}
              </div>
            </div>
          </div>

          {/* Subtle Scroll Progress Indicator Bar with balanced margin */}
          <div className="w-full max-w-[160px] sm:max-w-xs h-1 bg-gray-200/70 rounded-full mt-3 sm:mt-4 overflow-hidden z-20">
            <div
              className="h-full bg-[#1B4E2C] transition-all duration-100 ease-out rounded-full"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Equal Bottom Transition Buffer (Matches Top Buffer for complete symmetry) */}
      <div className="w-full h-14 sm:h-20 md:h-24 pointer-events-none" />
    </section>
  );
}

// Single Card Component: White default (#FFFFFF) -> Primary Green (#1B4E2C) on hover
function Card({ item, tagText }) {
  return (
    <div className="group bg-[#FFFFFF] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-3 sm:p-4 md:p-5 border border-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:bg-[#1B4E2C] hover:border-[#1B4E2C] hover:shadow-[0_16px_40px_rgba(27,78,44,0.25)] hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[135px] sm:min-h-[160px] md:min-h-[185px] flex flex-col justify-between relative overflow-hidden">
      
      {/* Ambient hover corner highlight */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#1B4E2C]/5 to-transparent group-hover:from-white/10 rounded-bl-full pointer-events-none transition-all duration-300" />

      <div>
        {/* Top bar with Icon Badge & Tag */}
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg sm:rounded-xl bg-[#1B4E2C]/10 group-hover:bg-white/20 text-[#1B4E2C] group-hover:text-white p-1.5 sm:p-2 flex items-center justify-center transition-all duration-300">
            {item.icon}
          </div>
          {/* Category Tag matching Home Page badge styling */}
          <span
            className="hidden sm:inline-block text-[9px] md:text-[10px] font-bold tracking-wider uppercase text-[#1B4E2C] group-hover:text-white/80 transition-colors duration-300"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {tagText}
          </span>
        </div>

        {/* Card Title matching Outfit font */}
        <h3
          className="text-[#0D0F12] group-hover:text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[17px] font-black leading-snug tracking-tight transition-colors duration-300 mb-1"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          {item.title}
        </h3>

        {/* Card Description matching Home Page body text style */}
        <p
          className="text-[#475569] group-hover:text-white/95 text-[10px] sm:text-[11.5px] md:text-[12.5px] leading-relaxed font-normal transition-colors duration-300 line-clamp-2 sm:line-clamp-3"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {item.desc}
        </p>
      </div>
    </div>
  );
}

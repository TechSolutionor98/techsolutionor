"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useQuote } from "@/app/_context/QuoteContext";
import { useLanguage } from "@/app/_context/LanguageContext";
import { getServiceTechnologies } from "@/app/_data/servicesTechnologiesData";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Curated 14-Page Professional & Elegant Editorial Paper Palette
 * Engineered specifically for the TechSolutionor enterprise theme:
 * - Brand Greens: Mint Sage, Mineral Eucalyptus, Celadon Dew, Mint Whisper, Emerald Pearl
 * - Warm Luxury Neutrals: Alabaster Linen, Oyster Cream, Chalk Vellum, Sandstone Vellum
 * - Architectural Silvers: Platinum Silver, Titanium Mist, Slate Pearl, Glacial Cloud, Alpine Frost
 *
 * All pages maintain high luminance (93% - 97.5%) with WCAG AAA contrast against dark headings.
 * Dual-page spreads pair harmoniously (neutral + brand tone), ensuring a polished, unified look.
 */
export const PAGE_THEMES = [
  // Page 00 - Cover / Engineering Stack (Refined Mint Sage - Brand Green Welcome)
  {
    name: "Mint Sage",
    bgGradient: "linear-gradient(145deg, #F6FAF7 0%, #E8F3EC 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(27, 78, 44, 0.045)",
  },
  // Page 01 - HTML5 / Semantic Structure (Warm Alabaster Linen)
  {
    name: "Alabaster Linen",
    bgGradient: "linear-gradient(145deg, #FAF8F5 0%, #F1ECE3 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.04)",
  },
  // Page 02 - CSS3 / Modern Styling (Architectural Platinum Silver)
  {
    name: "Platinum Silver",
    bgGradient: "linear-gradient(145deg, #F7F9FA 0%, #E9EFF2 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.04)",
  },
  // Page 03 - JavaScript / Dynamic Logic (Warm Oyster Cream)
  {
    name: "Oyster Cream",
    bgGradient: "linear-gradient(145deg, #FAF8F3 0%, #F1EDE2 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.04)",
  },
  // Page 04 - Frameworks & Architecture (Mineral Eucalyptus Mist)
  {
    name: "Eucalyptus Mist",
    bgGradient: "linear-gradient(145deg, #F5FAF8 0%, #E5F2ED 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(27, 78, 44, 0.045)",
  },
  // Page 05 - Backend Engines / Node.js (Cool Titanium Mist)
  {
    name: "Titanium Mist",
    bgGradient: "linear-gradient(145deg, #F8F9FA 0%, #EAEEF1 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.04)",
  },
  // Page 06 - Database & Storage (Pale Celadon Dew)
  {
    name: "Pale Celadon",
    bgGradient: "linear-gradient(145deg, #F4FAF7 0%, #E4F1E9 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(27, 78, 44, 0.045)",
  },
  // Page 07 - Cloud & Distributed Platforms (Italian Chalk Vellum)
  {
    name: "Chalk Vellum",
    bgGradient: "linear-gradient(145deg, #F9F8F5 0%, #ECE7DD 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.04)",
  },
  // Page 08 - Security & Enterprise Architecture (Pale Slate Pearl)
  {
    name: "Slate Pearl",
    bgGradient: "linear-gradient(145deg, #F6F8FA 0%, #E7ECF0 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.04)",
  },
  // Page 09 - Microservices & APIs (Crisp Mint Whisper)
  {
    name: "Mint Whisper",
    bgGradient: "linear-gradient(145deg, #F4FAF6 0%, #E2F2E7 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(27, 78, 44, 0.045)",
  },
  // Page 10 - AI, Intelligent Systems & Logic (Nordic Glacial Cloud)
  {
    name: "Glacial Cloud",
    bgGradient: "linear-gradient(145deg, #F7FAFC 0%, #E8EEF3 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.04)",
  },
  // Page 11 - Headless CMS & Content Systems (Sandstone Vellum)
  {
    name: "Sandstone Vellum",
    bgGradient: "linear-gradient(145deg, #FAF7F2 0%, #EFE9DC 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.04)",
  },
  // Page 12 - Performance & Web Vitals (Pale Alpine Frost)
  {
    name: "Alpine Frost",
    bgGradient: "linear-gradient(145deg, #F5F9FB 0%, #E5EFF4 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.04)",
  },
  // Page 13 - Final CTA / Next Chapter (Prestige Emerald Pearl)
  {
    name: "Emerald Pearl",
    bgGradient: "linear-gradient(145deg, #F2FAF5 0%, #DCF0E3 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(27, 78, 44, 0.045)",
  },
];

/**
 * Reusable Technologies Book Component
 * Used across all Service Pages in the Services dropdown.
 *
 * @param {string} serviceKey - e.g. "web-development", "app-development", "software-development", etc.
 * @param {string} lang - optional language override ("en" or "ar")
 * @param {object} customData - optional custom book dataset override
 */
const TechnologiesBook = ({
  serviceKey = "web-development",
  lang,
  customData,
  bgColor = "#FFFFFF",
}) => {
  const { openQuote } = useQuote();
  const { language } = useLanguage();
  const activeLang = lang || language || "en";

  const isLightBg = bgColor.toUpperCase() === "#FFFFFF" || bgColor.toLowerCase() === "white";

  // Resolve dataset for the specific service and language
  const content = customData || getServiceTechnologies(serviceKey, activeLang);
  const {
    badge = "WE ARE BEST",
    title = "Technologies",
    titleHighlight = "We Use",
    pages: pagesData = [],
  } = content;

  // Build the 6 turning leaves between Permanent Left Base (Page 0) and Permanent Right Base (Page 13)
  const leaves = [
    { leafIndex: 0, front: pagesData[1], back: pagesData[2] },
    { leafIndex: 1, front: pagesData[3], back: pagesData[4] },
    { leafIndex: 2, front: pagesData[5], back: pagesData[6] },
    { leafIndex: 3, front: pagesData[7], back: pagesData[8] },
    { leafIndex: 4, front: pagesData[9], back: pagesData[10] },
    { leafIndex: 5, front: pagesData[11], back: pagesData[12] },
  ];

  const totalSpreads = 7; // Spreads 0 to 6 (14 pages total)
  const [activeSpread, setActiveSpread] = useState(0);
  const [continuousProgress, setContinuousProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const trackRef = useRef(null);
  const targetSpreadRef = useRef(0);
  const animFrameRef = useRef(null);

  // Smooth continuous lerp for page-turning animation
  const animateToTarget = useCallback((targetVal) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const startVal = continuousProgress;
    const startTime = performance.now();
    const duration = 500; // ms

    const step = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - t, 3);
      const nextVal = startVal + (targetVal - startVal) * ease;
      setContinuousProgress(nextVal);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, [continuousProgress]);

  // Navigate to specific spread
  const goToSpread = useCallback((index) => {
    const clamped = Math.max(0, Math.min(index, totalSpreads - 1));
    setActiveSpread(clamped);
    targetSpreadRef.current = clamped;
    animateToTarget(clamped);
  }, [animateToTarget, totalSpreads]);

  const handleNext = useCallback(() => {
    if (activeSpread < totalSpreads - 1) {
      goToSpread(activeSpread + 1);
    }
  }, [activeSpread, goToSpread, totalSpreads]);

  const handlePrev = useCallback(() => {
    if (activeSpread > 0) {
      goToSpread(activeSpread - 1);
    }
  }, [activeSpread, goToSpread]);

  // Viewport scroll pinning & scroll-driven page flipping
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - viewportHeight;

      if (totalScrollableDistance <= 0) return;

      const scrolledPastTop = -rect.top;

      if (scrolledPastTop >= 0 && scrolledPastTop <= totalScrollableDistance) {
        const scrollFraction = scrolledPastTop / totalScrollableDistance;
        const mappedProgress = scrollFraction * (totalSpreads - 1);
        const mappedSpread = Math.round(mappedProgress);

        targetSpreadRef.current = mappedSpread;
        setActiveSpread(mappedSpread);
        setContinuousProgress(mappedProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [totalSpreads]);

  // Keyboard navigation when section is hovered
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isHovered) return;
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHovered, handleNext, handlePrev]);

  return (
    <div
      ref={trackRef}
      id={`technologies-book-section-${serviceKey}`}
      className="relative w-full"
      style={{
        height: "450vh",
        backgroundColor: bgColor,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* STICKY BOOK VIEWPORT (Section background #FFFFFF) */}
      <div
        className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden select-none px-4 sm:px-6 md:px-10 z-10 font-sans"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          backgroundColor: bgColor,
        }}
      >
        {/* SUBTLE MINIMAL ARCHITECTURAL GRID OVERLAY */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: isLightBg
                ? `linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)`
                : `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* SECTION HEADER (Matching Exact Typography of Home Page About TechSolutionor) */}
        <div className="relative z-10 w-full max-w-[980px] flex items-center justify-between mb-2 sm:mb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#41B349]/15 border border-[#41B349]/30 text-[#41B349] font-extrabold text-[11px] sm:text-xs uppercase tracking-widest mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
              <span>{badge}</span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-black tracking-tight leading-tight ${
                isLightBg ? "text-[#0D0F12]" : "text-white"
              }`}
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              {title} <span className="text-[#41B349]">{titleHighlight}</span>
            </h2>
          </div>

          {/* CIRCULAR PREV / NEXT CONTROLS */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={handlePrev}
              disabled={activeSpread === 0}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                activeSpread === 0
                  ? isLightBg
                    ? "border-gray-200 text-gray-300 cursor-not-allowed opacity-40 bg-gray-50"
                    : "border-white/10 text-white/30 cursor-not-allowed opacity-30 bg-white/5"
                  : isLightBg
                  ? "border-gray-200 bg-white text-[#1B4E2C] shadow-sm hover:bg-gray-50 hover:border-gray-300 active:scale-95"
                  : "border-white/30 bg-white text-[#1B4E2C] hover:bg-white/90 active:scale-95"
              }`}
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            <button
              onClick={handleNext}
              disabled={activeSpread === totalSpreads - 1}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                activeSpread === totalSpreads - 1
                  ? isLightBg
                    ? "border-gray-200 text-gray-300 cursor-not-allowed opacity-40 bg-gray-50"
                    : "border-white/10 text-white/30 cursor-not-allowed opacity-30 bg-white/5"
                  : isLightBg
                  ? "border-gray-200 bg-white text-[#1B4E2C] shadow-sm hover:bg-gray-50 hover:border-gray-300 active:scale-95"
                  : "border-white/30 bg-white text-[#1B4E2C] hover:bg-white/90 active:scale-95"
              }`}
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
          </div>
        </div>

        {/* 3D BOOK CONTAINER (Perspective Projection, Rounded Editorial Pages) */}
        <div
          className="relative z-10 w-full max-w-[980px] h-[340px] sm:h-[375px] md:h-[410px] lg:h-[435px] max-h-[58vh]"
          style={{
            perspective: "2400px",
          }}
        >
          {/* ========================================================= */}
          {/* DESKTOP / TABLET DUAL-PAGE BOOK (md: and above) */}
          {/* ========================================================= */}
          <div
            className={`hidden md:flex relative w-full h-full rounded-2xl lg:rounded-3xl bg-white overflow-hidden ${
              isLightBg ? "border border-gray-200 shadow-2xl shadow-black/8" : "border border-white/20"
            }`}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* 1. PERMANENT LEFT BASE: Spread 0 Left (Cover: We Are Best) */}
            <div
              className="w-1/2 h-full relative z-0 border-r border-black/[0.06]"
              style={{ background: PAGE_THEMES[0].bgGradient }}
            >
              <PageContent page={pagesData[0]} isLeft={true} pageIndex={0} />
            </div>

            {/* 2. PERMANENT RIGHT BASE: Spread 6 Right (Page 13: Your Project? CTA) */}
            <div
              className="w-1/2 h-full relative z-0"
              style={{ background: PAGE_THEMES[13].bgGradient }}
            >
              <PageContent page={pagesData[13]} isLeft={false} openQuote={openQuote} pageIndex={13} />
            </div>

            {/* 3. PHYSICAL 3D TURNING LEAVES STACK (Leaves 0 to 5) */}
            {leaves.map(({ leafIndex, front, back }) => {
              const frontIdx = leafIndex * 2 + 1;
              const backIdx = leafIndex * 2 + 2;
              const frontTheme = PAGE_THEMES[frontIdx] || PAGE_THEMES[0];
              const backTheme = PAGE_THEMES[backIdx] || PAGE_THEMES[0];

              const leafProgress = Math.min(
                Math.max(continuousProgress - leafIndex, 0),
                1
              );
              const angle = -leafProgress * 180;

              const isTurnedPastHalf = leafProgress > 0.5;
              const zIndex = isTurnedPastHalf
                ? 10 + leafIndex
                : 30 - leafIndex;

              const curl = Math.sin(leafProgress * Math.PI) * 1.4;

              return (
                <div
                  key={leafIndex}
                  className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
                  style={{
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${angle}deg) rotateZ(${curl}deg)`,
                    zIndex,
                    willChange: "transform",
                  }}
                >
                  {/* FRONT FACE (Faces right when flat at 0deg) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-r-2xl lg:rounded-r-3xl overflow-hidden border-r border-black/[0.06]"
                    style={{
                      background: frontTheme.bgGradient,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(0deg)",
                    }}
                  >
                    <PageContent page={front} isLeft={false} openQuote={openQuote} pageIndex={frontIdx} />
                  </div>

                  {/* BACK FACE (Faces left when turned flat at -180deg) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-l-2xl lg:rounded-l-3xl overflow-hidden border-l border-black/[0.06]"
                    style={{
                      background: backTheme.bgGradient,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <PageContent page={back} isLeft={true} pageIndex={backIdx} />
                  </div>
                </div>
              );
            })}

            {/* ========================================================= */}
            {/* CENTRAL 3D SKEUOMORPHIC WIRE SPIRAL BINDING               */}
            {/* ========================================================= */}
            <div
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-5 sm:w-6 z-40 pointer-events-none flex flex-col justify-evenly items-center py-1.5"
              style={{
                transform: "translateZ(1px)",
              }}
            >
              {/* Central vertical spine binding seam */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 shadow-[0_0_2px_rgba(0,0,0,0.1)]" />

              {/* 11 Evenly Spaced Metallic Spring Rings & Punched Holes */}
              {Array.from({ length: 11 }).map((_, rIdx) => (
                <div key={rIdx} className="relative flex items-center justify-center w-full h-2.5 sm:h-3">
                  <div className="absolute left-0.5 sm:left-1 w-[3.5px] sm:w-[4px] h-[6.5px] sm:h-[7.5px] rounded-[1.5px] bg-gray-200 shadow-[inset_0_1px_1.5px_rgba(0,0,0,0.2)]" />
                  <div className="absolute right-0.5 sm:right-1 w-[3.5px] sm:w-[4px] h-[6.5px] sm:h-[7.5px] rounded-[1.5px] bg-gray-200 shadow-[inset_0_1px_1.5px_rgba(0,0,0,0.2)]" />
                  <div
                    className="relative z-10 w-[18px] sm:w-[21px] h-[4px] sm:h-[5px] rounded-full transform -rotate-[2deg]"
                    style={{
                      background:
                        "linear-gradient(180deg, #ffffff 0%, #cbd5e1 35%, #94a3b8 70%, #475569 100%)",
                      boxShadow:
                        "0 1.5px 3px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.9)",
                      border: "0.5px solid rgba(148,163,184,0.3)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* MOBILE SINGLE-PAGE BOOK (< md:) */}
          {/* ========================================================= */}
          {(() => {
            const mobilePageIdx = Math.min(activeSpread * 2 + 1, 13);
            const mobileTheme = PAGE_THEMES[mobilePageIdx] || PAGE_THEMES[0];
            return (
              <div
                className={`flex md:hidden relative w-full h-full rounded-2xl overflow-hidden ${
                  isLightBg ? "border border-gray-200 shadow-xl shadow-black/8" : "border border-white/20"
                }`}
                style={{ background: mobileTheme.bgGradient }}
              >
                <div className="w-full h-full">
                  <PageContent
                    page={pagesData[mobilePageIdx]}
                    isLeft={false}
                    openQuote={openQuote}
                    pageIndex={mobilePageIdx}
                  />
                </div>
              </div>
            );
          })()}
        </div>

        {/* BOTTOM PROGRESS INDICATORS */}
        <div className="relative z-10 w-full max-w-[980px] mt-2 sm:mt-2.5 flex items-center justify-between gap-2 text-xs">
          <div className="w-20 hidden sm:block" />

          {/* Interactive spread indicator dots */}
          <div className="flex items-center gap-1.5 sm:gap-2 mx-auto sm:mx-0">
            {Array.from({ length: totalSpreads }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSpread(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSpread === idx
                    ? isLightBg
                      ? "w-7 bg-[#1B4E2C]"
                      : "w-7 bg-white"
                    : isLightBg
                    ? "w-1.5 bg-gray-300 hover:bg-gray-400"
                    : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
                title={`Jump to spread ${idx + 1}`}
              />
            ))}
          </div>

          <div
            className={`text-[11px] sm:text-xs font-bold text-right w-20 tracking-wider ${
              isLightBg ? "text-[#0D0F12]" : "text-white"
            }`}
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            PAGE {String(activeSpread * 2 + 1).padStart(2, "0")} - {String(Math.min(activeSpread * 2 + 2, 14)).padStart(2, "0")} / 14
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SUB-COMPONENT: PAGE CONTENT (Rendered on pages and flipping leaves)
// Matching typography from Home Page About TechSolutionor
// =========================================================================
const PageContent = ({ page, isLeft, openQuote, pageIndex }) => {
  if (!page) return null;

  const resolvedIndex = typeof pageIndex === "number"
    ? pageIndex
    : parseInt(page.pageNumber || "0", 10) || 0;
  const pageTheme = PAGE_THEMES[resolvedIndex] || PAGE_THEMES[0];

  const IconComponent = page.icon;

  // Render CTA page (Spread 6 Right: "Your project? Start yours ↘")
  if (page.type === "cta") {
    return (
      <div
        className="relative w-full h-full p-3.5 sm:p-5 md:p-6 flex flex-col justify-between text-[#0D0F12]"
        style={{ background: pageTheme.bgGradient }}
      >
        {/* Subtle paper curvature gutter along the spine */}
        <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-8 bg-gradient-to-l from-transparent to-black/[0.04] pointer-events-none z-10" />

        {/* Top Header */}
        <div className="flex items-center justify-between">
          <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-widest text-[#41B349]">
            {page.subtitle}
          </span>
          <span
            className="text-[11px] sm:text-xs font-black text-[#1B4E2C] tracking-widest"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {page.pageNumber}
          </span>
        </div>

        {/* Center Content */}
        <div className="my-auto flex flex-col items-start max-w-[380px]">
          {/* Dot badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/20 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] animate-pulse" />
            <span className="text-[10px] font-extrabold text-[#41B349] uppercase tracking-widest">
              {page.badge || "NEXT CHAPTER"}
            </span>
          </div>

          <h2
            className="text-xl sm:text-2xl md:text-[26px] font-black text-[#0D0F12] tracking-tight leading-tight mb-2"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {page.title}
          </h2>

          <p className="text-xs sm:text-[12.5px] text-[#334155] font-normal leading-relaxed mb-3 sm:mb-4">
            {page.desc}
          </p>

          {/* Start Yours Button */}
          <button
            onClick={openQuote}
            className="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#1B4E2C] hover:bg-[#153e23] text-white text-xs sm:text-[13px] font-bold tracking-wide transition-all duration-300 cursor-pointer active:scale-95 shadow-xs"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            <span>Start yours</span>
            <span className="text-sm group-hover:translate-x-1 group-hover:translate-y-0.5 transition-transform duration-300">
              ↘
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 border-t border-black/[0.06] pt-1.5">
          <span>{page.footerLeft}</span>
          <span
            className="text-[#1B4E2C] font-black"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {page.footerRight}
          </span>
        </div>
      </div>
    );
  }

  // Render Standard Page (Tech or Cover)
  return (
    <div
      className={`relative w-full h-full p-3.5 sm:p-4 md:p-5 lg:p-6 flex flex-col justify-between text-[#0D0F12] overflow-hidden ${
        isLeft ? "pr-4 sm:pr-5 md:pr-6" : "pl-4 sm:pl-5 md:pl-6"
      }`}
      style={{ background: pageTheme.bgGradient }}
    >
      {/* Subtle paper curvature gutter along the spine */}
      {isLeft ? (
        <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-8 bg-gradient-to-r from-transparent to-black/[0.04] pointer-events-none z-10" />
      ) : (
        <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-8 bg-gradient-to-l from-transparent to-black/[0.04] pointer-events-none z-10" />
      )}

      {/* Background Watermark Text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-4xl sm:text-5xl md:text-6xl tracking-tighter select-none pointer-events-none uppercase"
        style={{
          fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
          color: pageTheme.watermarkColor || "rgba(0, 0, 0, 0.04)",
        }}
      >
        {page.watermark}
      </div>

      {/* TOP HEADER ROW */}
      <div className="relative z-10 flex items-center justify-between">
        {isLeft ? (
          <>
            <span
              className="text-[11px] sm:text-xs font-black text-[#1B4E2C] tracking-wider"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              {page.pageNumber}
            </span>
            <span className="text-[9.5px] sm:text-[10px] font-bold tracking-wider text-[#1B4E2C] uppercase bg-[#41B349]/10 px-2 py-0.5 rounded-full border border-[#41B349]/20">
              {page.badge}
            </span>
          </>
        ) : (
          <>
            <span className="text-[9.5px] sm:text-[10px] font-bold tracking-wider text-[#1B4E2C] uppercase bg-[#41B349]/10 px-2 py-0.5 rounded-full border border-[#41B349]/20">
              {page.badge}
            </span>
            <span
              className="text-[11px] sm:text-xs font-black text-[#1B4E2C] tracking-wider"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              {page.pageNumber}
            </span>
          </>
        )}
      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 my-auto flex flex-col items-start max-w-[380px]">
        {/* Subtitle / Category */}
        <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#41B349] mb-0.5">
          {page.subtitle}
        </div>

        {/* Main Title & Icon */}
        <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
          {IconComponent && (
            <div
              className="p-1.5 rounded-lg bg-white/90 border border-black/[0.06] shadow-2xs flex items-center justify-center shrink-0"
              style={{ color: page.iconColor }}
            >
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5" />
            </div>
          )}
          <h3
            className="text-base sm:text-lg md:text-xl font-black text-[#0D0F12] tracking-tight uppercase"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {page.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[11px] sm:text-[11.5px] md:text-[12px] text-[#334155] font-normal leading-relaxed mb-2 line-clamp-3 sm:line-clamp-none">
          {page.desc}
        </p>

        {/* Tech tags / Capabilities */}
        {page.tags && (
          <div className="flex flex-wrap gap-1">
            {page.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/20 text-[#1B4E2C] text-[10px] font-bold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM FOOTER METADATA */}
      <div className="relative z-10 flex items-center justify-between text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 border-t border-black/[0.06] pt-1.5">
        <span>{page.footerLeft}</span>
        <span
          className="text-[#1B4E2C] font-black"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          {page.footerRight}
        </span>
      </div>
    </div>
  );
};

export default TechnologiesBook;

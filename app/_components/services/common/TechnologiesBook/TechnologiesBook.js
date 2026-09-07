"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useQuote } from "@/app/_context/QuoteContext";
import { useLanguage } from "@/app/_context/LanguageContext";
import { getServiceTechnologies } from "@/app/_data/servicesTechnologiesData";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
}) => {
  const { openQuote } = useQuote();
  const { language } = useLanguage();
  const activeLang = lang || language || "en";

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
    const duration = 650; // Smooth 650ms animation

    const cubicEaseOut = (t) => {
      const f = t - 1.0;
      return f * f * f + 1.0;
    };

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      const eased = cubicEaseOut(progressRatio);
      const currentVal = startVal + (targetVal - startVal) * eased;

      setContinuousProgress(currentVal);

      if (progressRatio < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setContinuousProgress(targetVal);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, [continuousProgress]);

  // Navigate to specific spread
  const goToSpread = useCallback(
    (newSpread, smooth = true) => {
      const clamped = Math.max(0, Math.min(newSpread, totalSpreads - 1));
      targetSpreadRef.current = clamped;
      setActiveSpread(clamped);

      if (smooth) {
        animateToTarget(clamped);
      } else {
        setContinuousProgress(clamped);
      }
    },
    [animateToTarget, totalSpreads]
  );

  const handleNext = useCallback(() => {
    if (activeSpread < totalSpreads - 1) {
      goToSpread(activeSpread + 1);
    }
  }, [activeSpread, totalSpreads, goToSpread]);

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
      const trackHeight = trackRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // When the top of the track hits the top of viewport, pinning begins
      const scrolledPastTop = -rect.top;
      const totalScrollableDistance = trackHeight - windowHeight;

      if (totalScrollableDistance <= 0) return;

      if (scrolledPastTop <= 0) {
        targetSpreadRef.current = 0;
        setActiveSpread(0);
        setContinuousProgress(0);
      } else if (scrolledPastTop >= totalScrollableDistance) {
        targetSpreadRef.current = totalSpreads - 1;
        setActiveSpread(totalSpreads - 1);
        setContinuousProgress(totalSpreads - 1);
      } else {
        // Map scroll distance through the 7 spreads
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
        // 450vh tall scroll track guarantees sticky section stays 100% PINNED
        height: "450vh",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* STICKY BOOK VIEWPORT (Theme: Entire background #1B4E2C) */}
      <div
        className="sticky top-0 w-full h-screen flex flex-col justify-center items-center bg-[#1B4E2C] overflow-hidden select-none px-4 sm:px-6 md:px-10 z-10 font-sans"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* SUBTLE MINIMAL ARCHITECTURAL GRID OVERLAY */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* SECTION HEADER (Matching Exact Typography of Home Page About TechSolutionor) */}
        <div className="relative z-10 w-full max-w-[1140px] flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#41B349]/15 border border-[#41B349]/30 text-[#41B349] font-extrabold text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#41B349] animate-pulse" />
              <span>{badge}</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              {title} <span className="text-[#41B349]">{titleHighlight}</span>
            </h2>
          </div>

          {/* CIRCULAR PREV / NEXT CONTROLS */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={activeSpread === 0}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                activeSpread === 0
                  ? "border-white/10 text-white/30 cursor-not-allowed opacity-30 bg-white/5"
                  : "border-white/30 bg-white text-[#1B4E2C] hover:bg-white/90 active:scale-95"
              }`}
              title="Previous Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              disabled={activeSpread === totalSpreads - 1}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                activeSpread === totalSpreads - 1
                  ? "border-white/10 text-white/30 cursor-not-allowed opacity-30 bg-white/5"
                  : "border-white/30 bg-white text-[#1B4E2C] hover:bg-white/90 active:scale-95"
              }`}
              title="Next Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D BOOK CONTAINER (Pure White Pages, Zero Shadows, Perspective Projection) */}
        <div
          className="relative z-10 w-full max-w-[1140px] h-[390px] sm:h-[430px] md:h-[470px] lg:h-[500px] max-h-[64vh]"
          style={{
            perspective: "2600px",
          }}
        >
          {/* ========================================================= */}
          {/* DESKTOP / TABLET DUAL-PAGE BOOK (md: and above) */}
          {/* ========================================================= */}
          <div
            className="hidden md:flex relative w-full h-full rounded-2xl lg:rounded-3xl border border-white/20 bg-white overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* 1. PERMANENT LEFT BASE: Spread 0 Left (Cover: We Are Best) */}
            <div className="w-1/2 h-full relative z-0 border-r border-gray-200 bg-white">
              <PageContent page={pagesData[0]} isLeft={true} />
            </div>

            {/* 2. PERMANENT RIGHT BASE: Spread 6 Right (Page 13: Your Project? CTA) */}
            <div className="w-1/2 h-full relative z-0 bg-white">
              <PageContent page={pagesData[13]} isLeft={false} openQuote={openQuote} />
            </div>

            {/* 3. PHYSICAL 3D TURNING LEAVES STACK (Leaves 0 to 5) */}
            {leaves.map(({ leafIndex, front, back }) => {
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
                    className="absolute inset-0 w-full h-full bg-white rounded-r-2xl lg:rounded-r-3xl overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(0deg)",
                    }}
                  >
                    <PageContent page={front} isLeft={false} openQuote={openQuote} />
                  </div>

                  {/* BACK FACE (Faces left when turned flat at -180deg) */}
                  <div
                    className="absolute inset-0 w-full h-full bg-white rounded-l-2xl lg:rounded-l-3xl overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <PageContent page={back} isLeft={true} />
                  </div>
                </div>
              );
            })}

            {/* REALISTIC REGISTER / NOTEBOOK SPRING BINDING */}
            <div
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 sm:w-9 z-50 pointer-events-none flex flex-col justify-between py-6 sm:py-7"
              aria-hidden="true"
            >
              {/* Central vertical spine binding seam */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 shadow-[0_0_2px_rgba(0,0,0,0.1)]" />

              {/* 11 Evenly Spaced Metallic Spring Rings & Punched Holes */}
              {Array.from({ length: 11 }).map((_, rIdx) => (
                <div key={rIdx} className="relative flex items-center justify-center w-full h-3 sm:h-3.5">
                  {/* Left punched paper hole */}
                  <div className="absolute left-0.5 sm:left-1 w-[4px] sm:w-[4.5px] h-[7.5px] sm:h-[8.5px] rounded-[1.5px] bg-[#1e293b] shadow-[inset_0_1px_1.5px_rgba(0,0,0,0.8)] border border-gray-300/40" />

                  {/* Right punched paper hole */}
                  <div className="absolute right-0.5 sm:right-1 w-[4px] sm:w-[4.5px] h-[7.5px] sm:h-[8.5px] rounded-[1.5px] bg-[#1e293b] shadow-[inset_0_1px_1.5px_rgba(0,0,0,0.8)] border border-gray-300/40" />

                  {/* 3D Metallic Wire Coil Ring */}
                  <div
                    className="relative z-10 w-[21px] sm:w-[24px] h-[5px] sm:h-[6px] rounded-full transform -rotate-[2deg]"
                    style={{
                      background:
                        "linear-gradient(180deg, #ffffff 0%, #cbd5e1 35%, #94a3b8 70%, #475569 100%)",
                      boxShadow:
                        "0 1.5px 3px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.9)",
                      border: "0.5px solid rgba(148,163,184,0.6)",
                    }}
                  >
                    {/* Metallic specular highlight reflection */}
                    <div className="absolute top-[0.6px] left-1.5 right-1.5 h-[1px] bg-white/95 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* MOBILE SINGLE-PAGE BOOK (< md:) */}
          {/* ========================================================= */}
          <div className="flex md:hidden relative w-full h-full rounded-2xl border border-white/20 bg-white overflow-hidden">
            <div className="w-full h-full">
              <PageContent
                page={pagesData[Math.min(activeSpread * 2 + 1, 13)]}
                isLeft={false}
                openQuote={openQuote}
              />
            </div>
          </div>
        </div>

        {/* BOTTOM PROGRESS INDICATORS */}
        <div className="relative z-10 w-full max-w-[1140px] mt-2.5 sm:mt-3 flex items-center justify-between gap-2 text-xs text-white/75">
          <div className="w-24 hidden sm:block" />

          {/* Interactive spread indicator dots */}
          <div className="flex items-center gap-1.5 sm:gap-2 mx-auto sm:mx-0">
            {Array.from({ length: totalSpreads }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSpread(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSpread === idx
                    ? "w-8 bg-white"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                title={`Jump to spread ${idx + 1}`}
              />
            ))}
          </div>

          <div
            className="text-xs font-bold text-white text-right w-24 tracking-wider"
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
const PageContent = ({ page, isLeft, openQuote }) => {
  if (!page) return null;

  const IconComponent = page.icon;

  // Render CTA page (Spread 6 Right: "Your project? Start yours ↘")
  if (page.type === "cta") {
    return (
      <div className="relative w-full h-full p-4 sm:p-6 md:p-7 lg:p-8 flex flex-col justify-between bg-white text-[#0D0F12]">
        {/* Subtle paper curvature gutter along the spine */}
        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-10 bg-gradient-to-l from-transparent to-black/[0.04] pointer-events-none z-10" />

        {/* Top Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-[#41B349]">
            {page.subtitle}
          </span>
          <span
            className="text-xs font-black text-[#1B4E2C] tracking-widest"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {page.pageNumber}
          </span>
        </div>

        {/* Center Content */}
        <div className="my-auto flex flex-col items-start max-w-[420px]">
          {/* Dot badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#41B349]/10 border border-[#41B349]/20 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
            <span className="text-[11px] font-extrabold text-[#41B349] uppercase tracking-widest">
              {page.badge || "NEXT CHAPTER"}
            </span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0D0F12] tracking-tight leading-tight mb-2.5"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {page.title}
          </h2>

          <p className="text-xs sm:text-[13.5px] text-[#334155] font-normal leading-relaxed mb-4 sm:mb-5">
            {page.desc}
          </p>

          {/* Start Yours Button */}
          <button
            onClick={openQuote}
            className="group relative inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#1B4E2C] hover:bg-[#153e23] text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer active:scale-95"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            <span>Start yours</span>
            <span className="text-base group-hover:translate-x-1 group-hover:translate-y-0.5 transition-transform duration-300">
              ↘
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-400 border-t border-gray-100 pt-2">
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
      className={`relative w-full h-full p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col justify-between bg-white text-[#0D0F12] overflow-hidden ${
        isLeft ? "pr-5 sm:pr-6 md:pr-7" : "pl-5 sm:pl-6 md:pl-7"
      }`}
    >
      {/* Subtle paper curvature gutter along the spine */}
      {isLeft ? (
        <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-10 bg-gradient-to-r from-transparent to-black/[0.04] pointer-events-none z-10" />
      ) : (
        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-10 bg-gradient-to-l from-transparent to-black/[0.04] pointer-events-none z-10" />
      )}

      {/* Background Watermark Text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-100 font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter select-none pointer-events-none uppercase"
        style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
      >
        {page.watermark}
      </div>

      {/* TOP HEADER ROW */}
      <div className="relative z-10 flex items-center justify-between">
        {isLeft ? (
          <>
            <span
              className="text-xs sm:text-sm font-black text-[#1B4E2C] tracking-wider"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              {page.pageNumber}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#1B4E2C] uppercase bg-[#41B349]/10 px-2.5 py-1 rounded-full border border-[#41B349]/20">
              {page.badge}
            </span>
          </>
        ) : (
          <>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#1B4E2C] uppercase bg-[#41B349]/10 px-2.5 py-1 rounded-full border border-[#41B349]/20">
              {page.badge}
            </span>
            <span
              className="text-xs sm:text-sm font-black text-[#1B4E2C] tracking-wider"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              {page.pageNumber}
            </span>
          </>
        )}
      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 my-auto flex flex-col items-start max-w-[420px]">
        {/* Subtitle / Category */}
        <div className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#41B349] mb-1">
          {page.subtitle}
        </div>

        {/* Main Title & Icon */}
        <div className="flex items-center gap-2 sm:gap-2.5 mb-1.5 sm:mb-2">
          {IconComponent && (
            <div
              className="p-1.5 sm:p-2 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-center shrink-0"
              style={{ color: page.iconColor }}
            >
              <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </div>
          )}
          <h3
            className="text-lg sm:text-xl md:text-2xl font-black text-[#0D0F12] tracking-tight uppercase"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {page.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[12px] sm:text-[13px] md:text-[13.5px] text-[#334155] font-normal leading-relaxed mb-2.5 line-clamp-4 sm:line-clamp-none">
          {page.desc}
        </p>

        {/* Tech tags / Capabilities */}
        {page.tags && (
          <div className="flex flex-wrap gap-1.5">
            {page.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#41B349]/10 border border-[#41B349]/20 text-[#1B4E2C] text-[11px] font-bold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM FOOTER METADATA */}
      <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-400 border-t border-gray-100 pt-2">
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

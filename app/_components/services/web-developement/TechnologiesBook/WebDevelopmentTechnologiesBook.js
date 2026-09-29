"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useQuote } from "@/app/_context/QuoteContext";
import { useLanguage } from "@/app/_context/LanguageContext";
import { getServiceTechnologies } from "@/app/_data/servicesTechnologiesData";

/**
 * Curated Luxury Editorial Paper Palette for Web Development Book
 * Ultra-clean, luminous porcelain tones (98%+ luminance)
 */
export const WEB_PAGE_THEMES = [
  {
    name: "Porcelain Mint",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #FAFCFA 45%, #EFF6F1 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(27, 78, 44, 0.035)",
  },
  {
    name: "Platinum Mist",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #F9FBFC 45%, #EDF2F5 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.035)",
  },
  {
    name: "Oyster Porcelain",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #FAFBF9 45%, #F3F3EB 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.035)",
  },
  {
    name: "Eucalyptus Dew",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #FAFCFB 45%, #EEF6F3 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(27, 78, 44, 0.035)",
  },
  {
    name: "Titanium Pearl",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #F9FAFA 45%, #EDF1F3 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.035)",
  },
  {
    name: "Celadon Porcelain",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #FAFCFA 45%, #EEF5F0 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(27, 78, 44, 0.035)",
  },
  {
    name: "Chalk Vellum",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #FAF9F7 45%, #F1EEE6 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.035)",
  },
  {
    name: "Slate Pearl",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 45%, #ECEEF2 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.035)",
  },
  {
    name: "Mint Whisper",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #FAFCFA 45%, #EDF6F0 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(27, 78, 44, 0.035)",
  },
  {
    name: "Glacial Cloud",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFB 45%, #EBF1F5 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.035)",
  },
  {
    name: "Sandstone Vellum",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #FAF8F6 45%, #F2ECE5 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.035)",
  },
  {
    name: "Alpine Frost",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #F7FAFC 45%, #E9F1F6 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.035)",
  },
  {
    name: "Emerald Pearl",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #F7FAF8 45%, #E5F3EB 100%)",
    accent: "#1B4E2C",
    watermarkColor: "rgba(27, 78, 44, 0.04)",
  },
];

/**
 * Dedicated Web Development Technologies Book Component
 * Structure:
 * - Left Page: Content / Text for the technology (HTML5, CSS3, JS, etc.)
 * - Right Page: Corresponding Image / Visual for that technology (HTML5 Superhero image, clean, no gradients)
 */
const WebDevelopmentTechnologiesBook = ({
  serviceKey = "web-development",
  lang,
  customData,
  bgColor = "#FFFFFF",
}) => {
  const { openQuote } = useQuote();
  const { language } = useLanguage();
  const activeLang = lang || language || "en";

  // Content dataset from servicesTechnologiesData
  const content = customData || getServiceTechnologies(serviceKey, activeLang);
  const {
    badge = "WE ARE BEST",
    title = "Technologies",
    titleHighlight = "We Use",
    pages: rawPages = [],
  } = content;

  // Filter out the cover page so that Spread 0 begins directly with HTML5 (pagesData[1])
  // Each item in techList represents one dual-page spread (Left: Text, Right: Image)
  const techList = rawPages.slice(1);
  const totalSpreads = techList.length; // 13 spreads (12 technologies + 1 CTA)

  // 12 turning leaves between Spread 0 Left Base and Spread (totalSpreads - 1) Right Base
  const leaves = Array.from({ length: totalSpreads - 1 }).map((_, leafIdx) => ({
    leafIndex: leafIdx,
    // Front face: Right page of Spread leafIdx (Image of techList[leafIdx])
    frontTech: techList[leafIdx],
    // Back face: Left page of Spread leafIdx + 1 (Text of techList[leafIdx + 1])
    backTech: techList[leafIdx + 1],
  }));

  const [activeSpread, setActiveSpread] = useState(0);
  const [continuousProgress, setContinuousProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileView, setMobileView] = useState("text"); // "text" | "image"

  const trackRef = useRef(null);
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const animFrameRef = useRef(null);

  // Smooth continuous damped LERP engine for silky 60fps/120fps page turns
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0008) {
        const next = current + diff * 0.125;
        currentProgressRef.current = next;
        setContinuousProgress(next);
        const roundedSpread = Math.round(next);
        setActiveSpread(Math.max(0, Math.min(roundedSpread, totalSpreads - 1)));
      } else if (current !== target) {
        currentProgressRef.current = target;
        setContinuousProgress(target);
        const roundedSpread = Math.round(target);
        setActiveSpread(Math.max(0, Math.min(roundedSpread, totalSpreads - 1)));
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [totalSpreads]);

  // Navigate to specific spread with smooth damping
  const goToSpread = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(index, totalSpreads - 1));
      targetProgressRef.current = clamped;
    },
    [totalSpreads]
  );

  const handleNext = useCallback(() => {
    const nextSpread = Math.min(Math.floor(targetProgressRef.current) + 1, totalSpreads - 1);
    goToSpread(nextSpread);
  }, [goToSpread, totalSpreads]);

  const handlePrev = useCallback(() => {
    const prevSpread = Math.max(Math.ceil(targetProgressRef.current) - 1, 0);
    goToSpread(prevSpread);
  }, [goToSpread]);

  // Viewport scroll pinning & scroll-driven page flipping with smooth damping
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
        targetProgressRef.current = mappedProgress;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [totalSpreads]);

  // Keyboard navigation when section is hovered
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isHovered) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
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
      className="relative w-full bg-white"
      style={{
        height: "550vh",
        backgroundColor: "#FFFFFF",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* STICKY BOOK VIEWPORT (PURE SOLID WHITE, NO GRADIENTS OR DOT PATTERNS) */}
      <div
        className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden select-none px-4 sm:px-6 md:px-10 z-10 font-sans bg-white"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* SECTION HEADER */}
        <div className="relative z-10 w-full max-w-[1020px] mb-3 sm:mb-4 px-1">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#41B349]/12 border border-[#41B349]/25 text-[#1B4E2C] font-extrabold text-[11px] sm:text-xs uppercase tracking-widest mb-1.5 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
              <span>{badge}</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-black tracking-tight leading-tight text-[#0D0F12]"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              {title} <span className="text-[#41B349]">{titleHighlight}</span>
            </h2>
          </div>
        </div>

        {/* 3D BOOK WRAPPER WITH REALISTIC PAPER STACK SHADOW */}
        <div
          className="relative z-10 w-full max-w-[1020px] h-[360px] sm:h-[395px] md:h-[430px] lg:h-[455px] max-h-[60vh]"
          style={{
            perspective: "2600px",
          }}
        >
          {/* SOLID #41B349 BOTTOM BAR - PURE SOLID COLOR, NO SHADOW, NO BLUR, NO GRADIENT */}
          <div
            className="absolute left-2 right-2 -bottom-2 h-4 rounded-b-2xl lg:rounded-b-3xl pointer-events-none z-0"
            style={{
              backgroundColor: "#41B349",
            }}
          />

          {/* ========================================================= */}
          {/* DESKTOP / TABLET DUAL-PAGE BOOK (md: and above)           */}
          {/* Left Page = Content/Text | Right Page = Image/Visual     */}
          {/* ========================================================= */}
          <div
            className="hidden md:flex relative z-10 w-full h-full rounded-2xl lg:rounded-3xl bg-white overflow-hidden border border-black/[0.08]"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* 1. PERMANENT LEFT BASE: Spread 0 Left (HTML5 Content / Text) */}
            <div
              className="w-1/2 h-full relative z-0 border-r border-black/[0.05] bg-white"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <TechContentPage
                tech={techList[0]}
                isLeft={true}
                pageNumber={1}
                openQuote={openQuote}
              />
            </div>

            {/* 2. PERMANENT RIGHT BASE: Spread (totalSpreads - 1) Right (Last Visual / CTA) */}
            <div
              className="w-1/2 h-full relative z-0 bg-white"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <TechVisualPage
                tech={techList[totalSpreads - 1]}
                isLeft={false}
                pageNumber={totalSpreads * 2}
                openQuote={openQuote}
              />
            </div>

            {/* 3. PHYSICAL 3D TURNING LEAVES STACK (Leaves 0 to totalSpreads - 2) */}
            {leaves.map(({ leafIndex, frontTech, backTech }) => {
              const themeIndex = leafIndex % WEB_PAGE_THEMES.length;
              const nextThemeIndex = (leafIndex + 1) % WEB_PAGE_THEMES.length;
              const frontTheme = WEB_PAGE_THEMES[themeIndex];
              const backTheme = WEB_PAGE_THEMES[nextThemeIndex];

              const leafProgress = Math.min(
                Math.max(continuousProgress - leafIndex, 0),
                1
              );
              const angle = -leafProgress * 180;

              const isTurnedPastHalf = leafProgress > 0.5;
              const zIndex = isTurnedPastHalf
                ? 10 + leafIndex
                : 35 - leafIndex;

              // Gentle aerodynamic paper curl during rotation
              const curl = Math.sin(leafProgress * Math.PI) * 1.5;

              // Dynamic paper shading overlay for realistic light bounce
              const shadingOpacity = Math.sin(leafProgress * Math.PI) * 0.14;

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
                  {/* FRONT FACE: Right Page of Spread leafIndex (Image of frontTech) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-r-2xl lg:rounded-r-3xl overflow-hidden border-r border-black/[0.05] bg-white"
                    style={{
                      backgroundColor: "#FFFFFF",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(0deg)",
                    }}
                  >
                    <TechVisualPage
                      tech={frontTech}
                      isLeft={false}
                      pageNumber={(leafIndex + 1) * 2}
                      openQuote={openQuote}
                    />
                    {/* Turning ambient occlusion shadow on front */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-75"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.04) 40%, transparent 100%)",
                        opacity: shadingOpacity,
                      }}
                    />
                  </div>

                  {/* BACK FACE: Left Page of Spread leafIndex + 1 (Text of backTech) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-l-2xl lg:rounded-l-3xl overflow-hidden border-l border-black/[0.05] bg-white"
                    style={{
                      backgroundColor: "#FFFFFF",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <TechContentPage
                      tech={backTech}
                      isLeft={true}
                      pageNumber={(leafIndex + 1) * 2 + 1}
                      openQuote={openQuote}
                    />
                    {/* Turning ambient occlusion shadow on back */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-75"
                      style={{
                        background:
                          "linear-gradient(to left, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.04) 40%, transparent 100%)",
                        opacity: shadingOpacity,
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {/* DYNAMIC SHADOW CAST UNDERNEATH CURRENT TURNING LEAF */}
            {(() => {
              const activeLeaf = Math.floor(continuousProgress);
              const fraction = continuousProgress - activeLeaf;
              const castOpacity = Math.sin(fraction * Math.PI) * 0.18;
              if (castOpacity <= 0.005) return null;

              return (
                <div
                  className="absolute top-0 right-0 w-1/2 h-full pointer-events-none z-5"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.03) 40%, transparent 80%)",
                    opacity: castOpacity,
                  }}
                />
              );
            })()}

            {/* ========================================================= */}
            {/* CENTRAL 3D SKEUOMORPHIC WIRE SPIRAL BINDING               */}
            {/* ========================================================= */}
            <div
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 sm:w-7 z-40 pointer-events-none flex flex-col justify-evenly items-center py-2"
              style={{
                transform: "translateZ(2px)",
              }}
            >
              {/* Central vertical spine binding seam */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 shadow-[0_0_2px_rgba(0,0,0,0.12)]" />

              {/* 11 Evenly Spaced Metallic Chrome Spring Rings & Punched Holes */}
              {Array.from({ length: 11 }).map((_, rIdx) => (
                <div key={rIdx} className="relative flex items-center justify-center w-full h-3">
                  <div className="absolute left-0.5 sm:left-1 w-[4px] h-[7.5px] rounded-[1.5px] bg-[#dbe1e8] shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.3)]" />
                  <div className="absolute right-0.5 sm:right-1 w-[4px] h-[7.5px] rounded-[1.5px] bg-[#dbe1e8] shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.3)]" />
                  <div
                    className="relative z-10 w-[20px] sm:w-[22px] h-[4.5px] sm:h-[5px] rounded-full transform -rotate-[2.5deg]"
                    style={{
                      background:
                        "linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 25%, #94A3B8 55%, #475569 85%, #1E293B 100%)",
                      boxShadow:
                        "0 2px 4px rgba(0, 0, 0, 0.16), inset 0 1px 1px rgba(255, 255, 255, 0.95)",
                      border: "0.5px solid rgba(148, 163, 184, 0.35)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* MOBILE SINGLE-PAGE BOOK (< md:)                           */}
          {/* Switchable between Content and Image                      */}
          {/* ========================================================= */}
          {(() => {
            const currentTech = techList[activeSpread] || techList[0];
            const mobileTheme = WEB_PAGE_THEMES[activeSpread % WEB_PAGE_THEMES.length];
            return (
              <div
                className="flex md:hidden relative z-10 w-full h-full rounded-2xl overflow-hidden border border-black/[0.08] bg-white"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                {/* Mobile View Toggle */}
                <div className="absolute top-2.5 right-12 z-20 inline-flex items-center p-0.5 rounded-full bg-black/[0.04] border border-black/[0.06]">
                  <button
                    onClick={() => setMobileView("text")}
                    className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      mobileView === "text"
                        ? "bg-white text-[#1B4E2C] shadow-2xs"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Content
                  </button>
                  <button
                    onClick={() => setMobileView("image")}
                    className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      mobileView === "image"
                        ? "bg-white text-[#1B4E2C] shadow-2xs"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Image
                  </button>
                </div>

                <div className="w-full h-full">
                  {mobileView === "text" ? (
                    <TechContentPage
                      tech={currentTech}
                      isLeft={false}
                      pageNumber={activeSpread * 2 + 1}
                      openQuote={openQuote}
                    />
                  ) : (
                    <TechVisualPage
                      tech={currentTech}
                      isLeft={false}
                      pageNumber={activeSpread * 2 + 2}
                      openQuote={openQuote}
                    />
                  )}
                </div>
              </div>
            );
          })()}
        </div>

        {/* BOTTOM PROGRESS INDICATORS */}
        <div className="relative z-10 w-full max-w-[1020px] mt-2.5 sm:mt-3 flex items-center justify-between gap-2 text-xs px-1">
          <div className="w-32 hidden sm:block text-[11px] text-gray-400 font-medium">
            Tech Solutionor Stack
          </div>

          {/* Interactive spread indicator dots */}
          <div className="flex items-center gap-1.5 sm:gap-2 mx-auto sm:mx-0">
            {Array.from({ length: totalSpreads }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSpread(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSpread === idx
                    ? "w-7 bg-[#1B4E2C]"
                    : "w-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
                title={`Jump to spread ${idx + 1}`}
              />
            ))}
          </div>

          <div
            className="text-[11px] sm:text-xs font-bold text-right w-32 tracking-wider text-[#0D0F12]"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            PAGE {String(activeSpread * 2 + 1).padStart(2, "0")} - {String(activeSpread * 2 + 2).padStart(2, "0")} / {String(totalSpreads * 2).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SUB-COMPONENT 1: TECH CONTENT PAGE (Rendered on LEFT PAGE of each spread)
// Contains Category, Title, Description, Capability Tags, and Metadata
// =========================================================================
const TechContentPage = ({ tech, isLeft, pageNumber, openQuote }) => {
  if (!tech) return null;

  // Handle CTA page
  if (tech.type === "cta") {
    return (
      <div
        className={`relative w-full h-full p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col justify-between text-[#0D0F12] overflow-hidden bg-white ${
          isLeft ? "pr-5 sm:pr-6 md:pr-7" : "pl-5 sm:pl-6 md:pl-7"
        }`}
        style={{ backgroundColor: "#FFFFFF" }}
      >
        {isLeft ? (
          <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-8 bg-gradient-to-r from-transparent to-black/[0.045] pointer-events-none z-10" />
        ) : (
          <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-8 bg-gradient-to-l from-transparent to-black/[0.045] pointer-events-none z-10" />
        )}

        <div className="flex items-center justify-between">
          <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-widest text-[#41B349]">
            {tech.subtitle}
          </span>
          <span
            className="text-[11px] sm:text-xs font-black text-[#1B4E2C] tracking-widest"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {String(pageNumber).padStart(2, "0")}
          </span>
        </div>

        <div className="my-auto flex flex-col items-start max-w-[380px]">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#41B349]/12 border border-[#41B349]/25 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] animate-pulse" />
            <span className="text-[10px] font-extrabold text-[#41B349] uppercase tracking-widest">
              {tech.badge || "NEXT CHAPTER"}
            </span>
          </div>

          <h2
            className="text-xl sm:text-2xl md:text-[26px] font-black text-[#0D0F12] tracking-tight leading-tight mb-2"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {tech.title}
          </h2>

          <p className="text-xs sm:text-[12.5px] text-[#334155] font-normal leading-relaxed mb-3 sm:mb-4">
            {tech.desc}
          </p>

          <button
            onClick={openQuote}
            className="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#1B4E2C] hover:bg-[#153e23] text-white text-xs sm:text-[13px] font-bold tracking-wide transition-all duration-300 cursor-pointer active:scale-95 shadow-sm"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            <span>Start yours</span>
            <span className="text-sm group-hover:translate-x-1 group-hover:translate-y-0.5 transition-transform duration-300">
              ↘
            </span>
          </button>
        </div>

        <div className="flex items-center justify-between text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 border-t border-black/[0.06] pt-1.5">
          <span>{tech.footerLeft || "TECH SOLUTIONOR • WEB ECOSYSTEM"}</span>
          <span
            className="text-[#1B4E2C] font-black"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            PAGE {String(pageNumber).padStart(2, "0")}
          </span>
        </div>
      </div>
    );
  }

  const IconComponent = tech.icon;

  return (
    <div
      className={`relative w-full h-full p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col justify-between text-[#0D0F12] overflow-hidden bg-white ${
        isLeft ? "pr-5 sm:pr-6 md:pr-7" : "pl-5 sm:pl-6 md:pl-7"
      }`}
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Spine Crease Shadow */}
      {isLeft ? (
        <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-8 bg-gradient-to-r from-transparent to-black/[0.045] pointer-events-none z-10" />
      ) : (
        <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-8 bg-gradient-to-l from-transparent to-black/[0.045] pointer-events-none z-10" />
      )}

      {/* TOP HEADER ROW */}
      <div className="relative z-10 flex items-center justify-between">
        <span
          className="text-[11px] sm:text-xs font-black text-[#1B4E2C] tracking-wider"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          {String(pageNumber).padStart(2, "0")}
        </span>
        <span className="text-[9.5px] sm:text-[10px] font-bold tracking-wider text-[#1B4E2C] uppercase bg-[#41B349]/12 px-2.5 py-0.5 rounded-full border border-[#41B349]/25">
          {tech.badge}
        </span>
      </div>

      {/* CENTER CONTENT: STRUCTURED TECHNOLOGY SPECS */}
      <div className="relative z-10 my-auto flex flex-col items-start max-w-[420px]">
        {/* Category Subtitle */}
        <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#41B349] mb-1">
          {tech.subtitle}
        </div>

        {/* Title & Icon */}
        <div className="flex items-center gap-2.5 mb-2 sm:mb-2.5">
          {IconComponent && (
            <div
              className="p-1.5 rounded-lg bg-white/95 border border-black/[0.06] shadow-2xs flex items-center justify-center shrink-0"
              style={{ color: tech.iconColor }}
            >
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5" />
            </div>
          )}
          <h3
            className="text-xl sm:text-2xl md:text-[26px] font-black text-[#0D0F12] tracking-tight uppercase"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {tech.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[11.5px] sm:text-[12px] md:text-[12.5px] text-[#334155] font-normal leading-relaxed mb-3 sm:mb-3.5">
          {tech.desc}
        </p>

        {/* Capability Tags */}
        {tech.tags && (
          <div className="flex flex-wrap gap-1.5">
            {tech.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#41B349]/12 border border-[#41B349]/25 text-[#1B4E2C] text-[10px] font-bold tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM FOOTER */}
      <div className="relative z-10 flex items-center justify-between text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 border-t border-black/[0.06] pt-1.5">
        <span>{tech.footerLeft || "TECH SOLUTIONOR • WEB ECOSYSTEM"}</span>
        <span
          className="text-[#1B4E2C] font-black"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          PAGE {String(pageNumber).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

// Map of technology names to their corresponding images in /services/
const TECH_IMAGE_MAP = {
  HTML5: "/services/html5-superhero.png?v=clean2",
  CSS3: "/services/css3book.jpg?v=clean2",
  JAVASCRIPT: "/services/javascriptbook.jpg?v=clean2",
  BOOTSTRAP: "/services/bootstrapbook.png?v=clean2",
  "NODE.JS": "/services/nodejsbook.jpg?v=clean2",
  PHP: "/services/phpbook.png?v=clean2",
  JAVA: "/services/javabook.png?v=clean2",
  LARAVEL: "/services/laravelbook.svg?v=clean2",
  SHOPIFY: "/services/shopifybook.jpg?v=clean2",
  PYTHON: "/services/pythanbook.png?v=clean2",
  ".NET": "/services/dotnetbook.jpg?v=clean2",
  WORDPRESS: "/services/wordpressbook.png?v=clean2",
  "YOUR PROJECT?": "/services/letsgobook.jpg?v=clean2",
  CTA: "/services/letsgobook.jpg?v=clean2",
};

// =========================================================================
// SUB-COMPONENT 2: TECH VISUAL PAGE (Rendered on RIGHT PAGE of each spread)
// Dedicated full-page visual showcase using the exact corresponding images
// from /services/ folder, clean, crisp, with NO extra gradient effects.
// =========================================================================
const TechVisualPage = ({ tech, isLeft, pageNumber, openQuote }) => {
  if (!tech) return null;

  const normalizedTitle = (tech.title || "").toUpperCase().trim();
  const imageSrc =
    TECH_IMAGE_MAP[normalizedTitle] ||
    (tech.type === "cta" ? "/services/letsgobook.jpg?v=clean2" : null);
  const IconComponent = tech.icon;

  return (
    <div
      className={`relative w-full h-full p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col justify-between text-[#0D0F12] overflow-hidden bg-white ${
        isLeft ? "pr-5 sm:pr-6 md:pr-7" : "pl-5 sm:pl-6 md:pl-7"
      }`}
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Spine Crease Shadow */}
      {isLeft ? (
        <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-8 bg-gradient-to-r from-transparent to-black/[0.045] pointer-events-none z-10" />
      ) : (
        <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-8 bg-gradient-to-l from-transparent to-black/[0.045] pointer-events-none z-10" />
      )}

      {/* TOP HEADER ROW */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[9.5px] sm:text-[10px] font-bold tracking-wider text-[#1B4E2C] uppercase bg-[#41B349]/12 px-2.5 py-0.5 rounded-full border border-[#41B349]/25">
          {tech.badge || "CORE WEB FOUNDATION"}
        </span>
        <span
          className="text-[11px] sm:text-xs font-black text-[#1B4E2C] tracking-wider"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          {String(pageNumber).padStart(2, "0")}
        </span>
      </div>

      {/* CENTER VISUAL HERO (CLEAN & CENTERED WITH SOLID WHITE BACKGROUND) */}
      <div className="relative z-10 my-auto w-full flex-1 flex flex-col items-center justify-center py-2 sm:py-3 bg-white">
        {imageSrc ? (
          <div
            className="relative flex items-center justify-center w-full h-[185px] sm:h-[215px] md:h-[245px] lg:h-[270px] bg-white"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <Image
              src={imageSrc}
              alt={`${tech.title} Technology Visual`}
              width={360}
              height={320}
              priority={normalizedTitle === "HTML5"}
              unoptimized={true}
              className="w-auto h-full max-h-[180px] sm:max-h-[210px] md:max-h-[240px] lg:max-h-[265px] object-contain select-none transition-transform duration-500 hover:scale-105"
            />
          </div>
        ) : IconComponent ? (
          <div className="relative flex items-center justify-center w-full h-[185px] sm:h-[215px] md:h-[245px] lg:h-[270px]">
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex items-center justify-center transition-transform duration-500 hover:scale-105"
              style={{ color: tech.iconColor || "#1B4E2C" }}
            >
              <IconComponent className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" />
            </div>
          </div>
        ) : (
          <div className="relative flex items-center justify-center w-full h-[185px] sm:h-[215px] md:h-[245px] lg:h-[270px]">
            <div className="w-24 h-24 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex items-center justify-center text-4xl">
              🚀
            </div>
          </div>
        )}

        {/* Clean, Simple Caption Label */}
        <div className="mt-2 text-center">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.03] border border-black/[0.06] text-[#0D0F12] text-[11px] sm:text-xs font-black tracking-widest uppercase"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            <span>{tech.title}</span>
            <span className="w-1 h-1 rounded-full bg-[#41B349]" />
            <span className="text-[#41B349] font-bold text-[10px] tracking-wider">
              {tech.subtitle}
            </span>
          </span>
        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="relative z-10 flex items-center justify-between text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 border-t border-black/[0.06] pt-1.5">
        <span>{tech.footerLeft || "TECH SOLUTIONOR • WEB ECOSYSTEM"}</span>
        <span
          className="text-[#1B4E2C] font-black"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          PAGE {String(pageNumber).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default WebDevelopmentTechnologiesBook;

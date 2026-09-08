"use client";

import React, { useState, useEffect, useRef } from "react";

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

// Polynomial smoothstep interpolation
function smoothStep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export default function WebWhyChoose() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

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
  // ANIMATION PHASE MAPPINGS
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
              <span>WHY CHOOSE US</span>
            </div>

            {/* Heading with Outfit & Plus Jakarta Sans typography */}
            <h2
              className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-black text-[#0D0F12] tracking-tight leading-tight"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              Why Choose{" "}
              <span className="text-[#1B4E2C] block sm:inline mt-0.5 sm:mt-0">
                Tech Solutionor
              </span>
            </h2>

            {/* Clean Subtitle matching Home Page Hierarchy */}
            <p
              className="text-[#475569] text-xs sm:text-sm max-w-lg mx-auto mt-1 font-normal leading-relaxed hidden sm:block"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Engineered for high performance, enterprise security, and measurable digital growth.
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
                <Card item={webWhyChooseData[0]} />
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
                <Card item={webWhyChooseData[1]} />
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
                <Card item={webWhyChooseData[2]} />
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
                <Card item={webWhyChooseData[3]} />
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
                <Card item={webWhyChooseData[4]} />
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
                <Card item={webWhyChooseData[5]} />
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
// Styled with Home Page "About TechSolutionor" typography and balanced vertical sizing
function Card({ item }) {
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
            TECH SOLUTIONOR
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

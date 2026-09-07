"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useQuote } from "@/app/_context/QuoteContext";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaBootstrap,
  FaNodeJs,
  FaPhp,
  FaJava,
  FaLaravel,
  FaShopify,
  FaPython,
  FaWordpress,
} from "react-icons/fa";
import { SiDotnet } from "react-icons/si";

// 14 Pages total (Cover + 12 Techs + Next Chapter CTA)
const pagesData = [
  // Page 00: Book Cover / Intro (Spread 0 Left)
  {
    type: "cover",
    pageNumber: "00",
    title: "WE ARE BEST",
    subtitle: "TECHNOLOGIES WE USE",
    badge: "ENGINEERING STACK",
    watermark: "TECH SOLUTIONOR",
    desc: "Our web development ecosystem is engineered with industry-leading technologies. We build high-throughput, secure, and conversion-focused digital systems for enterprises across Dubai and globally.",
    tags: ["Full Stack Architecture", "Enterprise Security", "Cloud Native"],
    footerLeft: "TECH SOLUTIONOR • WEB ARCHITECTURE",
    footerRight: "INDEX // 2026",
  },
  // Page 01: HTML (Spread 0 Right)
  {
    type: "tech",
    pageNumber: "01",
    title: "HTML5",
    subtitle: "SEMANTIC STRUCTURE",
    badge: "CORE WEB FOUNDATION",
    watermark: "STRUCTURE",
    desc: "The standard markup language used to create and structure web pages, defining the content and layout of a website. It forms the backbone of any web page and integrates with CSS and JavaScript.",
    icon: FaHtml5,
    iconColor: "#E34F26",
    tags: ["Semantic HTML", "W3C Validated", "SEO Optimized", "Accessibility"],
    footerLeft: "TECH SOLUTIONOR • WEB ECOSYSTEM",
    footerRight: "PAGE 01 // 14",
  },
  // Page 02: CSS (Spread 1 Left)
  {
    type: "tech",
    pageNumber: "02",
    title: "CSS3",
    subtitle: "MODERN STYLING",
    badge: "RESPONSIVE PRESENTATION",
    watermark: "STYLING",
    desc: "CSS (Cascading Style Sheets) is a language used to style HTML documents, controlling layout, colors, fonts, and the overall visual appearance of web pages, ensuring responsive design.",
    icon: FaCss3Alt,
    iconColor: "#1572B6",
    tags: ["Responsive Design", "Flex & CSS Grid", "Hardware Accelerated"],
    footerLeft: "TECH SOLUTIONOR • WEB ECOSYSTEM",
    footerRight: "PAGE 02 // 14",
  },
  // Page 03: JavaScript (Spread 1 Right)
  {
    type: "tech",
    pageNumber: "03",
    title: "JAVASCRIPT",
    subtitle: "DYNAMIC EXECUTION",
    badge: "CLIENT & RUNTIME LOGIC",
    watermark: "DYNAMIC",
    desc: "A versatile scripting language used to create interactive and dynamic content on web pages. It enables client-side scripting and works alongside HTML and CSS to enhance user experiences.",
    icon: FaJs,
    iconColor: "#D97706",
    tags: ["ESNext Syntax", "Async / Await", "Interactive DOM", "High Performance"],
    footerLeft: "TECH SOLUTIONOR • WEB ECOSYSTEM",
    footerRight: "PAGE 03 // 14",
  },
  // Page 04: Bootstrap (Spread 2 Left)
  {
    type: "tech",
    pageNumber: "04",
    title: "BOOTSTRAP",
    subtitle: "UI FRAMEWORK",
    badge: "MOBILE-FIRST LAYOUT",
    watermark: "FRAMEWORK",
    desc: "Bootstrap is a popular open-source framework for developing responsive and mobile-first websites. It includes pre-designed CSS and JavaScript components, such as grids.",
    icon: FaBootstrap,
    iconColor: "#7952B3",
    tags: ["Grid System", "Pre-built Components", "Cross-Browser Unified"],
    footerLeft: "TECH SOLUTIONOR • WEB ECOSYSTEM",
    footerRight: "PAGE 04 // 14",
  },
  // Page 05: Node.js (Spread 2 Right)
  {
    type: "tech",
    pageNumber: "05",
    title: "NODE.JS",
    subtitle: "EVENT-DRIVEN BACKEND",
    badge: "SERVER RUNTIME ENGINE",
    watermark: "RUNTIME",
    desc: "Node.js is a JavaScript runtime built on Chrome’s V8 engine, enabling server-side JavaScript execution. It’s designed for building scalable network applications with event-driven.",
    icon: FaNodeJs,
    iconColor: "#16A34A",
    tags: ["V8 Engine", "Non-Blocking I/O", "Microservices", "REST & WebSocket"],
    footerLeft: "TECH SOLUTIONOR • WEB ECOSYSTEM",
    footerRight: "PAGE 05 // 14",
  },
  // Page 06: PHP (Spread 3 Left)
  {
    type: "tech",
    pageNumber: "06",
    title: "PHP",
    subtitle: "SERVER-SIDE SCRIPTING",
    badge: "DYNAMIC WEB ENGINE",
    watermark: "BACKEND",
    desc: "A server-side scripting language designed for web development that can be embedded into HTML. It is widely used for building dynamic, interactive websites and managing server-side processes.",
    icon: FaPhp,
    iconColor: "#4F46E5",
    tags: ["Server Rendering", "Database Integration", "Broad Compatibility"],
    footerLeft: "TECH SOLUTIONOR • WEB ECOSYSTEM",
    footerRight: "PAGE 06 // 14",
  },
  // Page 07: Java (Spread 3 Right)
  {
    type: "tech",
    pageNumber: "07",
    title: "JAVA",
    subtitle: "ENTERPRISE SYSTEMS",
    badge: "OBJECT-ORIENTED STACK",
    watermark: "ENTERPRISE",
    desc: "Java is a versatile, object-oriented language used for building platform-independent applications. It’s known for its portability and performance in enterprise environments, mobile apps, and web services.",
    icon: FaJava,
    iconColor: "#EA580C",
    tags: ["JVM Ecosystem", "High Concurrency", "Robust Security"],
    footerLeft: "TECH SOLUTIONOR • WEB ECOSYSTEM",
    footerRight: "PAGE 07 // 14",
  },
  // Page 08: Laravel (Spread 4 Left)
  {
    type: "tech",
    pageNumber: "08",
    title: "LARAVEL",
    subtitle: "ELEGANT PHP MVC",
    badge: "RAPID WEB FRAMEWORK",
    watermark: "LARAVEL",
    desc: "Laravel is a PHP framework for web development, offering elegant syntax and built-in tools for routing, authentication, and database management, streamlining complex tasks and enhancing productivity.",
    icon: FaLaravel,
    iconColor: "#EF4444",
    tags: ["Eloquent ORM", "Blade Templating", "Clean Architecture"],
    footerLeft: "TECH SOLUTIONOR • WEB ECOSYSTEM",
    footerRight: "PAGE 08 // 14",
  },
  // Page 09: Shopify (Spread 4 Right)
  {
    type: "tech",
    pageNumber: "09",
    title: "SHOPIFY",
    subtitle: "ECOMMERCE PLATFORM",
    badge: "GLOBAL COMMERCE SYSTEM",
    watermark: "COMMERCE",
    desc: "A robust e-commerce platform that enables users to create and manage online stores. It provides tools for product management, payment processing, and customizable store designs.",
    icon: FaShopify,
    iconColor: "#65A30D",
    tags: ["Liquid Templating", "Storefront API", "High-Converting Checkout"],
    footerLeft: "TECH SOLUTIONOR • WEB ECOSYSTEM",
    footerRight: "PAGE 09 // 14",
  },
  // Page 10: Python (Spread 5 Left)
  {
    type: "tech",
    pageNumber: "10",
    title: "PYTHON",
    subtitle: "SCALABLE ARCHITECTURE",
    badge: "AI & ROBUST BACKEND",
    watermark: "PYTHON",
    desc: "Python is a high-level, interpreted language known for its readability and simplicity. It supports multiple paradigms and is widely used in web development, data analysis, and artificial intelligence.",
    icon: FaPython,
    iconColor: "#0284C7",
    tags: ["Django & FastAPI", "AI & ML Ready", "Clean Codebase"],
    footerLeft: "TECH SOLUTIONOR • WEB ECOSYSTEM",
    footerRight: "PAGE 10 // 14",
  },
  // Page 11: .NET (Spread 5 Right)
  {
    type: "tech",
    pageNumber: "11",
    title: ".NET",
    subtitle: "MICROSOFT ENTERPRISE",
    badge: "HIGH-PERFORMANCE FRAMEWORK",
    watermark: "DOTNET",
    desc: ".NET is a Microsoft framework for building and running applications on Windows. It supports multiple languages and provides a large library for web, desktop, and mobile applications.",
    icon: SiDotnet,
    iconColor: "#6366F1",
    tags: ["C# / ASP.NET Core", "Cloud Infrastructure", "Enterprise Scale"],
    footerLeft: "TECH SOLUTIONOR • WEB ECOSYSTEM",
    footerRight: "PAGE 11 // 14",
  },
  // Page 12: WordPress (Spread 6 Left)
  {
    type: "tech",
    pageNumber: "12",
    title: "WORDPRESS",
    subtitle: "CONTENT MANAGEMENT",
    badge: "CUSTOM CMS PLATFORM",
    watermark: "CONTENT",
    desc: "A popular content management system (CMS) that allows users to create and manage websites with ease. It offers a wide range of themes and plugins for customization and functionality.",
    icon: FaWordpress,
    iconColor: "#0284C7",
    tags: ["Headless CMS", "Gutenberg Blocks", "Custom Rest APIs"],
    footerLeft: "TECH SOLUTIONOR • WEB ECOSYSTEM",
    footerRight: "PAGE 12 // 14",
  },
  // Page 13: Next Chapter / Call to Action (Spread 6 Right - matching screenshot 3)
  {
    type: "cta",
    pageNumber: "13",
    title: "Your project?",
    subtitle: "// next chapter",
    badge: "LET'S BUILD TOGETHER",
    watermark: "FUTURE",
    desc: "Ready to turn your vision into an exceptional, high-converting digital platform? Partner with Tech Solutionor’s premier web engineering team to craft your next digital milestone.",
    tags: ["Fast Turnaround", "Enterprise Architecture", "Measurable ROI"],
    footerLeft: "TECH SOLUTIONOR • DIGITAL ENGINEERING",
    footerRight: "NEXT CHAPTER",
  },
];

// Definition of the 6 Turning Leaves between Left Base (Page 00) and Right Base (Page 13)
const leaves = [
  { leafIndex: 0, front: pagesData[1], back: pagesData[2] },  // Front: HTML5, Back: CSS3
  { leafIndex: 1, front: pagesData[3], back: pagesData[4] },  // Front: JS, Back: Bootstrap
  { leafIndex: 2, front: pagesData[5], back: pagesData[6] },  // Front: Node.js, Back: PHP
  { leafIndex: 3, front: pagesData[7], back: pagesData[8] },  // Front: Java, Back: Laravel
  { leafIndex: 4, front: pagesData[9], back: pagesData[10] }, // Front: Shopify, Back: Python
  { leafIndex: 5, front: pagesData[11], back: pagesData[12] },// Front: .NET, Back: WordPress
];

const totalSpreads = 7; // Spreads 0 through 6
const totalLeaves = 6;  // 6 physical sheets

const TechnoligesWeUse = () => {
  const { openQuote } = useQuote();
  const trackRef = useRef(null);

  // Continuous progress value from 0.0 to 6.0
  const [continuousProgress, setContinuousProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameRef = useRef(null);

  // Active spread integer index (0 to 6)
  const [activeSpread, setActiveSpread] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // High-precision RAF damping interpolation loop
  // Smoothly glides leaves without any snapping, popping, or lag
  useEffect(() => {
    const updateProgress = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0008) {
        currentProgressRef.current = current + diff * 0.11;
        setContinuousProgress(currentProgressRef.current);
      } else if (current !== target) {
        currentProgressRef.current = target;
        setContinuousProgress(target);
      }

      const currentSpread = Math.min(
        Math.max(Math.round(currentProgressRef.current), 0),
        totalSpreads - 1
      );
      setActiveSpread(currentSpread);

      animFrameRef.current = requestAnimationFrame(updateProgress);
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // =========================================================================
  // SCROLL ENGINE:
  // Maps scroll through the 450vh pinned track with Reading Plateaus.
  // The sticky section is anchored at top: 0 throughout all 6 spread flips!
  // =========================================================================
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      let norm = 0;

      if (scrolled <= 0) {
        norm = 0;
      } else if (scrolled >= totalScrollable) {
        norm = 1;
      } else {
        norm = scrolled / totalScrollable;
      }

      // Map normalized 0..1 to continuous 0..6 with smooth reading plateaus
      const rawSpan = norm * totalLeaves;
      const stepIndex = Math.min(Math.floor(rawSpan), totalLeaves - 1);
      const frac = Math.min(Math.max(rawSpan - stepIndex, 0), 1);

      // Reading Plateaus curve:
      // First 18% of step: flat stationary reading state
      // Middle 64% of step: smooth 3D flip with cubic ease-in-out
      // Last 18% of step: flat stationary reading state
      let stepProgress = 0;
      if (frac <= 0.18) {
        stepProgress = 0;
      } else if (frac >= 0.82) {
        stepProgress = 1;
      } else {
        const t = (frac - 0.18) / 0.64;
        stepProgress = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      const calculatedTarget = norm >= 1 ? totalLeaves : stepIndex + stepProgress;
      targetProgressRef.current = calculatedTarget;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Programmatic jump to a spread (synced with scrollbar and smooth animation)
  const goToSpread = useCallback((targetIndex) => {
    const clampedIndex = Math.max(0, Math.min(targetIndex, totalSpreads - 1));
    targetProgressRef.current = clampedIndex;

    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;
      const targetFraction = clampedIndex / totalLeaves;
      const targetScrollY = window.scrollY + rect.top + targetFraction * totalScrollable;

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  }, []);

  const handleNext = () => {
    if (activeSpread < totalSpreads - 1) {
      goToSpread(activeSpread + 1);
    }
  };

  const handlePrev = () => {
    if (activeSpread > 0) {
      goToSpread(activeSpread - 1);
    }
  };

  // Keyboard navigation when hovered
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
  }, [isHovered, activeSpread, handleNext, handlePrev]);

  return (
    <div
      ref={trackRef}
      id="technologies-book-section"
      className="relative w-full"
      style={{
        // 450vh tall scroll track: guarantees the sticky section stays 100% PINNED
        // in the viewport while the user scrolls through all technology pages!
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
        {/* SUBTLE MINIMAL BACKGROUND ELEMENTS (Clean & Minimal on #1B4E2C) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Soft architectural grid pattern */}
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
              <span>WE ARE BEST</span>
            </div>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tight leading-tight" 
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              Technologies <span className="text-[#41B349]">We Use</span>
            </h2>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-3">
            {/* PREV BUTTON (Clean & Minimal, No Shadow) */}
            <button
              onClick={handlePrev}
              disabled={activeSpread === 0}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                activeSpread === 0
                  ? "border-white/10 text-white/30 cursor-not-allowed opacity-30 bg-white/5"
                  : "border-white/30 bg-white text-[#1B4E2C] hover:bg-white/90 active:scale-95"
              }`}
              title="Previous Page (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* NEXT BUTTON (Clean & Minimal, No Shadow) */}
            <button
              onClick={handleNext}
              disabled={activeSpread === totalSpreads - 1}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                activeSpread === totalSpreads - 1
                  ? "border-white/10 text-white/30 cursor-not-allowed opacity-30 bg-white/5"
                  : "border-white/30 bg-white text-[#1B4E2C] hover:bg-white/90 active:scale-95"
              }`}
              title="Next Page (Right Arrow)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D BOOK CONTAINER (White Pages on #1B4E2C, Completely Shadowless) */}
        <div
          className="relative z-10 w-full max-w-[1140px] h-[390px] sm:h-[430px] md:h-[470px] lg:h-[500px] max-h-[64vh]"
          style={{
            perspective: "2600px",
          }}
        >
          {/* ========================================================= */}
          {/* DESKTOP / TABLET DUAL-PAGE BOOK (md: and above) */}
          {/* Clean White Pages (#FFFFFF), Zero Shadows */}
          {/* ========================================================= */}
          <div
            className="hidden md:flex relative w-full h-full rounded-2xl lg:rounded-3xl border border-white/20 bg-white overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* 1. PERMANENT LEFT BASE: Spread 0 Left (Cover: WE ARE BEST) */}
            <div className="w-1/2 h-full relative z-0 border-r border-gray-200 bg-white">
              <PageContent page={pagesData[0]} isLeft={true} />
            </div>

            {/* 2. PERMANENT RIGHT BASE: Spread 6 Right (Page 13: Your Project? CTA) */}
            <div className="w-1/2 h-full relative z-0 bg-white">
              <PageContent page={pagesData[13]} isLeft={false} openQuote={openQuote} />
            </div>

            {/* 3. PHYSICAL 3D TURNING LEAVES STACK (Leaves 0 to 5) - Zero Shadows */}
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
                      background: "linear-gradient(180deg, #ffffff 0%, #cbd5e1 35%, #94a3b8 70%, #475569 100%)",
                      boxShadow: "0 1.5px 3px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.9)",
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
          {/* Clean White Pages (#FFFFFF), Zero Shadows */}
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

        {/* BOTTOM PROGRESS BAR & CHAPTER INDICATORS (Clean Minimal on #1B4E2C) */}
        <div className="relative z-10 w-full max-w-[1140px] mt-2.5 sm:mt-3 flex items-center justify-between gap-2 text-xs text-white/75">
          <div className="w-24 hidden sm:block" />

          {/* Interactive spread dots (Clean, No Shadows) */}
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
              NEXT CHAPTER
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

          {/* Start Yours Button (Solid #1B4E2C, No Shadows) */}
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

export default TechnoligesWeUse;

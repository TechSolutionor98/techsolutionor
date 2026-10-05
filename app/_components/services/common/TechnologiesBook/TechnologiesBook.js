"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useQuote } from "@/app/_context/QuoteContext";
import { useLanguage } from "@/app/_context/LanguageContext";
import { getServiceTechnologies } from "@/app/_data/servicesTechnologiesData";
import { getCmsVal } from "@/lib/api-helper";
import {
  SectionBadge,
  SectionHeading,
  HighlightWord,
  SectionParagraph,
  CardHeading,
  CardParagraph,
  ButtonText,
} from "@/components/Typography";

/**
 * Editorial paper themes (High luminance 98%+ porcelain tones)
 */
export const PAGE_THEMES = [
  {
    themeName: "Porcelain Mint",
    accent: "#1B4E2C",
    watermarkColor: "rgba(27, 78, 44, 0.035)",
  },
  {
    themeName: "Platinum Mist",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.035)",
  },
  {
    themeName: "Oyster Porcelain",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.035)",
  },
  {
    themeName: "Eucalyptus Dew",
    accent: "#1B4E2C",
    watermarkColor: "rgba(27, 78, 44, 0.035)",
  },
  {
    themeName: "Titanium Pearl",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.035)",
  },
  {
    themeName: "Celadon Porcelain",
    accent: "#1B4E2C",
    watermarkColor: "rgba(27, 78, 44, 0.035)",
  },
  {
    themeName: "Chalk Vellum",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.035)",
  },
  {
    themeName: "Slate Pearl",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.035)",
  },
  {
    themeName: "Mint Whisper",
    accent: "#1B4E2C",
    watermarkColor: "rgba(27, 78, 44, 0.035)",
  },
  {
    themeName: "Glacial Cloud",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.035)",
  },
  {
    themeName: "Sandstone Vellum",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.035)",
  },
  {
    themeName: "Alpine Frost",
    accent: "#1B4E2C",
    watermarkColor: "rgba(15, 23, 42, 0.035)",
  },
  {
    themeName: "Emerald Pearl",
    accent: "#1B4E2C",
    watermarkColor: "rgba(27, 78, 44, 0.04)",
  },
];

/**
 * Universal Fallback Image Matcher
 * Maps technology titles across all services to corresponding clean images
 */
export function resolveTechDefaultImage(title = "") {
  const t = (title || "").toUpperCase().trim();
  if (t.includes("PROJECT") || t.includes("?") || t === "CTA" || t.includes("SCALE YOUR") || t.includes("HIRE YOUR") || t.includes("RANK ON")) {
    return "/services/letsgobook.jpg";
  }
  if (t.includes("HTML")) return "/services/html5-superhero.png";
  if (t.includes("CSS")) return "/services/css3book.jpg";
  if (t.includes("JAVASCRIPT") || t === "JS") return "/services/javascriptbook.jpg";
  if (t.includes("BOOTSTRAP")) return "/services/bootstrapbook.png";
  if (t.includes("NODE")) return "/services/nodejsbook.jpg";
  if (t.includes("PHP")) return "/services/phpbook.png";
  if (t.includes("LARAVEL")) return "/services/laravelbook.svg";
  if (t.includes("SHOPIFY")) return "/services/shopifybook.jpg";
  if (t.includes("PYTHON") || t.includes("DJANGO")) return "/services/pythanbook.png";
  if (t.includes(".NET") || t.includes("C#")) return "/services/dotnetbook.jpg";
  if (t.includes("WORDPRESS") || t.includes("WOOCOMMERCE")) return "/services/wordpressbook.png";
  if (t.includes("REACT")) return "/services/reactjs.png";
  if (t.includes("FLUTTER") || t.includes("DART")) return "/services/flutter.png";
  if (t.includes("SWIFT")) return "/services/swift.png";
  if (t.includes("KOTLIN") || t.includes("ANDROID")) return "/services/appdev.png";
  if (t.includes("JAVA")) return "/services/javabook.png";
  if (t.includes("FIGMA")) return "/services/figma.png";
  if (t.includes("PHOTOSHOP") || t.includes("ILLUSTRATOR") || t.includes("AFTER EFFECTS") || t.includes("GRAPHIC") || t.includes("CANVA")) {
    return "/services/graphics.png";
  }
  if (t.includes("XD") || t.includes("WIREFRAMING") || t.includes("UI/UX")) return "/services/uxdesign.png";
  if (t.includes("INDESIGN") || t.includes("DESIGN SYSTEM") || t.includes("TYPOGRAPHY")) return "/services/uidesign.png";
  if (t.includes("BLENDER") || t.includes("3D")) return "/services/desktop.png";
  if (t.includes("BRAND")) return "/services/Branding&Identity.png";
  if (t.includes("MAGENTO")) return "/services/magento.png";
  if (t.includes("PAYMENT") || t.includes("STRIPE") || t.includes("PAY") || t.includes("COMMERCE") || t.includes("STORE")) {
    return "/services/ecommerce.png";
  }
  if (t.includes("GOOGLE AD") || t.includes("PMAX") || t.includes("PERFORMANCE MAX") || t.includes("SEARCH AD") || t.includes("SHOPPING")) {
    return "/services/googleads.png";
  }
  if (t.includes("META") || t.includes("FACEBOOK")) return "/services/meta.png";
  if (t.includes("INSTAGRAM") || t.includes("REEL")) return "/services/instaicon.png";
  if (t.includes("LINKEDIN")) return "/services/linkedinicon.png";
  if (t.includes("TWITTER") || t.includes("X ")) return "/services/twittericon.png";
  if (t.includes("THREAD") || t.includes("HASHTAG")) return "/services/threadicon.png";
  if (t.includes("PPC") || t.includes("AMAZON") || t.includes("ACOS") || t.includes("ROAS") || t.includes("BID")) {
    return "/services/ppcads.png";
  }
  if (t.includes("SEO") || t.includes("SEMRUSH") || t.includes("AHREFS") || t.includes("CRAWL") || t.includes("RANK") || t.includes("BACKLINK")) {
    return "/services/seo.png";
  }
  if (t.includes("CONTENT") || t.includes("WRITING") || t.includes("GRAMMARLY") || t.includes("ARTICLE") || t.includes("HEMINGWAY") || t.includes("EDITORIAL")) {
    return "/services/content.png";
  }
  if (t.includes("CALL") || t.includes("ZENDESK") || t.includes("TWILIO") || t.includes("SUPPORT") || t.includes("VOICE") || t.includes("WHATSAPP")) {
    return "/services/call.png";
  }
  if (t.includes("HIRE") || t.includes("DEVELOPER") || t.includes("ENGINEER") || t.includes("SPECIALIST") || t.includes("TEAM") || t.includes("MANAGER")) {
    return "/services/hire.png";
  }
  if (t.includes("DATABASE") || t.includes("SQL") || t.includes("MONGO") || t.includes("POSTGRES") || t.includes("API") || t.includes("GRAPHQL")) {
    return "/services/API.png";
  }
  if (t.includes("REALTIME") || t.includes("REDIS") || t.includes("FIREBASE") || t.includes("SYNC")) {
    return "/services/RealTime.png";
  }
  if (t.includes("SECURITY") || t.includes("AUTH") || t.includes("PCI") || t.includes("COMPLIANCE") || t.includes("SHIELD") || t.includes("PLAGIARISM")) {
    return "/services/secrrity.png";
  }
  if (t.includes("CI/CD") || t.includes("DEVOPS") || t.includes("DOCKER") || t.includes("KUBERNETES") || t.includes("CLOUD") || t.includes("AWS") || t.includes("GOLANG") || t.includes("C++") || t.includes("SOFTWARE")) {
    return "/services/software.png";
  }
  if (t.includes("ANALYTICS") || t.includes("ATTRIBUTION") || t.includes("TRACKING") || t.includes("LOOKER") || t.includes("METRIC") || t.includes("REPORTING") || t.includes("KPI") || t.includes("MEDIA") || t.includes("SOCIAL")) {
    return "/services/marketingmedia.png";
  }
  if (t.includes("APP") || t.includes("MOBILE")) return "/services/app.png";
  if (t.includes("DIGITAL") || t.includes("MARKETING") || t.includes("CRM") || t.includes("HUBSPOT") || t.includes("SALESFORCE") || t.includes("LEAD") || t.includes("ENRICHMENT") || t.includes("AUTOMATION")) {
    return "/services/digital.png";
  }
  if (t.includes("WEB") || t.includes("PORTAL") || t.includes("SITE")) return "/services/webdesign.png";
  return "/services/webapps.png";
}

/**
 * Reusable Technologies Book Component
 * Used across ALL Service Pages in the site.
 * 
 * Features:
 * - Dual-page spread layout: Left = Content / Text, Right = Visual / Image
 * - Solid pure white background (#FFFFFF)
 * - Solid #41B349 bottom bar (NO shadows, NO gradients, NO blur)
 * - Smooth physics-based 3D turning animation with continuous damped LERP engine
 * - NO slider arrows
 * - Dynamic CMS support: editable text and changeable images in Pages & Routes
 */
const TechnologiesBook = ({
  serviceKey = "web-development",
  lang,
  customData,
  bgColor = "#FFFFFF",
  cmsContent,
}) => {
  const { openQuote } = useQuote();
  const { language } = useLanguage();
  const activeLang = lang || language || "en";

  // Resolve service dataset
  const content = customData || getServiceTechnologies(serviceKey, activeLang);
  const defaultBadge = content?.badge || "WE ARE BEST";
  const defaultTitle = content?.title || "Technologies";
  const defaultTitleHighlight = content?.titleHighlight || "We Use";

  // Section Header Text (Editable via CMS)
  const badgeText = getCmsVal(cmsContent, defaultBadge, "technologiesbook");
  const titleText = getCmsVal(cmsContent, defaultTitle, "technologiesbook");
  const titleHighlightText = getCmsVal(cmsContent, defaultTitleHighlight, "technologiesbook");

  // Dynamic Technology List mapped with CMS values
  // In servicesTechnologiesData, pages[0] is the cover overview, pages.slice(1) gives the 12 tech pages + 1 CTA
  const baseList = content?.pages && content.pages.length > 1
    ? content.pages.slice(1)
    : (content?.pages || []);

  const techList = baseList.map((item) => {
    const title = getCmsVal(cmsContent, item.title, "technologiesbook");
    const subtitle = getCmsVal(cmsContent, item.subtitle, "technologiesbook");
    const badge = getCmsVal(cmsContent, item.badge, "technologiesbook");
    const desc = getCmsVal(cmsContent, item.desc, "technologiesbook");
    const defaultImg = item.image || resolveTechDefaultImage(item.title);
    const image = getCmsVal(cmsContent, defaultImg, "technologiesbook", item.title);
    const tags = (item.tags || []).map((tag) => getCmsVal(cmsContent, tag, "technologiesbook"));
    const footerLeft = getCmsVal(cmsContent, item.footerLeft, "technologiesbook");

    return {
      ...item,
      title,
      subtitle,
      badge,
      desc,
      image,
      tags,
      footerLeft,
    };
  });

  const totalSpreads = Math.max(1, techList.length); // Typically 13 spreads (12 technologies + 1 CTA)

  // Turning leaves between Spread 0 Left Base and Spread (totalSpreads - 1) Right Base
  const leaves = Array.from({ length: Math.max(0, totalSpreads - 1) }).map((_, leafIdx) => ({
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

  // Set target spread smoothly
  const goToSpread = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(index, totalSpreads - 1));
      targetProgressRef.current = clamped;
    },
    [totalSpreads]
  );

  const handleNext = useCallback(() => {
    const current = Math.round(targetProgressRef.current);
    const nextSpread = current >= totalSpreads - 1 ? 0 : current + 1;
    goToSpread(nextSpread);
  }, [goToSpread, totalSpreads]);

  const handlePrev = useCallback(() => {
    const current = Math.round(targetProgressRef.current);
    const prevSpread = current <= 0 ? totalSpreads - 1 : current - 1;
    goToSpread(prevSpread);
  }, [goToSpread, totalSpreads]);

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

  if (!techList || techList.length === 0) return null;

  return (
    <div
      ref={trackRef}
      id={`technologies-book-section-${serviceKey}`}
      className="relative w-full bg-white py-14 sm:py-20 md:py-24 select-none overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* BOOK VIEWPORT (PURE SOLID WHITE, NORMAL FLOW, NO STICKY / PINNING) */}
      <div
        className="w-full flex flex-col justify-center items-center overflow-hidden select-none px-4 sm:px-6 md:px-10 z-10 font-sans bg-white"
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* SECTION HEADER & TOP-RIGHT NAVIGATION ARROWS */}
        <div className="relative z-10 w-full max-w-[1020px] mb-3 sm:mb-4 px-1 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2">
              <SectionBadge variant="light">
                {badgeText}
              </SectionBadge>
            </div>
            <SectionHeading
              as="h2"
              size="section"
              theme="dark"
              className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] leading-tight"
            >
              {titleText} <HighlightWord>{titleHighlightText}</HighlightWord>
            </SectionHeading>
          </div>

          {/* TOP-RIGHT NAVIGATION ARROWS */}
          <div className="flex items-center gap-2 sm:gap-2.5 mb-1 shrink-0">
            {/* Back arrow (←): Go to previous page - Clean porcelain neutral styling */}
            <button
              type="button"
              onClick={handlePrev}
              title="Previous Page (Back)"
              aria-label="Previous Page (Back)"
              className="group inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white hover:bg-gray-50 text-gray-600 hover:text-[#0D0F12] border border-gray-200/90 hover:border-gray-300 transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>

            {/* Next arrow (→): Go to next page - Primary brand green visual indication */}
            <button
              type="button"
              onClick={handleNext}
              title="Next Page (Forward)"
              aria-label="Next Page (Forward)"
              className="group inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#1B4E2C] hover:bg-[#153e23] text-white border border-[#1B4E2C] hover:border-[#153e23] transition-all duration-200 shadow-xs shadow-[#1B4E2C]/25 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* 3D BOOK WRAPPER WITH EXACT ORIGINAL DIMENSIONS */}
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

          {/* DESKTOP / TABLET DUAL-PAGE 3D BOOK (>= md:) */}
          <div
            className="hidden md:flex relative z-10 w-full h-full rounded-2xl lg:rounded-3xl bg-white overflow-hidden border border-black/[0.08] cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              if (clickX < rect.width * 0.45) {
                handlePrev();
              } else if (clickX > rect.width * 0.55) {
                handleNext();
              }
            }}
            style={{
              backgroundColor: "#FFFFFF",
              transformStyle: "preserve-3d",
            }}
          >
            {/* 1. PERMANENT LEFT BASE: Spread 0 Left (Content / Text of techList[0]) */}
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
            className="text-[11px] sm:text-xs font-bold text-right w-32 tracking-wider text-[#0D0F12] font-outfit"
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
          <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-widest text-[#41B349] font-jakarta">
            {tech.subtitle || "// NEXT CHAPTER"}
          </span>
          <span
            className="text-[11px] sm:text-xs font-black text-[#1B4E2C] tracking-widest font-outfit"
          >
            {String(pageNumber).padStart(2, "0")}
          </span>
        </div>

        <div className="my-auto flex flex-col items-start max-w-[380px]">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#41B349]/12 border border-[#41B349]/25 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#41B349] animate-pulse" />
            <span className="text-[10px] font-extrabold text-[#41B349] uppercase tracking-widest font-jakarta">
              {tech.badge || "LET'S BUILD TOGETHER"}
            </span>
          </div>

          <CardHeading
            as="h2"
            size="2xl"
            className="text-xl sm:text-2xl md:text-[26px] font-black text-[#0D0F12] tracking-tight leading-tight mb-2 uppercase"
          >
            {tech.title}
          </CardHeading>

          <CardParagraph
            size="sm"
            className="text-xs sm:text-[12.5px] text-[#334155] font-normal leading-relaxed mb-3 sm:mb-4"
          >
            {tech.desc}
          </CardParagraph>

          <button
            onClick={openQuote}
            className="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#1B4E2C] hover:bg-[#153e23] text-white text-xs sm:text-[13px] font-bold tracking-wide transition-all duration-300 cursor-pointer active:scale-95 shadow-sm font-outfit"
          >
            <ButtonText size="sm">Start yours</ButtonText>
            <span className="text-sm group-hover:translate-x-1 group-hover:translate-y-0.5 transition-transform duration-300">
              ↘
            </span>
          </button>
        </div>

        <div className="flex items-center justify-between text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 border-t border-black/[0.06] pt-1.5 font-jakarta">
          <span>{tech.footerLeft || "TECH SOLUTIONOR • DIGITAL ENGINEERING"}</span>
          <span
            className="text-[#1B4E2C] font-black font-outfit"
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
          className="text-[11px] sm:text-xs font-black text-[#1B4E2C] tracking-wider font-outfit"
        >
          {String(pageNumber).padStart(2, "0")}
        </span>
        <span className="text-[9.5px] sm:text-[10px] font-bold tracking-wider text-[#1B4E2C] uppercase bg-[#41B349]/12 px-2.5 py-0.5 rounded-full border border-[#41B349]/25 font-jakarta">
          {tech.badge || "CORE FOUNDATION"}
        </span>
      </div>

      {/* CENTER CONTENT: STRUCTURED TECHNOLOGY SPECS */}
      <div className="relative z-10 my-auto flex flex-col items-start max-w-[420px]">
        {/* Category Subtitle */}
        <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#41B349] mb-1 font-jakarta">
          {tech.subtitle}
        </div>

        {/* Title & Icon */}
        <div className="flex items-center gap-2.5 mb-2 sm:mb-2.5">
          {IconComponent && (
            <div
              className="p-1.5 rounded-lg bg-white/95 border border-black/[0.06] shadow-2xs flex items-center justify-center shrink-0"
              style={{ color: tech.iconColor || "#1B4E2C" }}
            >
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5" />
            </div>
          )}
          <CardHeading
            as="h3"
            size="2xl"
            className="text-xl sm:text-2xl md:text-[26px] font-black text-[#0D0F12] tracking-tight uppercase"
          >
            {tech.title}
          </CardHeading>
        </div>

        {/* Description */}
        <CardParagraph
          size="sm"
          className="text-[11.5px] sm:text-[12px] md:text-[12.5px] text-[#334155] font-normal leading-relaxed mb-3 sm:mb-3.5"
        >
          {tech.desc}
        </CardParagraph>

        {/* Capability Tags */}
        {tech.tags && tech.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tech.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#41B349]/12 border border-[#41B349]/25 text-[#1B4E2C] text-[10px] font-bold tracking-wide font-jakarta"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM FOOTER */}
      <div className="relative z-10 flex items-center justify-between text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 border-t border-black/[0.06] pt-1.5 font-jakarta">
        <span>{tech.footerLeft || "TECH SOLUTIONOR • ECOSYSTEM"}</span>
        <span
          className="text-[#1B4E2C] font-black font-outfit"
        >
          PAGE {String(pageNumber).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

// =========================================================================
// SUB-COMPONENT 2: TECH VISUAL PAGE (Rendered on RIGHT PAGE of each spread)
// Dedicated full-page visual showcase on a solid pure white background
// with clean centering and NO gradient effects or checkered patterns.
// =========================================================================
const TechVisualPage = ({ tech, isLeft, pageNumber, openQuote }) => {
  if (!tech) return null;

  const normalizedTitle = (tech.title || "").toUpperCase().trim();
  const imageSrc =
    tech.image ||
    resolveTechDefaultImage(tech.title) ||
    (tech.type === "cta" ? "/services/letsgobook.jpg" : null);
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
        <span className="text-[9.5px] sm:text-[10px] font-bold tracking-wider text-[#1B4E2C] uppercase bg-[#41B349]/12 px-2.5 py-0.5 rounded-full border border-[#41B349]/25 font-jakarta">
          {tech.badge || "TECHNOLOGY SHOWCASE"}
        </span>
        <span
          className="text-[11px] sm:text-xs font-black text-[#1B4E2C] tracking-wider font-outfit"
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
              priority={pageNumber <= 2}
              unoptimized={true}
              className="w-auto h-full max-h-[180px] sm:max-h-[210px] md:max-h-[240px] lg:max-h-[265px] object-contain select-none transition-transform duration-500 hover:scale-105"
            />
          </div>
        ) : IconComponent ? (
          <div className="relative flex items-center justify-center w-full h-[185px] sm:h-[215px] md:h-[245px] lg:h-[270px] bg-white">
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex items-center justify-center transition-transform duration-500 hover:scale-105"
              style={{ color: tech.iconColor || "#1B4E2C" }}
            >
              <IconComponent className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" />
            </div>
          </div>
        ) : (
          <div className="relative flex items-center justify-center w-full h-[185px] sm:h-[215px] md:h-[245px] lg:h-[270px] bg-white">
            <div className="w-24 h-24 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex items-center justify-center text-4xl">
              🚀
            </div>
          </div>
        )}

        {/* Clean, Simple Caption Label */}
        <div className="mt-2 text-center">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.03] border border-black/[0.06] text-[#0D0F12] text-[11px] sm:text-xs font-black tracking-widest uppercase font-outfit"
          >
            <span>{tech.title}</span>
            <span className="w-1 h-1 rounded-full bg-[#41B349]" />
            <span className="text-[#41B349] font-bold text-[10px] tracking-wider font-jakarta">
              {tech.subtitle}
            </span>
          </span>
        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="relative z-10 flex items-center justify-between text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 border-t border-black/[0.06] pt-1.5 font-jakarta">
        <span>{tech.footerLeft || "TECH SOLUTIONOR • ECOSYSTEM"}</span>
        <span
          className="text-[#1B4E2C] font-black font-outfit"
        >
          PAGE {String(pageNumber).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default TechnologiesBook;

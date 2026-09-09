"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useQuote } from "@/app/_context/QuoteContext";
import { servicesStrugglingData } from "@/app/_data/servicesStrugglingData";

/**
 * Reusable CommonStruggling Component
 * Reuses the exact same 4-card sticky scroll-arc UI, styling, layout, animations,
 * spacing, typography, and card structure from the Web Development page across all Services.
 *
 * @param {string} serviceKey - Service identifier (e.g. "web-development", "app-development")
 * @param {string} eyebrow - Optional eyebrow override
 * @param {string} titleLine1 - Optional first title line override
 * @param {string} titleLine2 - Optional second title line override
 * @param {string} subtitle - Optional subtitle override
 * @param {Array} cards - Optional cards array override
 */
export default function CommonStruggling({
  serviceKey = "web-development",
  eyebrow,
  titleLine1,
  titleLine2,
  subtitle,
  cards,
}) {
  const { openQuote } = useQuote();
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1366);

  const serviceConfig =
    servicesStrugglingData[serviceKey] || servicesStrugglingData["web-development"];

  const displayEyebrow = eyebrow || serviceConfig?.eyebrow || "PROVEN DEVELOPMENT STRATEGIES";
  const displayTitle1 = titleLine1 || serviceConfig?.titleLine1 || "Struggling With Website Performance?";
  const displayTitle2 = titleLine2 || serviceConfig?.titleLine2 || "Here’s How Our Web Development Services Help";
  const displaySubtitle = subtitle || serviceConfig?.subtitle || "";
  const rawCards = cards || serviceConfig?.cards || [];

  // Bind openQuote action to cards if not provided
  const cardsData = rawCards.map((card) => ({
    ...card,
    action: card.action || openQuote,
  }));

  const totalCards = cardsData.length;

  // Window width tracking for responsive card spacing without overflow
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll listener for sticky card arc animation
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const totalScrollable = rect.height - window.innerHeight;
          if (totalScrollable <= 0) return;

          // Compute raw scroll progress strictly within [0, 1]
          const rawP = Math.max(0, Math.min(1, -rect.top / totalScrollable));
          setProgress(rawP);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Map raw scroll progress with entry & exit rest zones:
  // - 0.00 to 0.08: Card 0 is firmly rested and active in center
  // - 0.08 to 0.90: Smooth gliding arc transition through cards 0 -> 1 -> 2 -> 3
  // - 0.90 to 1.00: Card 3 is firmly rested and active in center before unpinning
  let scrollOffset = 0;
  if (totalCards > 1) {
    if (progress <= 0.08) {
      scrollOffset = 0;
    } else if (progress >= 0.90) {
      scrollOffset = totalCards - 1;
    } else {
      const normalized = (progress - 0.08) / (0.90 - 0.08);
      scrollOffset = normalized * (totalCards - 1);
    }
  }

  // Calculate card horizontal spacing and dimensions based on viewport width
  // ensuring side cards never clip or overflow screen bounds
  let cardWidth = 390;
  let spacing = 390;

  if (windowWidth < 640) {
    cardWidth = Math.min(windowWidth - 48, 310);
    spacing = Math.min(cardWidth + 16, (windowWidth - 32) * 0.82);
  } else if (windowWidth < 1024) {
    cardWidth = 340;
    spacing = Math.min(350, (windowWidth - 48) / 2);
  } else {
    cardWidth = 390;
    spacing = Math.min(390, (windowWidth - 64) / 2.2);
  }

  const getCardTransform = (index, card) => {
    // Relative position from the center stage (d = 0 means exact center focus)
    const d = index - scrollOffset;
    const absD = Math.abs(d);

    const x = d * spacing;

    // Curved offset: left and right cards sit gently lower along smooth arc (max 20px)
    const y = Math.pow(absD, 1.2) * 20;

    // Tilted rotation: subtle 3.5deg tilt
    const rotate = d * 3.5;

    // Scale: center is 1.0, side cards scale down gracefully to 0.92
    const scale = Math.max(0.9, 1 - absD * 0.08);

    // Opacity: center card is 1.0, adjacent side cards are ~0.55, further cards fade out
    const opacity = Math.max(0, Math.min(1, 1 - (absD - 0.35) * 0.85));

    const isCenter = absD < 0.35;

    return {
      style: {
        transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`,
        opacity: opacity,
        zIndex: Math.round(30 - absD * 10),
        borderColor: isCenter ? card.color : "#E5E7EB",
        boxShadow: isCenter
          ? `0 14px 34px -8px ${card.color}35`
          : "0 4px 16px rgba(0,0,0,0.03)",
        pointerEvents: isCenter ? "auto" : "none",
        willChange: "transform, opacity",
      },
      isCenter,
    };
  };

  const activeCardIndex = Math.min(
    Math.max(0, totalCards - 1),
    Math.max(0, Math.round(scrollOffset))
  );
  const activeColor = cardsData[activeCardIndex]?.color || "#417F51";

  if (totalCards === 0) return null;

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#FFFFFF]"
      style={{ height: "420vh" }}
    >
      {/* =================================================================== */}
      {/* STICKY VIEWPORT CONTAINER: Zero clipping, perfectly balanced        */}
      {/* =================================================================== */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 lg:px-8 select-none bg-[#FFFFFF]">
        {/* Ambient Subtle Arc Line in Background */}
        <div className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 w-[950px] h-[280px] border-b border-dashed border-gray-200 rounded-[100%] pointer-events-none z-0 hidden md:block" />

        {/* ================================================================= */}
        {/* CENTERED CONTENT WRAPPER: EQUAL TOP & BOTTOM BALANCED MARGINS     */}
        {/* ================================================================= */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center my-auto z-10 py-2">
          {/* SECTION HEADER: Compact, Refined Typography */}
          <div className="text-center max-w-3xl mx-auto mb-3 sm:mb-4">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1B4E2C]/8 border border-[#1B4E2C]/15 text-[#1B4E2C] font-extrabold text-[10px] sm:text-[11px] uppercase tracking-widest mb-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B4E2C] animate-pulse" />
              <span>{displayEyebrow}</span>
            </div>

            {/* Heading in Outfit & Plus Jakarta Sans Font */}
            <h2
              className="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-black tracking-tight leading-tight text-center"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="text-[#1B4E2C] block">{displayTitle1}</span>
              <span className="text-[#0D0F12] block mt-0.5">{displayTitle2}</span>
            </h2>

            {/* Subtitle */}
            {displaySubtitle && (
              <p
                className="mt-1 max-w-xl mx-auto text-xs sm:text-[12.5px] text-gray-500 font-normal leading-relaxed text-center hidden sm:block"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {displaySubtitle}
              </p>
            )}
          </div>

          {/* =============================================================== */}
          {/* CARDS ARC STAGE: 4 Cards in Left -> Center -> Right Curved Flow */}
          {/* =============================================================== */}
          <div className="relative w-full max-w-4xl mx-auto h-[260px] sm:h-[270px] md:h-[275px] flex items-center justify-center">
            {cardsData.map((card, idx) => {
              const { style, isCenter } = getCardTransform(idx, card);

              return (
                <div
                  key={card.id ?? idx}
                  style={{
                    ...style,
                    width: `${cardWidth}px`,
                  }}
                  className="absolute bg-white border-2 rounded-[20px] sm:rounded-[22px] p-4 sm:p-5 flex flex-col justify-between transition-all duration-75 ease-out text-left select-none"
                >
                  {/* Top Color Accent Line */}
                  <div
                    className="absolute top-0 left-5 right-5 h-1 rounded-b-full transition-all duration-300"
                    style={{ backgroundColor: card.color, opacity: isCenter ? 1 : 0.4 }}
                  />

                  <div>
                    {/* Top Row: Category Badge & Index */}
                    <div className="flex items-center justify-between mb-2 pt-0.5">
                      <span
                        className="text-[9.5px] sm:text-[10.5px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border transition-all duration-300"
                        style={{
                          backgroundColor: `${card.color}15`,
                          borderColor: `${card.color}30`,
                          color: card.textColor,
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        {card.badge}
                      </span>
                      <span
                        className="text-[10px] sm:text-[10.5px] font-black tracking-widest transition-colors duration-300"
                        style={{ color: isCenter ? card.textColor : "#9CA3AF" }}
                      >
                        0{idx + 1} / 0{totalCards}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3
                      className="text-[15px] sm:text-[16px] md:text-[17px] font-black text-[#0D0F12] leading-snug mb-1.5 tracking-tight line-clamp-2"
                      style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                    >
                      {card.title}
                    </h3>

                    {/* Card Description */}
                    <p
                      className="text-[11.5px] sm:text-[12px] md:text-[12.5px] text-gray-600 font-normal leading-relaxed mb-3 line-clamp-3"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {card.descParts ? (
                        <>
                          {card.descParts[0]}
                          {card.descParts[1]?.isLink ? (
                            <Link
                              href={card.descParts[1].href}
                              className="font-bold underline underline-offset-2 hover:opacity-80 transition-opacity"
                              style={{ color: card.color }}
                            >
                              {card.descParts[1].text}
                            </Link>
                          ) : (
                            card.descParts[1]
                          )}
                          {card.descParts[2]}
                        </>
                      ) : (
                        card.desc
                      )}
                    </p>
                  </div>

                  {/* Card CTA Action Button */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <button
                      type="button"
                      onClick={card.action}
                      className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: isCenter ? card.color : "#F3F4F6",
                        color: isCenter ? card.btnTextColor : "#4B5563",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      <span>{card.ctaText}</span>
                    </button>

                    <span
                      className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider transition-colors duration-300"
                      style={{ color: isCenter ? card.textColor : "#9CA3AF" }}
                    >
                      {isCenter ? "● Active Focus" : "Scroll to view"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =============================================================== */}
          {/* SCROLL PROGRESS BAR: Centered with balanced margin              */}
          {/* =============================================================== */}
          <div className="flex flex-col items-center gap-1 mt-3 sm:mt-4 z-20">
            <div className="w-28 sm:w-36 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-100 ease-out rounded-full"
                style={{
                  width: `${Math.round(progress * 100)}%`,
                  backgroundColor: activeColor,
                }}
              />
            </div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400">
              Scroll to explore challenges
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

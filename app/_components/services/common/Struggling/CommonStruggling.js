"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useQuote } from "@/app/_context/QuoteContext";
import { servicesStrugglingData } from "@/app/_data/servicesStrugglingData";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
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

  // IntersectionObserver to only auto-progress while section is visible in viewport
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Automatic auto-running card progression timer
  useEffect(() => {
    if (!isVisible || isPaused || totalCards <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= totalCards - 1) {
          setDirection(-1);
          return prev - 1;
        }
        if (prev <= 0) {
          setDirection(1);
          return prev + 1;
        }
        return prev + direction;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [isVisible, isPaused, totalCards, direction]);

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
    const d = index - currentIndex;
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
        pointerEvents: isCenter ? "auto" : "auto",
        cursor: isCenter ? "default" : "pointer",
        willChange: "transform, opacity",
        transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
      },
      isCenter,
    };
  };

  const activeColor = cardsData[currentIndex]?.color || "#417F51";

  if (totalCards === 0) return null;

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#FFFFFF] py-14 sm:py-20 md:py-24 select-none overflow-hidden"
    >
      <div className="w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        {/* Ambient Subtle Arc Line in Background */}
        <div className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 w-[950px] h-[280px] border-b border-dashed border-gray-200 rounded-[100%] pointer-events-none z-0 hidden md:block" />

        {/* ================================================================= */}
        {/* CENTERED CONTENT WRAPPER: EQUAL TOP & BOTTOM BALANCED MARGINS     */}
        {/* ================================================================= */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center z-10 py-2">
          {/* SECTION HEADER: Exact Homepage Typography */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            {/* Eyebrow Pill */}
            <div className="mb-2">
              <SectionBadge variant="light">
                {displayEyebrow}
              </SectionBadge>
            </div>

            {/* Heading matching Homepage Typography */}
            <SectionHeading
              as="h2"
              size="section"
              theme="dark"
              className="text-center"
            >
              <HighlightWord className="block">{displayTitle1}</HighlightWord>
              <span className="text-[#0D0F12] block mt-1">{displayTitle2}</span>
            </SectionHeading>

            {/* Subtitle matching Homepage Hierarchy */}
            {displaySubtitle && (
              <SectionParagraph
                size="md"
                theme="slate"
                className="mt-3 max-w-2xl mx-auto text-center"
              >
                {displaySubtitle}
              </SectionParagraph>
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
                  onClick={() => {
                    if (!isCenter) setCurrentIndex(idx);
                  }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  style={{
                    ...style,
                    width: `${cardWidth}px`,
                  }}
                  className="absolute bg-white border-2 rounded-[20px] sm:rounded-[22px] p-4 sm:p-5 flex flex-col justify-between text-left"
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
                        className="text-[9.5px] sm:text-[10.5px] font-jakarta font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border transition-all duration-300"
                        style={{
                          backgroundColor: `${card.color}15`,
                          borderColor: `${card.color}30`,
                          color: card.textColor,
                        }}
                      >
                        {card.badge}
                      </span>
                      <span
                        className="text-[10px] sm:text-[10.5px] font-jakarta font-black tracking-widest transition-colors duration-300"
                        style={{ color: isCenter ? card.textColor : "#9CA3AF" }}
                      >
                        0{idx + 1} / 0{totalCards}
                      </span>
                    </div>

                    {/* Card Title matching Homepage Typography */}
                    <CardHeading
                      as="h3"
                      size="sm"
                      className="leading-snug mb-1.5 line-clamp-2"
                    >
                      {card.title}
                    </CardHeading>

                    {/* Card Description matching Homepage Typography */}
                    <CardParagraph
                      size="xs"
                      className="leading-relaxed mb-3 line-clamp-3"
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
                    </CardParagraph>
                  </div>

                  {/* Card CTA Action Button */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <button
                      type="button"
                      onClick={card.action}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: isCenter ? card.color : "#F3F4F6",
                        color: isCenter ? card.btnTextColor : "#4B5563",
                      }}
                    >
                      <ButtonText className="text-[11px] sm:text-xs">{card.ctaText}</ButtonText>
                    </button>

                    <span
                      className="text-[9.5px] sm:text-[10px] font-jakarta font-bold uppercase tracking-wider transition-colors duration-300"
                      style={{ color: isCenter ? card.textColor : "#9CA3AF" }}
                    >
                      {isCenter ? "● Active Focus" : "Click to view"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =============================================================== */}
          {/* PROGRESS INDICATOR: Interactive Navigation Pills                */}
          {/* =============================================================== */}
          <div className="flex flex-col items-center gap-2 mt-4 sm:mt-5 z-20">
            <div className="flex items-center gap-1.5">
              {cardsData.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="h-1.5 rounded-full transition-all duration-500 cursor-pointer"
                  style={{
                    width: currentIndex === i ? "28px" : "8px",
                    backgroundColor: currentIndex === i ? c.color : "#E5E7EB",
                  }}
                />
              ))}
            </div>
            <span className="text-[9px] font-jakarta uppercase font-bold tracking-widest text-gray-400">
              Proven Strategies • Auto Rotating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

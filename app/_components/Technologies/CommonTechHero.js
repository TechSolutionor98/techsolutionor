"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TechBg from "@/components/Images/technologybannerbg.svg";
import { ArrowRight, Sparkles } from "lucide-react";
import { useQuote } from "@/app/_context/QuoteContext";
import { getCmsVal } from "@/lib/api-helper";
import { ButtonText } from "@/components/Typography";

const CommonTechHero = ({
  cmsContent,
  cmsPrefix = "techbanner",
  badge = "TECHNOLOGY SOLUTIONS • GLOBAL",
  titleLine1,
  titleLine2,
  titleAccent,
  description,
  image,
  imageAlt = "Technology Specialist",
  ctaText = "Explore Solutions",
  ctaHref = "#overview",
  onCtaClick,
  headingClassName = "",
  paragraphClassName = "",
  showPrimaryCta = false,
  quoteButtonStyle = "primary",
}) => {
  const { openQuote } = useQuote();

  // Dynamic CMS lookups with fallbacks
  const dynamicLine1 = getCmsVal(cmsContent, titleLine1, cmsPrefix);
  const dynamicLine2 = getCmsVal(cmsContent, titleLine2, cmsPrefix);
  const dynamicLine3 = getCmsVal(cmsContent, titleAccent, cmsPrefix);
  const dynamicDesc = getCmsVal(cmsContent, description, cmsPrefix);
  const dynamicBadge = getCmsVal(cmsContent, badge, cmsPrefix);
  const defaultImg = image?.src || image;
  const dynamicImage = getCmsVal(cmsContent, defaultImg, cmsPrefix);
  const dynamicCtaText = getCmsVal(cmsContent, ctaText, cmsPrefix);

  // Clean title strings: strip punctuation for a bold, colossal, architectural presentation
  const cleanLine1 = dynamicLine1 ? dynamicLine1.trim() : "";
  const cleanLine2 = dynamicLine2 ? dynamicLine2.replace(/[:.]+$/, "").trim() : "";
  const cleanLine3 = dynamicLine3 ? dynamicLine3.trim() : "";

  // Refine description to a clean, punchy 1-2 sentence statement
  const getCleanDescription = (text) => {
    if (!text) return "";
    const sentences = text.match(/[^.!?]+[.!?]+/g);
    if (sentences && sentences.length >= 2) {
      return sentences.slice(0, 2).join(" ").trim();
    }
    return text.trim();
  };

  const refinedDescription = getCleanDescription(dynamicDesc);

  return (
    <section className="relative w-full bg-white text-[#0D0F12] overflow-hidden pt-8 sm:pt-12 md:pt-14 lg:pt-16 pb-16 sm:pb-24 md:pb-28 lg:pb-32 select-none">
      {/* Ambient Multi-Layer Lighting Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] lg:w-[1250px] h-[460px] lg:h-[580px] bg-[radial-gradient(circle_at_top,_rgba(65,179,73,0.13)_0%,_rgba(65,179,73,0.03)_50%,_transparent_75%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] sm:w-[850px] h-[320px] bg-[radial-gradient(ellipse_at_center,_rgba(197,160,89,0.06)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#41B34910_1.2px,transparent_1.2px)] [background-size:28px_28px] pointer-events-none opacity-50" />

      {/* Subtle Geometric Background Corner Accent */}
      <div className="absolute top-0 left-0 opacity-15 pointer-events-none">
        <Image
          src={TechBg}
          alt="Geometric Background Accent"
          width={420}
          height={420}
          className="w-[340px] object-contain"
        />
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 text-center flex flex-col items-center justify-center">
        {/* Modern Pill Badge */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#41B349]/[0.08] border border-[#41B349]/25 text-[#247B2A] text-xs sm:text-[13px] font-jakarta font-semibold tracking-wider uppercase shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#41B349] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E8234]"></span>
            </span>
            <span>{dynamicBadge}</span>
          </div>
        </div>

        {/* --- Monumental Headline Architecture matching Web Dev Services --- */}
        <div className="w-full max-w-5xl xl:max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
          <h1 className={`font-display uppercase tracking-[-0.035em] text-[#0D0F12] text-3xl min-[360px]:text-4xl min-[420px]:text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] leading-[0.95] sm:leading-[0.92] text-center w-full ${headingClassName || ""}`}>
            <span className="block text-[#0D0F12]">
              {cleanLine1}
            </span>
            {cleanLine2 && (
              <span className="block mt-1.5 sm:mt-2.5 text-[#0D0F12]/95">
                {cleanLine2}
              </span>
            )}
            {cleanLine3 && (
              <span className="block mt-2 sm:mt-3.5 text-transparent bg-clip-text bg-gradient-to-r from-[#247529] via-[#41B349] to-[#2E8234] italic font-display">
                {cleanLine3}
              </span>
            )}
          </h1>
        </div>

        {/* Crisp, Concise Description */}
        {refinedDescription && (
          <p className="font-jakarta font-normal text-[#525F72] text-base sm:text-lg md:text-[19px] max-w-2xl sm:max-w-3xl mx-auto leading-relaxed mt-6 sm:mt-8 mb-8 sm:mb-10 text-center tracking-[-0.01em]">
            {refinedDescription}
          </p>
        )}

        {/* Luminous High-Converting Action Area */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {showPrimaryCta && (
            <>
              {onCtaClick ? (
                <button
                  onClick={onCtaClick}
                  className="bg-[#2E8234] hover:bg-[#256f2c] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-jakarta font-semibold text-base shadow-[0_10px_35px_rgba(46,130,52,0.3)] hover:shadow-[0_14px_45px_rgba(46,130,52,0.45)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
                >
                  <ButtonText className="text-sm sm:text-base text-white">{dynamicCtaText || ctaText}</ButtonText>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : ctaHref && ctaHref.startsWith("#") ? (
                <a href={ctaHref} className="inline-block group">
                  <button
                    className="bg-[#2E8234] hover:bg-[#256f2c] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-jakarta font-semibold text-base shadow-[0_10px_35px_rgba(46,130,52,0.3)] hover:shadow-[0_14px_45px_rgba(46,130,52,0.45)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
                  >
                    <ButtonText className="text-sm sm:text-base text-white">{dynamicCtaText || ctaText}</ButtonText>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </a>
              ) : (
                <Link href={ctaHref || "#overview"} className="inline-block group">
                  <button
                    className="bg-[#2E8234] hover:bg-[#256f2c] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-jakarta font-semibold text-base shadow-[0_10px_35px_rgba(46,130,52,0.3)] hover:shadow-[0_14px_45px_rgba(46,130,52,0.45)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
                  >
                    <ButtonText className="text-sm sm:text-base text-white">{dynamicCtaText || ctaText}</ButtonText>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              )}
            </>
          )}

          {quoteButtonStyle === "primary" ? (
            <button
              onClick={openQuote}
              className="group bg-[#2E8234] hover:bg-[#256f2c] text-white px-9 sm:px-11 py-4 sm:py-4.5 rounded-full font-jakarta font-semibold text-base sm:text-[17px] shadow-[0_10px_35px_rgba(46,130,52,0.32)] hover:shadow-[0_14px_45px_rgba(46,130,52,0.45)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
              <ButtonText className="text-sm sm:text-base text-white font-semibold">Get Free Quote</ButtonText>
            </button>
          ) : (
            <button
              onClick={openQuote}
              className="bg-transparent hover:bg-[#2E8234]/10 text-[#0D0F12] hover:text-[#2E8234] border-2 border-[#0D0F12]/20 hover:border-[#2E8234] px-8 py-3.5 sm:py-4 rounded-full font-jakarta font-semibold text-base transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#2E8234]" />
              <ButtonText className="text-sm sm:text-base text-[#0D0F12] hover:text-[#2E8234]">Get Free Quote</ButtonText>
            </button>
          )}
        </div>

        {/* Right Content - Visual Banner Graphic (Preserved & safely disabled so it can be restored later if needed) */}
        {/*
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px]">
            <div className="absolute inset-4 rounded-full bg-[#FFFFFF] pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              {dynamicImage && (typeof dynamicImage === 'string' && (dynamicImage.startsWith('http') || dynamicImage.startsWith('/')) ? (
                <img
                  src={dynamicImage}
                  alt={imageAlt}
                  className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <Image
                  src={dynamicImage || image}
                  alt={imageAlt}
                  width={350}
                  height={350}
                  priority
                  className="object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
                />
              )}
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

export default CommonTechHero;

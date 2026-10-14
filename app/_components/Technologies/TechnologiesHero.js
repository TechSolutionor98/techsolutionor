"use client";

import React from "react";
import Image from "next/image";
import BannerPic from "@/components/Images/technologybanner.png";
import TechBg from "@/components/Images/technologybannerbg.svg";
import { Sparkles } from "lucide-react";
import { useQuote } from "@/app/_context/QuoteContext";
import { getCmsVal } from "@/lib/api-helper";
import { ButtonText } from "@/components/Typography";

const TechnologiesHero = ({ cmsContent }) => {
  const { openQuote } = useQuote();

  const dynamicBadge = getCmsVal(cmsContent, "CUTTING-EDGE TECH STACK • GLOBAL", "techhero");
  const dynamicLine1 = getCmsVal(cmsContent, "Modern Technologies", "techhero");
  const dynamicLine2 = getCmsVal(cmsContent, "Powering Digital Growth", "techhero");
  const dynamicLine3 = getCmsVal(cmsContent, "Built to Scale.", "techhero");
  const dynamicDesc = getCmsVal(
    cmsContent,
    "We leverage modern frameworks, cloud architectures, and battle-tested tools to build fast, secure software. From robust APIs to dynamic web apps, our stack is engineered for peak reliability.",
    "techhero"
  );
  const bannerImgSrc = BannerPic?.src || BannerPic;
  const image = getCmsVal(cmsContent, bannerImgSrc, "techhero");

  return (
    <section className="relative w-full bg-white text-[#0D0F12] overflow-hidden pt-8 sm:pt-12 md:pt-14 lg:pt-16 pb-16 sm:pb-24 md:pb-28 lg:pb-32 select-none">
      {/* Ambient Multi-Layer Lighting Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] lg:w-[1250px] h-[460px] lg:h-[580px] bg-[radial-gradient(circle_at_top,_rgba(65,179,73,0.13)_0%,_rgba(65,179,73,0.03)_50%,_transparent_75%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] sm:w-[850px] h-[320px] bg-[radial-gradient(ellipse_at_center,_rgba(197,160,89,0.06)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#41B34910_1.2px,transparent_1.2px)] [background-size:28px_28px] pointer-events-none opacity-50" />

      {/* Background Subtle Geometric Polygons & Ambient Accent */}
      <div className="absolute top-0 left-0 opacity-15 pointer-events-none">
        <Image
          src={TechBg}
          alt="Tech Geometric Background"
          width={420}
          height={420}
          className="w-[340px] object-contain"
        />
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 text-center flex flex-col items-center justify-center">
        {/* Modern Eyebrow Pill Badge */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#41B349]/[0.08] border border-[#41B349]/25 text-[#247B2A] text-xs sm:text-[13px] font-jakarta font-semibold tracking-wider uppercase shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#41B349] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E8234]"></span>
            </span>
            <span>{dynamicBadge}</span>
          </div>
        </div>

        {/* --- Monumental Headline Architecture --- */}
        <div className="w-full max-w-5xl xl:max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="font-display uppercase tracking-[-0.035em] text-[#0D0F12] text-3xl min-[360px]:text-4xl min-[420px]:text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] leading-[0.95] sm:leading-[0.92] text-center w-full">
            <span className="block text-[#0D0F12]">
              {dynamicLine1}
            </span>
            {dynamicLine2 && (
              <span className="block mt-1.5 sm:mt-2.5 text-[#0D0F12]/95">
                {dynamicLine2}
              </span>
            )}
            {dynamicLine3 && (
              <span className="block mt-2 sm:mt-3.5 text-transparent bg-clip-text bg-gradient-to-r from-[#247529] via-[#41B349] to-[#2E8234] italic font-display">
                {dynamicLine3}
              </span>
            )}
          </h1>
        </div>

        {/* Crisp, Concise Description */}
        {dynamicDesc && (
          <p className="font-jakarta font-normal text-[#525F72] text-base sm:text-lg md:text-[19px] max-w-2xl sm:max-w-3xl mx-auto leading-relaxed mt-6 sm:mt-8 mb-8 sm:mb-10 text-center tracking-[-0.01em]">
            {dynamicDesc}
          </p>
        )}

        {/* Luminous High-Converting Action Area */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <button
            onClick={openQuote}
            className="group bg-[#2E8234] hover:bg-[#256f2c] text-white px-9 sm:px-11 py-4 sm:py-4.5 rounded-full font-jakarta font-semibold text-base sm:text-[17px] shadow-[0_12px_32px_rgba(46,130,52,0.28)] hover:shadow-[0_16px_42px_rgba(46,130,52,0.42)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
            <ButtonText className="text-sm sm:text-base text-white font-semibold">Get Free Quote</ButtonText>
          </button>
        </div>

        {/* Right Content - Visual Banner Image (Preserved & safely disabled so it can be restored later if needed) */}
        {/*
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px]">
            <div className="absolute inset-4 rounded-full bg-[#FFFFFF] pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              {typeof image === 'string' && (image.startsWith('http') || image.startsWith('/')) ? (
                <img 
                  src={image} 
                  alt="Technologies Specialist" 
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              ) : (
                <Image 
                  src={BannerPic} 
                  alt="Technologies Specialist" 
                  fill 
                  priority
                  className="object-contain filter drop-shadow-md"
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

export default TechnologiesHero;

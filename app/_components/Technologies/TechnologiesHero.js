"use client";

import React from "react";
import Image from "next/image";
import BannerPic from "@/components/Images/technologybanner.png";
import TechBg from "@/components/Images/technologybannerbg.svg";
import { Sparkles } from "lucide-react";
import { useQuote } from "@/app/_context/QuoteContext";
import { getCmsVal } from "@/lib/api-helper";
import {
  SectionBadge,
  HighlightWord,
  ButtonText,
} from "@/components/Typography";

const TechnologiesHero = ({ cmsContent }) => {
  const { openQuote } = useQuote();

  const dynamicBadge = getCmsVal(cmsContent, "CUTTING-EDGE TECH STACK • GLOBAL", "techhero");
  const dynamicLine1 = getCmsVal(cmsContent, "Modern Technologies", "techhero");
  const dynamicLine2 = getCmsVal(cmsContent, "Powering Digital Growth:", "techhero");
  const dynamicLine3 = getCmsVal(cmsContent, "Built to Scale.", "techhero");
  const dynamicDesc = getCmsVal(
    cmsContent,
    "We leverage modern frameworks, cloud architectures, and battle-tested tools to build fast, secure software. From robust APIs to dynamic web apps, our stack is engineered for peak reliability.",
    "techhero"
  );
  const bannerImgSrc = BannerPic?.src || BannerPic;
  const image = getCmsVal(cmsContent, bannerImgSrc, "techhero");

  return (
    <section className="relative w-full bg-[#FFFFFF] text-[#0D0F12] overflow-hidden min-h-[500px] sm:min-h-[520px] flex items-center py-14 md:py-20 select-none">
      {/* Background Subtle Geometric Polygons & Ambient Accent */}
      <div className="absolute top-0 left-0 opacity-40 pointer-events-none">
        <Image
          src={TechBg}
          alt="Tech Background"
          width={400}
          height={400}
          className="w-[350px] object-contain"
        />
      </div>

      {/* Subtle Top-Right Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[300px] bg-[#36963D]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 md:px-10 flex flex-col md:flex-row items-center justify-between w-full gap-10 md:gap-14">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-left">
          {/* Eyebrow Pill Badge */}
          <div className="mb-6">
            <SectionBadge variant="light">
              {dynamicBadge}
            </SectionBadge>
          </div>

          {/* Main Headline matching Homepage Typography */}
          <h1 className="font-display uppercase tracking-tight text-[#0D0F12] text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5">
            {dynamicLine1} {dynamicLine2 && <><br />{dynamicLine2}</>} <br />
            <HighlightWord>{dynamicLine3}</HighlightWord>
          </h1>

          {/* Subtitle */}
          <p className="font-jakarta font-normal sm:font-medium tracking-[-0.01em] text-[#4A5568] max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed">
            {dynamicDesc}
          </p>

          {/* CTA Button matching Web Development Standard */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={openQuote}
              className="bg-[#2E8234] hover:bg-[#256f2c] text-white px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5"
              style={{ backgroundColor: '#2E8234' }}
            >
              <Sparkles className="w-4 h-4 text-white" />
              <ButtonText className="text-sm sm:text-base text-white">Get Free Quote</ButtonText>
            </button>
          </div>
        </div>

        {/* Right Content - Visual Banner Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px]">
            {/* Ambient circular frame backdrop */}
            <div className="absolute inset-4 rounded-full bg-[#FFFFFF] pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              {typeof image === 'string' && (image.startsWith('http') || image.startsWith('/')) ? (
                <img
                  src={image}
                  alt="Technologies Specialist"
                  className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <Image
                  src={BannerPic}
                  alt="Technologies Specialist"
                  width={350}
                  height={350}
                  priority
                  className="object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesHero;

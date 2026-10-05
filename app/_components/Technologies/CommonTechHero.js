"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TechBg from "@/components/Images/technologybannerbg.svg";
import { ArrowRight, Sparkles } from "lucide-react";
import { useQuote } from "@/app/_context/QuoteContext";
import { getCmsVal } from "@/lib/api-helper";
import {
  SectionBadge,
  SectionHeading,
  HighlightWord,
  SectionParagraph,
  ButtonText,
} from "@/components/Typography";

const CommonTechHero = ({
  cmsContent,
  cmsPrefix = "techbanner",
  badge = "TECHNOLOGY SOLUTIONS",
  titleLine1,
  titleLine2,
  titleAccent,
  description,
  image,
  imageAlt = "Technology Graphic",
  ctaText = "Explore Solutions",
  ctaHref = "#overview",
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

  return (
    <section className="relative w-full bg-[#FFFFFF] text-[#0D0F12] overflow-hidden min-h-[500px] sm:min-h-[520px] flex items-center py-14 md:py-20 select-none">
      {/* Background Subtle Geometric Polygons */}
      <div className="absolute top-0 left-0 opacity-40 pointer-events-none">
        <Image
          src={TechBg}
          alt="Geometric Background Accent"
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

          {/* Main Headline matching Technologies & Homepage Hero */}
          <SectionHeading 
            as="h1" 
            size="hero" 
            theme="dark" 
            className="text-3xl sm:text-4xl md:text-[44px] lg:text-[50px] leading-[1.12] mb-6"
          >
            {dynamicLine1} {dynamicLine2 && <><br />{dynamicLine2}</>} <br />
            <HighlightWord>{dynamicLine3}</HighlightWord>
          </SectionHeading>

          {/* Subtitle */}
          <SectionParagraph 
            size="lg" 
            theme="slate" 
            className="max-w-[490px] mb-8"
          >
            {dynamicDesc}
          </SectionParagraph>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {ctaHref && ctaHref.startsWith("#") ? (
              <a href={ctaHref} className="inline-block group">
                <button 
                  className="bg-[#36963D] hover:bg-[#2e8234] text-white px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5"
                >
                  <ButtonText className="text-sm sm:text-base text-white">{ctaText}</ButtonText>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
            ) : (
              <Link href={ctaHref || "#overview"} className="inline-block group">
                <button 
                  className="bg-[#36963D] hover:bg-[#2e8234] text-white px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5"
                >
                  <ButtonText className="text-sm sm:text-base text-white">{ctaText}</ButtonText>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            )}

            <button 
              onClick={openQuote}
              className="bg-transparent hover:bg-[#36963D]/10 text-[#0D0F12] hover:text-[#36963D] border-2 border-[#0D0F12]/30 hover:border-[#36963D] px-7 py-3.5 sm:py-4 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#36963D]" />
              <ButtonText className="text-sm sm:text-base text-[#0D0F12] hover:text-[#36963D]">Get Free Quote</ButtonText>
            </button>
          </div>
        </div>

        {/* Right Content - Visual Banner Graphic */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px]">
            {/* Ambient circular frame backdrop */}
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
                  width={340}
                  height={340}
                  priority
                  className="object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonTechHero;

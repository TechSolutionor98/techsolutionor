"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TechBg from "@/components/Images/technologybannerbg.svg";
import { ArrowRight, Sparkles } from "lucide-react";
import { useQuote } from "@/app/_context/QuoteContext";
import { getCmsVal } from "@/lib/api-helper";

const CommonServiceHero = ({
  cmsContent,
  cmsPrefix = "servicebanner",
  badge = "OUR SERVICES & SOLUTIONS",
  titleLine1,
  titleLine2,
  titleAccent,
  description,
  image,
  imageAlt = "Digital Service Specialist",
  ctaText = "Explore Solutions",
  ctaHref = "#overview",
  onCtaClick,
}) => {
  const { openQuote } = useQuote();

  // Dynamic CMS lookups with fallbacks
  const dynamicLine1 = getCmsVal(cmsContent, titleLine1, cmsPrefix);
  const dynamicLine2 = getCmsVal(cmsContent, titleLine2, cmsPrefix);
  const dynamicLine3 = getCmsVal(cmsContent, titleAccent, cmsPrefix);
  const dynamicDesc = getCmsVal(cmsContent, description, cmsPrefix);
  const dynamicBadge = getCmsVal(cmsContent, badge, cmsPrefix);

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
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#36963D]/10 border border-[#36963D]/30 text-[#36963D] font-mono text-xs uppercase tracking-widest font-bold mb-6 shadow-2xs"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#36963D] animate-pulse" />
            <span>{dynamicBadge}</span>
          </div>

          {/* Main Headline matching Services & Technologies page */}
          <h1 
            className="text-3xl sm:text-4xl md:text-[44px] lg:text-[50px] font-black leading-[1.12] tracking-tight text-[#0D0F12] mb-6"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {dynamicLine1} {dynamicLine2 && <><br />{dynamicLine2}</>} <br />
            <span className="text-[#36963D]">{dynamicLine3}</span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-[#475569] text-base md:text-lg max-w-[490px] mb-8 leading-relaxed font-normal"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {dynamicDesc}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {onCtaClick ? (
              <button 
                onClick={onCtaClick}
                className="bg-[#36963D] hover:bg-[#2e8234] text-white px-8 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : ctaHref && ctaHref.startsWith("#") ? (
              <a href={ctaHref} className="inline-block group">
                <button 
                  className="bg-[#36963D] hover:bg-[#2e8234] text-white px-8 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
            ) : (
              <Link href={ctaHref || "#overview"} className="inline-block group">
                <button 
                  className="bg-[#36963D] hover:bg-[#2e8234] text-white px-8 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            )}

            <button 
              onClick={openQuote}
              className="bg-transparent hover:bg-[#36963D]/10 text-[#0D0F12] hover:text-[#36963D] border-2 border-[#0D0F12]/30 hover:border-[#36963D] px-7 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer flex items-center gap-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <Sparkles className="w-4 h-4 text-[#36963D]" />
              <span>Get Free Quote</span>
            </button>
          </div>
        </div>

        {/* Right Content - Visual Graphic Showcase */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px]">
            {/* Ambient circular frame backdrop */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#36963D]/10 via-[#36963D]/5 to-transparent pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              {image && (
                <Image 
                  src={image} 
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
      </div>
    </section>
  );
};

export default CommonServiceHero;

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ServicesPic from "@/components/Images/servicesapp.png";
import TechBg from "@/components/Images/technologybannerbg.svg";
import { ArrowRight, Sparkles } from "lucide-react";
import { useQuote } from "@/app/_context/QuoteContext";
import { getCmsVal } from "@/lib/api-helper";

const ServicesHero = ({ cmsContent }) => {
  const { openQuote } = useQuote();

  const badge = getCmsVal(cmsContent, "OUR SERVICES & SOLUTIONS", "serviceshero");
  const title = getCmsVal(
    cmsContent,
    "Enterprise IT & Digital Services Crafted For Global Scale.",
    "serviceshero"
  );
  const subtitle = getCmsVal(
    cmsContent,
    "From high-throughput web and mobile apps to custom enterprise software, e-commerce storefronts, and performance marketing, we deliver end-to-end technology solutions tailored for businesses across Dubai, the UAE, and worldwide.",
    "serviceshero"
  );
  const cta1Text = getCmsVal(cmsContent, "Explore Services", "serviceshero");
  const cta2Text = getCmsVal(cmsContent, "Get Free Quote", "serviceshero");
  const defaultImg = ServicesPic?.src || ServicesPic;
  const image = getCmsVal(cmsContent, defaultImg, "serviceshero");

  return (
    <section className="relative w-full bg-[#FFFFFF] text-[#0D0F12] overflow-hidden min-h-[520px] flex items-center py-14 md:py-20 select-none">
      {/* Background Subtle Geometric Polygons & Ambient Accent */}
      <div className="absolute top-0 left-0 opacity-40 pointer-events-none">
        <Image
          src={TechBg}
          alt="Services Geometric Background"
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
            <span>{badge}</span>
          </div>

          {/* Main Headline */}
          <h1 
            className="text-3xl sm:text-4xl md:text-[44px] lg:text-[50px] font-black leading-[1.12] tracking-tight text-[#0D0F12] mb-6"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p 
            className="text-[#475569] text-base md:text-lg max-w-[490px] mb-8 leading-relaxed font-normal"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link href="#Services" className="inline-block group">
              <button 
                className="bg-[#36963D] hover:bg-[#2e8234] text-white px-8 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span>{cta1Text}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <button 
              onClick={openQuote}
              className="bg-transparent hover:bg-[#36963D]/10 text-[#0D0F12] hover:text-[#36963D] border-2 border-[#0D0F12]/30 hover:border-[#36963D] px-7 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer flex items-center gap-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <Sparkles className="w-4 h-4 text-[#36963D]" />
              <span>{cta2Text}</span>
            </button>
          </div>
        </div>

        {/* Right Content - Visual Banner Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px]">
            {/* Ambient circular frame backdrop */}
            <div className="absolute inset-4 rounded-full bg-[#FFFFFF] pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              {typeof image === 'string' && (image.startsWith('http') || image.startsWith('/')) ? (
                <img 
                  src={image} 
                  alt="Digital Services Specialist" 
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              ) : (
                <Image 
                  src={ServicesPic} 
                  alt="Digital Services Specialist" 
                  fill 
                  priority
                  className="object-contain filter drop-shadow-md"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;

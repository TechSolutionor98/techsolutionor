"use client";

import React from "react";
import Image from "next/image";
import ServicesPic from "@/components/Images/servicesapp.png";
import TechBg from "@/components/Images/technologybannerbg.svg";
import { Sparkles } from "lucide-react";
import { useQuote } from "@/app/_context/QuoteContext";
import { getCmsVal } from "@/lib/api-helper";
import {
  SectionBadge,
  HighlightWord,
  ButtonText,
} from "@/components/Typography";

const ServicesHero = ({ cmsContent }) => {
  const { openQuote } = useQuote();

  const badge = getCmsVal(cmsContent, "OUR SERVICES & SOLUTIONS • GLOBAL", "serviceshero");
  const title = getCmsVal(
    cmsContent,
    "Digital Services Company Built for Scale: Trusted Worldwide.",
    "serviceshero"
  );
  const subtitle = getCmsVal(
    cmsContent,
    "We provide full-spectrum digital services, from web and mobile development to software engineering and marketing, helping modern businesses build and scale.",
    "serviceshero"
  );
  const cta2Text = getCmsVal(cmsContent, "Get Free Quote", "serviceshero");
  const defaultImg = ServicesPic?.src || ServicesPic;
  const image = getCmsVal(cmsContent, defaultImg, "serviceshero");

  return (
    <section className="relative w-full bg-[#FFFFFF] text-[#0D0F12] overflow-hidden min-h-[500px] sm:min-h-[520px] flex items-center py-14 md:py-20 select-none">
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
          <div className="mb-6">
            <SectionBadge variant="light">
              {badge}
            </SectionBadge>
          </div>

          {/* Main Headline */}
          <h1 
            className="font-display uppercase tracking-tight text-[#0D0F12] text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
          >
            Digital Services <br />
            Company Built for Scale: <br />
            <HighlightWord>Trusted Worldwide.</HighlightWord>
          </h1>

          {/* Subtitle */}
          <p 
            className="font-jakarta font-normal sm:font-medium tracking-[-0.01em] text-[#4A5568] max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed"
          >
            {subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={openQuote}
              className="bg-[#2E8234] hover:bg-[#256f2c] text-white px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5"
              style={{ backgroundColor: '#2E8234' }}
            >
              <Sparkles className="w-4 h-4 text-white" />
              <ButtonText className="text-sm sm:text-base text-white">{cta2Text}</ButtonText>
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

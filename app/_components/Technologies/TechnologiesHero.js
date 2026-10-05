"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import BannerPic from "@/components/Images/technologybanner.png";
import TechBg from "@/components/Images/technologybannerbg.svg";
import { ArrowRight } from "lucide-react";
import { getCmsVal } from "@/lib/api-helper";
import {
  SectionBadge,
  SectionHeading,
  HighlightWord,
  SectionParagraph,
  ButtonText,
} from "@/components/Typography";

const TechnologiesHero = ({ cmsContent }) => {
  const badge = getCmsVal(cmsContent, "TECHNOLOGY SERVICES", "techhero");
  const title = getCmsVal(
    cmsContent,
    "Modern Technologies Powering Our Digital Solution.",
    "techhero"
  );
  const subtitle = getCmsVal(
    cmsContent,
    "Delivering the best solutions starts with understanding your needs and customizing our approach to ensure exceptional, scalable commercial results.",
    "techhero"
  );
  const buttonText = getCmsVal(cmsContent, "Discover More", "techhero");
  const bannerImgSrc = BannerPic?.src || BannerPic;
  const image = getCmsVal(cmsContent, bannerImgSrc, "techhero");

  return (
    <section className="relative w-full bg-[#FFFFFF] text-[#0D0F12] overflow-hidden min-h-[520px] flex items-center py-14 md:py-20 select-none">
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
              {badge}
            </SectionBadge>
          </div>

          {/* Main Headline */}
          <SectionHeading 
            as="h1" 
            size="hero" 
            theme="dark" 
            className="text-3xl sm:text-4xl md:text-[44px] lg:text-[50px] leading-[1.12] mb-6"
          >
            {title.includes("Digital Solution") ? (
              <>
                Modern Technologies Powering Our{" "}
                <HighlightWord>Digital Solution</HighlightWord>
              </>
            ) : (
              title
            )}
          </SectionHeading>

          {/* Subtitle */}
          <SectionParagraph 
            size="lg" 
            theme="slate" 
            className="max-w-[480px] mb-8"
          >
            {subtitle}
          </SectionParagraph>

          {/* CTA Button */}
          <Link href="#Technologies" className="inline-block group">
            <button 
              className="bg-[#36963D] hover:bg-[#2e8234] text-white px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5"
            >
              <ButtonText className="text-sm sm:text-base text-white">{buttonText}</ButtonText>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
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
      </div>
    </section>
  );
};

export default TechnologiesHero;

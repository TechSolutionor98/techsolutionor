"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Sparkles, Users, Award, ShieldCheck } from "lucide-react";
import { getCmsVal } from "@/lib/api-helper";
import { SectionBadge, HighlightWord } from "@/components/Typography";

export default function CareerHero({ cmsContent }) {
  const badge = getCmsVal(cmsContent, "WE ARE EXPANDING OUR GLOBAL TEAM", "careerhero");
  const title = getCmsVal(
    cmsContent,
    "Build Your Career With A High-Impact Team of Visionaries.",
    "careerhero"
  );
  const subtitle = getCmsVal(
    cmsContent,
    "We are looking for creative thinkers, passionate developers, and digital craftspeople to build next-generation software, scalable enterprise platforms, and award-winning digital experiences.",
    "careerhero"
  );
  const cta1 = getCmsVal(cmsContent, "Explore Roles & Apply", "careerhero");
  const cta2 = getCmsVal(cmsContent, "Apply Now", "careerhero");
  const image = getCmsVal(cmsContent, "/images/career-hero.png", "careerhero");

  const scrollTo = (id) => {
    const el = document.getElementById(id) || document.getElementById('application-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-[#FFFFFF] text-[#0D0F12] overflow-hidden min-h-[560px] flex items-center py-14 md:py-20 select-none">
      <div className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 md:px-10 flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-14">
        {/* Left Content */}
        <div className="w-full lg:w-7/12 text-left">
          {/* Eyebrow Pill Badge */}
          <div className="mb-5 sm:mb-6">
            <SectionBadge variant="light">
              <span>{badge}</span>
            </SectionBadge>
          </div>

          {/* Main Headline */}
          <h1 className="font-display uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] leading-[1.08] sm:leading-[1.02] text-[#0D0F12] mb-5 sm:mb-6">
            {title.includes("Visionaries") ? (
              <>
                Build Your Career With <br />
                A High-Impact Team of <br />
                <HighlightWord>Visionaries.</HighlightWord>
              </>
            ) : (
              title
            )}
          </h1>

          {/* Subtitle */}
          <p className="font-jakarta text-[#4A5568] text-base md:text-[17px] max-w-[540px] mb-8 leading-relaxed font-normal sm:font-medium tracking-[-0.01em]">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button 
              onClick={() => scrollTo('application-form')}
              className="bg-[#41B349] hover:bg-[#36963D] text-white px-8 py-3.5 rounded-full font-jakarta font-semibold tracking-[-0.01em] text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5 group"
            >
              <span>{cta1}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => scrollTo('application-form')}
              className="bg-white hover:bg-gray-50 text-[#0D0F12] border border-gray-300 hover:border-[#41B349] px-7 py-3.5 rounded-full font-jakarta font-semibold tracking-[-0.01em] text-sm sm:text-base transition-all duration-300 shadow-xs hover:shadow-sm cursor-pointer flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-[#41B349]" />
              <span>{cta2}</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-200/80 font-jakarta">
            <div>
              <p className="font-display uppercase tracking-tight text-2xl sm:text-3xl text-[#0D0F12]">50+</p>
              <p className="font-jakarta text-xs text-[#64748B] font-medium uppercase tracking-wider mt-1">Engineers & Creatives</p>
            </div>
            <div>
              <p className="font-display uppercase tracking-tight text-2xl sm:text-3xl text-[#41B349]">15+</p>
              <p className="font-jakarta text-xs text-[#64748B] font-medium uppercase tracking-wider mt-1">Global Countries Served</p>
            </div>
            <div>
              <p className="font-display uppercase tracking-tight text-2xl sm:text-3xl text-[#0D0F12]">98%</p>
              <p className="font-jakarta text-xs text-[#64748B] font-medium uppercase tracking-wider mt-1">Team Retention Rate</p>
            </div>
            <div>
              <p className="font-display uppercase tracking-tight text-2xl sm:text-3xl text-[#41B349]">4.9/5</p>
              <p className="font-jakarta text-xs text-[#64748B] font-medium uppercase tracking-wider mt-1">Employee Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Right Content - Visual Graphic with floating modern badges */}
        <div className="w-full lg:w-5/12 flex justify-center items-center relative">
          <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[460px] md:h-[460px]">
            {/* Ambient circular frame backdrop */}
            <div className="absolute inset-2 rounded-3xl bg-gradient-to-tr from-[#36963D]/10 via-[#36963D]/5 to-transparent pointer-events-none" />
            
            {/* Visual Image */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              {typeof image === 'string' && (image.startsWith('http') || image.startsWith('/')) ? (
                <img 
                  src={image} 
                  alt="Tech Solutionor Recruitment" 
                  className="w-full h-full object-contain filter drop-shadow-md hover:scale-102 transition-transform duration-500"
                />
              ) : (
                <Image 
                  src="/images/career-hero.png" 
                  alt="Tech Solutionor Recruitment" 
                  fill 
                  priority
                  unoptimized
                  className="object-contain filter drop-shadow-md hover:scale-102 transition-transform duration-500"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { ArrowRight, Briefcase } from "lucide-react";
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

  const scrollTo = (id) => {
    const el = document.getElementById(id) || document.getElementById('application-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-[#FFFFFF] text-[#0D0F12] overflow-hidden min-h-[520px] flex items-center py-16 md:py-24 select-none">
      <div className="relative z-10 max-w-[1080px] mx-auto px-5 sm:px-8 md:px-10 flex flex-col items-center text-center w-full">
        {/* Eyebrow Pill Badge */}
        <div className="mb-6 flex justify-center">
          <SectionBadge variant="light">
            <span>{badge}</span>
          </SectionBadge>
        </div>

        {/* Main Headline */}
        <h1 className="font-display uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[62px] leading-[1.08] sm:leading-[1.03] text-[#0D0F12] mb-6 text-center max-w-4xl mx-auto">
          {title.includes("Visionaries") ? (
            <>
              Build Your Career With <br className="hidden sm:inline" />
              A High-Impact Team of <br className="hidden sm:inline" />
              <HighlightWord>Visionaries.</HighlightWord>
            </>
          ) : (
            title
          )}
        </h1>

        {/* Subtitle */}
        <p className="font-jakarta text-[#4A5568] text-base md:text-[18px] max-w-[680px] mx-auto mb-8 sm:mb-10 leading-relaxed font-normal sm:font-medium tracking-[-0.01em] text-center">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 sm:mb-14">
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
        <div className="w-full max-w-[840px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 font-jakarta text-center">
          <div className="flex flex-col items-center">
            <p className="font-display uppercase tracking-tight text-2xl sm:text-3xl text-[#0D0F12]">50+</p>
            <p className="font-jakarta text-xs text-[#64748B] font-medium uppercase tracking-wider mt-1.5">Engineers & Creatives</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-display uppercase tracking-tight text-2xl sm:text-3xl text-[#41B349]">15+</p>
            <p className="font-jakarta text-xs text-[#64748B] font-medium uppercase tracking-wider mt-1.5">Global Countries Served</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-display uppercase tracking-tight text-2xl sm:text-3xl text-[#0D0F12]">98%</p>
            <p className="font-jakarta text-xs text-[#64748B] font-medium uppercase tracking-wider mt-1.5">Team Retention Rate</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-display uppercase tracking-tight text-2xl sm:text-3xl text-[#41B349]">4.9/5</p>
            <p className="font-jakarta text-xs text-[#64748B] font-medium uppercase tracking-wider mt-1.5">Employee Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}

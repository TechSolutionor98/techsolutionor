"use client";

import React from "react";
import Image from "next/image";
import TechBg from "@/components/Images/technologybannerbg.svg";
import TechHeroConstellation from "@/app/_components/Technologies/TechHeroConstellation";
import { ArrowRight, Sparkles } from "lucide-react";
import { getCmsVal } from "@/lib/api-helper";
import { ButtonText } from "@/components/Typography";

export default function CareerHero({ cmsContent }) {
  const badge = getCmsVal(cmsContent, "WE ARE EXPANDING OUR GLOBAL TEAM • CAREERS", "careerhero");
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
  const cta2 = getCmsVal(cmsContent, "Submit Application", "careerhero");

  const scrollTo = (id) => {
    const el = document.getElementById(id) || document.getElementById("application-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Split heading into architectural lines matching Services standards
  const getHeadingLines = () => {
    const raw = title.trim();
    if (raw.toLowerCase().includes("visionaries")) {
      return {
        line1: "Build Your Career With",
        line2: "A High-Impact Team Of",
        line3: "Global Visionaries.",
      };
    }

    const words = raw.split(/\s+/);
    if (words.length <= 3) {
      return { line1: raw, line2: "", line3: "" };
    }
    if (words.length <= 6) {
      const mid = Math.ceil(words.length / 2);
      return {
        line1: words.slice(0, mid).join(" "),
        line2: words.slice(mid).join(" "),
        line3: "",
      };
    }
    const chunk1 = Math.ceil(words.length / 3);
    const chunk2 = Math.ceil((words.length * 2) / 3);
    return {
      line1: words.slice(0, chunk1).join(" "),
      line2: words.slice(chunk1, chunk2).join(" "),
      line3: words.slice(chunk2).join(" "),
    };
  };

  const { line1, line2, line3 } = getHeadingLines();

  // Refine description to a clean, punchy 1-2 sentence statement
  const getCleanDescription = (text) => {
    if (!text) return "";
    const sentences = text.match(/[^.!?]+[.!?]+/g);
    if (sentences && sentences.length >= 2) {
      return sentences.slice(0, 2).join(" ").trim();
    }
    return text.trim();
  };

  const refinedDescription = getCleanDescription(subtitle);

  return (
    <section className="relative w-full bg-white text-[#0D0F12] overflow-hidden pt-8 sm:pt-12 md:pt-14 lg:pt-16 pb-16 sm:pb-24 md:pb-28 lg:pb-32 select-none border-b border-gray-100/80">
      {/* Ambient Multi-Layer Lighting Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] lg:w-[1250px] h-[460px] lg:h-[580px] bg-[radial-gradient(circle_at_top,_rgba(46,130,52,0.13)_0%,_rgba(46,130,52,0.03)_50%,_transparent_75%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[450px] h-[360px] bg-[radial-gradient(ellipse_at_top_left,_rgba(36,117,41,0.22)_0%,_rgba(46,130,52,0.05)_50%,_transparent_75%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] sm:w-[850px] h-[320px] bg-[radial-gradient(ellipse_at_center,_rgba(197,160,89,0.06)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#2E823410_1.2px,transparent_1.2px)] [background-size:28px_28px] pointer-events-none opacity-50" />

      {/* Subtle Geometric Background Corner Accent */}
      <div className="absolute top-0 left-0 opacity-75 sm:opacity-80 pointer-events-none [mask-image:linear-gradient(135deg,black_70%,transparent_100%)]">
        <Image
          src={TechBg}
          alt="Career Geometric Background"
          width={420}
          height={420}
          className="w-[340px] object-contain"
        />
      </div>

      {/* Animated Constellation Graph Network (Green & Black on White Background) */}
      <TechHeroConstellation />

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 text-center flex flex-col items-center justify-center">
        {/* Modern Pill Badge */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#41B349]/[0.08] border border-[#41B349]/25 text-[#247B2A] text-xs sm:text-[13px] font-jakarta font-semibold tracking-wider uppercase shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#41B349] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E8234]"></span>
            </span>
            <span>{badge}</span>
          </div>
        </div>

        {/* --- Monumental Headline Architecture matching Services --- */}
        <div className="w-full max-w-5xl xl:max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="font-display uppercase tracking-[-0.035em] text-[#0D0F12] text-3xl min-[360px]:text-4xl min-[420px]:text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] leading-[0.95] sm:leading-[0.92] text-center w-full">
            <span className="block text-[#0D0F12]">
              {line1}
            </span>
            {line2 && (
              <span className="block mt-1.5 sm:mt-2.5 text-[#0D0F12]/95">
                {line2}
              </span>
            )}
            {line3 && (
              <span className="block mt-2 sm:mt-3.5 text-transparent bg-clip-text bg-gradient-to-r from-[#247529] via-[#41B349] to-[#2E8234] italic font-display">
                {line3}
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
          <button
            onClick={() => scrollTo("application-form")}
            className="group bg-[#2E8234] hover:bg-[#256f2c] text-white px-9 sm:px-11 py-4 sm:py-4.5 rounded-full font-jakarta font-semibold text-base sm:text-[17px] shadow-[0_12px_32px_rgba(46,130,52,0.28)] hover:shadow-[0_16px_42px_rgba(46,130,52,0.42)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
            <ButtonText className="text-sm sm:text-base text-white font-semibold">{cta1}</ButtonText>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollTo("application-form")}
            className="bg-transparent hover:bg-[#2E8234]/10 text-[#0D0F12] hover:text-[#2E8234] border-2 border-[#0D0F12]/20 hover:border-[#2E8234] px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-jakarta font-semibold text-base transition-all duration-300 cursor-pointer flex items-center gap-2"
          >
            <ButtonText className="text-sm sm:text-base text-[#0D0F12] hover:text-[#2E8234]">{cta2}</ButtonText>
          </button>
        </div>
      </div>
    </section>
  );
}

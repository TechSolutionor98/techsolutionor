'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Sparkles } from 'lucide-react';
import portfolioBanner from '@/components/Images/portfoliobanner.png';
import TechBg from '@/components/Images/technologybannerbg.svg';
import { getCmsVal } from '@/lib/api-helper';
import { ButtonText } from '@/components/Typography';

const PortfolioBanner = ({ cmsContent }) => {
  const badge = getCmsVal(cmsContent, "Real-World Client Case Studies", "portfoliobanner");
  const heading = getCmsVal(
    cmsContent,
    "Our Portfolio of Digital Projects & Client Success Stories",
    "portfoliobanner"
  );
  const description = getCmsVal(
    cmsContent,
    "Welcome to our portfolio of innovative digital solutions! At TechSolutionor, we specialize in delivering custom software and technology solutions that drive measurable business success. Explore our projects across various industries to see how we combine creativity, technology, and strategic expertise to deliver cutting-edge solutions tailored to each client’s needs.",
    "portfoliobanner"
  );
  const cta1 = getCmsVal(cmsContent, "Explore Case Studies", "portfoliobanner");
  const cta2 = getCmsVal(cmsContent, "Start Your Project", "portfoliobanner");
  const defaultImg = portfolioBanner?.src || portfolioBanner;
  const image = getCmsVal(cmsContent, defaultImg, "portfoliobanner");

  const scrollToProjects = () => {
    const el = document.getElementById('portfolio-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Clean & split heading into architectural lines matching Services standards
  const getHeadingLines = () => {
    const raw = heading.trim();
    if (raw === "Our Portfolio of Digital Projects & Client Success Stories") {
      return {
        line1: "OUR PORTFOLIO OF",
        line2: "DIGITAL PROJECTS &",
        line3: "CLIENT SUCCESS STORIES.",
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

  const refinedDescription = getCleanDescription(description);

  return (
    <section className="relative w-full bg-white text-[#0D0F12] overflow-hidden pt-8 sm:pt-12 md:pt-14 lg:pt-16 pb-16 sm:pb-24 md:pb-28 lg:pb-32 select-none border-b border-gray-100/80">
      {/* Ambient Multi-Layer Lighting Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] lg:w-[1250px] h-[460px] lg:h-[580px] bg-[radial-gradient(circle_at_top,_rgba(65,179,73,0.13)_0%,_rgba(65,179,73,0.03)_50%,_transparent_75%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] sm:w-[850px] h-[320px] bg-[radial-gradient(ellipse_at_center,_rgba(197,160,89,0.06)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#41B34910_1.2px,transparent_1.2px)] [background-size:28px_28px] pointer-events-none opacity-50" />

      {/* Subtle Geometric Background Corner Accent */}
      <div className="absolute top-0 left-0 opacity-15 pointer-events-none">
        <Image
          src={TechBg}
          alt="Geometric Background Accent"
          width={420}
          height={420}
          className="w-[340px] object-contain"
        />
      </div>

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

        {/* --- Monumental Headline Architecture --- */}
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
            onClick={scrollToProjects}
            className="group bg-[#2E8234] hover:bg-[#256f2c] text-white px-9 sm:px-11 py-4 sm:py-4.5 rounded-full font-jakarta font-semibold text-base sm:text-[17px] shadow-[0_10px_35px_rgba(46,130,52,0.32)] hover:shadow-[0_14px_45px_rgba(46,130,52,0.45)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer"
          >
            <ButtonText className="text-sm sm:text-base text-white font-semibold">{cta1}</ButtonText>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
          </button>

          <Link
            href="/hire-us"
            className="inline-block group"
          >
            <button
              className="bg-transparent hover:bg-[#2E8234]/10 text-[#0D0F12] hover:text-[#2E8234] border-2 border-[#0D0F12]/20 hover:border-[#2E8234] px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-jakarta font-semibold text-base transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#2E8234]" />
              <ButtonText className="text-sm sm:text-base text-[#0D0F12] hover:text-[#2E8234]">{cta2}</ButtonText>
            </button>
          </Link>
        </div>

        {/* Right Content - Visual Banner Image (Preserved & safely disabled so it can be restored later if needed) */}
        {/*
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative z-10 w-full max-w-[480px]">
            {typeof image === 'string' && (image.startsWith('http') || image.startsWith('/')) ? (
              <img
                src={image}
                alt="TechSolutionor Portfolio of Digital Projects"
                className="w-full h-auto object-contain"
              />
            ) : (
              <Image
                src={portfolioBanner}
                alt="TechSolutionor Portfolio of Digital Projects"
                width={600}
                height={500}
                className="w-full h-auto object-contain"
                priority
              />
            )}
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

export default PortfolioBanner;

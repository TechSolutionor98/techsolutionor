"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { getCmsVal } from "@/lib/api-helper";

export const defaultHomeHero = {
  title: "Digital Marketing Agency in Dubai – Web Development & SEO Services for Business Growth",
  description:
    "Serving businesses across the world, with a strong focus on helping companies in Dubai and the UAE grow through smart digital solutions.",
  buttonText: "Get a Free Quote",
};

const HomeBanner = ({ content, cmsContent }) => {

  const heroContent = useMemo(
    () => ({ ...defaultHomeHero, ...(content || {}) }),
    [content]
  );

  const rawTitle = heroContent.title?.trim() || defaultHomeHero.title;
  const rawDescription = heroContent.description?.trim() || defaultHomeHero.description;
  const rawButtonText = heroContent.buttonText?.trim() || defaultHomeHero.buttonText;

  const bannerTitle = getCmsVal(cmsContent, rawTitle, "homebanner") || getCmsVal(cmsContent, rawTitle, "hero");
  const bannerDescription = getCmsVal(cmsContent, rawDescription, "homebanner") || getCmsVal(cmsContent, rawDescription, "hero");
  const bannerButtonText = getCmsVal(cmsContent, rawButtonText, "homebanner") || getCmsVal(cmsContent, rawButtonText, "hero");
  const bannerButtonLink = "/claim-your-free-seo-audit";

  const descriptionLines = typeof bannerDescription === "string"
    ? bannerDescription.split("\n").filter(Boolean)
    : [bannerDescription];

  // Helper to format title with matching Toonbee reference pill badge & heavy typography style
  const renderTitle = (titleString) => {
    if (!titleString) return null;

    // Check if title includes delimiter " – " (or default string format)
    if (titleString.includes(" – ")) {
      const parts = titleString.split(" – ");
      const firstLine = parts[0];
      const secondLineRaw = parts[1] || "";

      let middlePillText = secondLineRaw;
      let bottomLineText = "";

      if (secondLineRaw.toLowerCase().includes(" for ")) {
        const idx = secondLineRaw.toLowerCase().indexOf(" for ");
        middlePillText = secondLineRaw.substring(0, idx).trim();
        bottomLineText = secondLineRaw.substring(idx).trim();
      }

      return (
        <div className="flex flex-col items-center justify-center text-center space-y-2 sm:space-y-3">
          {/* Top Line */}
          <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-black text-[#0D0F12] leading-[1.1] tracking-tight">
            {firstLine}
          </span>

          {/* Middle Line inside Pill Badge with Gentle, Subtle Left-Entrance Animation */}
          <motion.div 
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative inline-flex items-center justify-center my-1.5 sm:my-2.5 group"
          >
            <span className="px-5 sm:px-9 py-2 sm:py-3.5 rounded-full bg-[#41B349] text-[#FCFCFC] shadow-[0_12px_35px_rgba(65,179,73,0.35)] border-2 sm:border-[3px] border-[#FFE7A8] text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight leading-none inline-block transform hover:scale-[1.02] transition-transform duration-300">
              {middlePillText}
            </span>
          </motion.div>

          {/* Bottom Line */}
          {bottomLineText && (
            <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-black text-[#0D0F12] leading-[1.1] tracking-tight relative">
              <span className="text-[#41B349] text-3xl sm:text-5xl font-serif mr-1 sm:mr-2" aria-hidden="true">&lsquo;</span>
              {bottomLineText}
              <span className="text-[#41B349] text-3xl sm:text-5xl font-serif ml-1 sm:ml-2" aria-hidden="true">&rsquo;</span>
            </span>
          )}
        </div>
      );
    }

    // Fallback for custom title strings without " – "
    return (
      <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-black text-[#0D0F12] leading-[1.15] tracking-tight">
        {titleString}
      </span>
    );
  };

  return (
    <section 
      className="relative overflow-hidden w-full flex items-center justify-center py-10 lg:py-16 select-none"
      style={{
        background: "linear-gradient(135deg, #41B349 0%, rgba(65, 179, 73, 0.45) 30%, rgba(255, 231, 168, 0.2) 60%, #FFFFFF 100%)",
      }}
    >
      {/* Main Centered Content Layout */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

        {/* Main Headline */}
        <div
          className="w-full flex justify-center text-center"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', 'Montserrat', sans-serif" }}
        >
          {renderTitle(bannerTitle)}
        </div>

        {/* Sub-headline / Description */}
        <div 
          className="mt-4 sm:mt-5 text-[#4A5568] text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl font-medium space-y-1.5 text-center"
        >
          {descriptionLines.map((line, index) => (
            <p key={`${line}-${index}`} className="flex items-center justify-center gap-2">
              <span>{line}</span>
            </p>
          ))}
        </div>

        {/* Primary CTA Button */}
        <div 
          className="mt-5 sm:mt-6 flex flex-col items-center gap-4 w-full sm:w-auto"
        >
          <Link href={bannerButtonLink} className="w-full sm:w-auto group">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#41B349] text-[#FCFCFC] text-base sm:text-lg font-bold px-9 sm:px-11 py-4 sm:py-4.5 rounded-full shadow-[0_10px_30px_rgba(65,179,73,0.35)] hover:shadow-[0_15px_40px_rgba(65,179,73,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-[#FFE7A8]/60 shine-btn relative overflow-hidden">
              <span>{bannerButtonText}</span>
              <FaArrowRight size={17} className="transition-transform group-hover:translate-x-1.5" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HomeBanner;


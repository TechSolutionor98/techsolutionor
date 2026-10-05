"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { getCmsVal } from "@/lib/api-helper";
import HeroConstellation from "./HeroConstellation";

export const DEFAULT_GLOBAL_COUNTRIES = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Oman",
  "Kuwait",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Netherlands",
  "Singapore",
  "Malaysia",
  "India",
  "Pakistan",
];

export const DEFAULT_GLOBAL_LOCATIONS = DEFAULT_GLOBAL_COUNTRIES;

export const defaultHomeHero = {
  title: "Digital Marketing Agency in – Web Development & SEO Services for Business Growth",
  description:
    "Serving businesses across the world, with a strong focus on helping companies in Dubai and the UAE grow through smart digital solutions.",
  buttonText: "Get a Free Quote",
};

// Smooth character-by-character reveal and transition variants
const countryContainerVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055, // Reveal character by character from left to right
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const charVariants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.16,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const HomeBanner = ({ content, cmsContent, locations, countries }) => {
  const [countryIndex, setCountryIndex] = useState(0);

  const heroContent = useMemo(
    () => ({ ...defaultHomeHero, ...(content || {}) }),
    [content]
  );

  const activeCountries = useMemo(() => {
    if (Array.isArray(countries) && countries.length > 0) return countries;
    if (Array.isArray(locations) && locations.length > 0) return locations;
    if (Array.isArray(heroContent.countries) && heroContent.countries.length > 0) return heroContent.countries;
    if (Array.isArray(heroContent.locations) && heroContent.locations.length > 0) return heroContent.locations;
    return DEFAULT_GLOBAL_COUNTRIES;
  }, [countries, locations, heroContent.countries, heroContent.locations]);

  // Country animation sequence:
  // 1. Reveal characters one-by-one from left to right
  // 2. Keep full country name visible briefly (~1800ms)
  // 3. Smooth exit transition to the next country (~250ms)
  // 4. Continuously loop through all countries
  useEffect(() => {
    if (activeCountries.length <= 1) return;

    const currentCountry = activeCountries[countryIndex] || "";
    const revealTime = currentCountry.length * 55 + 80;
    const holdTime = 1800;
    const exitTime = 250;
    const totalTime = revealTime + holdTime + exitTime;

    const timer = setTimeout(() => {
      setCountryIndex((prev) => (prev + 1) % activeCountries.length);
    }, totalTime);

    return () => clearTimeout(timer);
  }, [countryIndex, activeCountries]);

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

  // Helper to format title with animated country text and oversized typography style (vmedia.pk inspired)
  const renderTitle = (titleString) => {
    if (!titleString) return null;

    // Check if title includes delimiter " – " (or default string format)
    if (titleString.includes(" – ")) {
      const parts = titleString.split(" – ");
      const firstLineRaw = parts[0] || "";
      const secondLineRaw = parts[1] || "";

      // Clean prefix so it ends naturally with "in"
      let prefix = firstLineRaw
        .replace(/\b(in\s+Globally|in\s+Dubai)\b/gi, "in")
        .replace(/\s+(Globally|Dubai)$/i, "")
        .trim();

      if (!prefix.toLowerCase().endsWith("in")) {
        prefix = `${prefix} in`;
      }

      let middlePillText = secondLineRaw;
      let bottomLineText = "";

      if (secondLineRaw.toLowerCase().includes(" for ")) {
        const idx = secondLineRaw.toLowerCase().indexOf(" for ");
        middlePillText = secondLineRaw.substring(0, idx).trim();
        bottomLineText = secondLineRaw.substring(idx).trim();
      }

      // Parse bottom line for word-focused contrast (e.g. "FOR" in dark, "BUSINESS GROWTH" in green italic)
      let bottomLeadingWord = "";
      let bottomEmphasizedWords = "";

      if (bottomLineText) {
        const match = bottomLineText.trim().match(/^([^\s]+)\s+(.*)$/);
        if (match) {
          bottomLeadingWord = match[1]; // e.g. "for"
          bottomEmphasizedWords = match[2]; // e.g. "Business Growth"
        } else {
          bottomEmphasizedWords = bottomLineText.trim();
        }
      }

      const currentCountry = activeCountries[countryIndex] || "";

      return (
        <div className="flex flex-col items-center justify-center text-center w-full max-w-6xl mx-auto">
          {/* Top Line: DIGITAL MARKETING AGENCY IN [COUNTRY] */}
          <div className="w-full text-center">
            <h1 className="font-display uppercase tracking-tight text-xl min-[360px]:text-2xl min-[420px]:text-[28px] sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] leading-[1.08] sm:leading-[1.02] text-[#0D0F12]">
              <span className="inline">{prefix} </span>
              <span className="inline-block whitespace-nowrap align-baseline text-[#41B349]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentCountry}
                    variants={countryContainerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="inline-block text-[#41B349]"
                  >
                    {currentCountry.split("").map((char, idx) => (
                      <motion.span
                        key={`${currentCountry}-${idx}`}
                        variants={charVariants}
                        className="inline-block"
                        style={{ whiteSpace: "pre" }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </div>

          {/* Middle Line inside Oversized Pill Badge (vmedia.pk inspired) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative inline-flex items-center justify-center mt-2 sm:mt-2.5 md:mt-3 group max-w-full"
          >
            <span className="font-display uppercase tracking-tight text-lg min-[360px]:text-xl min-[420px]:text-2xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] px-4 min-[360px]:px-6 sm:px-9 md:px-11 lg:px-12 py-1.5 sm:py-2.5 md:py-3 rounded-full bg-[#41B349] text-white shadow-[0_10px_35px_rgba(65,179,73,0.32)] md:shadow-[0_18px_50px_rgba(65,179,73,0.42)] border-2 sm:border-[2.5px] border-[#FFE7A8] leading-tight sm:leading-none inline-block text-center transform hover:scale-[1.02] transition-transform duration-300">
              {middlePillText}
            </span>
          </motion.div>

          {/* Bottom Line: Word-focused Oversized Punchline (vmedia.pk inspired) */}
          {bottomEmphasizedWords && (
            <div className="w-full text-center mt-2 sm:mt-2.5 md:mt-3">
              <span className="font-display uppercase tracking-tight text-2xl min-[360px]:text-3xl min-[420px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] leading-[1.05] sm:leading-[0.98] text-[#0D0F12] inline-flex items-center justify-center flex-wrap">
                <RiDoubleQuotesL
                  className="w-4 h-4 min-[360px]:w-5 min-[360px]:h-5 min-[420px]:w-6 min-[420px]:h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 text-[#C5A059] shrink-0 mr-1.5 min-[420px]:mr-2 sm:mr-3 md:mr-3.5 self-start mt-0.5 sm:mt-1 md:mt-1.5 select-none"
                  aria-hidden="true"
                />
                {bottomLeadingWord && (
                  <span className="inline-block text-[#0D0F12] mr-2 sm:mr-3.5">
                    {bottomLeadingWord}
                  </span>
                )}
                <span className="text-[#41B349] italic font-display inline-block">
                  {bottomEmphasizedWords}
                </span>
                <RiDoubleQuotesR
                  className="w-4 h-4 min-[360px]:w-5 min-[360px]:h-5 min-[420px]:w-6 min-[420px]:h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 text-[#C5A059] shrink-0 ml-1.5 min-[420px]:ml-2 sm:ml-3 md:ml-3.5 self-start mt-0.5 sm:mt-1 md:mt-1.5 select-none"
                  aria-hidden="true"
                />
              </span>
            </div>
          )}
        </div>
      );
    }

    // Fallback for custom title strings without " – "
    if (titleString.toLowerCase().includes("for business growth")) {
      const idx = titleString.toLowerCase().indexOf("for business growth");
      const leadingPart = titleString.substring(0, idx).trim();
      return (
        <h1 className="font-display uppercase tracking-tight text-3xl min-[420px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] leading-[1.05] sm:leading-[0.98] text-[#0D0F12] max-w-5xl mx-auto text-center">
          {leadingPart && <span>{leadingPart} </span>}
          <span className="inline-flex items-center justify-center flex-wrap">
            <RiDoubleQuotesL
              className="w-4 h-4 min-[360px]:w-5 min-[360px]:h-5 min-[420px]:w-6 min-[420px]:h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 text-[#C5A059] shrink-0 mr-1.5 min-[420px]:mr-2 sm:mr-3 md:mr-3.5 self-start mt-0.5 sm:mt-1 md:mt-1.5 select-none"
              aria-hidden="true"
            />
            <span className="inline-block text-[#0D0F12] mr-2 sm:mr-3.5">FOR</span>
            <span className="text-[#41B349] italic font-display inline-block">BUSINESS GROWTH</span>
            <RiDoubleQuotesR
              className="w-4 h-4 min-[360px]:w-5 min-[360px]:h-5 min-[420px]:w-6 min-[420px]:h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 text-[#C5A059] shrink-0 ml-1.5 min-[420px]:ml-2 sm:ml-3 md:ml-3.5 self-start mt-0.5 sm:mt-1 md:mt-1.5 select-none"
              aria-hidden="true"
            />
          </span>
        </h1>
      );
    }
    const words = titleString.trim().split(/\s+/);
    if (words.length > 2) {
      const leadingWords = words.slice(0, -2).join(" ");
      const accentWords = words.slice(-2).join(" ");
      return (
        <h1 className="font-display uppercase tracking-tight text-3xl min-[420px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] leading-[1.05] sm:leading-[0.98] text-[#0D0F12] max-w-5xl mx-auto text-center">
          <span>{leadingWords} </span>
          <span className="text-[#41B349] italic font-display">{accentWords}</span>
        </h1>
      );
    }

    return (
      <h1 className="font-display uppercase tracking-tight text-3xl min-[420px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] leading-[1.05] sm:leading-[0.98] text-[#0D0F12] max-w-5xl mx-auto text-center">
        {titleString}
      </h1>
    );
  };

  return (
    <section
      className="relative overflow-hidden w-full flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24"
      style={{
        background: "linear-gradient(135deg, #41B349 0%, rgba(65, 179, 73, 0.45) 30%, rgba(255, 231, 168, 0.2) 60%, #FFFFFF 100%)",
      }}
    >
      {/* Interactive Constellation / Network Background Animation */}
      <HeroConstellation />

      {/* Main Centered Content Layout */}
      <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

        {/* Main Headline */}
        <div className="w-full flex justify-center text-center">
          {renderTitle(bannerTitle)}
        </div>

        {/* Sub-headline / Description */}
        <div
          className="mt-3 sm:mt-3.5 md:mt-4 text-[#4A5568] text-sm sm:text-base md:text-[17px] lg:text-[18px] leading-relaxed md:leading-[1.65] max-w-2xl font-normal sm:font-medium space-y-1 sm:space-y-1.5 text-center px-3 sm:px-0 font-jakarta tracking-[-0.01em]"
        >
          {descriptionLines.map((line, index) => (
            <p key={`${line}-${index}`} className="flex items-center justify-center gap-2">
              <span>{line}</span>
            </p>
          ))}
        </div>

        {/* Primary CTA Button */}
        <div
          className="mt-4 sm:mt-4.5 md:mt-5 flex flex-col items-center gap-4 w-full sm:w-auto"
        >
          <Link href={bannerButtonLink} className="w-full sm:w-auto group">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 bg-[#41B349] text-[#FCFCFC] font-jakarta font-semibold text-sm sm:text-base md:text-[16.5px] tracking-[-0.01em] px-8 sm:px-10 md:px-11 py-3.5 sm:py-4 rounded-full shadow-[0_10px_30px_rgba(65,179,73,0.35)] hover:shadow-[0_15px_40px_rgba(65,179,73,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-[#FFE7A8]/60 shine-btn relative overflow-hidden">
              <span>{bannerButtonText}</span>
              <FaArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HomeBanner;


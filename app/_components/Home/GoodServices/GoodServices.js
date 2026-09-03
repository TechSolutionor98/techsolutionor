"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCheckCircle, FaShieldAlt, FaBullseye, FaRocket, FaAward } from "react-icons/fa";
import { useQuote } from "@/app/_context/QuoteContext";
import GoodServicess from '../../../../components/Images/goodservices.png';
import Value from '../../../../components/Images/value.png';
import Mission from '../../../../components/Images/mission.png';
import Goal from '../../../../components/Images/goal.png';
import { getCmsVal } from "@/lib/api-helper";

// Honeycomb Left SVG Accent (matching design reference screenshot)
const HoneycombPatternLeft = () => (
  <svg
    className="absolute left-0 top-1/3 -translate-y-1/2 w-64 sm:w-80 md:w-[420px] h-auto pointer-events-none opacity-30 z-0 hidden sm:block"
    viewBox="0 0 300 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="#41B349" strokeWidth="1.5" strokeOpacity="0.35">
      <polygon points="50,50 90,25 130,50 130,100 90,125 50,100" />
      <polygon points="130,50 170,25 210,50 210,100 170,125 130,100" />
      <polygon points="10,125 50,100 90,125 90,175 50,200 10,175" />
      <polygon points="90,125 130,100 170,125 170,175 130,200 90,175" />
      <polygon points="170,125 210,100 250,125 250,175 210,200 170,175" />
      <polygon points="50,200 90,175 130,200 130,250 90,275 50,250" />
      <polygon points="130,200 170,175 210,200 210,250 170,275 130,250" />
      <polygon points="10,275 50,250 90,275 90,325 50,350 10,325" />
      <polygon points="90,275 130,250 170,275 170,325 130,350 90,325" />
      <polygon points="170,275 210,250 250,275 250,325 210,350 170,325" />
      <polygon points="50,350 90,325 130,350 130,400 90,425 50,400" />
      <polygon points="130,350 170,325 210,350 210,400 170,425 130,400" />
      <polygon points="90,425 130,400 170,425 170,475 130,500 90,475" />
    </g>
    <polygon points="10,125 50,100 90,125 90,175 50,200 10,175" fill="#41B349" fillOpacity="0.85" />
    <polygon points="170,275 210,250 250,275 250,325 210,350 170,325" fill="#41B349" fillOpacity="0.85" />
  </svg>
);

// Honeycomb Right SVG Accent (matching design reference screenshot)
const HoneycombPatternRight = () => (
  <svg
    className="absolute right-0 top-1/3 -translate-y-1/2 w-64 sm:w-80 md:w-[420px] h-auto pointer-events-none opacity-30 z-0 hidden sm:block"
    viewBox="0 0 300 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="#41B349" strokeWidth="1.5" strokeOpacity="0.35">
      <polygon points="170,50 210,25 250,50 250,100 210,125 170,100" />
      <polygon points="90,50 130,25 170,50 170,100 130,125 90,100" />
      <polygon points="210,125 250,100 290,125 290,175 250,200 210,175" />
      <polygon points="130,125 170,100 210,125 210,175 170,200 130,175" />
      <polygon points="50,125 90,100 130,125 130,175 90,200 50,175" />
      <polygon points="170,200 210,175 250,200 250,250 210,275 170,250" />
      <polygon points="90,200 130,175 170,200 170,250 130,275 90,250" />
      <polygon points="210,275 250,250 290,275 290,325 250,350 210,325" />
      <polygon points="130,275 170,250 210,275 210,325 170,350 130,325" />
      <polygon points="50,275 90,250 130,275 130,325 90,350 50,325" />
      <polygon points="170,350 210,325 250,350 250,400 210,425 170,400" />
      <polygon points="90,350 130,325 170,350 170,400 130,425 90,400" />
      <polygon points="130,425 170,400 210,425 210,475 170,500 130,475" />
    </g>
    <polygon points="210,125 250,100 290,125 290,175 250,200 210,175" fill="#41B349" fillOpacity="0.85" />
    <polygon points="90,350 130,325 170,350 170,400 130,425 90,400" fill="#41B349" fillOpacity="0.85" />
  </svg>
);

// Curved SVG Arrow Left (pointing to Left Card)
const CurvedArrowLeft = () => (
  <svg
    className="w-12 h-12 sm:w-16 sm:h-16 text-[#41B349] rotate-[-20deg] transform scale-x-[-1] drop-shadow"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20,20 C40,10 75,30 65,75 C63,80 58,88 42,82"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M38,72 L42,82 L53,74"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Curved SVG Arrow Right (pointing to Right Card)
const CurvedArrowRight = () => (
  <svg
    className="w-12 h-12 sm:w-16 sm:h-16 text-[#41B349] rotate-[20deg] drop-shadow"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20,20 C40,10 75,30 65,75 C63,80 58,88 42,82"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M38,72 L42,82 L53,74"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GoodServices = ({ cmsContent }) => {
  const [inView, setInView] = useState(false);
  const barRef = useRef(null);
  const { openQuote } = useQuote();

  const headingLine1 = getCmsVal(cmsContent, "You Can Rely on Us for", "goodservices");
  const headingLine2 = getCmsVal(cmsContent, "High-Quality Digital & IT Services", "goodservices");
  const paragraph1 = getCmsVal(
    cmsContent,
    "TECHSOLUTIONOR was founded to address the growing demand for expert IT advisory, web development, and digital solutions for businesses worldwide. Our mission is to help companies improve efficiency, maximize productivity, and achieve sustainable growth through cutting-edge technology and data-driven strategies.",
    "goodservices"
  );
  const paragraph2 = getCmsVal(
    cmsContent,
    "We believe in long-term partnerships, not one-time projects. By understanding your business challenges, goals, and market, especially within the UAE and global landscape, we deliver customized solutions that drive real results. Partner with TECHSOLUTIONOR to innovate, scale, and stay ahead in a competitive digital world.",
    "goodservices"
  );
  const serviceExcellenceTitle = getCmsVal(cmsContent, "Service Excellence", "goodservices");
  const serviceExcellencePercent = getCmsVal(cmsContent, "90", "goodservices");
  const getInTouchTitle = getCmsVal(cmsContent, "Get In Touch", "goodservices");
  const clientSatisfactionText = getCmsVal(cmsContent, "90% Client Satisfaction", "goodservices");
  const quoteButtonText = getCmsVal(cmsContent, "Get a Quote", "goodservices");
  const rightImage = getCmsVal(cmsContent, GoodServicess, "goodservices");

  const valuesCard = {
    icon: getCmsVal(cmsContent, Value, "goodservices"),
    title: getCmsVal(cmsContent, "Our Values", "goodservices"),
    list: ["Awareness", "Automation", "Growth", "Success", "Achievement", "Ease of Access"].map(item => getCmsVal(cmsContent, item, "goodservices")),
  };

  const missionCard = {
    icon: getCmsVal(cmsContent, Mission, "goodservices"),
    title: getCmsVal(cmsContent, "Our Mission", "goodservices"),
    list: ["Trust", "Responsibility", "Professionalism", "Client Satisfaction", "24/7 Support", "Customization"].map(item => getCmsVal(cmsContent, item, "goodservices")),
  };

  const goalsCard = {
    icon: getCmsVal(cmsContent, Goal, "goodservices"),
    title: getCmsVal(cmsContent, "Our Goals", "goodservices"),
    list: ["Cooperation", "Quick Services", "Fast Response", "Honesty", "Efficiency", "Integrity"].map(item => getCmsVal(cmsContent, item, "goodservices")),
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!barRef.current) return;
      const rect = barRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setInView(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isRightImgDynamic = typeof rightImage === 'string' && (rightImage.startsWith('http') || rightImage.startsWith('/'));
  const isValuesImgDynamic = typeof valuesCard.icon === 'string' && (valuesCard.icon.startsWith('http') || valuesCard.icon.startsWith('/'));
  const isMissionImgDynamic = typeof missionCard.icon === 'string' && (missionCard.icon.startsWith('http') || missionCard.icon.startsWith('/'));
  const isGoalsImgDynamic = typeof goalsCard.icon === 'string' && (goalsCard.icon.startsWith('http') || goalsCard.icon.startsWith('/'));

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAFCFB] via-[#FFFFFF] to-[#F5F9F6] py-16 md:py-24 select-none">
      {/* Background Honeycomb Patterns (Direct Reference to Screenshot Design) */}
      <HoneycombPatternLeft />
      <HoneycombPatternRight />

      {/* Central Ambient Glow */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_rgba(65,179,73,0.14)_0%,_transparent_65%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header (Matching Design Reference Screenshot Layout) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/20 text-[#41B349] font-extrabold text-xs sm:text-sm uppercase tracking-widest mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#41B349] animate-pulse" />
            <span>ABOUT TECHSOLUTIONOR</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-[#0D0F12] tracking-tight leading-tight" style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}>
            {headingLine1}{" "}
            <span className="text-[#41B349] block sm:inline mt-1 sm:mt-0">{headingLine2}</span>
          </h2>
        </motion.div>

        {/* Dual Showcase Cards with Annotation Callouts (Directly Matching Design Reference) */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Left Side Annotation (Desktop) */}
          <div className="hidden lg:flex absolute -left-12 xl:-left-20 top-2 z-20 flex-col items-end pointer-events-none max-w-[200px]">
            <span className="text-sm md:text-base font-extrabold text-[#0D0F12] tracking-tight text-right leading-snug" style={{ fontFamily: "Montserrat, sans-serif" }}>
              So <span className="text-[#41B349] underline decoration-[#41B349]/40 decoration-2">Tailored</span> businesses scale fast
            </span>
            <CurvedArrowLeft />
          </div>

          {/* Right Side Annotation (Desktop) */}
          <div className="hidden lg:flex absolute -right-12 xl:-right-20 top-2 z-20 flex-col items-start pointer-events-none max-w-[200px]">
            <span className="text-sm md:text-base font-extrabold text-[#0D0F12] tracking-tight text-left leading-snug" style={{ fontFamily: "Montserrat, sans-serif" }}>
              So <span className="text-[#41B349] underline decoration-[#41B349]/40 decoration-2">Advanced</span> global leaders rely on it..
            </span>
            <CurvedArrowRight />
          </div>

          {/* 2-Card Showcase Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            
            {/* CARD 1: Core Mission & Founding Story */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border-[6px] border-white shadow-[0_20px_50px_rgba(65,179,73,0.12)] hover:shadow-[0_30px_60px_rgba(65,179,73,0.22)] rounded-[32px] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#41B349]/10 to-transparent rounded-bl-full pointer-events-none" />
              
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-sm">
                    <FaRocket />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#41B349]">
                    EXPERT IT ADVISORY
                  </span>
                </div>
                
                <p className="text-[#334155] text-base sm:text-lg leading-relaxed font-medium">
                  {paragraph1}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#41B349]/10 text-[#41B349] text-xs font-bold">
                  <FaCheckCircle className="text-xs" /> IT Advisory
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#41B349]/10 text-[#41B349] text-xs font-bold">
                  <FaCheckCircle className="text-xs" /> Web Development
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#41B349]/10 text-[#41B349] text-xs font-bold">
                  <FaCheckCircle className="text-xs" /> Digital Solutions
                </span>
              </div>
            </motion.div>

            {/* CARD 2: Partnership & Global Results + Visual Image Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white border-[6px] border-white shadow-[0_20px_50px_rgba(65,179,73,0.12)] hover:shadow-[0_30px_60px_rgba(65,179,73,0.22)] rounded-[32px] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#41B349]/10 to-transparent rounded-bl-full pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-sm">
                      <FaAward />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#41B349]">
                      LONG-TERM PARTNERSHIPS
                    </span>
                  </div>
                </div>

                <p className="text-[#334155] text-base sm:text-lg leading-relaxed font-medium">
                  {paragraph2}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#41B349]/10 text-[#41B349] text-xs font-bold">
                  <FaCheckCircle className="text-xs" /> Long-Term Partnership
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#41B349]/10 text-[#41B349] text-xs font-bold">
                  <FaCheckCircle className="text-xs" /> Custom Solutions
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#41B349]/10 text-[#41B349] text-xs font-bold">
                  <FaCheckCircle className="text-xs" /> Global Strategy
                </span>
              </div>
            </motion.div>

          </div>

          {/* Service Excellence Modern Animated Progress Metric Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-12 max-w-2xl mx-auto bg-white border border-gray-100 shadow-[0_15px_35px_rgba(0,0,0,0.06)] rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs">
                  <FaCheckCircle />
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#0D0F12]" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {serviceExcellenceTitle}
                </h3>
              </div>
              <span className="text-xl sm:text-2xl font-black text-[#41B349]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {serviceExcellencePercent}%
              </span>
            </div>
            
            <div className="w-full bg-gray-100 rounded-full h-3.5 p-0.5 overflow-hidden">
              <div
                ref={barRef}
                className="h-full bg-gradient-to-r from-[#41B349] to-[#2DA035] rounded-full transition-all duration-1000 ease-out relative"
                style={{
                  width: inView ? `${Number(serviceExcellencePercent) || 90}%` : "0%",
                }}
              >
                <div className="absolute inset-0 bg-white/25 animate-pulse rounded-full" />
              </div>
            </div>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* BENTO-STYLE CREATIVE CORE PILLARS SHOWCASE (VALUES, MISSION & GOALS) */}
        {/* ========================================================================= */}
        <div className="mt-20 md:mt-28">
          
          {/* Section Sub-Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/20 text-[#41B349] font-extrabold text-xs uppercase tracking-widest mb-3">
              <FaShieldAlt className="text-[#41B349]" />
              <span>CORE ARCHITECTURE</span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0D0F12] tracking-tight leading-tight" style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}>
              Our Values, Mission & Goals
            </h3>
            <p className="mt-3 text-[#4A5568] text-base sm:text-lg font-medium">
              The foundational principles driving our technical delivery, client partnerships, and digital innovation.
            </p>
          </div>

          {/* 3-Column Ultra-Premium Bento Grid Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* CARD 1: OUR VALUES */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative bg-[#0D0F12] rounded-3xl p-7 sm:p-8 border border-gray-800 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_rgba(65,179,73,0.25)] hover:border-[#41B349]/70 transform hover:-translate-y-2.5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Glowing Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#41B349] to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div>
                {/* Header Icon Viewport & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#181B24] to-[#11131A] border border-gray-800 flex items-center justify-center group-hover:border-[#41B349]/60 shadow-md transition-colors duration-300">
                    {isValuesImgDynamic ? (
                      <img src={valuesCard.icon} alt="Values" width={28} height={28} className="w-7 h-7 object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <Image src={valuesCard.icon} alt="Values" width={28} height={28} className="w-7 h-7 object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-[#41B349]/15 border border-[#41B349]/30 text-[#41B349] font-black text-xs uppercase tracking-wider">
                    01 • FOUNDATION
                  </span>
                </div>

                {/* Title */}
                <h4 
                  className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#41B349] transition-colors duration-200 mb-3" 
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  {valuesCard.title}
                </h4>

                <p className="text-[#94A3B8] text-sm leading-relaxed font-normal mb-6">
                  Guiding principles driving every client engagement, technical architecture, and digital partnership.
                </p>
              </div>

              {/* Value Items List Chips */}
              <div className="space-y-2.5 pt-4 border-t border-gray-800/80">
                {valuesCard.list.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#161922] border border-gray-800/90 text-white font-bold text-xs sm:text-sm group-hover:border-[#41B349]/40 hover:bg-[#41B349] hover:text-white transition-all duration-200"
                  >
                    <FaCheckCircle className="text-[#41B349] group-hover:text-white shrink-0 transition-colors duration-200" size={14} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CARD 2: OUR MISSION */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group relative bg-[#0D0F12] rounded-3xl p-7 sm:p-8 border border-gray-800 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_rgba(65,179,73,0.25)] hover:border-[#41B349]/70 transform hover:-translate-y-2.5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Glowing Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#41B349] to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div>
                {/* Header Icon Viewport & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#181B24] to-[#11131A] border border-gray-800 flex items-center justify-center group-hover:border-[#41B349]/60 shadow-md transition-colors duration-300">
                    {isMissionImgDynamic ? (
                      <img src={missionCard.icon} alt="Mission" width={28} height={28} className="w-7 h-7 object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <Image src={missionCard.icon} alt="Mission" width={28} height={28} className="w-7 h-7 object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-[#41B349]/15 border border-[#41B349]/30 text-[#41B349] font-black text-xs uppercase tracking-wider">
                    02 • PURPOSE
                  </span>
                </div>

                {/* Title */}
                <h4 
                  className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#41B349] transition-colors duration-200 mb-3" 
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  {missionCard.title}
                </h4>

                <p className="text-[#94A3B8] text-sm leading-relaxed font-normal mb-6">
                  Dedicated commitment to operational excellence, client growth, 24/7 support, and IT advisory.
                </p>
              </div>

              {/* Mission Items List Chips */}
              <div className="space-y-2.5 pt-4 border-t border-gray-800/80">
                {missionCard.list.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#161922] border border-gray-800/90 text-white font-bold text-xs sm:text-sm group-hover:border-[#41B349]/40 hover:bg-[#41B349] hover:text-[#FFFFFF] transition-all duration-200"
                  >
                    <FaCheckCircle className="text-[#41B349] group-hover:text-white shrink-0 transition-colors duration-200" size={14} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CARD 3: OUR GOALS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative bg-[#0D0F12] rounded-3xl p-7 sm:p-8 border border-gray-800 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_rgba(65,179,73,0.25)] hover:border-[#41B349]/70 transform hover:-translate-y-2.5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Glowing Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#41B349] to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div>
                {/* Header Icon Viewport & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#181B24] to-[#11131A] border border-gray-800 flex items-center justify-center group-hover:border-[#41B349]/60 shadow-md transition-colors duration-300">
                    {isGoalsImgDynamic ? (
                      <img src={goalsCard.icon} alt="Goals" width={28} height={28} className="w-7 h-7 object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <Image src={goalsCard.icon} alt="Goals" width={28} height={28} className="w-7 h-7 object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-[#41B349]/15 border border-[#41B349]/30 text-[#41B349] font-black text-xs uppercase tracking-wider">
                    03 • STRATEGY
                  </span>
                </div>

                {/* Title */}
                <h4 
                  className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#41B349] transition-colors duration-200 mb-3" 
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  {goalsCard.title}
                </h4>

                <p className="text-[#94A3B8] text-sm leading-relaxed font-normal mb-6">
                  Delivering rapid response times, transparent cooperation, and efficiency across all projects.
                </p>
              </div>

              {/* Goals Items List Chips */}
              <div className="space-y-2.5 pt-4 border-t border-gray-800/80">
                {goalsCard.list.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#161922] border border-gray-800/90 text-white font-bold text-xs sm:text-sm group-hover:border-[#41B349]/40 hover:bg-[#41B349] hover:text-white transition-all duration-200"
                  >
                    <FaCheckCircle className="text-[#41B349] group-hover:text-white shrink-0 transition-colors duration-200" size={14} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default GoodServices;

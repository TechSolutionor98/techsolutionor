"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCmsVal } from "@/lib/api-helper";

export default function LeadGenProcessFlow({ cmsContent }) {
  const [activeStep, setActiveStep] = useState(0);

  const badge = getCmsVal(cmsContent, "THE PROVEN ACQUISITION BLUEPRINT", "leadgen_process");
  const heading = getCmsVal(cmsContent, "Our Lead Generation Process", "leadgen_process");
  const description = getCmsVal(
    cmsContent,
    "Our battle-tested 6-stage lead generation engine guides prospects seamlessly from first discovery to qualified commercial conversion, ensuring zero wasted ad spend and maximum sales closing efficiency.",
    "leadgen_process"
  );

  const processStages = [
    {
      step: 1,
      name: "Attract",
      titleLine1: "HIGH-INTENT DEMAND.",
      titleLine2: "SUPERCHARGED BY ICP TARGETING.",
      summary:
        "We deploy laser-focused inbound and outbound campaigns targeting your exact Ideal Customer Profile (ICP). By combining high-intent Google Search Ads, algorithmic SEO ranking, LinkedIn Account-Based Marketing (ABM), and precision demographic campaigns, we attract commercial buyers actively searching for your solutions.",
    },
    {
      step: 2,
      name: "Capture",
      titleLine1: "FRICTIONLESS LANDING.",
      titleLine2: "HIGH-VELOCITY CONVERSION.",
      summary:
        "High-intent traffic is directed to sub-second loading dedicated landing pages, interactive cost estimators, ungated B2B whitepapers, and 1-tap WhatsApp click-to-chat funnels engineered with psychological triggers that maximize conversion velocity.",
    },
    {
      step: 3,
      name: "Engage",
      titleLine1: "SPEED-TO-LEAD AUTOMATION.",
      titleLine2: "INSTANT BUYER DIALOGUE.",
      summary:
        "The probability of converting a lead drops by 391% after just 5 minutes of delay. Our automated speed-to-lead engine triggers instant personalized WhatsApp messages, welcome email sequences, and automated SMS alerts within 60 seconds of any submission.",
    },
    {
      step: 4,
      name: "Nurture",
      titleLine1: "MULTI-TOUCH CADENCE.",
      titleLine2: "SYSTEMATIC TRUST BUILDING.",
      summary:
        "Over 70% of high-intent commercial buyers require 5 to 8 value-driven touches before agreeing to a sales consultation. We engineer automated email sequences, LinkedIn retargeting, and proof-point collateral that systematically neutralize objections and build lasting trust.",
    },
    {
      step: 5,
      name: "Qualify",
      titleLine1: "RIGOROUS BANT VERIFICATION.",
      titleLine2: "ZERO WASTED SALES TIME.",
      summary:
        "Your sales executives should never waste valuable time with low-budget tire-kickers. We evaluate every prospect using strict BANT criteria (Budget, Authority, Need, Timeline) and engagement scoring to ensure only legitimate buyers reach your calendar.",
    },
    {
      step: 6,
      name: "Convert",
      titleLine1: "CRM PIPELINE HANDOFF.",
      titleLine2: "CONFIRMED SALES APPOINTMENTS.",
      summary:
        "The culmination of the lead generation engine: qualified, ready-to-buy prospects are seamlessly booked directly onto your sales representatives' calendars with complete conversation histories, intent scores, and tailored proposal briefs.",
    },
  ];

  // Automatic transition at a suitable interval (5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processStages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [processStages.length]);

  const current = processStages[activeStep];

  return (
    <section className="w-full py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden select-none border-b border-gray-100">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4E2C]/10 border border-[#1B4E2C]/20 text-[#1B4E2C] font-extrabold text-xs sm:text-sm uppercase tracking-widest mb-3 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
          <span>{badge}</span>
        </div>

        <h2 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#0D0F12] tracking-tight leading-tight mb-3"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          Our Lead Generation{" "}
          <span className="text-[#1B4E2C] block sm:inline mt-0.5 sm:mt-0">
            Process
          </span>
        </h2>

        <p 
          className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl mx-auto font-normal"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {description}
        </p>
      </div>

      {/* Top Filter / Border Navigation (Exact match to reference screenshot) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 sm:mb-14">
        <div className="flex items-center justify-between gap-1 p-1.5 bg-white border border-gray-200/90 rounded-full shadow-sm max-w-3xl mx-auto overflow-x-auto no-scrollbar">
          {processStages.map((stage, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={stage.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`flex-1 min-w-[85px] sm:min-w-0 py-2 sm:py-2.5 px-3 sm:px-4 rounded-full text-center transition-all duration-300 cursor-pointer flex items-center justify-center select-none ${
                  isActive
                    ? "bg-[#1B4E2C] text-white shadow-md font-bold"
                    : "text-[#475569] hover:text-[#0D0F12] hover:bg-gray-50 font-semibold"
                }`}
              >
                <span
                  className="text-xs sm:text-sm tracking-tight whitespace-nowrap"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  {stage.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Banner Container (Recreated exactly as shown in screenshot) */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 relative mb-14 sm:mb-20">
        
        {/* The Solid Green Banner */}
        <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#1B4E2C] text-white px-8 sm:px-14 lg:px-20 py-14 sm:py-18 lg:py-22 shadow-[0_20px_50px_rgba(27,78,44,0.22)] border border-[#41B349]/20">
          
          {/* TOP-LEFT VISUAL GRAPHIC: Stylized Retro Computer Badge (Exact match to reference) */}
          <div className="absolute -top-6 -left-3 sm:-top-8 sm:-left-5 lg:-top-10 lg:-left-6 z-20 pointer-events-none select-none">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 filter drop-shadow-xl">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Outer Rounded Container Badge */}
                <rect x="3" y="3" width="94" height="94" rx="18" fill="#FFFFFF" stroke="#1B4E2C" strokeWidth="6" />
                
                {/* Screen Outline */}
                <rect x="18" y="15" width="64" height="44" rx="10" fill="#FFFFFF" stroke="#1B4E2C" strokeWidth="5" />
                
                {/* Top-left Screen Glare Highlight */}
                <path d="M26 23 L32 23 M26 27 L29 27" stroke="#41B349" strokeWidth="3" strokeLinecap="round" />
                
                {/* Friendly Eyes */}
                <circle cx="39" cy="35" r="3" fill="#1B4E2C" />
                <circle cx="61" cy="35" r="3" fill="#1B4E2C" />
                
                {/* Screen Smile */}
                <path d="M43 43 C46 48 54 48 57 43" stroke="#1B4E2C" strokeWidth="4" strokeLinecap="round" fill="none" />
                
                {/* Lower Chassis / Computer Base Unit */}
                <path d="M12 60 H88 C89.5 60 91 61.5 91 63.5 L88 79 C87.5 81.5 85.5 83 83 83 H17 C14.5 83 12.5 81.5 12 79 L9 63.5 C9 61.5 10.5 60 12 60 Z" fill="#1B4E2C" />
                
                {/* Left Cooling Vents */}
                <line x1="20" y1="67" x2="20" y2="76" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                <line x1="26" y1="67" x2="26" y2="76" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                <line x1="32" y1="67" x2="32" y2="76" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                
                {/* Floppy Disk Slot */}
                <rect x="52" y="69" width="28" height="5" rx="2.5" fill="#FFFFFF" />
              </svg>
            </div>
          </div>

          {/* BOTTOM-RIGHT VISUAL GRAPHIC: Double-Ring Thumbs-Up Stamp (Exact match to reference) */}
          <div className="absolute -bottom-6 -right-3 sm:-bottom-8 sm:-right-5 lg:-bottom-10 lg:-right-6 z-20 pointer-events-none select-none">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 filter drop-shadow-xl">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Outer Solid White Circle */}
                <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#1B4E2C" strokeWidth="5" />
                
                {/* Inner Concentric Ring */}
                <circle cx="50" cy="50" r="39" fill="none" stroke="#1B4E2C" strokeWidth="2.5" strokeOpacity="0.85" />
                
                {/* Thumbs-Up Gesture */}
                <g transform="translate(23, 20) scale(0.55)">
                  <path
                    d="M32 28 C32 18 36 10 42 10 C46 10 49 14 47 22 L44 32 H70 C76 32 79 36 78 41 L73 66 C72 70 68 73 63 73 H34"
                    fill="none"
                    stroke="#1B4E2C"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M48 42 H66" stroke="#1B4E2C" strokeWidth="4" strokeLinecap="round" />
                  <path d="M47 52 H64" stroke="#1B4E2C" strokeWidth="4" strokeLinecap="round" />
                  <path d="M46 62 H62" stroke="#1B4E2C" strokeWidth="4" strokeLinecap="round" />
                  <rect x="16" y="32" width="16" height="42" rx="4" fill="#1B4E2C" stroke="#1B4E2C" strokeWidth="4" />
                </g>
              </svg>
            </div>
          </div>

          {/* MAIN CONTENT POSITIONED IN THE CENTER */}
          <div className="max-w-3xl mx-auto text-left relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`process-stage-${activeStep}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                {/* Bold 2-Line Headline matching reference visual typography */}
                <h3 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-black uppercase text-white tracking-tight leading-[1.08] sm:leading-[1.08]"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  <div>{current.titleLine1}</div>
                  <div>{current.titleLine2}</div>
                </h3>

                {/* Subtext Description */}
                <p 
                  className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-emerald-50/90 leading-relaxed font-normal max-w-2xl"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {current.summary}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

    </section>
  );
}

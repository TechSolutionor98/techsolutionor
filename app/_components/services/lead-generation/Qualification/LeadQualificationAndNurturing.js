"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  DollarSign, 
  UserCheck, 
  Zap, 
  Clock, 
  ShieldCheck, 
  CheckCheck,
  MessageCircle, 
  FileText, 
  Play, 
  Target, 
  PhoneCall, 
  RefreshCw 
} from "lucide-react";
import { useQuote } from "@/app/_context/QuoteContext";
import { getCmsVal } from "@/lib/api-helper";

// Sketched Card Frame Component matching exact reference screenshot styling
function SketchedCardFrame({ variation = 0 }) {
  const paths = [
    "M 8,6 C 80,4 240,7 312,5 C 314,35 311,95 313,124 C 240,126 80,123 7,125 C 6,95 9,35 8,6 Z",
    "M 6,7 C 90,5 230,4 314,6 C 312,38 315,92 312,123 C 230,125 90,124 6,123 C 8,92 5,38 6,7 Z",
    "M 7,5 C 85,6 235,5 313,4 C 315,36 313,94 314,125 C 235,123 85,125 6,124 C 5,94 8,36 7,5 Z"
  ];
  const d = paths[variation % paths.length];

  return (
    <svg 
      viewBox="0 0 320 130" 
      fill="none" 
      preserveAspectRatio="none" 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    >
      {/* Sketched outer frame */}
      <path
        d={d}
        stroke="#222222"
        strokeWidth="1.8"
        fill="#FFFFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LeadQualificationAndNurturing({ cmsContent }) {
  const { openQuote } = useQuote();
  const [activeFilter, setActiveFilter] = useState("bant"); // "bant" | "cadence"
  const [emailInput, setEmailInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const badge = getCmsVal(cmsContent, "INTELLIGENT PIPELINE FILTERING", "leadgen_qualification");
  const heading = getCmsVal(cmsContent, "Lead Qualification & Conversion", "leadgen_qualification");
  const subtitle = getCmsVal(
    cmsContent,
    "Generating inquiries is only half the battle. We implement rigorous BANT qualification protocols and automated multi-touch nurturing cadences so your sales team talks exclusively to verified, high-value decision-makers ready to buy.",
    "leadgen_qualification"
  );

  // 6 Real, Authentic B2B BANT Qualification Pillar Cards (Exact 3x2 Grid)
  const bantCards = [
    {
      id: "bant-b",
      icon: DollarSign,
      title: "Budget & Purchasing Power",
      desc: "Pre-screening commercial purchasing power ($10k+ annual spend capacity) via company revenue and headcount filters.",
      metric: "Min. $10,000+ Spend Threshold",
    },
    {
      id: "bant-a",
      icon: UserCheck,
      title: "Decision-Maker Authority",
      desc: "Targeting and verifying primary C-level executives (CEO, CMO, CRO, VP) with genuine fiscal signing authority.",
      metric: "Direct C-Suite & VP Authority",
    },
    {
      id: "bant-n",
      icon: Zap,
      title: "Critical Commercial Need",
      desc: "Diagnosing urgent operational bottlenecks and transactional buyer search queries matching your solution capabilities.",
      metric: "100% Problem/Solution Fit",
    },
    {
      id: "bant-t",
      icon: Clock,
      title: "Purchase Timeline Urgency",
      desc: "Filtering prospects with an active 30 to 90-day deployment window, prioritizing ready commercial buyers.",
      metric: "30-90 Day Active Buying Cycle",
    },
    {
      id: "bant-s",
      icon: ShieldCheck,
      title: "Algorithmic Disqualification",
      desc: "Automatically filtering out hobbyists, students, and low-intent email domains to preserve sales rep closing time.",
      metric: "Zero Wasted Discovery Calls",
    },
    {
      id: "bant-q",
      icon: CheckCheck,
      title: "Sales-Qualified (SQL) Dossier",
      desc: "Comprehensive prospect intelligence brief delivered directly to your CRM with verified conversation pain points.",
      metric: "100% Sales-Ready CRM Handoff",
    },
  ];

  // 6 Real, Authentic Multi-Tech & Follow-Up Cadence Cards (Exact 3x2 Grid)
  const cadenceCards = [
    {
      id: "cad-1",
      icon: MessageCircle,
      title: "Minute 1: Speed-to-Lead",
      desc: "Automated personalized WhatsApp & SMS confirmation within 60s with assigned specialist contact & booking link.",
      metric: "94% Read Rate Within 3 Minutes",
    },
    {
      id: "cad-2",
      icon: FileText,
      title: "Day 2: Enterprise Social Proof",
      desc: "Automated delivery of sector-specific case studies highlighting verified ROI benchmarks and client results.",
      metric: "Builds Early Commercial Trust",
    },
    {
      id: "cad-3",
      icon: Play,
      title: "Day 5: Objection Neutralizer",
      desc: "Interactive ROI calculator and video walkthrough addressing onboarding timelines, pricing, and security.",
      metric: "Neutralizes 80% of Sales Friction",
    },
    {
      id: "cad-4",
      icon: Target,
      title: "Day 8: Omnichannel Retargeting",
      desc: "Targeted LinkedIn InMail and executive sponsored content to reinforce brand authority across the buying committee.",
      metric: "+58% Brand Recall Across Reps",
    },
    {
      id: "cad-5",
      icon: PhoneCall,
      title: "Day 12: Executive Consultation",
      desc: "Senior account executive conducts a targeted discovery call presenting a tailored commercial growth roadmap.",
      metric: "Converts 68% MQL into Booked SQL",
    },
    {
      id: "cad-6",
      icon: RefreshCw,
      title: "Day 18+: Lifecycle Reactivation",
      desc: "Quarterly benchmark reports and value updates keep stalled opportunities warm until their next buying cycle opens.",
      metric: "Recaptures 18-24% Delayed Revenue",
    },
  ];

  const currentCards = activeFilter === "bant" ? bantCards : cadenceCards;

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        openQuote();
        setSubmitted(false);
        setEmailInput("");
      }, 700);
    } else {
      openQuote();
    }
  };

  return (
    <section className="w-full py-16 sm:py-20 md:py-28 bg-white relative overflow-hidden select-none border-b border-stone-200/60">
      
      {/* Import Caveat cursive font for expressive hand-drawn lettering */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
      `}</style>

      {/* Subtle Dotted Matrix Grid Background in Center on pure white canvas */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 select-none"
        style={{
          backgroundImage: `radial-gradient(#C8C1B5 1.15px, transparent 1.15px)`,
          backgroundSize: "22px 22px",
          backgroundPosition: "center center",
        }}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Central Typography Canvas with Doodles */}
        <div className="max-w-2xl sm:max-w-3xl mx-auto text-center relative py-6 sm:py-10">
          
          {/* TOP-LEFT DOODLE: Stylized Hand-Drawn Spiral Notebook Checklist */}
          <div className="absolute -top-4 left-0 sm:-top-8 sm:-left-6 md:-left-14 lg:-left-20 -rotate-12 pointer-events-none select-none z-20">
            <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-20 sm:w-22 sm:h-26 md:w-26 md:h-32 text-[#1E202A] filter drop-shadow-xs">
              <path
                d="M24 16 C35 14 74 18 84 22 C88 38 86 84 82 102 C68 104 36 102 22 98 C18 80 18 36 24 16 Z"
                stroke="currentColor"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M28 22 C38 20 72 23 78 26 C82 39 81 80 77 96 C65 98 38 96 26 92 C23 78 23 40 28 22 Z"
                stroke="currentColor"
                strokeWidth="3.2"
                fill="#FFFFFF"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M22 28 C16 26 14 34 24 36" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M20 42 C14 40 12 48 22 50" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M19 56 C13 54 11 62 21 64" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M18 70 C12 68 10 76 20 78" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M17 84 C11 82 9 90 19 92" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M38 38 L43 44 L54 34" stroke="#41B349" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <line x1="58" y1="40" x2="68" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M38 52 L43 58 L54 48" stroke="#41B349" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <line x1="58" y1="54" x2="68" y2="54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M38 66 L43 72 L54 62" stroke="#41B349" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <line x1="58" y1="68" x2="68" y2="68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* RIGHT-SIDE DOODLE: Hand-Drawn Face & Eye Profile in Warm Tan */}
          <div className="absolute top-1/2 right-0 sm:-right-4 md:-right-12 lg:-right-16 -translate-y-1/3 pointer-events-none select-none z-20">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 sm:w-22 sm:h-22 md:w-26 md:h-26 text-[#BA9B7B] filter drop-shadow-xs">
              <path
                d="M26 42 C28 26 50 18 68 24 C80 28 88 38 84 52 C80 64 74 72 74 84"
                stroke="currentColor"
                strokeWidth="6.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M32 46 C44 38 60 38 72 46 C60 54 44 54 32 46 Z"
                stroke="currentColor"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <ellipse cx="52" cy="46" rx="4.5" ry="3.5" fill="currentColor" />
              <path
                d="M48 58 C46 66 40 76 42 86"
                stroke="currentColor"
                strokeWidth="6.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* MAIN HEADLINE */}
          <div className="relative z-10 select-none">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4E2C]/10 border border-[#1B4E2C]/20 text-[#1B4E2C] font-extrabold text-xs sm:text-sm uppercase tracking-widest mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
              <span>{badge}</span>
            </div>

            <h2 
              className="text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-black text-[#1C1814] tracking-tight leading-[1.08]"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              Lead Qualification{" "}
              <span className="text-[#FF4713]">
                & Conversion
              </span>
            </h2>

            {/* Subtitle text */}
            <p 
              className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#55504A] font-normal leading-relaxed max-w-2xl mx-auto"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {subtitle}
            </p>
          </div>

        </div>

        {/* 4 PILLAR / MULTI-TECH FILTER BUTTONS (Maintained cleanly at the top) */}
        <div className="max-w-6xl mx-auto my-8 sm:my-10 relative z-10">
          
          <div className="flex items-center justify-center gap-2.5 mb-8 sm:mb-10">
            <button
              type="button"
              onClick={() => setActiveFilter("bant")}
              className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer select-none ${
                activeFilter === "bant"
                  ? "bg-[#1C1814] text-white shadow-md"
                  : "bg-white text-[#6A645C] hover:bg-gray-50 border border-gray-200"
              }`}
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              4-Pillar BANT Framework
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("cadence")}
              className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer select-none ${
                activeFilter === "cadence"
                  ? "bg-[#1C1814] text-white shadow-md"
                  : "bg-white text-[#6A645C] hover:bg-gray-50 border border-gray-200"
              }`}
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              Multi-Touch Follow-Up Cadence
            </button>
          </div>

          {/* CARD-BASED UI: EXACT RECREATION OF REFERENCE SCREENSHOT (3 Columns x 2 Rows) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8"
            >
              {currentCards.map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={card.id}
                    className="relative min-h-[140px] sm:min-h-[145px] p-5 sm:p-6 flex items-center gap-4 sm:gap-5 transition-transform hover:-translate-y-0.5 duration-200 group select-none"
                  >
                    {/* Hand-Drawn Sketched Frame matching reference screenshot */}
                    <SketchedCardFrame variation={idx} />

                    {/* Left Circular Emblem Badge with angled handle stub at 5 o'clock */}
                    <div className="relative shrink-0 z-10">
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FAF8F5] border-[2px] border-[#222222] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                        <IconComponent className="w-6 h-6 text-[#222222]" strokeWidth={2.2} />
                      </div>
                      {/* Coffee-cup / magnifying handle stub matching screenshot reference */}
                      <div className="absolute -bottom-1 -right-0.5 w-3.5 h-1.5 bg-[#222222] rounded-full rotate-45 transform origin-left pointer-events-none" />
                    </div>

                    {/* Right Card Content Area */}
                    <div className="flex-1 min-w-0 z-10">
                      {/* Bold Title */}
                      <h4 
                        className="text-sm sm:text-base font-bold text-[#1C1814] tracking-tight leading-snug mb-1"
                        style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                      >
                        {card.title}
                      </h4>

                      {/* 2-line Description */}
                      <p 
                        className="text-xs sm:text-[13px] text-[#55504A] leading-snug mb-2 font-normal line-clamp-2"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {card.desc}
                      </p>

                      {/* Metric / Value in price position */}
                      <div 
                        className="text-xs sm:text-sm font-bold text-[#1C1814] tracking-tight"
                        style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                      >
                        {card.metric}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

        </div>

        {/* BOTTOM FLOATING NEWSLETTER & CRM ACTION BANNER */}
        <div className="w-full max-w-4xl mx-auto mt-12 sm:mt-16 bg-[#EDE8DF] rounded-[24px] sm:rounded-full p-4 sm:p-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm border border-stone-300/60 relative z-10">
          
          {/* Left Side: Starburst Graphic & Headline */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FF4713] flex items-center justify-center text-white shrink-0 shadow-xs rotate-3 hover:rotate-6 transition-transform select-none">
              <svg viewBox="0 0 100 100" fill="none" className="w-8 h-8 text-white">
                <path
                  d="M50 8 L58 32 L82 22 L72 46 L96 52 L74 64 L86 86 L62 76 L52 98 L40 76 L18 88 L28 64 L6 54 L28 44 L16 24 L42 30 Z"
                  fill="#FF4713"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <circle cx="50" cy="50" r="10" stroke="#FFFFFF" strokeWidth="3" fill="none" />
              </svg>
            </div>

            <div className="text-left">
              <div 
                className="text-sm sm:text-base font-black text-[#1C1814] leading-tight"
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
              >
                Get verified BANT-qualified buyers
              </div>
              <div className="text-xs sm:text-sm text-[#5A544C] font-normal mt-0.5">
                delivered directly to your CRM pipeline weekly
              </div>
            </div>
          </div>

          {/* Right Side: Inline Input with Arrow Button */}
          <form 
            onSubmit={handleEmailSubmit} 
            className="w-full sm:w-72 flex items-center border-b border-[#1C1814] pb-1.5 focus-within:border-[#FF4713] transition-colors"
          >
            <input 
              type="email" 
              placeholder={submitted ? "Consultation requested!" : "Your business email"} 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="bg-transparent w-full text-xs sm:text-sm text-[#1C1814] placeholder-[#8A847C] outline-none pr-2 font-normal"
            />
            <button 
              type="submit" 
              className="text-[#1C1814] hover:text-[#FF4713] p-1 cursor-pointer transition-colors active:scale-95 shrink-0"
              title="Submit & Launch Plan"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}

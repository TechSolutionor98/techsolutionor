"use client";

import React, { useState } from "react";
import { 
  Target,
  Magnet, 
  MessageCircle, 
  HeartHandshake, 
  CheckCheck, 
  DollarSign, 
  ChevronRight
} from "lucide-react";
import { getCmsVal } from "@/lib/api-helper";

export default function LeadGenProcessFlow({ cmsContent }) {
  const [activeStep, setActiveStep] = useState(0);

  const badge = getCmsVal(cmsContent, "THE PROVEN ACQUISITION BLUEPRINT", "leadgen_process");
  const heading = getCmsVal(cmsContent, "Our Lead Generation Process", "leadgen_process");
  const subHeading = getCmsVal(cmsContent, "Attract → Capture → Engage → Nurture → Qualify → Convert", "leadgen_process");
  const description = getCmsVal(
    cmsContent,
    "Our battle-tested 6-stage lead generation engine guides prospects seamlessly from first discovery to qualified commercial conversion, ensuring zero wasted ad spend and maximum sales rep closing efficiency.",
    "leadgen_process"
  );

  const processStages = [
    {
      step: 1,
      name: "Attract",
      label: "1. Attract",
      tagline: "Commercial Buyer Attraction",
      icon: Target,
      color: "bg-blue-600",
      accent: "border-blue-500 text-blue-600",
      summary: "Attract high-intent commercial buyers through organic SEO rankings, Google Search Ads, LinkedIn account-based marketing, and precision demographic social campaigns.",
      actionTaken: "Deploy commercial search intent keywords and precision audience targeting to filter out non-buyers at the very first touchpoint.",
      deliverable: "Targeted inbound traffic with verified purchasing intent",
    },
    {
      step: 2,
      name: "Capture",
      label: "2. Capture",
      tagline: "Frictionless Data Capture",
      icon: Magnet,
      color: "bg-indigo-600",
      accent: "border-indigo-500 text-indigo-600",
      summary: "Direct traffic to sub-second loading landing pages, interactive ROI calculators, high-value lead magnets, or 1-tap WhatsApp click-to-chat links.",
      actionTaken: "Optimize form fields, streamline mobile UX, and implement micro-commitments to maximize conversion velocity and data completeness.",
      deliverable: "Verified contact profile & opt-in marketing consent",
    },
    {
      step: 3,
      name: "Engage",
      label: "3. Engage",
      tagline: "Sub-Minute First Response",
      icon: MessageCircle,
      color: "bg-emerald-600",
      accent: "border-emerald-500 text-emerald-600",
      summary: "Trigger an immediate personalized WhatsApp greeting, welcome email sequence, or push alert within 60 seconds of submission.",
      actionTaken: "Connect while buyer intent is at its peak, providing requested collateral, answering initial questions, and building early trust.",
      deliverable: "Sub-minute response rate & immediate prospect engagement",
    },
    {
      step: 4,
      name: "Nurture",
      label: "4. Nurture",
      tagline: "Value-Driven Multi-Touch Cadence",
      icon: HeartHandshake,
      color: "bg-purple-600",
      accent: "border-purple-500 text-purple-600",
      summary: "Deliver industry-relevant case studies, client success metrics, and objection-neutralizing content across a structured 7 to 21-day timeline.",
      actionTaken: "Automate dynamic multi-channel follow-up touches that demonstrate tangible commercial ROI and answer buyer concerns.",
      deliverable: "Educated, pre-sold prospect ready for sales consultation",
    },
    {
      step: 5,
      name: "Qualify",
      label: "5. Qualify",
      tagline: "Rigorous BANT Lead Scoring",
      icon: CheckCheck,
      color: "bg-amber-600",
      accent: "border-amber-500 text-amber-600",
      summary: "Evaluate prospects based on Budget, Authority, Need, and Timeline (BANT) to ensure your sales team speaks only with legitimate decision-makers.",
      actionTaken: "Score prospect engagement signals and conduct interactive chatbot pre-screening to confirm genuine commercial authority.",
      deliverable: "Sales-Qualified Lead (SQL) with verified BANT data",
    },
    {
      step: 6,
      name: "Convert",
      label: "6. Convert",
      tagline: "Direct Sales Calendar Handoff",
      icon: DollarSign,
      color: "bg-[#1B4E2C]",
      accent: "border-[#1B4E2C] text-[#1B4E2C]",
      summary: "Seamlessly route verified, ready-to-buy prospects into your CRM and schedule direct discovery calls on your sales representatives' calendars.",
      actionTaken: "Provide sales reps with complete conversation history, intent score, and specific pain points for effortless proposal closing.",
      deliverable: "Scheduled sales consultation & high-value signed contract",
    },
  ];

  const current = processStages[activeStep];

  return (
    <section className="w-full py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden select-none border-b border-gray-100">
      {/* Background Subtle Geometric Polygons */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(#1B4E2C 1px, transparent 1px), linear-gradient(90deg, #1B4E2C 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header matching Web Development service typography */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4E2C]/10 border border-[#1B4E2C]/20 text-[#1B4E2C] font-extrabold text-xs sm:text-sm uppercase tracking-widest mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
            <span>{badge}</span>
          </div>

          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#0D0F12] tracking-tight leading-tight mb-3"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {heading}
          </h2>

          <div 
            className="text-sm sm:text-base font-bold text-[#1B4E2C] uppercase tracking-wider mb-4"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {subHeading}
          </div>

          <p 
            className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl mx-auto font-normal"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {description}
          </p>
        </div>

        {/* VISUAL 6-STAGE PROCESS FLOW STRIP */}
        <div className="mb-10 sm:mb-12">
          {/* Desktop/Tablet Horizontal Stepper */}
          <div className="hidden md:grid md:grid-cols-6 gap-3 pb-2">
            {processStages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-[18px] border-2 text-center transition-all duration-300 cursor-pointer flex flex-col items-center gap-2.5 relative select-none ${
                    isActive
                      ? "bg-[#1B4E2C] border-[#1B4E2C] text-white shadow-[0_12px_28px_rgba(27,78,44,0.22)] -translate-y-1"
                      : "bg-white border-gray-200 text-[#0D0F12] hover:border-[#41B349] hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                    isActive ? "bg-white text-[#1B4E2C] shadow-sm" : "bg-[#1B4E2C]/10 text-[#1B4E2C]"
                  }`}>
                    0{stage.step}
                  </div>
                  <span 
                    className={`text-sm font-black tracking-tight ${isActive ? "text-white" : "text-[#0D0F12]"}`}
                    style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {stage.name}
                  </span>
                  {idx < 5 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-300 z-10">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Horizontal Scroll Stepper */}
          <div className="flex md:hidden gap-2 overflow-x-auto pb-4 scrollbar-none">
            {processStages.map((stage, idx) => (
              <button
                key={stage.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`shrink-0 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  activeStep === idx
                    ? "bg-[#1B4E2C] text-white border-[#1B4E2C] shadow-sm"
                    : "bg-gray-50 text-gray-700 border-gray-200"
                }`}
              >
                0{stage.step}. {stage.name}
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE STAGE DEEP-DIVE CARD */}
        <div className="bg-[#FFFFFF] rounded-[24px] p-6 sm:p-8 lg:p-10 border-2 border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.06)] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-gray-100 mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl ${current.color} flex items-center justify-center text-white shadow-md`}>
                <current.icon className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-[#1B4E2C] uppercase tracking-wider">
                    Stage 0{current.step} of 06
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-500 font-medium">{current.tagline}</span>
                </div>
                <h3 
                  className="text-xl sm:text-2xl font-black text-[#0D0F12]"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  {current.name} Stage
                </h3>
              </div>
            </div>

            <div className="text-left lg:text-right">
              <span className="text-xs text-gray-400 block font-mono">Process Objective</span>
              <span className="text-sm font-bold text-[#1B4E2C]">Turn Anonymous Visitors Into Qualified Buyers</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100">
              <div className="text-xs font-mono font-bold uppercase text-gray-400 mb-2">
                What Happens in This Phase
              </div>
              <p 
                className="text-[#475569] text-xs sm:text-sm leading-relaxed"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {current.summary}
              </p>
            </div>

            <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100">
              <div className="text-xs font-mono font-bold uppercase text-[#1B4E2C] mb-2">
                Strategic Execution
              </div>
              <p 
                className="text-[#475569] text-xs sm:text-sm leading-relaxed"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {current.actionTaken}
              </p>
            </div>

            <div className="bg-[#1B4E2C]/5 rounded-2xl p-5 border border-[#1B4E2C]/20">
              <div className="text-xs font-mono font-bold uppercase text-[#1B4E2C] mb-2">
                Conversion Deliverable
              </div>
              <p 
                className="text-[#0D0F12] font-semibold text-xs sm:text-sm leading-relaxed"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {current.deliverable}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

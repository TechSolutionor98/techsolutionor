"use client";

import React from "react";
import { Lightbulb, Rocket, Settings, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    script: "Discovery & Blueprint",
    title: "Strategy",
    desc: "Comprehensive business scoping, technical architecture mapping, and commercial milestones definition.",
    icon: Lightbulb,
  },
  {
    number: "02",
    script: "Agile Development",
    title: "Execution",
    desc: "Rapid sprint-based coding, clean component structuring, and weekly collaborative client milestones.",
    icon: Rocket,
  },
  {
    number: "03",
    script: "Rigorous QA & Audit",
    title: "Optimization",
    desc: "Speed benchmarking, Core Web Vitals refinement, security penetration audits, and cross-browser testing.",
    icon: Settings,
  },
  {
    number: "04",
    script: "Scale & Dominate",
    title: "Growth",
    desc: "Production deployment, real-time analytics monitoring, ongoing SEO optimization, and SLA-backed support.",
    icon: TrendingUp,
  },
];

const ProcessSteps = () => {
  return (
    <section className="relative w-full bg-[#FFFFFF] py-16 md:py-24 font-sans select-none overflow-hidden">
      {/* Subtle Warm Dot Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#0D0F12 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#36963D]/10 border border-[#36963D]/30 text-[#36963D] font-mono text-xs uppercase tracking-widest font-bold mb-3 shadow-2xs"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#36963D] animate-pulse" />
            <span>HOW WE DELIVER</span>
          </div>

          <div className="retro-script-font text-2xl sm:text-3xl text-[#36963D] font-normal tracking-wide mb-1 leading-snug">
            From Concept to Scale
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0D0F12] tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            Our Simple 4-Step <br className="hidden sm:inline" />
            <span className="text-[#36963D]">Roadmap to Success</span>
          </h2>

          <p
            className="text-[#475569] text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            We follow an agile, structured delivery methodology that removes uncertainty, reduces time-to-market, and guarantees enterprise quality.
          </p>
        </div>

        {/* 4 Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="p-6 sm:p-7 rounded-[28px] bg-[#FFFFFF] border-3 border-[#0D0F12] retro-shadow-pill flex flex-col items-center text-center justify-between transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="flex flex-col items-center w-full">
                  {/* Retro Icon Box */}
                  <div className="relative mb-5">
                    <div className="w-20 h-20 rounded-[22px] bg-[#FFFFFF] border-3 border-[#0D0F12] retro-icon-box flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110">
                      {/* Corner subtle green shade */}
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#36963D]/20 pointer-events-none" />
                      <Icon className="w-8 h-8 text-[#36963D]" />
                    </div>

                    {/* Step Number Tag */}
                    <div 
                      className="absolute -top-2.5 -right-2.5 px-2.5 py-0.5 rounded-full bg-[#36963D] text-white font-mono text-xs font-black border-2 border-[#0D0F12] shadow-2xs"
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Cursive Subtitle */}
                  <div className="retro-script-font text-xl text-[#36963D] font-normal tracking-wide mb-1 leading-snug">
                    {step.script}
                  </div>

                  {/* Step Title */}
                  <h3
                    className="text-2xl font-black text-[#0D0F12] group-hover:text-[#36963D] transition-colors duration-200 tracking-tight mb-3"
                    style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-[13.5px] text-[#475569] leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;

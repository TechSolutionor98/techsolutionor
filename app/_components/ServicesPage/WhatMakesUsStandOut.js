"use client";

import React from "react";
import Image from "next/image";
import StandOutImage from "@/components/Images/what-makes-us-stand-out.png";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Globe, Trophy } from "lucide-react";
import { useQuote } from "@/app/_context/QuoteContext";
import {
  SectionBadge,
  SectionHeading,
  HighlightWord,
  SectionParagraph,
  CardHeading,
  CardParagraph,
  ButtonText,
} from "@/components/Typography";

const strengths = [
  {
    icon: Trophy,
    title: "Proven Track Record",
    desc: "150+ successful commercial web, mobile, and software deployments worldwide.",
  },
  {
    icon: Globe,
    title: "Multi-Industry Experience",
    desc: "From UAE government services & e-commerce to enterprise logistics & fintech.",
  },
  {
    icon: Zap,
    title: "Tailored Tech Strategies",
    desc: "Engineered specifically for local Dubai/GCC market nuances and global scalability.",
  },
  {
    icon: ShieldCheck,
    title: "Results-Driven & Data-Centric",
    desc: "Continuous performance audits, conversion tracking, and measurable ROI metrics.",
  },
];

const WhatMakesUsStandOut = () => {
  const { openQuote } = useQuote();

  return (
    <section className="relative w-full bg-[#FFFFFF] py-16 md:py-24 font-sans select-none overflow-hidden">
      {/* Subtle Dot Grid */}
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
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: TEXT & VALUE PROPOSITION */}
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            {/* Eyebrow Pill */}
            <div className="mb-4">
              <SectionBadge variant="light">
                WHY PARTNER WITH US
              </SectionBadge>
            </div>

            {/* Cursive Subtitle */}
            <div className="retro-script-font text-2xl sm:text-3xl text-[#36963D] font-normal tracking-wide mb-1 leading-snug">
              Excellence Without Compromise
            </div>

            {/* Headline */}
            <SectionHeading
              as="h2"
              size="section"
              theme="dark"
              className="text-3xl sm:text-4xl md:text-[44px] leading-[1.15] mb-5"
            >
              What Makes Us Stand Out <br />
              <HighlightWord>in Dubai &amp; Beyond</HighlightWord>
            </SectionHeading>

            {/* Paragraph */}
            <SectionParagraph
              size="md"
              theme="slate"
              className="mb-8 max-w-[540px]"
            >
              Tech Solutionor combines global engineering standards, deep domain acumen, and tailored execution to deliver commercial products that yield real impact. We bring the right mix of architectural strategy, modern frameworks, and relentless support to every engagement.
            </SectionParagraph>

            {/* 4 Key Strengths Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              {strengths.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#FFFFFF] border-2 border-[#0D0F12] retro-shadow-pill transition-all duration-200 flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-[#36963D]/10 text-[#36963D] flex items-center justify-center font-bold">
                        <Icon className="w-4 h-4" />
                      </div>
                      <CardHeading
                        as="h4"
                        size="sm"
                        theme="dark"
                        className="text-sm font-bold tracking-tight"
                      >
                        {item.title}
                      </CardHeading>
                    </div>
                    <CardParagraph size="xs" theme="slate" className="text-xs leading-relaxed">
                      {item.desc}
                    </CardParagraph>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <button
              onClick={openQuote}
              className="retro-shadow-pill inline-flex items-center gap-2.5 bg-[#36963D] hover:bg-[#2e8234] text-white py-3.5 px-8 rounded-full border-2 border-[#0D0F12] transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center"
            >
              <ButtonText className="text-xs sm:text-sm uppercase tracking-wider text-white">Work With Us Today</ButtonText>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* RIGHT COLUMN: RETRO FRAMED VISUAL */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center">
            <div className="relative w-full max-w-[460px] lg:max-w-[490px]">
              {/* Retro offset shadow border */}
              <div className="w-full rounded-[28px] bg-[#FFFFFF] border-3 border-[#0D0F12] retro-icon-box p-3 sm:p-4 overflow-hidden">
                <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden">
                  <Image
                    src={StandOutImage}
                    alt="What Makes Us Stand Out in Dubai & Beyond"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Floating Highlight Badge */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-[#FFFFFF] border-2 border-[#0D0F12] rounded-2xl p-4 retro-shadow-pill flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#36963D] text-white flex items-center justify-center font-black text-base">
                  ✓
                </div>
                <div>
                  <div className="font-jakarta font-bold text-[#0D0F12] text-sm">
                    99.4% Client Retention
                  </div>
                  <div className="font-jakarta text-xs text-[#475569]">Across UAE &amp; International Markets</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatMakesUsStandOut;

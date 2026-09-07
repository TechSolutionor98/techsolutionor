"use client";
import React from "react";
import Image from "next/image";
import HeroBg from "../../../../../components/Images/best-web-development-company-in-dubai.png";
import { useQuote } from "@/app/_context/QuoteContext";
import { ArrowRight, Sparkles, CheckCircle2, Zap, Shield, Code2 } from "lucide-react";

const WebDevBanner = () => {
  const { openQuote } = useQuote();

  const scrollToTech = () => {
    const techSection = document.getElementById("technologies-book-section");
    if (techSection) {
      techSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: 650, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-[#0a1435] overflow-hidden min-h-[560px] lg:min-h-[640px] flex items-center font-sans py-14 lg:py-20 text-white">
      {/* BACKGROUND GRAPHICS & BRAND AMBIENT GLOW */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle base image overlay with theme blend */}
        <div className="absolute inset-0 opacity-25 mix-blend-luminosity">
          <Image
            src={HeroBg}
            alt="Best Web Development Company in Dubai, UAE"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Ambient brand green radial glow orbs matching Tech Solutionor palette */}
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-[#41b349]/15 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 -right-24 w-[600px] h-[600px] bg-[#41b349]/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-[#0c1a45]/80 rounded-full blur-[120px]" />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Bottom edge gradient blend */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a1435] to-transparent" />
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* LEFT COLUMN: HERO HEADLINE, DETAILS, AND CTAS */}
          <div className="lg:col-span-7 flex flex-col items-start">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#41b349]/10 border border-[#41b349]/30 backdrop-blur-md mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#41b349] animate-pulse" />
              <span className="text-[12px] sm:text-[13px] font-semibold text-[#41b349] tracking-wide uppercase">
                Premier Web Engineering & Design
              </span>
              <span className="text-gray-300 text-[11px]">• Dubai & Global</span>
            </div>

            {/* MAIN HEADING */}
            <h1 className="text-[32px] sm:text-[42px] md:text-[50px] lg:text-[54px] font-black tracking-tight leading-[1.12] mb-6 text-white">
              Best Web Development Company in Dubai, UAE:{" "}
              <span className="text-[#41b349]">
                Trusted by Brands Worldwide
              </span>
            </h1>

            {/* PARAGRAPH */}
            <p className="text-[15px] sm:text-[16.5px] md:text-[17px] text-gray-200 font-normal leading-relaxed mb-8 max-w-[640px]">
              Partner with the best web development company in Dubai to build high-performance, scalable websites through expert web design and development services. From startups in Dubai to enterprises across the UAE and worldwide, we’re a trusted web development agency creating conversion-focused web solutions that boost engagement, strengthen brand authority and maximize ROI.
            </p>

            {/* CTA BUTTONS ROW */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={openQuote}
                className="relative group overflow-hidden bg-[#41b349] hover:bg-[#36963d] text-white text-[15px] sm:text-[16.5px] font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(65,179,73,0.35)] hover:shadow-[0_0_35px_rgba(65,179,73,0.55)] cursor-pointer inline-flex items-center justify-center gap-2 transform active:scale-95"
              >
                <span>Hire Us</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button
                onClick={scrollToTech}
                className="px-6 py-3.5 rounded-full border border-white/20 hover:border-[#41b349] bg-white/[0.05] hover:bg-[#41b349]/10 text-white hover:text-[#41b349] text-[14.5px] sm:text-[15.5px] font-semibold transition-all duration-300 cursor-pointer backdrop-blur-sm inline-flex items-center gap-2"
              >
                <span>Explore Technologies</span>
                <span className="text-xs text-[#41b349]">↓</span>
              </button>
            </div>

            {/* VALUE PROPOSITION BADGES */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 w-full max-w-[620px]">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#41b349]/15 text-[#41b349]">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white leading-tight">Sub-Second</div>
                  <div className="text-[11px] text-gray-300">Load Optimization</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#41b349]/15 text-[#41b349]">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white leading-tight">Enterprise</div>
                  <div className="text-[11px] text-gray-300">Security & Scalability</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="p-1.5 rounded-lg bg-[#41b349]/15 text-[#41b349]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white leading-tight">100% Custom</div>
                  <div className="text-[11px] text-gray-300">Tailored Solutions</div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: BRANDED CODE CONSOLE */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px]">

              {/* Backglow behind the glass card */}
              <div className="absolute -inset-1.5 bg-[#41b349]/20 rounded-3xl blur-xl opacity-70 transition duration-700" />

              {/* Main Interactive Glass Console Card */}
              <div className="relative rounded-2xl bg-[#0c183d]/90 border border-white/15 backdrop-blur-xl shadow-2xl p-5 sm:p-6 overflow-hidden">

                {/* Window header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-[#41b349]" />
                    <span className="ml-2 text-xs font-mono text-gray-300">techsolutionor.web.ts</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#41b349] bg-[#41b349]/10 px-2 py-0.5 rounded border border-[#41b349]/20">
                    <Code2 className="w-3 h-3" />
                    <span>PRODUCTION READY</span>
                  </div>
                </div>

                {/* Code syntax simulation */}
                <div className="font-mono text-[12.5px] sm:text-[13.5px] leading-relaxed text-gray-200 space-y-2 select-none">
                  <div className="text-gray-400">// Tech Solutionor Web Architecture</div>
                  <div>
                    <span className="text-blue-300">const</span>{" "}
                    <span className="text-emerald-300">clientPlatform</span> ={" "}
                    <span className="text-blue-300">await</span>{" "}
                    <span className="text-[#41b349] font-bold">TechSolutionor</span>
                    <span className="text-yellow-300">.build</span>({"{"}
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-300">targetRegion</span>:{" "}
                    <span className="text-[#41b349]">"Dubai & Worldwide"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-300">performanceScore</span>:{" "}
                    <span className="text-white font-bold">100</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-300">architecture</span>:{" "}
                    <span className="text-emerald-300">"Modern Scalable Stack"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-300">conversionOptimized</span>:{" "}
                    <span className="text-[#41b349]">true</span>
                  </div>
                  <div>{"});"}</div>
                  <div className="pt-2 text-[#41b349] flex items-center gap-2 font-semibold">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#41b349] animate-ping" />
                    <span>✓ System Online: High-ROI Deployment</span>
                  </div>
                </div>

                {/* Bottom Floating Stats Card */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#41b349]/20 flex items-center justify-center text-[#41b349] font-bold text-xs border border-[#41b349]/30">
                      99%
                    </div>
                    <div>
                      <div className="font-semibold text-white">Client Satisfaction</div>
                      <div className="text-[10px] text-gray-300">Verified UAE & Global</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#41b349] font-mono font-bold text-sm">150+</div>
                    <div className="text-[10px] text-gray-300">Completed Builds</div>
                  </div>
                </div>

              </div>

              {/* Floating Pill - Top Right */}
              <div className="absolute -top-4 -right-4 bg-[#41b349] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-1.5 hidden sm:flex">
                <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                <span>Next-Gen Stack</span>
              </div>

              {/* Floating Pill - Bottom Left */}
              <div className="absolute -bottom-4 -left-4 bg-[#0a1435] text-gray-200 text-[11px] font-medium px-3.5 py-1.5 rounded-full shadow-xl border border-white/15 flex items-center gap-2 backdrop-blur-md hidden sm:flex">
                <span className="w-2 h-2 rounded-full bg-[#41b349]" />
                <span>Dubai • Abu Dhabi • Global</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WebDevBanner;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useQuote } from "@/app/_context/QuoteContext";
import { getCmsVal } from "@/lib/api-helper";

// 5-Star Arched Crown Component matching reference screenshot
function StarArc() {
  return (
    <div className="flex justify-center items-end h-6 -mb-1 select-none pointer-events-none">
      <svg viewBox="0 0 100 32" className="w-16 sm:w-20 h-6 overflow-visible">
        {/* Star 1 */}
        <polygon
          points="0,-4 1.2,-1.2 4.2,-1.2 1.8,0.7 2.7,3.6 0,1.8 -2.7,3.6 -1.8,0.7 -4.2,-1.2 -1.2,-1.2"
          transform="translate(16, 22) scale(1.15)"
          fill="#E85038"
        />
        {/* Star 2 */}
        <polygon
          points="0,-4 1.2,-1.2 4.2,-1.2 1.8,0.7 2.7,3.6 0,1.8 -2.7,3.6 -1.8,0.7 -4.2,-1.2 -1.2,-1.2"
          transform="translate(33, 13) scale(1.15)"
          fill="#E85038"
        />
        {/* Star 3 (Apex) */}
        <polygon
          points="0,-4 1.2,-1.2 4.2,-1.2 1.8,0.7 2.7,3.6 0,1.8 -2.7,3.6 -1.8,0.7 -4.2,-1.2 -1.2,-1.2"
          transform="translate(50, 8) scale(1.25)"
          fill="#E85038"
        />
        {/* Star 4 */}
        <polygon
          points="0,-4 1.2,-1.2 4.2,-1.2 1.8,0.7 2.7,3.6 0,1.8 -2.7,3.6 -1.8,0.7 -4.2,-1.2 -1.2,-1.2"
          transform="translate(67, 13) scale(1.15)"
          fill="#E85038"
        />
        {/* Star 5 */}
        <polygon
          points="0,-4 1.2,-1.2 4.2,-1.2 1.8,0.7 2.7,3.6 0,1.8 -2.7,3.6 -1.8,0.7 -4.2,-1.2 -1.2,-1.2"
          transform="translate(84, 22) scale(1.15)"
          fill="#E85038"
        />
      </svg>
    </div>
  );
}

export default function LocalVsGlobalLeadGen({ cmsContent }) {
  const { openQuote } = useQuote();
  const [activeScope, setActiveScope] = useState("local");

  const badge = getCmsVal(cmsContent, "MARKET SCOPE & GEOGRAPHIC STRATEGY", "leadgen_scope");
  const localTitle = getCmsVal(cmsContent, "Local Lead Generation", "leadgen_scope");
  const globalTitle = getCmsVal(cmsContent, "Global Lead Generation", "leadgen_scope");

  const localFeatures = [
    {
      title: "Google Business Profile Top-3 Map Pack",
      desc: "Dominate local map search when customers search 'near me'",
    },
    {
      title: "Hyper-Targeted Local Radius Ads",
      desc: "Geo-fenced Google & Meta campaigns zeroed in on your exact service radius",
    },
    {
      title: "Instant Direct Call & WhatsApp Triggers",
      desc: "High-converting 1-tap mobile call links that ring your phone instantly",
    },
    {
      title: "Local Authority Citations",
      desc: "Local directory listings, neighborhood reviews, and community social proof",
    },
  ];

  const globalFeatures = [
    {
      title: "Multi-Market LinkedIn Prospecting",
      desc: "Precision account-based marketing targeting enterprise decision-makers",
    },
    {
      title: "24/7 Automated Timezone Routing",
      desc: "AI qualification systems that engage global buyers while your team sleeps",
    },
    {
      title: "Multi-Currency & International Funnels",
      desc: "Dynamic localized pricing, multi-language landing pages, and regional compliance",
    },
    {
      title: "Global Cold Email Infrastructure",
      desc: "Dedicated secondary domains ensuring bulletproof deliverability into worldwide inboxes",
    },
  ];

  const currentFeatures = activeScope === "local" ? localFeatures : globalFeatures;

  return (
    <section className="w-full py-16 sm:py-20 md:py-28 bg-white relative overflow-hidden select-none border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Exact Layout Matching Reference Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: 3-Column Staggered Mosaic Grid */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 items-end max-w-[540px] mx-auto lg:mx-0">
              
              {/* COLUMN 1 */}
              <div className="flex flex-col">
                {/* 5-Star Arc Header */}
                <StarArc />
                {/* Specialist Avatar */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-md mx-auto -mb-3 relative z-10 overflow-hidden bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=140&auto=format&fit=crop&q=80"
                    alt="Lead Generation Specialist"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Stack of 3 Mosaic Tiles */}
                <div className="space-y-2.5 sm:space-y-3.5">
                  {/* Tile 1: Lilac Copilot Helmet */}
                  <div className="w-full aspect-square rounded-xl bg-[#EAE4F5] p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs">
                    <svg viewBox="0 0 100 100" fill="none" className="w-12 h-12 sm:w-16 sm:h-16 text-[#1A1A1A]">
                      {/* Helmet outline */}
                      <path d="M22 62 C20 40 32 20 52 20 C72 20 82 36 82 56 C82 72 70 82 50 82 C34 82 24 74 22 62 Z" stroke="currentColor" strokeWidth="5" fill="#FFFFFF" />
                      {/* Visor */}
                      <path d="M26 48 C34 42 66 42 76 48 C78 58 74 66 60 66 C42 66 28 62 26 48 Z" fill="currentColor" />
                      {/* Badge text */}
                      <text x="50" y="38" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="900" fontFamily="sans-serif">COPILOT</text>
                      <path d="M30 76 Q 50 72 70 76" stroke="currentColor" strokeWidth="2.5" fill="none" />
                    </svg>
                  </div>

                  {/* Tile 2: Cream Wanderlust Badge */}
                  <div className="w-full aspect-square rounded-xl bg-[#F7F4EB] p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs">
                    <svg viewBox="0 0 100 100" fill="none" className="w-12 h-12 sm:w-16 sm:h-16 text-[#3B332A]">
                      {/* Sunburst rays */}
                      <path d="M50 16 L50 24 M32 22 L37 28 M68 22 L63 28 M22 36 L29 38 M78 36 L71 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      {/* Mountain peaks */}
                      <path d="M26 62 L42 42 L52 54 L62 38 L76 62 Z" stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round" />
                      <line x1="20" y1="64" x2="80" y2="64" stroke="currentColor" strokeWidth="3" />
                      {/* Text */}
                      <text x="50" y="74" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="900" letterSpacing="0.5">WANDERLUST</text>
                      <text x="50" y="82" textAnchor="middle" fill="currentColor" fontSize="5" fontWeight="700" letterSpacing="0.8">MAP DOMINANCE</text>
                    </svg>
                  </div>

                  {/* Tile 3: Blue Mega House */}
                  <div className="w-full aspect-square rounded-xl bg-[#5B89CA] p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs text-white">
                    <svg viewBox="0 0 100 100" fill="none" className="w-12 h-12 sm:w-16 sm:h-16 text-[#0E1E38]">
                      {/* 3D Geometric House/Peaks */}
                      <path d="M20 72 L36 34 L50 48 L64 30 L80 72 Z" stroke="currentColor" strokeWidth="4" fill="#3D6AA8" strokeLinejoin="round" />
                      <path d="M50 48 L50 72" stroke="currentColor" strokeWidth="4" />
                      <text x="50" y="84" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="900" letterSpacing="0.5">MEGA HOUSE</text>
                    </svg>
                  </div>
                </div>

                {/* Subtitle Caption */}
                <div className="text-[11px] sm:text-xs text-gray-500 italic text-center mt-2.5 font-serif select-none">
                  by reza ernanda
                </div>
              </div>

              {/* COLUMN 2 (Shifted Higher with -mt-6 sm:-mt-8) */}
              <div className="flex flex-col -mt-6 sm:-mt-8">
                {/* 5-Star Arc Header */}
                <StarArc />
                {/* Specialist Avatar */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-md mx-auto -mb-3 relative z-10 overflow-hidden bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=140&auto=format&fit=crop&q=80"
                    alt="Growth Strategy Lead"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Stack of 3 Mosaic Tiles */}
                <div className="space-y-2.5 sm:space-y-3.5">
                  {/* Tile 1: Vintage Mascot on Scooter */}
                  <div className="w-full aspect-square rounded-xl bg-[#F9F6EE] p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs">
                    <svg viewBox="0 0 100 100" fill="none" className="w-12 h-12 sm:w-16 sm:h-16 text-[#3F3124]">
                      {/* Mascot bear on retro scooter */}
                      <circle cx="50" cy="30" r="10" fill="#8C5836" />
                      <circle cx="46" cy="28" r="1.5" fill="#FFFFFF" />
                      <circle cx="54" cy="28" r="1.5" fill="#FFFFFF" />
                      {/* Scarf */}
                      <path d="M42 38 Q 50 42 58 38 L64 48 L58 50 Z" fill="#2E7D32" />
                      {/* Scooter Body */}
                      <path d="M38 60 C38 52 62 52 62 60 L62 70 L38 70 Z" fill="#D32F2F" />
                      <circle cx="36" cy="74" r="6" fill="#263238" />
                      <circle cx="64" cy="74" r="6" fill="#263238" />
                      <text x="50" y="86" textAnchor="middle" fill="currentColor" fontSize="6.5" fontStyle="italic" fontWeight="700">Bazzi&apos;s Biscotti</text>
                    </svg>
                  </div>

                  {/* Tile 2: Gun Dog Illustration */}
                  <div className="w-full aspect-square rounded-xl bg-[#ECEEEF] p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs">
                    <svg viewBox="0 0 100 100" fill="none" className="w-12 h-12 sm:w-16 sm:h-16 text-[#1A1A1A]">
                      {/* Dog face */}
                      <path d="M34 32 C30 20 42 16 50 24 C58 16 70 20 66 32 C72 44 68 56 50 56 C32 56 28 44 34 32 Z" fill="#4A4A4A" />
                      {/* Snout and eyes */}
                      <circle cx="44" cy="34" r="2" fill="#FFFFFF" />
                      <circle cx="56" cy="34" r="2" fill="#FFFFFF" />
                      <ellipse cx="50" cy="42" rx="5" ry="3" fill="#1A1A1A" />
                      {/* Dumbbell / Pipe in mouth */}
                      <rect x="28" y="46" width="44" height="6" rx="2" fill="#E65100" />
                      <rect x="24" y="44" width="6" height="10" rx="2" fill="#E65100" />
                      <rect x="70" y="44" width="6" height="10" rx="2" fill="#E65100" />
                      <text x="50" y="66" textAnchor="middle" fill="currentColor" fontSize="6.5" fontWeight="900" letterSpacing="0.5">DIY</text>
                      <text x="50" y="74" textAnchor="middle" fill="currentColor" fontSize="7.5" fontWeight="900" letterSpacing="0.5">GUNDOG</text>
                    </svg>
                  </div>

                  {/* Tile 3: Peach Fox / Wolf */}
                  <div className="w-full aspect-square rounded-xl bg-[#F2D1C9] p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs">
                    <svg viewBox="0 0 100 100" fill="none" className="w-12 h-12 sm:w-16 sm:h-16 text-[#2D2A26]">
                      {/* Triangle Frame */}
                      <polygon points="50,18 20,70 80,70" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      {/* Fox Silhouette */}
                      <path d="M34 58 L42 46 L48 48 L56 42 L66 48 C72 42 76 46 72 56 C68 58 64 54 58 56 L54 62 L48 62 L44 58 Z" fill="#FFFFFF" stroke="currentColor" strokeWidth="1" />
                      {/* Tree line */}
                      <line x1="28" y1="70" x2="72" y2="70" stroke="currentColor" strokeWidth="1.5" />
                      <text x="50" y="80" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="900" letterSpacing="1">LONE OAK</text>
                      <text x="50" y="86" textAnchor="middle" fill="currentColor" fontSize="5" letterSpacing="1">STUDIOS</text>
                    </svg>
                  </div>
                </div>

                {/* Subtitle Caption */}
                <div className="text-[11px] sm:text-xs text-gray-500 italic text-center mt-2.5 font-serif select-none">
                  by Mad pepper
                </div>
              </div>

              {/* COLUMN 3 */}
              <div className="flex flex-col">
                {/* 5-Star Arc Header */}
                <StarArc />
                {/* Specialist Avatar */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-md mx-auto -mb-3 relative z-10 overflow-hidden bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=140&auto=format&fit=crop&q=80"
                    alt="Global Enterprise Specialist"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Stack of 3 Mosaic Tiles */}
                <div className="space-y-2.5 sm:space-y-3.5">
                  {/* Tile 1: Royal Blue Door T */}
                  <div className="w-full aspect-square rounded-xl bg-[#1853DB] p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs text-white">
                    <svg viewBox="0 0 100 100" fill="none" className="w-12 h-12 sm:w-16 sm:h-16">
                      {/* Bold "T" with open doorway negative space */}
                      <path d="M22 24 H78 V40 H58 V78 H42 V40 H22 Z" fill="#FFFFFF" />
                      {/* Door slit inside */}
                      <path d="M42 42 H54 V78 H42 Z" fill="#1853DB" />
                      <circle cx="50" cy="60" r="1.5" fill="#FFFFFF" />
                    </svg>
                  </div>

                  {/* Tile 2: Charcoal Fit for Purpose */}
                  <div className="w-full aspect-square rounded-xl bg-[#1E1F24] p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs text-white">
                    <div className="text-center">
                      <div className="text-base sm:text-lg font-black tracking-tight leading-none text-white font-sans">
                        Fit f<span className="text-[#26C6DA] inline-block animate-pulse">●</span>r
                      </div>
                      <div className="text-base sm:text-lg font-black tracking-tight leading-none text-white font-sans mt-1">
                        Purpose
                      </div>
                    </div>
                  </div>

                  {/* Tile 3: Vibrant Orange Gradient -N- */}
                  <div className="w-full aspect-square rounded-xl bg-gradient-to-tr from-[#FF5E3A] via-[#FF6E4A] to-[#FF8C68] p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs text-white">
                    <svg viewBox="0 0 100 100" fill="none" className="w-12 h-12 sm:w-16 sm:h-16">
                      <line x1="24" y1="50" x2="36" y2="50" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
                      {/* Monogram N */}
                      <path d="M42 66 V34 L58 66 V34" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="64" y1="50" x2="76" y2="50" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Subtitle Caption */}
                <div className="text-[11px] sm:text-xs text-gray-500 italic text-center mt-2.5 font-serif select-none">
                  by Radovan Ciobanenco
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Exact Typography, Spacing & Alignment matching reference */}
          <div className="lg:col-span-6 xl:col-span-5 max-w-xl">
            
            {/* Interactive Scope Switcher Pills */}
            <div className="inline-flex p-1 bg-gray-100/80 border border-gray-200/60 rounded-full mb-6 sm:mb-8 select-none">
              <button
                type="button"
                onClick={() => setActiveScope("local")}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeScope === "local"
                    ? "bg-[#1B4E2C] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
              >
                Local Lead Generation
              </button>

              <button
                type="button"
                onClick={() => setActiveScope("global")}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeScope === "global"
                    ? "bg-[#1853DB] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
              >
                Global Lead Generation
              </button>
            </div>

            {/* Main Headline (Styled with reference coral/reddish #E85038) */}
            <h2 
              className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black text-[#E85038] tracking-tight leading-[1.12]"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              {activeScope === "local" ? (
                <>
                  Work with local lead<br />
                  experts you can trust
                </>
              ) : (
                <>
                  Work with global lead<br />
                  experts you can trust
                </>
              )}
            </h2>

            {/* Signature Underline Bar matching screenshot */}
            <div className="w-12 h-1 bg-[#E85038] rounded-full my-6 sm:my-7" />

            {/* Description Paragraph */}
            <p 
              className="text-[#475569] text-sm sm:text-base leading-relaxed mb-6 font-normal"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {activeScope === "local"
                ? "Feel confident dominating your local market. Engineered for businesses serving specific cities and regional territories, our specialists capture high-intent customers who need services immediately and prefer trusted local providers."
                : "Feel confident scaling worldwide. Built for SaaS, B2B enterprises, and global consultancies, our specialists deploy cross-border pipelines across multiple time zones, currencies, and international regulatory frameworks."}
            </p>

            {/* Tactical Deliverable Pillars */}
            <div className="space-y-2.5 mb-8">
              {currentFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#41B349] shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    <strong className="text-gray-900 font-bold">{feat.title}: </strong>
                    <span className="text-[#475569]">{feat.desc}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Call to Action Link with Arrow matching reference */}
            <button
              type="button"
              onClick={openQuote}
              className="inline-flex items-center gap-2.5 font-bold text-sm sm:text-base text-[#0D0F12] hover:text-[#E85038] transition-colors cursor-pointer group"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              <span>{activeScope === "local" ? "Launch local market plan" : "Launch global market plan"}</span>
              <ArrowRight className="w-4 h-4 text-[#E85038] group-hover:translate-x-1.5 transition-transform" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

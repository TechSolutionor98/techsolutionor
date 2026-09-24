"use client";

import React from "react";
import { MapPin, Globe, CheckCircle2, ArrowRight } from "lucide-react";
import { useQuote } from "@/app/_context/QuoteContext";
import { getCmsVal } from "@/lib/api-helper";

export default function LocalVsGlobalLeadGen({ cmsContent }) {
  const { openQuote } = useQuote();

  const badge = getCmsVal(cmsContent, "MARKET SCOPE & GEOGRAPHIC STRATEGY", "leadgen_scope");
  const heading = getCmsVal(cmsContent, "Local vs. Global Lead Generation Strategies", "leadgen_scope");
  const localTitle = getCmsVal(cmsContent, "Local Lead Generation", "leadgen_scope");
  const globalTitle = getCmsVal(cmsContent, "Global Lead Generation", "leadgen_scope");
  const subtitle = getCmsVal(
    cmsContent,
    "Whether your business thrives on local city walk-ins and direct phone inquiries or scales worldwide across multiple time zones and currencies, we calibrate acquisition pipelines engineered specifically for your commercial territory.",
    "leadgen_scope"
  );

  return (
    <section className="w-full py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden select-none border-b border-gray-100">
      {/* Background Architectural Grid Accent */}
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
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4E2C]/10 border border-[#1B4E2C]/20 text-[#1B4E2C] font-extrabold text-xs sm:text-sm uppercase tracking-widest mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
            <span>{badge}</span>
          </div>

          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#0D0F12] tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {heading}
          </h2>

          <p 
            className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl mx-auto font-normal"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {subtitle}
          </p>
        </div>

        {/* Side-by-Side Comparative Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Local Lead Generation */}
          <div className="bg-[#FFFFFF] rounded-[24px] p-7 sm:p-9 border-2 border-emerald-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(27,78,44,0.12)] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#1B4E2C] text-white flex items-center justify-center shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <span 
                  className="text-xs font-bold text-[#1B4E2C] bg-[#1B4E2C]/10 px-3 py-1 rounded-full uppercase"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Regional Dominance
                </span>
              </div>

              <h3 
                className="text-2xl font-black text-[#0D0F12] mb-3 group-hover:text-[#1B4E2C] transition-colors"
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
              >
                {localTitle}
              </h3>

              <p 
                className="text-[#475569] text-sm leading-relaxed mb-6 font-normal"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Engineered for businesses serving specific cities, regional territories, and local metro areas. We capture high-intent customers who need services immediately and prefer trusted local providers.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#41B349] shrink-0 mt-0.5" />
                  <span><strong>Google Business Profile Top-3 Map Pack:</strong> Dominate local map search when customers search 'near me'</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#41B349] shrink-0 mt-0.5" />
                  <span><strong>Hyper-Targeted Local Radius Ads:</strong> Geo-fenced Google & Meta campaigns zeroed in on your exact service radius</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#41B349] shrink-0 mt-0.5" />
                  <span><strong>Instant Direct Call & WhatsApp Triggers:</strong> High-converting 1-tap mobile call links that ring your phone instantly</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#41B349] shrink-0 mt-0.5" />
                  <span><strong>Local Authority Citations:</strong> Local directory listings, neighborhood reviews, and community social proof</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-gray-400 font-mono block">Best Suited For:</span>
                <span className="text-xs font-bold text-gray-800">Clinics, Real Estate, Legal, Home Services, Retail, Agencies</span>
              </div>
              <button
                type="button"
                onClick={openQuote}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B4E2C] hover:bg-[#153e23] text-white font-bold text-xs transition-colors cursor-pointer shrink-0 shadow-xs"
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
              >
                <span>Launch Local Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Global Lead Generation */}
          <div className="bg-[#FFFFFF] rounded-[24px] p-7 sm:p-9 border-2 border-blue-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <Globe className="w-6 h-6" />
                </div>
                <span 
                  className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Cross-Border Enterprise
                </span>
              </div>

              <h3 
                className="text-2xl font-black text-[#0D0F12] mb-3 group-hover:text-blue-600 transition-colors"
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
              >
                {globalTitle}
              </h3>

              <p 
                className="text-[#475569] text-sm leading-relaxed mb-6 font-normal"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Built for SaaS, B2B enterprises, e-commerce brands, and global consultancies scaling commercial pipelines across North America, Europe, the Middle East, Asia, and worldwide markets.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Multi-Market LinkedIn Prospecting:</strong> Precision account-based marketing targeting enterprise decision-makers</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>24/7 Automated Timezone Routing:</strong> AI qualification systems that engage global buyers while your team sleeps</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Multi-Currency & International Funnels:</strong> Dynamic localized pricing, multi-language landing pages, and regional compliance</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Global Cold Email Infrastructure:</strong> Dedicated secondary domains ensuring bulletproof deliverability into worldwide inboxes</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-gray-400 font-mono block">Best Suited For:</span>
                <span className="text-xs font-bold text-gray-800">B2B SaaS, IT Services, Global Exporters, Enterprise Consultancies</span>
              </div>
              <button
                type="button"
                onClick={openQuote}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer shrink-0 shadow-xs"
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
              >
                <span>Launch Global Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

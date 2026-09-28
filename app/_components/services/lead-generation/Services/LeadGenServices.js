"use client";

import React from "react";
import { useQuote } from "@/app/_context/QuoteContext";
import { ArrowUpRight } from "lucide-react";
import { getServiceOfferings } from "@/app/_data/servicesOfferingsData";
import { getCmsVal } from "@/lib/api-helper";

/**
 * LeadGenServices Component
 * Redesigned modern, clean, and professional card layout for Lead Generation Services.
 * Features crisp white cards with signature #41B349 green borders, soft mint badge icons,
 * circular arrow buttons, refined typography, and mint pill tags matching the exact design specification.
 */
export default function LeadGenServices({ cmsContent }) {
  const { openQuote } = useQuote();
  const data = getServiceOfferings("lead-generation");

  const displayBadge = getCmsVal(
    cmsContent,
    data?.badge || "FULL-FUNNEL LEAD ACQUISITION",
    "leadgen_services_badge"
  );
  const displayTitle = getCmsVal(
    cmsContent,
    data?.title || "Our Lead Generation",
    "leadgen_services_title"
  );
  const displayTitleHighlight = getCmsVal(
    cmsContent,
    data?.titleHighlight || "Services",
    "leadgen_services_highlight"
  );
  const displaySubtitle = getCmsVal(
    cmsContent,
    data?.subtitle ||
      "From high-intent inbound search to precision outbound sequences, we deploy full-funnel lead acquisition engines tailored for local and global enterprises.",
    "leadgen_services_subtitle"
  );
  const servicesList = data?.services || [];

  return (
    <section className="w-full py-16 sm:py-20 md:py-24 bg-white font-sans relative overflow-hidden">
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

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4E2C]/10 border border-[#1B4E2C]/20 text-[#1B4E2C] font-extrabold text-xs sm:text-sm uppercase tracking-widest mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
            <span>{displayBadge}</span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#0D0F12] tracking-tight leading-tight"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {displayTitle}{" "}
            {displayTitleHighlight && (
              <span className="text-[#41B349]">{displayTitleHighlight}</span>
            )}
          </h2>

          {displaySubtitle && (
            <p
              className="text-sm sm:text-base text-[#475569] mt-3 font-normal leading-relaxed max-w-2xl mx-auto"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {displaySubtitle}
            </p>
          )}
        </div>

        {/* Lead Generation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {servicesList.map((service, idx) => {
            const IconComponent = service.icon;
            const serviceTitle = getCmsVal(cmsContent, service.title, `leadgen_service_${idx}_title`);
            const serviceDesc = getCmsVal(cmsContent, service.desc, `leadgen_service_${idx}_desc`);
            const isLastOdd = idx === servicesList.length - 1 && servicesList.length % 3 === 1;

            return (
              <div
                key={idx}
                onClick={openQuote}
                className={`group rounded-none p-6 sm:p-7 md:p-8 flex flex-col h-full bg-white border-2 border-[#41B349] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(27,78,44,0.12)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  isLastOdd
                    ? "lg:col-start-2 md:max-lg:col-span-2 md:max-lg:max-w-[420px] md:max-lg:mx-auto md:max-lg:w-full"
                    : ""
                }`}
              >
                {/* Top Row: Icon + Arrow */}
                <div className="flex items-center justify-between mb-5">
                  {/* Soft Mint Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-[#EAF7EE] text-[#1B4E2C] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
                    {IconComponent ? (
                      <IconComponent className="w-6 h-6 stroke-[1.8]" />
                    ) : (
                      <ArrowUpRight className="w-6 h-6 stroke-[1.8]" />
                    )}
                  </div>

                  {/* Circular Action Arrow */}
                  <div className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-slate-200/80 flex items-center justify-center text-slate-400 group-hover:bg-[#1B4E2C] group-hover:text-white group-hover:border-[#1B4E2C] transition-all duration-300 shrink-0">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>

                {/* Service Title */}
                <h3
                  className="font-bold text-[19px] sm:text-[21px] text-[#0D0F12] tracking-tight mb-3 leading-snug"
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  {serviceTitle}
                </h3>

                {/* Description */}
                <p
                  className="text-[14px] sm:text-[14.5px] text-[#475569] leading-relaxed font-normal"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {serviceDesc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

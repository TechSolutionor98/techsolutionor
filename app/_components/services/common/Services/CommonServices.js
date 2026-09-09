"use client";

import React from "react";
import { useQuote } from "@/app/_context/QuoteContext";
import { ArrowUpRight } from "lucide-react";
import { getServiceOfferings } from "@/app/_data/servicesOfferingsData";

/**
 * Reusable CommonServices Component
 * Renders the exact same 6-card services grid UI, design, styling, typography,
 * hover animations, and quote trigger as WebServices across all service pages.
 *
 * @param {string} serviceKey - Service identifier (e.g. "web-development", "app-development", etc.)
 * @param {string} badge - Optional badge override
 * @param {string} title - Optional title prefix override
 * @param {string} titleHighlight - Optional highlighted title suffix override
 * @param {string} subtitle - Optional subtitle override
 * @param {Array} services - Optional array of service offerings override
 */
export default function CommonServices({
  serviceKey = "web-development",
  badge,
  title,
  titleHighlight,
  subtitle,
  services,
}) {
  const { openQuote } = useQuote();
  const data = getServiceOfferings(serviceKey);

  const displayBadge = badge || data?.badge || "FULL-CYCLE ENGINEERING";
  const displayTitle = title || data?.title || "Our Professional";
  const displayTitleHighlight =
    titleHighlight !== undefined ? titleHighlight : data?.titleHighlight || "Services";
  const displaySubtitle = subtitle || data?.subtitle || "";
  const displayServices = services || data?.services || [];

  return (
    <section className="w-full py-16 sm:py-20 md:py-24 bg-white font-sans relative overflow-hidden select-none">
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

        {/* 6-Card Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
          {displayServices.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div
                key={idx}
                onClick={openQuote}
                className="group rounded-[22px] p-6 sm:p-7 flex flex-col justify-between h-full min-h-[330px] bg-white border-2 border-[#41b349] shadow-[0_4px_18px_rgba(0,0,0,0.05)] hover:bg-[#41b349] hover:border-[#41b349] hover:shadow-[0_12px_32px_rgba(65,179,73,0.32)] hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                {/* Top Row: Icon + Arrow */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#41b349]/10 text-[#1B4E2C] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center transition-colors duration-300">
                      {IconComponent ? (
                        <IconComponent className="w-6 h-6" />
                      ) : (
                        <ArrowUpRight className="w-6 h-6" />
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 group-hover:bg-white group-hover:border-transparent flex items-center justify-center text-gray-400 group-hover:text-[#1B4E2C] transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold text-[18px] sm:text-[19px] md:text-[20px] mb-3 leading-snug text-[#0D0F12] group-hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13.5px] sm:text-[14px] leading-relaxed font-normal text-[#475569] group-hover:text-white/95 transition-colors duration-300 mb-5">
                    {service.desc}
                  </p>
                </div>

                {/* Bottom Tags */}
                {service.tags && service.tags.length > 0 && (
                  <div className="pt-4 border-t border-gray-100 group-hover:border-white/20 transition-colors duration-300 flex flex-wrap gap-1.5">
                    {service.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#41B349]/10 text-[#1B4E2C] group-hover:bg-white/20 group-hover:text-white transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { useQuote } from "@/app/_context/QuoteContext";
import { ArrowUpRight } from "lucide-react";
import { getServiceOfferings } from "@/app/_data/servicesOfferingsData";
import {
  SectionBadge,
  SectionHeading,
  HighlightWord,
  SectionParagraph,
  CardHeading,
  CardParagraph,
} from "@/components/Typography";

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
    <section className="w-full py-16 sm:py-20 md:py-24 bg-white font-jakarta relative overflow-hidden select-none">
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
          <div className="mb-3">
            <SectionBadge variant="light">
              {displayBadge}
            </SectionBadge>
          </div>

          <SectionHeading
            as="h2"
            size="section"
            theme="dark"
            className="text-center"
          >
            {displayTitle}{" "}
            {displayTitleHighlight && (
              <HighlightWord>{displayTitleHighlight}</HighlightWord>
            )}
          </SectionHeading>

          {displaySubtitle && (
            <SectionParagraph
              size="md"
              theme="slate"
              className="mt-3 max-w-2xl mx-auto text-center"
            >
              {displaySubtitle}
            </SectionParagraph>
          )}
        </div>

        {/* 6-Card Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {displayServices.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div
                key={idx}
                onClick={openQuote}
                className="group relative rounded-[28px] pt-9 pb-10 px-6 sm:px-8 flex flex-col items-center text-center h-full min-h-[350px] bg-white border-t-[3.5px] border-t-[#41B349] border-x-0 border-b-0 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(65,179,73,0.22)] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer overflow-hidden [isolation:isolate]"
              >
                {/* Bottom-to-Top Hover Fill Overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-[#2E8B35] to-[#41B349] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none z-0" 
                />

                {/* Card Content */}
                <div className="relative z-10 flex flex-col items-center w-full h-full">
                  {/* Centered Circular Icon Badge */}
                  <div className="w-[74px] h-[74px] sm:w-[80px] sm:h-[80px] rounded-full bg-[#41B349] text-white group-hover:bg-white group-hover:text-[#41B349] flex items-center justify-center mb-6 sm:mb-7 shadow-[0_8px_20px_rgba(65,179,73,0.28)] group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-all duration-500 ease-out">
                    {IconComponent ? (
                      <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 transition-colors duration-500" />
                    ) : (
                      <ArrowUpRight className="w-8 h-8 sm:w-9 sm:h-9 transition-colors duration-500" />
                    )}
                  </div>

                  {/* Title */}
                  <CardHeading
                    as="h3"
                    size="md"
                    theme="dark"
                    className="group-hover:text-white mb-3.5 leading-snug"
                  >
                    {service.title}
                  </CardHeading>

                  {/* Description */}
                  <CardParagraph 
                    size="sm"
                    theme="slate"
                    className="group-hover:text-white/95 leading-relaxed"
                  >
                    {service.desc}
                  </CardParagraph>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

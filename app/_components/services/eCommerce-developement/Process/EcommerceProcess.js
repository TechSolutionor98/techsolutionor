"use client";

import React, { useState } from "react";
import { Search, Layers, PenTool, Code2, ShieldCheck, Rocket } from "lucide-react";
import { getCmsVal } from "@/lib/api-helper";
import {
  SectionBadge,
  SectionHeading,
  HighlightWord,
  SectionParagraph,
  CardHeading,
  CardParagraph,
} from "@/components/Typography";

/**
 * Our E-Commerce Development Process Data
 * Authentic, industry-standard e-commerce engineering lifecycle
 * matching the reference serpentine / winding circuit pipeline UI.
 */
const ecommerceProcessStages = [
  {
    id: "stage-1",
    stepNumber: "01",
    title: "E-Commerce Discovery & Strategy",
    badgePosition: "top",
    icon: Search,
    description:
      "We begin by deconstructing your business model, catalog taxonomy, target audience, and sales objectives. We determine platform suitability (Shopify Plus, Magento, or WooCommerce), custom API requirements, and an omnichannel delivery roadmap.",
    desktopStyle: {
      left: "2.5%",
      top: "13.095%",
      width: "15.833%",
      height: "73.81%",
    },
  },
  {
    id: "stage-2",
    stepNumber: "02",
    title: "Store Architecture & UX Planning",
    badgePosition: "bottom",
    icon: Layers,
    description:
      "We design intuitive customer conversion funnels, catalog filtering logic, and seamless checkout journeys. We map inventory sync workflows, database schemas, and ERP/CRM integration pipelines to eliminate operational bottlenecks.",
    desktopStyle: {
      left: "18.333%",
      top: "13.095%",
      width: "15.833%",
      height: "73.81%",
    },
  },
  {
    id: "stage-3",
    stepNumber: "03",
    title: "UI/UX & Storefront Design",
    badgePosition: "top",
    icon: PenTool,
    description:
      "Our creative team crafts bespoke, mobile-first storefront prototypes in Figma. We focus on frictionless product discovery, sticky add-to-cart interactions, trust signals, and streamlined one-page checkout experiences.",
    desktopStyle: {
      left: "34.167%",
      top: "13.095%",
      width: "15.833%",
      height: "73.81%",
    },
  },
  {
    id: "stage-4",
    stepNumber: "04",
    title: "Development & Platform Integration",
    badgePosition: "bottom",
    icon: Code2,
    description:
      "Our engineers develop robust frontend and backend architectures with clean, modular code. We build custom store extensions, integrate third-party apps, connect ERP systems, and configure automated inventory feeds.",
    desktopStyle: {
      left: "50.000%",
      top: "13.095%",
      width: "15.833%",
      height: "73.81%",
    },
  },
  {
    id: "stage-5",
    stepNumber: "05",
    title: "Payment, Security & QA Testing",
    badgePosition: "top",
    icon: ShieldCheck,
    description:
      "We integrate PCI-DSS compliant payment gateways with multi-currency support, SSL security, and fraud protection. We perform rigorous functional testing, speed audits, and high-concurrency checkout stress tests.",
    desktopStyle: {
      left: "65.833%",
      top: "13.095%",
      width: "15.833%",
      height: "73.81%",
    },
  },
  {
    id: "stage-6",
    stepNumber: "06",
    title: "Launch & Post-Launch Optimization",
    badgePosition: "bottom",
    icon: Rocket,
    description:
      "We execute seamless zero-downtime store migration, configure SEO redirects, and verify tracking analytics. Post-launch, we provide 24/7 technical monitoring, continuous CRO enhancements, and dedicated SLA maintenance.",
    desktopStyle: {
      left: "81.667%",
      top: "13.095%",
      width: "15.833%",
      height: "73.81%",
    },
  },
];

export default function EcommerceProcess({ cmsContent }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const dynamicBadge = getCmsVal(cmsContent, "AGILE COMMERCE LIFECYCLE", "ecommerceprocess");
  const dynamicSubtitle = getCmsVal(
    cmsContent,
    "From merchant discovery and high-converting UX architecture to custom platform engineering, automated QA testing, and omnichannel deployment, we build scalable online storefronts engineered to maximize sales.",
    "ecommerceprocess"
  );

  return (
    <section
      id="ecommerce-development-process"
      className="w-full py-16 sm:py-20 md:py-24 bg-[#FFFFFF] text-[#0D0F12] relative overflow-hidden select-none"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#41B349]/10 via-[#41B349]/5 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Subtle Dot Grid Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#0D0F12 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 md:mb-20">
          {/* Eyebrow Badge matching Homepage Typography */}
          <div className="mb-3">
            <SectionBadge variant="light">
              {dynamicBadge}
            </SectionBadge>
          </div>

          {/* Main Title matching Homepage Typography */}
          <SectionHeading
            as="h2"
            size="section"
            theme="dark"
            className="text-center mb-3.5"
          >
            Our E-Commerce Development{" "}
            <HighlightWord>Process</HighlightWord>
          </SectionHeading>

          {/* Subtitle matching Homepage Typography */}
          <SectionParagraph
            size="md"
            theme="slate"
            className="max-w-2xl mx-auto text-center"
          >
            {dynamicSubtitle}
          </SectionParagraph>
        </div>

        {/* ========================================================================= */}
        {/* 6-CARD SERPENTINE / WINDING PIPELINE CONTAINER                             */}
        {/* Exactly matching reference screenshot geometry, alternating line & badges */}
        {/* ========================================================================= */}
        <div className="relative max-w-[1240px] mx-auto w-full">
          
          {/* ======================================================================= */}
          {/* DESKTOP VIEW (lg:block): Continuous Serpentine SVG Line with 6 Columns  */}
          {/* ======================================================================= */}
          <div className="hidden lg:block relative w-full" style={{ height: "440px" }}>
            
            {/* SVG SERPENTINE CIRCUIT BORDER OVERLAY */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 1200 420"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Filter for subtle green glow on hover */}
              <defs>
                <filter id="ecommerce-green-glow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#41B349" floodOpacity="0.5" />
                </filter>
              </defs>

              {/* CONTINUOUS SERPENTINE CIRCUIT LINE */}
              <path
                d="M 30,210 V 79 A 24,24 0 0,1 54,55 H 196 A 24,24 0 0,1 220,79 V 341 A 24,24 0 0,0 244,365 H 386 A 24,24 0 0,0 410,341 V 79 A 24,24 0 0,1 434,55 H 576 A 24,24 0 0,1 600,79 V 341 A 24,24 0 0,0 624,365 H 766 A 24,24 0 0,0 790,341 V 79 A 24,24 0 0,1 814,55 H 956 A 24,24 0 0,1 980,79 V 341 A 24,24 0 0,0 1004,365 H 1146 A 24,24 0 0,0 1170,341 V 210"
                stroke="#41B349"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                filter={hoveredIdx !== null ? "url(#ecommerce-green-glow)" : "none"}
                className="transition-all duration-300"
              />

              {/* TERMINAL START NODE DOT (Card 1 Left Edge at y=210) */}
              <circle
                cx="30"
                cy="210"
                r="6"
                fill="#FFFFFF"
                stroke="#41B349"
                strokeWidth="2"
                className="transition-colors duration-300"
              />

              {/* TERMINAL END NODE DOT (Card 6 Right Edge at y=210) */}
              <circle
                cx="1170"
                cy="210"
                r="6"
                fill="#FFFFFF"
                stroke="#41B349"
                strokeWidth="2"
                className="transition-colors duration-300"
              />
            </svg>

            {/* 6 DESKTOP CARDS & CIRCULAR BADGES */}
            {ecommerceProcessStages.map((stage, idx) => {
              const IconComp = stage.icon;
              const isHovered = hoveredIdx === idx;
              const isTop = stage.badgePosition === "top";

              return (
                <div
                  key={stage.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={stage.desktopStyle}
                  className="absolute z-20 flex flex-col items-center justify-between text-center transition-all duration-300 cursor-pointer group px-2 sm:px-2.5"
                >
                  {/* TOP BADGE (For Cards 1, 3, 5) */}
                  {isTop ? (
                    <div
                      className={`w-[52px] h-[52px] rounded-full flex items-center justify-center shrink-0 -translate-y-1/2 transition-all duration-300 z-30 shadow-md ${
                        isHovered
                          ? "bg-[#41B349] text-white border-2 border-[#41B349] shadow-[0_0_20px_rgba(65,179,73,0.45)] scale-110"
                          : "bg-[#FFFFFF] border-2 border-[#41B349] text-[#0D0F12]"
                      }`}
                    >
                      <IconComp
                        size={22}
                        className={`transition-colors duration-300 ${
                          isHovered ? "stroke-[2.2] text-white" : "stroke-[1.8] text-[#0D0F12]"
                        }`}
                      />
                    </div>
                  ) : (
                    <div className="h-6 shrink-0" />
                  )}

                  {/* Card Content (Title + Description) */}
                  <div className="flex-1 flex flex-col items-center justify-center py-2 px-1">
                    {/* Stage Title matching Homepage Typography */}
                    <CardHeading
                      as="h3"
                      size="sm"
                      theme="inherit"
                      className={`!text-[13.5px] xl:!text-[15px] leading-snug mb-2 transition-colors duration-300 ${
                        isHovered ? "text-[#41B349]" : "text-[#0D0F12]"
                      }`}
                    >
                      {stage.title}
                    </CardHeading>

                    {/* Stage Description matching Homepage Typography */}
                    <CardParagraph
                      size="xs"
                      theme="slate"
                      className="!text-[11px] xl:!text-[12px] leading-[1.65] line-clamp-6"
                    >
                      {stage.description}
                    </CardParagraph>
                  </div>

                  {/* BOTTOM BADGE (For Cards 2, 4, 6) */}
                  {!isTop ? (
                    <div
                      className={`w-[52px] h-[52px] rounded-full flex items-center justify-center shrink-0 translate-y-1/2 transition-all duration-300 z-30 shadow-md ${
                        isHovered
                          ? "bg-[#41B349] text-white border-2 border-[#41B349] shadow-[0_0_20px_rgba(65,179,73,0.45)] scale-110"
                          : "bg-[#FFFFFF] border-2 border-[#41B349] text-[#0D0F12]"
                      }`}
                    >
                      <IconComp
                        size={22}
                        className={`transition-colors duration-300 ${
                          isHovered ? "stroke-[2.2] text-white" : "stroke-[1.8] text-[#0D0F12]"
                        }`}
                      />
                    </div>
                  ) : (
                    <div className="h-6 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* ======================================================================= */}
          {/* MOBILE / TABLET VIEW (lg:hidden): Responsive Connected Timeline Cards   */}
          {/* ======================================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden">
            {ecommerceProcessStages.map((stage, idx) => {
              const IconComp = stage.icon;
              const isHovered = hoveredIdx === idx;

              return (
                <div
                  key={`mobile-${stage.id}`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="rounded-[22px] bg-[#FFFFFF] border-2 border-[#41B349] p-6 flex flex-col items-center text-center justify-start transition-all duration-300 shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_32px_rgba(65,179,73,0.18)] cursor-pointer relative"
                >
                  {/* Top Circular Icon Node */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300 shadow-md ${
                      isHovered
                        ? "bg-[#41B349] text-white border-2 border-[#41B349] shadow-[0_0_20px_rgba(65,179,73,0.45)] scale-105"
                        : "bg-[#FFFFFF] border-2 border-[#41B349] text-[#0D0F12]"
                    }`}
                  >
                    <IconComp
                      size={24}
                      className={isHovered ? "stroke-[2.2] text-white" : "stroke-[1.8] text-[#0D0F12]"}
                    />
                  </div>

                  {/* Step Pill matching Homepage styling */}
                  <span className="font-jakarta font-semibold text-[10.5px] uppercase tracking-wider text-[#2C9434] bg-[#41B349]/10 px-2.5 py-0.5 rounded-full border border-[#41B349]/25 mb-2.5">
                    STEP {stage.stepNumber}
                  </span>

                  {/* Title matching Homepage Typography */}
                  <CardHeading
                    as="h3"
                    size="sm"
                    theme="inherit"
                    className={`mb-2.5 px-1 transition-colors duration-300 ${
                      isHovered ? "text-[#41B349]" : "text-[#0D0F12]"
                    }`}
                  >
                    {stage.title}
                  </CardHeading>

                  {/* Description matching Homepage Typography */}
                  <CardParagraph
                    size="sm"
                    theme="slate"
                    className="leading-relaxed"
                  >
                    {stage.description}
                  </CardParagraph>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

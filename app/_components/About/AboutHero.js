"use client";

import React from "react";
import { FaArrowRight, FaChevronDown, FaCheckCircle } from "react-icons/fa";
import { useQuote } from "@/app/_context/QuoteContext";
import { getCmsVal } from "@/lib/api-helper";
import {
    SectionBadge,
    SectionHeading,
    HighlightWord,
    SectionParagraph,
    ButtonText
} from "@/components/Typography";

const AboutHero = ({ cmsContent }) => {
    const { openQuote } = useQuote();

    const badge = getCmsVal(cmsContent, "DISCOVER OUR STORY & PURPOSE", "abouthero");
    const heading = getCmsVal(
        cmsContent,
        "Engineering Digital Excellence, Delivering Scalable Realities",
        "abouthero"
    );
    const description = getCmsVal(
        cmsContent,
        "TechSolutionor is a premier technology & software engineering agency based in the UAE, powering brands worldwide. We architect modern web applications, bespoke enterprise systems, and result-driven digital strategies that turn ambitious visions into sustainable market leaders.",
        "abouthero"
    );
    const cta1 = getCmsVal(cmsContent, "Start Your Project", "abouthero");
    const cta2 = getCmsVal(cmsContent, "Explore Our Story", "abouthero");

    const scrollToContent = () => {
        const target = document.getElementById("who-we-are");
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative w-full bg-white overflow-hidden py-20 md:py-28 select-none">
            {/* Ambient Emerald Glow for Light Theme */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle_at_top,_rgba(65,179,73,0.1)_0%,_transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#41B34910_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Micro-Badge */}
                <div className="flex justify-center mb-6">
                    <SectionBadge variant="light">
                        {badge}
                    </SectionBadge>
                </div>

                {/* Primary Heading */}
                <SectionHeading as="h1" size="hero" theme="dark" className="max-w-4xl mx-auto">
                    {heading.includes("Scalable Realities") ? (
                        <>
                            Engineering Digital Excellence, Delivering{" "}
                            <HighlightWord>Scalable Realities</HighlightWord>
                        </>
                    ) : (
                        heading
                    )}
                </SectionHeading>

                {/* Description */}
                <SectionParagraph size="lg" theme="slate" className="mt-6 max-w-3xl mx-auto">
                    {description}
                </SectionParagraph>

                {/* Quick Impact Highlight Badges */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 font-jakarta text-xs sm:text-[13px] font-semibold text-[#374151] tracking-[-0.01em]">
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-sm">
                        <FaCheckCircle className="text-[#41B349] text-xs" />
                        <span>10+ Years of Craft</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-sm">
                        <FaCheckCircle className="text-[#41B349] text-xs" />
                        <span>150+ Enterprise Solutions</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-sm">
                        <FaCheckCircle className="text-[#41B349] text-xs" />
                        <span>99% Client Retention</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-sm">
                        <FaCheckCircle className="text-[#41B349] text-xs" />
                        <span>24/7 Global Delivery</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={openQuote}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#41B349] hover:bg-[#369c3d] text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#41B349]/25 hover:scale-[1.02] cursor-pointer"
                    >
                        <ButtonText className="text-sm sm:text-base">{cta1}</ButtonText>
                        <FaArrowRight size={13} />
                    </button>
                    <button
                        onClick={scrollToContent}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#111827] hover:text-[#41B349] px-7 py-4 rounded-full border border-gray-200 shadow-sm transition-all duration-300 hover:border-gray-300 cursor-pointer"
                    >
                        <ButtonText className="text-sm sm:text-base">{cta2}</ButtonText>
                        <FaChevronDown size={11} className="text-[#41B349]" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaExternalLinkAlt, FaCheckCircle } from "react-icons/fa";
import { useQuote } from "@/app/_context/QuoteContext";
import HireUsBanner from "../../../components/Images/aboutbg2.webp";
import {
    SectionBadge,
    SectionHeading,
    HighlightWord,
    SectionParagraph,
    ButtonText
} from "@/components/Typography";

const ExperiencePlatforms = () => {
    const { openQuote } = useQuote();

    return (
        <section className="relative w-full py-20 sm:py-28 overflow-hidden select-none">
            {/* Background Image with Dark Vignette Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={HireUsBanner}
                    alt="Work with TechSolutionor"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07090C]/95 via-[#0A0D12]/90 to-[#07090C]/95" />
            </div>

            {/* Ambient Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#41B349]/20 blur-3xl pointer-events-none rounded-full" />

            {/* Content Container */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <div className="flex justify-center mb-6">
                    <SectionBadge variant="dark">
                        LET&apos;S BUILD SOMETHING EXTRAORDINARY
                    </SectionBadge>
                </div>

                <SectionHeading as="h2" size="hero" theme="light" className="max-w-4xl mx-auto mb-6">
                    Ready to Accelerate Your{" "}
                    <HighlightWord>Digital Transformation?</HighlightWord>
                </SectionHeading>

                <SectionParagraph size="lg" theme="light" className="max-w-2xl mx-auto mb-10">
                    Partner with our senior engineering team to design, build, and deploy high-impact software that scales seamlessly with your business ambition.
                </SectionParagraph>

                {/* Conversion Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                    <button
                        onClick={openQuote}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#41B349] hover:bg-[#369c3d] text-white px-9 py-4 rounded-full transition-all duration-300 shadow-xl shadow-[#41B349]/30 hover:scale-[1.02] cursor-pointer"
                    >
                        <ButtonText className="text-sm sm:text-base">Schedule a Consultation</ButtonText>
                        <FaArrowRight size={13} />
                    </button>

                    <Link
                        href="/our-portfolio"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white px-8 py-4 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300"
                    >
                        <ButtonText className="text-sm sm:text-base">Explore Our Portfolio</ButtonText>
                        <FaExternalLinkAlt size={12} className="text-[#41B349]" />
                    </Link>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center gap-6 font-jakarta text-xs sm:text-sm font-semibold text-gray-300 tracking-[-0.01em]">
                    <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-[#41B349]" />
                        <span>Free Initial Technical Discovery</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-[#41B349]" />
                        <span>Strict NDA & IP Protection</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-[#41B349]" />
                        <span>24-Hour Response SLA</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperiencePlatforms;

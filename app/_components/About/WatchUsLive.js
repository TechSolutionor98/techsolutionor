"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaArrowRight, FaBolt } from "react-icons/fa";
import { useQuote } from "@/app/_context/QuoteContext";
import InnovationImage from "../../../components/Images/aboutbg1.webp";
import {
    SectionBadge,
    SectionHeading,
    HighlightWord,
    SectionParagraph,
    CardHeading,
    CardParagraph,
    ButtonText
} from "@/components/Typography";

const cultureHighlights = [
    "Rigorous Automated CI/CD & Code Quality Audits",
    "Continuous R&D in Generative AI, Cloud & Modern Web",
    "Direct Engineering Collaboration with Zero Bureaucracy",
    "Comprehensive Post-Launch Maintenance & SLA Guarantees",
];

const WatchUsLive = () => {
    const { openQuote } = useQuote();

    return (
        <section className="relative w-full bg-[#0A0D12] py-20 md:py-28 overflow-hidden select-none">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(65,179,73,0.12)_0%,_transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left: Culture Copy */}
                    <div className="lg:col-span-6 space-y-6 text-left">
                        <SectionBadge variant="dark">
                            INNOVATION & ENGINEERING CULTURE
                        </SectionBadge>

                        <SectionHeading as="h2" size="section" theme="light">
                            A Dynamic Hub Where{" "}
                            <HighlightWord>Visionary Ideas</HighlightWord>{" "}
                            Thrive
                        </SectionHeading>

                        <SectionParagraph size="lg" theme="light">
                            At TechSolutionor, our greatest asset is our collective intellect. We pair the strategic oversight of seasoned software architects with the energetic ingenuity of top engineering talent to solve challenges others deem impossible.
                        </SectionParagraph>

                        <SectionParagraph size="md" theme="light" className="text-gray-400">
                            We discard slow, bloated agency bureaucracy in favor of tight, agile squads focused squarely on your commercial milestones. Every sprint is deliberate, every milestone measurable.
                        </SectionParagraph>

                        {/* Checklist */}
                        <div className="space-y-3 pt-2">
                            {cultureHighlights.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 font-jakarta text-sm sm:text-base font-semibold text-gray-200 tracking-[-0.01em]">
                                    <div className="w-6 h-6 rounded-full bg-[#41B349]/20 flex items-center justify-center shrink-0">
                                        <FaCheckCircle className="text-[#41B349] text-xs" />
                                    </div>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 flex flex-wrap items-center gap-4">
                            <button
                                onClick={openQuote}
                                className="inline-flex items-center gap-2.5 bg-[#41B349] hover:bg-[#369c3d] text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#41B349]/25 hover:scale-[1.02] cursor-pointer"
                            >
                                <ButtonText className="text-sm sm:text-base">Collaborate With Us</ButtonText>
                                <FaArrowRight size={12} />
                            </button>
                            <Link
                                href="/contact-us"
                                className="inline-flex items-center gap-2 text-gray-300 hover:text-white px-5 py-4 rounded-full transition-colors duration-200"
                            >
                                <ButtonText className="text-sm">Schedule a Call →</ButtonText>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Media Visual Container */}
                    <div className="lg:col-span-6 flex justify-center">
                        <div className="relative w-full max-w-[540px]">
                            {/* Main Visual Image Card */}
                            <div className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/80">
                                <Image
                                    src={InnovationImage}
                                    alt="Innovation and Creativity at TechSolutionor"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12] via-transparent to-transparent opacity-80" />

                                {/* Glass Overlay Banner */}
                                <div className="absolute bottom-6 left-6 right-6 bg-[#0A0D12]/90 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl">
                                    <div className="flex items-center gap-3 mb-1.5">
                                        <div className="w-8 h-8 rounded-lg bg-[#41B349]/20 flex items-center justify-center text-[#41B349]">
                                            <FaBolt size={14} />
                                        </div>
                                        <CardHeading as="h4" size="sm" theme="light" className="text-sm">
                                            High-Velocity Engineering
                                        </CardHeading>
                                    </div>
                                    <CardParagraph size="xs" theme="light" className="text-gray-300">
                                        Continuous integration and continuous deployment pipelines engineered for speed, safety, and scale.
                                    </CardParagraph>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WatchUsLive;

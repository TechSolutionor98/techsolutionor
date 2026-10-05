"use client";

import React from "react";
import { FaBullseye, FaCompass, FaGem, FaCheckCircle } from "react-icons/fa";
import {
    SectionBadge,
    SectionHeading,
    HighlightWord,
    SectionParagraph,
    CardHeading,
    CardParagraph
} from "@/components/Typography";

const BentoCard = ({ icon, tag, title, description, points }) => (
    <div className="relative rounded-3xl p-7 sm:p-9 bg-white border border-gray-100/90 shadow-xl shadow-gray-100/80 hover:shadow-2xl hover:shadow-[#41B349]/10 hover:border-[#41B349]/40 transition-all duration-300 flex flex-col justify-between group">
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-[#41B349]/10 border border-[#41B349]/20 flex items-center justify-center text-[#41B349] group-hover:bg-[#41B349] group-hover:text-white transition-all duration-300">
                    {icon}
                </div>
                <span className="text-[11px] font-jakarta font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100 text-gray-600 group-hover:bg-[#41B349]/10 group-hover:text-[#41B349] transition-colors">
                    {tag}
                </span>
            </div>

            <CardHeading as="h3" size="md" theme="dark" className="mb-3">
                {title}
            </CardHeading>

            <CardParagraph size="md" theme="slate" className="mb-6">
                {description}
            </CardParagraph>
        </div>

        <div className="pt-4 border-t border-gray-100/80 space-y-2.5">
            {points.map((pt, i) => (
                <div key={i} className="flex items-center gap-2.5 font-jakarta text-xs sm:text-sm font-semibold text-gray-700 tracking-[-0.01em]">
                    <FaCheckCircle className="text-[#41B349] shrink-0 text-xs" />
                    <span>{pt}</span>
                </div>
            ))}
        </div>
    </div>
);

const EmpoweringAgency = () => {
    return (
        <section className="relative w-full bg-[#FAFCFB] py-20 md:py-28 overflow-hidden select-none">
            {/* Ambient Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle,_rgba(65,179,73,0.08)_0%,_transparent_70%)] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="flex justify-center mb-4">
                        <SectionBadge variant="light">
                            MISSION, VISION & VALUES
                        </SectionBadge>
                    </div>

                    <SectionHeading as="h2" size="section" theme="dark">
                        Driven by Purpose, Guided by{" "}
                        <HighlightWord>Uncompromising Principles</HighlightWord>
                    </SectionHeading>

                    <SectionParagraph size="lg" theme="slate" className="mt-4 max-w-2xl mx-auto">
                        Our culture is anchored in relentless engineering quality and client triumph. We build technology that doesn&apos;t just keep pace with the market—it sets the benchmark.
                    </SectionParagraph>
                </div>

                {/* 3-Column Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    <BentoCard
                        icon={<FaCompass size={24} />}
                        tag="Our Mission"
                        title="Accelerating Digital Growth"
                        description="Empowering visionary enterprises and agile startups with scalable architectures, modern web systems, and data-driven digital solutions that unlock measurable commercial value."
                        points={[
                            "Architectural Rigor & Scalability",
                            "Fast, Transparent Sprint Delivery",
                            "Continuous Innovation & Value Creation",
                        ]}
                    />

                    <BentoCard
                        icon={<FaBullseye size={24} />}
                        tag="Our Vision"
                        title="Global Technology Benchmark"
                        description="To be globally recognized as the elite technology consultancy where ambitious companies turn for trustworthy engineering, high-impact digital products, and strategic partnership."
                        points={[
                            "Global Standards, UAE Craftsmanship",
                            "Cloud-Native Future-Proof Tech",
                            "Long-Term Strategic Alliances",
                        ]}
                    />

                    <BentoCard
                        icon={<FaGem size={24} />}
                        tag="Our Values"
                        title="Integrity & Relentless Craft"
                        description="We honor absolute transparency, radical accountability, and deep technical mastery. Every line of code, design asset, and architecture decision reflects our obsession with excellence."
                        points={[
                            "Radical Transparency & Honesty",
                            "Relentless Pursuit of Quality",
                            "True Client Obsession & Empathy",
                        ]}
                    />
                </div>
            </div>
        </section>
    );
};

export default EmpoweringAgency;

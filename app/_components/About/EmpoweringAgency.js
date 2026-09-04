"use client";

import React from "react";
import { FaBullseye, FaCompass, FaGem, FaCheckCircle } from "react-icons/fa";

const BentoCard = ({ icon, tag, title, description, points }) => (
    <div className="relative rounded-3xl p-7 sm:p-9 bg-white border border-gray-100/90 shadow-xl shadow-gray-100/80 hover:shadow-2xl hover:shadow-[#41B349]/10 hover:border-[#41B349]/40 transition-all duration-300 flex flex-col justify-between group">
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-[#41B349]/10 border border-[#41B349]/20 flex items-center justify-center text-[#41B349] group-hover:bg-[#41B349] group-hover:text-white transition-all duration-300">
                    {icon}
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-gray-100 text-gray-600 group-hover:bg-[#41B349]/10 group-hover:text-[#41B349] transition-colors">
                    {tag}
                </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-3">
                {title}
            </h3>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {description}
            </p>
        </div>

        <div className="pt-4 border-t border-gray-100/80 space-y-2.5">
            {points.map((pt, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-700">
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
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#41B349]/15 border border-[#41B349]/30 text-[#41B349] font-extrabold text-xs uppercase tracking-widest mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#41B349]" />
                        <span>MISSION, VISION & VALUES</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                        Driven by Purpose, Guided by{" "}
                        <span className="text-[#41B349]">Uncompromising Principles</span>
                    </h2>

                    <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed font-normal">
                        Our culture is anchored in relentless engineering quality and client triumph. We build technology that doesn&apos;t just keep pace with the market—it sets the benchmark.
                    </p>
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

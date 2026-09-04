"use client";

import React from "react";
import Image from "next/image";
import Icon1 from "../../../components/Images/abouticon4.png";
import Icon2 from "../../../components/Images/abouticon5.png";
import Icon3 from "../../../components/Images/abouticon6.png";
import Icon4 from "../../../components/Images/abouticon7.png";

const features = [
    {
        step: "01",
        image: Icon1,
        title: "Modern Stacks & Clean Code",
        subtitle: "Architectural Excellence",
        description:
            "From Next.js and microservices to React, Node, Laravel, and cloud architectures, we build on modern, future-proof frameworks built to scale.",
    },
    {
        step: "02",
        image: Icon2,
        title: "Transparent Agile Delivery",
        subtitle: "Zero Surprises, Real Milestones",
        description:
            "Structured sprint cycles, real-time progress tracking, and direct access to technical leads keep your product on time, on scope, and on budget.",
    },
    {
        step: "03",
        image: Icon3,
        title: "Client-Centric Collaboration",
        subtitle: "Dedicated Co-Pilots",
        description:
            "We treat your roadmap as our own—proactively refining UX funnels, optimizing performance, and ensuring every release drives measurable ROI.",
    },
    {
        step: "04",
        image: Icon4,
        title: "Cost-Effective Scalability",
        subtitle: "Maximum Commercial Value",
        description:
            "Clean architectures designed for low maintenance overhead and high infrastructure efficiency, eliminating bloat and future technical debt.",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="relative w-full bg-[#FFFFFF] py-20 md:py-28 select-none overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#41B349]/15 border border-[#41B349]/30 text-[#41B349] font-extrabold text-xs uppercase tracking-widest mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#41B349]" />
                        <span>THE TECHSOLUTIONOR ADVANTAGE</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                        Why Ambitious Brands Choose Us as Their{" "}
                        <span className="text-[#41B349]">Engineering Partner</span>
                    </h2>

                    <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed font-normal">
                        We blend high-caliber software engineering with commercial strategic acumen to deliver solutions that outperform benchmarks and power sustainable growth.
                    </p>
                </div>

                {/* 4 Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
                    {features.map((item, idx) => (
                        <div
                            key={idx}
                            className="relative rounded-3xl p-7 bg-white border border-gray-100 shadow-lg shadow-gray-100/70 hover:shadow-2xl hover:shadow-[#41B349]/12 hover:border-[#41B349]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center p-2.5 group-hover:bg-[#41B349]/10 group-hover:border-[#41B349]/20 transition-all duration-300">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={50}
                                            height={50}
                                            className="object-contain group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <span className="text-xs font-black text-gray-400 group-hover:text-[#41B349] transition-colors">
                                        {item.step}
                                    </span>
                                </div>

                                <div className="text-xs font-extrabold uppercase tracking-wider text-[#41B349] mb-1">
                                    {item.subtitle}
                                </div>

                                <h3 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight mb-3">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 text-sm leading-relaxed font-normal">
                                    {item.description}
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-bold text-gray-400 group-hover:text-[#41B349] transition-colors">
                                <span>Learn More</span>
                                <span>→</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;

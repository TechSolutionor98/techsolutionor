"use client";

import React from "react";
import Image from "next/image";
import Icon1 from "../../../components/Images/abouticon4.png";
import Icon2 from "../../../components/Images/abouticon5.png";
import Icon3 from "../../../components/Images/abouticon6.png";
import Icon4 from "../../../components/Images/abouticon7.png";
import { getCmsVal } from "@/lib/api-helper";
import {
    SectionBadge,
    SectionHeading,
    HighlightWord,
    SectionParagraph,
    CardHeading,
    CardParagraph,
    ButtonText
} from "@/components/Typography";

const defaultFeatures = [
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

const WhyChooseUs = ({ cmsContent }) => {
    const badge = getCmsVal(cmsContent, "THE TECHSOLUTIONOR ADVANTAGE", "aboutwhychoose");
    const heading = getCmsVal(
        cmsContent,
        "Why Ambitious Brands Choose Us as Their Engineering Partner",
        "aboutwhychoose"
    );
    const subtitle = getCmsVal(
        cmsContent,
        "We blend high-caliber software engineering with commercial strategic acumen to deliver solutions that outperform benchmarks and power sustainable growth.",
        "aboutwhychoose"
    );

    const items = defaultFeatures.map((feat) => ({
        ...feat,
        title: getCmsVal(cmsContent, feat.title, "aboutwhychoose"),
        subtitle: getCmsVal(cmsContent, feat.subtitle, "aboutwhychoose"),
        description: getCmsVal(cmsContent, feat.description, "aboutwhychoose"),
    }));

    return (
        <section className="relative w-full bg-[#FFFFFF] py-20 md:py-28 select-none overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="flex justify-center mb-4">
                        <SectionBadge variant="light">
                            {badge}
                        </SectionBadge>
                    </div>

                    <SectionHeading as="h2" size="section" theme="dark">
                        {heading.includes("Engineering Partner") ? (
                            <>
                                Why Ambitious Brands Choose Us as Their{" "}
                                <HighlightWord>Engineering Partner</HighlightWord>
                            </>
                        ) : (
                            heading
                        )}
                    </SectionHeading>

                    <SectionParagraph size="lg" theme="slate" className="mt-4 max-w-2xl mx-auto">
                        {subtitle}
                    </SectionParagraph>
                </div>

                {/* 4 Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
                    {items.map((item, idx) => (
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
                                    <span className="font-display font-black text-sm text-gray-400 group-hover:text-[#41B349] transition-colors">
                                        {item.step}
                                    </span>
                                </div>

                                <div className="font-jakarta font-semibold uppercase tracking-wider text-xs text-[#2C9434] mb-1.5">
                                    {item.subtitle}
                                </div>

                                <CardHeading as="h3" size="sm" theme="dark" className="mb-2.5">
                                    {item.title}
                                </CardHeading>

                                <CardParagraph size="sm" theme="slate">
                                    {item.description}
                                </CardParagraph>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-1.5">
                                <ButtonText className="text-xs font-semibold text-gray-400 group-hover:text-[#41B349] transition-colors">
                                    Learn More →
                                </ButtonText>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;

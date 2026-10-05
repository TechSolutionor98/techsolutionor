"use client";

import React from 'react';
import { getCmsVal } from '@/lib/api-helper';
import { useQuote } from '@/app/_context/QuoteContext';
import {
  SectionBadge,
  SectionHeading,
  HighlightWord,
  SectionParagraph,
  ButtonText
} from "@/components/Typography";
import { ArrowDown, MessageSquare } from "lucide-react";

const ContactHero = ({ cmsContent }) => {
    const { openQuote } = useQuote();
    const badge = getCmsVal(cmsContent, "GET IN TOUCH WITH OUR TEAM", "contacthero");
    const heading = getCmsVal(cmsContent, "Let's Build Something Extraordinary Together", "contacthero");
    const description = getCmsVal(
        cmsContent,
        "Have a project in mind, an engineering challenge, or looking to scale your digital presence? Reach out to our technology advisors and solution architects in Dubai for a free, transparent consultation.",
        "contacthero"
    );

    const scrollToForm = () => {
        const el = document.getElementById("contact-form");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative w-full bg-white overflow-hidden py-16 md:py-24 select-none">
            {/* Ambient Emerald Glow for Light Theme */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle_at_top,_rgba(65,179,73,0.12)_0%,_transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#41B34912_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Micro-Badge */}
                <div className="mb-6">
                    <SectionBadge variant="light">
                        {badge}
                    </SectionBadge>
                </div>

                {/* Primary Heading */}
                <SectionHeading as="h1" size="hero" theme="dark" className="max-w-4xl mx-auto">
                    {heading.includes("Extraordinary Together") ? (
                        <>
                            Let&apos;s Build Something{" "}
                            <HighlightWord>Extraordinary Together</HighlightWord>
                        </>
                    ) : (
                        heading
                    )}
                </SectionHeading>

                {/* Description */}
                <SectionParagraph size="lg" theme="slate" className="mt-6 max-w-3xl mx-auto">
                    {description}
                </SectionParagraph>

                {/* Hero CTAs */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <button
                        onClick={openQuote}
                        className="inline-flex items-center gap-2.5 bg-[#41B349] hover:bg-[#369c3d] text-white px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base transition-all duration-300 shadow-lg shadow-[#41B349]/25 hover:scale-[1.02] active:scale-95 cursor-pointer"
                    >
                        <MessageSquare className="w-4 h-4" />
                        <ButtonText className="text-sm sm:text-base">Request a Free Quote</ButtonText>
                    </button>
                    <button
                        onClick={scrollToForm}
                        className="inline-flex items-center gap-2 bg-transparent hover:bg-gray-50 text-[#111827] border border-gray-300 hover:border-gray-400 px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
                    >
                        <ButtonText className="text-sm sm:text-base">Send a Message</ButtonText>
                        <ArrowDown className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ContactHero;

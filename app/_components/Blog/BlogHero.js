"use client";

import React from "react";
import { ArrowDown } from "lucide-react";
import { getCmsVal } from "@/lib/api-helper";
import {
  SectionBadge,
  SectionHeading,
  HighlightWord,
  SectionParagraph,
  ButtonText
} from "@/components/Typography";

const BlogHero = ({ cmsContent }) => {
  const scrollToArticles = () => {
    const el = document.getElementById("blog-list");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const badgeText = getCmsVal(cmsContent, "INSIGHTS, ARTICLES & ENGINEERING GUIDES", "bloghero");
  const headingText = getCmsVal(cmsContent, "Technology, Innovation & Modern IT Insights", "bloghero");
  const descriptionText = getCmsVal(
    cmsContent,
    "Empowering businesses in Dubai, across the UAE, and worldwide with expert insights on web development, SEO, UI/UX design, and digital marketing strategies. Discover practical guides and proven growth techniques designed to help brands build high-performing websites, improve search rankings, and achieve measurable online success.",
    "bloghero"
  );
  const buttonText = getCmsVal(cmsContent, "Explore Our Insights", "bloghero");

  const renderHeading = () => {
    if (headingText === "Technology, Innovation & Modern IT Insights") {
      return (
        <>
          Technology, Innovation & <HighlightWord>Modern IT Insights</HighlightWord>
        </>
      );
    }
    return headingText;
  };

  return (
    <section className="relative w-full bg-white overflow-hidden py-16 md:py-24 select-none">
      {/* Ambient Emerald Glow for Light Theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[360px] bg-[radial-gradient(circle_at_top,_rgba(65,179,73,0.12)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#41B34912_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Micro-Badge */}
        <div className="mb-6">
          <SectionBadge variant="light">
            {badgeText}
          </SectionBadge>
        </div>

        {/* Primary Heading */}
        <SectionHeading as="h1" size="hero" theme="dark" className="max-w-4xl mx-auto">
          {renderHeading()}
        </SectionHeading>

        {/* Description */}
        <SectionParagraph size="lg" theme="slate" className="mt-6 max-w-3xl mx-auto">
          {descriptionText}
        </SectionParagraph>

        {/* Action Button */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={scrollToArticles}
            className="group inline-flex items-center gap-2.5 bg-[#41B349] hover:bg-[#369c3d] text-white px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base transition-all duration-300 shadow-lg shadow-[#41B349]/25 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <ButtonText className="text-sm sm:text-base">{buttonText}</ButtonText>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;


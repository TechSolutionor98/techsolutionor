'use client';

import React from 'react';
import { Quote, Layers, ArrowDown } from 'lucide-react';
import {
  SectionBadge,
  SectionHeading,
  SectionParagraph,
  ButtonText,
} from '@/components/Typography';

const PortfolioQuote = () => {
  const scrollToProjects = () => {
    const el = document.getElementById('portfolio-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FBFDFC] text-[#111827]">
      {/* Light subtle green background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#41B349]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Quote Card */}
        <div className="relative bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 md:p-14 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
          {/* Decorative quotes icon */}
          <div className="absolute -top-5 left-8 sm:left-12 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#41B349] text-white flex items-center justify-center shadow-lg shadow-[#41B349]/30">
            <Quote className="w-5 h-5 sm:w-6 sm:h-6 rotate-180 fill-white" />
          </div>

          <div className="pt-4 text-center">
            {/* Supporting Content (Exact User Text) */}
            <p className="font-jakarta text-lg sm:text-xl md:text-2xl text-[#1F2937] leading-relaxed sm:leading-loose font-normal italic max-w-4xl mx-auto">
              “With a team of skilled developers, designers, and technology experts, we are dedicated to delivering high-quality, client-focused solutions. Our commitment to innovation, excellence, and customer satisfaction ensures that every project we undertake exceeds expectations and achieves real results.”
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#41B349]" />
              <span className="font-jakarta text-xs sm:text-sm font-semibold tracking-wider text-[#2C9434] uppercase">
                TechSolutionor Engineering Standard
              </span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#41B349]" />
            </div>
          </div>
        </div>

        {/* Section Heading & Anchor Transition */}
        <div className="mt-16 sm:mt-20 text-center space-y-4">
          <div className="flex justify-center">
            <SectionBadge variant="light" icon={<Layers className="w-3.5 h-3.5" />}>
              Featured Case Studies
            </SectionBadge>
          </div>

          {/* Section Heading (Exact User Text) */}
          <SectionHeading as="h2" size="section" theme="dark">
            Explore Our Work
          </SectionHeading>

          <SectionParagraph size="lg" theme="slate" className="max-w-xl mx-auto">
            Explore our verified digital case studies across e-commerce, cloud POS, mobile apps, real estate portals, and digital growth platforms.
          </SectionParagraph>

          <div className="pt-2">
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#41B349] hover:bg-[#389e40] text-white shadow-lg shadow-[#41B349]/25 hover:shadow-[#41B349]/40 transition-all duration-300 cursor-pointer active:scale-95"
            >
              <ButtonText className="text-sm">View Case Studies</ButtonText>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioQuote;

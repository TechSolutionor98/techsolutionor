"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuote } from "@/app/_context/QuoteContext";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

import img1 from "@/components/Images/why_expertise_1.jpg";
import img2 from "@/components/Images/why_expertise_2.jpg";
import img3 from "@/components/Images/why_expertise_3.jpg";
import img4 from "@/components/Images/why_expertise_4.jpg";

const cardsData = [
  {
    id: 1,
    script: "Direct Engineering Access",
    title: "Dedicated Support & Expertise",
    desc: "Our senior technical architects work directly with you to ensure frictionless delivery, continuous optimization, and proactive SLAs.",
    image: img1,
  },
  {
    id: 2,
    script: "Custom Tailored Roadmaps",
    title: "Tailored Business Approach",
    desc: "We engineer bespoke solutions that help enterprises expand locally and internationally, aligning perfectly with commercial KPIs.",
    image: img2,
  },
  {
    id: 3,
    script: "Verifiable Commercial Impact",
    title: "Results-Driven Delivery",
    desc: "Every sprint and deployment is measured against concrete metrics: speed benchmarks, lead conversions, and demonstrable ROI.",
    image: img3,
  },
  {
    id: 4,
    script: "Flexible Enterprise Tiers",
    title: "Modular Business Packages",
    desc: "Comprehensive bundles covering cloud dev, e-commerce, custom APIs, SEO, and paid performance marketing scaled to your stage.",
    image: img4,
  },
];

const WhyExpertiseCommitment = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { openQuote } = useQuote();

  // Auto slide every 5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cardsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cardsData.length);
  };

  // Compute 2 visible cards for desktop
  const card1 = cardsData[activeIndex % cardsData.length];
  const card2 = cardsData[(activeIndex + 1) % cardsData.length];

  return (
    <section 
      className="relative w-full bg-[#FFFFFF] py-16 md:py-24 font-sans select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle Warm Dot Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#0D0F12 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: TEXT & CTA */}
          <div className="w-full lg:w-[42%] text-[#0D0F12] flex flex-col items-start">
            {/* Eyebrow Pill */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#36963D]/10 border border-[#36963D]/30 text-[#36963D] font-mono text-xs uppercase tracking-widest font-bold mb-4 shadow-2xs"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="w-2 h-2 rounded-full bg-[#36963D] animate-pulse" />
              <span>COMMITMENT TO EXCELLENCE</span>
            </div>

            {/* Cursive Subtitle */}
            <div className="retro-script-font text-2xl sm:text-3xl text-[#36963D] font-normal tracking-wide mb-1 leading-snug">
              Your Success Is Our Priority
            </div>

            {/* Headline */}
            <h2 
              className="text-3xl sm:text-4xl md:text-[42px] font-black tracking-tight leading-[1.15] text-[#0D0F12] mb-5"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              Why Tech Solutionor? <br />
              <span className="text-[#36963D]">Expertise &amp; Trust</span>
            </h2>

            {/* Paragraph */}
            <p 
              className="text-[#475569] text-sm sm:text-base leading-relaxed font-normal mb-8 max-w-[500px]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              At Tech Solutionor, we are not simply a vendor; we operate as your embedded technology innovation partner. From systems architecture to product launch and commercial scaling, we collaborate transparently to ensure exceptional value.
            </p>

            {/* Action Buttons & Carousel Nav */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={openQuote}
                className="retro-shadow-pill inline-flex items-center gap-2.5 bg-[#36963D] hover:bg-[#2e8234] text-white font-black text-xs sm:text-sm uppercase tracking-wider py-3.5 px-8 rounded-full border-2 border-[#0D0F12] transition-all duration-200 cursor-pointer active:scale-95"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span>Request Custom Scope</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous card"
                  className="w-11 h-11 rounded-full bg-[#FFFFFF] border-2 border-[#0D0F12] retro-shadow-pill flex items-center justify-center text-[#0D0F12] hover:bg-[#36963D] hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next card"
                  className="w-11 h-11 rounded-full bg-[#FFFFFF] border-2 border-[#0D0F12] retro-shadow-pill flex items-center justify-center text-[#0D0F12] hover:bg-[#36963D] hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE RETRO CARDS SLIDER */}
          <div className="w-full lg:w-[58%] flex flex-col items-center">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 justify-center min-h-[380px]">
              {[card1, card2].map((card, idx) => (
                <div
                  key={`${card.id}-${idx}`}
                  className="p-6 sm:p-7 rounded-[28px] bg-[#FFFFFF] border-3 border-[#0D0F12] retro-icon-box flex flex-col items-center text-center justify-between transition-all duration-300 hover:-translate-y-1.5 group"
                >
                  {/* Circular Visual with Retro Border */}
                  <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-5 border-3 border-[#0D0F12] shadow-sm relative shrink-0">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Cursive Subtitle */}
                  <div className="retro-script-font text-xl text-[#36963D] font-normal tracking-wide mb-1 leading-snug">
                    {card.script}
                  </div>

                  {/* Card Title */}
                  <h3
                    className="text-xl sm:text-2xl font-black text-[#0D0F12] group-hover:text-[#36963D] transition-colors duration-200 tracking-tight mb-2.5"
                    style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-[13.5px] text-[#475569] leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyExpertiseCommitment;

"use client";

import React from "react";
import Image from "next/image";
import Desktop from "@/components/Images/desktop.png";
import { useQuote } from "@/app/_context/QuoteContext";

const HandDrawnOval = () => (
  <svg
    className="absolute -inset-x-3.5 -inset-y-2 w-[calc(100%+28px)] h-[calc(100%+16px)] pointer-events-none select-none"
    viewBox="0 0 170 56"
    fill="none"
    preserveAspectRatio="none"
  >
    {/* First Loop */}
    <path
      d="M 18 28 C 14 13, 50 5, 96 6 C 144 7, 164 17, 160 31 C 155 45, 115 52, 66 51 C 26 50, 6 41, 17 25 C 22 17, 56 8, 102 7"
      stroke="#41B349"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-95"
    />
    {/* Subtle second sketch trace for organic hand-drawn feel */}
    <path
      d="M 22 26 C 28 11, 68 5, 110 7 C 150 9, 162 20, 155 33 C 148 44, 106 50, 60 49 C 20 48, 10 39, 19 26"
      stroke="#41B349"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-50"
    />
  </svg>
);

/**
 * Reusable HowWeHelpResults Component
 * Built using the exact same UI / design as the Laravel "Why Choose" section.
 */
const HowWeHelpResults = ({
  highlightText = "HOW WE HELP",
  titleRest = "YOU GET RESULTS",
  paragraph = "Based on your individual needs, we’ll create a fully customized plan to help you boost your results through tailored web design and development.",
  buttonText = "LET'S TALK IMPACT",
  image = Desktop,
  imageAlt = "How We Help You Get Results - Tech Solutionor",
  onButtonClick = null,
}) => {
  const { openQuote } = useQuote();
  const handleAction = onButtonClick || openQuote;

  return (
    <section className="w-full bg-[#FFFFFF] py-14 sm:py-18 md:py-20 select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading with Hand-Drawn Circled Accent (Exact same UI as Laravel Why Choose) */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-black text-center tracking-tight text-[#111827] mb-8 sm:mb-12 leading-tight uppercase"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          <span className="relative inline-block px-4 py-1 text-[#41B349] mr-2 font-black">
            {highlightText}
            <HandDrawnOval />
          </span>
          {titleRest}
        </h2>

        {/* Main Card Container with green border & generous rounded corners (Exact same UI) */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border-2 border-[#41B349] p-6 sm:p-10 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Formatted copy & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center items-start">
            <p
              className="text-[15px] sm:text-base md:text-[17px] text-[#2d3748] leading-relaxed font-normal"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {paragraph}
            </p>

            {/* Impact Action Button */}
            <div className="pt-2">
              <button
                onClick={handleAction}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-[#41B349] hover:bg-[#349e3c] text-white font-bold text-sm sm:text-base uppercase tracking-wider rounded-xl shadow-lg shadow-[#41B349]/25 hover:shadow-xl hover:shadow-[#41B349]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
              >
                <span>{buttonText}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Framed visual card matching Why Choose layout */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg shadow-black/8 border border-gray-150 relative group flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] p-4 sm:p-6">
              <Image
                src={image}
                alt={imageAlt}
                width={700}
                height={500}
                className="w-auto h-auto max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowWeHelpResults;

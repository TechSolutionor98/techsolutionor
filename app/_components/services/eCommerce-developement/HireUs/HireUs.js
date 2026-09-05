"use client";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useQuote } from "@/app/_context/QuoteContext";

const HireUs = ({
  badge = "READY TO SCALE YOUR BUSINESS?",
  line1 = "Ready to scale your digital presence?",
  line2 = "Hire the TechSolutionor team to handle your project.",
  buttonText = "Hire Us",
}) => {
  const { openQuote } = useQuote();

  // If line1 contains newline, split gracefully
  let displayLine1 = line1;
  let displayLine2 = line2;

  if (line1 && typeof line1 === "string" && line1.includes("\n")) {
    const parts = line1.split("\n").map((l) => l.trim()).filter(Boolean);
    displayLine1 = parts[0] || "";
    displayLine2 = parts.slice(1).join(" ") || line2;
  }

  return (
    <section className="w-full bg-[#FFFFFF] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 select-none">
      {/* Main Glassmorphic CTA Card Container */}
      <div className="relative z-10 max-w-6xl mx-auto rounded-3xl bg-[#0D0F12] border border-gray-800 p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12 overflow-hidden">
        
        {/* Top Glowing Green Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#41B349] to-transparent opacity-90" />

        {/* Left Column: Heading & Pill Badge */}
        <div className="max-w-2xl text-center md:text-left z-10">
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#41B349]/15 border border-[#41B349]/30 text-[#41B349] font-black text-xs uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
              <span>{badge}</span>
            </div>
          )}

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            <span>{displayLine1}</span>
            {displayLine2 && (
              <span className="text-[#41B349] block mt-1.5">
                {displayLine2}
              </span>
            )}
          </h2>
        </div>

        {/* Right Column: CTA Button */}
        <div className="shrink-0 z-10">
          <button
            onClick={openQuote}
            className="inline-flex items-center gap-4 bg-[#41B349] hover:bg-[#36963d] text-[#FCFCFC] text-base sm:text-lg font-extrabold px-8 sm:px-10 py-4 sm:py-5 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white/60 group"
          >
            <span>{buttonText}</span>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#0D0F12] flex items-center justify-center shadow-md group-hover:translate-x-1 transition-transform duration-300">
              <FaArrowRight size={14} className="text-[#0D0F12]" />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
};

export default HireUs;

"use client";

import React from "react";
import { ArrowDown } from "lucide-react";

const BlogHero = () => {
  const scrollToArticles = () => {
    const el = document.getElementById("blog-list");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-white overflow-hidden py-16 md:py-24 select-none">
      {/* Ambient Emerald Glow for Light Theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[360px] bg-[radial-gradient(circle_at_top,_rgba(65,179,73,0.12)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#41B34912_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Micro-Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/30 text-[#41B349] font-extrabold text-xs uppercase tracking-widest mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
          <span>INSIGHTS, ARTICLES &amp; ENGINEERING GUIDES</span>
        </div>

        {/* Primary Heading */}
        <h1 
          className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] max-w-4xl mx-auto"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          <span className="text-[#111827] block">
            Technology, Innovation &amp;
          </span>
          <span className="text-[#41B349] block mt-1 sm:mt-2">
            Modern IT Insights
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-[#4B5563] text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
          Empowering businesses in Dubai, across the UAE, and worldwide with expert insights on web development, SEO, UI/UX design, and digital marketing strategies. Discover practical guides and proven growth techniques designed to help brands build high-performing websites, improve search rankings, and achieve measurable online success.
        </p>

        {/* Action Button */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={scrollToArticles}
            className="group inline-flex items-center gap-2.5 bg-[#41B349] hover:bg-[#369c3d] text-white font-extrabold px-8 py-4 rounded-full text-sm sm:text-base transition-all duration-300 shadow-lg shadow-[#41B349]/25 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <span>Explore Our Insights</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;


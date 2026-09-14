"use client";

import React from "react";
import { Search, Code2, FileText, Link2, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Website Crawl & Analysis",
    desc: "We perform a comprehensive website crawl to analyze your site structure, page performance, indexing status, and loading speed. Whether you're targeting businesses in the UAE or a global audience, we identify hidden structural issues that may be limiting your visibility on search engines like Google.",
    icon: Search,
    tag: "DISCOVERY",
  },
  {
    number: "02",
    title: "Technical SEO Check",
    desc: "Our team conducts an in-depth technical SEO audit to detect broken links, crawl errors, mobile usability issues, Core Web Vitals problems, and indexing gaps. For UAE-based businesses and international brands alike, strong technical SEO ensures your website is fully optimized for search engine performance and user experience.",
    icon: Code2,
    tag: "INFRASTRUCTURE",
  },
  {
    number: "03",
    title: "On-Page SEO Review",
    desc: "We evaluate your meta tags, headings, content quality, keyword targeting, internal linking, and search intent alignment. Our goal is to ensure your website is optimized for high-converting keywords in competitive markets like Dubai, Abu Dhabi, and global search landscapes.",
    icon: FileText,
    tag: "OPTIMIZATION",
  },
  {
    number: "04",
    title: "Backlink & Competitor Analysis",
    desc: "We analyze your backlink profile and compare it with top-ranking competitors in the UAE and international markets. This helps us identify authority gaps, link-building opportunities, and strategic insights that can improve your domain trust and search rankings.",
    icon: Link2,
    tag: "BENCHMARKING",
  },
  {
    number: "05",
    title: "Custom Report & Recommendations",
    desc: "You receive a detailed, easy-to-understand SEO audit report with prioritized recommendations tailored to your business goals. Instead of generic advice, we provide a clear growth roadmap designed to increase traffic, leads, and conversions, locally in the UAE and globally.",
    icon: BarChart3,
    tag: "ACTION PLAN",
  },
];

const SeoAuditProcess = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white select-none overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div 
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#36963D]/10 border border-[#36963D]/30 text-[#36963D] font-mono text-xs uppercase tracking-widest font-bold mb-4 shadow-2xs"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            <span>HOW WE AUDIT</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] uppercase tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            Our SEO Audit <span className="text-[#41B349]">Process</span>
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            A comprehensive 5-step technical and strategic evaluation designed to eliminate site errors, outrank competitors, and unlock measurable organic growth.
          </p>
        </div>

        {/* 5-Step Connected Timeline Cards */}
        <div className="space-y-6 sm:space-y-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative bg-white rounded-[24px] sm:rounded-[32px] border-2 border-gray-100 hover:border-[#41B349] p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(65,179,73,0.08)] transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8 group"
              >
                {/* Left: Step Number & Icon Box */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-[20px] bg-[#164326] text-white flex flex-col items-center justify-center relative shadow-md group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#41B349] mb-0.5" />
                    <span className="font-mono text-xs font-bold text-white/80 tracking-widest">{step.number}</span>
                  </div>
                </div>

                {/* Center / Right: Step Content */}
                <div className="flex-1 text-left">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-[#41B349] bg-[#41B349]/10 px-2.5 py-0.5 rounded-md">
                      {step.tag}
                    </span>
                  </div>

                  <h3
                    className="text-xl sm:text-2xl font-black text-[#111827] group-hover:text-[#164326] transition-colors duration-200 tracking-tight mb-2.5"
                    style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {step.title}
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-[15.5px] leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SeoAuditProcess;

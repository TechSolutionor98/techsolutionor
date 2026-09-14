"use client";

import React from "react";
import Image from "next/image";
import SeoAuditImg from "@/components/Images/SEO-audit.png";
import { Check, ArrowRight } from "lucide-react";

const points = [
  "Page performance insights",
  "Keyword ranking analysis",
  "Technical issues and recommendations",
  "Competitor comparisons",
  "Actionable growth plan",
];

const SeoAuditSampleReport = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white select-none overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Card Container matching WhyChoose design language */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border-2 border-[#41B349] p-6 sm:p-10 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Sample Report Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl overflow-hidden p-2">
              <Image
                src={SeoAuditImg}
                alt="Sample SEO Audit Report Illustration"
                fill
                style={{ objectFit: "contain" }}
                className="filter drop-shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 text-left">
            <div 
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#36963D]/10 border border-[#36963D]/30 text-[#36963D] font-mono text-xs uppercase tracking-widest font-bold mb-4 shadow-2xs"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              <span>SAMPLE SEO REPORT</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-black text-[#111827] leading-tight mb-4"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              See What a Professional <br />
              <span className="text-[#41B349]">SEO Audit Looks Like</span>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base mb-6 font-normal">
              Get an example of our comprehensive SEO audit report, including:
            </p>

            <ul className="space-y-3 mb-8">
              {points.map((point, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-700 text-sm sm:text-[15.5px]"
                >
                  <span className="w-5 h-5 rounded-full bg-[#41B349]/15 text-[#41B349] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  <span className="font-medium">{point}</span>
                </li>
              ))}
            </ul>

            <a href="#form" className="inline-block group">
              <button className="bg-[#36963D] hover:bg-[#2e8234] text-white rounded-full px-8 py-3.5 font-bold text-sm sm:text-base shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2.5">
                <span>Sample SEO Audit Report</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SeoAuditSampleReport;

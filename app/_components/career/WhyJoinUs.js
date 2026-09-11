"use client";

import React from "react";
import { 
  DollarSign, 
  Laptop, 
  GraduationCap, 
  HeartPulse, 
  PlaneTakeoff, 
  Clock, 
  Sparkles,
  CheckCircle
} from "lucide-react";

const perks = [
  {
    icon: DollarSign,
    title: "Competitive Compensation & Bonuses",
    description: "Above-market salary packages, structured bi-annual performance bonuses, and transparent salary review milestones.",
    highlight: "Top 10% Industry Pay",
  },
  {
    icon: Clock,
    title: "Flexible Remote & Hybrid Freedom",
    description: "Enjoy true work-life balance with remote work freedom, flexible core hours, and trust-first async communication.",
    highlight: "100% Flex Work",
  },
  {
    icon: GraduationCap,
    title: "Learning & Certification Sponsorship",
    description: "Annual education budget for AWS, React, Google Cloud, and design certifications, plus access to top tech courses.",
    highlight: "Sponsored Learning",
  },
  {
    icon: Laptop,
    title: "State-of-the-Art Gear & Tech Setup",
    description: "We equip you with the best tools: Latest Apple Silicon MacBook Pros or high-end workstations, 4K displays, and accessories.",
    highlight: "Apple Silicon Gear",
  },
  {
    icon: HeartPulse,
    title: "Comprehensive Health & Wellness",
    description: "Premium health insurance, mental health support programs, wellness stipends, and generous paid time off.",
    highlight: "Full Health Cover",
  },
  {
    icon: PlaneTakeoff,
    title: "Annual Retreats & Social Outings",
    description: "All-expenses-paid annual retreats, quarterly team bonding adventures, tech hackathons, and company celebrations.",
    highlight: "Team Offsites",
  },
];

export default function WhyJoinUs() {
  return (
    <section className="py-20 bg-white relative overflow-hidden border-b border-gray-100">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[#36963D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-[720px] mx-auto mb-16">
          <div 
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#36963D]/10 border border-[#36963D]/30 text-[#36963D] font-mono text-xs uppercase tracking-widest font-bold mb-4"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            <span>PERKS & BENEFITS</span>
          </div>

          <h2 
            className="text-3xl sm:text-4xl md:text-[42px] font-black tracking-tight text-[#0D0F12] mb-5 leading-tight"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            Why You’ll Love Working at <span className="text-[#36963D]">Tech Solutionor</span>
          </h2>

          <p 
            className="text-[#475569] text-base sm:text-lg leading-relaxed font-normal"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            We take care of the essentials so you can focus on your best work, push the boundaries of technology, and thrive both professionally and personally.
          </p>
        </div>

        {/* Perks Grid: 6 Retro Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] border border-gray-200/90 rounded-2xl p-7 shadow-xs hover:shadow-xl hover:border-[#36963D] transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-[#36963D]/10 text-[#36963D] flex items-center justify-center group-hover:bg-[#36963D] group-hover:text-white transition-all duration-300 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-[#36963D] bg-[#36963D]/10 px-3 py-1 rounded-full border border-[#36963D]/20 uppercase tracking-wider">
                      {perk.highlight}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-xl font-bold text-[#0D0F12] mb-3 group-hover:text-[#36963D] transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {perk.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#64748B] leading-relaxed font-normal">
                    {perk.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-[#0D0F12]/80">
                  <CheckCircle className="w-4 h-4 text-[#36963D]" />
                  <span>Standard for all full-time positions</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

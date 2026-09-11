"use client";

import React from "react";
import Image from "next/image";
import { Zap, HeartHandshake, Compass, Trophy, CheckCircle2 } from "lucide-react";

const culturePillars = [
  {
    icon: Zap,
    title: "Innovation Without Red Tape",
    description: "We don't wait for endless approvals. If you have an idea that solves a real challenge with cleaner architecture or better UX, you have the green light to run with it.",
    badge: "Agile & Fast",
  },
  {
    icon: Compass,
    title: "Continuous Craftsmanship",
    description: "Technology moves fast, and so do we. Every team member gets dedicated learning resources, conference sponsorships, and weekly engineering brown-bags.",
    badge: "Skill Growth",
  },
  {
    icon: HeartHandshake,
    title: "People First, Always",
    description: "Burnout is not a badge of honor. We champion sustainable working hours, remote/hybrid flexibility, and complete respect for personal and family life.",
    badge: "Work-Life Harmony",
  },
  {
    icon: Trophy,
    title: "High Impact on Global Scale",
    description: "Our software powers global enterprises, fast-growing tech startups, and critical digital infrastructure across Dubai, North America, and Europe.",
    badge: "Global Reach",
  },
];

export default function CareerIntroCulture() {
  return (
    <section className="py-20 bg-[#FBFDFB] relative overflow-hidden border-b border-gray-100">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#36963D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-16">
          <div 
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#36963D]/10 border border-[#36963D]/30 text-[#36963D] font-mono text-xs uppercase tracking-widest font-bold mb-4"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            <span>OUR CULTURE & DNA</span>
          </div>

          <h2 
            className="text-3xl sm:text-4xl md:text-[42px] font-black tracking-tight text-[#0D0F12] mb-5 leading-tight"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            A Workplace Built For <span className="text-[#36963D]">Builders</span>, Thinkers & Doers
          </h2>

          <p 
            className="text-[#475569] text-base sm:text-lg leading-relaxed font-normal"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            At Tech Solutionor, we believe great software is made by fulfilled, energized, and respected people. We foster an environment where your voice matters, your work is recognized, and your career accelerates.
          </p>
        </div>

        {/* Dual Grid: Culture Cards + Visual Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Left: 4 Culture Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {culturePillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md hover:border-[#36963D]/40 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#36963D]/10 text-[#36963D] flex items-center justify-center group-hover:bg-[#36963D] group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#36963D] bg-[#36963D]/10 px-2.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    </div>

                    <h3 
                      className="text-lg font-bold text-[#0D0F12] mb-2.5 group-hover:text-[#36963D] transition-colors"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Visual Showcase Cards */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200/90 h-[220px] sm:h-[260px] group">
              <Image
                src="/images/about-meeting.png"
                alt="Collaborative Culture"
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">Collaborative Spirit</span>
                <p className="text-white font-bold text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Cross-functional teams solving complex digital puzzles together.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col gap-3.5">
              <h4 className="text-base font-bold text-[#0D0F12]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                What Our Team Members Say:
              </h4>
              <p className="text-sm text-[#475569] italic leading-relaxed">
                &ldquo;Tech Solutionor has given me the autonomy to drive architecture decisions from day one. It is inspiring to work where leadership values creativity as much as code quality.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-[#36963D] text-white flex items-center justify-center font-bold text-sm">
                  TS
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0D0F12]">Lead Solutions Architect</p>
                  <p className="text-[11px] text-[#64748B]">Member of Engineering for 3+ years</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

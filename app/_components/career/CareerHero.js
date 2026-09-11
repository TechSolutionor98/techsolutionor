"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Sparkles, Users, Award, ShieldCheck } from "lucide-react";

export default function CareerHero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id) || document.getElementById('application-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-[#FFFFFF] text-[#0D0F12] overflow-hidden min-h-[560px] flex items-center py-14 md:py-20 select-none">
      <div className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 md:px-10 flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-14">
        {/* Left Content */}
        <div className="w-full lg:w-7/12 text-left">
          {/* Eyebrow Pill Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#36963D]/10 border border-[#36963D]/30 text-[#36963D] font-mono text-xs uppercase tracking-widest font-bold mb-6 shadow-2xs"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#36963D] animate-pulse" />
            <span>WE ARE EXPANDING OUR GLOBAL TEAM</span>
          </div>

          {/* Main Headline */}
          <h1 
            className="text-3xl sm:text-4xl md:text-[46px] lg:text-[52px] font-black leading-[1.12] tracking-tight text-[#0D0F12] mb-6"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            Build Your Career With <br />
            A High-Impact Team of <br />
            <span className="text-[#36963D]">Visionaries.</span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-[#475569] text-base md:text-lg max-w-[540px] mb-8 leading-relaxed font-normal"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            We are looking for creative thinkers, passionate developers, and digital craftspeople to build next-generation software, scalable enterprise platforms, and award-winning digital experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button 
              onClick={() => scrollTo('application-form')}
              className="bg-[#36963D] hover:bg-[#2e8234] text-white px-8 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5 group"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span>Explore Roles & Apply</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => scrollTo('application-form')}
              className="bg-white hover:bg-gray-50 text-[#0D0F12] border border-gray-300 hover:border-[#36963D] px-7 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-xs hover:shadow-sm cursor-pointer flex items-center gap-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <Briefcase className="w-4 h-4 text-[#36963D]" />
              <span>Apply Now</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-200/80">
            <div>
              <p className="text-2xl font-black text-[#0D0F12]" style={{ fontFamily: "'Outfit', sans-serif" }}>50+</p>
              <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Engineers & Creatives</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#36963D]" style={{ fontFamily: "'Outfit', sans-serif" }}>15+</p>
              <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Global Countries Served</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#0D0F12]" style={{ fontFamily: "'Outfit', sans-serif" }}>98%</p>
              <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Team Retention Rate</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#36963D]" style={{ fontFamily: "'Outfit', sans-serif" }}>4.9/5</p>
              <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Employee Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Right Content - Visual Graphic with floating modern badges */}
        <div className="w-full lg:w-5/12 flex justify-center items-center relative">
          <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[460px] md:h-[460px]">
            {/* Ambient circular frame backdrop */}
            <div className="absolute inset-2 rounded-3xl bg-gradient-to-tr from-[#36963D]/10 via-[#36963D]/5 to-transparent pointer-events-none" />
            
            {/* Visual Image */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <Image 
                src="/images/career-hero.png" 
                alt="Tech Solutionor Recruitment" 
                fill 
                priority
                unoptimized
                className="object-contain filter drop-shadow-md hover:scale-102 transition-transform duration-500"
              />
            </div>

            {/* Floating Badge 1: Top Right */}
            <div className="absolute -top-3 -right-2 sm:right-2 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl p-3.5 shadow-xl flex items-center gap-3 animate-bounce [animation-duration:3s]">
              <div className="w-10 h-10 rounded-xl bg-[#36963D]/10 flex items-center justify-center text-[#36963D]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0D0F12]">Innovative Work Culture</p>
                <p className="text-[11px] text-[#64748B]">Modern Stack & Autonomy</p>
              </div>
            </div>

            {/* Floating Badge 2: Bottom Left */}
            <div className="absolute -bottom-3 -left-2 sm:left-2 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl p-3.5 shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0D0F12]">Comprehensive Benefits</p>
                <p className="text-[11px] text-[#64748B]">Health, Bonuses & Learning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

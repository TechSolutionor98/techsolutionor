'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Sparkles } from 'lucide-react';
import portfolioBanner from '@/components/Images/portfoliobanner.png';

const PortfolioBanner = () => {
  const scrollToProjects = () => {
    const el = document.getElementById('portfolio-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FBFDFC] text-[#111827] pt-20 pb-16 md:pt-28 md:pb-24 border-b border-gray-100">
      {/* Light-theme ambient soft emerald glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#41B349]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#41B349]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#41B34912_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/30 text-[#41B349] text-xs sm:text-sm font-bold tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-[#41B349]" />
              <span>Real-World Client Case Studies</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight leading-[1.15] text-[#111827]">
              Our Portfolio of <span className="text-[#41B349]">Digital Projects</span> &amp; Client Success Stories
            </h1>

            {/* Description (Exact User Text) */}
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-2xl font-normal">
              Welcome to our portfolio of innovative digital solutions! At TechSolutionor, we specialize in delivering custom software and technology solutions that drive measurable business success. Explore our projects across various industries to see how we combine creativity, technology, and strategic expertise to deliver cutting-edge solutions tailored to each client’s needs.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToProjects}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#41B349] hover:bg-[#389e40] text-white font-bold text-base shadow-[0_10px_25px_rgba(65,179,73,0.3)] hover:shadow-[0_15px_30px_rgba(65,179,73,0.45)] transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <span>Explore Case Studies</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
              </button>

              <Link
                href="/hire-us"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-[#111827] hover:text-[#41B349] font-bold text-base shadow-sm transition-all duration-300"
              >
                Start Your Project
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Image */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative z-10 w-full max-w-[480px]">
              <Image
                src={portfolioBanner}
                alt="TechSolutionor Portfolio of Digital Projects"
                width={600}
                height={500}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioBanner;

"use client";
import React from 'react';
import Image from 'next/image';
import LaravelShowcase from '@/components/Images/laravel-showcase.jpg';

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

const Framework = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-20 md:py-24 select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading with Hand-Drawn Circled Accent Word matching reference design */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-black text-center tracking-tight text-[#111827] mb-10 sm:mb-14 leading-tight"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          <span className="relative inline-block px-4 py-1 text-[#41B349] mr-2 font-black">
            Why Choose
            <HandDrawnOval />
          </span>
          Laravel Framework?
        </h2>

        {/* Main Card Container with green border & generous rounded corners */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border-2 border-[#41B349] p-6 sm:p-10 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Formatted copy with bold highlights */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            <p className="text-[15px] sm:text-base md:text-[16.5px] text-[#2d3748] leading-relaxed font-normal">
              <strong className="font-bold text-[#111827]">Built for modern engineering</strong>, Laravel is an elegant, robust PHP framework designed for developing secure, high-performance web applications.
            </p>
            <p className="text-[15px] sm:text-base md:text-[16.5px] text-[#2d3748] leading-relaxed font-normal">
              With its expressive syntax and rich built-in toolkit, Laravel simplifies complex operations like{" "}
              <strong className="font-bold text-[#111827]">routing, authentication, caching, and database management</strong>.
            </p>
            <p className="text-[15px] sm:text-base md:text-[16.5px] text-[#2d3748] leading-relaxed font-normal">
              Development teams move faster.{" "}
              <strong className="font-bold text-[#111827]">You deliver scalable, enterprise-grade digital platforms with confidence.</strong>
            </p>
          </div>

          {/* Right Column: Framed visual card with rounded corners & soft shadow */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg shadow-black/10 border border-gray-150 relative group">
              <Image
                src={LaravelShowcase}
                alt="Laravel Development Showcase"
                priority
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Framework;

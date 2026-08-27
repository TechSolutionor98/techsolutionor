"use client";
import React from "react";
import Image from "next/image";
import StandOutImage from "@/components/Images/what-makes-us-stand-out.png";

const WhatMakesUsStandOut = () => {
  return (
    <section className="w-full bg-white py-14 md:py-20 font-sans">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 md:px-14 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
        
        {/* LEFT COLUMN: TEXT CONTENT */}
        <div className="w-full lg:w-[52%] text-[#222222] flex flex-col items-start">
          
          {/* MAIN HEADING */}
          <h2 className="text-[30px] sm:text-[36px] md:text-[42px] font-extrabold text-[#111111] tracking-tight leading-tight mb-2">
            What Makes Us Stand Out in Dubai &amp; Beyond
          </h2>

          {/* GREEN SUBHEAD */}
          <h3 className="text-[#41b349] font-bold text-[18px] sm:text-[20px] mb-5">
            Why Clients Choose Tech Solutionor
          </h3>

          {/* PARAGRAPH */}
          <p className="text-[14.5px] sm:text-[15.5px] text-gray-600 font-normal leading-relaxed mb-6">
            Tech Solutionor combines global standards, deep domain expertise, and a strong understanding of business needs to deliver solutions that drive measurable results. With years of experience and a diverse portfolio, we bring the right mix of strategy, technology, and creativity to every project, empowering businesses across Dubai, the UAE, and global markets to stay competitive and grow.
          </p>

          {/* KEY STRENGTHS SUBHEAD */}
          <h4 className="text-gray-700 font-bold text-[16px] sm:text-[17px] mb-3">
            Key Strengths
          </h4>

          {/* BULLET POINTS */}
          <ul className="list-disc list-inside space-y-2 text-[14px] sm:text-[15px] text-gray-600 font-normal pl-1">
            <li>Proven track record of successful digital solutions</li>
            <li>Multi‑industry experience</li>
            <li>Tailored tech strategies for local &amp; international clients</li>
            <li>A results‑driven, data‑centric approach</li>
          </ul>

        </div>

        {/* RIGHT COLUMN: EXECUTIVE TEAM IMAGE */}
        <div className="w-full lg:w-[48%] flex justify-center lg:justify-end items-center">
          <Image
            src={StandOutImage}
            alt="What Makes Us Stand Out in Dubai & Beyond"
            width={580}
            height={540}
            className="w-full max-w-[440px] lg:max-w-[480px] h-[350px] sm:h-[400px] lg:h-[440px] object-cover rounded-[16px] shadow-lg"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default WhatMakesUsStandOut;

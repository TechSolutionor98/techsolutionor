"use client";
import React from "react";
import Image from "next/image";
import HeroBg from "../../../../../components/Images/best-web-development-company-in-dubai.png";
import { useQuote } from "@/app/_context/QuoteContext";

const WebDevBanner = () => {
  const { openQuote } = useQuote();

  return (
    <section className="relative w-full bg-[#0a1435] overflow-hidden min-h-[440px] md:min-h-[520px] lg:min-h-[560px] flex items-center font-sans">
      {/* BACKGROUND IMAGE OVERLAY */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src={HeroBg}
          alt="Best Web Development Company in Dubai, UAE"
          fill
          className="object-cover object-right md:object-center"
          priority
        />
      </div>

      {/* FOREGROUND CONTENT OVERLAY */}
      <div className="relative z-10 max-w-[1280px] mx-auto pl-4 sm:pl-6 md:pl-8 lg:pl-10 pr-5 sm:pr-8 md:pr-14 py-10 md:py-14 lg:py-16 w-full flex flex-col md:flex-row items-center justify-between">
        
        {/* LEFT COLUMN: HEADING, PARAGRAPH, AND BUTTON */}
        <div className="w-full md:w-[58%] lg:w-[52%] text-white">
          <h1 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] font-extrabold tracking-tight leading-[1.18] mb-5 text-white">
            Best Web Development Company in Dubai, UAE: Trusted by Brands Worldwide
          </h1>

          <p className="text-[14px] sm:text-[15.5px] md:text-[16.5px] text-gray-200 font-normal leading-relaxed mb-8 max-w-[590px]">
            Partner with the best web development company in Dubai to build high-performance, scalable websites through expert web design and development services. From startups in Dubai to enterprises across the UAE and worldwide, we’re a trusted web development agency creating conversion-focused web solutions that boost engagement, strengthen brand authority and maximize ROI.
          </p>

          <div>
            <button
              onClick={openQuote}
              className="bg-black text-white text-[15px] sm:text-[16.5px] font-bold px-8 sm:px-9 py-3 sm:py-3.5 rounded-full hover:bg-gray-900 transition-all duration-300 shadow-xl cursor-pointer inline-flex items-center justify-center"
            >
              Hire Us
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: TRANSPARENT SPACER FOR BACKGROUND GRAPHICS */}
        <div className="hidden md:block w-full md:w-[42%] lg:w-[48%] pointer-events-none"></div>

      </div>
    </section>
  );
};

export default WebDevBanner;

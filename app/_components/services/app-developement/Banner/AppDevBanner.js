"use client";
import React from "react";
import AppDevDots from "../../../../../components/Images/webdevbannerdots.png";
import Image from "next/image";

const AppDevBanner = () => {
  return (
    <div className="w-full bg-white font-sans pt-8 md:pt-12 pb-0 overflow-hidden relative">
      
      {/* CENTRAL CONTENT WRAPPER */}
      <div className="max-w-[1140px] mx-auto px-5 relative z-10">
        
        {/* BLACK HEADER BOX WITH ROUNDED CORNERS */}
        <div className="w-full bg-[#181818] rounded-[24px] pt-8 sm:pt-10 pb-28 px-6 sm:px-10 text-center shadow-lg">
          <h1 className="text-white text-center text-[20px] sm:text-[26px] md:text-[32px] font-extrabold tracking-wide uppercase max-w-[1000px] mx-auto leading-snug">
            MOBILE APP DEVELOPMENT COMPANY IN DUBAI &amp; UAE FOR STARTUPS &amp; ENTERPRISES
          </h1>
        </div>

        {/* GREEN OVERLAPPING CARD */}
        <div className="w-full px-2 sm:px-4 -mt-[85px] sm:-mt-[95px] relative z-20">
          <div className="relative mx-auto w-full max-w-[920px] bg-[#41b349] rounded-[24px] shadow-xl py-8 sm:py-10 md:py-12 px-6 sm:px-10 md:px-14 text-center overflow-hidden">
            {/* DOTS PATTERN OVERLAY INSIDE GREEN CARD */}
            <Image
              src={AppDevDots}
              alt="Halftone Dots Overlay"
              fill
              className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
              priority
            />

            {/* PARAGRAPH CONTENT */}
            <p className="relative z-10 text-white text-[14.5px] sm:text-[16px] md:text-[17px] leading-[26px] sm:leading-[30px] font-normal text-center max-w-[840px] mx-auto">
              We provide custom mobile app development services in Dubai, Abu Dhabi and across the UAE, delivering secure, scalable and user-focused iOS, Android and web applications. As a leading app development company, we work with startups, SMEs and enterprises worldwide. From idea validation to launch and ongoing support, our expert app developers transform your vision into high-performing digital products built to drive business growth, enhance user engagement and maximize ROI.
            </p>
          </div>
        </div>

      </div>

      {/* FULL-WIDTH DOTTED BACKGROUND PATTERN AT BOTTOM */}
      <div className="w-full h-[220px] sm:h-[280px] md:h-[320px] -mt-[140px] sm:-mt-[160px] relative z-0 pointer-events-none overflow-hidden">
        <Image
          src={AppDevDots}
          alt="App Development Dots Background"
          fill
          className="object-cover opacity-60 w-full h-full"
          priority
        />
      </div>

    </div>
  );
};

export default AppDevBanner;

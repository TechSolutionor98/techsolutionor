"use client";
import React from "react";
import SoftwareBannerImage from "../../../../../components/Images/softwaredevbanner.webp";
import Image from "next/image";
import { useQuote } from "@/app/_context/QuoteContext";

const SoftwareDevBanner = () => {
  const { openQuote } = useQuote();

  return (
    <div className="bg-[#262323] w-full font-sans">
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* LEFT TEXT CONTENT */}
        <div className="w-full md:w-[58%] lg:w-[60%] text-white">
          {/* HEADING IN EXACTLY 4 LINES (SLIGHTLY REDUCED FONT SIZE) */}
          <h1 className="font-bold tracking-tight leading-[1.18] text-[28px] sm:text-[34px] md:text-[40px] lg:text-[44px]">
            <span className="block">Custom Software</span>
            <span className="block">Development in Dubai &amp;</span>
            <span className="block">UAE That Delivers</span>
            <span className="block">Results</span>
          </h1>

          {/* PARAGRAPH */}
          <p className="mt-6 text-[14px] sm:text-[15px] md:text-[15.5px] leading-relaxed text-[#cfcfcf] max-w-[620px] font-normal">
            TechSolutionor is a trusted provider of custom software development in Dubai &amp; UAE, helping startups, enterprises and growing businesses build powerful digital solutions. Our expert developers create scalable, secure and high-performance software tailored to your business needs from enterprise software and SaaS platforms to advanced web applications. As a leading software development company in Dubai, we deliver innovative solutions designed to streamline operations, improve efficiency and accelerate your digital growth.
          </p>

          {/* GET A QUOTE BUTTON */}
          <button
            onClick={openQuote}
            className="mt-8 bg-[#41b349] text-white px-7 py-3 font-semibold rounded-[4px] border border-[#41b349] transition duration-300 hover:bg-white hover:text-black cursor-pointer shadow-md"
          >
            Get A Quote
          </button>
        </div>

        {/* RIGHT BANNER IMAGE */}
        <div className="w-full md:w-[42%] lg:w-[40%] flex justify-center md:justify-end">
          <Image
            src={SoftwareBannerImage}
            alt="Custom Software Development in Dubai & UAE"
            width={600}
            height={520}
            className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[480px] object-contain"
            priority
          />
        </div>

      </div>
    </div>
  );
};

export default SoftwareDevBanner;

"use client";
import React from "react";
import Image from "next/image";
import StrategyImage from "../../../../../components/Images/webdevstra.png";
import { useQuote } from "@/app/_context/QuoteContext";

const Strategy = () => {
  const { openQuote } = useQuote();

  return (
    <section className="w-full bg-white m-0 p-0 font-sans relative overflow-hidden">
      <div className="w-full max-w-[1400px] ml-0 mr-auto pl-5 sm:pl-8 md:pl-12 lg:pl-16 pr-0 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
        
        {/* LEFT COLUMN: TEXT CONTENT */}
        <div className="w-full md:w-[58%] lg:w-[54%] text-[#222222] flex flex-col items-start py-2">
          
          {/* MAIN HEADING */}
          <h2 className="text-[26px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-extrabold text-[#111111] tracking-tight leading-tight mb-3">
            Is Your Website Holding Back Your Growth?
          </h2>

          {/* TOP PARAGRAPH */}
          <p className="text-[14px] sm:text-[15px] text-gray-600 font-normal leading-relaxed mb-2.5">
            Many businesses approach website development reactively, fixing issues as they appear, adding features without structure or redesigning without a long-term digital strategy.
          </p>

          {/* SUBHEAD */}
          <p className="text-[14.5px] sm:text-[15.5px] text-gray-700 font-medium mb-1.5">
            The result?
          </p>

          {/* BULLET POINTS */}
          <ul className="list-disc list-inside space-y-1 text-[13.5px] sm:text-[14.5px] text-gray-600 font-normal mb-3 pl-1">
            <li>Disjointed user experience</li>
            <li>Weak search engine rankings</li>
            <li>Poor lead generation</li>
            <li>Low conversion rates</li>
            <li>A website that no longer reflects your brand</li>
          </ul>

          {/* MIDDLE PARAGRAPH */}
          <p className="text-[14px] sm:text-[15px] text-gray-600 font-normal leading-relaxed mb-2.5">
            Without a well-organized web development strategy, your website struggles to communicate your value, rank for competitive keywords or compete in the UAE and global digital marketplace.
          </p>

          {/* BOTTOM PARAGRAPH */}
          <p className="text-[14px] sm:text-[15px] text-gray-600 font-normal leading-relaxed mb-4">
            If your website isn’t generating measurable ROI, it’s time to partner with a professional website development company to build high-performance, scalable websites and custom web solutions designed to boost engagement, strengthen brand authority and maximize results.
          </p>

          {/* GREEN CTA BUTTON */}
          <div>
            <button
              onClick={openQuote}
              className="bg-[#41b349] text-white text-[14px] sm:text-[15.5px] font-bold px-7 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-[#36963d] transition-all duration-300 shadow-md cursor-pointer inline-flex items-center justify-center"
            >
              Audit My Website For Growth
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: GRAPHIC IMAGE AT FAR RIGHT EDGE */}
        <div className="w-full md:w-[42%] lg:w-[44%] flex justify-center md:justify-end items-center pr-0 relative -right-4 sm:-right-6 md:-right-8 lg:-right-10">
          <Image
            src={StrategyImage}
            alt="Web Development Strategy Graphic"
            width={440}
            height={440}
            className="w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px] h-auto object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default Strategy;

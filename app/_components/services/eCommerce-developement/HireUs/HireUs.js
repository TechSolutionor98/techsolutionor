"use client";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useQuote } from "@/app/_context/QuoteContext";

const HireUs = ({
  line1 = "Ready to scale your digital presence in Dubai and across the UAE?",
  line2 = "Drive more sales with TechSolutionor's eCommerce expertise."
}) => {
  const { openQuote } = useQuote();

  return (
    <section className="w-full flex justify-center py-10 md:py-14 px-4 bg-white" style={{ backgroundColor: "#ffffff" }}>
      <div
        className="w-full max-w-[980px] min-h-[110px] md:min-h-[145px] flex rounded-[24px] md:rounded-[30px] overflow-hidden transition-all duration-300"
        style={{
          boxShadow: "0px 10px 30px rgba(65, 179, 73, 0.35)",
        }}
      >
        {/* GREEN LEFT SECTION */}
        <div className="flex-[3] bg-[#41b349] flex items-center justify-center px-4 sm:px-6 md:px-10 py-5 text-center">
          <h2
            className="text-center text-[16px] sm:text-[22px] md:text-[26px] lg:text-[28px] font-extrabold leading-tight tracking-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {/* LINE 1 (DARK TEXT) */}
            <span className="text-[#232323] block mb-1">
              {line1}
            </span>
            {/* LINE 2 (WHITE TEXT) */}
            <span className="text-white block">
              {line2}
            </span>
          </h2>
        </div>

        {/* BLACK RIGHT BUTTON SECTION */}
        <div
          onClick={openQuote}
          className="flex-[1] min-w-[130px] sm:min-w-[170px] md:min-w-[210px] bg-[#111111] flex items-center justify-center cursor-pointer hover:bg-[#000000] transition-colors duration-300 px-4"
        >
          <button className="text-white text-[14px] sm:text-[17px] md:text-[20px] font-bold flex items-center gap-2.5 sm:gap-3 group cursor-pointer">
            <span>Hire Us</span>
            <span className="bg-white rounded-full w-5 h-5 sm:w-6 sm:h-6 text-[12px] sm:text-[14px] flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300">
              <FaArrowRight className="text-black" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HireUs;

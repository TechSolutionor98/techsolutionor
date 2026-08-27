"use client";
import React from "react";
import Image from "next/image";
import SeoAuditImg from "../../../components/Images/SEO-audit.png";

const SeoAuditSampleReport = () => {
  const points = [
    "Page performance insights",
    "Keyword ranking analysis",
    "Technical issues and recommendations",
    "Competitor comparisons",
    "Actionable growth plan",
  ];

  return (
    <section className="py- bg-white overflow-hidden -mt-20">
      <div className="container mx-auto px-5 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
          {/* Left Side: Illustration */}
          <div className="flex-1 w-full flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[600px] aspect-[4/3] mb-30 ml-20">
              <Image
                src={SeoAuditImg}
                alt="Sample SEO Audit Report Illustration"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="flex-1">
            <span className="inline-block bg-[#262323] text-white px-6 py-[12px] text-[14px] font-semibold mb-6 tracking-normal normal-case leading-[14px] h-[38px] shadow-[0px_10px_6px_rgba(65,179,73,0.36)] rounded-[1px] transition duration-300 cursor-pointer ">
              Sample SEO Report
            </span>

            <h2 className="text-3xl md:text-[33px] font-extrabold text-[#262323] mb-4 leading-tight">
              See What a Professional <br /> SEO Audit Looks Like
            </h2>

            <p className="text-gray-600 text-lg md:text-[18px] mb-4">
              Get an example of our comprehensive SEO audit report, including:
            </p>

            <ul className="space-y-2 mb-4">
              {points.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-700 text-lg md:text-[18px] "
                >
                  <span className="text-gray-700 ">•</span>
                  {point}
                </li>
              ))}
            </ul>

            <button className="font-roboto font-medium text-[15px] leading-[15px] tracking-normal text-center text-white no-underline uppercase bg-[#61CE70] rounded-[3px] px-6 py-3 inline-block cursor-pointer shadow-none transition-all duration-300 select-none">
              Sample SEO Audit Report
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoAuditSampleReport;

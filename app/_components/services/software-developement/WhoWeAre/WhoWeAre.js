"use client";
import React from "react";
import Image from "next/image";
import FrameworkImg from "@/components/Images/Ecommerceframework.png";

const WhoWeAre = () => {
  return (
    <section className="w-full bg-white py-12 md:py-16 font-sans">
      <div className="max-w-[1140px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
          {/* LEFT ILLUSTRATION */}
          <div className="w-full md:w-[45%] lg:w-[42%] flex justify-center">
            <Image
              src={FrameworkImg}
              alt="Who We Are - Custom Software Development Dubai"
              width={500}
              height={400}
              className="w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] object-contain"
              priority
            />
          </div>

          {/* RIGHT TEXT CONTENT */}
          <div className="w-full md:w-[55%] lg:w-[58%] text-[#262323]">
            <h2 className="text-[26px] sm:text-[30px] md:text-[34px] font-bold text-gray-900 mb-4 tracking-tight">
              Who We Are
            </h2>

            <p className="text-[14.5px] sm:text-[15.5px] md:text-[16px] leading-[28px] sm:leading-[30px] md:leading-[32px] text-[#4a4a4a] font-normal">
              We are a dedicated team of software developers in Dubai, Abu Dhabi and across the UAE, committed to building tailored business software solutions that deliver seamless performance and measurable outcomes. As one of the trusted software development companies, our expertise spans enterprise software development, SaaS platforms and custom business systems with a focus on strategic design, secure architecture and scalable infrastructure. This is where our approach to custom software development truly stands apart: we help brands in Dubai and global markets optimize operations, improve efficiency and drive long-term business growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;

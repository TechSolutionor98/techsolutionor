"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ServicesBg from "../../../components/Images/blogbanner.png";
// import TechBg from "../../../components/Images/technologybannerbg.svg";

const ServicesPageHero = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={ServicesBg}
          alt="Blog Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-xl md:max-w-2xl">
          {/* Hero Text */}
          <div className="text-white mb-8 md:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-[38px] lg:text-[42px] font-bold leading-tight mb-6">
              Expert Web Development, <br />
              <span className="text-white">SEO & Digital Growth</span> <br />
              <span className="text-white">Strategies</span>
            </h1>
            <p className="text-base md:text-[16px] text-white/95 leading-relaxed max-w-lg">
              Empowering businesses in Dubai, across the UAE, and worldwide with expert insights on web development, SEO, UI/UX design, and digital marketing strategies. Discover practical guides and proven growth techniques designed to help brands build high-performing websites, improve search rankings, and achieve measurable online success.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-start gap-4">
            <button className="px-5 py-2.5 bg-[#00C853] text-white text-[16px] hover:bg-white hover:text-[#00C853] transition-all duration-300 shadow-lg capitalize tracking-wide">
              Explore Our Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPageHero;

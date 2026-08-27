"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ServicesBg from "../../../components/Images/blogbanner.png";
// import TechBg from "../../../components/Images/technologybannerbg.svg";

const ServicesPageHero = () => {
  return (
    <div className="relative w-full  h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* <div className="absolute top-0 left-0 opacity-60 rotate-0 z-20">
        <Image
          src={TechBg}
          alt="Tech Background"
          width={400}
          height={400}
          className="w-[350px] bg-cover "
        />
      </div> */}
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={ServicesBg}
          alt="Services Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-black/70 z-[1]"></div>
      </div>

      {/* Content Overlay */}
                  <div className="container mx-auto px-5 md:px-10 relative z-10">
                <div className="max-w-4xl md:ml-50">
                    {/* Hero Text */}
                    <div className="text-white mb-10">
                        <h1 className="text-4xl md:text-[38px]  font-bold leading-tight mb-8">
                            Expert Web Development, <br />
                            <span className="text-white">SEO & Digital Growth</span> <br />
                            <span className="text-white">Strategies</span>
                        </h1>
                        <p className="text-lg md:text-[16px] text-gray-200 leading-relaxed max-w-lg text-justify ">
                            Empowering businesses in Dubai, across the UAE, and worldwide with expert insights on web development, SEO, UI/UX design, and digital marketing strategies. Discover practical guides and proven growth techniques designed to help brands build high-performing websites, improve search rankings, and achieve measurable online success.
                        </p>
                    </div>

                    {/* CTA Button & Tagline */}
                    <div className="flex flex-col items-start gap-4">
                        <button className="px-4 py-2 bg-[#00C853] text-white  text-[16px] hover:bg-white hover:text-[#00C853] transition-all duration-300 shadow-lg uppercase tracking-wide">
                            Explore Our Insights
                        </button>
                        {/* <p className="text-gray-300 text-sm italic">
                            "No Automated Bot Reports. Get a Custom SEO Action Plan Hand-Crafted by Our Experts."
                        </p> */}
                    </div>
                </div>
            </div>
    </div>
  );
};

export default ServicesPageHero;

"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ServicesBg from "../../../components/Images/services-bg-green.png";
import TechBg from "../../../components/Images/technologybannerbg.svg";

const ServicesPageHero = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 opacity-60 rotate-0 z-20">
        <Image
          src={TechBg}
          alt="Tech Background"
          width={400}
          height={400}
          className="w-[350px] bg-cover "
        />
      </div>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={ServicesBg}
          alt="Services Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between w-full">
        <div className="w-full md:w-1/2 text-left mt-10 md:mt-0">
          <div className="inline-block bg-[#41B349] text-white text-[15px] font-semibold px-4 py-2 mb-6 ">
            Technology services
          </div>
          <h1 className="text-white text-[30px] md:text-[35px] font-bold leading-tight mb-6">
            Leading Web <br />
            Development, SEO &<br />
            <span className="">Digital Marketing Agency.</span>
          </h1>
          <p className="text-gray-300 text-[16px] max-w-[430px] mb-8 ">
            Empowering businesses with custom web development, mobile apps,
            e-commerce platforms, and enterprise software solutions in Dubai,
            across the UAE, and globally. We deliver innovative, SEO-friendly,
            high-performance digital products tailored to help your business
            grow worldwide.
          </p>
          <button
            onClick={() => {
              document.getElementById("services").scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="bg-[#41B349] text-white px-4 py-1.5 font-semibold hover:bg-white hover:text-black transition-all duration-2000 cursor-pointer"
          >
            Our Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPageHero;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowDownLong } from "react-icons/fa6";
// import { useQuote } from '@/app/_context/QuoteContext'

import ServicesBg from "@/components/Images/servicesbg.png";

// Standard service icons (using existing ones or placeholders if needed)
import Web from "@/components/Images/servicesicon1.png";
import Software from "@/components/Images/servicesicon2.png"; // Closest for software
import App from "@/components/Images/servicesicon3.png";
import Ecommerce from "@/components/Images/servicesicon4.png";
import Graphics from "@/components/Images/servicesicon5.png";
import Social from "@/components/Images/servicesicon6.png";
import Digital from "@/components/Images/servicesicon7.png";
import PPC from "@/components/Images/servicesicon8.png";
import Seo from "@/components/Images/servicesicon9.png";
import Content from "@/components/Images/servicesicon10.png";
import Call from "@/components/Images/servicesicon11.png";

const services = [
  {
    icon: Web,
    title: "Web Development",
    desc: "Responsive, SEO-friendly websites for businesses",
    link: "/services/web-development",
  },
  {
    icon: Software,
    title: "Software Development",
    desc: "Custom enterprise and business software solutions",
    link: "/services/software-development",
  },
  {
    icon: App,
    title: "App Development",
    desc: "iOS & Android apps for all platforms",
    link: "/services/app-development",
  },
  {
    icon: Ecommerce,
    title: "E-commerce Development",
    desc: "Scalable online stores that drive sales",
    link: "/services/ecommerce-development",
  },
  {
    icon: Graphics,
    title: "Graphics Design",
    desc: "Creative designs to elevate your brand",
    link: "/services/graphic-design",
  },
  {
    icon: Social,
    title: "Social Media",
    desc: "Engaging strategies for social media growth",
    link: "/services/social-media",
  },
  {
    icon: Digital,
    title: "Digital Marketing",
    desc: "Result-driven online marketing solutions worldwide",
    link: "/services/digital-marketing",
  },
  {
    icon: PPC,
    title: "PPC & Amazon",
    desc: "Targeted ads for maximum ROI",
    link: "/services/ppc-amazon-ads",
  },
  {
    icon: Seo,
    title: "Search Engine Optimization",
    desc: "Boost visibility and search rankings fast",
    link: "/services/search-engine-optimization",
  },
  {
    icon: Content,
    title: "Content Writing",
    desc: "Compelling content that converts visitors",
    link: "/services/content-writing",
  },
  {
    icon: Call,
    title: "Call Center",
    desc: "Professional support for your customers",
    link: "/services/call-center",
  },
];

const OurServicesGrid = () => {
  // const { openQuote } = useQuote();

  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount(services.length);
  };

  return (
    <div id="services" className="bg-white w-full">
      <div className="uppertext px-5 md:px-0 md:w-[798px] flex flex-col items-center justify-center  mx-auto my-10 gap-5">
        <h1 className="text-[#262323] font-montserrat text-[45px] font-bold flex items-center flex-col w-full justify-center gap-0">
          Services <br />
          <span className="text-[45px] font-bold bg-[#41B349] border border-[#41B349] rounded-[1px] shadow-[0px_5px_10px_0px_rgba(65,179,73,0.55)] text-white w-[260px] h-[70px] flex items-center justify-center">
            We Offer
          </span>
        </h1>
      </div>

      <div className="lowercards relative">
        <div className="bg-image absolute -z-10">
          <Image alt="Service" src={ServicesBg} width={650} height={600} />
        </div>

        <div className="cards z-10 grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 justify-center place-items-center max-w-[1100px] mx-auto px-5 ">
          {services.slice(0, visibleCount).map((item, i) => (
  <Link key={i} href={item.link}>
    <div
      className="service-cards rounded-[20px] flex flex-col w-[320px] h-[320px] items-center justify-center bg-white gap-4 
      transition-all duration-300 ease-in hover:scale-105 hover:shadow-2xl cursor-pointer shadow-lg p-6 text-center"
    >

      <div className="images-top relative h-[80px] flex items-center justify-center">
        <Image
          src={item.icon}
          alt={item.title}
          width={62}
          height={62}
          className="object-contain"
        />
      </div>

      <h1 className="text-[22px] font-[700] text-[#41b349]">
        {item.title}
      </h1>

      <p className="text-[14px] leading-[20px] text-gray-600">
        {item.desc}
      </p>

    </div>
  </Link>
))}
        </div>

        {visibleCount < services.length && (
          <div className="explore-more mt-10 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="relative overflow-hidden gap-3 bg-[#41B349] text-white h-[45px] px-8 flex items-center justify-center text-[16px] font-[600] rounded-full border border-[#41B349] hover:bg-white hover:text-[#41b349] transition-all duration-300 cursor-pointer group shine-btn"
            >
              Explore More
              <FaArrowDownLong className="mt-0.5 font-bold" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurServicesGrid;

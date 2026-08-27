"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuote } from "@/app/_context/QuoteContext";

import img1 from "@/components/Images/why_expertise_1.jpg";
import img2 from "@/components/Images/why_expertise_2.jpg";
import img3 from "@/components/Images/why_expertise_3.jpg";
import img4 from "@/components/Images/why_expertise_4.jpg";

const cardsData = [
  {
    id: 1,
    title: "Dedicated Support & Expertise",
    desc: "Our team works closely with you to ensure smooth project delivery, continuous optimization, and expert guidance every step of the way.",
    image: img1,
  },
  {
    id: 2,
    title: "Customized Approach",
    desc: "We provide tailored solutions that help businesses grow locally and internationally. From strategy to execution, every plan is designed to meet your unique goals.",
    image: img2,
  },
  {
    id: 3,
    title: "Results-Driven Solutions",
    desc: "Our campaigns and development projects are focused on measurable outcomes, increasing traffic, leads, and ROI for your business.",
    image: img3,
  },
  {
    id: 4,
    title: "Personalized Business Packages",
    desc: "We offer flexible packages combining SEO, social media, digital marketing, and web development solutions like WordPress, WooCommerce, Shopify, Custom PHP, React JS, and NextJS.",
    image: img4,
  },
];

const WhyExpertiseCommitment = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { openQuote } = useQuote();

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cardsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Compute 2 visible cards for desktop/tablet view
  const visibleCards = [
    cardsData[activeIndex % cardsData.length],
    cardsData[(activeIndex + 1) % cardsData.length],
  ];

  return (
    <section className="w-full bg-white py-14 md:py-20 font-sans overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14">
        
        {/* LEFT COLUMN: TEXT & CTA */}
        <div className="w-full lg:w-[42%] text-[#111111] flex flex-col items-start">
          <h2 className="text-[30px] sm:text-[36px] md:text-[40px] font-extrabold tracking-tight leading-[1.15] mb-2">
            Why Tech Solutionor? <br />
            Our Expertise &amp; Commitment
          </h2>

          <h3 className="text-[#41b349] font-bold text-[18px] sm:text-[20px] mb-4">
            Your Success Is Our Priority
          </h3>

          <p className="text-[14.5px] sm:text-[15px] text-gray-600 font-normal leading-relaxed mb-6">
            At Tech Solutionor, we’re not just a service provider, we’re your dedicated technology partner. From strategy and design to development and deployment, we work transparently with you to ensure every solution aligns with your business goals. Our commitment to quality, continuous improvement, and client satisfaction sets us apart.
          </p>

          <button
            onClick={openQuote}
            className="bg-[#41b349] text-white font-medium text-[15px] px-7 py-3 rounded-full hover:bg-black transition-all duration-300 shadow-md cursor-pointer"
          >
            Get a quote
          </button>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE CIRCULAR CARDS SLIDER */}
        <div className="w-full lg:w-[58%] flex flex-col items-center">
          
          {/* SLIDER CARDS CONTAINER */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 justify-center min-h-[380px] transition-all duration-500 ease-in-out">
            {visibleCards.map((card) => (
              <div
                key={card.id}
                className="flex flex-col items-center text-center p-3 transition-all duration-500 transform hover:-translate-y-1"
              >
                {/* CIRCULAR IMAGE */}
                <div className="w-[210px] h-[210px] sm:w-[230px] sm:h-[230px] md:w-[240px] md:h-[240px] rounded-full overflow-hidden mb-5 shadow-lg border-4 border-white flex-shrink-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={240}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CARD TITLE */}
                <h4 className="text-[18px] sm:text-[20px] font-bold text-[#1f2937] leading-snug mb-2 max-w-[240px]">
                  {card.title}
                </h4>

                {/* CARD DESCRIPTION */}
                <p className="text-[13.5px] text-gray-500 leading-relaxed max-w-[270px]">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* NAVIGATION DOTS */}
          <div className="flex items-center gap-3 mt-8 justify-center">
            {cardsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === idx
                    ? "w-3.5 h-3.5 bg-[#41b349] scale-110 shadow-sm"
                    : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyExpertiseCommitment;

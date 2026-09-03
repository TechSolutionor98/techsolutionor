"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaBriefcase } from "react-icons/fa";
import {
  FaGlobe,
  FaMobileScreenButton,
  FaLaptopCode,
  FaCartShopping,
  FaPalette,
  FaShareNodes,
  FaBullhorn,
  FaBullseye,
  FaMagnifyingGlassChart,
  FaPenNib,
} from "react-icons/fa6";
import { getCmsVal } from "@/lib/api-helper";

export const defaultServicesWeOffer = {
  titleTop: "Services",
  titleBottom: "We Offer",
  description:
    "We deliver innovative digital and IT solutions tailored to your business needs, helping you improve efficiency, scale operations, and accelerate growth. Our services combine advanced technologies, strategic execution, and dedicated customer support to ensure measurable results for businesses worldwide, with a strong focus on the UAE market.",
  exploreButtonText: "Explore More",
  cards: [
    { title: "Web Development", link: "/services/web-development" },
    { title: "App Development", link: "/services/app-development" },
    { title: "Software Development", link: "/services/software-development" },
    { title: "Ecommerce Development", link: "/services/ecommerce-development" },
    { title: "Graphics & UI/UX", link: "/services/graphics-designing" },
    { title: "Social Media", link: "/services/social-media" },
    { title: "Digital Marketing", link: "/services/digital-marketing" },
    { title: "PPC & Amazon", link: "/services/ppc-amazon" },
    { title: "Search Engine Optimization", link: "/services/seo" },
    { title: "Content Writing", link: "/services/content-writing" },
  ],
};

const serviceIcons = [
  FaGlobe,
  FaMobileScreenButton,
  FaLaptopCode,
  FaCartShopping,
  FaPalette,
  FaShareNodes,
  FaBullhorn,
  FaBullseye,
  FaMagnifyingGlassChart,
  FaPenNib,
];

const ServicesWeOffer = ({ cmsContent }) => {
  const [activeIdx, setActiveIdx] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [radius, setRadius] = useState(270);

  useEffect(() => {
    const updateRadius = () => {
      if (typeof window !== "undefined") {
        setRadius(window.innerWidth < 640 ? 150 : window.innerWidth < 768 ? 230 : 270);
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const titleTop = getCmsVal(cmsContent, defaultServicesWeOffer.titleTop, "servicesweoffer");
  const titleBottom = getCmsVal(cmsContent, defaultServicesWeOffer.titleBottom, "servicesweoffer");
  const description = getCmsVal(cmsContent, defaultServicesWeOffer.description, "servicesweoffer");
  const exploreButtonText = getCmsVal(cmsContent, defaultServicesWeOffer.exploreButtonText, "servicesweoffer");

  const cardsData = defaultServicesWeOffer.cards.map((defaultCard, index) => {
    const fullTitle = getCmsVal(cmsContent, defaultCard.title, "servicesweoffer");
    const IconComponent = serviceIcons[index] || FaGlobe;

    return {
      id: index,
      icon: IconComponent,
      title: fullTitle,
      link: defaultCard.link || "/services",
    };
  });

  const activeService = activeIdx !== null ? cardsData[activeIdx] : null;

  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] py-16 md:py-24 select-none">
      {/* CSS Rules for Dead-Still Hover Pause */}
      <style jsx>{`
        @keyframes orbitRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes counterRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
        .revolving-orbit-track {
          animation: orbitRotate 38s linear infinite;
        }
        .revolving-orbit-track.orbit-paused {
          animation-play-state: paused !important;
        }
        .revolving-counter-node {
          animation: counterRotate 38s linear infinite;
        }
        .revolving-counter-node.orbit-paused {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#41B349]/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/20 text-[#41B349] font-extrabold text-xs uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
            <span>EXPERT IT & DIGITAL SOLUTIONS</span>
          </div>

          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D0F12] tracking-tight leading-tight"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {titleTop} <span className="text-[#41B349]">{titleBottom}</span>
          </h2>

          <p className="mt-4 text-[#4A5568] text-base sm:text-lg leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>

      {/* Revolving Orbital Service Showcase (10 Services) */}
      <div 
        className="relative z-10 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[600px] sm:min-h-[700px] px-4"
        onMouseLeave={() => {
          setIsPaused(false);
          setActiveIdx(null);
        }}
      >
        
        {/* Orbital Wheel Container */}
        <div 
          className="relative w-[380px] h-[380px] sm:w-[560px] sm:h-[560px] md:w-[640px] md:h-[640px] flex items-center justify-center"
          onMouseLeave={() => {
            setIsPaused(false);
            setActiveIdx(null);
          }}
        >

          {/* Revolving Orbit Track */}
          <div
            className={`absolute inset-0 w-full h-full pointer-events-none revolving-orbit-track ${
              isPaused ? 'orbit-paused' : ''
            }`}
          >
            {cardsData.map((item, i) => {
              const total = cardsData.length;
              const angleDeg = (i * 360) / total;
              const angleRad = (angleDeg * Math.PI) / 180;

              const x = (Math.cos(angleRad) * radius).toFixed(3);
              const y = (Math.sin(angleRad) * radius).toFixed(3);

              const isActive = activeIdx === i;
              const IconComponent = item.icon;

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 cursor-pointer transition-all duration-300 z-10 pointer-events-auto"
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  }}
                  onMouseEnter={() => {
                    setIsPaused(true);
                    setActiveIdx(i);
                  }}
                >
                  {/* Counter-Rotating Node to Keep Text & Icon Upright */}
                  <div
                    className={`flex flex-col items-center group revolving-counter-node ${
                      isPaused ? 'orbit-paused' : ''
                    }`}
                  >
                    {/* Node Circle Badge */}
                    <div 
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                        isActive
                          ? "bg-[#41B349] border-4 border-white scale-110 shadow-[0_0_25px_rgba(65,179,73,0.5)]"
                          : "bg-white border-2 border-gray-200 group-hover:bg-[#41B349] group-hover:border-white group-hover:scale-110"
                      }`}
                    >
                      <IconComponent
                        className={`w-5 h-5 sm:w-7 sm:h-7 transition-colors duration-300 ${
                          isActive ? "text-white" : "text-black group-hover:text-white"
                        }`}
                      />
                    </div>

                    {/* Node Title Label with Clear Margin */}
                    <span 
                      className={`mt-2.5 sm:mt-3 text-[11px] sm:text-xs font-bold text-center max-w-[95px] sm:max-w-[115px] leading-tight transition-colors duration-300 ${
                        isActive ? "text-[#41B349] font-black scale-105" : "text-[#0D0F12] group-hover:text-[#41B349]"
                      }`}
                      style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Central Hub Card */}
          <div 
            className="relative z-20 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full bg-[#0D0F12] border-4 border-[#41B349]/50 shadow-[0_0_60px_rgba(65,179,73,0.3)] flex flex-col items-center justify-center p-6 text-center transition-all duration-500 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              setIsPaused(false);
              setActiveIdx(null);
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#41B349]/15 to-transparent pointer-events-none" />

            <AnimatePresence mode="wait">
              {activeService ? (
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-[#41B349] border-2 border-white flex items-center justify-center mb-2 shadow-md">
                    {activeService.icon && (
                      <activeService.icon className="w-5 h-5 sm:w-7 sm:h-7 text-white transition-colors duration-300" />
                    )}
                  </div>

                  <h3 
                    className="text-sm sm:text-lg font-black text-white leading-tight px-2 mb-2.5"
                    style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {activeService.title}
                  </h3>

                  <Link href={activeService.link}>
                    <button className="inline-flex items-center gap-2 bg-[#41B349] text-[#FCFCFC] text-xs sm:text-sm font-bold px-5 py-2 rounded-full shadow-[0_5px_15px_rgba(65,179,73,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/60 cursor-pointer">
                      <span>View Details</span>
                      <FaArrowRight size={11} />
                    </button>
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="default-hub"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#41B349]/20 border border-[#41B349] flex items-center justify-center mb-2 text-[#41B349]">
                    <FaBriefcase size={18} />
                  </div>

                  <h3 
                    className="text-base sm:text-xl font-black text-white tracking-wide uppercase mb-1"
                    style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    OUR SERVICES
                  </h3>

                  <p className="text-xs sm:text-sm text-[#94A3B8] font-medium mb-3">
                    Explore our offerings
                  </p>

                  <Link href="/services">
                    <button className="inline-flex items-center gap-2 bg-white/10 hover:bg-[#41B349] text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-full transition-all duration-300 border border-white/20 hover:border-[#41B349] cursor-pointer">
                      <span>{exploreButtonText}</span>
                      <FaArrowRight size={11} />
                    </button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ServicesWeOffer;

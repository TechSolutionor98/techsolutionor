"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CiUser } from "react-icons/ci";
import { FaCheckCircle, FaShieldAlt, FaBullseye } from "react-icons/fa";
import { useQuote } from "@/app/_context/QuoteContext";
import GoodServicess from '../../../../components/Images/goodservices.png';
import Value from '../../../../components/Images/value.png';
import Mission from '../../../../components/Images/mission.png';
import Goal from '../../../../components/Images/goal.png';
import { getCmsVal } from "@/lib/api-helper";

const GoodServices = ({ cmsContent }) => {
  const [inView, setInView] = useState(false);
  const barRef = useRef(null);
  const { openQuote } = useQuote();

  const headingLine1 = getCmsVal(cmsContent, "You Can Rely on Us for", "goodservices");
  const headingLine2 = getCmsVal(cmsContent, "High-Quality Digital & IT Services", "goodservices");
  const paragraph1 = getCmsVal(
    cmsContent,
    "TECHSOLUTIONOR was founded to address the growing demand for expert IT advisory, web development, and digital solutions for businesses worldwide. Our mission is to help companies improve efficiency, maximize productivity, and achieve sustainable growth through cutting-edge technology and data-driven strategies.",
    "goodservices"
  );
  const paragraph2 = getCmsVal(
    cmsContent,
    "We believe in long-term partnerships, not one-time projects. By understanding your business challenges, goals, and market, especially within the UAE and global landscape, we deliver customized solutions that drive real results. Partner with TECHSOLUTIONOR to innovate, scale, and stay ahead in a competitive digital world.",
    "goodservices"
  );
  const serviceExcellenceTitle = getCmsVal(cmsContent, "Service Excellence", "goodservices");
  const serviceExcellencePercent = getCmsVal(cmsContent, "90", "goodservices");
  const getInTouchTitle = getCmsVal(cmsContent, "Get In Touch", "goodservices");
  const clientSatisfactionText = getCmsVal(cmsContent, "90% Client Satisfaction", "goodservices");
  const quoteButtonText = getCmsVal(cmsContent, "Get a Quote", "goodservices");
  const rightImage = getCmsVal(cmsContent, GoodServicess, "goodservices");

  const valuesCard = {
    icon: getCmsVal(cmsContent, Value, "goodservices"),
    title: getCmsVal(cmsContent, "Our Values", "goodservices"),
    list: ["Awareness", "Automation", "Growth", "Success", "Achievement", "Ease of Access"].map(item => getCmsVal(cmsContent, item, "goodservices")),
  };

  const missionCard = {
    icon: getCmsVal(cmsContent, Mission, "goodservices"),
    title: getCmsVal(cmsContent, "Our Mission", "goodservices"),
    list: ["Trust", "Responsibility", "Professionalism", "Client Satisfaction", "24/7 Support", "Customization"].map(item => getCmsVal(cmsContent, item, "goodservices")),
  };

  const goalsCard = {
    icon: getCmsVal(cmsContent, Goal, "goodservices"),
    title: getCmsVal(cmsContent, "Our Goals", "goodservices"),
    list: ["Cooperation", "Quick Services", "Fast Response", "Honesty", "Efficiency", "Integrity"].map(item => getCmsVal(cmsContent, item, "goodservices")),
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!barRef.current) return;
      const rect = barRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setInView(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isRightImgDynamic = typeof rightImage === 'string' && (rightImage.startsWith('http') || rightImage.startsWith('/'));
  const isValuesImgDynamic = typeof valuesCard.icon === 'string' && (valuesCard.icon.startsWith('http') || valuesCard.icon.startsWith('/'));
  const isMissionImgDynamic = typeof missionCard.icon === 'string' && (missionCard.icon.startsWith('http') || missionCard.icon.startsWith('/'));
  const isGoalsImgDynamic = typeof goalsCard.icon === 'string' && (goalsCard.icon.startsWith('http') || goalsCard.icon.startsWith('/'));

  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] py-16 md:py-24 select-none">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Progress */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/20 text-[#41B349] font-extrabold text-xs sm:text-sm uppercase tracking-widest mb-4 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
              <span>ABOUT TECHSOLUTIONOR</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D0F12] tracking-tight leading-tight" style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}>
              {headingLine1}{" "}
              <span className="text-[#41B349] block mt-1">{headingLine2}</span>
            </h2>

            <div className="mt-6 space-y-4 text-[#4A5568] text-base md:text-lg leading-relaxed font-normal">
              <p>{paragraph1}</p>
              <p>{paragraph2}</p>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-[#0D0F12] mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
                {serviceExcellenceTitle}
              </h3>
              <div className="w-full max-w-[700px]">
                <div className="relative w-full h-[21px] bg-gray-200 rounded overflow-hidden">
                  <div
                    ref={barRef}
                    className="absolute left-0 top-0 h-full bg-[#41B349] rounded transition-all duration-1000 flex items-center justify-end"
                    style={{
                      width: inView ? `${Number(serviceExcellencePercent) || 90}%` : "0%",
                    }}
                  >
                    <span className="text-white font-bold pr-4 text-[16px]">
                      {inView && `${Number(serviceExcellencePercent) || 90}%`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-[35px] font-[700] mb-0 text-[#0D0F12]">
                  {getInTouchTitle}
                </h3>
                <p className="text-[15px] text-black font-normal mt-1">
                  {clientSatisfactionText}
                </p>
              </div>

              <button
                onClick={openQuote}
                className="flex items-center gap-2 bg-[#232323] hover:bg-[#333] text-white font-semibold px-6 py-3 rounded transition-all duration-200 text-[14px]"
              >
                <CiUser size={18} />
                <span>{quoteButtonText}</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Showcase Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            {isRightImgDynamic ? (
              <img
                src={rightImage}
                alt="Good Services"
                width={800}
                height={800}
                className="w-full max-w-[450px] h-auto object-contain"
              />
            ) : (
              <Image 
                src={rightImage} 
                alt="Good Services" 
                width={800} 
                height={800} 
                className="w-full max-w-[450px] h-auto object-contain" 
              />
            )}
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* BENTO-STYLE CREATIVE CORE PILLARS SHOWCASE (VALUES, MISSION & GOALS) */}
        {/* ========================================================================= */}
        <div className="mt-20 md:mt-28">
          
          {/* Section Sub-Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/20 text-[#41B349] font-extrabold text-xs uppercase tracking-widest mb-3">
              <FaShieldAlt className="text-[#41B349]" />
              <span>CORE ARCHITECTURE</span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0D0F12] tracking-tight leading-tight" style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}>
              Our Values, Mission & Goals
            </h3>
            <p className="mt-3 text-[#4A5568] text-base sm:text-lg font-medium">
              The foundational principles driving our technical delivery, client partnerships, and digital innovation.
            </p>
          </div>

          {/* 3-Column Ultra-Premium Bento Grid Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* CARD 1: OUR VALUES */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative bg-[#0D0F12] rounded-3xl p-7 sm:p-8 border border-gray-800 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_rgba(65,179,73,0.25)] hover:border-[#41B349]/70 transform hover:-translate-y-2.5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Glowing Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#41B349] to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div>
                {/* Header Icon Viewport & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#181B24] to-[#11131A] border border-gray-800 flex items-center justify-center group-hover:border-[#41B349]/60 shadow-md transition-colors duration-300">
                    {isValuesImgDynamic ? (
                      <img src={valuesCard.icon} alt="Values" width={28} height={28} className="w-7 h-7 object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <Image src={valuesCard.icon} alt="Values" width={28} height={28} className="w-7 h-7 object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-[#41B349]/15 border border-[#41B349]/30 text-[#41B349] font-black text-xs uppercase tracking-wider">
                    01 • FOUNDATION
                  </span>
                </div>

                {/* Title */}
                <h4 
                  className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#41B349] transition-colors duration-200 mb-3" 
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  {valuesCard.title}
                </h4>

                <p className="text-[#94A3B8] text-sm leading-relaxed font-normal mb-6">
                  Guiding principles driving every client engagement, technical architecture, and digital partnership.
                </p>
              </div>

              {/* Value Items List Chips */}
              <div className="space-y-2.5 pt-4 border-t border-gray-800/80">
                {valuesCard.list.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#161922] border border-gray-800/90 text-white font-bold text-xs sm:text-sm group-hover:border-[#41B349]/40 hover:bg-[#41B349] hover:text-white transition-all duration-200"
                  >
                    <FaCheckCircle className="text-[#41B349] group-hover:text-white shrink-0 transition-colors duration-200" size={14} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CARD 2: OUR MISSION */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group relative bg-[#0D0F12] rounded-3xl p-7 sm:p-8 border border-gray-800 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_rgba(65,179,73,0.25)] hover:border-[#41B349]/70 transform hover:-translate-y-2.5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Glowing Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#41B349] to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div>
                {/* Header Icon Viewport & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#181B24] to-[#11131A] border border-gray-800 flex items-center justify-center group-hover:border-[#41B349]/60 shadow-md transition-colors duration-300">
                    {isMissionImgDynamic ? (
                      <img src={missionCard.icon} alt="Mission" width={28} height={28} className="w-7 h-7 object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <Image src={missionCard.icon} alt="Mission" width={28} height={28} className="w-7 h-7 object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-[#41B349]/15 border border-[#41B349]/30 text-[#41B349] font-black text-xs uppercase tracking-wider">
                    02 • PURPOSE
                  </span>
                </div>

                {/* Title */}
                <h4 
                  className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#41B349] transition-colors duration-200 mb-3" 
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  {missionCard.title}
                </h4>

                <p className="text-[#94A3B8] text-sm leading-relaxed font-normal mb-6">
                  Dedicated commitment to operational excellence, client growth, 24/7 support, and IT advisory.
                </p>
              </div>

              {/* Mission Items List Chips */}
              <div className="space-y-2.5 pt-4 border-t border-gray-800/80">
                {missionCard.list.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#161922] border border-gray-800/90 text-white font-bold text-xs sm:text-sm group-hover:border-[#41B349]/40 hover:bg-[#41B349] hover:text-white transition-all duration-200"
                  >
                    <FaCheckCircle className="text-[#41B349] group-hover:text-white shrink-0 transition-colors duration-200" size={14} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CARD 3: OUR GOALS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative bg-[#0D0F12] rounded-3xl p-7 sm:p-8 border border-gray-800 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_rgba(65,179,73,0.25)] hover:border-[#41B349]/70 transform hover:-translate-y-2.5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Glowing Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#41B349] to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div>
                {/* Header Icon Viewport & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#181B24] to-[#11131A] border border-gray-800 flex items-center justify-center group-hover:border-[#41B349]/60 shadow-md transition-colors duration-300">
                    {isGoalsImgDynamic ? (
                      <img src={goalsCard.icon} alt="Goals" width={28} height={28} className="w-7 h-7 object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <Image src={goalsCard.icon} alt="Goals" width={28} height={28} className="w-7 h-7 object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-[#41B349]/15 border border-[#41B349]/30 text-[#41B349] font-black text-xs uppercase tracking-wider">
                    03 • STRATEGY
                  </span>
                </div>

                {/* Title */}
                <h4 
                  className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#41B349] transition-colors duration-200 mb-3" 
                  style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                >
                  {goalsCard.title}
                </h4>

                <p className="text-[#94A3B8] text-sm leading-relaxed font-normal mb-6">
                  Delivering rapid response times, transparent cooperation, and efficiency across all projects.
                </p>
              </div>

              {/* Goals Items List Chips */}
              <div className="space-y-2.5 pt-4 border-t border-gray-800/80">
                {goalsCard.list.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#161922] border border-gray-800/90 text-white font-bold text-xs sm:text-sm group-hover:border-[#41B349]/40 hover:bg-[#41B349] hover:text-white transition-all duration-200"
                  >
                    <FaCheckCircle className="text-[#41B349] group-hover:text-white shrink-0 transition-colors duration-200" size={14} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default GoodServices;

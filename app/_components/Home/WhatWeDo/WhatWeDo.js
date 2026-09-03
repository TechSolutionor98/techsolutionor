"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCmsVal } from "@/lib/api-helper";

export const defaultWhatWeDo = {
  sectionTitle: "WHAT WE DO",
  cards: [
    {
      title: "Cooperative Expert Team",
      description:
        "Our cooperative team of experienced developers, designers, and digital strategists works closely to deliver custom technology solutions tailored to your business goals. By combining technical expertise with clear communication, we ensure smooth execution at every stage, from planning and development to testing and final deployment, for clients worldwide, including the UAE.",
    },
    {
      title: "Goals Achiever",
      description:
        "We turn ideas into measurable results. Our goal-focused approach is built on strategic planning, smart problem-solving, and continuous optimization. Whether it's web development, app development, or digital growth solutions, we set ambitious targets and consistently exceed them to help businesses scale faster and smarter.",
    },
    {
      title: "Business Grow",
      description:
        "We help businesses grow with innovative IT services and scalable digital solutions designed to improve efficiency, boost productivity, and increase revenue. Using modern technologies and industry best practices, we build future-ready systems that adapt to your evolving needs, trusted by startups and enterprises across the UAE and global markets.",
    },
  ],
};

const cardThemes = [
  {
    accent: "#41B349",
    border: "border-2 border-[#41B349]",
    shadow: "shadow-[0_20px_50px_rgba(65,179,73,0.22)]",
    titleColor: "text-[#41B349]",
    topBar: "via-[#41B349]",
    dotBg: "bg-[#41B349]",
    dotShadow: "shadow-[#41B349]/40",
  },
  {
    accent: "#F59E0B",
    border: "border-2 border-[#F59E0B]",
    shadow: "shadow-[0_20px_50px_rgba(245,158,11,0.22)]",
    titleColor: "text-[#F59E0B]",
    topBar: "via-[#F59E0B]",
    dotBg: "bg-[#F59E0B]",
    dotShadow: "shadow-[#F59E0B]/40",
  },
  {
    accent: "#0284C7",
    border: "border-2 border-[#0284C7]",
    shadow: "shadow-[0_20px_50px_rgba(2,132,199,0.22)]",
    titleColor: "text-[#0284C7]",
    topBar: "via-[#0284C7]",
    dotBg: "bg-[#0284C7]",
    dotShadow: "shadow-[#0284C7]/40",
  },
];

const WhatWeDo = ({ cmsContent }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionTitle = getCmsVal(cmsContent, defaultWhatWeDo.sectionTitle, "whatwedo");

  const cardsData = defaultWhatWeDo.cards.map((item) => {
    const icon = getCmsVal(cmsContent, item.icon, "whatwedo");
    const title = getCmsVal(cmsContent, item.title, "whatwedo");
    const description = getCmsVal(cmsContent, item.description, "whatwedo");
    return {
      icon,
      title,
      description,
    };
  });

  // Auto-play timer every 5 seconds with a constant hook dependency array
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeTheme = cardThemes[activeIndex % cardThemes.length];

  return (
    <section className="relative overflow-hidden py-16 md:py-24 select-none bg-[#FFFFFF]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/20 text-[#41B349] font-extrabold text-xs sm:text-sm uppercase tracking-widest mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
            <span>{sectionTitle}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0D0F12] tracking-tight leading-tight"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            Empowering Digital Growth & Tech Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-base sm:text-lg text-[#4A5568] font-medium"
          >
            Tailored digital strategies and cutting-edge engineering designed for scale.
          </motion.p>
        </div>

        {/* Stacked Card Deck Viewport with Fixed Identical Height */}
        <div className="relative max-w-3xl mx-auto h-[370px] sm:h-[330px] flex items-center justify-center px-2">
          {cardsData.map((item, i) => {
            const offset = (i - activeIndex + cardsData.length) % cardsData.length;
            const isTopCard = offset === 0;
            const theme = cardThemes[i % cardThemes.length];

            // Precise stack positioning & scaling for 100% equal card visibility
            const zIndex = 30 - offset * 10;
            const scale = 1 - offset * 0.045;
            const translateY = offset * 22;
            const opacity = isTopCard ? 1 : offset === 1 ? 0.95 : 0.82;

            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  scale,
                  y: translateY,
                  opacity,
                  zIndex,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 1, 0.5, 1], // Smooth, fluid cubic-bezier decelerate curve
                }}
                onClick={() => setActiveIndex(i)}
                className={`absolute w-full h-[310px] sm:h-[270px] rounded-3xl p-7 sm:p-9 flex flex-col justify-center transition-all duration-300 cursor-pointer overflow-hidden bg-white shadow-xl ${
                  isTopCard
                    ? `${theme.border} ${theme.shadow}`
                    : `${theme.border} border-opacity-90 shadow-md`
                }`}
              >
                {/* Top Ambient Highlight Accent Bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent ${theme.topBar} to-transparent ${
                    isTopCard ? "opacity-100" : "opacity-80"
                  }`}
                />

                <div className="flex flex-col justify-center h-full">
                  {/* Card Title */}
                  <h3
                    className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight ${theme.titleColor}`}
                    style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  {/* Card Description (Main Center Data) */}
                  <p className="mt-3.5 text-[#4A5568] text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stacked Deck Navigation Dots */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {cardsData.map((_, idx) => {
            const theme = cardThemes[idx % cardThemes.length];
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to card ${idx + 1}`}
                className={`h-3 rounded-full transition-all duration-500 cursor-pointer ${
                  activeIndex === idx
                    ? `w-10 ${theme.dotBg} shadow-sm ${theme.dotShadow}`
                    : "w-3 bg-gray-200 hover:bg-gray-400"
                }`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhatWeDo;

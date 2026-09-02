"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

// Technology Icons / Logos
import Laravel from '../../../../components/Images/Laravel.png';
import JavaScript from '../../../../components/Images/JavaScript.png';
import Reactjs from '../../../../components/Images/react2.png';
import Python from '../../../../components/Images/py2.png';
import Swift from '../../../../components/Images/swift2.png';
import PHP from '../../../../components/Images/php-1-1.png';

import { getCmsVal } from "@/lib/api-helper";

export const defaultTechnology = {
  sectionTitle: "Technology",
  titleTop: "Modern",
  titleBottom: "Technologies",
  description:
    "We leverage modern web and software development technologies to create high-performance digital solutions tailored to your business goals. Our technology-first approach ensures that every project is not only scalable, supporting long-term growth, but also secure, protecting critical data and systems. By optimizing for speed, performance, and user experience, we deliver seamless solutions that engage users and drive results. From dynamic front-end interfaces to robust back-end systems, we follow industry best practices and use proven frameworks to deliver future-ready web and application solutions trusted by businesses globally and across the UAE.",
  exploreButtonText: "Explore More",
  techs: [
    { title: "Laravel Framework", link: "/technologies/laravel", icon: Laravel },
    { title: "JavaScript Engineering", link: "/technologies/javascript", icon: JavaScript },
    { title: "React Development", link: "/technologies/react", icon: Reactjs },
    { title: "Python & AI Solutions", link: "/technologies/python", icon: Python },
    { title: "Swift iOS Apps", link: "/technologies/swift", icon: Swift },
    { title: "PHP Backend", link: "/technologies/php", icon: PHP },
  ],
};

const techImages = [Laravel, JavaScript, Reactjs, Python, Swift, PHP];

const splitTitle = (fullTitle) => {
  if (!fullTitle) return { line1: "", line2: "" };
  const str = String(fullTitle).trim();
  if (str.includes("\n")) {
    const lines = str.split("\n");
    return { line1: lines[0].trim(), line2: lines.slice(1).join(" ").trim() };
  }
  const parts = str.split(" ");
  if (parts.length <= 1) return { line1: str, line2: "" };
  const line2 = parts.pop();
  const line1 = parts.join(" ");
  return { line1, line2 };
};

const Technology = ({ cmsContent }) => {
  const sectionTitle = getCmsVal(cmsContent, defaultTechnology.sectionTitle, "technology");
  const titleTop = getCmsVal(cmsContent, defaultTechnology.titleTop, "technology");
  const titleBottom = getCmsVal(cmsContent, defaultTechnology.titleBottom, "technology");
  const description = getCmsVal(cmsContent, defaultTechnology.description, "technology");
  const exploreButtonText = getCmsVal(cmsContent, defaultTechnology.exploreButtonText, "technology");

  const cardsData = defaultTechnology.techs.map((defaultCard, index) => {
    const staticImage = techImages[index];
    const imageVal = getCmsVal(cmsContent, staticImage, "technology");
    const fullTitle = getCmsVal(cmsContent, defaultCard.title, "technology");
    const { line1: titleLine1, line2: titleLine2 } = splitTitle(fullTitle);

    return {
      image: imageVal,
      title: fullTitle,
      titleLine1,
      titleLine2,
      link: defaultCard.link || "/technologies",
    };
  });

  const marqueeCards = [...cardsData, ...cardsData, ...cardsData];

  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] py-16 md:py-24 select-none">
      <style jsx>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        .tech-marquee-track {
          animation: marqueeScroll 28s linear infinite;
        }
        .tech-marquee-track:hover {
          animation-play-state: paused !important;
        }
        @keyframes svgBorderLineTravel {
          0% {
            stroke-dashoffset: 1440;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }
        .tech-svg-border-line {
          stroke-dasharray: 240 1200;
          animation: svgBorderLineTravel 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/20 text-[#41B349] font-extrabold text-xs uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
            <span>{sectionTitle.toUpperCase()}</span>
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

      <div className="relative w-full overflow-hidden py-4">
        <div className="flex gap-6 sm:gap-8 w-max cursor-pointer tech-marquee-track">
          {marqueeCards.map((item, i) => {
            const isImgDynamic = typeof item.image === 'string' && (item.image.startsWith('http') || item.image.startsWith('/'));
            const cardConfigs = [
              {
                bgColor: "#EF7A35",
                hoverBg: "#D96520",
                borderAccent: "#FFFFFF",
                topAccent: "via-[#FFD0B3]",
                borderHover: "group-hover:border-white",
                titleColor: "text-white group-hover:text-[#FFF0E6]",
                badgeColor: "text-white font-extrabold",
                footerTextColor: "text-white font-extrabold group-hover:text-white",
                arrowClass: "bg-white/30 text-white group-hover:bg-white group-hover:text-[#D96520]",
                borderDivider: "border-white/60",
              },
              {
                bgColor: "#FFB904",
                hoverBg: "#E6A300",
                borderAccent: "#382600",
                topAccent: "via-[#FFF3C4]",
                borderHover: "group-hover:border-[#382600]",
                titleColor: "text-[#261A00] group-hover:text-black",
                badgeColor: "text-[#382600] font-extrabold",
                footerTextColor: "text-[#261A00] font-extrabold group-hover:text-black",
                arrowClass: "bg-black/20 text-[#261A00] group-hover:bg-[#261A00] group-hover:text-white",
                borderDivider: "border-black/50",
              },
              {
                bgColor: "#215A34",
                hoverBg: "#184527",
                borderAccent: "#6BE874",
                topAccent: "via-[#6BE874]",
                borderHover: "group-hover:border-[#6BE874]",
                titleColor: "text-white group-hover:text-[#88F293]",
                badgeColor: "text-white font-extrabold",
                footerTextColor: "text-white font-extrabold group-hover:text-[#88F293]",
                arrowClass: "bg-white/30 text-white group-hover:bg-[#6BE874] group-hover:text-[#184527]",
                borderDivider: "border-white/60",
              },
              {
                bgColor: "#0E0707",
                hoverBg: "#1E1212",
                borderAccent: "#FFFFFF",
                topAccent: "via-[#FFB3B3]",
                borderHover: "group-hover:border-white",
                titleColor: "text-white group-hover:text-[#FFE0E0]",
                badgeColor: "text-[#FFE7A8] font-extrabold",
                footerTextColor: "text-[#FFE7A8] font-extrabold group-hover:text-white",
                arrowClass: "bg-white/20 text-white group-hover:bg-white group-hover:text-[#0E0707]",
                borderDivider: "border-gray-700",
              },
              {
                bgColor: "#FFF0CF",
                hoverBg: "#FADB9D",
                borderAccent: "#D9961A",
                topAccent: "via-[#D9961A]",
                borderHover: "group-hover:border-[#D9961A]",
                titleColor: "text-[#3D2800] group-hover:text-[#1F1400]",
                badgeColor: "text-[#593900] font-extrabold",
                footerTextColor: "text-[#3D2800] font-extrabold group-hover:text-[#1F1400]",
                arrowClass: "bg-black/20 text-[#3D2800] group-hover:bg-[#593900] group-hover:text-white",
                borderDivider: "border-black/50",
              },
            ];

            const cfg = cardConfigs[i % cardConfigs.length];

            return (
              <Link key={i} href={item.link} className="block group shrink-0">
                <div 
                  className={`w-[280px] sm:w-[320px] md:w-[350px] h-[400px] sm:h-[430px] rounded-3xl border border-transparent p-6 sm:p-7 flex flex-col justify-between transform group-hover:-translate-y-2.5 transition-all duration-300 relative overflow-hidden shadow-md ${cfg.borderHover}`}
                  style={{ backgroundColor: cfg.bgColor }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = cfg.hoverBg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = cfg.bgColor; }}
                >
                  {/* SVG Corner-to-Corner Perimeter Border Line on Hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 p-[1px]">
                    <svg className="w-full h-full overflow-visible">
                      <rect
                        x="1"
                        y="1"
                        width="99%"
                        height="99%"
                        rx="22"
                        fill="none"
                        stroke={cfg.borderAccent}
                        strokeWidth="2.5"
                        className="tech-svg-border-line"
                      />
                    </svg>
                  </div>

                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent ${cfg.topAccent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <h3 
                      className={`text-xl sm:text-2xl font-black leading-tight tracking-tight transition-colors duration-200 ${cfg.titleColor}`}
                      style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                    >
                      <span>{item.titleLine1}</span>
                      {item.titleLine2 && <span className="block mt-0.5">{item.titleLine2}</span>}
                    </h3>
                  </div>

                  <div className="my-3 sm:my-4 w-full h-[180px] sm:h-[200px] flex items-center justify-center p-3 sm:p-4 relative z-10">
                    {isImgDynamic ? (
                      <img
                        alt={item.title}
                        src={item.image}
                        width={150}
                        height={150}
                        className="w-28 h-28 sm:w-36 sm:h-36 max-h-[145px] object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <Image
                        alt={item.title}
                        src={item.image}
                        width={150}
                        height={150}
                        className="w-28 h-28 sm:w-36 sm:h-36 max-h-[145px] object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>

                  <div className={`flex items-center justify-between pt-3 border-t ${cfg.borderDivider} relative z-10`}>
                    <span className={`text-xs font-extrabold uppercase tracking-wider transition-colors duration-200 ${cfg.footerTextColor}`}>
                      Explore Tech
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${cfg.arrowClass}`}>
                      <FaArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Technology;

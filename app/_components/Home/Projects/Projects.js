"use client";

import React, { useState } from "react";
import Image from "next/image";
import Eclipse from '../../../../components/Images/eclipse.png';
import Grab from '../../../../components/Images/grab.png';
import Protein from '../../../../components/Images/protein.png';
import Clickpos from '../../../../components/Images/clickpos.png';
import Almatoh from '../../../../components/Images/almatoh.png';
import Traders from '../../../../components/Images/traders.png';
import Super from '../../../../components/Images/super.png';
import Craters from '../../../../components/Images/crafters.png';
import Amer from '../../../../components/Images/amer.png';
import Gentsslone from '../../../../components/Images/gentsslone.png';
import Exports from '../../../../components/Images/exports.png';
import Albasit from '../../../../components/Images/albasit.png';
import Crown from '../../../../components/Images/crownexcel.png';
import Clickslice from '../../../../components/Images/clickslice.png';
import Muzammil from '../../../../components/Images/muzammil.png';
import Appliances from '../../../../components/Images/appliances.png';
import Smart from '../../../../components/Images/smart.png';
import Mubayya from '../../../../components/Images/mubayya.png';
import Aljannah from '../../../../components/Images/aljannah.png';

import { getCmsVal } from "@/lib/api-helper";

export const defaultProjects = {
  title: "Projects & Results",
  description:
    "At TechSolutionor, we focus on delivering real, measurable outcomes for businesses worldwide. We recently enhanced a client's data analysis capabilities, achieving a 30% increase in operational efficiency. In another project, we implemented an AI-powered customer support system, which reduced response times by 40% and significantly improved customer satisfaction. Our project-driven approach ensures that every solution we deliver not only meets client expectations but also provides long-term scalability, efficiency, and value, making us a trusted technology partner for businesses across the UAE and global markets.",
};

const icons = [
  { Image: Grab, name: "Grabatoz", category: "E-Commerce & Tech Retail" },
  { Image: Protein, name: "Baytal Protein", category: "Sports Nutrition & Health" },
  { Image: Clickpos, name: "Clix POS", category: "Cloud Point of Sale Software" },
  { Image: Almatoh, name: "Al Matoh", category: "Wholesale & Trading" },
  { Image: Traders, name: "Osum Enterprises", category: "Industrial & Spare Parts" },
  { Image: Super, name: "Super Tech", category: "Retail & Electronics" },
  { Image: Craters, name: "SERP Crafters", category: "SEO & Growth Agency" },
  { Image: Amer, name: "Amer Center", category: "Government Services" },
  { Image: Gentsslone, name: "Gents Saloon", category: "Salon & Grooming" },
  { Image: Exports, name: "Global Exports", category: "Import & Export Trading" },
  { Image: Albasit, name: "Al Basit Group", category: "Real Estate & Construction" },
  { Image: Crown, name: "Crown Excel", category: "IT Hardware & Wholesale" },
  { Image: Clickslice, name: "ClickSlice", category: "SEO & Digital Agency" },
  { Image: Muzammil, name: "Muzammil Center", category: "Corporate & Business Services" },
  { Image: Appliances, name: "Just Appliances", category: "Home Appliance Repair" },
  { Image: Smart, name: "Smart Max IT", category: "Enterprise IT Infrastructure" },
  { Image: Mubayya, name: "Mubayaa Real Estate", category: "Property Registration Trustee" },
  { Image: Aljannah, name: "Rawdat Al Jannah", category: "Retail & Consumer Goods" },
];

const Projects = ({ cmsContent }) => {
  const [row1Paused, setRow1Paused] = useState(false);
  const [row2Paused, setRow2Paused] = useState(false);

  const title = getCmsVal(cmsContent, defaultProjects.title, "projects");
  const description = getCmsVal(cmsContent, defaultProjects.description, "projects");

  const logos = icons.map((icon) => {
    const dynamicImage = getCmsVal(cmsContent, icon.Image, "projects");
    return {
      ...icon,
      imageUrl: dynamicImage,
    };
  });

  const row1Logos = logos.slice(0, 9);
  const row2Logos = logos.slice(9);

  // Duplicate arrays for 100% seamless marquee looping
  const marqueeRow1 = [...row1Logos, ...row1Logos, ...row1Logos];
  const marqueeRow2 = [...row2Logos, ...row2Logos, ...row2Logos];

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-[#000000] select-none">
      {/* Embedded Styles for smooth infinite marquee with row-level hover pause */}
      <style>{`
        @keyframes marquee-forward {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-33.3333%); }
          100% { transform: translateX(0%); }
        }
        .marquee-track-1 {
          animation: marquee-forward 34s linear infinite;
        }
        .marquee-track-2 {
          animation: marquee-reverse 38s linear infinite;
        }
        .marquee-track-1:has(.logo-card:hover) {
          animation-play-state: paused !important;
        }
        .marquee-track-2:has(.logo-card:hover) {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#41B349]/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#41B349]/15 border border-[#41B349]/30 text-[#41B349] font-extrabold text-xs uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
            <span>PROVEN IMPACT & CLIENT SUCCESS</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {title}
          </h2>

          <p className="mt-4 text-gray-300 text-base sm:text-lg leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>

      {/* Dual-Row Smooth Infinite Auto-Moving Marquee Track */}
      <div className="relative w-full space-y-6 sm:space-y-8 py-4 overflow-hidden">

        {/* MARQUEE ROW 1: Forward Motion (Left) */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-6 sm:gap-8 w-max marquee-track-1 will-change-transform"
            style={{ animationPlayState: row1Paused ? 'paused' : 'running' }}
          >
            {marqueeRow1.map((icon, idx) => {
              const isImgDynamic = typeof icon.imageUrl === 'string' && (icon.imageUrl.startsWith('http') || icon.imageUrl.startsWith('/'));
              return (
                <div
                  key={`r1-${idx}`}
                  onMouseEnter={() => setRow1Paused(true)}
                  onMouseLeave={() => setRow1Paused(false)}
                  className="logo-card group w-60 sm:w-68 md:w-72 h-[224px] sm:h-[248px] shrink-0 bg-white border border-gray-100/90 rounded-2xl flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:border-[#41B349]/70 hover:shadow-[0_14px_30px_rgba(65,179,73,0.18)] hover:scale-[1.015] transition-all duration-300 cursor-pointer overflow-hidden select-none"
                >
                  {/* Top: Project / Company Logo */}
                  <div className="relative w-full h-[145px] sm:h-[162px] p-4 sm:p-5 flex items-center justify-center bg-white">
                    <div className="relative w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.01]">
                      {isImgDynamic ? (
                        <img
                          src={icon.imageUrl}
                          alt={icon.name}
                          className="w-full h-full object-contain filter drop-shadow-xs"
                        />
                      ) : (
                        <Image
                          src={icon.Image}
                          alt={icon.name}
                          fill
                          sizes="(max-width: 640px) 240px, 288px"
                          className="object-contain filter drop-shadow-xs"
                        />
                      )}
                    </div>
                  </div>

                  {/* Subtle Divider Line */}
                  <div className="w-full h-[1px] bg-gray-100 group-hover:bg-[#41B349]/25 transition-colors" />

                  {/* Bottom: Project / Company Name & Category */}
                  <div className="w-full py-3 sm:py-3.5 px-4 bg-gray-50/90 group-hover:bg-[#41B349]/5 transition-colors flex flex-col items-center justify-center text-center">
                    <h3
                      className="text-[#0D0F12] font-bold text-sm sm:text-base tracking-tight group-hover:text-[#41B349] transition-colors truncate w-full"
                      style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                    >
                      {icon.name}
                    </h3>
                    <span className="text-[11px] sm:text-xs text-gray-500 font-medium truncate w-full mt-0.5">
                      {icon.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MARQUEE ROW 2: Reverse Motion (Right) */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-6 sm:gap-8 w-max marquee-track-2 will-change-transform"
            style={{ animationPlayState: row2Paused ? 'paused' : 'running' }}
          >
            {marqueeRow2.map((icon, idx) => {
              const isImgDynamic = typeof icon.imageUrl === 'string' && (icon.imageUrl.startsWith('http') || icon.imageUrl.startsWith('/'));
              return (
                <div
                  key={`r2-${idx}`}
                  onMouseEnter={() => setRow2Paused(true)}
                  onMouseLeave={() => setRow2Paused(false)}
                  className="logo-card group w-60 sm:w-68 md:w-72 h-[224px] sm:h-[248px] shrink-0 bg-white border border-gray-100/90 rounded-2xl flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:border-[#41B349]/70 hover:shadow-[0_14px_30px_rgba(65,179,73,0.18)] hover:scale-[1.015] transition-all duration-300 cursor-pointer overflow-hidden select-none"
                >
                  {/* Top: Project / Company Logo */}
                  <div className="relative w-full h-[145px] sm:h-[162px] p-4 sm:p-5 flex items-center justify-center bg-white">
                    <div className="relative w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.01]">
                      {isImgDynamic ? (
                        <img
                          src={icon.imageUrl}
                          alt={icon.name}
                          className="w-full h-full object-contain filter drop-shadow-xs"
                        />
                      ) : (
                        <Image
                          src={icon.Image}
                          alt={icon.name}
                          fill
                          sizes="(max-width: 640px) 240px, 288px"
                          className="object-contain filter drop-shadow-xs"
                        />
                      )}
                    </div>
                  </div>

                  {/* Subtle Divider Line */}
                  <div className="w-full h-[1px] bg-gray-100 group-hover:bg-[#41B349]/25 transition-colors" />

                  {/* Bottom: Project / Company Name & Category */}
                  <div className="w-full py-3 sm:py-3.5 px-4 bg-gray-50/90 group-hover:bg-[#41B349]/5 transition-colors flex flex-col items-center justify-center text-center">
                    <h3
                      className="text-[#0D0F12] font-bold text-sm sm:text-base tracking-tight group-hover:text-[#41B349] transition-colors truncate w-full"
                      style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                    >
                      {icon.name}
                    </h3>
                    <span className="text-[11px] sm:text-xs text-gray-500 font-medium truncate w-full mt-0.5">
                      {icon.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;

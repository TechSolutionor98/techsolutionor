"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Eclipse from '../../../../components/Images/eclipse.png';
import Grab from '../../../../components/Images/grab.png';
import Protein from '../../../../components/Images/protein.png';
import Clickpos from '../../../../components/Images/clickpos.png';
import Almatoh from '../../../../components/Images/almatoh.png';
import Traders from '../../../../components/Images/traders.png';
import Super from '../../../../components/Images/super.png';
import Craters from '../../../../components/Images/crafters.png';
import Amer from '../../../../components/Images/amer.png';
import Saloon from '../../../../components/Images/saloon.png';
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
  { Image: Grab, width: 223, height: 223 },
  { Image: Protein, width: 223, height: 223 },
  { Image: Clickpos, width: 223, height: 223 },
  { Image: Almatoh, width: 133, height: 114 },
  { Image: Traders, width: 194, height: 194 },
  { Image: Super, width: 115, height: 131 },
  { Image: Craters, width: 223, height: 84 },
  { Image: Amer, width: 172, height: 90 },
  { Image: Saloon, width: 201, height: 136 },
  { Image: Exports, width: 115, height: 129 },
  { Image: Albasit, width: 190, height: 190 },
  { Image: Crown, width: 172, height: 72 },
  { Image: Clickslice, width: 198, height: 41 },
  { Image: Muzammil, width: 190, height: 64 },
  { Image: Appliances, width: 227, height: 64 },
  { Image: Smart, width: 230, height: 44 },
  { Image: Mubayya, width: 212, height: 60 },
  { Image: Aljannah, width: 313, height: 167 },
];

const Projects = ({ cmsContent }) => {
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
      <div className="relative w-full space-y-6 py-4 overflow-hidden">

        {/* MARQUEE ROW 1: Forward Motion (Left) */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-5 sm:gap-7 w-max cursor-grab active:cursor-grabbing"
            animate={{ x: ["0%", "-33.3333%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 34,
              ease: "linear",
            }}
          >
            {marqueeRow1.map((icon, idx) => {
              const isImgDynamic = typeof icon.imageUrl === 'string' && (icon.imageUrl.startsWith('http') || icon.imageUrl.startsWith('/'));
              return (
                <div
                  key={`r1-${idx}`}
                  className="w-56 h-28 sm:w-64 sm:h-32 shrink-0 bg-white border border-gray-100/90 rounded-2xl p-6 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:border-[#41B349]/60 hover:shadow-[0_15px_40px_rgba(65,179,73,0.3)] transition-all duration-300 group"
                >
                  {isImgDynamic ? (
                    <img
                      src={icon.imageUrl}
                      alt={`Client Logo ${idx + 1}`}
                      className="max-h-16 sm:max-h-20 max-w-[85%] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={icon.Image}
                      alt={`Client Logo ${idx + 1}`}
                      width={icon.width}
                      height={icon.height}
                      className="max-h-16 sm:max-h-20 max-w-[85%] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* MARQUEE ROW 2: Reverse Motion (Right) */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-5 sm:gap-7 w-max cursor-grab active:cursor-grabbing"
            animate={{ x: ["-33.3333%", "0%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 38,
              ease: "linear",
            }}
          >
            {marqueeRow2.map((icon, idx) => {
              const isImgDynamic = typeof icon.imageUrl === 'string' && (icon.imageUrl.startsWith('http') || icon.imageUrl.startsWith('/'));
              return (
                <div
                  key={`r2-${idx}`}
                  className="w-56 h-28 sm:w-64 sm:h-32 shrink-0 bg-white border border-gray-100/90 rounded-2xl p-6 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:border-[#41B349]/60 hover:shadow-[0_15px_40px_rgba(65,179,73,0.3)] transition-all duration-300 group"
                >
                  {isImgDynamic ? (
                    <img
                      src={icon.imageUrl}
                      alt={`Client Logo ${idx + 1}`}
                      className="max-h-16 sm:max-h-20 max-w-[85%] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={icon.Image}
                      alt={`Client Logo ${idx + 1}`}
                      width={icon.width}
                      height={icon.height}
                      className="max-h-16 sm:max-h-20 max-w-[85%] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Projects;

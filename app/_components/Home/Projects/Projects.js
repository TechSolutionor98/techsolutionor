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
  {
    Image: Grab,
    name: "Grabatoz",
    category: "E-Commerce & Tech Retail",
    cardBg: "linear-gradient(160deg, #F6FEDE 0%, #E6F9BE 50%, #D4F49B 100%)",
    footerBg: "rgba(214, 246, 155, 0.45)",
    border: "#BEEA7A",
    hoverBorder: "#65A30D",
    hoverShadow: "rgba(101, 163, 13, 0.35)",
    accentColor: "#4D7C0F",
  },
  {
    Image: Protein,
    name: "Baytal Protein",
    category: "Sports Nutrition & Health",
    cardBg: "linear-gradient(160deg, #EFF8FF 0%, #D8ECFE 50%, #B9DCFE 100%)",
    footerBg: "rgba(185, 220, 254, 0.45)",
    border: "#93C5FD",
    hoverBorder: "#2563EB",
    hoverShadow: "rgba(37, 99, 235, 0.35)",
    accentColor: "#1D4ED8",
  },
  {
    Image: Clickpos,
    name: "Clix POS",
    category: "Cloud Point of Sale Software",
    cardBg: "linear-gradient(160deg, #EEF4FF 0%, #D9E6FF 50%, #BED4FE 100%)",
    footerBg: "rgba(190, 212, 254, 0.45)",
    border: "#9BBDF9",
    hoverBorder: "#1D4ED8",
    hoverShadow: "rgba(29, 78, 216, 0.35)",
    accentColor: "#1E40AF",
  },
  {
    Image: Almatoh,
    name: "Al Matoh",
    category: "Wholesale & Trading",
    cardBg: "linear-gradient(160deg, #FFFDF0 0%, #FEF5C8 50%, #FDECA0 100%)",
    footerBg: "rgba(253, 236, 160, 0.45)",
    border: "#FCD34D",
    hoverBorder: "#D97706",
    hoverShadow: "rgba(217, 119, 6, 0.35)",
    accentColor: "#B45309",
  },
  {
    Image: Traders,
    name: "Osum Enterprises",
    category: "Industrial & Spare Parts",
    cardBg: "linear-gradient(160deg, #F0FDFB 0%, #D3F8F2 50%, #B1F0E6 100%)",
    footerBg: "rgba(177, 240, 230, 0.45)",
    border: "#80E5D5",
    hoverBorder: "#0D9488",
    hoverShadow: "rgba(13, 148, 136, 0.35)",
    accentColor: "#0F766E",
  },
  {
    Image: Super,
    name: "Super Tech",
    category: "Retail & Electronics",
    cardBg: "linear-gradient(160deg, #EDFAF1 0%, #D0F4DC 50%, #AEECC2 100%)",
    footerBg: "rgba(174, 236, 194, 0.45)",
    border: "#7FE0A3",
    hoverBorder: "#047857",
    hoverShadow: "rgba(4, 120, 87, 0.35)",
    accentColor: "#047857",
  },
  {
    Image: Craters,
    name: "SERP Crafters",
    category: "SEO & Growth Agency",
    cardBg: "linear-gradient(160deg, #F0F9FF 0%, #DBF0FE 50%, #BEE3FC 100%)",
    footerBg: "rgba(190, 227, 252, 0.45)",
    border: "#7DD3FC",
    hoverBorder: "#0284C7",
    hoverShadow: "rgba(2, 132, 199, 0.35)",
    accentColor: "#0369A1",
  },
  {
    Image: Amer,
    name: "Amer Center",
    category: "Government Services",
    cardBg: "linear-gradient(160deg, #FFF1F2 0%, #FFE0E3 50%, #FEC5CB 100%)",
    footerBg: "rgba(254, 197, 203, 0.45)",
    border: "#FDA4AF",
    hoverBorder: "#E11D48",
    hoverShadow: "rgba(225, 29, 72, 0.35)",
    accentColor: "#BE123C",
  },
  {
    Image: Gentsslone,
    name: "Gents Saloon",
    category: "Salon & Grooming",
    cardBg: "linear-gradient(160deg, #FAF5FF 0%, #F2E3FE 50%, #E5CBFD 100%)",
    footerBg: "rgba(229, 203, 253, 0.45)",
    border: "#D8B4FE",
    hoverBorder: "#9333EA",
    hoverShadow: "rgba(147, 51, 234, 0.35)",
    accentColor: "#7E22CE",
  },
  {
    Image: Exports,
    name: "Global Exports",
    category: "Import & Export Trading",
    cardBg: "linear-gradient(160deg, #F8FAFC 0%, #E6EDF5 50%, #CCD9E8 100%)",
    footerBg: "rgba(204, 217, 232, 0.45)",
    border: "#B0C4DE",
    hoverBorder: "#334155",
    hoverShadow: "rgba(51, 65, 85, 0.35)",
    accentColor: "#1E293B",
  },
  {
    Image: Albasit,
    name: "Al Basit Group",
    category: "Real Estate & Construction",
    cardBg: "linear-gradient(160deg, #FFFDF0 0%, #FEF8D0 50%, #FDEF9E 100%)",
    footerBg: "rgba(253, 239, 158, 0.45)",
    border: "#FDE047",
    hoverBorder: "#CA8A04",
    hoverShadow: "rgba(202, 138, 4, 0.35)",
    accentColor: "#A16207",
  },
  {
    Image: Crown,
    name: "Crown Excel",
    category: "IT Hardware & Wholesale",
    cardBg: "linear-gradient(160deg, #F0FDF8 0%, #D4F6E7 50%, #B2EED1 100%)",
    footerBg: "rgba(178, 238, 209, 0.45)",
    border: "#7FE0B4",
    hoverBorder: "#0E583F",
    hoverShadow: "rgba(14, 88, 63, 0.35)",
    accentColor: "#0E583F",
  },
  {
    Image: Clickslice,
    name: "ClickSlice",
    category: "SEO & Digital Agency",
    cardBg: "linear-gradient(160deg, #F0F8FF 0%, #D6EDFE 50%, #B4DCFE 100%)",
    footerBg: "rgba(180, 220, 254, 0.45)",
    border: "#85C3FD",
    hoverBorder: "#0284C7",
    hoverShadow: "rgba(2, 132, 199, 0.35)",
    accentColor: "#0369A1",
  },
  {
    Image: Muzammil,
    name: "Muzammil Center",
    category: "Corporate & Business Services",
    cardBg: "linear-gradient(160deg, #F8FEEA 0%, #ECFBC9 50%, #DCF79F 100%)",
    footerBg: "rgba(220, 247, 159, 0.45)",
    border: "#BEF264",
    hoverBorder: "#65A30D",
    hoverShadow: "rgba(101, 163, 13, 0.35)",
    accentColor: "#4D7C0F",
  },
  {
    Image: Appliances,
    name: "Just Appliances",
    category: "Home Appliance Repair",
    cardBg: "linear-gradient(160deg, #FFF5F5 0%, #FEE2E2 50%, #FEC7C7 100%)",
    footerBg: "rgba(254, 199, 199, 0.45)",
    border: "#FCA5A5",
    hoverBorder: "#DC2626",
    hoverShadow: "rgba(220, 38, 38, 0.35)",
    accentColor: "#B91C1C",
  },
  {
    Image: Smart,
    name: "Smart Max IT",
    category: "Enterprise IT Infrastructure",
    cardBg: "linear-gradient(160deg, #FFF1F4 0%, #FFE2E7 50%, #FEC6D1 100%)",
    footerBg: "rgba(254, 198, 209, 0.45)",
    border: "#FDA4AF",
    hoverBorder: "#E11D48",
    hoverShadow: "rgba(225, 29, 72, 0.35)",
    accentColor: "#BE123C",
  },
  {
    Image: Mubayya,
    name: "Mubayaa Real Estate",
    category: "Property Registration Trustee",
    cardBg: "linear-gradient(160deg, #F0F9FF 0%, #D9F0FD 50%, #B9E2FC 100%)",
    footerBg: "rgba(185, 226, 252, 0.45)",
    border: "#7DD3FC",
    hoverBorder: "#0284C7",
    hoverShadow: "rgba(2, 132, 199, 0.35)",
    accentColor: "#0369A1",
  },
  {
    Image: Aljannah,
    name: "Rawdat Al Jannah",
    category: "Retail & Consumer Goods",
    cardBg: "linear-gradient(160deg, #FFFDF2 0%, #FEF6CC 50%, #FDEEA3 100%)",
    footerBg: "rgba(253, 238, 163, 0.45)",
    border: "#FCD34D",
    hoverBorder: "#D97706",
    hoverShadow: "rgba(217, 119, 6, 0.35)",
    accentColor: "#92400E",
  },
];

const LogoCard = ({ icon, cardKey, onMouseEnter, onMouseLeave }) => {
  const isImgDynamic = typeof icon.imageUrl === 'string' && (icon.imageUrl.startsWith('http') || icon.imageUrl.startsWith('/'));

  return (
    <div
      key={cardKey}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        '--card-bg': icon.cardBg,
        '--card-border': icon.border,
        '--card-hover-border': icon.hoverBorder,
        '--card-hover-shadow': icon.hoverShadow,
        '--card-accent': icon.accentColor,
        '--card-footer-bg': icon.footerBg,
      }}
      className="logo-card group w-52 min-[380px]:w-56 sm:w-68 md:w-72 h-[200px] min-[380px]:h-[215px] sm:h-[250px] shrink-0 rounded-2xl flex flex-col justify-between cursor-pointer overflow-hidden select-none"
    >
      {/* Top: Project / Company Logo Area */}
      <div className="relative w-full h-[125px] min-[380px]:h-[135px] sm:h-[164px] p-3 min-[380px]:p-4 sm:p-5 flex items-center justify-center">
        <div className="relative z-1 w-full h-full flex items-center justify-center">
          {isImgDynamic ? (
            <img
              src={icon.imageUrl}
              alt={icon.name}
              style={{ mixBlendMode: 'multiply' }}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <Image
              src={icon.Image}
              alt={icon.name}
              fill
              sizes="(max-width: 640px) 220px, 288px"
              style={{ mixBlendMode: 'multiply' }}
              className="object-contain p-2"
            />
          )}
        </div>
      </div>

      {/* Subtle Divider Line */}
      <div
        className="w-full h-[1px] transition-colors duration-300"
        style={{ background: 'var(--card-border)' }}
      />

      {/* Bottom: Project / Company Name & Category */}
      <div
        className="w-full py-2.5 min-[380px]:py-3 sm:py-3.5 px-3 min-[380px]:px-4 transition-colors duration-300 flex flex-col items-center justify-center text-center"
        style={{
          background: 'var(--card-footer-bg)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <h3
          className="logo-title text-[#0F172A] font-bold text-xs min-[380px]:text-sm sm:text-base tracking-tight transition-colors duration-300 truncate w-full"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          {icon.name}
        </h3>
        <span
          className="text-[10px] min-[380px]:text-[11px] sm:text-xs font-semibold truncate w-full mt-0.5 tracking-wide"
          style={{ color: 'var(--card-accent)' }}
        >
          {icon.category}
        </span>
      </div>
    </div>
  );
};

const Projects = ({ cmsContent }) => {
  const [row1Paused, setRow1Paused] = useState(false);
  const [row2Paused, setRow2Paused] = useState(false);

  const title = getCmsVal(cmsContent, defaultProjects.title, "projects");
  const description = getCmsVal(cmsContent, defaultProjects.description, "projects");

  const logos = icons.map((icon) => {
    let dynamicImage = getCmsVal(cmsContent, icon.Image, "projects");
    if (typeof dynamicImage === 'string' && dynamicImage.includes('res.cloudinary.com') && dynamicImage.includes('/image/upload/')) {
      if (!dynamicImage.includes('e_make_transparent')) {
        dynamicImage = dynamicImage.replace('/image/upload/', '/image/upload/e_make_transparent/');
      }
    }
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
        .logo-card {
          background: var(--card-bg);
          border: 1.5px solid var(--card-border);
          box-shadow: none !important;
          transform: none !important;
          transition: border-color 0.25s ease;
        }
        .logo-card:hover {
          border-color: var(--card-hover-border) !important;
          box-shadow: none !important;
          transform: none !important;
        }
        .logo-card:hover .logo-title {
          color: var(--card-accent) !important;
        }
      `}</style>

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#41B349]/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#41B349]/15 border border-[#41B349]/30 text-[#41B349] font-extrabold text-xs uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
            <span>PROVEN IMPACT & CLIENT SUCCESS</span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {title}
          </h2>

          <p className="mt-3 sm:mt-4 text-gray-300 text-xs min-[360px]:text-sm sm:text-base md:text-lg leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>

      {/* Dual-Row Smooth Infinite Auto-Moving Marquee Track */}
      <div className="relative w-full space-y-4 sm:space-y-6 md:space-y-8 py-3 sm:py-4 overflow-hidden">

        {/* MARQUEE ROW 1: Forward Motion (Left) */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-3 sm:gap-6 md:gap-8 w-max marquee-track-1 will-change-transform"
            style={{ animationPlayState: row1Paused ? 'paused' : 'running' }}
          >
            {marqueeRow1.map((icon, idx) => (
              <LogoCard
                key={`r1-${idx}`}
                icon={icon}
                cardKey={`r1-${idx}`}
                onMouseEnter={() => setRow1Paused(true)}
                onMouseLeave={() => setRow1Paused(false)}
              />
            ))}
          </div>
        </div>

        {/* MARQUEE ROW 2: Reverse Motion (Right) */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-3 sm:gap-6 md:gap-8 w-max marquee-track-2 will-change-transform"
            style={{ animationPlayState: row2Paused ? 'paused' : 'running' }}
          >
            {marqueeRow2.map((icon, idx) => (
              <LogoCard
                key={`r2-${idx}`}
                icon={icon}
                cardKey={`r2-${idx}`}
                onMouseEnter={() => setRow2Paused(true)}
                onMouseLeave={() => setRow2Paused(false)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;

"use client";

import React, { useState } from "react";
import Image from "next/image";

// Client Project Logos (Baseline Fallback Assets)
import Grab from "../../../../components/Images/grab.png";
import Protein from "../../../../components/Images/protein.png";
import Clickpos from "../../../../components/Images/clickpos.png";
import Almatoh from "../../../../components/Images/almatoh.png";
import Traders from "../../../../components/Images/traders.png";
import Super from "../../../../components/Images/super.png";
import Craters from "../../../../components/Images/crafters.png";
import Amer from "../../../../components/Images/amer.png";
import Gentsslone from "../../../../components/Images/gentsslone.png";
import Exports from "../../../../components/Images/exports.png";
import Albasit from "../../../../components/Images/albasit.png";
import Crown from "../../../../components/Images/crownexcel.png";
import Clickslice from "../../../../components/Images/clickslice.png";
import Muzammil from "../../../../components/Images/muzammil.png";
import Appliances from "../../../../components/Images/appliances.png";
import Smart from "../../../../components/Images/smart.png";
import Mubayya from "../../../../components/Images/mubayya.png";
import Aljannah from "../../../../components/Images/aljannah.png";

import { getCmsVal } from "@/lib/api-helper";
import {
  SectionBadge,
  SectionHeading,
  HighlightWord,
  SectionParagraph,
} from "@/components/Typography";

export const defaultProjects = {
  title: "Projects & Results",
  description:
    "At TechSolutionor, we focus on delivering real, measurable outcomes for businesses worldwide. We recently enhanced a client's data analysis capabilities, achieving a 30% increase in operational efficiency. In another project, we implemented an AI-powered customer support system, which reduced response times by 40% and significantly improved customer satisfaction. Our project-driven approach ensures that every solution we deliver not only meets client expectations but also provides long-term scalability, efficiency, and value, making us a trusted technology partner for businesses across the UAE and global markets.",
};

// Default Client Project Logos (Source of truth is the CMS Admin Panel)
const icons = [
  {
    Image: Grab,
    varName: "Grab",
    name: "Grabatoz",
    category: "E-Commerce & Tech Retail",
  },
  {
    Image: Protein,
    varName: "Protein",
    name: "Baytal Protein",
    category: "Sports Nutrition & Health",
  },
  {
    Image: Clickpos,
    varName: "Clickpos",
    name: "Clix POS",
    category: "Cloud Point of Sale Software",
  },
  {
    Image: Almatoh,
    varName: "Almatoh",
    name: "Al Matoh",
    category: "Wholesale & Trading",
    scaleClass: "scale-105",
  },
  {
    Image: Traders,
    varName: "Traders",
    name: "Osum Enterprises",
    category: "Industrial & Spare Parts",
    scaleClass: "scale-105",
  },
  {
    Image: Super,
    varName: "Super",
    name: "Super Tech",
    category: "Retail & Electronics",
    scaleClass: "scale-105",
  },
  {
    Image: Craters,
    varName: "Craters",
    name: "SERP Crafters",
    category: "SEO & Growth Agency",
  },
  {
    Image: Amer,
    varName: "Amer",
    name: "Amer Center",
    category: "Government Services",
  },
  {
    Image: Gentsslone,
    varName: "Gentsslone",
    name: "Gents Saloon",
    category: "Salon & Grooming",
  },
  {
    Image: Exports,
    varName: "Exports",
    name: "Global Exports",
    category: "Import & Export Trading",
  },
  {
    Image: Albasit,
    varName: "Albasit",
    name: "Al Basit Group",
    category: "Real Estate & Construction",
  },
  {
    Image: Crown,
    varName: "Crown",
    name: "Crown Excel",
    category: "IT Hardware & Wholesale",
  },
  {
    Image: Clickslice,
    varName: "Clickslice",
    name: "ClickSlice",
    category: "SEO & Digital Agency",
  },
  {
    Image: Muzammil,
    varName: "Muzammil",
    name: "Muzammil Center",
    category: "Corporate & Business Services",
  },
  {
    Image: Appliances,
    varName: "Appliances",
    name: "Just Appliances",
    category: "Home Appliance Repair",
  },
  {
    Image: Smart,
    varName: "Smart",
    name: "Smart Max IT",
    category: "Enterprise IT Infrastructure",
  },
  {
    Image: Mubayya,
    varName: "Mubayya",
    name: "Mubayya Real Estate",
    category: "Property Registration Trustee",
  },
  {
    Image: Aljannah,
    varName: "Aljannah",
    name: "Rawdat Al Jannah",
    category: "Retail & Consumer Goods",
    scaleClass: "scale-[1.24]",
  },
];

const Projects = ({ content, cmsContent }) => {
  const [isBarPaused, setIsBarPaused] = useState(false);

  // 1. Dynamic Section Heading & Description from CMS
  const title = getCmsVal(
    cmsContent,
    content?.title || defaultProjects.title,
    "projects"
  );
  const description = getCmsVal(
    cmsContent,
    content?.description || defaultProjects.description,
    "projects"
  );

  // 2. Locate the 'projects' section from CMS
  const projSection = Array.isArray(cmsContent?.sections)
    ? cmsContent.sections.find(
        (s) =>
          (s.sectionId || "").toLowerCase() === "projects" ||
          (s.sectionName || "").toLowerCase().includes("project")
      )
    : cmsContent?.fields
    ? cmsContent
    : null;

  const cmsFields = projSection?.fields || {};
  const processedCmsKeys = new Set();
  const projectsList = [];

  // 3. Process default project logos with live CMS Admin updates (Images & Names)
  // Preserving original assets 100% without filters, opacity, or URL mutations
  icons.forEach((fallbackProject) => {
    let dynamicImage = getCmsVal(
      cmsContent,
      fallbackProject.Image,
      "projects",
      fallbackProject.varName || fallbackProject.name
    );

    let dynamicName =
      getCmsVal(cmsContent, fallbackProject.name, "projects") ||
      fallbackProject.name;

    let dynamicCategory =
      getCmsVal(cmsContent, fallbackProject.category, "projects") ||
      fallbackProject.category;

    // Track matching CMS field keys
    for (const [key, field] of Object.entries(cmsFields)) {
      if (
        field &&
        (field.value === dynamicImage ||
          (fallbackProject.varName && field.varName === fallbackProject.varName))
      ) {
        processedCmsKeys.add(key);
      }
    }

    projectsList.push({
      ...fallbackProject,
      name: dynamicName,
      category: dynamicCategory,
      imageUrl: dynamicImage,
    });
  });

  // 4. Dynamically append ANY new logos created in CMS Admin
  Object.entries(cmsFields).forEach(([fieldKey, field]) => {
    if (processedCmsKeys.has(fieldKey)) return;
    if (!field) return;

    const isImageField =
      field.type === "image" ||
      (typeof field.value === "string" &&
        (field.value.startsWith("http://") ||
          field.value.startsWith("https://") ||
          field.value.startsWith("/")));

    if (isImageField && field.value) {
      const clientTitle =
        field.label?.replace(/^image:\s*/i, "") ||
        field.title ||
        field.varName ||
        "Client Partner";

      projectsList.push({
        name: clientTitle,
        category: "Client Partner",
        imageUrl: field.value,
        Image: null,
      });
      processedCmsKeys.add(fieldKey);
    }
  });

  // 5. Continuous marquee array for seamless infinite looping
  const continuousLogos = [
    ...projectsList,
    ...projectsList,
    ...projectsList,
  ];

  return (
    <section className="relative overflow-hidden pt-20 sm:pt-24 md:pt-28 pb-20 sm:pb-24 md:pb-28 bg-[#020508] border-t border-b border-white/[0.06]">
      {/* CSS Keyframe Animation for Continuous Horizontal Logo Ticker */}
      {/* Hardware-accelerated with translate3d and subpixel antialiasing for maximum sharpness */}
      <style>{`
        @keyframes client-logo-ticker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.3333%, 0, 0); }
        }
        .client-logo-ticker-track {
          animation: client-logo-ticker 50s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .client-logo-ticker-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Ambient Radial Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[500px] bg-[#41B349]/[0.08] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#41B349]/[0.04] blur-[100px] rounded-full pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. SECTION HEADER                                                         */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 md:mb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow Badge */}
          <SectionBadge variant="dark" className="mb-3.5">
            PROVEN IMPACT & CLIENT SUCCESS
          </SectionBadge>

          {/* Section Main Heading */}
          {(() => {
            if (title && title.includes("&")) {
              const parts = title.split("&");
              return (
                <SectionHeading as="h2" size="section" theme="light">
                  {parts[0].trim()} <HighlightWord>& {parts[1].trim()}</HighlightWord>
                </SectionHeading>
              );
            }
            return (
              <SectionHeading as="h2" size="section" theme="light">
                {title}
              </SectionHeading>
            );
          })()}

          {/* Description Paragraph */}
          <SectionParagraph theme="light" size="md" className="mt-4 sm:mt-5 text-gray-300/90 leading-relaxed max-w-3xl mx-auto">
            {description}
          </SectionParagraph>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. STANDARDIZED CONTINUOUS HORIZONTAL LOGO BAR                            */}
      {/* ========================================================================= */}
      <div className="relative w-full overflow-hidden py-8 sm:py-12 my-2 sm:my-4">
        {/* Angled White Ribbon Bar - Edge to Edge */}
        <div 
          onMouseEnter={() => setIsBarPaused(true)}
          onMouseLeave={() => setIsBarPaused(false)}
          className="w-[120%] -ml-[10%] transform -rotate-2 sm:-rotate-[2.2deg] bg-white text-[#0D0F12] shadow-[0_20px_60px_rgba(0,0,0,0.7)] border-y-2 border-gray-100 py-4 sm:py-5 md:py-6 cursor-pointer select-none"
        >
          {/* Continuous Infinite Ticker Track */}
          <div
            className="flex items-center gap-10 sm:gap-14 md:gap-18 w-max client-logo-ticker-track"
            style={{ animationPlayState: isBarPaused ? "paused" : "running" }}
          >
            {continuousLogos.map((project, idx) => {
              const isImgDynamic =
                typeof project.imageUrl === "string" &&
                (project.imageUrl.startsWith("http") || project.imageUrl.startsWith("/"));

              return (
                <div
                  key={`client-logo-${idx}`}
                  aria-label={project.name}
                  className="group relative flex items-center justify-center shrink-0 w-36 sm:w-44 md:w-52 h-12 sm:h-14 md:h-16 px-3 sm:px-4 select-none cursor-pointer"
                >
                  {/* Clean Original Logo Presentation - Zero filters, zero blend modes, 100% natural colors */}
                  <div className={`relative w-full h-full flex items-center justify-center ${project.scaleClass || ""}`}>
                    {isImgDynamic ? (
                      <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <Image
                        src={project.Image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
                        className="object-contain"
                      />
                    )}
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

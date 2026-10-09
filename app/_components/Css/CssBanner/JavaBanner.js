"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import CssImg from "@/components/Images/css.png";

const CssBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="cssbanner"
      badge="RESPONSIVE CSS ARCHITECTURE • GLOBAL"
      titleLine1="Modern CSS3 & Styling"
      titleLine2="Built for Performance:"
      titleAccent="Clean & Fluid."
      description="We create modern, responsive layouts using clean CSS3, Tailwind, and fluid grids. From smooth micro-animations to cross-browser consistency, we deliver polished web styling."
      image={CssImg}
      imageAlt="CSS3 Styling"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default CssBanner;

"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import FigmaImg from "@/components/Images/Figmaicon2.png";

const FigmaBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="figmabanner"
      badge="MODERN UI/UX DESIGN • GLOBAL"
      titleLine1="Intuitive Figma UI/UX"
      titleLine2="Design & Prototypes:"
      titleAccent="Crafted for Scale."
      description="We craft modern UI/UX wireframes, interactive prototypes, and design systems in Figma. From user research to layouts, our team delivers intuitive digital products."
      image={FigmaImg}
      imageAlt="Figma Design"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default FigmaBanner;

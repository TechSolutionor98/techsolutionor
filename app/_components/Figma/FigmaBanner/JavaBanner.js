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
    />
  );
};

export default FigmaBanner;

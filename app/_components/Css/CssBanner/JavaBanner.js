"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import CssImg from "@/components/Images/css.png";

const CssBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="cssbanner"
      badge="RESPONSIVE STYLING & ANIMATION"
      titleLine1="CSS3: Modern Styling"
      titleLine2="& Fluid Animations for"
      titleAccent="Digital Interfaces."
      description="CSS transforms raw code into immersive digital aesthetics. We utilize advanced CSS3, Tailwind CSS, micro-interactions, responsive grid layouts, and glassmorphism to craft unforgettable user journeys."
      image={CssImg}
      imageAlt="CSS3 Styling"
      ctaText="Explore CSS3"
      ctaHref="#framework"
    />
  );
};

export default CssBanner;

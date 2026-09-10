"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import GraphicImg from "@/components/Images/Graphicbanner.png";
import FallbackImg from "@/components/Images/graphicsservice.png";

const GraphicBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="graphicbanner"
      badge="VISUAL IDENTITY & PRODUCT DESIGN"
      titleLine1="Graphic Design Services"
      titleLine2="in Dubai & UAE That Transform"
      titleAccent="Ideas Into Iconic Brands."
      description="Human-centered UI/UX prototypes, modern design systems in Figma, corporate brand identities, and high-impact marketing graphics that captivate audiences and establish market leadership."
      image={GraphicImg || FallbackImg}
      imageAlt="Graphic Design Services"
      ctaText="Explore Design"
      ctaHref="#graphic-services"
    />
  );
};

export default GraphicBanner;

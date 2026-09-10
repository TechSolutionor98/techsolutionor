"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import FigmaImg from "@/components/Images/Figmaicon2.png";

const FigmaBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="figmabanner"
      badge="COLLABORATIVE UI/UX DESIGN"
      titleLine1="Figma: Modern Design"
      titleLine2="Systems & Interactive"
      titleAccent="Prototypes."
      description="Figma is the gold standard for digital product design. We create comprehensive design systems, component libraries, high-fidelity clickable prototypes, and intuitive UX flows that accelerate development."
      image={FigmaImg}
      imageAlt="Figma Design"
      ctaText="Explore Figma"
      ctaHref="#framework"
    />
  );
};

export default FigmaBanner;

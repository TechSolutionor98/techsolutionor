"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import AngularImg from "@/components/Images/Angularicon2.png";

const AngularBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="angularbanner"
      badge="ENTERPRISE TYPESCRIPT FRAMEWORK"
      titleLine1="Angular: Scalable Power"
      titleLine2="for Enterprise Single-Page"
      titleAccent="Applications."
      description="Google Angular provides a robust, opinionated TypeScript framework for enterprise platforms. We architect maintainable, secure SPAs with reactive state management, modular architecture, and high computational performance."
      image={AngularImg}
      imageAlt="Angular Framework"
      ctaText="Explore Angular"
      ctaHref="#framework"
    />
  );
};

export default AngularBanner;

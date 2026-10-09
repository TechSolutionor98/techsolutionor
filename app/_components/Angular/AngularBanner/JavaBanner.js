"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import AngularImg from "@/components/Images/Angularicon2.png";

const AngularBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="angularbanner"
      badge="ENTERPRISE ANGULAR APPS • GLOBAL"
      titleLine1="Enterprise Angular"
      titleLine2="Web Apps for Scale:"
      titleAccent="Robust & Fast."
      description="We build robust, scalable single-page web applications with Angular and TypeScript. From modular architecture to state management, we deliver dependable enterprise apps."
      image={AngularImg}
      imageAlt="Angular Framework"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default AngularBanner;

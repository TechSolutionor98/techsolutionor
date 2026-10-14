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
    />
  );
};

export default AngularBanner;

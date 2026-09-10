"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import FlutterImg from "@/components/Images/Fluttericon-2.png";

const FlutterBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="flutterbanner"
      badge="CROSS-PLATFORM MOBILE FRAMEWORK"
      titleLine1="Flutter: Native Performance"
      titleLine2="from a Single Unified"
      titleAccent="Codebase."
      description="Google Flutter enables rapid development of natively compiled iOS and Android mobile apps. We engineer fluid, 60fps responsive mobile applications that reduce engineering time while maximizing performance."
      image={FlutterImg}
      imageAlt="Flutter Mobile"
      ctaText="Explore Flutter"
      ctaHref="#framework"
    />
  );
};

export default FlutterBanner;

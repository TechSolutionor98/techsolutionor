"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import SwiftImg from "@/components/Images/swift2.png";

const SwiftBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="swiftbanner"
      badge="NATIVE APPLE PLATFORMS • GLOBAL"
      titleLine1="Native Swift iOS"
      titleLine2="App Development:"
      titleAccent="Engineered for Scale."
      description="We build native, high-performance iOS apps using Swift. From smooth Apple UX to App Store deployment, our team delivers clean code and responsive mobile performance."
      image={SwiftImg}
      imageAlt="Swift Language"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default SwiftBanner;

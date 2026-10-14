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
    />
  );
};

export default SwiftBanner;

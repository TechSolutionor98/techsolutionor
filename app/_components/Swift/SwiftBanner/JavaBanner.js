"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import SwiftImg from "@/components/Images/swift2.png";

const SwiftBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="swiftbanner"
      badge="APPLE ECOSYSTEM NATIVE"
      titleLine1="Swift: Modern Language"
      titleLine2="for iOS, macOS & Apple"
      titleAccent="Development."
      description="Swift is a powerful programming language developed by Apple, designed for building fast, safe, and efficient iOS, macOS, and watchOS applications, offering a seamless user experience with modern syntax."
      image={SwiftImg}
      imageAlt="Swift Language"
      ctaText="Explore Swift"
      ctaHref="#framework"
    />
  );
};

export default SwiftBanner;

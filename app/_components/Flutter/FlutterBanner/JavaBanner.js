"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import FlutterImg from "@/components/Images/Fluttericon-2.png";

const FlutterBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="flutterbanner"
      badge="CROSS-PLATFORM MOBILE • GLOBAL"
      titleLine1="Google Flutter Mobile"
      titleLine2="Apps Built for Scale:"
      titleAccent="Native & Fast."
      description="We build cross-platform mobile apps for iOS and Android with Flutter. From a single codebase, our team delivers native performance and beautiful user interfaces."
      image={FlutterImg}
      imageAlt="Flutter Mobile"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default FlutterBanner;

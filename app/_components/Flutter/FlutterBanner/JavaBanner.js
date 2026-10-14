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
    />
  );
};

export default FlutterBanner;

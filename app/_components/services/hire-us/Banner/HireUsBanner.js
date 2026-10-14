"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import HireImg from "@/components/Images/hireusbanner.png";
import FallbackImg from "@/components/Images/hire.png";

const HireUsBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="hireusbanner"
      badge="DEDICATED TECH TALENT • GLOBAL"
      titleLine1="Hire Dedicated Developers"
      titleLine2="Company Built for Scale:"
      titleAccent="Trusted Worldwide."
      description="Hire experienced software engineers, web developers, and designers on flexible models. We provide pre-vetted tech talent ready to accelerate your project roadmap."
      image={HireImg || FallbackImg}
      imageAlt="Hire Dedicated Developers"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
    />
  );
};

export default HireUsBanner;

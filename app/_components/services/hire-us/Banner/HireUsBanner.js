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
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default HireUsBanner;

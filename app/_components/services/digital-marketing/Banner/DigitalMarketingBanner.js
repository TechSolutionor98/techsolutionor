"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import DigitalImg from "@/components/Images/digital.png";
import FallbackImg from "@/components/Images/servicesicon7.png";

const DigitalMarketingBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="digitalbanner"
      badge="FULL-FUNNEL DIGITAL MARKETING • GLOBAL"
      titleLine1="Digital Marketing Services"
      titleLine2="Company Built for Scale:"
      titleAccent="Trusted Worldwide."
      description="We run data-driven digital marketing campaigns to connect you with the right audience. From search to social channels, we help your business grow consistently."
      image={DigitalImg || FallbackImg}
      imageAlt="Digital Marketing Services"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default DigitalMarketingBanner;

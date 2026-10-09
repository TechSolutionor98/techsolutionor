"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import PpcImg from "@/components/Images/ppcbanner.png";
import FallbackImg from "@/components/Images/servicesicon8.png";

const AmazonBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="amazonbanner"
      badge="PAID SEARCH & AMAZON ADS • GLOBAL"
      titleLine1="PPC & Amazon Advertising"
      titleLine2="Company Built for Scale:"
      titleAccent="Trusted Worldwide."
      description="We manage targeted paid search and Amazon ad campaigns focused on efficient spend. From keyword strategy to ad creative, our team optimizes for profitable sales."
      image={PpcImg || FallbackImg}
      imageAlt="PPC & Amazon Advertising"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default AmazonBanner;

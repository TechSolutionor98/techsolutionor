"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import MetaImg from "@/components/Images/Metaicon2.png";

const MetaBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="metabanner"
      badge="FACEBOOK & INSTAGRAM ADS • GLOBAL"
      titleLine1="Meta Ads Management"
      titleLine2="Company Built for Scale:"
      titleAccent="Trusted Worldwide."
      description="We launch and manage targeted ad campaigns across Facebook and Instagram. From creative testing to audience retargeting, we focus on profitable campaign growth."
      image={MetaImg}
      imageAlt="Meta Advertising Services"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default MetaBanner;

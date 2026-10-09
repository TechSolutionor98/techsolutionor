"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import MagentoImg from "@/components/Images/magentoicon2.png";

const MagentoBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="magentobanner"
      badge="ENTERPRISE ADOBE COMMERCE • GLOBAL"
      titleLine1="Enterprise Magento"
      titleLine2="Commerce Platforms:"
      titleAccent="Built for Scale."
      description="We engineer enterprise Magento and Adobe Commerce stores tailored for high order volumes. From custom modules to ERP sync, we deliver stable and secure commerce."
      image={MagentoImg}
      imageAlt="Magento Commerce"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default MagentoBanner;

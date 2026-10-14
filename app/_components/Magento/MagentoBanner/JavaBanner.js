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
    />
  );
};

export default MagentoBanner;

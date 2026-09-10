"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import MagentoImg from "@/components/Images/magentoicon2.png";

const MagentoBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="magentobanner"
      badge="ENTERPRISE COMMERCE ARCHITECTURE"
      titleLine1="Magento: Scalable Power"
      titleLine2="for High-Volume Digital"
      titleAccent="Marketplaces."
      description="Adobe Commerce (Magento) offers unmatched customization and flexibility for enterprise stores. We architect robust B2B and B2C shopping experiences with complex catalogs and high transaction volumes."
      image={MagentoImg}
      imageAlt="Magento Commerce"
      ctaText="Explore Magento"
      ctaHref="#framework"
    />
  );
};

export default MagentoBanner;

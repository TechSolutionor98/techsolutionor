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
    />
  );
};

export default AmazonBanner;

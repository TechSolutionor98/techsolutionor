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
      badge="HIGH-ROI PAID ACQUISITION"
      titleLine1="PPC Advertising & Amazon"
      titleLine2="Ads Management Services"
      titleAccent="to Accelerate Sales."
      description="Laser-targeted Google Search & Display campaigns, Amazon Sponsored Products, and programmatic retargeting funnels engineered to minimize cost-per-acquisition and deliver industry-leading ROAS."
      image={PpcImg || FallbackImg}
      imageAlt="PPC & Amazon Advertising"
      ctaText="Explore PPC Ads"
      ctaHref="#ppc-services"
    />
  );
};

export default AmazonBanner;

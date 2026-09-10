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
      badge="FULL-FUNNEL PERFORMANCE MARKETING"
      titleLine1="Result-Driven Digital"
      titleLine2="Marketing Services for"
      titleAccent="Global Brands."
      description="Omnichannel growth strategies connecting data analytics, conversion funnel optimization, multi-channel customer acquisition, and relentless performance tracking to scale your commercial pipeline."
      image={DigitalImg || FallbackImg}
      imageAlt="Digital Marketing Services"
      ctaText="Explore Marketing"
      ctaHref="#digital-services"
    />
  );
};

export default DigitalMarketingBanner;

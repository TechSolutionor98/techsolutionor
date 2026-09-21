"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import GoogleAdsImg from "@/components/Images/Google-Adsicon2.png";

const GoogleBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="googleadsbanner"
      badge="HIGH-INTENT SEARCH & PPC"
      titleLine1="Google Ads Management"
      titleLine2="Targeted Search, Shopping"
      titleAccent="& Performance Max."
      description="Capture high-intent customers at the exact moment of search. We architect, manage, and continuously optimize data-driven Google Ads campaigns engineered to lower CPA and maximize qualified conversions."
      image={GoogleAdsImg}
      imageAlt="Google Ads Management Services"
      ctaText="Explore PPC Solutions"
      ctaHref="#overview"
    />
  );
};

export default GoogleBanner;

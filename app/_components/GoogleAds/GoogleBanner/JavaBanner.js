"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import GoogleAdsImg from "@/components/Images/Google-Adsicon2.png";

const GoogleBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="googleadsbanner"
      badge="HIGH-INTENT SEARCH & PPC"
      titleLine1="Google Ads: Targeted"
      titleLine2="Search & Display"
      titleAccent="Campaigns."
      description="Google Ads captures customers at the exact moment of intent. We build and optimize search, Performance Max, shopping, and display campaigns engineered to minimize cost-per-click and maximize qualified conversions."
      image={GoogleAdsImg}
      imageAlt="Google Ads"
      ctaText="Explore Google Ads"
      ctaHref="#framework"
    />
  );
};

export default GoogleBanner;

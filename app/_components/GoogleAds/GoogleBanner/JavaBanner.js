"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import GoogleAdsImg from "@/components/Images/Google-Adsicon2.png";

const GoogleBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="googleadsbanner"
      badge="GOOGLE SEARCH & PPC ADS • GLOBAL"
      titleLine1="Google Ads Management"
      titleLine2="Company Built for Scale:"
      titleAccent="Trusted Worldwide."
      description="We manage Google Search, Shopping, and Display campaigns to capture active buyers. Our team focuses on high-intent keywords, clear ad messaging, and lower CPA."
      image={GoogleAdsImg}
      imageAlt="Google Ads Management Services"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
    />
  );
};

export default GoogleBanner;

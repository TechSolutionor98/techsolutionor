"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import AnalyticsImg from "@/components/Images/nalytics.png";

const AnalyticsBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="analyticsbanner"
      badge="DATA & BUSINESS ANALYTICS • GLOBAL"
      titleLine1="Advanced Analytics"
      titleLine2="Tracking for Growth:"
      titleAccent="Clean Data."
      description="We set up Google Analytics 4, Tag Manager, and conversion tracking pipelines. From custom event tracking to dashboard reporting, we provide clean, actionable data."
      image={AnalyticsImg}
      imageAlt="Analytics Intelligence"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default AnalyticsBanner;

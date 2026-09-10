"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import AnalyticsImg from "@/components/Images/nalytics.png";

const AnalyticsBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="analyticsbanner"
      badge="DATA-DRIVEN BUSINESS INTELLIGENCE"
      titleLine1="Analytics: Actionable"
      titleLine2="Data & Performance"
      titleAccent="Tracking."
      description="Data empowers confident decision-making. We deploy Google Analytics 4, custom event tracking, conversion attribution modeling, and automated executive dashboards that expose growth opportunities."
      image={AnalyticsImg}
      imageAlt="Analytics Intelligence"
      ctaText="Explore Analytics"
      ctaHref="#framework"
    />
  );
};

export default AnalyticsBanner;

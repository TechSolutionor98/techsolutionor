"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import SeoImg from "@/components/Images/seoservice.png";
import FallbackImg from "@/components/Images/servicesicon9.png";

const SEOBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="seobanner"
      badge="SEARCH ENGINE OPTIMIZATION • GLOBAL"
      titleLine1="Effective SEO Services"
      titleLine2="Company Built for Scale:"
      titleAccent="Trusted Worldwide."
      description="We help your website rank higher in organic search through technical SEO audits, quality content, and keyword research for steady, long-term traffic growth."
      image={SeoImg || FallbackImg}
      imageAlt="Search Engine Optimization Services"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
    />
  );
};

export default SEOBanner;

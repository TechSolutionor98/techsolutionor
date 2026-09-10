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
      badge="ORGANIC SEARCH DOMINANCE"
      titleLine1="Effective SEO Strategies"
      titleLine2="to Maximize Your ROI &"
      titleAccent="Online Authority."
      description="In-depth technical SEO audits, high-intent keyword strategies, authoritative backlink building, and local Dubai/UAE Google Maps ranking to dominate competitive organic search positions."
      image={SeoImg || FallbackImg}
      imageAlt="Search Engine Optimization Services"
      ctaText="Explore SEO Services"
      ctaHref="#seo-services"
    />
  );
};

export default SEOBanner;

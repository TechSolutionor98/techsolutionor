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
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default SEOBanner;

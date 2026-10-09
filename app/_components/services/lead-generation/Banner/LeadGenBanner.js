"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import LeadGenImg from "@/components/Images/digital.png";
import FallbackImg from "@/components/Images/servicesicon1.png";

const LeadGenBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="leadgenbanner"
      badge="B2B & B2C LEAD GENERATION • GLOBAL"
      titleLine1="Lead Generation Services"
      titleLine2="Company Built for Scale:"
      titleAccent="Trusted Worldwide."
      description="We build targeted lead generation funnels that connect you with verified, high-intent buyers. From cold outreach to inbound campaigns, we deliver steady pipeline growth."
      image={LeadGenImg || FallbackImg}
      imageAlt="Lead Generation Services"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default LeadGenBanner;

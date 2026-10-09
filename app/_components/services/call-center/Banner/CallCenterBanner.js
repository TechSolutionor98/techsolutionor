"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import CallImg from "@/components/Images/callcenterbanner.png";
import FallbackImg from "@/components/Images/servicesicon11.png";

const CallCenterBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="callcenterbanner"
      badge="24/7 CUSTOMER SUPPORT DESK • GLOBAL"
      titleLine1="Call Center Solutions"
      titleLine2="Company Built for Scale:"
      titleAccent="Trusted Worldwide."
      description="We provide dependable 24/7 customer support desks tailored to your business needs. Our agents handle inquiries, tickets, and customer care with professional care."
      image={CallImg || FallbackImg}
      imageAlt="Call Center & Support Services"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default CallCenterBanner;

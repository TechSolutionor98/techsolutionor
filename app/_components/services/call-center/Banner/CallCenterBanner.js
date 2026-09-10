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
      badge="24/7 CUSTOMER EXPERIENCE"
      titleLine1="Professional Call Center"
      titleLine2="& Customer Support"
      titleAccent="Services Worldwide."
      description="Dedicated 24/7 inbound and outbound customer support desks, multilingual helpdesk outsourcing, and proactive technical service management ensuring exceptional brand loyalty and customer satisfaction."
      image={CallImg || FallbackImg}
      imageAlt="Call Center & Support Services"
      ctaText="Explore Support"
      ctaHref="#callcenter-services"
    />
  );
};

export default CallCenterBanner;

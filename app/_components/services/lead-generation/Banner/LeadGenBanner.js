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
      badge="HIGH-CONVERTING PIPELINE ARCHITECTURE • GLOBAL"
      titleLine1="Lead Generation That Drives"
      titleLine2="Real Business Growth:"
      titleAccent="Qualified Buyers Delivered."
      description="Scale your revenue with predictable, high-intent B2B and B2C buyer pipelines. We engineer multi-channel acquisition funnels combining Search, Paid Advertising, Social Inbound, Email Nurturing, and WhatsApp Engagement for local and global enterprises."
      image={LeadGenImg || FallbackImg}
      imageAlt="Lead Generation Services"
      ctaText="Explore Lead Solutions"
      ctaHref="#lead-services-section"
    />
  );
};

export default LeadGenBanner;

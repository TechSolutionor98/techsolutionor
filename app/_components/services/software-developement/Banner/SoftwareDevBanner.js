"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import SoftwareImg from "@/components/Images/service1.png";
import FallbackImg from "@/components/Images/servicesicon2.png";

const SoftwareDevBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="softwarebanner"
      badge="BESPOKE ENTERPRISE SOFTWARE"
      titleLine1="Custom Software Development"
      titleLine2="in Dubai & UAE That"
      titleAccent="Delivers Measurable Results."
      description="From business automation platforms and cloud microservices to SaaS products and enterprise CRM/ERP integrations, we engineer robust software architectures built for scalability, high throughput, and commercial reliability."
      image={SoftwareImg || FallbackImg}
      imageAlt="Custom Software Development Services"
      ctaText="Explore Software"
      ctaHref="#software-services"
    />
  );
};

export default SoftwareDevBanner;

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
      badge="CUSTOM ENTERPRISE SOFTWARE • GLOBAL"
      titleLine1="Custom Software Development"
      titleLine2="Company Built for Scale:"
      titleAccent="Trusted Worldwide."
      description="We engineer custom enterprise software, cloud platforms, and SaaS products. Our team delivers clean architecture, secure integrations, and dependable performance."
      image={SoftwareImg || FallbackImg}
      imageAlt="Custom Software Development Services"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
    />
  );
};

export default SoftwareDevBanner;

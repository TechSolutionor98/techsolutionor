"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import HireImg from "@/components/Images/hireusbanner.png";
import FallbackImg from "@/components/Images/hire.png";

const HireUsBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="hireusbanner"
      badge="DEDICATED ENGINEERING TALENT"
      titleLine1="Hire Skilled Developers"
      titleLine2="& Tech Experts for Your"
      titleAccent="Next Big Milestone."
      description="Scale your development capabilities with elite, pre-vetted senior software engineers, full-stack developers, mobile app architects, and dedicated digital product teams on flexible engagement models."
      image={HireImg || FallbackImg}
      imageAlt="Hire Dedicated Developers"
      ctaText="Hire Developers Now"
      ctaHref="#hireus-services"
    />
  );
};

export default HireUsBanner;

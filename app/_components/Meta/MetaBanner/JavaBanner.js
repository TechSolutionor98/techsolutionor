"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import MetaImg from "@/components/Images/Metaicon2.png";

const MetaBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="metabanner"
      badge="SOCIAL ADVERTISING & TARGETING"
      titleLine1="Meta Ads Management"
      titleLine2="High-Conversion Campaigns Across"
      titleAccent="Facebook & Instagram."
      description="Reach billions of active buyers across Meta's ecosystem. We design high-ROAS social advertising funnels, conversion tracking architectures, and creative testing frameworks that scale brand revenue."
      image={MetaImg}
      imageAlt="Meta Advertising Services"
      ctaText="Explore Meta Ads"
      ctaHref="#overview"
    />
  );
};

export default MetaBanner;

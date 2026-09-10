"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import MetaImg from "@/components/Images/Metaicon2.png";

const MetaBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="metabanner"
      badge="SOCIAL ADVERTISING & TARGETING"
      titleLine1="Meta: High-Conversion"
      titleLine2="Advertising Across Facebook"
      titleAccent="& Instagram."
      description="Meta's ecosystem reaches billions of active users. We architect high-ROAS social ad campaigns, custom conversion APIs, dynamic creative testing, and retargeting funnels that scale brand revenue."
      image={MetaImg}
      imageAlt="Meta Advertising"
      ctaText="Explore Meta Ads"
      ctaHref="#framework"
    />
  );
};

export default MetaBanner;

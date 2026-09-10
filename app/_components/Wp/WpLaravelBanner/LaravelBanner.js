"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import WpImg from "@/components/Images/wpicon2.png";

const WpBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="wpbanner"
      badge="ENTERPRISE CMS LEADER"
      titleLine1="WordPress: Custom CMS"
      titleLine2="& Corporate Web"
      titleAccent="Solutions."
      description="WordPress powers flexible, scalable digital publications and corporate portals. We engineer custom bespoke themes, headless architectures, enterprise security, and streamlined editorial workflows."
      image={WpImg}
      imageAlt="WordPress CMS"
      ctaText="Explore WordPress"
      ctaHref="#framework"
    />
  );
};

export default WpBanner;

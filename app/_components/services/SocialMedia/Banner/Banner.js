"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import SmImg from "@/components/Images/smbanner.png";
import FallbackImg from "@/components/Images/socialservice.png";

const Banner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="socialbanner"
      badge="AUDIENCE GROWTH & ENGAGEMENT"
      titleLine1="Unlocking the Power of"
      titleLine2="Social Media for Real"
      titleAccent="Commercial Growth."
      description="Strategic content curation, viral short-form video campaigns, active community management, and paid social acceleration across Meta, LinkedIn, and TikTok that turn followers into brand advocates."
      image={SmImg || FallbackImg}
      imageAlt="Social Media Growth"
      ctaText="Explore Social Media"
      ctaHref="#social-services"
    />
  );
};

export default Banner;

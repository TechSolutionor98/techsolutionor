"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import CwImg from "@/components/Images/cwbanner.png";
import FallbackImg from "@/components/Images/contentservice.png";

const ContentBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="contentbanner"
      badge="PERSUASIVE EDITORIAL & COPY"
      titleLine1="High‑Quality Content"
      titleLine2="Writing Services for SEO"
      titleAccent="& High Engagement."
      description="Authoritative editorial articles, commercial sales copy, technical documentation, and conversion landing page copy tailored to captivate readers, build trust, and drive action."
      image={CwImg || FallbackImg}
      imageAlt="Content Writing Services"
      ctaText="Explore Content Services"
      ctaHref="#content-services"
    />
  );
};

export default ContentBanner;

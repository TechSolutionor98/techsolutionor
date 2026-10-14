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
      badge="PROFESSIONAL CONTENT WRITING • GLOBAL"
      titleLine1="Content Writing Services"
      titleLine2="Company Built for Scale:"
      titleAccent="Trusted Worldwide."
      description="We write clear, engaging content that connects with your audience and builds trust. From SEO blog articles to website copy, our writers deliver authentic messaging."
      image={CwImg || FallbackImg}
      imageAlt="Content Writing Services"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
    />
  );
};

export default ContentBanner;

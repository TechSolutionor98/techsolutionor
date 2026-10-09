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
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default ContentBanner;

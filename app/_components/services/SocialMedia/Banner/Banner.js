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
      badge="AUDIENCE GROWTH & ENGAGEMENT • GLOBAL"
      titleLine1="Social Media Marketing"
      titleLine2="Company Built for Scale:"
      titleAccent="Trusted Worldwide."
      description="We create and manage strategic social media campaigns that build genuine audience engagement. From content to community care, we help your brand connect."
      image={SmImg || FallbackImg}
      imageAlt="Social Media Growth"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default Banner;

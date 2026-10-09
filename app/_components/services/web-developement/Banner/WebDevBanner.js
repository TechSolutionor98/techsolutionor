"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import WebDevImg from "@/components/Images/webservice.png";
import FallbackImg from "@/components/Images/servicesicon1.png";

const WebDevBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="webdevbanner"
      badge="PREMIER WEB ENGINEERING • GLOBAL"
      titleLine1="Best Web Development"
      titleLine2="Company Built for Scale:"
      titleAccent="Trusted Worldwide."
      description="We design and build fast, responsive websites and custom web applications. From corporate sites to scalable platforms, our team delivers clean code and reliable performance."
      image={WebDevImg || FallbackImg}
      imageAlt="Web Development Company"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default WebDevBanner;

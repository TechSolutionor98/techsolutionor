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
    />
  );
};

export default WebDevBanner;

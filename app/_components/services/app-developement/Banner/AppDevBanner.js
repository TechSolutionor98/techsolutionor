"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import AppImg from "@/components/Images/appservice.png";

const AppDevBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="appdevbanner"
      badge="IOS & ANDROID ENGINEERING • GLOBAL"
      titleLine1="Mobile App Development"
      titleLine2="Company Built for Scale:"
      titleAccent="Trusted Worldwide."
      description="We design and build high-performance iOS and Android mobile applications. From initial concept to app launch, our team delivers intuitive design and reliable code."
      image={AppImg}
      imageAlt="Mobile App Development Company"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
    />
  );
};

export default AppDevBanner;

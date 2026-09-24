"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import AppImg from "@/components/Images/appservice.png";

const AppDevBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="appdevbanner"
      badge="IOS & ANDROID ENGINEERING"
      titleLine1="Mobile App Development"
      titleLine2="Company Built for Scale"
      titleAccent="for Startups & Enterprises."
      description="We provide custom mobile app development services globally, delivering secure, scalable and user-focused iOS, Android and cross-platform applications. From idea validation to launch and ongoing support, we build high-performing digital products built to drive business growth."
      image={AppImg}
      imageAlt="Mobile App Development Company"
      ctaText="Explore App Services"
      ctaHref="#industries"
    />
  );
};

export default AppDevBanner;

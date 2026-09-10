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
      titleLine2="Company in Dubai & UAE"
      titleAccent="for Startups & Enterprises."
      description="We provide custom mobile app development services in Dubai, Abu Dhabi and across the UAE, delivering secure, scalable and user-focused iOS, Android and web applications. From idea validation to launch and ongoing support, we build high-performing digital products built to drive business growth."
      image={AppImg}
      imageAlt="Mobile App Development Company"
      ctaText="Explore App Services"
      ctaHref="#industries"
    />
  );
};

export default AppDevBanner;

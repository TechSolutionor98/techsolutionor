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
      badge="PREMIER WEB ENGINEERING • DUBAI & GLOBAL"
      titleLine1="Best Web Development"
      titleLine2="Company in Dubai, UAE:"
      titleAccent="Trusted Worldwide."
      description="Partner with the best web development company in Dubai to build high-performance, scalable websites through expert web design and development services. From startups in Dubai to enterprises across the UAE and worldwide, we create conversion-focused web solutions that boost engagement, strengthen brand authority and maximize ROI."
      image={WebDevImg || FallbackImg}
      imageAlt="Web Development Company in Dubai"
      ctaText="Explore Web Solutions"
      ctaHref="#technologies-book-section"
    />
  );
};

export default WebDevBanner;

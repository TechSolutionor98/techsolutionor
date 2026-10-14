"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import HtmlImg from "@/components/Images/html.png";

const HTMLBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="htmlbanner"
      badge="CLEAN WEB FOUNDATIONS • GLOBAL"
      titleLine1="Semantic HTML5 Web"
      titleLine2="Development Built for Scale:"
      titleAccent="Fast & Accessible."
      description="We craft clean, semantic HTML5 structures optimized for modern browsers, accessibility, and SEO. Our team delivers fast-loading pages and rock-solid web foundations."
      image={HtmlImg}
      imageAlt="HTML5"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
    />
  );
};

export default HTMLBanner;

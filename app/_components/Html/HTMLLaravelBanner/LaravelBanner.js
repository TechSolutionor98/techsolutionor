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
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default HTMLBanner;

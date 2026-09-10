"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import HtmlImg from "@/components/Images/html.png";

const HTMLBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="htmlbanner"
      badge="SEMANTIC WEB ARCHITECTURE"
      titleLine1="HTML5: The Essential"
      titleLine2="Building Block of Modern"
      titleAccent="Websites."
      description="HTML forms the structural foundation of the World Wide Web. We engineer clean, semantic, accessible, and SEO-optimized HTML5 codebases that ensure flawless cross-device performance."
      image={HtmlImg}
      imageAlt="HTML5"
      ctaText="Explore HTML5"
      ctaHref="#framework"
    />
  );
};

export default HTMLBanner;

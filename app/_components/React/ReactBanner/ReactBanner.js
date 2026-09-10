"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import ReactImg from "@/components/Images/react2.png";

const ReactBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="reactbanner"
      badge="REACTIVE UI FRAMEWORK"
      titleLine1="ReactJS: Dynamic &"
      titleLine2="Interactive High-Speed"
      titleAccent="Web Interfaces."
      description="React is a popular JavaScript library for creating fast, interactive, and reusable user interfaces, making it a top choice for modern web applications and scalable enterprise dashboards."
      image={ReactImg}
      imageAlt="React JS Framework"
      ctaText="Explore ReactJS"
      ctaHref="#framework"
    />
  );
};

export default ReactBanner;

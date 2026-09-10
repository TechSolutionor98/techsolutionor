"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import JsImg from "@/components/Images/JavaScript.png";

const JavaBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="jsbanner"
      badge="UNIVERSAL WEB CORE"
      titleLine1="JavaScript: Core"
      titleLine2="Technology for Modern"
      titleAccent="Web Development."
      description="JavaScript is the core of modern web development, enabling dynamic and interactive features across websites. It's essential for creating responsive, user-friendly interfaces and powering real-time updates and animations."
      image={JsImg}
      imageAlt="JavaScript Language"
      ctaText="Explore JavaScript"
      ctaHref="#framework"
    />
  );
};

export default JavaBanner;

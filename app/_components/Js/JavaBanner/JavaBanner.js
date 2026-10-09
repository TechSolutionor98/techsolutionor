"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import JsImg from "@/components/Images/JavaScript.png";

const JavaBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="jsbanner"
      badge="UNIVERSAL JAVASCRIPT • GLOBAL"
      titleLine1="Modern JavaScript"
      titleLine2="Full-Stack Solutions:"
      titleAccent="Built for Scale."
      description="We build interactive web applications and scalable full-stack platforms using modern JavaScript. From frontend UI to Node.js backends, we deliver dependable code."
      image={JsImg}
      imageAlt="JavaScript Language"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default JavaBanner;

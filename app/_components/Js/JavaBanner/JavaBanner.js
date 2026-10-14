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
    />
  );
};

export default JavaBanner;

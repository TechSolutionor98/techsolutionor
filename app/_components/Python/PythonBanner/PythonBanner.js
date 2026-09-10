"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import PythonImg from "@/components/Images/py2.png";

const PythonBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="pythonbanner"
      badge="AI & GENERAL PURPOSE"
      titleLine1="Python: Modern Power"
      titleLine2="for Web, AI and App"
      titleAccent="Development."
      description="Python is a versatile, high-performance programming language used to build modern web applications, artificial intelligence, automation pipelines, and scalable backend solutions."
      image={PythonImg}
      imageAlt="Python Language"
      ctaText="Explore Python"
      ctaHref="#framework"
    />
  );
};

export default PythonBanner;

"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import PythonImg from "@/components/Images/py2.png";

const PythonBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="pythonbanner"
      badge="PYTHON & BACKEND SYSTEMS • GLOBAL"
      titleLine1="Enterprise Python"
      titleLine2="Backend & API Systems:"
      titleAccent="Built for Scale."
      description="We engineer secure, scalable backend systems, APIs, and data solutions using Python. From web apps to automation, our team delivers clean code and reliable performance."
      image={PythonImg}
      imageAlt="Python Language"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default PythonBanner;

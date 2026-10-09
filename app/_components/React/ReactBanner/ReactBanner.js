"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import ReactImg from "@/components/Images/react2.png";

const ReactBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="reactbanner"
      badge="REACTIVE UI FRAMEWORK • GLOBAL"
      titleLine1="Modern React Web"
      titleLine2="Applications for Scale:"
      titleAccent="Fast & Interactive."
      description="We build modern, fast web applications with React. From interactive user interfaces to reusable components, our team delivers responsive design and reliable code."
      image={ReactImg}
      imageAlt="React JS Framework"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default ReactBanner;

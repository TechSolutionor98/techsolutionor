"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import WpImg from "@/components/Images/wpicon2.png";

const WpBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="wpbanner"
      badge="ENTERPRISE WORDPRESS • GLOBAL"
      titleLine1="Custom WordPress CMS"
      titleLine2="Built for Scale:"
      titleAccent="Secure & Fast."
      description="We design and build custom WordPress themes, plugins, and headless CMS platforms. From speed optimization to security, our team delivers clean and easy-to-manage sites."
      image={WpImg}
      imageAlt="WordPress CMS"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default WpBanner;

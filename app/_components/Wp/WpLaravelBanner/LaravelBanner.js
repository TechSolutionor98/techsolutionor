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
    />
  );
};

export default WpBanner;

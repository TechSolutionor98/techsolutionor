"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import PhpImg from "@/components/Images/php-1-1.png";

const PhpBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="phpbanner"
      badge="MODERN PHP DEVELOPMENT • GLOBAL"
      titleLine1="Modern PHP Backend"
      titleLine2="Solutions Built for Scale:"
      titleAccent="Trusted & Secure."
      description="We build dynamic websites, secure portals, and custom backend systems using modern PHP. From custom modules to database integration, we deliver dependable results."
      image={PhpImg}
      imageAlt="PHP Language"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
    />
  );
};

export default PhpBanner;

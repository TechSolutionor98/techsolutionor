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
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default PhpBanner;

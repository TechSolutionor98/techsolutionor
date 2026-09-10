"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import PhpImg from "@/components/Images/php-1-1.png";

const PhpBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="phpbanner"
      badge="SERVER-SIDE FOUNDATION"
      titleLine1="PHP: Dynamic Server"
      titleLine2="Solutions for Enterprise"
      titleAccent="Web Applications."
      description="PHP powers over 70% of the web. We build modern, secure, and fast PHP 8+ backend systems, RESTful microservices, and custom content management solutions tailored to commercial demands."
      image={PhpImg}
      imageAlt="PHP Language"
      ctaText="Explore PHP"
      ctaHref="#framework"
    />
  );
};

export default PhpBanner;

"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import LaravelImg from "@/components/Images/Laravel.png";

const LaravelBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="laravelbanner"
      badge="PHP MVC FRAMEWORK • GLOBAL"
      titleLine1="Laravel Development"
      titleLine2="Services Built for Scale:"
      titleAccent="Engineered for Speed."
      description="We build fast, secure web applications and robust APIs using Laravel. From MVC architecture to custom packages, our team delivers clean code and reliable performance."
      image={LaravelImg}
      imageAlt="Laravel Framework"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
    />
  );
};

export default LaravelBanner;

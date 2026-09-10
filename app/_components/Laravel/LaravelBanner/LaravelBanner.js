"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import LaravelImg from "@/components/Images/Laravel.png";

const LaravelBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="laravelbanner"
      badge="PHP MVC FRAMEWORK"
      titleLine1="Laravel: Powerful PHP"
      titleLine2="Framework for Web"
      titleAccent="Applications."
      description="Laravel is a leading PHP framework known for its elegant syntax and powerful tools. It simplifies web development with features like MVC architecture, routing, and Blade templating, making it perfect for creating robust and scalable applications."
      image={LaravelImg}
      imageAlt="Laravel Framework"
      ctaText="Explore Laravel"
      ctaHref="#framework"
    />
  );
};

export default LaravelBanner;

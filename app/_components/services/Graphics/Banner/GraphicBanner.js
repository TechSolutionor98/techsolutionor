"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import GraphicImg from "@/components/Images/Graphicbanner.png";
import FallbackImg from "@/components/Images/graphicsservice.png";

const GraphicBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="graphicbanner"
      badge="CREATIVE DESIGN & BRANDING • GLOBAL"
      titleLine1="Graphic Design & Branding"
      titleLine2="Company Built for Scale:"
      titleAccent="Trusted Worldwide."
      description="We craft modern brand identities, intuitive UI/UX designs, and engaging visual assets. From wireframes to design systems, our team delivers clean creative work."
      image={GraphicImg || FallbackImg}
      imageAlt="Graphic Design Services"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default GraphicBanner;

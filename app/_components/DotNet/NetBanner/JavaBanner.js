"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import NetImg from "@/components/Images/net.png";

const NetBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="dotnetbanner"
      badge="MICROSOFT ENTERPRISE ECOSYSTEM"
      titleLine1=".NET: Enterprise Core"
      titleLine2="for Mission-Critical"
      titleAccent="Cloud Systems."
      description="Microsoft .NET delivers high-speed, secure, and rock-solid software solutions. We build enterprise desktop, web, and microservice architectures with C# and ASP.NET Core that power large-scale corporate operations."
      image={NetImg}
      imageAlt=".NET Framework"
      ctaText="Explore .NET"
      ctaHref="#framework"
    />
  );
};

export default NetBanner;

"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import NetImg from "@/components/Images/net.png";

const NetBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="dotnetbanner"
      badge="ENTERPRISE MICROSOFT .NET • GLOBAL"
      titleLine1="Enterprise .NET Core"
      titleLine2="Cloud Architecture:"
      titleAccent="Built for Scale."
      description="We develop enterprise web services, cloud microservices, and desktop software with Microsoft .NET. Our team delivers secure architecture and high-throughput systems."
      image={NetImg}
      imageAlt=".NET Framework"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
    />
  );
};

export default NetBanner;

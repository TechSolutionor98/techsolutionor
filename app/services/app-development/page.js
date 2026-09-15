import React from "react";
import AppDevBanner from "../../_components/services/app-developement/Banner/AppDevBanner";
import TechnologiesBook from "@/app/_components/services/common/TechnologiesBook/TechnologiesBook";
import CommonWhyChoose from "@/app/_components/services/common/WhyChoose/CommonWhyChoose";
import CommonKeyFeatures from "@/app/_components/services/common/KeyFeatures/CommonKeyFeatures";
import CommonStruggling from "@/app/_components/services/common/Struggling/CommonStruggling";
import CommonServices from "@/app/_components/services/common/Services/CommonServices";
import CommonHireUs from "@/app/_components/services/common/HireUs/CommonHireUs";
import AppFAQ from "../../_components/services/app-developement/FAQ/AppFAQ";
import { generateCmsMetadata } from "@/lib/cms-fetch";
import CmsJsonLd from "@/components/CmsJsonLd";

export async function generateMetadata() {
  return generateCmsMetadata('/services/app-development', {
    title: 'Mobile App Development Services (iOS & Android) | Tech Solutionor',
    description: 'Custom mobile application development services for iOS and Android platforms to build scalable, high-converting mobile apps.',
  });
}

const page = () => {
  return (
    <div className="bg-white w-full"> 
      <CmsJsonLd path="/services/app-development" />
      <AppDevBanner />
      <CommonWhyChoose serviceKey="app-development" />
      <CommonKeyFeatures serviceKey="app-development" />
      <CommonStruggling serviceKey="app-development" />
      <CommonServices serviceKey="app-development" />
      <TechnologiesBook serviceKey="app-development" bgColor="#FFFFFF" />
      <CommonHireUs serviceKey="app-development" />
      <AppFAQ />
    </div>
  );
};

export default page;

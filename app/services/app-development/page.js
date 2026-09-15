import React from "react";
import AppDevBanner from "../../_components/services/app-developement/Banner/AppDevBanner";
import TechnologiesBook from "@/app/_components/services/common/TechnologiesBook/TechnologiesBook";
import CommonWhyChoose from "@/app/_components/services/common/WhyChoose/CommonWhyChoose";
import CommonKeyFeatures from "@/app/_components/services/common/KeyFeatures/CommonKeyFeatures";
import CommonStruggling from "@/app/_components/services/common/Struggling/CommonStruggling";
import CommonServices from "@/app/_components/services/common/Services/CommonServices";
import CommonHireUs from "@/app/_components/services/common/HireUs/CommonHireUs";
import AppFAQ from "../../_components/services/app-developement/FAQ/AppFAQ";
import { generateCmsMetadata, getCmsData } from "@/lib/cms-fetch";
import CmsJsonLd from "@/components/CmsJsonLd";

export async function generateMetadata() {
  return generateCmsMetadata('/services/app-development', {
    title: 'Mobile App Development Services (iOS & Android) | Tech Solutionor',
    description: 'Custom mobile application development services for iOS and Android platforms to build scalable, high-converting mobile apps.',
  });
}

export default async function AppDevelopmentPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/services/app-development');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for App Development page:', err);
  }

  return (
    <div className="bg-white w-full"> 
      <CmsJsonLd path="/services/app-development" />
      <AppDevBanner cmsContent={cmsContent} />
      <CommonWhyChoose serviceKey="app-development" cmsContent={cmsContent} />
      <CommonKeyFeatures serviceKey="app-development" cmsContent={cmsContent} />
      <CommonStruggling serviceKey="app-development" cmsContent={cmsContent} />
      <CommonServices serviceKey="app-development" cmsContent={cmsContent} />
      <TechnologiesBook serviceKey="app-development" bgColor="#FFFFFF" cmsContent={cmsContent} />
      <CommonHireUs serviceKey="app-development" cmsContent={cmsContent} />
      <AppFAQ cmsContent={cmsContent} />
    </div>
  );
}

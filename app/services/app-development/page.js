import React from "react";
import AppDevBanner from "../../_components/services/app-developement/Banner/AppDevBanner";
import TransformingIdeas from "../../_components/services/app-developement/TransformingIdeas/TransformingIdeas";
import MobileAppService from "../../_components/services/app-developement/MobileAppServices/MobileAppService";
import AppImages from "../../_components/services/app-developement/AppImages/AppImages";
import TechnologiesBook from "@/app/_components/services/common/TechnologiesBook/TechnologiesBook";
import ExpertiseAcrossPlatform from "../../_components/services/app-developement/ExpertiseAcrossPlatform/ExpertiseAcrossPlatform";
import OurProces from "../../_components/services/app-developement/OurProces/OurProces";
import CommonWhyChoose from "@/app/_components/services/common/WhyChoose/CommonWhyChoose";
import CommonKeyFeatures from "@/app/_components/services/common/KeyFeatures/CommonKeyFeatures";
import AppHireUs from "../../_components/services/app-developement/HireUs/AppHireUs";
import AppFAQ from "../../_components/services/app-developement/FAQ/AppFAQ";

const page = () => {
  return (
    <div className="bg-white w-full"> 
      <AppDevBanner />
      <CommonWhyChoose serviceKey="app-development" />
      <CommonKeyFeatures serviceKey="app-development" />
      <TransformingIdeas />
      <MobileAppService />
      <AppImages />
      <TechnologiesBook serviceKey="app-development" />
      <ExpertiseAcrossPlatform />
      <OurProces />
      <AppHireUs />
      <AppFAQ />
    </div>
  );
};

export default page;

import React from "react";
import AppDevBanner from "../../_components/services/app-developement/Banner/AppDevBanner";
import TransformingIdeas from "../../_components/services/app-developement/TransformingIdeas/TransformingIdeas";
import MobileAppService from "../../_components/services/app-developement/MobileAppServices/MobileAppService";
import AppImages from "../../_components/services/app-developement/AppImages/AppImages";
import TechnoligesWeUse from "../../_components/services/web-developement/TechnoligesWeUse/TechnoligesWeUse";
import ExpertiseAcrossPlatform from "../../_components/services/app-developement/ExpertiseAcrossPlatform/ExpertiseAcrossPlatform";
import OurProces from "../../_components/services/app-developement/OurProces/OurProces";
import AppWhyChoose from "../../_components/services/app-developement/WhyChoose/AppWhyChoose";
import AppHireUs from "../../_components/services/app-developement/HireUs/AppHireUs";
import AppFAQ from "../../_components/services/app-developement/FAQ/AppFAQ";

const page = () => {
  return (
    <div className="bg-white w-full"> 
      <AppDevBanner />
      <TransformingIdeas />
      <MobileAppService />
      <AppImages />
      <TechnoligesWeUse />
      <ExpertiseAcrossPlatform />
      <OurProces />
      <AppWhyChoose />
      <AppHireUs />
      <AppFAQ />
    </div>
  );
};

export default page;

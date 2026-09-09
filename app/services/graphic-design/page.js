import React from 'react';
import GraphicBanner from '../../_components/services/Graphics/Banner/GraphicBanner';
import GraphicAbout from '../../_components/services/Graphics/FrameWork/FrameWork';
import BusinessGrowth from '../../_components/services/Graphics/BusinessGrowth/BusinessGrowth';
import DesignServices from '../../_components/services/Graphics/UxDesignServices/DesignServices';
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook';
import AboutGraphics from '../../_components/services/Graphics/AboutGraphics/AboutGraphics';
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose';
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures';
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling';
import CommonServices from '@/app/_components/services/common/Services/CommonServices';
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs';
import CommonFAQ from '@/app/_components/services/common/FAQ/CommonFAQ';
import WorkTogether from '../../_components/services/Graphics/Worktogether/worktogether';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/services/graphic-design', {
    title: "Graphic Design Services - Tech Solutionor",
    description: "Professional graphic design services in Dubai & UAE including branding, logo design, print design, web graphics, and UI/UX design.",
  });
}

const Page = () => {
  return (
    <div>
      <GraphicBanner />
      <CommonWhyChoose serviceKey="graphic-design" />
      <CommonKeyFeatures serviceKey="graphic-design" />
      <CommonStruggling serviceKey="graphic-design" />
      <CommonServices serviceKey="graphic-design" />
      {/* <GraphicAbout /> */}
      {/* <BusinessGrowth /> */}
      {/* <DesignServices /> */}
      <TechnologiesBook serviceKey="graphic-design" bgColor="#FFFFFF" />
      {/* <AboutGraphics /> */}
      <CommonHireUs serviceKey="graphic-design" />
      {/* <WorkTogether /> */}
      <CommonFAQ serviceKey="graphic-design" />
    </div>
  );
};

export default Page;

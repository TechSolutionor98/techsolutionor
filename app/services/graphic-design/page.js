import React from 'react';
import GraphicBanner from '../../_components/services/Graphics/Banner/GraphicBanner';
import GraphicAbout from '../../_components/services/Graphics/FrameWork/FrameWork';
import BusinessGrowth from '../../_components/services/Graphics/BusinessGrowth/BusinessGrowth';
import DesignServices from '../../_components/services/Graphics/UxDesignServices/DesignServices';
import AboutGraphics from '../../_components/services/Graphics/AboutGraphics/AboutGraphics';
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
      <GraphicAbout />
      <BusinessGrowth />
      <DesignServices />
      <AboutGraphics />
      <WorkTogether />
    </div>
  );
};

export default Page;

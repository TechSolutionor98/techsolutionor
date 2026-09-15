import React from 'react';
import GraphicBanner from '../../_components/services/Graphics/Banner/GraphicBanner';
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook';
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose';
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures';
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling';
import CommonServices from '@/app/_components/services/common/Services/CommonServices';
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs';
import CommonFAQ from '@/app/_components/services/common/FAQ/CommonFAQ';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/services/graphic-design', {
    title: "Graphic Design Services - Tech Solutionor",
    description: "Professional graphic design services in Dubai & UAE including branding, logo design, print design, web graphics, and UI/UX design.",
  });
}

export default async function GraphicDesignPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/services/graphic-design');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Graphic Design page:', err);
  }

  return (
    <div>
      <CmsJsonLd path="/services/graphic-design" />
      <GraphicBanner cmsContent={cmsContent} />
      <CommonWhyChoose serviceKey="graphic-design" cmsContent={cmsContent} />
      <CommonKeyFeatures serviceKey="graphic-design" cmsContent={cmsContent} />
      <CommonStruggling serviceKey="graphic-design" cmsContent={cmsContent} />
      <CommonServices serviceKey="graphic-design" cmsContent={cmsContent} />
      <TechnologiesBook serviceKey="graphic-design" bgColor="#FFFFFF" cmsContent={cmsContent} />
      <CommonHireUs serviceKey="graphic-design" cmsContent={cmsContent} />
      <CommonFAQ serviceKey="graphic-design" cmsContent={cmsContent} />
    </div>
  );
}

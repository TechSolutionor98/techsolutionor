import React from 'react';
import DigitalMarketingBanner from '../../_components/services/digital-marketing/Banner/DigitalMarketingBanner';
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook';
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose';
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures';
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling';
import CommonServices from '@/app/_components/services/common/Services/CommonServices';
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs';
import DigitalMarketingFAQ from '../../_components/services/digital-marketing/FAQ/FAQ';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/services/digital-marketing', {
    title: 'Digital Marketing & Growth Solutions | Tech Solutionor',
    description: 'Data-driven digital marketing solutions covering search engine marketing, social growth, and multi-channel campaigns.',
  });
}

export default async function DigitalMarketingPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/services/digital-marketing');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Digital Marketing page:', err);
  }

  return (
    <div>
      <CmsJsonLd path="/services/digital-marketing" />
      <DigitalMarketingBanner cmsContent={cmsContent} />
      <CommonWhyChoose serviceKey="digital-marketing" cmsContent={cmsContent} />
      <CommonKeyFeatures serviceKey="digital-marketing" cmsContent={cmsContent} />
      <CommonStruggling serviceKey="digital-marketing" cmsContent={cmsContent} />
      <CommonServices serviceKey="digital-marketing" cmsContent={cmsContent} />
      <TechnologiesBook serviceKey="digital-marketing" bgColor="#FFFFFF" cmsContent={cmsContent} />
      <CommonHireUs serviceKey="digital-marketing" cmsContent={cmsContent} />
      <DigitalMarketingFAQ cmsContent={cmsContent} />
    </div>
  );
}

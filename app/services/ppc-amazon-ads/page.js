import React from 'react';
import Banner from '../../_components/services/ppc-amazon-ads/Banner/AmazonBanner';
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook';
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose';
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures';
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling';
import CommonServices from '@/app/_components/services/common/Services/CommonServices';
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs';
import PpcFAQ from '../../_components/services/ppc-amazon-ads/FAQ/FAQ';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/services/ppc-amazon-ads', {
    title: 'PPC Management & Amazon Advertising Services | Tech Solutionor',
    description: 'High-ROI pay-per-click advertising, Google Ads management, and Amazon sponsored ads campaigns to drive targeted conversions.',
  });
}

export default async function PpcAmazonAdsPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/services/ppc-amazon-ads');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for PPC page:', err);
  }

  return (
    <div>
      <CmsJsonLd path="/services/ppc-amazon-ads" />
      <Banner cmsContent={cmsContent} />
      <CommonWhyChoose serviceKey="ppc-amazon-ads" cmsContent={cmsContent} />
      <CommonKeyFeatures serviceKey="ppc-amazon-ads" cmsContent={cmsContent} />
      <CommonStruggling serviceKey="ppc-amazon-ads" cmsContent={cmsContent} />
      <CommonServices serviceKey="ppc-amazon-ads" cmsContent={cmsContent} />
      <TechnologiesBook serviceKey="ppc-amazon-ads" bgColor="#FFFFFF" cmsContent={cmsContent} />
      <CommonHireUs serviceKey="ppc-amazon-ads" cmsContent={cmsContent} />
      <PpcFAQ cmsContent={cmsContent} />
    </div>
  );
}

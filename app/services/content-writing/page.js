import React from 'react';
import ContentBanner from '../../_components/services/content-writing/Banner/ContentBanner';
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook';
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose';
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures';
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling';
import CommonServices from '@/app/_components/services/common/Services/CommonServices';
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs';
import ContentFAQ from '../../_components/services/content-writing/FAQ/ContentFAQ';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/services/content-writing', {
    title: 'Professional SEO Content Writing & Copywriting Services | Tech Solutionor',
    description: 'High-quality SEO articles, copywriting, website content, and technical documentation designed to engage audiences and rank.',
  });
}

export default async function ContentWritingPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/services/content-writing');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Content Writing page:', err);
  }

  return (
    <div>
      <CmsJsonLd path="/services/content-writing" />
      <ContentBanner cmsContent={cmsContent} />
      <CommonWhyChoose serviceKey="content-writing" cmsContent={cmsContent} />
      <CommonKeyFeatures serviceKey="content-writing" cmsContent={cmsContent} />
      <CommonStruggling serviceKey="content-writing" cmsContent={cmsContent} />
      <CommonServices serviceKey="content-writing" cmsContent={cmsContent} />
      <TechnologiesBook serviceKey="content-writing" bgColor="#FFFFFF" cmsContent={cmsContent} />
      <CommonHireUs serviceKey="content-writing" cmsContent={cmsContent} />
      <ContentFAQ cmsContent={cmsContent} />
    </div>
  );
}

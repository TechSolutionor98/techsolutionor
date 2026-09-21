import React from 'react';
import GoogleBanner from '../../_components/GoogleAds/GoogleBanner/JavaBanner';
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose';
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures';
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling';
import CommonServices from '@/app/_components/services/common/Services/CommonServices';
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook';
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs';
import GoogleFAQ from '../../_components/GoogleAds/GoogleFAQ/GoogleFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/services/google-ads', {
    title: 'Google Ads Management Services | TechSolutionor',
    description: 'Expert Google Ads management and PPC campaign services designed to drive qualified leads, maximize ROAS, and scale enterprise growth.',
  });
}

export default async function GoogleAdsPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/services/google-ads');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Google Ads page:', err);
  }

  return (
    <div className="bg-white w-full">
      <CmsJsonLd path="/services/google-ads" />
      <GoogleBanner cmsContent={cmsContent} />
      <CommonWhyChoose serviceKey="google-ads" cmsContent={cmsContent} />
      <CommonKeyFeatures serviceKey="google-ads" cmsContent={cmsContent} />
      <CommonStruggling serviceKey="google-ads" cmsContent={cmsContent} />
      <CommonServices serviceKey="google-ads" cmsContent={cmsContent} />
      <TechnologiesBook serviceKey="google-ads" bgColor="#FFFFFF" cmsContent={cmsContent} />
      <CommonHireUs serviceKey="google-ads" cmsContent={cmsContent} />
      <GoogleFAQ cmsContent={cmsContent} />
    </div>
  );
}


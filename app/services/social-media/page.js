import React from 'react';
import SocialMediaBanner from '../../_components/services/SocialMedia/Banner/Banner';
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose';
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures';
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling';
import CommonServices from '@/app/_components/services/common/Services/CommonServices';
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook';
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs';
import CommonFAQ from '@/app/_components/services/common/FAQ/CommonFAQ';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/services/social-media', {
    title: 'Social Media Marketing & Management Services | Tech Solutionor',
    description: 'Grow your brand reach, audience engagement, and conversions across Facebook, Instagram, LinkedIn, and TikTok with Tech Solutionor.',
  });
}

export default async function SocialMediaPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/services/social-media');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Social Media page:', err);
  }

  return (
    <div>
      <CmsJsonLd path="/services/social-media" />
      <SocialMediaBanner cmsContent={cmsContent} />
      <CommonWhyChoose serviceKey="social-media" cmsContent={cmsContent} />
      <CommonKeyFeatures serviceKey="social-media" cmsContent={cmsContent} />
      <CommonStruggling serviceKey="social-media" cmsContent={cmsContent} />
      <CommonServices serviceKey="social-media" cmsContent={cmsContent} />
      <TechnologiesBook serviceKey="social-media" bgColor="#FFFFFF" cmsContent={cmsContent} />
      <CommonHireUs serviceKey="social-media" cmsContent={cmsContent} />
      <CommonFAQ serviceKey="social-media" cmsContent={cmsContent} />
    </div>
  );
}

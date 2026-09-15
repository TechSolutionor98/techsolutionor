import React from 'react';
import SoftwareDevBanner from '@/app/_components/services/software-developement/Banner/SoftwareDevBanner';
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook';
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose';
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures';
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling';
import CommonServices from '@/app/_components/services/common/Services/CommonServices';
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs';
import SoftwareFAQ from '@/app/_components/services/software-developement/FAQ/SoftwareFAQ';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/services/software-development', {
    title: 'Custom Software Development Services in Dubai & UAE | Tech Solutioner',
    description: 'Leading software development company in Dubai providing enterprise software, SaaS platforms, and custom digital solutions.',
  });
}

export default async function SoftwareDevelopmentPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/services/software-development');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Software Development page:', err);
  }

  return (
    <div>
      <CmsJsonLd path="/services/software-development" />
      <SoftwareDevBanner cmsContent={cmsContent} />
      <CommonWhyChoose serviceKey="software-development" cmsContent={cmsContent} />
      <CommonKeyFeatures serviceKey="software-development" cmsContent={cmsContent} />
      <CommonStruggling serviceKey="software-development" cmsContent={cmsContent} />
      <CommonServices serviceKey="software-development" cmsContent={cmsContent} />
      <TechnologiesBook serviceKey="software-development" bgColor="#FFFFFF" cmsContent={cmsContent} />
      <CommonHireUs serviceKey="software-development" cmsContent={cmsContent} />
      <SoftwareFAQ cmsContent={cmsContent} />
    </div>
  );
}

import React from 'react';
import CallCenterBanner from '../../_components/services/call-center/Banner/CallCenterBanner';
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook';
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose';
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures';
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling';
import CommonServices from '@/app/_components/services/common/Services/CommonServices';
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs';
import CallCenterFAQ from '../../_components/services/call-center/FAQ/CallCenterFAQ';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/services/call-center', {
    title: 'Call Center & BPO Customer Support Services | Tech Solutionor',
    description: 'Inbound and outbound call center solutions, technical support, and customer service outsourcing tailored for business operations.',
  });
}

export default async function CallCenterPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/services/call-center');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Call Center page:', err);
  }

  return (
    <div>
      <CmsJsonLd path="/services/call-center" />
      <CallCenterBanner cmsContent={cmsContent} />
      <CommonWhyChoose serviceKey="call-center" cmsContent={cmsContent} />
      <CommonKeyFeatures serviceKey="call-center" cmsContent={cmsContent} />
      <CommonStruggling serviceKey="call-center" cmsContent={cmsContent} />
      <CommonServices serviceKey="call-center" cmsContent={cmsContent} />
      <TechnologiesBook serviceKey="call-center" bgColor="#FFFFFF" cmsContent={cmsContent} />
      <CommonHireUs serviceKey="call-center" cmsContent={cmsContent} />
      <CallCenterFAQ cmsContent={cmsContent} />
    </div>
  );
}

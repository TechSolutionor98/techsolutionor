import React from 'react';
import WebDevBanner from '../../_components/services/web-developement/Banner/WebDevBanner';
import WebWhyChoose from '../../_components/services/web-developement/WhyChoose/WebWhyChoose';
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures';
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling';
import WebServices from '@/app/_components/services/web-developement/Services/WebServices';
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook';
import WebHireUs from '../../_components/services/web-developement/HireUs/WebHireUs';
import WebFAQ from '../../_components/services/web-developement/FAQ/WebFAQ';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/services/web-development', {
    title: 'Custom Web Development Services | Tech Solutionor',
    description: 'Expert web development services using cutting-edge modern technologies to build high-performance web applications.',
  });
}

export default async function WebDevelopmentPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/services/web-development');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Web Development page:', err);
  }

  return (
    <div>
      <CmsJsonLd path="/services/web-development" />
      <WebDevBanner cmsContent={cmsContent} />
      <WebWhyChoose cmsContent={cmsContent} />
      <CommonKeyFeatures serviceKey="web-development" cmsContent={cmsContent} />
      <CommonStruggling serviceKey="web-development" cmsContent={cmsContent} />
      <WebServices cmsContent={cmsContent} />
      <TechnologiesBook serviceKey="web-development" bgColor="#FFFFFF" cmsContent={cmsContent} />
      <WebHireUs cmsContent={cmsContent} />
      <WebFAQ cmsContent={cmsContent} />
    </div>
  );
}

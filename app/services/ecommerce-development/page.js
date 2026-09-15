import React from 'react';
import Banner from '@/app/_components/services/eCommerce-developement/Banner/eCommerceDevBanner';
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook';
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose';
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures';
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling';
import CommonServices from '@/app/_components/services/common/Services/CommonServices';
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs';
import EcommerceFAQ from '@/app/_components/services/eCommerce-developement/FAQ/EcommerceFAQ';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/services/ecommerce-development', {
    title: 'E-commerce Development Services | Tech Solutioner',
    description: 'Scalable and secure e-commerce web and mobile app development services tailored for your business.',
  });
}

export default async function EcommerceDevelopmentPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/services/ecommerce-development');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Ecommerce Development page:', err);
  }

  return (
    <div>
      <CmsJsonLd path="/services/ecommerce-development" />
      <Banner cmsContent={cmsContent} />
      <CommonWhyChoose serviceKey="ecommerce-development" cmsContent={cmsContent} />
      <CommonKeyFeatures serviceKey="ecommerce-development" cmsContent={cmsContent} />
      <CommonStruggling serviceKey="ecommerce-development" cmsContent={cmsContent} />
      <CommonServices serviceKey="ecommerce-development" cmsContent={cmsContent} />
      <TechnologiesBook serviceKey="ecommerce-development" bgColor="#FFFFFF" cmsContent={cmsContent} />
      <CommonHireUs serviceKey="ecommerce-development" cmsContent={cmsContent} />
      <EcommerceFAQ cmsContent={cmsContent} />
    </div>
  );
}

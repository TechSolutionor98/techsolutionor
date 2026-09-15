import React from 'react';
import HireUsBanner from '../../_components/services/hire-us/Banner/HireUsBanner';
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose';
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures';
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling';
import CommonServices from '@/app/_components/services/common/Services/CommonServices';
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs';
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook';
import HireUsForm from '../../_components/services/hire-us/Form/HireUsForm';
import CommonFAQ from '@/app/_components/services/common/FAQ/CommonFAQ';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/services/hire-us', {
    title: 'Hire Dedicated IT & Software Engineers | Tech Solutionor',
    description: 'Hire Tech Solutionor team for expert web development, mobile apps, custom software, and SEO engineering.',
  });
}

export default async function ServicesHireUsPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/services/hire-us');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Services Hire Us page:', err);
  }

  return (
    <div>
      <CmsJsonLd path="/services/hire-us" />
      <HireUsBanner cmsContent={cmsContent} />
      <CommonWhyChoose serviceKey="hire-us" cmsContent={cmsContent} />
      <CommonKeyFeatures serviceKey="hire-us" cmsContent={cmsContent} />
      <CommonStruggling serviceKey="hire-us" cmsContent={cmsContent} />
      <CommonServices serviceKey="hire-us" cmsContent={cmsContent} />
      <TechnologiesBook serviceKey="hire-us" bgColor="#FFFFFF" cmsContent={cmsContent} />
      <CommonHireUs serviceKey="hire-us" cmsContent={cmsContent} />
      <HireUsForm />
      <CommonFAQ serviceKey="hire-us" cmsContent={cmsContent} />
    </div>
  );
}

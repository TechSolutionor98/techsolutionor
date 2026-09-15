import React from 'react';
import ServicesHero from '../_components/ServicesPage/ServicesHero';
import ServicesOverview from '../_components/ServicesPage/ServicesOverview';
import WhatMakesUsStandOut from '../_components/ServicesPage/WhatMakesUsStandOut';
import ProcessSteps from '../_components/ServicesPage/ProcessSteps';
import WhyExpertiseCommitment from '../_components/ServicesPage/WhyExpertiseCommitment';
import ServicesFAQ from '../_components/ServicesPage/ServicesFAQ';
import Newsletter from '../_components/Home/Newsletter/Newsletter';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/services', {
    title: "Our Services - Tech Solutionor",
    description: "Explore the wide range of digital services offered by Tech Solutionor, including web development, mobile apps, software solutions, digital marketing, and more.",
  });
}

export default async function ServicesPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/services');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Services page:', err);
  }

  return (
    <div className="overflow-x-hidden bg-[#FFFFFF]">
      <CmsJsonLd path="/services" />
      <ServicesHero cmsContent={cmsContent} />
      <ServicesOverview />
      <WhatMakesUsStandOut />
      <ProcessSteps />
      <WhyExpertiseCommitment />
      <Newsletter />
      <ServicesFAQ cmsContent={cmsContent} />
    </div>
  );
}

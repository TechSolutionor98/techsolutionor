import React from 'react';
import SEOBanner from '../../_components/services/search-engine-optimization/Banner/SEOBanner';
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook';
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose';
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures';
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling';
import CommonServices from '@/app/_components/services/common/Services/CommonServices';
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs';
import SEOFAQ from '../../_components/services/search-engine-optimization/FAQ/SEOFAQ';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/services/search-engine-optimization', {
    title: "Search Engine Optimization Services - Tech Solutionor",
    description: "Boost your website rankings and organic traffic with Tech Solutionor's expert Search Engine Optimization (SEO) services.",
  });
}

export default async function SearchEngineOptimizationPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/services/search-engine-optimization');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for SEO page:', err);
  }

  return (
    <div>
      <CmsJsonLd path="/services/search-engine-optimization" />
      <SEOBanner cmsContent={cmsContent} />
      <CommonWhyChoose serviceKey="search-engine-optimization" cmsContent={cmsContent} />
      <CommonKeyFeatures serviceKey="search-engine-optimization" cmsContent={cmsContent} />
      <CommonStruggling serviceKey="search-engine-optimization" cmsContent={cmsContent} />
      <CommonServices serviceKey="search-engine-optimization" cmsContent={cmsContent} />
      <TechnologiesBook serviceKey="search-engine-optimization" bgColor="#FFFFFF" cmsContent={cmsContent} />
      <CommonHireUs serviceKey="search-engine-optimization" cmsContent={cmsContent} />
      <SEOFAQ cmsContent={cmsContent} />
    </div>
  );
}

import React from 'react';
import TechnologiesHero from '../_components/Technologies/TechnologiesHero';
import AgencyOverview from '../_components/Technologies/AgencyOverview';
import Newsletter from '../_components/Home/Newsletter/Newsletter';
import TechFAQ from '../_components/Technologies/TechFAQ';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/technologies', {
    title: "Technologies We Use - Tech Solutionor",
    description: "Discover the technologies and tools Tech Solutionor uses to build scalable, high-performance web and mobile solutions for our clients.",
  });
}

export default async function TechnologiesPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Technologies page:', err);
  }

  return (
    <div className="overflow-x-hidden">
      <CmsJsonLd path="/technologies" />
      <TechnologiesHero cmsContent={cmsContent} />
      <AgencyOverview />
      <Newsletter />
      <TechFAQ cmsContent={cmsContent} />
    </div>
  );
}

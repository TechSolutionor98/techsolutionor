import React from 'react';
import AboutHero from '../_components/About/AboutHero';
import WhoWeAre from '../_components/About/WhoWeAre';
import AboutStats from '../_components/About/AboutStats';
import EmpoweringAgency from '../_components/About/EmpoweringAgency';
import WhyChooseUs from '../_components/About/WhyChooseUs';
import WatchUsLive from '../_components/About/WatchUsLive';
import ExperiencePlatforms from '../_components/About/ExperiencePlatforms';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/about-us', {
    title: 'About Us | Tech Solutionor',
    description: 'Learn about Tech Solutionor, our mission, software engineering expertise, and digital transformation capabilities.',
  });
}

export default async function AboutPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/about-us');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for About Us page:', err);
  }

  return (
    <main className="w-full overflow-x-hidden bg-[#FFFFFF]">
      <CmsJsonLd path="/about-us" />
      <AboutHero cmsContent={cmsContent} />
      <WhoWeAre cmsContent={cmsContent} />
      <AboutStats cmsContent={cmsContent} />
      <EmpoweringAgency cmsContent={cmsContent} />
      <WhyChooseUs cmsContent={cmsContent} />
      <WatchUsLive cmsContent={cmsContent} />
      <ExperiencePlatforms cmsContent={cmsContent} />
    </main>
  );
}

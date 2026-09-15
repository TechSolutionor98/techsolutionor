import React from 'react';
import LaravelBanner from '../../_components/Laravel/LaravelBanner/LaravelBanner';
import Framework from '../../_components/Laravel/Framework/Framework';
import LaravelCards from '../../_components/Laravel/LaravelCards/LaravelCards';
import Advantages from '../../_components/Laravel/Advantages/Advantages';
import TechFAQS from '../../_components/Laravel/TechFAQS/TechFAQS';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/laravel', {
    title: 'Laravel Development Services | Tech Solutionor',
    description: 'Custom PHP Laravel development services, API integrations, and enterprise web applications built with Laravel framework.',
  });
}

export default async function LaravelPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/laravel');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Laravel page:', err);
  }

  return (
    <div>
      <CmsJsonLd path="/technologies/laravel" />
      <LaravelBanner cmsContent={cmsContent} />
      <Framework cmsContent={cmsContent} />
      <LaravelCards cmsContent={cmsContent} />
      <Advantages cmsContent={cmsContent} />
      <TechFAQS cmsContent={cmsContent} />
    </div>
  );
}

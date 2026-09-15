import React from 'react';
import CareerPageClient from '../_components/career/CareerPageClient';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/career', {
    title: 'Careers & Job Opportunities - Tech Solutionor',
    description: 'Join our team of visionary engineers, designers, and digital growth specialists. Explore open tech positions and build the future with Tech Solutionor.',
  });
}

export default async function CareerPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/career');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Career page:', err);
  }

  return (
    <>
      <CmsJsonLd path="/career" />
      <CareerPageClient cmsContent={cmsContent} />
    </>
  );
}

import React from 'react';
import BecomeAPartnerContent from './BecomeAPartnerContent';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/become-a-partner', {
    title: 'Become a Partner | Tech Solutionor',
    description: 'Partner with Tech Solutionor to expand your agency capabilities, monetize enterprise referrals, co-engineer high-scale software, and accelerate global business growth.',
  });
}

export default async function BecomeAPartnerPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/become-a-partner');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Become a Partner page:', err);
  }

  return (
    <>
      <CmsJsonLd path="/become-a-partner" />
      <BecomeAPartnerContent cmsContent={cmsContent} />
    </>
  );
}

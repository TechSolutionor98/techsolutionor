import React from 'react';
import POSHero from '../_components/pos-development/POSHero';
import POSBestSoftware from '../_components/pos-development/POSBestSoftware';
import POSKeyBenefits from '../_components/pos-development/POSKeyBenefits';
import POSPowerfulFeatures from '../_components/pos-development/POSPowerfulFeatures';
import POSFAQ from '../_components/pos-development/POSFAQ';
import Newsletter from '../_components/Home/Newsletter/Newsletter';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/pos-development', {
    title: 'POS Development Services - Tech Solutionor',
    description: 'Get custom POS development solutions with Tech Solutionor. Build reliable, scalable, and efficient systems for your business today.',
  });
}

export default async function POSDevelopmentPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/pos-development');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for POS Development page:', err);
  }

  return (
    <main>
      <CmsJsonLd path="/pos-development" />
      <POSHero cmsContent={cmsContent} />
      <POSBestSoftware />
      <POSKeyBenefits />
      <POSPowerfulFeatures />
      <Newsletter />
      <POSFAQ cmsContent={cmsContent} />
    </main>
  );
}

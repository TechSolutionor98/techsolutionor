import React from 'react';
import TermsAndConditionsContent from './TermsAndConditionsContent';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';

export async function generateMetadata() {
  return generateCmsMetadata('/terms-and-conditions', {
    title: 'Terms & Conditions | Tech Solutionor',
    description: 'Review the official Terms & Conditions governing the use of Tech Solutionor website, software engineering, and technology consulting services.',
  });
}

export default async function TermsAndConditionsPage() {
  const cmsContent = await getCmsData('/terms-and-conditions');
  return <TermsAndConditionsContent cmsContent={cmsContent} />;
}

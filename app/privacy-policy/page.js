import React from 'react';
import PrivacyPolicyContent from './PrivacyPolicyContent';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';

export async function generateMetadata() {
  return generateCmsMetadata('/privacy-policy', {
    title: 'Privacy Policy | Tech Solutionor',
    description: 'Read the official Privacy Policy for Tech Solutionor. Learn how we collect, process, safeguard, and respect your personal and business data.',
  });
}

export default async function PrivacyPolicyPage() {
  const cmsContent = await getCmsData('/privacy-policy');
  return <PrivacyPolicyContent cmsContent={cmsContent} />;
}

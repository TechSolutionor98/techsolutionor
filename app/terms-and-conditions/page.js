import React from 'react';
import TermsAndConditionsContent from './TermsAndConditionsContent';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export async function generateMetadata() {
  return generateCmsMetadata('/terms-and-conditions', {
    title: 'Terms & Conditions | Tech Solutionor',
    description: 'Review the official Terms & Conditions governing the use of Tech Solutionor website, software engineering, and technology consulting services.',
  });
}

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsContent />;
}

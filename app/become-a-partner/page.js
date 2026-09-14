import React from 'react';
import BecomeAPartnerContent from './BecomeAPartnerContent';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export async function generateMetadata() {
  return generateCmsMetadata('/become-a-partner', {
    title: 'Become a Partner | Tech Solutionor',
    description: 'Partner with Tech Solutionor to expand your agency capabilities, monetize enterprise referrals, co-engineer high-scale software, and accelerate global business growth.',
  });
}

export default function BecomeAPartnerPage() {
  return <BecomeAPartnerContent />;
}

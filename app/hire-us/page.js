import React from 'react';
import ServiceHireUsPage from '../services/hire-us/page';
import { generateCmsMetadata } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/hire-us', {
    title: 'Hire Dedicated Developers & IT Experts | Tech Solutionor',
    description: 'Hire top-tier software developers, engineers, and digital experts from Tech Solutionor.',
  });
}

export default function HireUsPage() {
  return (
    <>
      <CmsJsonLd path="/hire-us" />
      <ServiceHireUsPage />
    </>
  );
}

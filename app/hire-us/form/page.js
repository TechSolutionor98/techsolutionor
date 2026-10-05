import React from 'react';
import HireResourceForm from '@/app/_components/services/hire-us/HireResourceForm/HireResourceForm';
import { generateCmsMetadata } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/hire-us/form', {
    title: 'Hire Dedicated IT & Digital Marketing Resources | Tech Solutionor',
    description: 'Looking for a skilled professional, multiple resources, a dedicated team or an agency? Submit your requirements and scale your team with Tech Solutionor.',
  });
}

export default function HireUsFormPage() {
  return (
    <>
      <CmsJsonLd path="/hire-us/form" />
      <HireResourceForm />
    </>
  );
}

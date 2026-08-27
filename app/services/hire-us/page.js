import React from 'react';
import HireUsBanner from '../../_components/services/hire-us/Banner/HireUsBanner';
import WhyChooseUs from '../../_components/services/hire-us/WhyChooseUs/WhyChooseUs';
import KeyBenefits from '../../_components/services/hire-us/KeyBenefits/KeyBenefits';
import AtoZSolution from '../../_components/services/hire-us/AtoZSolution/AtoZSolution';
import HireUsForm from '../../_components/services/hire-us/Form/HireUsForm';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/hire-us', {
    title: 'Hire Us | Tech Solutionor',
    description: 'Hire Tech Solutionor team for expert web development, mobile apps, custom software, and SEO engineering.',
  });
}

function page() {
  return (
    <div>
      <HireUsBanner />
      <WhyChooseUs />
      <KeyBenefits />
      <AtoZSolution />
      <HireUsForm />
    </div>
  );
}

export default page;

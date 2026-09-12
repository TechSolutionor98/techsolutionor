import React from 'react';
import HireUsBanner from '../../_components/services/hire-us/Banner/HireUsBanner';
import CommonWhyChoose from '@/app/_components/services/common/WhyChoose/CommonWhyChoose';
import CommonKeyFeatures from '@/app/_components/services/common/KeyFeatures/CommonKeyFeatures';
import CommonStruggling from '@/app/_components/services/common/Struggling/CommonStruggling';
import CommonServices from '@/app/_components/services/common/Services/CommonServices';
import CommonHireUs from '@/app/_components/services/common/HireUs/CommonHireUs';
import KeyBenefits from '../../_components/services/hire-us/KeyBenefits/KeyBenefits';
import TechnologiesBook from '@/app/_components/services/common/TechnologiesBook/TechnologiesBook';
import AtoZSolution from '../../_components/services/hire-us/AtoZSolution/AtoZSolution';
import HireUsForm from '../../_components/services/hire-us/Form/HireUsForm';
import CommonFAQ from '@/app/_components/services/common/FAQ/CommonFAQ';
import { generateCmsMetadata } from '@/lib/cms-fetch';

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
      <CommonWhyChoose serviceKey="hire-us" />
      <CommonKeyFeatures serviceKey="hire-us" />
      <CommonStruggling serviceKey="hire-us" />
      <CommonServices serviceKey="hire-us" />
      {/* <KeyBenefits /> */}
      <TechnologiesBook serviceKey="hire-us" bgColor="#FFFFFF" />
      {/* <AtoZSolution /> */}
      <CommonHireUs serviceKey="hire-us" />
      <HireUsForm />
      <CommonFAQ serviceKey="hire-us" />
    </div>
  );
}

export default page;

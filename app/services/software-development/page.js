import React from 'react';
import SoftwareDevBanner from '@/app/_components/services/software-developement/Banner/SoftwareDevBanner';
import WhoWeAre from '@/app/_components/services/software-developement/WhoWeAre/WhoWeAre';
import SoftwareServices from '@/app/_components/services/software-developement/SoftwareServices/SoftwareServices';
import TechnologiesWeUse from '@/app/_components/services/software-developement/TechnologiesWeUse/TechnologiesWeUse';
import SoftwareWhyChoose from '@/app/_components/services/software-developement/WhyChoose/SoftwareWhyChoose';
import HireUs from '@/app/_components/services/eCommerce-developement/HireUs/HireUs';
import SoftwareFAQ from '@/app/_components/services/software-developement/FAQ/SoftwareFAQ';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/services/software-development', {
    title: 'Custom Software Development Services in Dubai & UAE | Tech Solutioner',
    description: 'Leading software development company in Dubai providing enterprise software, SaaS platforms, and custom digital solutions.',
  });
}

export default function SoftwareDevelopmentPage() {
  return (
    <div>
      <SoftwareDevBanner />
      <WhoWeAre />
      <SoftwareServices />
      <TechnologiesWeUse />
      <SoftwareWhyChoose />
      <HireUs
        line1="Ready to scale your digital presence in Dubai and across the UAE?"
        line2="Choose a trusted team for custom software and ongoing support."
      />
      <SoftwareFAQ />
    </div>
  );
}

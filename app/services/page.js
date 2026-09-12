import React from 'react';
import ServicesHero from '../_components/ServicesPage/ServicesHero';
import ServicesOverview from '../_components/ServicesPage/ServicesOverview';
import WhatMakesUsStandOut from '../_components/ServicesPage/WhatMakesUsStandOut';
import ProcessSteps from '../_components/ServicesPage/ProcessSteps';
import WhyExpertiseCommitment from '../_components/ServicesPage/WhyExpertiseCommitment';
import ServicesFAQ from '../_components/ServicesPage/ServicesFAQ';
import Newsletter from '../_components/Home/Newsletter/Newsletter';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export async function generateMetadata() {
  return generateCmsMetadata('/services', {
    title: "Our Services - Tech Solutionor",
    description: "Explore the wide range of digital services offered by Tech Solutionor, including web development, mobile apps, software solutions, digital marketing, and more.",
  });
}

const ServicesPage = () => {
    return (
        <div className="overflow-x-hidden bg-[#FFFFFF]">
            <ServicesHero />
            <ServicesOverview />
            <WhatMakesUsStandOut />
            <ProcessSteps />
            <WhyExpertiseCommitment />
            <Newsletter />
            <ServicesFAQ />
        </div>
    );
};

export default ServicesPage;


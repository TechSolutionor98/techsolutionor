import React from 'react';
import ServicesPageHero from '../_components/ServicesPage/ServicesPageHero';
import OurServicesGrid from '../_components/ServicesPage/OurServicesGrid';
import WhatMakesUsStandOut from '../_components/ServicesPage/WhatMakesUsStandOut';
import ProcessSteps from '../_components/ServicesPage/ProcessSteps';
import WhyExpertiseCommitment from '../_components/ServicesPage/WhyExpertiseCommitment';
import ServicesFAQ from '../_components/ServicesPage/ServicesFAQ';
import Newsletter from '../_components/Home/Newsletter/Newsletter';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/services', {
    title: "Our Services - Tech Solutionor",
    description: "Explore the wide range of digital services offered by Tech Solutionor, including web development, mobile apps, software solutions, digital marketing, and more.",
  });
}

const ServicesPage = () => {
    return (
        <div className="overflow-x-hidden">
            <ServicesPageHero />
            <OurServicesGrid />
            <WhatMakesUsStandOut />
            <ProcessSteps />
            <WhyExpertiseCommitment />
            <Newsletter />
            <ServicesFAQ />
        </div>
    );
};

export default ServicesPage;

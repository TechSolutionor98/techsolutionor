import React from 'react';
import TechnologiesHero from '../_components/Technologies/TechnologiesHero';
import AgencyOverview from '../_components/Technologies/AgencyOverview';
import TrendingTechServices from '../_components/Technologies/TrendingTechServices';
import Newsletter from '../_components/Home/Newsletter/Newsletter';
import TechFAQ from '../_components/Technologies/TechFAQ';
import ContactExperts from '../_components/Technologies/ContactExperts';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies', {
    title: "Technologies We Use - Tech Solutionor",
    description: "Discover the technologies and tools Tech Solutionor uses to build scalable, high-performance web and mobile solutions for our clients.",
  });
}

const TechnologiesPage = () => {
    return (
        <div className="overflow-x-hidden">
            <TechnologiesHero />
            <AgencyOverview />
            <TrendingTechServices />
            <Newsletter />
            <TechFAQ />
            <ContactExperts />
        </div>
    );
};

export default TechnologiesPage;

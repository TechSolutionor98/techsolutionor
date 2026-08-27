import React from 'react';
import AboutHero from '../_components/About/AboutHero';
import WhoWeAre from '../_components/About/WhoWeAre';
import EmpoweringAgency from '../_components/About/EmpoweringAgency';
import WhyChooseUs from '../_components/About/WhyChooseUs';
import WatchUsLive from '../_components/About/WatchUsLive';
import ExperiencePlatforms from '../_components/About/ExperiencePlatforms';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/about-us', {
    title: 'About Us | Tech Solutionor',
    description: 'Learn about Tech Solutionor, our mission, software engineering expertise, and digital transformation capabilities.',
  });
}

const AboutPage = () => {
    return (
        <div className="overflow-x-hidden">
            <AboutHero />
            <WhoWeAre />
            <EmpoweringAgency />
            <WhyChooseUs />
            <WatchUsLive />
            <ExperiencePlatforms />
        </div>
    );
};

export default AboutPage;

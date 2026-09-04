import React from 'react';
import AboutHero from '../_components/About/AboutHero';
import WhoWeAre from '../_components/About/WhoWeAre';
import AboutStats from '../_components/About/AboutStats';
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
        <main className="w-full overflow-x-hidden bg-[#FFFFFF]">
            <AboutHero />
            <WhoWeAre />
            <AboutStats />
            <EmpoweringAgency />
            <WhyChooseUs />
            <WatchUsLive />
            <ExperiencePlatforms />
        </main>
    );
};

export default AboutPage;

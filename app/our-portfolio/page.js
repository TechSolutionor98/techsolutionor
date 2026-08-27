import React from 'react';
import PortfolioBanner from '../_components/Portfolio/PortfolioBanner/PortfolioBanner';
import PortfolioQuote from '../_components/Portfolio/PortfolioQuote/PortfolioQuote';
import PortfolioProjects from '../_components/Portfolio/PortfolioProjects/PortfolioProjects';
import Newsletter from '../_components/Home/Newsletter/Newsletter';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/our-portfolio', {
    title: 'Our Portfolio | Tech Solutionor Projects',
    description: 'Explore our client portfolio showcasing custom websites, mobile applications, e-commerce platforms, and digital solutions.',
  });
}

function page() {
  return (
    <div>
      <PortfolioBanner />
      <PortfolioQuote />
      <PortfolioProjects />
      <Newsletter />
    </div>
  );
}

export default page;

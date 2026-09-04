import React from 'react';
import PortfolioBanner from '../_components/Portfolio/PortfolioBanner/PortfolioBanner';
import PortfolioQuote from '../_components/Portfolio/PortfolioQuote/PortfolioQuote';
import PortfolioProjects from '../_components/Portfolio/PortfolioProjects/PortfolioProjects';
import PortfolioHireUs from '../_components/Portfolio/PortfolioHireUs/PortfolioHireUs';
import Newsletter from '../_components/Home/Newsletter/Newsletter';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/our-portfolio', {
    title: 'Our Portfolio & Case Studies | TechSolutionor',
    description:
      'Explore our client portfolio showcasing custom software, e-commerce stores, cloud POS, and digital solutions delivered with measurable business results.',
  });
}

function page() {
  return (
    <main className="bg-[#FBFDFC] min-h-screen text-[#111827]">
      <PortfolioBanner />
      <PortfolioQuote />
      <PortfolioProjects />
      <PortfolioHireUs />
      <Newsletter />
    </main>
  );
}

export default page;

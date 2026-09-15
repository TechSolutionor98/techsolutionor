import React from 'react';
import PortfolioBanner from '../_components/Portfolio/PortfolioBanner/PortfolioBanner';
import PortfolioQuote from '../_components/Portfolio/PortfolioQuote/PortfolioQuote';
import PortfolioProjects from '../_components/Portfolio/PortfolioProjects/PortfolioProjects';
import Newsletter from '../_components/Home/Newsletter/Newsletter';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/our-portfolio', {
    title: 'Our Portfolio & Case Studies | TechSolutionor',
    description:
      'Explore our client portfolio showcasing custom software, e-commerce stores, cloud POS, and digital solutions delivered with measurable business results.',
  });
}

export default async function OurPortfolioPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/our-portfolio');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Portfolio page:', err);
  }

  return (
    <main className="bg-[#FBFDFC] min-h-screen text-[#111827]">
      <CmsJsonLd path="/our-portfolio" />
      <PortfolioBanner cmsContent={cmsContent} />
      <PortfolioQuote cmsContent={cmsContent} />
      <PortfolioProjects cmsContent={cmsContent} />
      <Newsletter />
    </main>
  );
}

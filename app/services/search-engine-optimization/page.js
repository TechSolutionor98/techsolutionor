import React from 'react';
import SEOBanner from '../../_components/services/search-engine-optimization/Banner/SEOBanner';
import SEOFramework from '../../_components/services/search-engine-optimization/Framework/SEOFramework';
import SEOServices from '../../_components/services/search-engine-optimization/Services/SEOServices';
import SEOWhyWork from '../../_components/services/search-engine-optimization/WhyWork/SEOWhyWork';
import SEOAbout from '../../_components/services/search-engine-optimization/About/SEOAbout';
import Newsletter from '../../_components/Home/Newsletter/Newsletter';
import SEOFAQ from '../../_components/services/search-engine-optimization/FAQ/SEOFAQ';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/services/search-engine-optimization', {
    title: "Search Engine Optimization Services - Tech Solutionor",
    description: "Boost your website rankings and organic traffic with Tech Solutionor's expert Search Engine Optimization (SEO) services.",
  });
}

const Page = () => {
  return (
    <div>
      <SEOBanner />
      <SEOFramework />
      <SEOServices />
      <SEOWhyWork />
      <SEOAbout />
      <Newsletter />
      <SEOFAQ />
    </div>
  );
};

export default Page;

import React from 'react';
import POSHero from '../_components/pos-development/POSHero';
import POSBestSoftware from '../_components/pos-development/POSBestSoftware';
import POSKeyBenefits from '../_components/pos-development/POSKeyBenefits';
import POSPowerfulFeatures from '../_components/pos-development/POSPowerfulFeatures';
import POSFAQ from '../_components/pos-development/POSFAQ';
import Newsletter from '../_components/Home/Newsletter/Newsletter';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/pos-development', {
    title: 'POS Development Services - Tech Solutionor',
    description: 'Get custom POS development solutions with Tech Solutionor. Build reliable, scalable, and efficient systems for your business today.',
  });
}

const page = () => {
    return (
        <main>
            <POSHero />
            <POSBestSoftware />
            <POSKeyBenefits />
            <POSPowerfulFeatures />
            <Newsletter />
            <POSFAQ />
        </main>
    );
};

export default page;

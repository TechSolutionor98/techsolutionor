import React from 'react';
import FigmaBanner from '../../_components/Figma/FigmaBanner/JavaBanner';
import FigmaFramework from '../../_components/Figma/FigmaFramework/Framework';
import FigmaCards from '../../_components/Figma/FigmaCards/LaravelCards';
import FigmaAdvantages from '../../_components/Figma/FigmaAdvantages/FigmaAdvantages';
import FigmaHireUs from '../../_components/Figma/HireUs/FigmaHireUs';
import FigmaFAQ from '../../_components/Figma/FigmaFAQ/FigmaFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/figma', {
    title: 'Figma UI/UX Design Services | TechSolutionor',
    description: 'Figma interface design and prototyping technology services.',
  });
}

export default async function FigmaPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/figma');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Figma page:', err);
  }

  return (
    <div>
      <FigmaBanner cmsContent={cmsContent}/>
      <FigmaFramework cmsContent={cmsContent}/>
      <FigmaCards cmsContent={cmsContent}/>
      <FigmaAdvantages cmsContent={cmsContent}/>
      <FigmaHireUs cmsContent={cmsContent}/>
      <FigmaFAQ cmsContent={cmsContent}/>
    </div>
  );
}

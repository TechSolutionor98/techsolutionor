import React from 'react';
import CssBanner from '../../_components/Css/CssBanner/JavaBanner';
import CssFramework from '../../_components/Css/CssFramework/Framework';
import CssCards from '../../_components/Css/CssCards/LaravelCards';
import CssAdvantages from '../../_components/Css/CssAdvantages/CssAdvantages';
import CssHireUs from '../../_components/Css/HireUs/CssHireUs';
import CssFAQ from '../../_components/Css/CssFAQ/CssFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/css', {
    title: 'CSS Web Design Services | TechSolutionor',
    description: 'CSS styling technology for modern, responsive web design and layout.',
  });
}

export default async function CssPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/css');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for CSS page:', err);
  }

  return (
    <div>
      <CssBanner cmsContent={cmsContent}/>
      <CssFramework cmsContent={cmsContent}/>
      <CssCards cmsContent={cmsContent}/>
      <CssAdvantages cmsContent={cmsContent}/>
      <CssHireUs cmsContent={cmsContent}/>
      <CssFAQ cmsContent={cmsContent}/>
    </div>
  );
}

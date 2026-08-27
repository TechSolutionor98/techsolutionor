import React from 'react';
import HTMLBanner from '../../_components/Html/HTMLLaravelBanner/LaravelBanner';
import HtmlFramework from '../../_components/Html/HTMLFramework/Framework';
import HtmlCards from '../../_components/Html/HTMLLaravelCards/LaravelCards';
import HtmlAdvantages from '../../_components/Html/HtmlAdvantages/HtmlAdvantages';
import HtmlHireUs from '../../_components/Html/HireUs/HtmlHireUs';
import HtmlFAQ from '../../_components/Html/HtmlFAQ/HtmlFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/html', {
    title: 'HTML Web Development Services | TechSolutionor',
    description: 'HTML web development services enabling structured, accessible, and responsive web pages.',
  });
}

export default async function HtmlPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/html');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for HTML page:', err);
  }

  return (
    <div>
      <HTMLBanner cmsContent={cmsContent}/>
      <HtmlFramework cmsContent={cmsContent}/>
      <HtmlCards cmsContent={cmsContent}/>
      <HtmlAdvantages cmsContent={cmsContent}/>
      <HtmlHireUs cmsContent={cmsContent}/>
      <HtmlFAQ cmsContent={cmsContent}/>
    </div>
  );
}

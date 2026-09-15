import React from 'react';
import ReactBanner from '../../_components/React/ReactBanner/ReactBanner';
import ReactFrameworks from '../../_components/React/ReactFrameworks/Framework';
import ReactCards from '../../_components/React/ReactCards/ReactCards';
import ReactAdvantages from '../../_components/React/ReactAdvantages/ReactAdvantages';
import ReactHireUs from '../../_components/React/HireUs/ReactHireUs';
import ReactFAQ from '../../_components/React/ReactFAQ/ReactFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/react', {
    title: 'React.js Development Services | Tech Solutionor',
    description: 'Expert React.js development services for dynamic, fast-loading, and interactive single page applications.',
  });
}

export default async function ReactjsPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/react');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for React page:', err);
  }

  return (
    <div>
      <CmsJsonLd path="/technologies/react" />
      <ReactBanner cmsContent={cmsContent} />
      <ReactFrameworks cmsContent={cmsContent} />
      <ReactCards cmsContent={cmsContent} />
      <ReactAdvantages cmsContent={cmsContent} />
      <ReactHireUs cmsContent={cmsContent} />
      <ReactFAQ cmsContent={cmsContent} />
    </div>
  );
}

import React from 'react';
import AngularBanner from '../../_components/Angular/AngularBanner/JavaBanner';
import AngularFramework from '../../_components/Angular/AngularFramework/Framework';
import AngularCards from '../../_components/Angular/AngularCards/LaravelCards';
import AngularAdvantages from '../../_components/Angular/AngularAdvantages/AngularAdvantages';
import AngularHireUs from '../../_components/Angular/HireUs/AngularHireUs';
import AngularFAQ from '../../_components/Angular/AngularFAQ/AngularFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/angular', {
    title: 'Angular Development Services | TechSolutionor',
    description: 'Angular framework for building modern, scalable web applications.',
  });
}

export default async function AngularPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/angular');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Angular page:', err);
  }

  return (
    <div>
      <AngularBanner cmsContent={cmsContent}/>
      <AngularFramework cmsContent={cmsContent}/>
      <AngularCards cmsContent={cmsContent}/>
      <AngularAdvantages cmsContent={cmsContent}/>
      <AngularHireUs cmsContent={cmsContent}/>
      <AngularFAQ cmsContent={cmsContent}/>
    </div>
  );
}

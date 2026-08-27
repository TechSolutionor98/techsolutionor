import React from 'react';
import PhpBanner from '../../_components/Php/PhpLaravelBanner/LaravelBanner';
import PhpFramework from '../../_components/Php/PhpFramework/Framework';
import PhpCards from '../../_components/Php/PhpLaravelCards/LaravelCards';
import PhpAdvantages from '../../_components/Php/PhpAdvantages/PhpAdvantages';
import PhpHireUs from '../../_components/Php/HireUs/PhpHireUs';
import PhpFAQ from '../../_components/Php/PhpFAQ/PhpFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/php', {
    title: 'PHP Web Development Services | TechSolutionor',
    description: 'PHP development services for dynamic and scalable web applications.',
  });
}

export default async function PhpPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/php');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for PHP page:', err);
  }

  return (
    <div>
      <PhpBanner cmsContent={cmsContent}/>
      <PhpFramework cmsContent={cmsContent}/>
      <PhpCards cmsContent={cmsContent}/>
      <PhpAdvantages cmsContent={cmsContent}/>
      <PhpHireUs cmsContent={cmsContent}/>
      <PhpFAQ cmsContent={cmsContent}/>
    </div>
  );
}

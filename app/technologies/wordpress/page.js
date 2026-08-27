import React from 'react';
import WpBanner from '../../_components/Wp/WpLaravelBanner/LaravelBanner';
import WpFramework from '../../_components/Wp/WpFramework/Framework';
import WpCards from '../../_components/Wp/WpLaravelCards/LaravelCards';
import WpAdvantages from '../../_components/Wp/WpAdvantages/WpAdvantages';
import WpHireUs from '../../_components/Wp/HireUs/WpHireUs';
import WpFAQ from '../../_components/Wp/WpFAQ/WpFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/wordpress', {
    title: 'WordPress Web Development Services | TechSolutionor',
    description: 'WordPress development services for versatile, dynamic, and user-friendly websites.',
  });
}

export default async function WordPressPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/wordpress');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for WordPress page:', err);
  }

  return (
    <div>
      <WpBanner cmsContent={cmsContent}/>
      <WpFramework cmsContent={cmsContent}/>
      <WpCards cmsContent={cmsContent}/>
      <WpAdvantages cmsContent={cmsContent}/>
      <WpHireUs cmsContent={cmsContent}/>
      <WpFAQ cmsContent={cmsContent}/>
    </div>
  );
}

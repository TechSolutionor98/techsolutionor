import React from 'react';
import MetaBanner from '../../_components/Meta/MetaBanner/JavaBanner';
import MetaFramework from '../../_components/Meta/MetaFramework/Framework';
import MetaCards from '../../_components/Meta/MetaCards/LaravelCards';
import MetaAdvantages from '../../_components/Meta/MetaAdvantages/MetaAdvantages';
import MetaHireUs from '../../_components/Meta/HireUs/MetaHireUs';
import MetaFAQ from '../../_components/Meta/MetaFAQ/MetaFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/meta', {
    title: 'Meta Social Technology Services | TechSolutionor',
    description: 'Meta social platforms and digital experiences technology services.',
  });
}

export default async function MetaPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/meta');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Meta page:', err);
  }

  return (
    <div>
      <MetaBanner cmsContent={cmsContent}/>
      <MetaFramework cmsContent={cmsContent}/>
      <MetaCards cmsContent={cmsContent}/>
      <MetaAdvantages cmsContent={cmsContent}/>
      <MetaHireUs cmsContent={cmsContent}/>
      <MetaFAQ cmsContent={cmsContent}/>
    </div>
  );
}

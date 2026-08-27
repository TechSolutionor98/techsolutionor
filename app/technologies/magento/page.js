import React from 'react';
import MagentoBanner from '../../_components/Magento/MagentoBanner/JavaBanner';
import MagentoFramework from '../../_components/Magento/MagentoFramework/Framework';
import MagentoCards from '../../_components/Magento/MagentoCards/LaravelCards';
import MagentoAdvantages from '../../_components/Magento/MagentoAdvantages/MagentoAdvantages';
import MagentoHireUs from '../../_components/Magento/HireUs/MagentoHireUs';
import MagentoFAQ from '../../_components/Magento/MagentoFAQ/MagentoFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/magento', {
    title: 'Magento eCommerce Development Services | TechSolutionor',
    description: 'Magento eCommerce development services for scalable, secure, and customizable online stores.',
  });
}

export default async function MagentoPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/magento');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Magento page:', err);
  }

  return (
    <div>
      <MagentoBanner cmsContent={cmsContent}/>
      <MagentoFramework cmsContent={cmsContent}/>
      <MagentoCards cmsContent={cmsContent}/>
      <MagentoAdvantages cmsContent={cmsContent}/>
      <MagentoHireUs cmsContent={cmsContent}/>
      <MagentoFAQ cmsContent={cmsContent}/>
    </div>
  );
}

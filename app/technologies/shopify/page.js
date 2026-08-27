import React from 'react';
import ShopifyBanner from '../../_components/Shopify/ShopifyBanner/JavaBanner';
import ShopifyFramework from '../../_components/Shopify/ShopifyFramework/Framework';
import ShopifyCards from '../../_components/Shopify/JsCards/LaravelCards';
import ShopifyAdvantages from '../../_components/Shopify/ShopifyAdvantages/ShopifyAdvantages';
import ShopifyHireUs from '../../_components/Shopify/HireUs/ShopifyHireUs';
import ShopifyFAQ from '../../_components/Shopify/ShopifyFAQ/ShopifyFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/shopify', {
    title: 'Shopify eCommerce Development Services | TechSolutionor',
    description: 'Shopify eCommerce development services for scaling your online store.',
  });
}

export default async function ShopifyPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/shopify');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Shopify page:', err);
  }

  return (
    <div>
      <ShopifyBanner cmsContent={cmsContent}/>
      <ShopifyFramework cmsContent={cmsContent}/>
      <ShopifyCards cmsContent={cmsContent}/>
      <ShopifyAdvantages cmsContent={cmsContent}/>
      <ShopifyHireUs cmsContent={cmsContent}/>
      <ShopifyFAQ cmsContent={cmsContent}/>
    </div>
  );
}

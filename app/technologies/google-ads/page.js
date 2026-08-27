import React from 'react';
import GoogleBanner from '../../_components/GoogleAds/GoogleBanner/JavaBanner';
import GoogleFramework from '../../_components/GoogleAds/GoogleFramework/Framework';
import GoogleCards from '../../_components/GoogleAds/GoogleCards/LaravelCards';
import GoogleAdvantages from '../../_components/GoogleAds/GoogleAdvantages/GoogleAdvantages';
import GoogleHireUs from '../../_components/GoogleAds/HireUs/GoogleHireUs';
import GoogleFAQ from '../../_components/GoogleAds/GoogleFAQ/GoogleFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/google-ads', {
    title: 'Google Ads Management Services | TechSolutionor',
    description: 'Google Ads digital advertising platform for business growth and ROI.',
  });
}

export default async function GoogleAdsPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/google-ads');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Google Ads page:', err);
  }

  return (
    <div>
      <GoogleBanner cmsContent={cmsContent}/>
      <GoogleFramework cmsContent={cmsContent}/>
      <GoogleCards cmsContent={cmsContent}/>
      <GoogleAdvantages cmsContent={cmsContent}/>
      <GoogleHireUs cmsContent={cmsContent}/>
      <GoogleFAQ cmsContent={cmsContent}/>
    </div>
  );
}

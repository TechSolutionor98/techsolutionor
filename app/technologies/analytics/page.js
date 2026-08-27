import React from 'react';
import AnalyticsBanner from '../../_components/Analytics/AnalyticsBanner/JavaBanner';
import AnalyticsFramework from '../../_components/Analytics/AnalyticsFramework/Framework';
import AnalyticsCards from '../../_components/Analytics/AnalyticsCards/LaravelCards';
import AnalyticsAdvantages from '../../_components/Analytics/AnalyticsAdvantages/AnalyticsAdvantages';
import AnalyticsHireUs from '../../_components/Analytics/HireUs/AnalyticsHireUs';
import AnalyticsFAQ from '../../_components/Analytics/AnalyticsFAQ/AnalyticsFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/analytics', {
    title: 'Analytics & Data-Driven Services | TechSolutionor',
    description: 'Data-driven technology for business insights and performance analytics.',
  });
}

export default async function AnalyticsPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/analytics');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Analytics page:', err);
  }

  return (
    <div>
      <AnalyticsBanner cmsContent={cmsContent}/>
      <AnalyticsFramework cmsContent={cmsContent}/>
      <AnalyticsCards cmsContent={cmsContent}/>
      <AnalyticsAdvantages cmsContent={cmsContent}/>
      <AnalyticsHireUs cmsContent={cmsContent}/>
      <AnalyticsFAQ cmsContent={cmsContent}/>
    </div>
  );
}

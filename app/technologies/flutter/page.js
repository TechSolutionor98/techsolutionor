import React from 'react';
import FlutterBanner from '../../_components/Flutter/FlutterBanner/JavaBanner';
import FlutterFramework from '../../_components/Flutter/FlutterFramework/Framework';
import FlutterCards from '../../_components/Flutter/JFlutterCards/LaravelCards';
import FlutterAdvantages from '../../_components/Flutter/FlutterAdvantages/FlutterAdvantages';
import FlutterHireUs from '../../_components/Flutter/HireUs/FlutterHireUs';
import FlutterFAQ from '../../_components/Flutter/FlutterFAQ/FlutterFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/flutter', {
    title: 'Flutter Mobile App Development | TechSolutionor',
    description: 'Flutter cross-platform mobile application development technology services.',
  });
}

export default async function FlutterPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/flutter');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Flutter page:', err);
  }

  return (
    <div>
      <FlutterBanner cmsContent={cmsContent}/>
      <FlutterFramework cmsContent={cmsContent}/>
      <FlutterCards cmsContent={cmsContent}/>
      <FlutterAdvantages cmsContent={cmsContent}/>
      <FlutterHireUs cmsContent={cmsContent}/>
      <FlutterFAQ cmsContent={cmsContent}/>
    </div>
  );
}

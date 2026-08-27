import React from 'react';
import SwiftBanner from '../../_components/Swift/SwiftBanner/JavaBanner';
import SwiftFramework from '../../_components/Swift/SwiftFramework/Framework';
import SwiftCards from '../../_components/Swift/JsCards/LaravelCards';
import SwiftAdvantages from '../../_components/Swift/SwiftAdvantages/SwiftAdvantages';
import SwiftHireUs from '../../_components/Swift/HireUs/SwiftHireUs';
import SwiftFAQ from '../../_components/Swift/SwiftFAQ/SwiftFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/swift', {
    title: 'Swift Development Services | TechSolutionor',
    description: 'Swift development services for fast, safe, and efficient iOS, macOS, and watchOS applications.',
  });
}

export default async function Swift() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/swift');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Swift page:', err);
  }

  return (
    <div>
      <SwiftBanner cmsContent={cmsContent}/>
      <SwiftFramework cmsContent={cmsContent}/>
      <SwiftCards cmsContent={cmsContent}/>
      <SwiftAdvantages cmsContent={cmsContent}/>
      <SwiftHireUs cmsContent={cmsContent}/>
      <SwiftFAQ cmsContent={cmsContent}/>
    </div>
  );
}

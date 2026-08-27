import React from 'react';
import Netanner from '../../_components/DotNet/NetBanner/JavaBanner';
import DotNetAsp from '../../_components/DotNet/DotNetAsp/DotNetAsp';
import DotNetCards from '../../_components/DotNet/DotNetCards/DotNetCards';
import DotNetAdvantages from '../../_components/DotNet/DotNetAdvantages/DotNetAdvantages';
import DotNetHireUs from '../../_components/DotNet/HireUs/DotNetHireUs';
import DotNetFAQ from '../../_components/DotNet/DotNetFAQ/DotNetFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/dotnet', {
    title: '.NET Development Services | TechSolutionor',
    description: '.NET framework development services for scalable web and mobile applications.',
  });
}

export default async function DotNetPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/dotnet');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for .NET page:', err);
  }

  return (
    <div>
      <Netanner cmsContent={cmsContent}/>
      <DotNetAsp cmsContent={cmsContent}/>
      <DotNetCards cmsContent={cmsContent}/>
      <DotNetAdvantages cmsContent={cmsContent}/>
      <DotNetHireUs cmsContent={cmsContent}/>
      <DotNetFAQ cmsContent={cmsContent}/>
    </div>
  );
}

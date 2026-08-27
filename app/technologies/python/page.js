import React from 'react';
import PythonBanner from '../../_components/Python/PythonBanner/PythonBanner';
import PythonFramework from '../../_components/Python/PythonFramework/Framework';
import PythonCards from '../../_components/Python/PythonLaravelCards/LaravelCards';
import PythonAdvantages from '../../_components/Python/PythonAdvantages/PythonAdvantages';
import PythonHireUs from '../../_components/Python/HireUs/PythonHireUs';
import PythonFAQ from '../../_components/Python/PythonFAQ/PythonFAQ';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/python', {
    title: 'Python Development Services | TechSolutionor',
    description: 'Python development services for modern web applications, software, AI, and scalable solutions.',
  });
}

export default async function Page() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/python');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Python page:', err);
  }

  return (
    <div>
      <PythonBanner cmsContent={cmsContent} />
      <PythonFramework cmsContent={cmsContent} />
      <PythonCards cmsContent={cmsContent} />
      <PythonAdvantages cmsContent={cmsContent} />
      <PythonHireUs cmsContent={cmsContent} />
      <PythonFAQ cmsContent={cmsContent} />
    </div>
  );
}

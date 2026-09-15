import React from 'react';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import { getCmsVal } from '@/lib/api-helper';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/go', {
    title: 'Golang Development Services | Tech Solutioner',
    description: 'Scalable cloud-native Go microservices and backend API development services.',
  });
}

export default async function GoTechPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/go');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for Go page:', err);
  }

  const defaultTitle = "Golang Microservices & API Engineering";
  const defaultDesc = "Leverage Go for concurrent, cloud-native backend infrastructure and high-throughput microservices.";

  const title = getCmsVal(cmsContent, defaultTitle);
  const desc = getCmsVal(cmsContent, defaultDesc);

  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-6">
      <CmsJsonLd path="/technologies/go" />
      <div className="max-w-4xl mx-auto space-y-6 text-center">
        <h1 className="text-4xl font-extrabold text-blue-400">{title}</h1>
        <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
          {desc}
        </p>
      </div>
    </div>
  );
}

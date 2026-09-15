import React from 'react';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import { getCmsVal } from '@/lib/api-helper';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/c-plus-plus', {
    title: 'C++ Software Development Services | Tech Solutioner',
    description: 'High-performance C++ software development, systems programming, and high-frequency algorithms.',
  });
}

export default async function CPlusPlusTechPage() {
  let cmsContent = null;
  try {
    const cmsData = await getCmsData('/technologies/c-plus-plus');
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error('Failed to load CMS content for C++ page:', err);
  }

  const defaultTitle = "C++ Engineering & Solutions";
  const defaultDesc = "Delivering high-performance, low-latency C++ applications and system architecture for enterprise demands.";

  const title = getCmsVal(cmsContent, defaultTitle);
  const desc = getCmsVal(cmsContent, defaultDesc);

  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-6">
      <CmsJsonLd path="/technologies/c-plus-plus" />
      <div className="max-w-4xl mx-auto space-y-6 text-center">
        <h1 className="text-4xl font-extrabold text-blue-400">{title}</h1>
        <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
          {desc}
        </p>
      </div>
    </div>
  );
}

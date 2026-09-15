import React from 'react';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import { getCmsVal } from '@/lib/api-helper';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return generateCmsMetadata(`/technologies/${slug}`, {
    title: `${slug.replace(/-/g, ' ').toUpperCase()} | Tech Solutionor`,
    description: `Explore ${slug} technologies and solutions provided by Tech Solutionor.`,
  });
}

export default async function TechSlugPage({ params }) {
  const { slug } = await params;
  const path = `/technologies/${slug}`;

  let cmsContent = null;
  try {
    const cmsData = await getCmsData(path);
    cmsContent = cmsData?.content || null;
  } catch (err) {
    console.error(`Failed to load CMS content for ${path}:`, err);
  }

  const defaultTitle = `${slug.replace(/-/g, ' ')} Technology Solutions`;
  const defaultDesc = `Empowering your business with state-of-the-art ${slug.replace(/-/g, ' ')} development and technical services.`;

  const title = getCmsVal(cmsContent, defaultTitle);
  const desc = getCmsVal(cmsContent, defaultDesc);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <CmsJsonLd path={path} />
      <h1 className="text-4xl font-bold capitalize mb-4">{title}</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {desc}
      </p>
    </div>
  );
}

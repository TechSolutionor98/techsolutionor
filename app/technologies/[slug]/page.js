import React from 'react';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return generateCmsMetadata(`/technologies/${slug}`, {
    title: `${slug.replace(/-/g, ' ').toUpperCase()} | Tech Solutionor`,
    description: `Explore ${slug} technologies and solutions provided by Tech Solutionor.`,
  });
}

export default async function TechSlugPage({ params }) {
  const { slug } = await params;
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold capitalize mb-4">{slug.replace(/-/g, ' ')} Technology Solutions</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Empowering your business with state-of-the-art {slug.replace(/-/g, ' ')} development and technical services.
      </p>
    </div>
  );
}

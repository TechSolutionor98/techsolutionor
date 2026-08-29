import React from 'react';
import HomeClientPage from './HomeClientPage';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';
import fallbackHomeContent from '@/content/home/home.json';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/', {
    title: 'TechSolutionor | Web Development, SEO & Digital Growth Services',
    description: 'TechSolutionor delivers web development, SEO, app development, and digital marketing solutions to help businesses scale.',
  });
}

export default async function HomePage() {
  let cmsData = null;
  try {
    cmsData = await getCmsData('/');
  } catch (err) {
    console.error('Failed to load CMS content for Homepage:', err);
  }

  let serverContent = null;
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const res = await fetch(`${apiBase}/api/admin/content/home`, { 
      cache: 'no-store',
      signal: AbortSignal.timeout(1000)
    });
    if (res.ok) {
      const result = await res.json();
      if (result.ok) {
        serverContent = result.data;
      }
    }
  } catch (err) {
    // Ignore fetch error if server is not reachable
  }

  const mergedContent = {
    ...fallbackHomeContent,
    ...(serverContent || {}),
  };

  return (
    <HomeClientPage
      cmsData={cmsData}
      fallbackContent={mergedContent}
    />
  );
}

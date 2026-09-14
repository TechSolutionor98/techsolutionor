import React from 'react';
import HomeClientPage from './HomeClientPage';
import { getCmsData, generateCmsMetadata } from '@/lib/cms-fetch';
import fallbackHomeContent from '@/content/home/home.json';

export async function generateMetadata() {
  return generateCmsMetadata('/', {
    title: 'TechSolutionor | Web Development, SEO & Digital Growth Services',
    description: 'TechSolutionor delivers web development, SEO, app development, and digital marketing solutions to help businesses scale.',
  });
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
      next: { revalidate: 60 },
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

  let approvedReviews = [];
  try {
    const { getDb } = await import('@/lib/mongodb');
    const db = await getDb();
    const rows = await db.collection('reviews').find({ approved: true }).sort({ createdAt: -1 }).limit(100).toArray();
    approvedReviews = rows.map((r) => ({
      _id: r._id.toString(),
      name: r.name || 'Verified Client',
      message: r.message || r.comment || r.review || '',
      rating: r.rating || 5,
      time: r.time || 'Recently',
      avatar: r.avatar || null,
      source: r.source || 'Google',
      color: r.color || null,
      initial: r.initial || null,
    }));
  } catch (err) {
    console.error('Failed to load approved reviews for HomePage:', err);
  }

  const mergedContent = {
    ...fallbackHomeContent,
    ...(serverContent || {}),
  };

  return (
    <HomeClientPage
      cmsData={cmsData}
      fallbackContent={mergedContent}
      approvedReviews={approvedReviews}
    />
  );
}

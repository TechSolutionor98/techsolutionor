import React from 'react';
import CareerPageClient from '../_components/career/CareerPageClient';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/career', {
    title: 'Careers & Job Opportunities - Tech Solutionor',
    description: 'Join our team of visionary engineers, designers, and digital growth specialists. Explore open tech positions and build the future with Tech Solutionor.',
  });
}

export default function CareerPage() {
  return <CareerPageClient />;
}


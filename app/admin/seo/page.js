import React from 'react';
import SeoOverviewClient from './SeoOverviewClient';
import { getSeoList } from '@/lib/cms-service';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'SEO Manager - Admin' };

export default async function SeoPage() {
  let initialPages = [];
  try {
    const list = await getSeoList();
    initialPages = JSON.parse(JSON.stringify(list || []));
  } catch (err) {
    console.warn('Could not prefetch SEO pages on server:', err?.message || err);
  }

  return (
    <div>
      <h1 className='text-[30px] font-bold'>SEO MANAGER</h1>
      <p className="text-sm text-gray-600">
        Manage meta tags, Open Graph, Twitter cards, schema markup, and sitemap settings for all pages.
      </p>
      <div className="mt-5">
        <SeoOverviewClient initialPages={initialPages} />
      </div>
    </div>
  );
}

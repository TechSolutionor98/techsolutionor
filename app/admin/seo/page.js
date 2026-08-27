import React from 'react';
import SeoOverviewClient from './SeoOverviewClient';
import { getApiBase } from '@/lib/api-helper';
import { getSeoList } from '@/lib/cms-service';

export const metadata = { title: 'SEO Manager - Admin' };
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SeoPage() {
  const apiBase = getApiBase();
  let pages = [];

  try {
    pages = await getSeoList();
  } catch (err) {
    console.error('Failed to fetch SEO data', err);
  }

  return (
    <div>
      <h1 className='text-[30px] font-bold'>SEO MANAGER</h1>
      <p className="text-sm text-gray-600">
        Manage meta tags, Open Graph, Twitter cards, schema markup, and sitemap settings for all pages.
      </p>
      <div className="mt-5">
        <SeoOverviewClient initialPages={pages} apiBase={apiBase} />
      </div>
    </div>
  );
}

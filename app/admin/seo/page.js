import React from 'react';
import SeoOverviewClient from './SeoOverviewClient';

export const metadata = { title: 'SEO Manager - Admin' };

export default function SeoPage() {
  return (
    <div>
      <h1 className='text-[30px] font-bold'>SEO MANAGER</h1>
      <p className="text-sm text-gray-600">
        Manage meta tags, Open Graph, Twitter cards, schema markup, and sitemap settings for all pages.
      </p>
      <div className="mt-5">
        <SeoOverviewClient initialPages={[]} />
      </div>
    </div>
  );
}


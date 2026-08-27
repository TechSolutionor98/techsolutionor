import React from 'react';
import RedirectsClient from './RedirectsClient';
import { getApiBase } from '@/lib/api-helper';
import { getRedirectsList } from '@/lib/cms-service';

export const metadata = { title: 'URL Redirects - Admin' };
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function RedirectsPage() {
  const apiBase = getApiBase();
  let redirects = [];
  let fetchError = null;

  try {
    const list = await getRedirectsList();
    // Ensure clean JSON serialization
    redirects = JSON.parse(JSON.stringify(list)) || [];
  } catch (err) {
    console.error('Failed to fetch redirects in server page:', err);
    fetchError = 'Could not load redirect rules from database.';
  }

  return (
    <div>
      <h1 className='text-[30px] font-bold'>URL REDIRECTS</h1>
      <p className="text-sm text-gray-600">
        Manage your website SEO URL redirects. Setup 301 (Permanent) or 302 (Temporary) redirects.
      </p>
      <div className="mt-5">
        <RedirectsClient initialRedirects={redirects} apiBase={apiBase} initialError={fetchError} />
      </div>
    </div>
  );
}

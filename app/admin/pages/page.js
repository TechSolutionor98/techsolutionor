import React from 'react';
import PagesClient from './PagesClient';
import { getRoutesList } from '@/lib/cms-service';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Pages - Admin' };

export default async function PagesPage() {
  let initialRoutes = [];
  try {
    const list = await getRoutesList('default');
    initialRoutes = JSON.parse(JSON.stringify(list || []));
  } catch (err) {
    console.warn('Could not prefetch routes on server:', err?.message || err);
  }

  return (
    <div>
      <h1 className='text-[30px] font-bold'>PAGES & ROUTES</h1>
      <p className="text-sm text-gray-600">
        Manage your website pages, scan routes, and control content.
      </p>
      <div className="mt-5">
        <PagesClient initialRoutes={initialRoutes} />
      </div>
    </div>
  );
}

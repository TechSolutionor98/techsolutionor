import React from 'react';
import PagesClient from './PagesClient';

export const metadata = { title: 'Pages - Admin' };

export default function PagesPage() {
  return (
    <div>
      <h1 className='text-[30px] font-bold'>PAGES & ROUTES</h1>
      <p className="text-sm text-gray-600">
        Manage your website pages, scan routes, and control content.
      </p>
      <div className="mt-5">
        <PagesClient initialRoutes={[]} />
      </div>
    </div>
  );
}


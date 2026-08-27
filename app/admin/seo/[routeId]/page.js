import React from 'react';
import SeoEditorClient from './SeoEditorClient';
import { ObjectId } from 'mongodb';
import { getApiBase } from '@/lib/api-helper';
import { getRoutesList, getSeoEntry } from '@/lib/cms-service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
  return { title: 'Edit SEO - Admin' };
}

export default async function SeoEditPage({ params }) {
  const { routeId } = await params;
  const apiBase = getApiBase();
  
  let seoData = null;
  let routeData = null;
  let isNew = true;

  try {
    const routes = await getRoutesList();
    routeData = routes?.find(r => r._id === routeId) || null;

    const result = await getSeoEntry(routeId);
    seoData = result.seo;
    isNew = result.isNew;
  } catch (err) {
    console.error('Failed to fetch SEO data', err);
  }

  return (
    <div>
      <h1 className='text-[30px] font-bold'>EDIT SEO</h1>
      <p className="text-sm text-gray-600 mb-1">
        {routeData ? (
          <>Managing SEO for: <code className="font-mono bg-gray-100 px-2 py-0.5 rounded text-[#20507C]">{routeData.path}</code></>
        ) : (
          'Loading page information...'
        )}
      </p>
      <div className="mt-5">
        <SeoEditorClient
          initialSeo={seoData}
          routeId={routeId}
          routePath={routeData?.path || ''}
          apiBase={apiBase}
          isNew={isNew}
        />
      </div>
    </div>
  );
}

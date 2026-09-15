import React from 'react';
import { getCmsSeo, getCmsJsonLd } from '@/lib/cms-fetch';

export default async function CmsJsonLd({ path }) {
  if (!path) return null;
  try {
    const seo = await getCmsSeo(path);
    if (!seo || !seo.schema) return null;
    const jsonLd = getCmsJsonLd(seo, path);
    if (!jsonLd) return null;

    const jsonString = typeof jsonLd === 'string' ? jsonLd : JSON.stringify(jsonLd);

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonString }}
      />
    );
  } catch (err) {
    console.error(`Error rendering CmsJsonLd for ${path}:`, err);
    return null;
  }
}

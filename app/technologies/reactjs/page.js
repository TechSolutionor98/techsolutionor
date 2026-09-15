import React from 'react';
import ReactPage from '../react/page';
import { generateCmsMetadata } from '@/lib/cms-fetch';
import CmsJsonLd from '@/components/CmsJsonLd';

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/reactjs', {
    title: 'React.js Development Services | Tech Solutionor',
    description: 'Expert React.js development services for dynamic, fast-loading, and interactive single page applications.',
  });
}

export default function ReactJsPage() {
  return (
    <>
      <CmsJsonLd path="/technologies/reactjs" />
      <ReactPage />
    </>
  );
}

import React from 'react';
import RedirectsClient from './RedirectsClient';

export const metadata = { title: 'URL Redirects - Admin' };

export default function RedirectsPage() {
  return (
    <div>
      <h1 className='text-[30px] font-bold'>URL REDIRECTS</h1>
      <p className="text-sm text-gray-600">
        Manage your website SEO URL redirects. Setup 301 (Permanent) or 302 (Temporary) redirects.
      </p>
      <div className="mt-5">
        <RedirectsClient initialRedirects={[]} />
      </div>
    </div>
  );
}


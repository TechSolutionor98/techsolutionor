import React from 'react';
import LogoClient from './LogoClient';
import { getApiBase } from '@/lib/api-helper';
import { getLogo } from '@/lib/cms-service';

export const metadata = { title: 'Logo Management - Admin' };
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LogosPage() {
  const apiBase = getApiBase();
  let currentLogo = '/Images/footerlogo.png';
  
  try {
    currentLogo = await getLogo();
  } catch (err) {
    console.error('Failed to fetch current logo', err);
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Logo Management</h2>
      <p className="text-gray-600 mb-6">
        Manage your website logo. Changes will reflect across the entire website including the footer.
      </p>
      
      <LogoClient currentLogo={currentLogo} apiBase={apiBase} />
    </div>
  );
}

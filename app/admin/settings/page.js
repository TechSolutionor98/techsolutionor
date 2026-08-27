import React from 'react';
import SettingsClient from './SettingsClient';
import { getApiBase } from '@/lib/api-helper';
import { getSettings } from '@/lib/cms-service';

export const metadata = {
  title: 'Website Settings - Admin',
};
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SettingsPage() {
  const apiBase = getApiBase();
  let settings = {
    phone: '',
    email: '',
    address: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    pinterest: '',
    tiktok: '',
    telegram: '',
    snapchat: '',
    whatsapp: '',
    reddit: '',
    threads: '',
    googleAnalyticsId: '',
    googleTagManagerId: '',
    facebookPixelId: '',
    customHeadScript: '',
    customBodyScript: '',
    thirdPartyApps: []
  };

  try {
    const data = await getSettings();
    if (data && typeof data === 'object') {
      settings = { ...settings, ...data };
    }
  } catch (err) {
    console.error('Error fetching settings', err);
  }

  return (
    <div>
      <h1 className='text-[30px] font-bold '>BUSINESS SETTINGS</h1>
        <p className="text-sm text-gray-600 ">Manage your website settings and analytics pixels</p>

      <div className="bg-white p-6 rounded shadow mt-5">
        <SettingsClient initialSettings={settings} apiBase={apiBase} />
      </div>
    </div>
  );
}

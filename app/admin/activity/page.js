import React from 'react';
import ActivityClient from './ActivityClient';
import { getApiBase } from '@/lib/api-helper';
import { getActivityLogs } from '@/lib/cms-service';

export const metadata = { title: 'Activity Logs - Admin' };
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ActivityPage() {
  const apiBase = getApiBase();
  let logs = [];
  let total = 0;

  try {
    const result = await getActivityLogs(50);
    logs = JSON.parse(JSON.stringify(result.logs)) || [];
    total = result.total || 0;
  } catch (err) {
    console.error('Failed to fetch activity logs', err);
  }

  return (
    <div>
      <h1 className='text-[30px] font-bold'>ACTIVITY LOGS</h1>
      <p className="text-sm text-gray-600">
        Track all CMS actions and changes.
      </p>
      <div className="mt-5">
        <ActivityClient initialLogs={logs} initialTotal={total} apiBase={apiBase} />
      </div>
    </div>
  );
}

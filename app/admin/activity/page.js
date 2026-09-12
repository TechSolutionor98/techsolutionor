import React from 'react';
import ActivityClient from './ActivityClient';

export const metadata = { title: 'Activity Logs - Admin' };

export default function ActivityPage() {
  return (
    <div>
      <h1 className='text-[30px] font-bold'>ACTIVITY LOGS</h1>
      <p className="text-sm text-gray-600">
        Track all CMS actions and changes.
      </p>
      <div className="mt-5">
        <ActivityClient initialLogs={[]} initialTotal={0} />
      </div>
    </div>
  );
}


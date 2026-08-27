import React from 'react';
import UsersClient from './UsersClient';
import { getApiBase } from '@/lib/api-helper';
import { getUsersList } from '@/lib/cms-service';

export const metadata = { title: 'Users - Admin' };
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function UsersPage() {
  const apiBase = getApiBase();
  let users = [];
  const websites = [{ _id: 'default', name: 'OsumFix (default)' }];

  try {
    const list = await getUsersList();
    // Ensure clean JSON serialization
    users = JSON.parse(JSON.stringify(list)) || [];
  } catch (err) {
    console.error('Failed to fetch users directly from db', err);
  }

  return (
    <div>
      <h1 className='text-[30px] font-bold'>USER MANAGEMENT</h1>
      <p className="text-sm text-gray-600">
        Manage user accounts, roles, and website access.
      </p>
      <div className="mt-5">
        <UsersClient initialUsers={users} websites={websites} apiBase={apiBase} />
      </div>
    </div>
  );
}

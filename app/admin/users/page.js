import React from 'react';
import UsersClient from './UsersClient';

export const metadata = { title: 'Users - Admin' };

export default function UsersPage() {
  const websites = [{ _id: 'default', name: 'OsumFix (default)' }];

  return (
    <div>
      <h1 className='text-[30px] font-bold'>USER MANAGEMENT</h1>
      <p className="text-sm text-gray-600">
        Manage user accounts, roles, and website access.
      </p>
      <div className="mt-5">
        <UsersClient websites={websites} apiBase="" />
      </div>
    </div>
  );
}

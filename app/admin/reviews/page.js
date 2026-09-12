import React from 'react';
import ReviewsTableClient from './ReviewsTableClient';

export const metadata = { title: 'Reviews - Admin' };

export default function ReviewsPage() {
  return (
    <div>
      <h1 className='text-[30px] font-bold'>REVIEWS</h1>
      <div className="bg-white p-4 rounded shadow mt-10">
        <ReviewsTableClient />
      </div>
    </div>
  );
}

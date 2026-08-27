import React from 'react';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/become-a-partner', {
    title: 'Become a Partner | Tech Solutioner',
    description: 'Partner with Tech Solutioner to scale your agency, software products, and technical delivery.',
  });
}

export default function BecomeAPartnerPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold text-blue-400">Become a Partner</h1>
        <p className="text-gray-300 leading-relaxed">
          Collaborate with Tech Solutioner. Join our referral and strategic technology partnership program to unlock mutual business growth.
        </p>
      </div>
    </div>
  );
}

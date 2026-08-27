import React from 'react';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/terms-and-conditions', {
    title: 'Terms & Conditions | Tech Solutioner',
    description: 'Terms and conditions governing the use of Tech Solutioner website, engineering, and digital services.',
  });
}

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold text-blue-400">Terms & Conditions</h1>
        <p className="text-gray-300 leading-relaxed">
          Welcome to Tech Solutioner. By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions.
        </p>
        <div className="border-t border-slate-800 pt-6 space-y-4 text-gray-400 text-sm">
          <h2 className="text-xl font-bold text-white">Intellectual Property & Usage</h2>
          <p>
            All content, brand assets, and proprietary code displayed on this site are the intellectual property of Tech Solutioner unless otherwise specified.
          </p>
        </div>
      </div>
    </div>
  );
}

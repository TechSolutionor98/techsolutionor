import React from 'react';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/career', {
    title: 'Careers | Join Tech Solutioner Team',
    description: 'Explore career opportunities and open engineering roles at Tech Solutioner.',
  });
}

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold text-blue-400">Join Our Team</h1>
        <p className="text-gray-300 leading-relaxed">
          Build the future of technology and digital transformation with Tech Solutioner. We are looking for talented developers, designers, and digital marketers.
        </p>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-8">
          <h2 className="text-2xl font-bold text-white mb-2">Open Positions</h2>
          <p className="text-gray-400 text-sm">
            Contact us directly at <span className="text-blue-400 font-semibold">careers@techsolutionor.com</span> with your CV and portfolio.
          </p>
        </div>
      </div>
    </div>
  );
}

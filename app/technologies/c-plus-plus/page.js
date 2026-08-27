import React from 'react';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/c-plus-plus', {
    title: 'C++ Software Development Services | Tech Solutioner',
    description: 'High-performance C++ software development, systems programming, and high-frequency algorithms.',
  });
}

export default function CPlusPlusTechPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-6 text-center">
        <h1 className="text-4xl font-extrabold text-blue-400">C++ Engineering & Solutions</h1>
        <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Delivering high-performance, low-latency C++ applications and system architecture for enterprise demands.
        </p>
      </div>
    </div>
  );
}
